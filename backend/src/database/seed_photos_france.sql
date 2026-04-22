-- seed_photos_france.sql — Photos pour les 27 restaurants français
-- 4 à 5 photos par restaurant via Unsplash

SET NAMES utf8mb4;

-- ── Guy Savoy (Paris) ──────────────────────────────────────────────────────
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', 'Salle panoramique - Monnaie de Paris', 0 FROM restaurants WHERE name = 'Guy Savoy';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=1200&q=80', 'Soupe artichaut et truffe noire', 1 FROM restaurants WHERE name = 'Guy Savoy';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=1200&q=80', 'Bar en croûte de café épicé', 2 FROM restaurants WHERE name = 'Guy Savoy';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=1200&q=80', 'Cave à vins Guy Savoy', 3 FROM restaurants WHERE name = 'Guy Savoy';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80', 'Vue sur la Seine depuis le restaurant', 4 FROM restaurants WHERE name = 'Guy Savoy';

-- ── Épicure (Paris) ────────────────────────────────────────────────────────
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', 'Salle Épicure - Le Bristol Paris', 0 FROM restaurants WHERE name = 'Épicure';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80', 'Macaroni à la truffe noire et foie gras', 1 FROM restaurants WHERE name = 'Épicure';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1530469912745-a215c6b256ea?w=1200&q=80', 'Dessert signature Éric Frechon', 2 FROM restaurants WHERE name = 'Épicure';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&q=80', 'Jardin du Bristol - déjeuner d''été', 3 FROM restaurants WHERE name = 'Épicure';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80', 'Dressage en cuisine', 4 FROM restaurants WHERE name = 'Épicure';

-- ── Flocons de Sel (Megève) ────────────────────────────────────────────────
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 'Terrasse panoramique face au Mont Blanc', 0 FROM restaurants WHERE name = 'Flocons de Sel';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80', 'Omble chevalier du lac en croûte', 1 FROM restaurants WHERE name = 'Flocons de Sel';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80', 'Champignons sauvages de Haute-Savoie', 2 FROM restaurants WHERE name = 'Flocons de Sel';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=1200&q=80', 'Salle chalet alpine raffinée', 3 FROM restaurants WHERE name = 'Flocons de Sel';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=1200&q=80', 'Mignardises de fin de repas', 4 FROM restaurants WHERE name = 'Flocons de Sel';

-- ── Auberge du Vieux Puits (Fontjoncouse) ─────────────────────────────────
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', 'Terrasse en pierre - Fontjoncouse', 0 FROM restaurants WHERE name = 'Auberge du Vieux Puits';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=1200&q=80', 'L''œuf pourri de la terre - plat signature', 1 FROM restaurants WHERE name = 'Auberge du Vieux Puits';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80', 'Légumes du terroir languedocien', 2 FROM restaurants WHERE name = 'Auberge du Vieux Puits';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', 'Salle à manger de l''auberge', 3 FROM restaurants WHERE name = 'Auberge du Vieux Puits';

-- ── Maison Lameloise (Chagny) ──────────────────────────────────────────────
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80', 'Façade bourguignonne Maison Lameloise', 0 FROM restaurants WHERE name = 'Maison Lameloise';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1200&q=80', 'Volaille de Bresse en vessie', 1 FROM restaurants WHERE name = 'Maison Lameloise';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=1200&q=80', 'Grands crus de Bourgogne en cave', 2 FROM restaurants WHERE name = 'Maison Lameloise';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=1200&q=80', 'Salle de réception Lameloise', 3 FROM restaurants WHERE name = 'Maison Lameloise';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=1200&q=80', 'Escargots de Bourgogne revisités', 4 FROM restaurants WHERE name = 'Maison Lameloise';

-- ── Auberge de l'Ill (Illhaeusern) ────────────────────────────────────────
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', 'Bord de l''Ill - cadre enchanteur', 0 FROM restaurants WHERE name = 'Auberge de l''Ill';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80', 'Soufflé de saumon - monument gastronomique', 1 FROM restaurants WHERE name = 'Auberge de l''Ill';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=1200&q=80', 'Vins d''Alsace en accord', 2 FROM restaurants WHERE name = 'Auberge de l''Ill';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 'Jardin au bord de l''eau', 3 FROM restaurants WHERE name = 'Auberge de l''Ill';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1530469912745-a215c6b256ea?w=1200&q=80', 'Dessert classique alsacien', 4 FROM restaurants WHERE name = 'Auberge de l''Ill';

-- ── Taillevent (Paris) ─────────────────────────────────────────────────────
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80', 'Salle Taillevent - élégance intemporelle', 0 FROM restaurants WHERE name = 'Taillevent';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80', 'Homard breton en sauce', 1 FROM restaurants WHERE name = 'Taillevent';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&q=80', 'Truffes du Périgord - produits d''exception', 2 FROM restaurants WHERE name = 'Taillevent';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80', 'Cave légendaire Taillevent', 3 FROM restaurants WHERE name = 'Taillevent';

-- ── Le Meurice (Paris) ─────────────────────────────────────────────────────
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', 'Salle Dalí - Le Meurice', 0 FROM restaurants WHERE name = 'Le Meurice';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=1200&q=80', 'Langoustine au beurre d''algues', 1 FROM restaurants WHERE name = 'Le Meurice';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=1200&q=80', 'Dessert signature Amaury Bouhours', 2 FROM restaurants WHERE name = 'Le Meurice';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=1200&q=80', 'Vue sur le jardin des Tuileries', 3 FROM restaurants WHERE name = 'Le Meurice';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&q=80', 'Mise en place raffinée Le Meurice', 4 FROM restaurants WHERE name = 'Le Meurice';

-- ── Kei (Paris) ────────────────────────────────────────────────────────────
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1200&q=80', 'Salle minimaliste Kei - inspiration japonaise', 0 FROM restaurants WHERE name = 'Kei';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80', 'Pivoine de homard - plat signature', 1 FROM restaurants WHERE name = 'Kei';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80', 'Légumes du marché de Paris', 2 FROM restaurants WHERE name = 'Kei';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=1200&q=80', 'Création franco-japonaise de Kei Kobayashi', 3 FROM restaurants WHERE name = 'Kei';

-- ── La Grenouillère (Montreuil-sur-Mer) ───────────────────────────────────
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', 'Ferme rénovée sur les marais', 0 FROM restaurants WHERE name = 'La Grenouillère';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', 'Cuisine improvisée du marché', 1 FROM restaurants WHERE name = 'La Grenouillère';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&q=80', 'Végétaux sauvages des marais du Nord', 2 FROM restaurants WHERE name = 'La Grenouillère';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80', 'Terrine nordiste signature', 3 FROM restaurants WHERE name = 'La Grenouillère';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1200&q=80', 'Herbes et fleurs sauvages', 4 FROM restaurants WHERE name = 'La Grenouillère';

-- ── Oustau de Baumanière (Les Baux-de-Provence) ───────────────────────────
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80', 'Terrasse face aux Alpilles', 0 FROM restaurants WHERE name = 'Oustau de Baumanière';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80', 'Agneau des Alpilles en croûte d''herbes', 1 FROM restaurants WHERE name = 'Oustau de Baumanière';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=1200&q=80', 'Vins des Baux-de-Provence en accord', 2 FROM restaurants WHERE name = 'Oustau de Baumanière';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&q=80', 'Menu végétarien - légumes du jardin', 3 FROM restaurants WHERE name = 'Oustau de Baumanière';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1530469912745-a215c6b256ea?w=1200&q=80', 'Cour en pierre de Provence', 4 FROM restaurants WHERE name = 'Oustau de Baumanière';

-- ── Le Pressoir d'Argent (Bordeaux) ───────────────────────────────────────
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', 'Grand Hôtel de Bordeaux - salle prestige', 0 FROM restaurants WHERE name = 'Le Pressoir d''Argent';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80', 'Homard pressé à la presse en argent', 1 FROM restaurants WHERE name = 'Le Pressoir d''Argent';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=1200&q=80', 'Grands crus de Bordeaux en cave', 2 FROM restaurants WHERE name = 'Le Pressoir d''Argent';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80', 'Crustacés de l''Atlantique', 3 FROM restaurants WHERE name = 'Le Pressoir d''Argent';

-- ── Septime (Paris) ────────────────────────────────────────────────────────
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 'Salle Septime - bois et matières naturelles', 0 FROM restaurants WHERE name = 'Septime';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80', 'Légumes de saison - producteurs locaux', 1 FROM restaurants WHERE name = 'Septime';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80', 'Poisson de pêche responsable', 2 FROM restaurants WHERE name = 'Septime';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1200&q=80', 'Herbes fraîches du marché', 3 FROM restaurants WHERE name = 'Septime';

-- ── Le Grand Véfour (Paris) ────────────────────────────────────────────────
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=1200&q=80', 'Plafonds peints classés - Palais-Royal', 0 FROM restaurants WHERE name = 'Le Grand Véfour';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', 'Salle dorée du Grand Véfour', 1 FROM restaurants WHERE name = 'Le Grand Véfour';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80', 'Cuisine classique française', 2 FROM restaurants WHERE name = 'Le Grand Véfour';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=1200&q=80', 'Foie gras en entrée', 3 FROM restaurants WHERE name = 'Le Grand Véfour';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=1200&q=80', 'Dessert patrimonial revisité', 4 FROM restaurants WHERE name = 'Le Grand Véfour';

-- ── Maison Marcon (Saint-Bonnet-le-Froid) ─────────────────────────────────
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80', 'Cèpes de la forêt auvergnate', 0 FROM restaurants WHERE name = 'Maison Marcon';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', 'Panorama sur le massif du Mézenc', 1 FROM restaurants WHERE name = 'Maison Marcon';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', 'Champignons sauvages - plat signature', 2 FROM restaurants WHERE name = 'Maison Marcon';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=1200&q=80', 'Salle avec vue sur les volcans', 3 FROM restaurants WHERE name = 'Maison Marcon';

-- ── L'Envol (Nice) ─────────────────────────────────────────────────────────
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=1200&q=80', 'Panorama Baie des Anges - terrasse', 0 FROM restaurants WHERE name = 'L''Envol';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80', 'Rascasse de la Baie des Anges', 1 FROM restaurants WHERE name = 'L''Envol';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80', 'Socca revisitée en amuse-bouche', 2 FROM restaurants WHERE name = 'L''Envol';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=1200&q=80', 'Vins de Provence rosé en accord', 3 FROM restaurants WHERE name = 'L''Envol';

-- ── La Table de Ventabren (Ventabren) ─────────────────────────────────────
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80', 'Terrasse avec vue sur la vallée de l''Arc', 0 FROM restaurants WHERE name = 'La Table de Ventabren';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&q=80', 'Légumes du potager provençal', 1 FROM restaurants WHERE name = 'La Table de Ventabren';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80', 'Agneau des Alpilles au romarin', 2 FROM restaurants WHERE name = 'La Table de Ventabren';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80', 'Salle avec vue panoramique', 3 FROM restaurants WHERE name = 'La Table de Ventabren';

-- ── Léon de Lyon (Lyon) ────────────────────────────────────────────────────
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 'Salle lyonnaise - décor traditionnel', 0 FROM restaurants WHERE name = 'Léon de Lyon';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1498654896293-37aaa4bbad10?w=1200&q=80', 'Quenelle de brochet sauce Nantua', 1 FROM restaurants WHERE name = 'Léon de Lyon';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=1200&q=80', 'Côtes-du-Rhône et Bourgognes en cave', 2 FROM restaurants WHERE name = 'Léon de Lyon';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80', 'Foie gras en brioche - classique lyonnais', 3 FROM restaurants WHERE name = 'Léon de Lyon';

-- ── Le Quinzième (Paris) ───────────────────────────────────────────────────
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', 'Salle Le Quinzième - atmosphère chaleureuse', 0 FROM restaurants WHERE name = 'Le Quinzième';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80', 'Plat de saison Cyril Lignac', 1 FROM restaurants WHERE name = 'Le Quinzième';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1530469912745-a215c6b256ea?w=1200&q=80', 'Dessert signature - chocolat grand cru', 2 FROM restaurants WHERE name = 'Le Quinzième';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=1200&q=80', 'Mise en place élégante', 3 FROM restaurants WHERE name = 'Le Quinzième';

-- ── La Scène (Paris) ───────────────────────────────────────────────────────
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=1200&q=80', 'Salle intimiste La Scène', 0 FROM restaurants WHERE name = 'La Scène';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80', 'Langoustine rôtie à la crème fermentée', 1 FROM restaurants WHERE name = 'La Scène';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=1200&q=80', 'Dessert poétique Stéphanie Le Quellec', 2 FROM restaurants WHERE name = 'La Scène';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&q=80', 'Céramiques artisanales en salle', 3 FROM restaurants WHERE name = 'La Scène';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80', 'Chariot de pains maison', 4 FROM restaurants WHERE name = 'La Scène';

-- ── Bistrot Paul Bert (Paris) ──────────────────────────────────────────────
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80', 'Zinc du Bistrot Paul Bert', 0 FROM restaurants WHERE name = 'Bistrot Paul Bert';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=1200&q=80', 'Tartare de bœuf coupé au couteau', 1 FROM restaurants WHERE name = 'Bistrot Paul Bert';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1498654896293-37aaa4bbad10?w=1200&q=80', 'Os à moelle sel de Guérande', 2 FROM restaurants WHERE name = 'Bistrot Paul Bert';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=1200&q=80', 'Ardoise du jour au bistrot', 3 FROM restaurants WHERE name = 'Bistrot Paul Bert';

-- ── Le Comptoir du Relais (Paris) ──────────────────────────────────────────
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 'Terrasse carrefour de l''Odéon', 0 FROM restaurants WHERE name = 'Le Comptoir du Relais';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=1200&q=80', 'Charcuteries artisanales Camdeborde', 1 FROM restaurants WHERE name = 'Le Comptoir du Relais';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=1200&q=80', 'Menu dîner 5 plats - le samedi soir', 2 FROM restaurants WHERE name = 'Le Comptoir du Relais';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', 'Croque-monsieur maison au déjeuner', 3 FROM restaurants WHERE name = 'Le Comptoir du Relais';

-- ── L'Atelier du Peintre (Colmar) ─────────────────────────────────────────
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', 'Petite Venise de Colmar depuis la terrasse', 0 FROM restaurants WHERE name = 'L''Atelier du Peintre';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80', 'Choucroute revisitée en création', 1 FROM restaurants WHERE name = 'L''Atelier du Peintre';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=1200&q=80', 'Rieslings et Gewurztraminers en cave', 2 FROM restaurants WHERE name = 'L''Atelier du Peintre';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1530469912745-a215c6b256ea?w=1200&q=80', 'Kougelhopf revisité en dessert', 3 FROM restaurants WHERE name = 'L''Atelier du Peintre';

-- ── Café Moderne (Rennes) ──────────────────────────────────────────────────
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', 'Salle Café Moderne - Rennes', 0 FROM restaurants WHERE name = 'Café Moderne';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80', 'Homard breton au beurre de cidre', 1 FROM restaurants WHERE name = 'Café Moderne';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=1200&q=80', 'Galette de blé noir revisitée', 2 FROM restaurants WHERE name = 'Café Moderne';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1200&q=80', 'Beurre salé breton et produits locaux', 3 FROM restaurants WHERE name = 'Café Moderne';

-- ── La Régalade Conservatoire (Paris) ─────────────────────────────────────
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 'Salle animée La Régalade', 0 FROM restaurants WHERE name = 'La Régalade Conservatoire';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=1200&q=80', 'Terrine de campagne en bocal', 1 FROM restaurants WHERE name = 'La Régalade Conservatoire';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1498654896293-37aaa4bbad10?w=1200&q=80', 'Ris de veau aux morilles', 2 FROM restaurants WHERE name = 'La Régalade Conservatoire';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=1200&q=80', 'Profiteroles sauce chocolat chaud', 3 FROM restaurants WHERE name = 'La Régalade Conservatoire';

-- ── La Marine (Noirmoutier) ────────────────────────────────────────────────
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=1200&q=80', 'Vue sur l''île de Noirmoutier', 0 FROM restaurants WHERE name = 'La Marine';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80', 'Araignée de mer en bouillon d''algues', 1 FROM restaurants WHERE name = 'La Marine';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80', 'Jardin potager d''Alexandre Couillon', 2 FROM restaurants WHERE name = 'La Marine';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&q=80', 'Pêche locale zéro déchet', 3 FROM restaurants WHERE name = 'La Marine';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1200&q=80', 'Herbes marines et pourpier de mer', 4 FROM restaurants WHERE name = 'La Marine';

-- ── Le Jardin des Plumes (Giverny) ────────────────────────────────────────
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&q=80', 'Jardin potager en fleurs - Giverny', 0 FROM restaurants WHERE name = 'Le Jardin des Plumes';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80', 'Légumes impressionnistes du potager', 1 FROM restaurants WHERE name = 'Le Jardin des Plumes';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80', 'Menu végétal de saison', 2 FROM restaurants WHERE name = 'Le Jardin des Plumes';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1530469912745-a215c6b256ea?w=1200&q=80', 'Dessert floral David Gallienne', 3 FROM restaurants WHERE name = 'Le Jardin des Plumes';
INSERT INTO restaurant_photos (restaurant_id, url, caption, position) SELECT id, 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1200&q=80', 'Herbes aromatiques du jardin normand', 4 FROM restaurants WHERE name = 'Le Jardin des Plumes';
