insert into public.affiliate_products (site_id, asin, name, category, positioning)
values
('petgearlab','B07N1B7JY4','PETLIBRO Automatic Cat Feeder','feeder','Two-cat feeder starter pick'),
('petgearlab','B09DSVFNRW','Veken Stainless Steel Pet Fountain','fountain','Easy-clean fountain'),
('petgearlab','B07G642RMQ','URPOWER Dog Car Seat Cover','travel','Travel hammock value pick'),
('petgearlab','B01MS6PLM6','Gorilla Grip Cat Litter Mat','litter','Apartment litter tracking fix'),
('petgearlab','B0002AR0II','KONG Classic Dog Toy','toy','Chew and enrichment staple'),
('petgearlab','B08P75GZ5M','Furbo 360 Dog Camera','pet-tech','Pet camera upgrade pick')
on conflict (site_id, asin) do update set name = excluded.name, category = excluded.category, positioning = excluded.positioning;
