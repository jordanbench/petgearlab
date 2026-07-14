import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
const policy = readJson("data/product-candidate-policy.json");
const candidates = readJson("data/product-candidates.json");
const products = readJson("data/products.json");
const catalogReview = readJson("data/catalog-review.json");
const errors = [];
const productAsins = new Set(products.map((product) => product.asin));
const evidenceTypes = new Set(["manufacturer", "manual", "amazon-listing", "independent-review", "owner-pattern", "safety", "demand-signal", "hands-on"]);
const decisionSlots = new Set(["default", "budget", "upgrade", "constraint", "maintenance", "compatibility", "safety", "other"]);
const scoreKeys = Object.keys(policy.scoreWeights);
const gateKeys = ["asinVerified", "distinctDecisionSlot", "noUnresolvedSafetyIssue", "claimsSupportable", "affiliateCompliance"];
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const httpPattern = /^https?:\/\//i;

function add(message) {
  errors.push(message);
}

function requireString(value, label) {
  if (typeof value !== "string" || !value.trim()) add(`${label} must be a non-empty string`);
}

if (!Array.isArray(candidates)) add("data/product-candidates.json must contain an array");
if (!Array.isArray(products)) add("data/products.json must contain an array");

const candidateIds = new Set();
const candidateAsins = new Set();
const discoveryRunCounts = new Map();
const decisionCounts = { approve: 0, hold: 0, reject: 0 };

for (const [index, candidate] of (Array.isArray(candidates) ? candidates : []).entries()) {
  const label = `candidate ${index + 1}`;
  for (const field of ["candidateId", "siteId", "productName", "model", "variant", "asin", "affiliateUrl", "buyerProblem", "bestFor", "skipIf", "mainTradeoff", "closestAlternative", "editorialThesis", "decisionReason", "sourceRun", "researchedAt", "lastVerifiedAt"]) {
    requireString(candidate[field], `${label}.${field}`);
  }

  if (candidate.siteId !== policy.siteId) add(`${label}.siteId must be ${policy.siteId}`);
  if (!/^[A-Z0-9]{10}$/.test(candidate.asin || "")) add(`${label}.asin is invalid`);
  if (candidate.candidateId !== `${policy.siteId}:${candidate.asin}`) add(`${label}.candidateId must be ${policy.siteId}:${candidate.asin}`);
  if (candidateIds.has(candidate.candidateId)) add(`${label}.candidateId is duplicated`);
  if (candidateAsins.has(candidate.asin)) add(`${label}.asin is duplicated; update the existing record instead`);
  candidateIds.add(candidate.candidateId);
  candidateAsins.add(candidate.asin);

  const expectedUrl = `https://www.amazon.com/dp/${candidate.asin}/ref=nosim?tag=${policy.affiliateTag}`;
  if (candidate.affiliateUrl !== expectedUrl) add(`${label}.affiliateUrl must be ${expectedUrl}`);
  if (!decisionSlots.has(candidate.decisionSlot)) add(`${label}.decisionSlot is invalid`);
  if (!["research-only", "hands-on"].includes(candidate.experienceBasis)) add(`${label}.experienceBasis is invalid`);
  if (!datePattern.test(candidate.researchedAt || "")) add(`${label}.researchedAt must use YYYY-MM-DD`);
  if (!datePattern.test(candidate.lastVerifiedAt || "")) add(`${label}.lastVerifiedAt must use YYYY-MM-DD`);

  if (!Array.isArray(candidate.evidence) || candidate.evidence.length === 0) {
    add(`${label}.evidence must contain at least one source`);
  }
  const seenUrls = new Set();
  const seenTypes = new Set();
  for (const [evidenceIndex, evidence] of (candidate.evidence || []).entries()) {
    const evidenceLabel = `${label}.evidence[${evidenceIndex}]`;
    if (!evidenceTypes.has(evidence.type)) add(`${evidenceLabel}.type is invalid`);
    if (!httpPattern.test(evidence.url || "")) add(`${evidenceLabel}.url must be an http(s) URL`);
    requireString(evidence.note, `${evidenceLabel}.note`);
    if (!datePattern.test(evidence.checkedAt || "")) add(`${evidenceLabel}.checkedAt must use YYYY-MM-DD`);
    seenUrls.add(evidence.url);
    seenTypes.add(evidence.type);
  }

  for (const field of ["strengths", "failureModes"]) {
    if (!Array.isArray(candidate[field]) || candidate[field].length === 0 || candidate[field].some((value) => typeof value !== "string" || !value.trim())) {
      add(`${label}.${field} must contain at least one non-empty item`);
    }
  }

  if (!candidate.hardGates || typeof candidate.hardGates !== "object") {
    add(`${label}.hardGates is required`);
  } else {
    for (const gate of gateKeys) {
      if (typeof candidate.hardGates[gate] !== "boolean") add(`${label}.hardGates.${gate} must be boolean`);
    }
  }

  if (!candidate.score || typeof candidate.score !== "object") {
    add(`${label}.score is required`);
  } else {
    let calculated = 0;
    for (const key of scoreKeys) {
      const value = candidate.score[key];
      const maximum = policy.scoreWeights[key];
      if (!Number.isInteger(value) || value < 0 || value > maximum) add(`${label}.score.${key} must be an integer from 0 to ${maximum}`);
      else calculated += value;
    }
    if (candidate.score.total !== calculated) add(`${label}.score.total must equal ${calculated}`);
  }

  if (!["approve", "hold", "reject"].includes(candidate.decision)) {
    add(`${label}.decision is invalid`);
  } else {
    decisionCounts[candidate.decision] += 1;
  }

  const allGatesPass = gateKeys.every((gate) => candidate.hardGates?.[gate] === true);
  const total = candidate.score?.total;
  if (candidate.decision === "approve") {
    if (!Number.isInteger(total) || total < policy.thresholds.approve) add(`${label}: approve requires score >= ${policy.thresholds.approve}`);
    if (!allGatesPass) add(`${label}: approve requires every hard gate`);
    if (seenUrls.size < policy.approvalEvidence.minimumUniqueSources) add(`${label}: approve requires at least ${policy.approvalEvidence.minimumUniqueSources} unique sources`);
    for (const type of policy.approvalEvidence.requiredTypes) {
      if (!seenTypes.has(type)) add(`${label}: approve requires ${type} evidence`);
    }
    for (const group of policy.approvalEvidence.requiredAnyGroups) {
      if (!group.some((type) => seenTypes.has(type))) add(`${label}: approve requires one of ${group.join(", ")}`);
    }
  }
  if (candidate.decision === "hold" && (!Number.isInteger(total) || total < policy.thresholds.hold)) {
    add(`${label}: hold requires score >= ${policy.thresholds.hold}; otherwise reject`);
  }
  if (candidate.experienceBasis === "hands-on" && !seenTypes.has("hands-on")) {
    add(`${label}: hands-on experience requires hands-on evidence`);
  }

  const activation = candidate.activation;
  if (!activation || typeof activation !== "object") {
    add(`${label}.activation is required`);
  } else {
    if (!["pending", "activated", "not-applicable", "retired"].includes(activation.status)) add(`${label}.activation.status is invalid`);
    if (candidate.decision === "approve" && !["pending", "activated", "retired"].includes(activation.status)) add(`${label}: approved candidates must be pending, activated, or retired`);
    if (candidate.decision !== "approve" && activation.status !== "not-applicable") add(`${label}: held/rejected candidates must be not-applicable`);
    if (activation.status === "pending" && productAsins.has(candidate.asin)) add(`${label}: pending ASIN already exists in data/products.json; mark it activated`);
    if (activation.status === "activated") {
      if (!productAsins.has(candidate.asin)) add(`${label}: activated ASIN is missing from data/products.json`);
      if (!datePattern.test(activation.activatedAt || "")) add(`${label}.activation.activatedAt must use YYYY-MM-DD`);
      if (!/^\/guides\/.+\/$/.test(activation.guidePath || "")) add(`${label}.activation.guidePath must look like /guides/slug/`);
    }
    if (activation.status === "not-applicable" && (activation.activatedAt !== null || activation.guidePath !== null)) add(`${label}: not-applicable activation fields must be null`);
  }

  if (candidate.sourceRun?.startsWith("product-discovery:")) {
    if (!/^product-discovery:\d{4}-\d{2}-\d{2}$/.test(candidate.sourceRun)) add(`${label}.sourceRun must use product-discovery:YYYY-MM-DD`);
    discoveryRunCounts.set(candidate.sourceRun, (discoveryRunCounts.get(candidate.sourceRun) || 0) + 1);
  }
}

const latestDiscoveryRun = [...discoveryRunCounts.keys()].sort().at(-1);
if (latestDiscoveryRun) {
  const count = discoveryRunCounts.get(latestDiscoveryRun);
  if (count < policy.candidateCountPerDiscoveryRun.min || count > policy.candidateCountPerDiscoveryRun.max) {
    add(`${latestDiscoveryRun} must contain ${policy.candidateCountPerDiscoveryRun.min}-${policy.candidateCountPerDiscoveryRun.max} candidates; found ${count}`);
  }
  const approvals = candidates.filter((candidate) => candidate.sourceRun === latestDiscoveryRun && candidate.decision === "approve").length;
  if (approvals < policy.approvalCountPerDiscoveryRun.min || approvals > policy.approvalCountPerDiscoveryRun.max) {
    add(`${latestDiscoveryRun} must approve ${policy.approvalCountPerDiscoveryRun.min}-${policy.approvalCountPerDiscoveryRun.max} candidates; found ${approvals}`);
  }
}

if (!catalogReview || typeof catalogReview !== "object" || Array.isArray(catalogReview)) {
  add("data/catalog-review.json must contain an object");
} else {
  if (!Array.isArray(catalogReview.products)) add("catalog-review.products must be an array");
  if (catalogReview.reviewedAt === null) {
    if ((catalogReview.products || []).length) add("catalog-review.products must be empty when reviewedAt is null");
  } else {
    if (!datePattern.test(catalogReview.reviewedAt || "")) add("catalog-review.reviewedAt must use YYYY-MM-DD");
    const reviewedAsins = new Set();
    for (const [index, review] of (catalogReview.products || []).entries()) {
      const label = `catalog review ${index + 1}`;
      if (!productAsins.has(review.asin)) add(`${label}.asin is not active in data/products.json`);
      if (reviewedAsins.has(review.asin)) add(`${label}.asin is duplicated`);
      reviewedAsins.add(review.asin);
      if (!["keep", "refresh", "retire-review"].includes(review.status)) add(`${label}.status is invalid`);
      requireString(review.reason, `${label}.reason`);
      if (!datePattern.test(review.checkedAt || "")) add(`${label}.checkedAt must use YYYY-MM-DD`);
      if (!Array.isArray(review.evidenceUrls) || review.evidenceUrls.length < 2 || review.evidenceUrls.some((url) => !httpPattern.test(url))) {
        add(`${label}.evidenceUrls must contain at least two http(s) URLs`);
      }
    }
    for (const asin of productAsins) {
      if (!reviewedAsins.has(asin)) add(`catalog review is missing active ASIN ${asin}`);
    }
  }
}

if (errors.length) {
  throw new Error(`Product candidate validation failed:\n- ${errors.join("\n- ")}`);
}

const reviewCounts = { keep: 0, refresh: 0, "retire-review": 0 };
for (const review of catalogReview.products) reviewCounts[review.status] += 1;
console.log(JSON.stringify({
  status: "valid",
  siteId: policy.siteId,
  candidates: candidates.length,
  decisions: decisionCounts,
  approvedAwaitingActivation: candidates.filter((candidate) => candidate.decision === "approve" && candidate.activation.status === "pending").length,
  catalogReview: { reviewedAt: catalogReview.reviewedAt, counts: reviewCounts }
}));
