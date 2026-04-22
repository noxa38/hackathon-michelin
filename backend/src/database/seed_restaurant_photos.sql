-- seed_restaurant_photos.sql
-- 3 à 5 photos par restaurant, référencées par nom pour éviter les dépendances d'ID

SET NAMES utf8mb4;

-- ES:SENZ (Grassau, Germany)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', 'Salle du restaurant ES:SENZ', 0 FROM restaurants WHERE name = 'ES:SENZ';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80', 'Cuisine créative ES:SENZ', 1 FROM restaurants WHERE name = 'ES:SENZ';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80', 'Plat signature ES:SENZ', 2 FROM restaurants WHERE name = 'ES:SENZ';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80', 'Vue panoramique ES:SENZ', 3 FROM restaurants WHERE name = 'ES:SENZ';

-- Tohru in der Schreiberei (Munich)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', 'Intérieur Tohru in der Schreiberei', 0 FROM restaurants WHERE name = 'Tohru in der Schreiberei';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1200&q=80', 'Cuisine japonaise-française', 1 FROM restaurants WHERE name = 'Tohru in der Schreiberei';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80', 'Plat signature Tohru', 2 FROM restaurants WHERE name = 'Tohru in der Schreiberei';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', 'Dressage gastronomique', 3 FROM restaurants WHERE name = 'Tohru in der Schreiberei';

-- Schwarzwaldstube (Baiersbronn)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 'Salle Schwarzwaldstube', 0 FROM restaurants WHERE name = 'Schwarzwaldstube';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', 'Ambiance Forêt Noire', 1 FROM restaurants WHERE name = 'Schwarzwaldstube';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=1200&q=80', 'Création culinaire classique française', 2 FROM restaurants WHERE name = 'Schwarzwaldstube';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', 'Vue panoramique de la vallée', 3 FROM restaurants WHERE name = 'Schwarzwaldstube';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80', 'Dessert signature', 4 FROM restaurants WHERE name = 'Schwarzwaldstube';

-- Victor's Fine Dining by christian bau (Perl)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80', 'Victor\'s Fine Dining - salle principale', 0 FROM restaurants WHERE name = 'Victor\'s Fine Dining by christian bau';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80', 'Paris-Tokyo fusion dish', 1 FROM restaurants WHERE name = 'Victor\'s Fine Dining by christian bau';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80', 'Tataki de thon et caviar', 2 FROM restaurants WHERE name = 'Victor\'s Fine Dining by christian bau';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1200&q=80', 'Dessert signature bau.stein', 3 FROM restaurants WHERE name = 'Victor\'s Fine Dining by christian bau';

-- schanz. restaurant. (Piesport)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80', 'Salle schanz. restaurant.', 0 FROM restaurants WHERE name = 'schanz. restaurant.';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', 'Vue sur la cour intérieure', 1 FROM restaurants WHERE name = 'schanz. restaurant.';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80', 'Pot-au-feu signature Thomas Schanz', 2 FROM restaurants WHERE name = 'schanz. restaurant.';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 'Vins de Moselle en accord', 3 FROM restaurants WHERE name = 'schanz. restaurant.';

-- Restaurant Haerlin (Hamburg)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', 'Salle Haerlin - Hôtel Vier Jahreszeiten', 0 FROM restaurants WHERE name = 'Restaurant Haerlin';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', 'Vue sur l\'Alster intérieur', 1 FROM restaurants WHERE name = 'Restaurant Haerlin';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80', 'Langoustine Haerlin', 2 FROM restaurants WHERE name = 'Restaurant Haerlin';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=1200&q=80', 'Selle de cerf au jus', 3 FROM restaurants WHERE name = 'Restaurant Haerlin';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80', 'Cave à vins exceptionnelle', 4 FROM restaurants WHERE name = 'Restaurant Haerlin';

-- The Table Kevin Fehling (Hamburg)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', 'The Table - comptoir principal', 0 FROM restaurants WHERE name = 'The Table Kevin Fehling';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80', 'Cuisine ouverte The Table', 1 FROM restaurants WHERE name = 'The Table Kevin Fehling';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80', 'The Sea - huître pochée et hamachi', 2 FROM restaurants WHERE name = 'The Table Kevin Fehling';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80', 'Ballotine de caille', 3 FROM restaurants WHERE name = 'The Table Kevin Fehling';

-- Waldhotel Sonnora (Dreis)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 'Waldhotel Sonnora - cadre forestier', 0 FROM restaurants WHERE name = 'Waldhotel Sonnora';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1200&q=80', 'Turbot de Vendée grillé au charbon', 1 FROM restaurants WHERE name = 'Waldhotel Sonnora';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', 'Tartare de bœuf et caviar N25', 2 FROM restaurants WHERE name = 'Waldhotel Sonnora';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80', 'Salle élégante Sonnora', 3 FROM restaurants WHERE name = 'Waldhotel Sonnora';

-- JAN (Munich)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', 'JAN - salle chic et moderne', 0 FROM restaurants WHERE name = 'JAN';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80', 'Cuisine ouverte - Labor der Liebe', 1 FROM restaurants WHERE name = 'JAN';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80', 'Oursin Louise - plat signature', 2 FROM restaurants WHERE name = 'JAN';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=1200&q=80', 'Pâté en croûte Jan Hartwig', 3 FROM restaurants WHERE name = 'JAN';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', 'Menu 7 cours immersif', 4 FROM restaurants WHERE name = 'JAN';

-- Restaurant Bareiss (Baiersbronn)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', 'Hôtel Bareiss - salle de restaurant', 0 FROM restaurants WHERE name = 'Restaurant Bareiss';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80', 'Amuse-bouches chauds au homard', 1 FROM restaurants WHERE name = 'Restaurant Bareiss';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80', 'Chariot de desserts Stefan Leitner', 2 FROM restaurants WHERE name = 'Restaurant Bareiss';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80', 'Décoration lampes en albâtre', 3 FROM restaurants WHERE name = 'Restaurant Bareiss';

-- Rutz (Berlin)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 'Rutz - terrasse estivale', 0 FROM restaurants WHERE name = 'Rutz';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1200&q=80', 'Wagyu d\'Oldenburg et garum de bœuf', 1 FROM restaurants WHERE name = 'Rutz';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', 'Inspiration - menu tasting Marco Müller', 2 FROM restaurants WHERE name = 'Rutz';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80', 'Calmar mer du Nord et chou rouge', 3 FROM restaurants WHERE name = 'Rutz';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', 'Salle minimaliste et design', 4 FROM restaurants WHERE name = 'Rutz';

-- Maaemo (Oslo)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', 'Salle Maaemo - Oslo', 0 FROM restaurants WHERE name = 'Maaemo';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80', 'Cuisine ouverte théâtrale', 1 FROM restaurants WHERE name = 'Maaemo';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80', 'Menu surprise saisonnier', 2 FROM restaurants WHERE name = 'Maaemo';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=1200&q=80', 'Lounge Maaemo', 3 FROM restaurants WHERE name = 'Maaemo';

-- RE-NAA (Stavanger)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', 'RE-NAA - cuisine au centre', 0 FROM restaurants WHERE name = 'RE-NAA';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80', 'Coquille Saint-Jacques et baies d\'argousier', 1 FROM restaurants WHERE name = 'RE-NAA';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80', 'Poissons et crustacés locaux', 2 FROM restaurants WHERE name = 'RE-NAA';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80', 'Service RE-NAA raffiné', 3 FROM restaurants WHERE name = 'RE-NAA';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', 'Menu 20 services', 4 FROM restaurants WHERE name = 'RE-NAA';

-- Frantzén (Stockholm)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 'Frantzén - façade Stockholm', 0 FROM restaurants WHERE name = 'Frantzén';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1200&q=80', 'Lounge apéritif au dernier étage', 1 FROM restaurants WHERE name = 'Frantzén';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80', 'Comptoir de dégustation', 2 FROM restaurants WHERE name = 'Frantzén';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', 'Chefs en action Björn Frantzén', 3 FROM restaurants WHERE name = 'Frantzén';

-- Jordnær (Gentofte)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', 'Jordnær - oasis sophistiqué', 0 FROM restaurants WHERE name = 'Jordnær';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80', 'Hamachi, ponzu et wasabi', 1 FROM restaurants WHERE name = 'Jordnær';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80', 'Chawanmushi multi-couches', 2 FROM restaurants WHERE name = 'Jordnær';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=1200&q=80', 'Service Tina Vildgaard', 3 FROM restaurants WHERE name = 'Jordnær';

-- Geranium (Copenhagen)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', 'Geranium - 8e étage Parken Stadium', 0 FROM restaurants WHERE name = 'Geranium';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80', 'Vue panoramique sur le parc', 1 FROM restaurants WHERE name = 'Geranium';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80', 'Légumes biodynamiques Rasmus Kofoed', 2 FROM restaurants WHERE name = 'Geranium';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80', 'Fruits de mer espèces non menacées', 3 FROM restaurants WHERE name = 'Geranium';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', 'Cave à vins Geranium', 4 FROM restaurants WHERE name = 'Geranium';

-- Hiša Franko (Kobarid)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 'Hiša Franko - maison Ana Roš', 0 FROM restaurants WHERE name = 'Hiša Franko';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1200&q=80', 'Cappelletti tonka et feuilles de figuier', 1 FROM restaurants WHERE name = 'Hiša Franko';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80', 'Beignet de maïs et ricotta fermentée', 2 FROM restaurants WHERE name = 'Hiša Franko';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', 'Pommes de terre au foin et fenugrec', 3 FROM restaurants WHERE name = 'Hiša Franko';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', 'Petit-déjeuner Hiša Franko', 4 FROM restaurants WHERE name = 'Hiša Franko';

-- Trèsind Studio (Dubai)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80', 'Trèsind Studio - toît du Palme', 0 FROM restaurants WHERE name = 'Trèsind Studio';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80', 'Tasting menu indien surprise', 1 FROM restaurants WHERE name = 'Trèsind Studio';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=1200&q=80', 'Cocktails bar Popadom Botanic', 2 FROM restaurants WHERE name = 'Trèsind Studio';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', 'Cuisine ouverte 15 couverts', 3 FROM restaurants WHERE name = 'Trèsind Studio';

-- Grande Étoile (Düsseldorf)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80', 'Grande Étoile - décor Art Déco', 0 FROM restaurants WHERE name = 'Grande Étoile';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80', 'Bœuf bourguignon revisité', 1 FROM restaurants WHERE name = 'Grande Étoile';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80', 'Bar à cocktails soirée DJ', 2 FROM restaurants WHERE name = 'Grande Étoile';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', 'Terrasse Grande Étoile', 3 FROM restaurants WHERE name = 'Grande Étoile';

-- Goldener Engel (Ihringen)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 'Goldener Engel - auberge traditionnelle', 0 FROM restaurants WHERE name = 'Goldener Engel';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1200&q=80', 'Joue de bœuf braisé pinot noir', 1 FROM restaurants WHERE name = 'Goldener Engel';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80', 'Terrasse Goldener Engel', 2 FROM restaurants WHERE name = 'Goldener Engel';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', 'Cave à vins régionaux badois', 3 FROM restaurants WHERE name = 'Goldener Engel';

-- Chiemgauhof (Übersee)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', 'Chiemgauhof - vue sur le lac Chiemsee', 0 FROM restaurants WHERE name = 'Chiemgauhof';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80', 'Terrasse au bord du Chiemsee', 1 FROM restaurants WHERE name = 'Chiemgauhof';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80', 'Cuisine régionale revisitée', 2 FROM restaurants WHERE name = 'Chiemgauhof';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=1200&q=80', 'Décoration bois et poêle carrelé', 3 FROM restaurants WHERE name = 'Chiemgauhof';

-- Chefs Atelier (Essen)
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', 'Chefs Atelier - lounge apéritif', 0 FROM restaurants WHERE name = 'Chefs Atelier';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80', 'Hamachi deux façons Alexander Hoppe', 1 FROM restaurants WHERE name = 'Chefs Atelier';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80', 'Carré d\'agneau du Quercy', 2 FROM restaurants WHERE name = 'Chefs Atelier';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80', 'Cuisine ouverte 18 couverts', 3 FROM restaurants WHERE name = 'Chefs Atelier';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', 'Petits fours Chefs Atelier', 4 FROM restaurants WHERE name = 'Chefs Atelier';
