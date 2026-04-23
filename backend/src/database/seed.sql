SET FOREIGN_KEY_CHECKS = 0;

-- Section 1: Users, core Restaurants, Hotels, Rooms (from original seed)
SET FOREIGN_KEY_CHECKS = 0;
SET NAMES utf8mb4;

DELETE FROM restaurant_photos;
DELETE FROM hotel_rooms;
DELETE FROM list_restaurants;
DELETE FROM professional_restaurants;
DELETE FROM professional_requests;
DELETE FROM restaurants;
DELETE FROM hotels;
DELETE FROM accommodations;
DELETE FROM lists;
DELETE FROM users;

INSERT INTO users (username, email, password, first_name, last_name, user_type) VALUES
('admin', 'admin@michelin.com', '$2b$10$giQgEFCsNi8vBjwQ63qTReqSCETFePdxzgO377n.qvjsLDY7Y5e4W', 'Admin', 'User', 'admin'),
('user', 'user@michelin.com', '$2b$10$9woVMhwQG7/eD9vNYx/.ruVuETfnj9EbC9ryQAJnlxsepmwNFsB26', 'Jean', 'Dupont', 'individual'),
('pro', 'pro@michelin.com', '$2b$10$D4JN6MxhwpihfJk5U6NZRedOM/jO1FMABYk5yOP4HD57vHAFw3K4e', 'Marie', 'Martin', 'professional');

INSERT INTO restaurants (name, address, location, city, country, price, cuisine, longitude, latitude, phone_number, michelin_url, website_url, award, stars, green_star, facilities, description, opening_hours) VALUES
('ES:SENZ', 'Grassau', 'Grassau', 'Grassau', 'Germany', '€€€€', 'Creative', 12.47, 47.79, '+498641401609', 'https://guide.michelin.com', 'https://www.das-achental.com', '3 Stars', 3, 0, 'Air conditioning', 'Exceptional modern cuisine', '{"Mon":"closed","Tue":"12h-22h"}'),
('Tohru', 'Munich', 'Munich', 'Munich', 'Germany', '€€€€', 'Modern', 11.58, 48.14, '+498921529172', 'https://guide.michelin.com', 'https://schreiberei-muc.de', '2 Stars', 2, 0, 'Wine list', 'Japanese fusion', '{"Mon":"closed","Tue":"19h-22h"}'),
('Schwarzwaldstube', 'Baiersbronn', 'Baiersbronn', 'Baiersbronn', 'Germany', '€€€€', 'French', 8.36, 48.54, '+497442492665', 'https://guide.michelin.com', 'https://www.traube-tonbach.de', '3 Stars', 3, 0, 'Great view', 'Black Forest excellence', '{"Mon":"closed","Tue":"19h-21h"}'),
('Victor Fine Dining', 'Perl', 'Perl', 'Perl', 'Germany', '€€€€', 'Creative', 6.39, 49.54, '+49686679118', 'https://guide.michelin.com', 'https://www.victors-fine-dining.de', '3 Stars', 3, 0, 'Air conditioning', 'Paris-Tokyo fusion', '{"Mon":"closed","Tue":"19h-21h"}'),
('Maaemo', 'Oslo', 'Oslo', 'Oslo', 'Norway', '€€€€', 'Creative', 10.76, 59.91, '+4722179969', 'https://guide.michelin.com', 'https://www.maaemo.no', '1 Star', 1, 0, 'Air conditioning', 'Seasonal tasting', '{"Mon":"closed","Tue":"19h-22h"}'),
('RE-NAA', 'Stavanger', 'Stavanger', 'Stavanger', 'Norway', '€€€€', 'Seafood', 5.73, 58.97, '+4751551111', 'https://guide.michelin.com', 'https://www.restaurantrenaa.no', 'Green Star', 0, 1, 'Air conditioning', 'Refined seafood', '{"Mon":"closed","Tue":"18h-22h"}'),
('FrantzÃƒÂ©n', 'Stockholm', 'Stockholm', 'Stockholm', 'Sweden', '€€€€', 'Creative', 18.06, 59.33, '+468208580', 'https://guide.michelin.com', 'https://www.restaurantfrantzen.com', '3 Stars', 3, 0, 'Counter dining', 'World-renowned', '{"Mon":"closed","Tue":"18h-22h"}'),
('Geranium', 'Copenhagen', 'Copenhagen', 'Copenhagen', 'Denmark', '€€€€', 'Creative', 12.57, 55.70, '+4533333600', 'https://guide.michelin.com', 'https://www.geranium.dk', '3 Stars', 3, 0, 'Great view', 'Luxurious dining', '{"Mon":"closed","Tue":"12h-13h"}'),
('HiÃ…Â¡a Franko', 'Kobarid', 'Kobarid', 'Kobarid', 'Slovenia', '€€€€', 'Creative', 13.54, 46.25, '+38653894120', 'https://guide.michelin.com', 'https://www.hisafranko.com', '3 Stars', 3, 1, 'Air conditioning', 'Chef Ana RoÃ…Â¡ style', '{"Mon":"closed","Tue":"19h-22h"}'),
('TrÃƒÂ¨sind Studio', 'Dubai', 'Dubai', 'Dubai', 'UAE', '$$$$', 'Indian', 55.14, 25.11, '+971588951272', 'https://guide.michelin.com', 'https://tresindstudio.com', '3 Stars', 3, 0, 'Air conditioning', 'Indian gastronomy', '{"Mon":"19h-23h","Tue":"19h-23h"}'),
('Guy Savoy', 'Paris', 'Paris', 'Paris', 'France', '€€€€', 'French', 2.34, 48.86, '+33143804061', 'https://guide.michelin.com', 'https://www.guysavoy.com', '3 Stars', 3, 0, 'Air conditioning', 'Culinary excellence', '{"Mon":"closed","Tue":"12h-14h"}'),
('Ãƒâ€°picure', 'Paris', 'Paris', 'Paris', 'France', '€€€€', 'French', 2.31, 48.87, '+33153434300', 'https://guide.michelin.com', 'https://www.oetkercollection.com', '3 Stars', 3, 0, 'Garden', 'Precision and generosity', '{"Mon":"12h-14h","Tue":"12h-14h"}'),
('Taillevent', 'Paris', 'Paris', 'Paris', 'France', '€€€€', 'French', 2.31, 48.87, '+33144951501', 'https://guide.michelin.com', 'https://www.taillevent.com', '2 Stars', 2, 0, 'Air conditioning', 'French gastronomy', '{"Mon":"12h-14h","Tue":"12h-14h"}'),
('Kei', 'Paris', 'Paris', 'Paris', 'France', '€€€€', 'Japanese', 2.35, 48.86, '+33142336574', 'https://guide.michelin.com', 'https://www.restaurant-kei.fr', '2 Stars', 2, 0, 'Air conditioning', 'French Japanese fusion', '{"Mon":"closed","Tue":"12h-14h"}'),
('Septime', 'Paris', 'Paris', 'Paris', 'France', 'Ã¢â€šÂ¬Ã¢â€šÂ¬Ã¢â€šÂ¬', 'Seasonal', 2.38, 48.85, '+33143673829', 'https://guide.michelin.com', 'https://www.septime-charonne.fr', '1 Star', 1, 0, 'Wine list', 'Parisian bistro', '{"Mon":"12h15-14h","Tue":"12h15-14h"}'),
('Le Grand VÃƒÂ©four', 'Paris', 'Paris', 'Paris', 'France', '€€€€', 'French', 2.34, 48.86, '+33142960627', 'https://guide.michelin.com', 'https://www.grand-vefour.com', '1 Star', 1, 0, 'Air conditioning', 'Historic excellence', '{"Mon":"12h30-14h","Tue":"12h30-14h"}'),
('LÃƒÂ©on de Lyon', 'Lyon', 'Lyon', 'Lyon', 'France', 'Ã¢â€šÂ¬Ã¢â€šÂ¬Ã¢â€šÂ¬', 'Lyonnaise', 4.83, 45.77, '+33478289133', 'https://guide.michelin.com', 'https://www.leondelyon.com', '1 Star', 1, 0, 'Air conditioning', 'Lyonnaise tradition', '{"Mon":"closed","Tue":"12h-14h"}'),
('La Marine', 'Noirmoutier', 'Noirmoutier', 'Noirmoutier', 'France', '€€€€', 'Seafood', -2.26, 46.98, '+33251390009', 'https://guide.michelin.com', 'https://www.alexandrecouillon.com', 'Green Star', 0, 1, 'Air conditioning', 'Oceanic gastronomy', '{"Mon":"closed","Tue":"12h-13h"}'),
('Flocons de Sel', 'MegÃƒÂ¨ve', 'MegÃƒÂ¨ve', 'MegÃƒÂ¨ve', 'France', '€€€€', 'Mountain', 6.62, 45.85, '+33450213449', 'https://guide.michelin.com', 'https://www.floconsdesel.com', '3 Stars', 3, 0, 'Great view', 'Alpine gastronomy', '{"Mon":"closed","Tue":"12h-13h"}'),
('Oustau de BaumaniÃƒÂ¨re', 'Les Baux', 'Les Baux', 'Les Baux', 'France', '€€€€', 'ProvenÃƒÂ§al', 4.80, 43.74, '+33490543307', 'https://guide.michelin.com', 'https://www.baumaniere.com', '2 Stars', 2, 0, 'Garden', 'ProvenÃƒÂ§al cuisine', '{"Mon":"12h-14h","Tue":"12h-14h"}');

INSERT INTO hotels (name, address, city, country, latitude, longitude, stars, phone, description, facilities, price_from, photo_url) VALUES
('Hotel Le Bristol', 'Paris', 'Paris', 'France', 48.87, 2.31, 5, '+33153434300', 'Luxury palace hotel', 'Spa,Restaurant', 450, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=900&fit=crop'),
('Villa Copenhagen', 'Copenhagen', 'Copenhagen', 'Denmark', 55.68, 12.57, 4, '+4533333600', 'Boutique harbor hotel', 'Restaurant,Bar', 280, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&h=900&fit=crop'),
('Hotel Adlon Kempinski', 'Berlin', 'Berlin', 'Germany', 52.52, 13.39, 5, '+493022610', 'Historic luxury hotel', 'Spa,Restaurant', 380, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=900&fit=crop'),
('The Savoy', 'London', 'London', 'United Kingdom', 51.51, -0.12, 5, '+442073363100', 'Art Deco on Thames', 'Spa,Restaurant', 420, 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&h=900&fit=crop'),
('Grand Hotel Stockholm', 'Stockholm', 'Stockholm', 'Sweden', 59.33, 18.08, 5, '+468679580', 'Harbor views elegance', 'Restaurant,Bar', 350, 'https://images.unsplash.com/photo-1590080876-5b60b0ce2c2e?w=1200&h=900&fit=crop'),
('Hotel Alfonso XIII', 'Seville', 'Seville', 'Spain', 37.39, -5.98, 5, '+34954917000', 'Palace hotel elegance', 'Restaurant,Bar', 320, 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&h=900&fit=crop'),
('Mandarin Oriental', 'Barcelona', 'Barcelona', 'Spain', 41.39, 2.17, 5, '+34932151900', 'Ultra-luxury location', 'Spa,Restaurant', 400, 'https://images.unsplash.com/photo-1571896635906-29c2b02f04f7?w=1200&h=900&fit=crop'),
('Badrutt Palace Hotel', 'St. Moritz', 'St. Moritz', 'Switzerland', 46.50, 10.33, 5, '+41818372000', 'Alpine palace since 1896', 'Spa,Restaurant', 500, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=900&fit=crop'),
('Aman Venice', 'Venice', 'Venice', 'Italy', 45.44, 12.32, 5, '+390412411811', 'Venetian palazzo luxury', 'Restaurant,Bar', 550, 'https://images.unsplash.com/photo-1578821168017-ecc01b0ab28f?w=1200&h=900&fit=crop'),
('Four Seasons Firenze', 'Florence', 'Florence', 'Italy', 43.77, 11.28, 5, '+390552623700', 'Renaissance palazzo', 'Spa,Restaurant', 380, 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&h=900&fit=crop');

INSERT INTO hotel_rooms (hotel_id, room_type, description, price_per_night, capacity, amenities) SELECT id, 'Deluxe', 'Spacious elegant room', 450, 2, 'Marble bathroom,Premium bedding' FROM hotels WHERE name = 'Hotel Le Bristol';
INSERT INTO hotel_rooms (hotel_id, room_type, description, price_per_night, capacity, amenities) SELECT id, 'Suite', 'Luxury suite', 800, 2, 'Separate living,Marble bathroom' FROM hotels WHERE name = 'Hotel Le Bristol';
INSERT INTO hotel_rooms (hotel_id, room_type, description, price_per_night, capacity, amenities) SELECT id, 'Standard', 'Modern room', 280, 2, 'Harbor views,WiFi' FROM hotels WHERE name = 'Villa Copenhagen';
INSERT INTO hotel_rooms (hotel_id, room_type, description, price_per_night, capacity, amenities) SELECT id, 'Superior', 'Spacious upgraded', 380, 2, 'Harbor views,Bath' FROM hotels WHERE name = 'Villa Copenhagen';
INSERT INTO hotel_rooms (hotel_id, room_type, description, price_per_night, capacity, amenities) SELECT id, 'Classic', 'Elegant room', 380, 2, 'Marble bathroom,Premium bedding' FROM hotels WHERE name = 'Hotel Adlon Kempinski';
INSERT INTO hotel_rooms (hotel_id, room_type, description, price_per_night, capacity, amenities) SELECT id, 'Suite', 'Luxury suite', 800, 2, 'Separate living,Personalized service' FROM hotels WHERE name = 'Hotel Adlon Kempinski';
INSERT INTO hotel_rooms (hotel_id, room_type, description, price_per_night, capacity, amenities) SELECT id, 'Thames-View', 'River views', 420, 2, 'Premium bedding,River views' FROM hotels WHERE name = 'The Savoy';
INSERT INTO hotel_rooms (hotel_id, room_type, description, price_per_night, capacity, amenities) SELECT id, 'Suite', 'Art Deco suite', 900, 2, 'Separate living,River views' FROM hotels WHERE name = 'The Savoy';
INSERT INTO hotel_rooms (hotel_id, room_type, description, price_per_night, capacity, amenities) SELECT id, 'Standard', 'Harbor views', 350, 2, 'Harbor views,WiFi' FROM hotels WHERE name = 'Grand Hotel Stockholm';
INSERT INTO hotel_rooms (hotel_id, room_type, description, price_per_night, capacity, amenities) SELECT id, 'Deluxe Suite', 'Palace views', 700, 2, 'Separate living,Premium bedding' FROM hotels WHERE name = 'Grand Hotel Stockholm';
INSERT INTO hotel_rooms (hotel_id, room_type, description, price_per_night, capacity, amenities) SELECT id, 'Classic', 'Andalusian style', 320, 2, 'Marble bathroom,Premium bedding' FROM hotels WHERE name = 'Hotel Alfonso XIII';
INSERT INTO hotel_rooms (hotel_id, room_type, description, price_per_night, capacity, amenities) SELECT id, 'Suite', 'Palace suite', 650, 2, 'Separate living,Personal service' FROM hotels WHERE name = 'Hotel Alfonso XIII';
INSERT INTO hotel_rooms (hotel_id, room_type, description, price_per_night, capacity, amenities) SELECT id, 'City View', 'Modern room', 400, 2, 'WiFi,Marble bathroom' FROM hotels WHERE name = 'Mandarin Oriental';
INSERT INTO hotel_rooms (hotel_id, room_type, description, price_per_night, capacity, amenities) SELECT id, 'Suite', 'Ultra-luxury suite', 900, 2, 'Separate living,Personal butler' FROM hotels WHERE name = 'Mandarin Oriental';
INSERT INTO hotel_rooms (hotel_id, room_type, description, price_per_night, capacity, amenities) SELECT id, 'Alpine', 'Mountain views', 500, 2, 'Marble bathroom,Premium bedding' FROM hotels WHERE name = 'Badrutt Palace Hotel';
INSERT INTO hotel_rooms (hotel_id, room_type, description, price_per_night, capacity, amenities) SELECT id, 'Suite', 'Alpine views', 1200, 2, 'Separate living,Personal concierge' FROM hotels WHERE name = 'Badrutt Palace Hotel';
INSERT INTO hotel_rooms (hotel_id, room_type, description, price_per_night, capacity, amenities) SELECT id, 'Canal-View', 'Grand Canal', 550, 2, 'Marble bathroom,Premium bedding' FROM hotels WHERE name = 'Aman Venice';
INSERT INTO hotel_rooms (hotel_id, room_type, description, price_per_night, capacity, amenities) SELECT id, 'Suite', 'Palazzo suite', 1100, 2, 'Separate living,Personal service' FROM hotels WHERE name = 'Aman Venice';
INSERT INTO hotel_rooms (hotel_id, room_type, description, price_per_night, capacity, amenities) SELECT id, 'Renaissance', 'Renaissance decor', 380, 2, 'Marble bathroom,Premium bedding' FROM hotels WHERE name = 'Four Seasons Firenze';
INSERT INTO hotel_rooms (hotel_id, room_type, description, price_per_night, capacity, amenities) SELECT id, 'Suite', 'Art views', 850, 2, 'Separate living,Premium bedding' FROM hotels WHERE name = 'Four Seasons Firenze';

INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', 'Restaurant interior', 0 FROM restaurants WHERE name = 'ES:SENZ' LIMIT 1;
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800', 'Creative cuisine', 1 FROM restaurants WHERE name = 'ES:SENZ' LIMIT 1;
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Interior', 0 FROM restaurants WHERE name = 'Tohru' LIMIT 1;
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800', 'Fusion cuisine', 1 FROM restaurants WHERE name = 'Tohru' LIMIT 1;
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800', 'Black Forest', 0 FROM restaurants WHERE name = 'Schwarzwaldstube' LIMIT 1;
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800', 'Ambiance', 1 FROM restaurants WHERE name = 'Schwarzwaldstube' LIMIT 1;

SET FOREIGN_KEY_CHECKS = 1;

-- Section 2: French Restaurants
-- seed_restaurants_france.sql Ã¢â‚¬â€ 27 restaurants franÃƒÂ§ais (rÃƒÂ©els et fictifs)
-- Ãƒâ‚¬ exÃƒÂ©cuter aprÃƒÂ¨s add_opening_hours.sql

SET NAMES utf8mb4;

INSERT INTO restaurants (name, address, location, city, price, cuisine, longitude, latitude, phone_number, michelin_url, website_url, award, stars, green_star, facilities, description, opening_hours) VALUES

-- Ã¢â€â‚¬Ã¢â€â‚¬ 3 Ãƒâ€°TOILES Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬

('Guy Savoy',
 'Monnaie de Paris, 11 Quai de Conti, Paris, 75006, France',
 'Paris, France', 'Paris', '€€€€', 'Creative, Classic French',
 2.3388, 48.8572, '+33143804061',
 'https://guide.michelin.com/fr/ile-de-france/paris/restaurant/guy-savoy',
 'https://www.guysavoy.com/',
 '3 Stars', 3, 0,
 'Air conditioning,Interesting wine list,Wheelchair access',
 'Installed in the magnificent halls of the Monnaie de Paris since 2015, Guy Savoy continues to embody culinary excellence with a cuisine that combines classic French technique and bold creativity. The iconic artichoke and black truffle soup remains a must-try, while the sea bass with spiced latte skin demonstrates his mastery of flavours. The service, led by a highly dedicated team, provides an exceptional dining experience in a breathtaking setting overlooking the Seine. The wine list draws on the very greatest French estates, guided by a sommelier of rare erudition.',
 'Mar-Sam Ã‚Â· 12h-14h & 19h30-22h | Dim-Lun fermÃƒÂ©'),

('Ãƒâ€°picure',
 'HÃƒÂ´tel Le Bristol, 112 Rue du Faubourg Saint-HonorÃƒÂ©, Paris, 75008, France',
 'Paris, France', 'Paris', '€€€€', 'Classic French, Seasonal Cuisine',
 2.3122, 48.8742, '+33153434300',
 'https://guide.michelin.com/fr/ile-de-france/paris/restaurant/epicure',
 'https://www.oetkercollection.com/hotels/le-bristol-paris/',
 '3 Stars', 3, 0,
 'Air conditioning,Garden or park,Interesting wine list,Wheelchair access',
 'In the sumptuous garden of Le Bristol, Ãƒâ€°ric Frechon orchestrates a haute cuisine of rare precision and generosity. His macaroni stuffed with black truffle, artichoke and duck foie gras, gratinated with aged Parmesan, has become a Parisian legend. Each course reveals impeccable mastery of classic French techniques, sublimated by exceptional seasonal ingredients. The garden Ã¢â‚¬â€œ one of the most beautiful in Paris Ã¢â‚¬â€œ transforms the lunch service into a near-magical experience, while the evenings take on the grandeur of a palace-level celebration.',
 'Lun-Dim Ã‚Â· 12h-14h & 19h30-22h'),

('Flocons de Sel',
 '1775 Route du Leutaz, MegÃƒÂ¨ve, 74120, France',
 'MegÃƒÂ¨ve, France', 'MegÃƒÂ¨ve', '€€€€', 'Creative, Mountain Cuisine',
 6.6197, 45.8465, '+33450213449',
 'https://guide.michelin.com/fr/auvergne-rhone-alpes/megeve/restaurant/flocons-de-sel',
 'https://www.floconsdesel.com/',
 '3 Stars', 3, 0,
 'Car park,Great view,Interesting wine list,Terrace',
 'Emmanuel Renaut has turned Flocons de Sel into a true temple of alpine gastronomy. His cuisine, deeply rooted in the mountain terroir of Haute-Savoie, revisits ancestral traditions through a contemporary lens of remarkable precision. Crayfish from nearby lakes, wild mushrooms from the surrounding forests and mountain-chalet cheeses inspire creations of touching authenticity. The panoramic terrace overlooking Mont Blanc offers one of the most spectacular dining backdrops in the world, making every table here a genuine privilege.',
 'Mer-Dim Ã‚Â· 12h-13h30 & 19h30-21h30 | Lun-Mar fermÃƒÂ©'),

('Auberge du Vieux Puits',
 'Route Nationale 613, Fontjoncouse, 11360, France',
 'Fontjoncouse, France', 'Fontjoncouse', '€€€€', 'Creative, Regional Cuisine',
 2.8532, 43.1041, '+33468440737',
 'https://guide.michelin.com/fr/occitanie/fontjoncouse/restaurant/auberge-du-vieux-puits',
 'https://www.aubergeduvieuxpuits.fr/',
 '3 Stars', 3, 0,
 'Car park,Garden or park,Interesting wine list,Terrace',
 'Gilles Goujon has transformed this isolated village of Fontjoncouse in the CorbiÃƒÂ¨res into a pilgrimage destination for food lovers worldwide. His cuisine, faithful to the Languedoc terroir, sublimes local products through extraordinary technical mastery. The famous "rotten egg from the earth" dish illustrates his philosophy perfectly: cooking what nature offers with elegance, intelligence and deep respect. The warm, family atmosphere of the auberge adds a unique and disarming dimension to an otherwise stellar gastronomic experience.',
 'Jeu-Lun Ã‚Â· 12h-13h30 & 19h30-21h | Mar-Mer fermÃƒÂ©'),

('Maison Lameloise',
 '36 Place d''Armes, Chagny, 71150, France',
 'Chagny, France', 'Chagny', '€€€€', 'Classic French, Regional Cuisine',
 4.7518, 46.9068, '+33385871265',
 'https://guide.michelin.com/fr/bourgogne-franche-comte/chagny/restaurant/lameloise',
 'https://www.lameloise.fr/',
 '3 Stars', 3, 0,
 'Air conditioning,Car park,Interesting wine list,Wheelchair access',
 'For three generations, the Lameloise family has made this elegant establishment in the heart of Burgundy a destination of the highest order. Ãƒâ€°ric Pras perpetuates the tradition of meticulous classical cuisine while bringing his own distinctive creative touches. Iconic Burgundian ingredients Ã¢â‚¬â€œ snails, Charolais beef, Bresse chicken Ã¢â‚¬â€œ are treated with a reverence that honours centuries of tradition. The exceptional wine cellar, focused on the great growths of the nearby CÃƒÂ´te d''Or, adds a final magnificent dimension to an already unforgettable experience.',
 'Mer-Dim Ã‚Â· 12h-14h & 19h30-21h30 | Lun-Mar fermÃƒÂ©'),

('Auberge de l''Ill',
 '2 Rue de Collonges, Illhaeusern, 68970, France',
 'Illhaeusern, France', 'Illhaeusern', '€€€€', 'Classic French, Alsatian',
 7.5612, 48.1734, '+33389718923',
 'https://guide.michelin.com/fr/grand-est/illhaeusern/restaurant/auberge-de-l-ill',
 'https://www.auberge-de-l-ill.com/',
 '3 Stars', 3, 0,
 'Car park,Garden or park,Interesting wine list,Terrace,Wheelchair access',
 'On the banks of the Ill river, the Haeberlin family has maintained for decades a cuisine of remarkable consistency and elegance. Marc Haeberlin perpetuates and modernises the great classics of Alsatian gastronomy with outstanding precision. The famous salmon soufflÃƒÂ©, created by Paul Haeberlin, remains on the menu as a sacred monument to French culinary heritage. The garden, with its willows reflected in the river, creates an enchanting setting where time seems to slow to the gentle rhythm of the seasons.',
 'Mer-Dim Ã‚Â· 12h-13h30 & 19h-21h | Lun-Mar fermÃƒÂ©'),

-- Ã¢â€â‚¬Ã¢â€â‚¬ 2 Ãƒâ€°TOILES Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬

('Taillevent',
 '15 Rue Lamennais, Paris, 75008, France',
 'Paris, France', 'Paris', '€€€€', 'Classic French',
 2.3053, 48.8734, '+33144951501',
 'https://guide.michelin.com/fr/ile-de-france/paris/restaurant/taillevent',
 'https://www.taillevent.com/',
 '2 Stars', 2, 0,
 'Air conditioning,Interesting wine list,Wheelchair access',
 'The name Taillevent alone evokes the centuries-old history of French gastronomy. In this venerable establishment near the Arc de Triomphe, Giuliano Sperandio perpetuates a classic cuisine of impeccable quality, with great Italian sensitivity woven through each plate. Exceptional products Ã¢â‚¬â€œ Breton lobster, PÃƒÂ©rigord truffles, Landes duck Ã¢â‚¬â€œ are treated with a respect that borders on reverence. The legendary wine cellar, one of the finest in Paris, elevates each tasting menu to a deeply memorable experience.',
 'Lun-Ven Ã‚Â· 12h-14h & 19h-22h | Sam-Dim fermÃƒÂ©'),

('Le Meurice',
 '228 Rue de Rivoli, Paris, 75001, France',
 'Paris, France', 'Paris', '€€€€', 'Creative, Classic French',
 2.3316, 48.8648, '+33144581055',
 'https://guide.michelin.com/fr/ile-de-france/paris/restaurant/le-meurice',
 'https://www.dorchestercollection.com/paris/le-meurice/',
 '2 Stars', 2, 0,
 'Air conditioning,Great view,Interesting wine list,Wheelchair access',
 'Overlooking the Tuileries garden in a room that pays homage to DalÃƒÂ­, Amaury Bouhours deploys a cuisine that is deeply personal and technically impeccable. His signature langoustine with seaweed butter, inspired by a walk on the Breton coast, perfectly illustrates his ability to translate emotional memories into exceptional dishes. Classic French elegance meets unexpected creative verve in every course, earning this palace restaurant its rightful place among Paris''s most cherished gastronomic destinations.',
 'Mar-Sam Ã‚Â· 12h-14h & 19h30-22h | Dim-Lun fermÃƒÂ©'),

('Kei',
 '5 Rue du Coq-HÃƒÂ©ron, Paris, 75001, France',
 'Paris, France', 'Paris', '€€€€', 'Creative, Japanese Contemporary',
 2.3453, 48.8626, '+33142336574',
 'https://guide.michelin.com/fr/ile-de-france/paris/restaurant/kei',
 'https://www.restaurant-kei.fr/',
 '2 Stars', 2, 0,
 'Air conditioning,Interesting wine list,Notable sake list',
 'Kei Kobayashi embodies with rare elegance the meeting point between two great culinary civilisations. Trained alongside Alain Ducasse, this Japanese chef of exceptional talent creates a unique cuisine where French techniques and products dialogue harmoniously with the aesthetics and philosophy of Japanese cooking. His peony lobster Ã¢â‚¬â€œ at once visually stunning and gustatorily perfect Ã¢â‚¬â€œ has become one of the iconic dishes of Parisian gastronomy, a living manifesto of a singular cross-cultural vision.',
 'Mar-Sam Ã‚Â· 12h-14h30 & 19h30-22h | Dim-Lun fermÃƒÂ©'),

('La GrenouillÃƒÂ¨re',
 '19 Rue de la GrenouillÃƒÂ¨re, Montreuil-sur-Mer, 62170, France',
 'Montreuil-sur-Mer, France', 'Montreuil-sur-Mer', '€€€€', 'Creative, Modern French',
 1.7612, 50.4635, '+33321062907',
 'https://guide.michelin.com/fr/hauts-de-france/montreuil-sur-mer/restaurant/la-grenouillere',
 'https://www.lagrenouillere.fr/',
 '2 Stars', 2, 0,
 'Car park,Garden or park,Interesting wine list,Terrace',
 'Alexandre Gauthier has turned this old farmhouse on the Montreuil marshes into one of the most inventive and personal restaurants in France. His improvisational cuisine, nourished by the surrounding nature and the products of northern France, plays with textures, temperatures and umami flavours with extraordinary virtuosity. There is no fixed menu Ã¢â‚¬â€œ instead, an adventure where the chef composes based on the day''s arrivals and his creative impulses. A unique culinary experience that appeals to the most adventurous epicures.',
 'Mer-Dim Ã‚Â· 12h-13h30 & 19h30-21h | Lun-Mar fermÃƒÂ©'),

('Oustau de BaumaniÃƒÂ¨re',
 'Val d''Enfer, Les Baux-de-Provence, 13520, France',
 'Les Baux-de-Provence, France', 'Les Baux-de-Provence', '€€€€', 'Creative, ProvenÃƒÂ§al',
 4.7952, 43.7441, '+33490543307',
 'https://guide.michelin.com/fr/provence-alpes-cote-d-azur/les-baux-de-provence/restaurant/oustau-de-baumaniere',
 'https://www.baumaniere.com/',
 '2 Stars', 2, 0,
 'Air conditioning,Car park,Garden or park,Great view,Interesting wine list,Terrace',
 'Nestled in a spectacular setting among the rocky outcrops of Les Baux-de-Provence, Glenn Viel gives BaumaniÃƒÂ¨re''s legendary address a new radiance through a personal, committed cuisine. His deep attachment to the ProvenÃƒÂ§al terroir is expressed through dishes that celebrate local products with audacious creativity: Alpilles lamb, Camargue rice, RhÃƒÂ´ne valley vegetables. His vegetarian tasting menu, one of the most accomplished in France, demonstrates that plant-based gastronomy can reach summits of true elegance.',
 'Lun-Dim Ã‚Â· 12h-14h & 19h30-21h30'),

('Le Pressoir d''Argent',
 '2-5 Place de la ComÃƒÂ©die, Bordeaux, 33000, France',
 'Bordeaux, France', 'Bordeaux', '€€€€', 'Creative, Seafood',
 -0.5753, 44.8408, '+33557301010',
 'https://guide.michelin.com/fr/nouvelle-aquitaine/bordeaux/restaurant/le-pressoir-d-argent',
 'https://www.intercontinental-bordeaux.com/',
 '2 Stars', 2, 0,
 'Air conditioning,Interesting wine list,Wheelchair access',
 'In the majestic Grand Hotel de Bordeaux, FrÃƒÂ©dÃƒÂ©ric Larquemin deploys a seafood-forward cuisine of great originality. His signature dish Ã¢â‚¬â€œ a whole lobster pressed in the famous silver press, creating an intensely flavoured juice that perfects the sauce Ã¢â‚¬â€œ is a theatrical and gustatory spectacle that guests never forget. The vast wine list, naturally oriented toward the greatest Bordeaux appellations, allows for extraordinary pairings between exceptional dishes and legendary grand crus.',
 'Mar-Sam Ã‚Â· 19h-22h | Dim-Lun fermÃƒÂ©'),

-- Ã¢â€â‚¬Ã¢â€â‚¬ 1 Ãƒâ€°TOILE Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬

('Septime',
 '80 Rue de Charonne, Paris, 75011, France',
 'Paris, France', 'Paris', 'Ã¢â€šÂ¬Ã¢â€šÂ¬Ã¢â€šÂ¬', 'Creative, Seasonal Cuisine',
 2.3798, 48.8526, '+33143676829',
 'https://guide.michelin.com/fr/ile-de-france/paris/restaurant/septime',
 'https://www.septime-charonne.fr/',
 '1 Star', 1, 0,
 'Interesting wine list',
 'Bertrand GrÃƒÂ©baut has made Septime the emblem of neo-bistro Parisian gastronomy. His radically seasonal cuisine Ã¢â‚¬â€œ sourced exclusively from small producers and responsible fishermen Ã¢â‚¬â€œ is expressed through dishes of apparent simplicity that conceal extraordinary technical finesse. The menus evolve at the rhythm of the seasons, constituting true snapshots of the moment: a slice of time captured on the plate with poetry and precision. The relaxed, unpretentious atmosphere contrasts agreeably with the sophistication of the cooking.',
 'Lun-Ven Ã‚Â· 12h15-14h & 19h15-22h | Sam-Dim fermÃƒÂ©'),

('Le Grand VÃƒÂ©four',
 '17 Rue de Beaujolais, Paris, 75001, France',
 'Paris, France', 'Paris', '€€€€', 'Classic French, Creative',
 2.3371, 48.8638, '+33142960627',
 'https://guide.michelin.com/fr/ile-de-france/paris/restaurant/le-grand-vefour',
 'https://www.grand-vefour.com/',
 '1 Star', 1, 0,
 'Air conditioning,Interesting wine list',
 'One of the most beautiful restaurants in the world, the Grand VÃƒÂ©four has been enchanting the Palais-Royal since 1784. Beneath its magnificent painted ceilings and gilded dÃƒÂ©cor listed as a historic monument, the kitchen honours classic French cooking while gently carrying it into the 21st century. Napoleon, Victor Hugo and Colette once sat at these very tables Ã¢â‚¬â€œ today''s guests write their own chapter in this living legend of Parisian culinary history.',
 'Lun-Ven Ã‚Â· 12h30-14h & 19h30-22h | Sam-Dim fermÃƒÂ©'),

('Maison Marcon',
 'Route des Barrages, Saint-Bonnet-le-Froid, 43290, France',
 'Saint-Bonnet-le-Froid, France', 'Saint-Bonnet-le-Froid', '€€€€', 'Creative, Regional Cuisine',
 4.2108, 45.1635, '+33471591293',
 'https://guide.michelin.com/fr/auvergne-rhone-alpes/saint-bonnet-le-froid/restaurant/maison-marcon',
 'https://www.regis-et-jacques-marcon.com/',
 '1 Star', 1, 0,
 'Car park,Great view,Interesting wine list,Terrace',
 'In this remote mountain village of Haute-Loire, RÃƒÂ©gis and Jacques Marcon have built a true gastronomic sanctuary rooted in the volcanic Auvergne terroir. The wild mushrooms that RÃƒÂ©gis Marcon has been foraging since childhood inspire an entire corpus of creations of extraordinary depth: ceps, chanterelles and morels become the heroes of dishes where nature expresses itself with unmatched intensity. The panoramic view over the MÃƒÂ©zenc massif adds a dimension of wild beauty to this singular culinary pilgrimage.',
 'Mer-Dim Ã‚Â· 12h-13h30 & 19h30-21h | Lun-Mar fermÃƒÂ©'),

('L''Envol',
 '12 Promenade des Anglais, Nice, 06000, France',
 'Nice, France', 'Nice', 'Ã¢â€šÂ¬Ã¢â€šÂ¬Ã¢â€šÂ¬', 'Creative, Mediterranean',
 7.2661, 43.6955, '+33493871234',
 'https://guide.michelin.com/fr/provence-alpes-cote-d-azur/nice/restaurant/l-envol',
 'https://www.lenvol-nice.fr/',
 '1 Star', 1, 0,
 'Air conditioning,Great view,Interesting wine list,Terrace',
 'Perched above the Bay of Angels, L''Envol offers a breathtaking panorama of the CÃƒÂ´te d''Azur as the backdrop for a resolutely Mediterranean cuisine. Chef Lucas Moreau celebrates NiÃƒÂ§ois products with a contemporary spirit: rascasse from the Bay of Angels, socca reimagined as an amuse-bouche, pan bagnat deconstructed into an elegant tasting course. His cooking Ã¢â‚¬â€œ deeply local yet open to the world Ã¢â‚¬â€œ captures the luminous and generous spirit of the Riviera.',
 'Mar-Sam Ã‚Â· 12h30-14h & 19h30-22h | Dim-Lun fermÃƒÂ©'),

('La Table de Ventabren',
 '1 Rue FrÃƒÂ©dÃƒÂ©ric Mistral, Ventabren, 13122, France',
 'Ventabren, France', 'Ventabren', 'Ã¢â€šÂ¬Ã¢â€šÂ¬Ã¢â€šÂ¬', 'Creative, ProvenÃƒÂ§al',
 5.3117, 43.5949, '+33442288079',
 'https://guide.michelin.com/fr/provence-alpes-cote-d-azur/ventabren/restaurant/la-table-de-ventabren',
 'https://www.latabledventabren.com/',
 '1 Star', 1, 0,
 'Car park,Great view,Interesting wine list,Terrace',
 'Perched on a rocky spur overlooking the Arc valley, this charming restaurant offers both a panoramic view and a cuisine intensely anchored in Provence. The chef works exclusively with local producers to create colourful, aromatic dishes that capture the very essence of ProvenÃƒÂ§al sunshine: fresh market-garden vegetables, olive oil from the ChÃƒÂ¢teau Virant mill, Alpilles lamb, fish from Marseille coastal fishermen. A warm, authentic address that beautifully embodies southern French gastronomy at its finest.',
 'Mar-Sam Ã‚Â· 12h-14h & 19h30-21h30 | Dim-Lun fermÃƒÂ©'),

('LÃƒÂ©on de Lyon',
 '1 Rue Pleney, Lyon, 69001, France',
 'Lyon, France', 'Lyon', 'Ã¢â€šÂ¬Ã¢â€šÂ¬Ã¢â€šÂ¬', 'Classic French, Lyonnaise Cuisine',
 4.8326, 45.7676, '+33478289133',
 'https://guide.michelin.com/fr/auvergne-rhone-alpes/lyon/restaurant/leon-de-lyon',
 'https://www.leondelyon.com/',
 '1 Star', 1, 0,
 'Air conditioning,Interesting wine list',
 'Jean-Paul Lacombe perpetuates at LÃƒÂ©on de Lyon the noble Lyonnaise culinary tradition with exemplary constancy. Lyon, self-proclaimed capital of French gastronomy, finds here one of its finest ambassadors: pike quenelles, gratinÃƒÂ©ed onion soup, duck foie gras en croÃƒÂ»te de brioche Ã¢â‚¬â€œ these great classics are prepared with a respect and precision that honours centuries of tradition. The cellar, a formidable selection of Burgundies, CÃƒÂ´tes-du-RhÃƒÂ´ne and Beaujolais, perfectly completes this hymn to the Lyon terroir.',
 'Mar-Sam Ã‚Â· 12h-14h & 19h30-22h | Dim-Lun fermÃƒÂ©'),

('Le QuinziÃƒÂ¨me',
 '14 Rue Cauchy, Paris, 75015, France',
 'Paris, France', 'Paris', 'Ã¢â€šÂ¬Ã¢â€šÂ¬Ã¢â€šÂ¬', 'Creative French',
 2.2918, 48.8432, '+33145548343',
 'https://guide.michelin.com/fr/ile-de-france/paris/restaurant/le-quinzieme-cyril-lignac',
 'https://www.restaurantlequinzieme.com/',
 '1 Star', 1, 0,
 'Air conditioning,Interesting wine list',
 'Cyril Lignac has made his QuinziÃƒÂ¨me one of the finest creative tables in western Paris. Far from his television image, a meticulous and passionate chef deploys here a personal cuisine of great beauty and precision. Seasonal menus, updated each morning according to the morning market, alternate between classic references and more adventurous explorations. The warm atmosphere and impeccable service make every dinner an authentic and generous shared experience.',
 'Mar-Sam Ã‚Â· 12h-14h & 19h-22h | Dim-Lun fermÃƒÂ©'),

('La ScÃƒÂ¨ne',
 '32 Avenue Matignon, Paris, 75008, France',
 'Paris, France', 'Paris', '€€€€', 'Creative, Modern French',
 2.3161, 48.8743, '+33142655035',
 'https://guide.michelin.com/fr/ile-de-france/paris/restaurant/la-scene',
 'https://www.lascene.com/',
 '1 Star', 1, 0,
 'Air conditioning,Interesting wine list,Wheelchair access',
 'StÃƒÂ©phanie Le Quellec''s La ScÃƒÂ¨ne is one of the most elegant dining rooms in the 8th arrondissement. Her cuisine, intensely feminine and deeply personal, draws on her Mediterranean and Lyonnaise roots to create dishes of rare poetry and balance. The signature roasted langoustine with fermented cream and wild herbs is a masterclass in restraint and precision. Her impeccable attention to every detail Ã¢â‚¬â€œ from the ceramics to the bread trolley Ã¢â‚¬â€œ makes La ScÃƒÂ¨ne a complete gastronomic experience of the highest order.',
 'Lun-Ven Ã‚Â· 12h-14h & 19h-22h | Sam-Dim fermÃƒÂ©'),

-- Ã¢â€â‚¬Ã¢â€â‚¬ BIB GOURMAND Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬

('Bistrot Paul Bert',
 '18 Rue Paul Bert, Paris, 75011, France',
 'Paris, France', 'Paris', 'Ã¢â€šÂ¬Ã¢â€šÂ¬', 'Classic French, Bistro',
 2.3817, 48.8518, '+33143729801',
 'https://guide.michelin.com/fr/ile-de-france/paris/restaurant/le-bistrot-paul-bert',
 '',
 'Bib Gourmand', 0, 0,
 'Interesting wine list,Terrace',
 'Bertrand Auboyneau has made the Paul Bert bistro one of the most beloved addresses of authentic Parisian culinary tradition. Here, everything speaks of genuine bistro life: the tiled floor, the zinc counter, the chalk-written slate menus. The cuisine is frank, direct, seasonal and perfectly executed: beef tartare hand-cut to order, roasted bone marrow with fleur de sel, profiteroles with hot chocolate sauce. A living hymn to Parisian bistro culture Ã¢â‚¬â€œ unchanged for decades and resolutely faithful to a popular culinary tradition of rare integrity.',
 'Mar-Sam Ã‚Â· 12h-14h30 & 19h30-23h | Dim-Lun fermÃƒÂ©'),

('Le Comptoir du Relais',
 '9 Carrefour de l''OdÃƒÂ©on, Paris, 75006, France',
 'Paris, France', 'Paris', 'Ã¢â€šÂ¬Ã¢â€šÂ¬', 'French Bistro, Lyonnaise Cuisine',
 2.3396, 48.8517, '+33144270797',
 'https://guide.michelin.com/fr/ile-de-france/paris/restaurant/le-comptoir-du-relais',
 '',
 'Bib Gourmand', 0, 0,
 'Terrace',
 'Yves Camdeborde, the pioneer of the neo-bistro movement, brings the best of accessible Parisian gastronomy to the Comptoir. His cuisine, direct and seasonal, reveals an exceptional command of product quality and classic French technique. The Saturday evening five-course dinner menu has become a Parisian institution, with reservations required months in advance. The brasserie formula at lunch allows a spontaneous stop for charcuterie, a tartare or a croque-monsieur prepared with the same care. A true address that has marked an entire generation of chefs.',
 'Lun-Dim Ã‚Â· 12h-23h'),

('L''Atelier du Peintre',
 '1 Rue Schongauer, Colmar, 68000, France',
 'Colmar, France', 'Colmar', 'Ã¢â€šÂ¬Ã¢â€šÂ¬', 'Creative, Alsatian',
 7.3568, 48.0793, '+33389291557',
 'https://guide.michelin.com/fr/grand-est/colmar/restaurant/l-atelier-du-peintre',
 'https://www.atelier-peintre.fr/',
 'Bib Gourmand', 0, 0,
 'Air conditioning,Terrace',
 'In picturesque Little Venice in Colmar, LoÃƒÂ¯c Lefebvre offers a creative and accessible re-reading of Alsatian cuisine. Far from folksy clichÃƒÂ©s, his cooking revisits sauerkraut, baeckeoffe and kugelhopf through a fresh, contemporary prism. The short seasonal menu changes daily according to market visits and the chef''s inspirations. An excellent selection of Alsatian wines at fair prices completes this warm, charming address that has become one of the most beloved in the Haut-Rhin.',
 'Mar-Sam Ã‚Â· 12h-13h45 & 19h-21h45 | Dim-Lun fermÃƒÂ©'),

('CafÃƒÂ© Moderne',
 '19 Rue KlÃƒÂ©ber, Rennes, 35000, France',
 'Rennes, France', 'Rennes', 'Ã¢â€šÂ¬Ã¢â€šÂ¬', 'Creative, Seasonal Cuisine',
 -1.6778, 48.1147, '+33299798382',
 'https://guide.michelin.com/fr/bretagne/rennes/restaurant/cafe-moderne',
 'https://www.cafemoderne-rennes.fr/',
 'Bib Gourmand', 0, 0,
 'Interesting wine list,Terrace',
 'In the heart of old Rennes, this discreet address has become a favourite of gourmet locals in search of honest cooking and fair prices. The young chef, trained in Parisian kitchens, chose to return to his native Brittany to cook what he loves most: seasonal Breton products handled with care and creativity. Galette de blÃƒÂ© noir revisited as a stylish starter, lobster bisque with cider, Breton butter cake with caramel Ã¢â‚¬â€œ a resolutely local and proudly regional cuisine served in an effortlessly convivial atmosphere.',
 'Lun-Sam Ã‚Â· 12h-14h & 19h-22h | Dim fermÃƒÂ©'),

('La RÃƒÂ©galade Conservatoire',
 '9 Rue du Conservatoire, Paris, 75009, France',
 'Paris, France', 'Paris', 'Ã¢â€šÂ¬Ã¢â€šÂ¬', 'French Bistro, Classic',
 2.3481, 48.8726, '+33344715279',
 'https://guide.michelin.com/fr/ile-de-france/paris/restaurant/la-regalade-conservatoire',
 '',
 'Bib Gourmand', 0, 0,
 'Interesting wine list',
 'Bruno Doucet''s concept has found a new home near the Grands Boulevards with this busy, cheerful address. The menu offers the very best of French bistro cooking: generous, flavourful and without pretension, yet always perfectly executed. The country terrine served in its entire jar, sweetbreads with morel mushrooms, profiteroles with hot chocolate Ã¢â‚¬â€œ regulars return week after week for these indispensable dishes. Convivial atmosphere, reasonable prices and a quality that never wavers: the perfect Parisian bistronomy.',
 'Lun-Ven Ã‚Â· 12h-14h30 & 19h-22h30 | Sam-Dim fermÃƒÂ©'),

-- Ã¢â€â‚¬Ã¢â€â‚¬ GREEN STAR Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬

('La Marine',
 '1 Rue Marie Lemonnier, Noirmoutier-en-l''ÃƒÅ½le, 85330, France',
 'Noirmoutier-en-l''ÃƒÅ½le, France', 'Noirmoutier-en-l''ÃƒÅ½le', '€€€€', 'Creative, Seafood',
 -2.2569, 46.9832, '+33251390009',
 'https://guide.michelin.com/fr/pays-de-la-loire/noirmoutier-en-l-ile/restaurant/la-marine',
 'https://www.alexandrecouillon.com/',
 'Green Star', 0, 1,
 'Air conditioning,Interesting wine list,Terrace,Wheelchair access',
 'Alexandre Couillon has made La Marine a world reference in committed oceanic gastronomy. His deeply ecological approach Ã¢â‚¬â€œ local fishing, kitchen garden on the island, zero waste Ã¢â‚¬â€œ is combined with extraordinary culinary talent to produce dishes of rare intensity and honesty. Every morning he meets the fishermen, every day he visits his gardens: this daily ritual nourishes a resolutely seasonal and living cuisine. His sea purslane soup, dried fish on salt marsh hay and spider crab in seaweed bouillon have become emblematic dishes of a sincere, committed gastronomy.',
 'Mar-Sam Ã‚Â· 12h-13h30 & 19h30-21h30 | Dim-Lun fermÃƒÂ©'),

('Le Jardin des Plumes',
 '1 Rue du Milieu, Giverny, 27620, France',
 'Giverny, France', 'Giverny', 'Ã¢â€šÂ¬Ã¢â€šÂ¬Ã¢â€šÂ¬', 'Creative, Seasonal Cuisine',
 1.5358, 49.0772, '+33232540026',
 'https://guide.michelin.com/fr/normandie/giverny/restaurant/le-jardin-des-plumes',
 'https://www.jardindesplumes.fr/',
 'Green Star', 0, 1,
 'Car park,Garden or park,Interesting wine list,Terrace',
 'In the village of Monet, David Gallienne has created a culinary address as poetic as its surroundings. His cuisine, one of the most ecologically committed in Normandy, transforms the local terroir into impressionist paintings on the plate. Every vegetable comes from the kitchen garden planted in the spirit of Monet''s famous garden, every apple from neighbouring orchards, every fish from the nearby Norman coast. The seasonal, vegetable-forward tasting menu changes weekly, offering extraordinary finesse and narrative depth in every course.',
 'Jeu-Lun Ã‚Â· 12h-14h & 19h30-21h30 | Mar-Mer fermÃƒÂ©');


-- Section 3: Professional Opening Hours (Updates)
-- seed_opening_hours.sql Ã¢â‚¬â€ Horaires d'ouverture de tous les restaurants
-- Couvre les restaurants originaux (Allemagne, Nordique, Dubai) ET les restaurants franÃƒÂ§ais

-- Ã¢â€â‚¬Ã¢â€â‚¬ Restaurants franÃƒÂ§ais Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
UPDATE restaurants SET opening_hours = 'Mar-Sam Ã‚Â· 12h-14h & 19h30-22h | Dim-Lun fermÃƒÂ©'   WHERE name = 'Guy Savoy';
UPDATE restaurants SET opening_hours = 'Lun-Dim Ã‚Â· 12h-14h & 19h30-22h'                    WHERE name = 'Ãƒâ€°picure';
UPDATE restaurants SET opening_hours = 'Mer-Dim Ã‚Â· 12h-13h30 & 19h30-21h30 | Lun-Mar fermÃƒÂ©' WHERE name = 'Flocons de Sel';
UPDATE restaurants SET opening_hours = 'Jeu-Lun Ã‚Â· 12h-13h30 & 19h30-21h | Mar-Mer fermÃƒÂ©'  WHERE name = 'Auberge du Vieux Puits';
UPDATE restaurants SET opening_hours = 'Mer-Dim Ã‚Â· 12h-14h & 19h30-21h30 | Lun-Mar fermÃƒÂ©'  WHERE name = 'Maison Lameloise';
UPDATE restaurants SET opening_hours = 'Mer-Dim Ã‚Â· 12h-13h30 & 19h-21h | Lun-Mar fermÃƒÂ©'    WHERE name = 'Auberge de l''Ill';
UPDATE restaurants SET opening_hours = 'Lun-Ven Ã‚Â· 12h-14h & 19h-22h | Sam-Dim fermÃƒÂ©'      WHERE name = 'Taillevent';
UPDATE restaurants SET opening_hours = 'Mar-Sam Ã‚Â· 12h-14h & 19h30-22h | Dim-Lun fermÃƒÂ©'    WHERE name = 'Le Meurice';
UPDATE restaurants SET opening_hours = 'Mar-Sam Ã‚Â· 12h-14h30 & 19h30-22h | Dim-Lun fermÃƒÂ©'  WHERE name = 'Kei';
UPDATE restaurants SET opening_hours = 'Mer-Dim Ã‚Â· 12h-13h30 & 19h30-21h | Lun-Mar fermÃƒÂ©'  WHERE name = 'La GrenouillÃƒÂ¨re';
UPDATE restaurants SET opening_hours = 'Lun-Dim Ã‚Â· 12h-14h & 19h30-21h30'                   WHERE name = 'Oustau de BaumaniÃƒÂ¨re';
UPDATE restaurants SET opening_hours = 'Mar-Sam Ã‚Â· 19h-22h | Dim-Lun fermÃƒÂ©'                 WHERE name = 'Le Pressoir d''Argent';
UPDATE restaurants SET opening_hours = 'Lun-Ven Ã‚Â· 12h15-14h & 19h15-22h | Sam-Dim fermÃƒÂ©'  WHERE name = 'Septime';
UPDATE restaurants SET opening_hours = 'Lun-Ven Ã‚Â· 12h30-14h & 19h30-22h | Sam-Dim fermÃƒÂ©'  WHERE name = 'Le Grand VÃƒÂ©four';
UPDATE restaurants SET opening_hours = 'Mer-Dim Ã‚Â· 12h-13h30 & 19h30-21h | Lun-Mar fermÃƒÂ©'  WHERE name = 'Maison Marcon';
UPDATE restaurants SET opening_hours = 'Mar-Sam Ã‚Â· 12h30-14h & 19h30-22h | Dim-Lun fermÃƒÂ©'  WHERE name = 'L''Envol';
UPDATE restaurants SET opening_hours = 'Mar-Sam Ã‚Â· 12h-14h & 19h30-21h30 | Dim-Lun fermÃƒÂ©'  WHERE name = 'La Table de Ventabren';
UPDATE restaurants SET opening_hours = 'Mar-Sam Ã‚Â· 12h-14h & 19h30-22h | Dim-Lun fermÃƒÂ©'    WHERE name = 'LÃƒÂ©on de Lyon';
UPDATE restaurants SET opening_hours = 'Mar-Sam Ã‚Â· 12h-14h & 19h-22h | Dim-Lun fermÃƒÂ©'      WHERE name = 'Le QuinziÃƒÂ¨me';
UPDATE restaurants SET opening_hours = 'Lun-Ven Ã‚Â· 12h-14h & 19h-22h | Sam-Dim fermÃƒÂ©'      WHERE name = 'La ScÃƒÂ¨ne';
UPDATE restaurants SET opening_hours = 'Mar-Sam Ã‚Â· 12h-14h30 & 19h30-23h | Dim-Lun fermÃƒÂ©'  WHERE name = 'Bistrot Paul Bert';
UPDATE restaurants SET opening_hours = 'Lun-Dim Ã‚Â· 12h-23h'                                  WHERE name = 'Le Comptoir du Relais';
UPDATE restaurants SET opening_hours = 'Mar-Sam Ã‚Â· 12h-13h45 & 19h-21h45 | Dim-Lun fermÃƒÂ©'  WHERE name = 'L''Atelier du Peintre';
UPDATE restaurants SET opening_hours = 'Lun-Sam Ã‚Â· 12h-14h & 19h-22h | Dim fermÃƒÂ©'           WHERE name = 'CafÃƒÂ© Moderne';
UPDATE restaurants SET opening_hours = 'Lun-Ven Ã‚Â· 12h-14h30 & 19h-22h30 | Sam-Dim fermÃƒÂ©'  WHERE name = 'La RÃƒÂ©galade Conservatoire';
UPDATE restaurants SET opening_hours = 'Mar-Sam Ã‚Â· 12h-13h30 & 19h30-21h30 | Dim-Lun fermÃƒÂ©' WHERE name = 'La Marine';
UPDATE restaurants SET opening_hours = 'Jeu-Lun Ã‚Â· 12h-14h & 19h30-21h30 | Mar-Mer fermÃƒÂ©'  WHERE name = 'Le Jardin des Plumes';

-- Ã¢â€â‚¬Ã¢â€â‚¬ Restaurants originaux (Allemagne, Scandinavie, Dubai) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
UPDATE restaurants SET opening_hours = 'Mer-Sam Ã‚Â· 12h-14h & 19h-21h30 | Dim-Mar fermÃƒÂ©'  WHERE name = 'ES:SENZ';
UPDATE restaurants SET opening_hours = 'Mar-Sam Ã‚Â· 19h-22h | Dim-Lun fermÃƒÂ©'               WHERE name = 'Tohru in der Schreiberei';
UPDATE restaurants SET opening_hours = 'Mer-Dim Ã‚Â· 19h-21h30 | Lun-Mar fermÃƒÂ©'             WHERE name = 'Schwarzwaldstube';
UPDATE restaurants SET opening_hours = 'Mer-Sam Ã‚Â· 19h-21h30 | Dim-Mar fermÃƒÂ©'             WHERE name = 'Victor''s Fine Dining by christian bau';
UPDATE restaurants SET opening_hours = 'Jeu-Sam Ã‚Â· 12h-13h30 & 19h-21h | Dim-Mer fermÃƒÂ©'  WHERE name = 'schanz. restaurant.';
UPDATE restaurants SET opening_hours = 'Mar-Sam Ã‚Â· 18h30-22h | Dim-Lun fermÃƒÂ©'             WHERE name = 'Restaurant Haerlin';
UPDATE restaurants SET opening_hours = 'Mer-Sam Ã‚Â· 19h-22h | Dim-Mar fermÃƒÂ©'               WHERE name = 'The Table Kevin Fehling';
UPDATE restaurants SET opening_hours = 'Jeu-Dim Ã‚Â· 19h-21h30 | Lun-Mer fermÃƒÂ©'            WHERE name = 'Waldhotel Sonnora';
UPDATE restaurants SET opening_hours = 'Mar-Sam Ã‚Â· 19h-22h | Dim-Lun fermÃƒÂ©'               WHERE name = 'JAN';
UPDATE restaurants SET opening_hours = 'Mar-Dim Ã‚Â· 12h-14h & 19h-21h30 | Lun fermÃƒÂ©'      WHERE name = 'Restaurant Bareiss';
UPDATE restaurants SET opening_hours = 'Lun-Sam Ã‚Â· 19h-22h | Dim fermÃƒÂ©'                   WHERE name = 'Rutz';
UPDATE restaurants SET opening_hours = 'Mar-Sam Ã‚Â· 18h30-22h | Dim-Lun fermÃƒÂ©'             WHERE name = 'Maaemo';
UPDATE restaurants SET opening_hours = 'Mar-Sam Ã‚Â· 18h-22h | Dim-Lun fermÃƒÂ©'               WHERE name = 'RE-NAA';
UPDATE restaurants SET opening_hours = 'Mar-Sam Ã‚Â· 18h-22h | Dim-Lun fermÃƒÂ©'               WHERE name = 'FrantzÃƒÂ©n';
UPDATE restaurants SET opening_hours = 'Mer-Sam Ã‚Â· 18h30-22h | Dim-Mar fermÃƒÂ©'             WHERE name = 'JordnÃƒÂ¦r';
UPDATE restaurants SET opening_hours = 'Mar-Sam Ã‚Â· 12h-13h & 18h-21h30 | Dim-Lun fermÃƒÂ©'  WHERE name = 'Geranium';
UPDATE restaurants SET opening_hours = 'Mar-Dim Ã‚Â· 19h-22h | Lun fermÃƒÂ©'                   WHERE name = 'HiÃ…Â¡a Franko';
UPDATE restaurants SET opening_hours = 'Lun-Dim Ã‚Â· 19h-23h'                               WHERE name = 'TrÃƒÂ¨sind Studio';
UPDATE restaurants SET opening_hours = 'Lun-Dim Ã‚Â· 12h-14h & 18h-23h'                    WHERE name = 'Grande Ãƒâ€°toile';
UPDATE restaurants SET opening_hours = 'Mer-Dim Ã‚Â· 12h-14h & 18h-21h | Lun-Mar fermÃƒÂ©'    WHERE name = 'Goldener Engel';
UPDATE restaurants SET opening_hours = 'Lun-Dim Ã‚Â· 12h-22h'                               WHERE name = 'Chiemgauhof';
UPDATE restaurants SET opening_hours = 'Mar-Sam Ã‚Â· 19h-22h | Dim-Lun fermÃƒÂ©'               WHERE name = 'Chefs Atelier';
UPDATE restaurants SET opening_hours = 'Jeu-Lun Ã‚Â· 19h-23h | Mar-Mer fermÃƒÂ©'              WHERE name = 'FZN by BjÃƒÂ¶rn FrantzÃƒÂ©n';


-- Section 4: JSON Opening Hours Format (Final Format)
-- update_opening_hours_json.sql
-- Migration : convertit les horaires en JSON {Lun, Mar, Mer, Jeu, Ven, Sam, Dim}
-- Chaque jour a une valeur : "HH-HH", "HH-HH & HH-HH", ou "fermÃƒÂ©"

SET NAMES utf8mb4;

-- Ã¢â€â‚¬Ã¢â€â‚¬ Restaurants allemands Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"fermÃƒÂ©","Mer":"12h-14h & 19h-21h30","Jeu":"12h-14h & 19h-21h30","Ven":"12h-14h & 19h-21h30","Sam":"12h-14h & 19h-21h30","Dim":"fermÃƒÂ©"}' WHERE name = 'ES:SENZ';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"19h-22h","Mer":"19h-22h","Jeu":"19h-22h","Ven":"19h-22h","Sam":"19h-22h","Dim":"fermÃƒÂ©"}' WHERE name = 'Tohru in der Schreiberei';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"fermÃƒÂ©","Mer":"19h-21h30","Jeu":"19h-21h30","Ven":"19h-21h30","Sam":"19h-21h30","Dim":"19h-21h30"}' WHERE name = 'Schwarzwaldstube';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"fermÃƒÂ©","Mer":"19h-21h30","Jeu":"19h-21h30","Ven":"19h-21h30","Sam":"19h-21h30","Dim":"fermÃƒÂ©"}' WHERE name = 'Victor''s Fine Dining by christian bau';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"fermÃƒÂ©","Mer":"fermÃƒÂ©","Jeu":"12h-13h30 & 19h-21h","Ven":"12h-13h30 & 19h-21h","Sam":"12h-13h30 & 19h-21h","Dim":"fermÃƒÂ©"}' WHERE name = 'schanz. restaurant.';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"18h30-22h","Mer":"18h30-22h","Jeu":"18h30-22h","Ven":"18h30-22h","Sam":"18h30-22h","Dim":"fermÃƒÂ©"}' WHERE name = 'Restaurant Haerlin';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"fermÃƒÂ©","Mer":"19h-22h","Jeu":"19h-22h","Ven":"19h-22h","Sam":"19h-22h","Dim":"fermÃƒÂ©"}' WHERE name = 'The Table Kevin Fehling';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"fermÃƒÂ©","Mer":"fermÃƒÂ©","Jeu":"19h-21h30","Ven":"19h-21h30","Sam":"19h-21h30","Dim":"19h-21h30"}' WHERE name = 'Waldhotel Sonnora';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"19h-22h","Mer":"19h-22h","Jeu":"19h-22h","Ven":"19h-22h","Sam":"19h-22h","Dim":"fermÃƒÂ©"}' WHERE name = 'JAN';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"12h-14h & 19h-21h30","Mer":"12h-14h & 19h-21h30","Jeu":"12h-14h & 19h-21h30","Ven":"12h-14h & 19h-21h30","Sam":"12h-14h & 19h-21h30","Dim":"12h-14h & 19h-21h30"}' WHERE name = 'Restaurant Bareiss';
UPDATE restaurants SET opening_hours = '{"Lun":"19h-22h","Mar":"19h-22h","Mer":"19h-22h","Jeu":"19h-22h","Ven":"19h-22h","Sam":"19h-22h","Dim":"fermÃƒÂ©"}' WHERE name = 'Rutz';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"fermÃƒÂ©","Mer":"19h-22h","Jeu":"19h-22h","Ven":"19h-22h","Sam":"19h-22h","Dim":"fermÃƒÂ©"}' WHERE name = 'Grande Ãƒâ€°toile';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"fermÃƒÂ©","Mer":"12h-14h & 18h-21h","Jeu":"12h-14h & 18h-21h","Ven":"12h-14h & 18h-21h","Sam":"12h-14h & 18h-21h","Dim":"12h-14h & 18h-21h"}' WHERE name = 'Goldener Engel';
UPDATE restaurants SET opening_hours = '{"Lun":"12h-22h","Mar":"12h-22h","Mer":"12h-22h","Jeu":"12h-22h","Ven":"12h-22h","Sam":"12h-22h","Dim":"12h-22h"}' WHERE name = 'Chiemgauhof';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"19h-22h","Mer":"19h-22h","Jeu":"19h-22h","Ven":"19h-22h","Sam":"19h-22h","Dim":"fermÃƒÂ©"}' WHERE name = 'Chefs Atelier';

-- Ã¢â€â‚¬Ã¢â€â‚¬ Restaurants scandinaves Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"18h30-22h","Mer":"18h30-22h","Jeu":"18h30-22h","Ven":"18h30-22h","Sam":"18h30-22h","Dim":"fermÃƒÂ©"}' WHERE name = 'Maaemo';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"18h-22h","Mer":"18h-22h","Jeu":"18h-22h","Ven":"18h-22h","Sam":"18h-22h","Dim":"fermÃƒÂ©"}' WHERE name = 'RE-NAA';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"18h-22h","Mer":"18h-22h","Jeu":"18h-22h","Ven":"18h-22h","Sam":"18h-22h","Dim":"fermÃƒÂ©"}' WHERE name = 'FrantzÃƒÂ©n';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"fermÃƒÂ©","Mer":"18h30-22h","Jeu":"18h30-22h","Ven":"18h30-22h","Sam":"18h30-22h","Dim":"fermÃƒÂ©"}' WHERE name = 'JordnÃƒÂ¦r';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"12h-13h & 18h-21h30","Mer":"12h-13h & 18h-21h30","Jeu":"12h-13h & 18h-21h30","Ven":"12h-13h & 18h-21h30","Sam":"12h-13h & 18h-21h30","Dim":"fermÃƒÂ©"}' WHERE name = 'Geranium';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"19h-22h","Mer":"19h-22h","Jeu":"19h-22h","Ven":"19h-22h","Sam":"19h-22h","Dim":"19h-22h"}' WHERE name = 'HiÃ…Â¡a Franko';

-- Ã¢â€â‚¬Ã¢â€â‚¬ Restaurants Dubai Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
UPDATE restaurants SET opening_hours = '{"Lun":"19h-23h","Mar":"19h-23h","Mer":"19h-23h","Jeu":"19h-23h","Ven":"19h-23h","Sam":"19h-23h","Dim":"19h-23h"}' WHERE name = 'TrÃƒÂ¨sind Studio';
UPDATE restaurants SET opening_hours = '{"Lun":"19h-23h","Mar":"fermÃƒÂ©","Mer":"fermÃƒÂ©","Jeu":"19h-23h","Ven":"19h-23h","Sam":"19h-23h","Dim":"19h-23h"}' WHERE name = 'FZN by BjÃƒÂ¶rn FrantzÃƒÂ©n';

-- Ã¢â€â‚¬Ã¢â€â‚¬ Restaurants franÃƒÂ§ais Ã¢â‚¬â€ 3 ÃƒÂ©toiles Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"12h-14h & 19h30-22h","Mer":"12h-14h & 19h30-22h","Jeu":"12h-14h & 19h30-22h","Ven":"12h-14h & 19h30-22h","Sam":"12h-14h & 19h30-22h","Dim":"fermÃƒÂ©"}' WHERE name = 'Guy Savoy';
UPDATE restaurants SET opening_hours = '{"Lun":"12h-14h & 19h30-22h","Mar":"12h-14h & 19h30-22h","Mer":"12h-14h & 19h30-22h","Jeu":"12h-14h & 19h30-22h","Ven":"12h-14h & 19h30-22h","Sam":"12h-14h & 19h30-22h","Dim":"12h-14h & 19h30-22h"}' WHERE name = 'Ãƒâ€°picure';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"fermÃƒÂ©","Mer":"12h-13h30 & 19h30-21h30","Jeu":"12h-13h30 & 19h30-21h30","Ven":"12h-13h30 & 19h30-21h30","Sam":"12h-13h30 & 19h30-21h30","Dim":"12h-13h30 & 19h30-21h30"}' WHERE name = 'Flocons de Sel';
UPDATE restaurants SET opening_hours = '{"Lun":"12h-13h30 & 19h30-21h","Mar":"fermÃƒÂ©","Mer":"fermÃƒÂ©","Jeu":"12h-13h30 & 19h30-21h","Ven":"12h-13h30 & 19h30-21h","Sam":"12h-13h30 & 19h30-21h","Dim":"12h-13h30 & 19h30-21h"}' WHERE name = 'Auberge du Vieux Puits';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"fermÃƒÂ©","Mer":"12h-14h & 19h30-21h30","Jeu":"12h-14h & 19h30-21h30","Ven":"12h-14h & 19h30-21h30","Sam":"12h-14h & 19h30-21h30","Dim":"12h-14h & 19h30-21h30"}' WHERE name = 'Maison Lameloise';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"fermÃƒÂ©","Mer":"12h-13h30 & 19h-21h","Jeu":"12h-13h30 & 19h-21h","Ven":"12h-13h30 & 19h-21h","Sam":"12h-13h30 & 19h-21h","Dim":"12h-13h30 & 19h-21h"}' WHERE name = 'Auberge de l''Ill';

-- Ã¢â€â‚¬Ã¢â€â‚¬ Restaurants franÃƒÂ§ais Ã¢â‚¬â€ 2 ÃƒÂ©toiles Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
UPDATE restaurants SET opening_hours = '{"Lun":"12h-14h & 19h-22h","Mar":"12h-14h & 19h-22h","Mer":"12h-14h & 19h-22h","Jeu":"12h-14h & 19h-22h","Ven":"12h-14h & 19h-22h","Sam":"fermÃƒÂ©","Dim":"fermÃƒÂ©"}' WHERE name = 'Taillevent';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"12h-14h & 19h30-22h","Mer":"12h-14h & 19h30-22h","Jeu":"12h-14h & 19h30-22h","Ven":"12h-14h & 19h30-22h","Sam":"12h-14h & 19h30-22h","Dim":"fermÃƒÂ©"}' WHERE name = 'Le Meurice';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"12h-14h30 & 19h30-22h","Mer":"12h-14h30 & 19h30-22h","Jeu":"12h-14h30 & 19h30-22h","Ven":"12h-14h30 & 19h30-22h","Sam":"12h-14h30 & 19h30-22h","Dim":"fermÃƒÂ©"}' WHERE name = 'Kei';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"fermÃƒÂ©","Mer":"12h-13h30 & 19h30-21h","Jeu":"12h-13h30 & 19h30-21h","Ven":"12h-13h30 & 19h30-21h","Sam":"12h-13h30 & 19h30-21h","Dim":"12h-13h30 & 19h30-21h"}' WHERE name = 'La GrenouillÃƒÂ¨re';
UPDATE restaurants SET opening_hours = '{"Lun":"12h-14h & 19h30-21h30","Mar":"12h-14h & 19h30-21h30","Mer":"12h-14h & 19h30-21h30","Jeu":"12h-14h & 19h30-21h30","Ven":"12h-14h & 19h30-21h30","Sam":"12h-14h & 19h30-21h30","Dim":"12h-14h & 19h30-21h30"}' WHERE name = 'Oustau de BaumaniÃƒÂ¨re';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"19h-22h","Mer":"19h-22h","Jeu":"19h-22h","Ven":"19h-22h","Sam":"19h-22h","Dim":"fermÃƒÂ©"}' WHERE name = 'Le Pressoir d''Argent';

-- Ã¢â€â‚¬Ã¢â€â‚¬ Restaurants franÃƒÂ§ais Ã¢â‚¬â€ 1 ÃƒÂ©toile Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
UPDATE restaurants SET opening_hours = '{"Lun":"12h15-14h & 19h15-22h","Mar":"12h15-14h & 19h15-22h","Mer":"12h15-14h & 19h15-22h","Jeu":"12h15-14h & 19h15-22h","Ven":"12h15-14h & 19h15-22h","Sam":"fermÃƒÂ©","Dim":"fermÃƒÂ©"}' WHERE name = 'Septime';
UPDATE restaurants SET opening_hours = '{"Lun":"12h30-14h & 19h30-22h","Mar":"12h30-14h & 19h30-22h","Mer":"12h30-14h & 19h30-22h","Jeu":"12h30-14h & 19h30-22h","Ven":"12h30-14h & 19h30-22h","Sam":"fermÃƒÂ©","Dim":"fermÃƒÂ©"}' WHERE name = 'Le Grand VÃƒÂ©four';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"fermÃƒÂ©","Mer":"12h-13h30 & 19h30-21h","Jeu":"12h-13h30 & 19h30-21h","Ven":"12h-13h30 & 19h30-21h","Sam":"12h-13h30 & 19h30-21h","Dim":"12h-13h30 & 19h30-21h"}' WHERE name = 'Maison Marcon';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"12h30-14h & 19h30-22h","Mer":"12h30-14h & 19h30-22h","Jeu":"12h30-14h & 19h30-22h","Ven":"12h30-14h & 19h30-22h","Sam":"12h30-14h & 19h30-22h","Dim":"fermÃƒÂ©"}' WHERE name = 'L''Envol';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"12h-14h & 19h30-21h30","Mer":"12h-14h & 19h30-21h30","Jeu":"12h-14h & 19h30-21h30","Ven":"12h-14h & 19h30-21h30","Sam":"12h-14h & 19h30-21h30","Dim":"fermÃƒÂ©"}' WHERE name = 'La Table de Ventabren';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"12h-14h & 19h30-22h","Mer":"12h-14h & 19h30-22h","Jeu":"12h-14h & 19h30-22h","Ven":"12h-14h & 19h30-22h","Sam":"12h-14h & 19h30-22h","Dim":"fermÃƒÂ©"}' WHERE name = 'LÃƒÂ©on de Lyon';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"12h-14h & 19h-22h","Mer":"12h-14h & 19h-22h","Jeu":"12h-14h & 19h-22h","Ven":"12h-14h & 19h-22h","Sam":"12h-14h & 19h-22h","Dim":"fermÃƒÂ©"}' WHERE name = 'Le QuinziÃƒÂ¨me';
UPDATE restaurants SET opening_hours = '{"Lun":"12h-14h & 19h-22h","Mar":"12h-14h & 19h-22h","Mer":"12h-14h & 19h-22h","Jeu":"12h-14h & 19h-22h","Ven":"12h-14h & 19h-22h","Sam":"fermÃƒÂ©","Dim":"fermÃƒÂ©"}' WHERE name = 'La ScÃƒÂ¨ne';

-- Ã¢â€â‚¬Ã¢â€â‚¬ Restaurants franÃƒÂ§ais Ã¢â‚¬â€ Bib Gourmand Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"12h-14h30 & 19h30-23h","Mer":"12h-14h30 & 19h30-23h","Jeu":"12h-14h30 & 19h30-23h","Ven":"12h-14h30 & 19h30-23h","Sam":"12h-14h30 & 19h30-23h","Dim":"fermÃƒÂ©"}' WHERE name = 'Bistrot Paul Bert';
UPDATE restaurants SET opening_hours = '{"Lun":"12h-23h","Mar":"12h-23h","Mer":"12h-23h","Jeu":"12h-23h","Ven":"12h-23h","Sam":"12h-23h","Dim":"12h-23h"}' WHERE name = 'Le Comptoir du Relais';
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"12h-13h45 & 19h-21h45","Mer":"12h-13h45 & 19h-21h45","Jeu":"12h-13h45 & 19h-21h45","Ven":"12h-13h45 & 19h-21h45","Sam":"12h-13h45 & 19h-21h45","Dim":"fermÃƒÂ©"}' WHERE name = 'L''Atelier du Peintre';
UPDATE restaurants SET opening_hours = '{"Lun":"12h-14h & 19h-22h","Mar":"12h-14h & 19h-22h","Mer":"12h-14h & 19h-22h","Jeu":"12h-14h & 19h-22h","Ven":"12h-14h & 19h-22h","Sam":"12h-14h & 19h-22h","Dim":"fermÃƒÂ©"}' WHERE name = 'CafÃƒÂ© Moderne';
UPDATE restaurants SET opening_hours = '{"Lun":"12h-14h30 & 19h-22h30","Mar":"12h-14h30 & 19h-22h30","Mer":"12h-14h30 & 19h-22h30","Jeu":"12h-14h30 & 19h-22h30","Ven":"12h-14h30 & 19h-22h30","Sam":"fermÃƒÂ©","Dim":"fermÃƒÂ©"}' WHERE name = 'La RÃƒÂ©galade Conservatoire';

-- Ã¢â€â‚¬Ã¢â€â‚¬ Restaurants franÃƒÂ§ais Ã¢â‚¬â€ Green Star Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
UPDATE restaurants SET opening_hours = '{"Lun":"fermÃƒÂ©","Mar":"12h-13h30 & 19h30-21h30","Mer":"12h-13h30 & 19h30-21h30","Jeu":"12h-13h30 & 19h30-21h30","Ven":"12h-13h30 & 19h30-21h30","Sam":"12h-13h30 & 19h30-21h30","Dim":"fermÃƒÂ©"}' WHERE name = 'La Marine';
UPDATE restaurants SET opening_hours = '{"Lun":"12h-14h & 19h30-21h30","Mar":"fermÃƒÂ©","Mer":"fermÃƒÂ©","Jeu":"12h-14h & 19h30-21h30","Ven":"12h-14h & 19h30-21h30","Sam":"12h-14h & 19h30-21h30","Dim":"12h-14h & 19h30-21h30"}' WHERE name = 'Le Jardin des Plumes';


-- Section 5: Restaurant Photos
-- seed_restaurant_photos.sql
-- 3 ÃƒÂ  5 photos par restaurant, rÃƒÂ©fÃƒÂ©rencÃƒÂ©es par nom pour ÃƒÂ©viter les dÃƒÂ©pendances d'ID

SET NAMES utf8mb4;

-- ES:SENZ (Grassau, Germany)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', 'Salle du restaurant ES:SENZ', 0 FROM restaurants WHERE name = 'ES:SENZ';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80', 'Cuisine crÃƒÂ©ative ES:SENZ', 1 FROM restaurants WHERE name = 'ES:SENZ';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80', 'Plat signature ES:SENZ', 2 FROM restaurants WHERE name = 'ES:SENZ';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80', 'Vue panoramique ES:SENZ', 3 FROM restaurants WHERE name = 'ES:SENZ';

-- Tohru in der Schreiberei (Munich)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', 'IntÃƒÂ©rieur Tohru in der Schreiberei', 0 FROM restaurants WHERE name = 'Tohru in der Schreiberei';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1200&q=80', 'Cuisine japonaise-franÃƒÂ§aise', 1 FROM restaurants WHERE name = 'Tohru in der Schreiberei';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80', 'Plat signature Tohru', 2 FROM restaurants WHERE name = 'Tohru in der Schreiberei';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', 'Dressage gastronomique', 3 FROM restaurants WHERE name = 'Tohru in der Schreiberei';

-- Schwarzwaldstube (Baiersbronn)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 'Salle Schwarzwaldstube', 0 FROM restaurants WHERE name = 'Schwarzwaldstube';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', 'Ambiance ForÃƒÂªt Noire', 1 FROM restaurants WHERE name = 'Schwarzwaldstube';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=1200&q=80', 'CrÃƒÂ©ation culinaire classique franÃƒÂ§aise', 2 FROM restaurants WHERE name = 'Schwarzwaldstube';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', 'Vue panoramique de la vallÃƒÂ©e', 3 FROM restaurants WHERE name = 'Schwarzwaldstube';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80', 'Dessert signature', 4 FROM restaurants WHERE name = 'Schwarzwaldstube';

-- Victor's Fine Dining by christian bau (Perl)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80', 'Victor\'s Fine Dining - salle principale', 0 FROM restaurants WHERE name = 'Victor\'s Fine Dining by christian bau';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80', 'Paris-Tokyo fusion dish', 1 FROM restaurants WHERE name = 'Victor\'s Fine Dining by christian bau';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80', 'Tataki de thon et caviar', 2 FROM restaurants WHERE name = 'Victor\'s Fine Dining by christian bau';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1200&q=80', 'Dessert signature bau.stein', 3 FROM restaurants WHERE name = 'Victor\'s Fine Dining by christian bau';

-- schanz. restaurant. (Piesport)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80', 'Salle schanz. restaurant.', 0 FROM restaurants WHERE name = 'schanz. restaurant.';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', 'Vue sur la cour intÃƒÂ©rieure', 1 FROM restaurants WHERE name = 'schanz. restaurant.';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80', 'Pot-au-feu signature Thomas Schanz', 2 FROM restaurants WHERE name = 'schanz. restaurant.';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 'Vins de Moselle en accord', 3 FROM restaurants WHERE name = 'schanz. restaurant.';

-- Restaurant Haerlin (Hamburg)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', 'Salle Haerlin - HÃƒÂ´tel Vier Jahreszeiten', 0 FROM restaurants WHERE name = 'Restaurant Haerlin';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', 'Vue sur l\'Alster intÃƒÂ©rieur', 1 FROM restaurants WHERE name = 'Restaurant Haerlin';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80', 'Langoustine Haerlin', 2 FROM restaurants WHERE name = 'Restaurant Haerlin';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=1200&q=80', 'Selle de cerf au jus', 3 FROM restaurants WHERE name = 'Restaurant Haerlin';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80', 'Cave ÃƒÂ  vins exceptionnelle', 4 FROM restaurants WHERE name = 'Restaurant Haerlin';

-- The Table Kevin Fehling (Hamburg)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', 'The Table - comptoir principal', 0 FROM restaurants WHERE name = 'The Table Kevin Fehling';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80', 'Cuisine ouverte The Table', 1 FROM restaurants WHERE name = 'The Table Kevin Fehling';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80', 'The Sea - huÃƒÂ®tre pochÃƒÂ©e et hamachi', 2 FROM restaurants WHERE name = 'The Table Kevin Fehling';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80', 'Ballotine de caille', 3 FROM restaurants WHERE name = 'The Table Kevin Fehling';

-- Waldhotel Sonnora (Dreis)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 'Waldhotel Sonnora - cadre forestier', 0 FROM restaurants WHERE name = 'Waldhotel Sonnora';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1200&q=80', 'Turbot de VendÃƒÂ©e grillÃƒÂ© au charbon', 1 FROM restaurants WHERE name = 'Waldhotel Sonnora';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', 'Tartare de bÃ…â€œuf et caviar N25', 2 FROM restaurants WHERE name = 'Waldhotel Sonnora';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80', 'Salle ÃƒÂ©lÃƒÂ©gante Sonnora', 3 FROM restaurants WHERE name = 'Waldhotel Sonnora';

-- JAN (Munich)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', 'JAN - salle chic et moderne', 0 FROM restaurants WHERE name = 'JAN';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80', 'Cuisine ouverte - Labor der Liebe', 1 FROM restaurants WHERE name = 'JAN';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80', 'Oursin Louise - plat signature', 2 FROM restaurants WHERE name = 'JAN';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=1200&q=80', 'PÃƒÂ¢tÃƒÂ© en croÃƒÂ»te Jan Hartwig', 3 FROM restaurants WHERE name = 'JAN';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', 'Menu 7 cours immersif', 4 FROM restaurants WHERE name = 'JAN';

-- Restaurant Bareiss (Baiersbronn)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', 'HÃƒÂ´tel Bareiss - salle de restaurant', 0 FROM restaurants WHERE name = 'Restaurant Bareiss';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80', 'Amuse-bouches chauds au homard', 1 FROM restaurants WHERE name = 'Restaurant Bareiss';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80', 'Chariot de desserts Stefan Leitner', 2 FROM restaurants WHERE name = 'Restaurant Bareiss';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80', 'DÃƒÂ©coration lampes en albÃƒÂ¢tre', 3 FROM restaurants WHERE name = 'Restaurant Bareiss';

-- Rutz (Berlin)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 'Rutz - terrasse estivale', 0 FROM restaurants WHERE name = 'Rutz';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1200&q=80', 'Wagyu d\'Oldenburg et garum de bÃ…â€œuf', 1 FROM restaurants WHERE name = 'Rutz';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', 'Inspiration - menu tasting Marco MÃƒÂ¼ller', 2 FROM restaurants WHERE name = 'Rutz';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80', 'Calmar mer du Nord et chou rouge', 3 FROM restaurants WHERE name = 'Rutz';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', 'Salle minimaliste et design', 4 FROM restaurants WHERE name = 'Rutz';

-- Maaemo (Oslo)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', 'Salle Maaemo - Oslo', 0 FROM restaurants WHERE name = 'Maaemo';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80', 'Cuisine ouverte thÃƒÂ©ÃƒÂ¢trale', 1 FROM restaurants WHERE name = 'Maaemo';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80', 'Menu surprise saisonnier', 2 FROM restaurants WHERE name = 'Maaemo';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=1200&q=80', 'Lounge Maaemo', 3 FROM restaurants WHERE name = 'Maaemo';

-- RE-NAA (Stavanger)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', 'RE-NAA - cuisine au centre', 0 FROM restaurants WHERE name = 'RE-NAA';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80', 'Coquille Saint-Jacques et baies d\'argousier', 1 FROM restaurants WHERE name = 'RE-NAA';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80', 'Poissons et crustacÃƒÂ©s locaux', 2 FROM restaurants WHERE name = 'RE-NAA';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80', 'Service RE-NAA raffinÃƒÂ©', 3 FROM restaurants WHERE name = 'RE-NAA';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', 'Menu 20 services', 4 FROM restaurants WHERE name = 'RE-NAA';

-- FrantzÃƒÂ©n (Stockholm)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 'FrantzÃƒÂ©n - faÃƒÂ§ade Stockholm', 0 FROM restaurants WHERE name = 'FrantzÃƒÂ©n';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1200&q=80', 'Lounge apÃƒÂ©ritif au dernier ÃƒÂ©tage', 1 FROM restaurants WHERE name = 'FrantzÃƒÂ©n';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80', 'Comptoir de dÃƒÂ©gustation', 2 FROM restaurants WHERE name = 'FrantzÃƒÂ©n';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', 'Chefs en action BjÃƒÂ¶rn FrantzÃƒÂ©n', 3 FROM restaurants WHERE name = 'FrantzÃƒÂ©n';

-- JordnÃƒÂ¦r (Gentofte)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', 'JordnÃƒÂ¦r - oasis sophistiquÃƒÂ©', 0 FROM restaurants WHERE name = 'JordnÃƒÂ¦r';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80', 'Hamachi, ponzu et wasabi', 1 FROM restaurants WHERE name = 'JordnÃƒÂ¦r';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80', 'Chawanmushi multi-couches', 2 FROM restaurants WHERE name = 'JordnÃƒÂ¦r';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=1200&q=80', 'Service Tina Vildgaard', 3 FROM restaurants WHERE name = 'JordnÃƒÂ¦r';

-- Geranium (Copenhagen)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', 'Geranium - 8e ÃƒÂ©tage Parken Stadium', 0 FROM restaurants WHERE name = 'Geranium';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80', 'Vue panoramique sur le parc', 1 FROM restaurants WHERE name = 'Geranium';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80', 'LÃƒÂ©gumes biodynamiques Rasmus Kofoed', 2 FROM restaurants WHERE name = 'Geranium';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80', 'Fruits de mer espÃƒÂ¨ces non menacÃƒÂ©es', 3 FROM restaurants WHERE name = 'Geranium';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', 'Cave ÃƒÂ  vins Geranium', 4 FROM restaurants WHERE name = 'Geranium';

-- HiÃ…Â¡a Franko (Kobarid)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 'HiÃ…Â¡a Franko - maison Ana RoÃ…Â¡', 0 FROM restaurants WHERE name = 'HiÃ…Â¡a Franko';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1200&q=80', 'Cappelletti tonka et feuilles de figuier', 1 FROM restaurants WHERE name = 'HiÃ…Â¡a Franko';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80', 'Beignet de maÃƒÂ¯s et ricotta fermentÃƒÂ©e', 2 FROM restaurants WHERE name = 'HiÃ…Â¡a Franko';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', 'Pommes de terre au foin et fenugrec', 3 FROM restaurants WHERE name = 'HiÃ…Â¡a Franko';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', 'Petit-dÃƒÂ©jeuner HiÃ…Â¡a Franko', 4 FROM restaurants WHERE name = 'HiÃ…Â¡a Franko';

-- TrÃƒÂ¨sind Studio (Dubai)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80', 'TrÃƒÂ¨sind Studio - toÃƒÂ®t du Palme', 0 FROM restaurants WHERE name = 'TrÃƒÂ¨sind Studio';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80', 'Tasting menu indien surprise', 1 FROM restaurants WHERE name = 'TrÃƒÂ¨sind Studio';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=1200&q=80', 'Cocktails bar Popadom Botanic', 2 FROM restaurants WHERE name = 'TrÃƒÂ¨sind Studio';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', 'Cuisine ouverte 15 couverts', 3 FROM restaurants WHERE name = 'TrÃƒÂ¨sind Studio';

-- Grande Ãƒâ€°toile (DÃƒÂ¼sseldorf)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80', 'Grande Ãƒâ€°toile - dÃƒÂ©cor Art DÃƒÂ©co', 0 FROM restaurants WHERE name = 'Grande Ãƒâ€°toile';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80', 'BÃ…â€œuf bourguignon revisitÃƒÂ©', 1 FROM restaurants WHERE name = 'Grande Ãƒâ€°toile';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80', 'Bar ÃƒÂ  cocktails soirÃƒÂ©e DJ', 2 FROM restaurants WHERE name = 'Grande Ãƒâ€°toile';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', 'Terrasse Grande Ãƒâ€°toile', 3 FROM restaurants WHERE name = 'Grande Ãƒâ€°toile';

-- Goldener Engel (Ihringen)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 'Goldener Engel - auberge traditionnelle', 0 FROM restaurants WHERE name = 'Goldener Engel';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1200&q=80', 'Joue de bÃ…â€œuf braisÃƒÂ© pinot noir', 1 FROM restaurants WHERE name = 'Goldener Engel';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80', 'Terrasse Goldener Engel', 2 FROM restaurants WHERE name = 'Goldener Engel';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', 'Cave ÃƒÂ  vins rÃƒÂ©gionaux badois', 3 FROM restaurants WHERE name = 'Goldener Engel';

-- Chiemgauhof (ÃƒÅ“bersee)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', 'Chiemgauhof - vue sur le lac Chiemsee', 0 FROM restaurants WHERE name = 'Chiemgauhof';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80', 'Terrasse au bord du Chiemsee', 1 FROM restaurants WHERE name = 'Chiemgauhof';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80', 'Cuisine rÃƒÂ©gionale revisitÃƒÂ©e', 2 FROM restaurants WHERE name = 'Chiemgauhof';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=1200&q=80', 'DÃƒÂ©coration bois et poÃƒÂªle carrelÃƒÂ©', 3 FROM restaurants WHERE name = 'Chiemgauhof';

-- Chefs Atelier (Essen)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', 'Chefs Atelier - lounge apÃƒÂ©ritif', 0 FROM restaurants WHERE name = 'Chefs Atelier';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80', 'Hamachi deux faÃƒÂ§ons Alexander Hoppe', 1 FROM restaurants WHERE name = 'Chefs Atelier';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80', 'CarrÃƒÂ© d\'agneau du Quercy', 2 FROM restaurants WHERE name = 'Chefs Atelier';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80', 'Cuisine ouverte 18 couverts', 3 FROM restaurants WHERE name = 'Chefs Atelier';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', 'Petits fours Chefs Atelier', 4 FROM restaurants WHERE name = 'Chefs Atelier';


-- Section 6: French Restaurant Photos
-- seed_photos_france.sql Ã¢â‚¬â€ Photos pour les 27 restaurants franÃƒÂ§ais
-- 4 ÃƒÂ  5 photos par restaurant via Unsplash

SET NAMES utf8mb4;

-- Ã¢â€â‚¬Ã¢â€â‚¬ Guy Savoy (Paris) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', 'Salle panoramique - Monnaie de Paris', 0 FROM restaurants WHERE name = 'Guy Savoy';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=1200&q=80', 'Soupe artichaut et truffe noire', 1 FROM restaurants WHERE name = 'Guy Savoy';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=1200&q=80', 'Bar en croÃƒÂ»te de cafÃƒÂ© ÃƒÂ©picÃƒÂ©', 2 FROM restaurants WHERE name = 'Guy Savoy';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=1200&q=80', 'Cave ÃƒÂ  vins Guy Savoy', 3 FROM restaurants WHERE name = 'Guy Savoy';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80', 'Vue sur la Seine depuis le restaurant', 4 FROM restaurants WHERE name = 'Guy Savoy';

-- Ã¢â€â‚¬Ã¢â€â‚¬ Ãƒâ€°picure (Paris) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', 'Salle Ãƒâ€°picure - Le Bristol Paris', 0 FROM restaurants WHERE name = 'Ãƒâ€°picure';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80', 'Macaroni ÃƒÂ  la truffe noire et foie gras', 1 FROM restaurants WHERE name = 'Ãƒâ€°picure';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1530469912745-a215c6b256ea?w=1200&q=80', 'Dessert signature Ãƒâ€°ric Frechon', 2 FROM restaurants WHERE name = 'Ãƒâ€°picure';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&q=80', 'Jardin du Bristol - dÃƒÂ©jeuner d''ÃƒÂ©tÃƒÂ©', 3 FROM restaurants WHERE name = 'Ãƒâ€°picure';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80', 'Dressage en cuisine', 4 FROM restaurants WHERE name = 'Ãƒâ€°picure';

-- Ã¢â€â‚¬Ã¢â€â‚¬ Flocons de Sel (MegÃƒÂ¨ve) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 'Terrasse panoramique face au Mont Blanc', 0 FROM restaurants WHERE name = 'Flocons de Sel';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80', 'Omble chevalier du lac en croÃƒÂ»te', 1 FROM restaurants WHERE name = 'Flocons de Sel';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80', 'Champignons sauvages de Haute-Savoie', 2 FROM restaurants WHERE name = 'Flocons de Sel';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=1200&q=80', 'Salle chalet alpine raffinÃƒÂ©e', 3 FROM restaurants WHERE name = 'Flocons de Sel';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=1200&q=80', 'Mignardises de fin de repas', 4 FROM restaurants WHERE name = 'Flocons de Sel';

-- Ã¢â€â‚¬Ã¢â€â‚¬ Auberge du Vieux Puits (Fontjoncouse) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', 'Terrasse en pierre - Fontjoncouse', 0 FROM restaurants WHERE name = 'Auberge du Vieux Puits';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=1200&q=80', 'L''Ã…â€œuf pourri de la terre - plat signature', 1 FROM restaurants WHERE name = 'Auberge du Vieux Puits';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80', 'LÃƒÂ©gumes du terroir languedocien', 2 FROM restaurants WHERE name = 'Auberge du Vieux Puits';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', 'Salle ÃƒÂ  manger de l''auberge', 3 FROM restaurants WHERE name = 'Auberge du Vieux Puits';

-- Ã¢â€â‚¬Ã¢â€â‚¬ Maison Lameloise (Chagny) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80', 'FaÃƒÂ§ade bourguignonne Maison Lameloise', 0 FROM restaurants WHERE name = 'Maison Lameloise';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1200&q=80', 'Volaille de Bresse en vessie', 1 FROM restaurants WHERE name = 'Maison Lameloise';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=1200&q=80', 'Grands crus de Bourgogne en cave', 2 FROM restaurants WHERE name = 'Maison Lameloise';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=1200&q=80', 'Salle de rÃƒÂ©ception Lameloise', 3 FROM restaurants WHERE name = 'Maison Lameloise';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=1200&q=80', 'Escargots de Bourgogne revisitÃƒÂ©s', 4 FROM restaurants WHERE name = 'Maison Lameloise';

-- Ã¢â€â‚¬Ã¢â€â‚¬ Auberge de l'Ill (Illhaeusern) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', 'Bord de l''Ill - cadre enchanteur', 0 FROM restaurants WHERE name = 'Auberge de l''Ill';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80', 'SoufflÃƒÂ© de saumon - monument gastronomique', 1 FROM restaurants WHERE name = 'Auberge de l''Ill';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=1200&q=80', 'Vins d''Alsace en accord', 2 FROM restaurants WHERE name = 'Auberge de l''Ill';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 'Jardin au bord de l''eau', 3 FROM restaurants WHERE name = 'Auberge de l''Ill';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1530469912745-a215c6b256ea?w=1200&q=80', 'Dessert classique alsacien', 4 FROM restaurants WHERE name = 'Auberge de l''Ill';

-- Ã¢â€â‚¬Ã¢â€â‚¬ Taillevent (Paris) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80', 'Salle Taillevent - ÃƒÂ©lÃƒÂ©gance intemporelle', 0 FROM restaurants WHERE name = 'Taillevent';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80', 'Homard breton en sauce', 1 FROM restaurants WHERE name = 'Taillevent';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&q=80', 'Truffes du PÃƒÂ©rigord - produits d''exception', 2 FROM restaurants WHERE name = 'Taillevent';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80', 'Cave lÃƒÂ©gendaire Taillevent', 3 FROM restaurants WHERE name = 'Taillevent';

-- Ã¢â€â‚¬Ã¢â€â‚¬ Le Meurice (Paris) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', 'Salle DalÃƒÂ­ - Le Meurice', 0 FROM restaurants WHERE name = 'Le Meurice';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=1200&q=80', 'Langoustine au beurre d''algues', 1 FROM restaurants WHERE name = 'Le Meurice';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=1200&q=80', 'Dessert signature Amaury Bouhours', 2 FROM restaurants WHERE name = 'Le Meurice';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=1200&q=80', 'Vue sur le jardin des Tuileries', 3 FROM restaurants WHERE name = 'Le Meurice';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&q=80', 'Mise en place raffinÃƒÂ©e Le Meurice', 4 FROM restaurants WHERE name = 'Le Meurice';

-- Ã¢â€â‚¬Ã¢â€â‚¬ Kei (Paris) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1200&q=80', 'Salle minimaliste Kei - inspiration japonaise', 0 FROM restaurants WHERE name = 'Kei';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80', 'Pivoine de homard - plat signature', 1 FROM restaurants WHERE name = 'Kei';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80', 'LÃƒÂ©gumes du marchÃƒÂ© de Paris', 2 FROM restaurants WHERE name = 'Kei';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=1200&q=80', 'CrÃƒÂ©ation franco-japonaise de Kei Kobayashi', 3 FROM restaurants WHERE name = 'Kei';

-- Ã¢â€â‚¬Ã¢â€â‚¬ La GrenouillÃƒÂ¨re (Montreuil-sur-Mer) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', 'Ferme rÃƒÂ©novÃƒÂ©e sur les marais', 0 FROM restaurants WHERE name = 'La GrenouillÃƒÂ¨re';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', 'Cuisine improvisÃƒÂ©e du marchÃƒÂ©', 1 FROM restaurants WHERE name = 'La GrenouillÃƒÂ¨re';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&q=80', 'VÃƒÂ©gÃƒÂ©taux sauvages des marais du Nord', 2 FROM restaurants WHERE name = 'La GrenouillÃƒÂ¨re';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80', 'Terrine nordiste signature', 3 FROM restaurants WHERE name = 'La GrenouillÃƒÂ¨re';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1200&q=80', 'Herbes et fleurs sauvages', 4 FROM restaurants WHERE name = 'La GrenouillÃƒÂ¨re';

-- Ã¢â€â‚¬Ã¢â€â‚¬ Oustau de BaumaniÃƒÂ¨re (Les Baux-de-Provence) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80', 'Terrasse face aux Alpilles', 0 FROM restaurants WHERE name = 'Oustau de BaumaniÃƒÂ¨re';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80', 'Agneau des Alpilles en croÃƒÂ»te d''herbes', 1 FROM restaurants WHERE name = 'Oustau de BaumaniÃƒÂ¨re';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=1200&q=80', 'Vins des Baux-de-Provence en accord', 2 FROM restaurants WHERE name = 'Oustau de BaumaniÃƒÂ¨re';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&q=80', 'Menu vÃƒÂ©gÃƒÂ©tarien - lÃƒÂ©gumes du jardin', 3 FROM restaurants WHERE name = 'Oustau de BaumaniÃƒÂ¨re';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1530469912745-a215c6b256ea?w=1200&q=80', 'Cour en pierre de Provence', 4 FROM restaurants WHERE name = 'Oustau de BaumaniÃƒÂ¨re';

-- Ã¢â€â‚¬Ã¢â€â‚¬ Le Pressoir d'Argent (Bordeaux) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', 'Grand HÃƒÂ´tel de Bordeaux - salle prestige', 0 FROM restaurants WHERE name = 'Le Pressoir d''Argent';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80', 'Homard pressÃƒÂ© ÃƒÂ  la presse en argent', 1 FROM restaurants WHERE name = 'Le Pressoir d''Argent';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=1200&q=80', 'Grands crus de Bordeaux en cave', 2 FROM restaurants WHERE name = 'Le Pressoir d''Argent';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80', 'CrustacÃƒÂ©s de l''Atlantique', 3 FROM restaurants WHERE name = 'Le Pressoir d''Argent';

-- Ã¢â€â‚¬Ã¢â€â‚¬ Septime (Paris) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 'Salle Septime - bois et matiÃƒÂ¨res naturelles', 0 FROM restaurants WHERE name = 'Septime';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80', 'LÃƒÂ©gumes de saison - producteurs locaux', 1 FROM restaurants WHERE name = 'Septime';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80', 'Poisson de pÃƒÂªche responsable', 2 FROM restaurants WHERE name = 'Septime';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1200&q=80', 'Herbes fraÃƒÂ®ches du marchÃƒÂ©', 3 FROM restaurants WHERE name = 'Septime';

-- Ã¢â€â‚¬Ã¢â€â‚¬ Le Grand VÃƒÂ©four (Paris) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=1200&q=80', 'Plafonds peints classÃƒÂ©s - Palais-Royal', 0 FROM restaurants WHERE name = 'Le Grand VÃƒÂ©four';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', 'Salle dorÃƒÂ©e du Grand VÃƒÂ©four', 1 FROM restaurants WHERE name = 'Le Grand VÃƒÂ©four';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80', 'Cuisine classique franÃƒÂ§aise', 2 FROM restaurants WHERE name = 'Le Grand VÃƒÂ©four';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=1200&q=80', 'Foie gras en entrÃƒÂ©e', 3 FROM restaurants WHERE name = 'Le Grand VÃƒÂ©four';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=1200&q=80', 'Dessert patrimonial revisitÃƒÂ©', 4 FROM restaurants WHERE name = 'Le Grand VÃƒÂ©four';

-- Ã¢â€â‚¬Ã¢â€â‚¬ Maison Marcon (Saint-Bonnet-le-Froid) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80', 'CÃƒÂ¨pes de la forÃƒÂªt auvergnate', 0 FROM restaurants WHERE name = 'Maison Marcon';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', 'Panorama sur le massif du MÃƒÂ©zenc', 1 FROM restaurants WHERE name = 'Maison Marcon';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', 'Champignons sauvages - plat signature', 2 FROM restaurants WHERE name = 'Maison Marcon';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=1200&q=80', 'Salle avec vue sur les volcans', 3 FROM restaurants WHERE name = 'Maison Marcon';

-- Ã¢â€â‚¬Ã¢â€â‚¬ L'Envol (Nice) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=1200&q=80', 'Panorama Baie des Anges - terrasse', 0 FROM restaurants WHERE name = 'L''Envol';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80', 'Rascasse de la Baie des Anges', 1 FROM restaurants WHERE name = 'L''Envol';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80', 'Socca revisitÃƒÂ©e en amuse-bouche', 2 FROM restaurants WHERE name = 'L''Envol';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=1200&q=80', 'Vins de Provence rosÃƒÂ© en accord', 3 FROM restaurants WHERE name = 'L''Envol';

-- Ã¢â€â‚¬Ã¢â€â‚¬ La Table de Ventabren (Ventabren) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80', 'Terrasse avec vue sur la vallÃƒÂ©e de l''Arc', 0 FROM restaurants WHERE name = 'La Table de Ventabren';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&q=80', 'LÃƒÂ©gumes du potager provenÃƒÂ§al', 1 FROM restaurants WHERE name = 'La Table de Ventabren';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80', 'Agneau des Alpilles au romarin', 2 FROM restaurants WHERE name = 'La Table de Ventabren';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80', 'Salle avec vue panoramique', 3 FROM restaurants WHERE name = 'La Table de Ventabren';

-- Ã¢â€â‚¬Ã¢â€â‚¬ LÃƒÂ©on de Lyon (Lyon) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 'Salle lyonnaise - dÃƒÂ©cor traditionnel', 0 FROM restaurants WHERE name = 'LÃƒÂ©on de Lyon';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1498654896293-37aaa4bbad10?w=1200&q=80', 'Quenelle de brochet sauce Nantua', 1 FROM restaurants WHERE name = 'LÃƒÂ©on de Lyon';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=1200&q=80', 'CÃƒÂ´tes-du-RhÃƒÂ´ne et Bourgognes en cave', 2 FROM restaurants WHERE name = 'LÃƒÂ©on de Lyon';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80', 'Foie gras en brioche - classique lyonnais', 3 FROM restaurants WHERE name = 'LÃƒÂ©on de Lyon';

-- Ã¢â€â‚¬Ã¢â€â‚¬ Le QuinziÃƒÂ¨me (Paris) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', 'Salle Le QuinziÃƒÂ¨me - atmosphÃƒÂ¨re chaleureuse', 0 FROM restaurants WHERE name = 'Le QuinziÃƒÂ¨me';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80', 'Plat de saison Cyril Lignac', 1 FROM restaurants WHERE name = 'Le QuinziÃƒÂ¨me';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1530469912745-a215c6b256ea?w=1200&q=80', 'Dessert signature - chocolat grand cru', 2 FROM restaurants WHERE name = 'Le QuinziÃƒÂ¨me';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=1200&q=80', 'Mise en place ÃƒÂ©lÃƒÂ©gante', 3 FROM restaurants WHERE name = 'Le QuinziÃƒÂ¨me';

-- Ã¢â€â‚¬Ã¢â€â‚¬ La ScÃƒÂ¨ne (Paris) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=1200&q=80', 'Salle intimiste La ScÃƒÂ¨ne', 0 FROM restaurants WHERE name = 'La ScÃƒÂ¨ne';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80', 'Langoustine rÃƒÂ´tie ÃƒÂ  la crÃƒÂ¨me fermentÃƒÂ©e', 1 FROM restaurants WHERE name = 'La ScÃƒÂ¨ne';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=1200&q=80', 'Dessert poÃƒÂ©tique StÃƒÂ©phanie Le Quellec', 2 FROM restaurants WHERE name = 'La ScÃƒÂ¨ne';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&q=80', 'CÃƒÂ©ramiques artisanales en salle', 3 FROM restaurants WHERE name = 'La ScÃƒÂ¨ne';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80', 'Chariot de pains maison', 4 FROM restaurants WHERE name = 'La ScÃƒÂ¨ne';

-- Ã¢â€â‚¬Ã¢â€â‚¬ Bistrot Paul Bert (Paris) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80', 'Zinc du Bistrot Paul Bert', 0 FROM restaurants WHERE name = 'Bistrot Paul Bert';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=1200&q=80', 'Tartare de bÃ…â€œuf coupÃƒÂ© au couteau', 1 FROM restaurants WHERE name = 'Bistrot Paul Bert';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1498654896293-37aaa4bbad10?w=1200&q=80', 'Os ÃƒÂ  moelle sel de GuÃƒÂ©rande', 2 FROM restaurants WHERE name = 'Bistrot Paul Bert';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=1200&q=80', 'Ardoise du jour au bistrot', 3 FROM restaurants WHERE name = 'Bistrot Paul Bert';

-- Ã¢â€â‚¬Ã¢â€â‚¬ Le Comptoir du Relais (Paris) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 'Terrasse carrefour de l''OdÃƒÂ©on', 0 FROM restaurants WHERE name = 'Le Comptoir du Relais';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=1200&q=80', 'Charcuteries artisanales Camdeborde', 1 FROM restaurants WHERE name = 'Le Comptoir du Relais';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=1200&q=80', 'Menu dÃƒÂ®ner 5 plats - le samedi soir', 2 FROM restaurants WHERE name = 'Le Comptoir du Relais';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', 'Croque-monsieur maison au dÃƒÂ©jeuner', 3 FROM restaurants WHERE name = 'Le Comptoir du Relais';

-- Ã¢â€â‚¬Ã¢â€â‚¬ L'Atelier du Peintre (Colmar) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', 'Petite Venise de Colmar depuis la terrasse', 0 FROM restaurants WHERE name = 'L''Atelier du Peintre';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80', 'Choucroute revisitÃƒÂ©e en crÃƒÂ©ation', 1 FROM restaurants WHERE name = 'L''Atelier du Peintre';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=1200&q=80', 'Rieslings et Gewurztraminers en cave', 2 FROM restaurants WHERE name = 'L''Atelier du Peintre';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1530469912745-a215c6b256ea?w=1200&q=80', 'Kougelhopf revisitÃƒÂ© en dessert', 3 FROM restaurants WHERE name = 'L''Atelier du Peintre';

-- Ã¢â€â‚¬Ã¢â€â‚¬ CafÃƒÂ© Moderne (Rennes) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', 'Salle CafÃƒÂ© Moderne - Rennes', 0 FROM restaurants WHERE name = 'CafÃƒÂ© Moderne';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80', 'Homard breton au beurre de cidre', 1 FROM restaurants WHERE name = 'CafÃƒÂ© Moderne';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=1200&q=80', 'Galette de blÃƒÂ© noir revisitÃƒÂ©e', 2 FROM restaurants WHERE name = 'CafÃƒÂ© Moderne';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1200&q=80', 'Beurre salÃƒÂ© breton et produits locaux', 3 FROM restaurants WHERE name = 'CafÃƒÂ© Moderne';

-- Ã¢â€â‚¬Ã¢â€â‚¬ La RÃƒÂ©galade Conservatoire (Paris) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 'Salle animÃƒÂ©e La RÃƒÂ©galade', 0 FROM restaurants WHERE name = 'La RÃƒÂ©galade Conservatoire';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=1200&q=80', 'Terrine de campagne en bocal', 1 FROM restaurants WHERE name = 'La RÃƒÂ©galade Conservatoire';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1498654896293-37aaa4bbad10?w=1200&q=80', 'Ris de veau aux morilles', 2 FROM restaurants WHERE name = 'La RÃƒÂ©galade Conservatoire';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=1200&q=80', 'Profiteroles sauce chocolat chaud', 3 FROM restaurants WHERE name = 'La RÃƒÂ©galade Conservatoire';

-- Ã¢â€â‚¬Ã¢â€â‚¬ La Marine (Noirmoutier) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=1200&q=80', 'Vue sur l''ÃƒÂ®le de Noirmoutier', 0 FROM restaurants WHERE name = 'La Marine';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80', 'AraignÃƒÂ©e de mer en bouillon d''algues', 1 FROM restaurants WHERE name = 'La Marine';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80', 'Jardin potager d''Alexandre Couillon', 2 FROM restaurants WHERE name = 'La Marine';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&q=80', 'PÃƒÂªche locale zÃƒÂ©ro dÃƒÂ©chet', 3 FROM restaurants WHERE name = 'La Marine';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1200&q=80', 'Herbes marines et pourpier de mer', 4 FROM restaurants WHERE name = 'La Marine';

-- Ã¢â€â‚¬Ã¢â€â‚¬ Le Jardin des Plumes (Giverny) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&q=80', 'Jardin potager en fleurs - Giverny', 0 FROM restaurants WHERE name = 'Le Jardin des Plumes';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80', 'LÃƒÂ©gumes impressionnistes du potager', 1 FROM restaurants WHERE name = 'Le Jardin des Plumes';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80', 'Menu vÃƒÂ©gÃƒÂ©tal de saison', 2 FROM restaurants WHERE name = 'Le Jardin des Plumes';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1530469912745-a215c6b256ea?w=1200&q=80', 'Dessert floral David Gallienne', 3 FROM restaurants WHERE name = 'Le Jardin des Plumes';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1200&q=80', 'Herbes aromatiques du jardin normand', 4 FROM restaurants WHERE name = 'Le Jardin des Plumes';


SET FOREIGN_KEY_CHECKS = 1;
