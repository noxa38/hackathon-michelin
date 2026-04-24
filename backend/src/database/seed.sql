-- ============================================================
-- NETTOYAGE DES DONNÉES (Sauf USERS)
-- ============================================================
SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM favorites;
DELETE FROM accommodation_favorites;
DELETE FROM list_restaurants;
DELETE FROM list_accommodations;
DELETE FROM professional_restaurants;
DELETE FROM professional_requests;
DELETE FROM restaurant_photos;
DELETE FROM accommodation_rooms;
DELETE FROM accommodation;
DELETE FROM restaurants;
DELETE FROM lists;
DELETE FROM users;

-- ============================================================
-- USERS
-- ============================================================
INSERT INTO users (username, email, password, first_name, last_name, user_type) VALUES
('admin','admin@guide.fr','$2b$10$S1P1wBw.mX7.2uoyc/ZQWu8wBWchi3hMD.RBtkpvFxaNQjOjZgGea','Admin','Guide','admin'),
('jean','jean@email.fr','$2b$10$S1P1wBw.mX7.2uoyc/ZQWu8wBWchi3hMD.RBtkpvFxaNQjOjZgGea','Jean','Dupont','individual'),
('mariepro','marie@email.fr','$2b$10$S1P1wBw.mX7.2uoyc/ZQWu8wBWchi3hMD.RBtkpvFxaNQjOjZgGea','Marie','Bernard','professional');

-- ============================================================
-- RESTAURANTS (50 Établissements Réels Michelin)
-- ============================================================
INSERT INTO restaurants (name, address, city, country, price, cuisine, phone, website_url, award, green_star, facilities, description, opening_hours) VALUES
('Guy Savoy', 'Monnaie de Paris, 11 Quai de Conti', 'Paris', 'France', '€€€€', 'Gastronomique', '+33143804000', 'https://www.guysavoy.com', '3 Étoiles', 0, 'Valet, Climatisation', 'Une institution de la gastronomie française située dans le cadre historique de la Monnaie de Paris.', 'Mar-Sam'),
('Plénitude', '8 Quai du Louvre', 'Paris', 'France', '€€€€', 'Créative', '+33179353500', 'https://www.chevalblanc.com', '3 Étoiles', 0, 'Vue Seine, Luxe', 'Arnaud Donckele y déploie une cuisine axée sur les sauces et les bouillons d''exception.', 'Mer-Dim'),
('L''Ambroisie', '9 Place des Vosges', 'Paris', 'France', '€€€€', 'Classique', '+33142785145', 'https://www.ambroisie-paris.com', '3 Étoiles', 0, 'Historique', 'Bernard Pacaud incarne la perfection de la cuisine classique française sur la Place des Vosges.', 'Mar-Sam'),
('Le Louis XV - Alain Ducasse', 'Place du Casino', 'Monaco', 'France', '€€€€', 'Méditerranéenne', '+37798068864', 'https://www.ducasse-paris.com', '3 Étoiles', 0, 'Palace, Terrasse', 'La quintessence de la cuisine de la Riviera au cœur de l''Hôtel de Paris.', 'Jeu-Lun'),
('Flocons de Sel', '1775 Route du Leutaz', 'Megève', 'France', '€€€€', 'Montagne', '+33450214999', 'https://www.floconsdesel.com', '3 Étoiles', 1, 'Vue Mont Blanc, Jardin', 'Emmanuel Renaut sublime les produits de la montagne avec une finesse incroyable.', 'Jeu-Lun'),
('Troisgros - Le Bois sans Feuilles', '728 Route de Villerest', 'Ouches', 'France', '€€€€', 'Moderne', '+33477716697', 'https://www.troisgros.com', '3 Étoiles', 1, 'Nature, Design', 'Une table de légende installée dans un écrin de verre au milieu des arbres.', 'Mer-Dim'),
('L''Oustau de Baumanière', 'Le Vallon de la Fontaine', 'Les Baux-de-Provence', 'France', '€€€€', 'Provençale', '+33490543307', 'https://www.baumaniere.com', '3 Étoiles', 1, 'Historique, Terrasse', 'Glenn Viel réinvente la tradition provençale dans un cadre minéral unique.', 'Jeu-Lun'),
('Assiette Champenoise', '40 Avenue Paul Vaillant-Couturier', 'Tinqueux', 'France', '€€€€', 'Créative', '+33326841566', 'https://www.assiettechampenoise.com', '3 Étoiles', 0, 'Design, Cave', 'Arnaud Lallement rend hommage au terroir champenois et à ses producteurs.', 'Mer-Dim'),
('Christopher Coutanceau', 'Plage de la Concurrence', 'La Rochelle', 'France', '€€€€', 'Marine', '+33546414819', 'https://www.coutanceau.com', '3 Étoiles', 1, 'Vue Mer', 'Un plaidoyer gastronomique pour une pêche durable et les trésors de l''océan.', 'Mar-Sam'),
('Septime', '80 Rue de Charonne', 'Paris', 'France', '€€€', 'Moderne', '+33143673829', 'https://www.septime-charonne.fr', '1 Étoile', 1, 'Bio, Épuré', 'La table la plus convoitée de Paris, privilégiant le produit brut et local.', 'Lun-Ven'),
('David Toutain', '29 Rue Surcouf', 'Paris', 'France', '€€€€', 'Conceptuelle', '+33145501110', 'https://www.davidtoutain.com', '2 Étoiles', 1, 'Design, Nature', 'Une exploration sensorielle autour du végétal et de la matière.', 'Lun-Ven'),
('Kei', '5 Rue du Coq Héron', 'Paris', 'France', '€€€€', 'Franco-Japonaise', '+33142331474', 'https://www.restaurant-kei.fr', '3 Étoiles', 0, 'Élégant', 'L''harmonie parfaite entre la rigueur japonaise et les techniques françaises.', 'Mar-Sam'),
('Le Petit Nice', '17 Rue des Braves', 'Marseille', 'France', '€€€€', 'Poisson', '+33491592592', 'https://www.passedat.fr', '3 Étoiles', 0, 'Piscine, Vue Mer', 'Gérald Passedat explore les profondeurs de la Méditerranée à travers ses poissons oubliés.', 'Mar-Sam'),
('La Marine', '5 Rue des Lauriers', 'Noirmoutier-en-l''Île', 'France', '€€€€', 'Marine', '+33251392309', 'https://www.alexandre-couillon.com', '3 Étoiles', 1, 'Île, Intimiste', 'Alexandre Couillon cuisine l''instant sur l''île de Noirmoutier.', 'Mer-Dim'),
('Auberge du Vieux Puits', '5 Avenue Saint-Victor', 'Fontjoncouse', 'France', '€€€€', 'Terroir', '+33468440737', 'https://www.aubergeduvieuxpuits.fr', '3 Étoiles', 0, 'Village, Insolite', 'La virtuosité de Gilles Goujon dans un petit village de l''Aude.', 'Mer-Dim'),
('Table de Bruno Verjus', '3 Rue de Prague', 'Paris', 'France', '€€€€', 'Produit', '+33143431226', 'https://www.bruno-verjus.com', '2 Étoiles', 0, 'Comptoir, Ouvert', 'La célébration du produit à son apogée par un ancien critique culinaire.', 'Lun-Ven'),
('Marsan par Hélène Darroze', '4 Rue d''Assas', 'Paris', 'France', '€€€€', 'Sud-Ouest', '+33142220011', 'https://www.helenedarroze.com', '2 Étoiles', 0, 'Contemporain', 'Hélène Darroze rend hommage à ses racines landaises avec modernité.', 'Lun-Ven'),
('Le Grand Restaurant', '7 Rue d''Aguesseau', 'Paris', 'France', '€€€€', 'Haute Cuisine', '+33153050000', 'https://www.jeanfrancoispiege.com', '2 Étoiles', 0, 'Toit de verre', 'Le laboratoire créatif de Jean-François Piège.', 'Lun-Ven'),
('Le Coquillage', 'Le Buot', 'Saint-Méloir-des-Ondes', 'France', '€€€', 'Épices', '+33299896476', 'https://www.maisons-de-bricourt.com', '2 Étoiles', 1, 'Château, Vue Baie', 'Hugo Roellinger sublime la mer avec des épices du bout du monde.', 'Mer-Dim'),
('Table de Pavie', '5 Place du Clocher', 'Saint-Émilion', 'France', '€€€€', 'Vignoble', '+33557550755', 'https://www.hoteldepavie.com', '2 Étoiles', 0, 'Vue Vignes', 'La gastronomie au sommet des crus de Saint-Émilion.', 'Mar-Sam'),
('Le Pré Catelan', 'Bois de Boulogne', 'Paris', 'France', '€€€€', 'Classique Moderne', '+33144144114', 'https://www.leprecatelan.com', '3 Étoiles', 0, 'Pavillon, Jardin', 'Frédéric Anton signe une cuisine graphique et précise dans le Bois de Boulogne.', 'Mar-Sam'),
('La Scène', '32 Avenue Matignon', 'Paris', 'France', '€€€€', 'Émotionnelle', '+33142650561', 'https://www.la-scene.paris', '2 Étoiles', 0, 'Théâtral', 'Stéphanie Le Quellec propose une cuisine directe et lisible.', 'Lun-Ven'),
('Epicure', '112 Rue du Faubourg Saint-Honoré', 'Paris', 'France', '€€€€', 'Classique', '+33153434340', 'https://www.oetkercollection.com', '3 Étoiles', 0, 'Jardin, Palace', 'Eric Frechon maintient l''excellence du luxe parisien au Bristol.', 'Tous les jours'),
('Sur Mesure par Thierry Marx', '251 Rue Saint-Honoré', 'Paris', 'France', '€€€€', 'Avant-garde', '+33170987300', 'https://www.mandarinoriental.com', '2 Étoiles', 0, 'Futuriste', 'Une expérience sensorielle totale dans un cocon blanc immaculé.', 'Mar-Sam'),
('Le Gabriel', '42 Avenue Gabriel', 'Paris', 'France', '€€€€', 'Néo-classique', '+33158366060', 'https://www.lareserve-paris.com', '2 Étoiles', 0, 'Palace, Intime', 'Jérôme Banctel sublime les produits avec des inspirations mondiales.', 'Tous les jours'),
('Pierre Gagnaire', '6 Rue Balzac', 'Paris', 'France', '€€€€', 'Artistique', '+33158361250', 'https://www.pierre-gagnaire.com', '3 Étoiles', 0, 'Salon, Chic', 'La folie créatrice et la poésie de Pierre Gagnaire.', 'Lun-Ven'),
('L''Oiseau Blanc', '19 Avenue Kléber', 'Paris', 'France', '€€€€', 'Aviation', '+33158122888', 'https://www.peninsula.com', '2 Étoiles', 0, 'Toit terrasse', 'Dîner face à la Tour Eiffel dans une ambiance rendant hommage aux pionniers de l''air.', 'Tous les jours'),
('Le Clarence', '31 Avenue Franklin D. Roosevelt', 'Paris', 'France', '€€€€', 'Néo-bourgeois', '+33182821010', 'https://www.le-clarence.paris', '2 Étoiles', 0, 'Hôtel Particulier', 'La quintessence de l''art de vivre à la française.', 'Mar-Sam'),
('Alléno Paris au Pavillon Ledoyen', '8 Avenue Dutuit', 'Paris', 'France', '€€€€', 'Moderne', '+33153051000', 'https://www.yannick-alleno.com', '3 Étoiles', 0, 'Jardin des Champs', 'L''art des extractions par Yannick Alléno dans un pavillon historique.', 'Lun-Ven'),
('L''Assiette de l''Hôtel de Ville', '1 Rue de la Libération', 'Crissier', 'Suisse', '€€€€', 'Gastronomique', '+41216340505', 'https://www.restaurantcrissier.com', '3 Étoiles', 0, 'Mythique', 'L''une des tables les plus prestigieuses au monde (proche frontière).', 'Mar-Sam'),
-- (Complément pour arriver à 50...)
('Maison Pic', '285 Avenue Victor Hugo', 'Valence', 'France', '€€€€', 'Sensorielle', '+33475441532', 'https://www.anne-sophie-pic.com', '3 Étoiles', 0, 'Jardin, Hôtel', 'Anne-Sophie Pic explore les parfums et les saveurs avec une infinie délicatesse.', 'Tous les jours'),
('Le Meurice Alain Ducasse', '228 Rue de Rivoli', 'Paris', 'France', '€€€€', 'Essentielle', '+33144581055', 'https://www.alainducasse-meurice.com', '2 Étoiles', 0, 'Grand Siècle', 'La pureté du produit dans le cadre du Salon de la Paix.', 'Lun-Ven'),
('L''Atelier Robuchon Étoile', '133 Av. des Champs-Élysées', 'Paris', 'France', '€€€', 'Concept', '+33147237575', 'https://www.robuchon.fr', '1 Étoile', 0, 'Comptoir Rouge', 'L''excellence de Joël Robuchon en version conviviale.', 'Tous les jours'),
('Frenchie', '5 Rue du Nil', 'Paris', 'France', '€€€', 'Bistronomie', '+33140399619', 'https://www.frenchie-restaurant.com', '1 Étoile', 0, 'Vibrant', 'Grégory Marchand marie influences anglo-saxonnes et produits français.', 'Lun-Ven'),
('Benoit', '20 Rue Saint-Martin', 'Paris', 'France', '€€', 'Bistro', '+33142722576', 'https://www.benoit-paris.com', '1 Étoile', 0, 'Tradition', 'Le seul bistro parisien étoilé, inchangé depuis 1912.', 'Tous les jours'),
('La Tour d''Argent', '15 Quai de la Tournelle', 'Paris', 'France', '€€€€', 'Classique', '+33143542331', 'https://tourdargent.com', '1 Étoile', 0, 'Vue Cathédrale', 'Le plus vieux restaurant de Paris, célèbre pour son canard au sang.', 'Mar-Sam'),
('Yam''Tcha', '121 Rue Saint-Honoré', 'Paris', 'France', '€€€', 'Franco-Chinoise', '+33140260807', 'https://www.yamtcha.com', '1 Étoile', 0, 'Thé & Vin', 'Adeline Grattard marie wok et terroir français.', 'Mar-Sam'),
('Septime La Cave', '3 Rue Basfroi', 'Paris', 'France', '€', 'Vin & Tapas', '+33143671487', NULL, 'Recommandé', 1, 'Debout', 'Le bar à vin culte pour grignoter des produits d''exception.', 'Tous les jours'),
('Clamato', '80 Rue de Charonne', 'Paris', 'France', '€€', 'Fruits de mer', '+33143727453', 'https://www.clamato-charonne.fr', 'Bib Gourmand', 0, 'Pas de résa', 'L''annexe marine de Septime.', 'Tous les jours'),
('Comice', '31 Rue de Chazelles', 'Paris', 'France', '€€€', 'Contemporain', '+33142277434', 'https://www.comice.paris', '1 Étoile', 0, 'Fleurs, Calme', 'Une cuisine précise et élégante portée par un duo talentueux.', 'Mar-Sam'),
('Alliance', '5 Rue de Poissy', 'Paris', 'France', '€€€', 'Classique revisité', '+33175515754', 'https://www.restaurant-alliance.fr', '1 Étoile', 0, 'Accueil', 'Le sens de l''hospitalité au service d''une cuisine rigoureuse.', 'Lun-Ven'),
('Pertinence', '24 Rue de l''Exposition', 'Paris', 'France', '€€€', 'Fusion discrète', '+33145552096', 'https://www.restaurantpertinence.com', '1 Étoile', 0, 'Petit écrin', 'Un couple nippo-malaisien qui revisite les bases françaises.', 'Mar-Sam'),
('Automne', '11 Rue Richard Lenoir', 'Paris', 'France', '€€', 'Saisonnier', '+33140090370', 'https://www.automne-paris.com', '1 Étoile', 0, 'Bois', 'Nobuyuki Akishige propose une cuisine franche et de saison.', 'Mar-Sam'),
('Le Jules Verne', 'Tour Eiffel, 2ème étage', 'Paris', 'France', '€€€€', 'Gastronomique', '+33145556144', 'https://www.lejulesverne-paris.com', '2 Étoiles', 0, 'Insolite', 'Frédéric Anton au sommet de la Tour Eiffel.', 'Tous les jours'),
('Pavillon', '8 Av. Dutuit', 'Paris', 'France', '€€€', 'Bistronomie Luxe', '+33153051010', 'https://www.yannick-alleno.com', '1 Étoile', 0, 'Comptoir', 'La version accessible du Pavillon Ledoyen.', 'Lun-Ven'),
('MoSuke', '11 Rue Raymond Losserand', 'Paris', 'France', '€€€', 'Afro-Japonaise', '+33143202139', 'https://mosuke-restaurant.com', '1 Étoile', 0, 'Inspiration', 'Mory Sacko mélange influences africaines et japonaises.', 'Mar-Sam'),
('Virtus', '29 Rue de Cotte', 'Paris', 'France', '€€', 'Marché', '+33980680808', 'https://www.virtus-paris.com', '1 Étoile', 0, 'Marché Aligre', 'Cuisine fraîche et spontanée.', 'Mar-Sam'),
('Shabour', '19 Rue Saint-Sauveur', 'Paris', 'France', '€€€', 'Israélienne', '+33142210590', 'https://www.restaurantshabour.com', '1 Étoile', 0, 'Ambiance', 'Assaf Granit fait vibrer le sentier.', 'Lun-Ven'),
('Pantagruel', '24 Rue du Sentier', 'Paris', 'France', '€€€', 'Conceptuel', '+33173747728', 'https://www.restaurant-pantagruel.com', '1 Étoile', 0, '3 temps', 'Jason Gouzy décline chaque plat en trois versions.', 'Lun-Ven'),
('Granite', '6 Rue de la Sourdière', 'Paris', 'France', '€€€', 'Moderne', '+33140136405', 'https://www.granite.paris', '1 Étoile', 1, 'Vertical', 'Tom Meyer au sommet de la créativité.', 'Lun-Ven'),
('La Mère Brazier', '12 Rue Royale', 'Lyon', 'France', '€€€€', 'Cuisine française', '+33478230172', 'https://www.lamerebrazier.fr', '2 Étoiles', 0, 'Historique, Gastronomique', 'Institution lyonnaise fondée en 1921, emblématique de la grande cuisine bourgeoise et du patrimoine culinaire de la ville.', 'Mar-Sam'),
('Takao Takano', '33 Rue Malesherbes', 'Lyon', 'France', '€€€€', 'Franco-japonaise', '+33478935227', 'https://www.takaotakano.com', '2 Étoiles', 0, 'Contemporain, Intimiste', 'Le chef Takao Takano propose une cuisine précise et délicate, mêlant techniques françaises et sensibilité japonaise.', 'Mar-Sam'),
('Le Neuvième Art', '173 Rue Cuvier', 'Lyon', 'France', '€€€€', 'Créative', '+33478317073', 'https://www.leneuviemeart.fr', '2 Étoiles', 0, 'Design, Cave', 'La table de Christophe Roure offre une cuisine inventive et technique, régulièrement saluée par les guides gastronomiques.', 'Mar-Sam'),
('Prairial', '11 Rue Chavanne', 'Lyon', 'France', '€€€', 'Cuisine de saison', '+33472600599', 'https://www.prairial-restaurant.com', '1 Étoile', 1, 'Écoresponsable, Produit local', 'Gaëtan Gentil met en avant une cuisine végétale et responsable, ancrée dans les produits locaux et le rythme des saisons.', 'Mar-Sam'),
('Christian Têtedoie', '4 Rue Professeur Pierre Marion', 'Lyon', 'France', '€€€', 'Cuisine française contemporaine', '+33478496262', 'https://tetedoie.com', '1 Étoile', 0, 'Vue panoramique, Terrasse', 'Installé sur la colline de Fourvière, ce restaurant offre une vue exceptionnelle sur Lyon et une cuisine raffinée.', 'Mar-Sam');

UPDATE restaurants
SET opening_hours = CASE MOD(id, 4)
	WHEN 0 THEN '{"Lun":"12:00-14:00, 19:00-22:00","Mar":"12:00-14:00, 19:00-22:00","Mer":"12:00-14:00, 19:00-22:00","Jeu":"12:00-14:00, 19:00-22:30","Ven":"12:00-14:00, 19:00-22:30","Sam":"19:00-22:30","Dim":"fermé"}'
	WHEN 1 THEN '{"Lun":"fermé","Mar":"12:00-14:00, 19:00-22:00","Mer":"12:00-14:00, 19:00-22:00","Jeu":"12:00-14:00, 19:00-22:00","Ven":"12:00-14:00, 19:00-22:30","Sam":"12:00-14:30, 19:00-22:30","Dim":"fermé"}'
	WHEN 2 THEN '{"Lun":"12:00-14:00","Mar":"12:00-14:00, 19:00-22:00","Mer":"12:00-14:00, 19:00-22:00","Jeu":"12:00-14:00, 19:00-22:00","Ven":"12:00-14:00, 19:00-22:30","Sam":"19:00-22:30","Dim":"12:00-14:30"}'
	ELSE '{"Lun":"12:00-14:00, 19:00-21:30","Mar":"12:00-14:00, 19:00-21:30","Mer":"12:00-14:00, 19:00-21:30","Jeu":"12:00-14:00, 19:00-22:00","Ven":"12:00-14:00, 19:00-22:00","Sam":"12:00-14:30, 19:00-22:00","Dim":"fermé"}'
END;

UPDATE restaurants
SET description = CONCAT(
	description,
	' La carte évolue régulièrement en fonction des saisons et met en avant des producteurs engagés. ',
	'Le service est attentif, la sélection de vins soignée et l''expérience pensée pour offrir un vrai moment gastronomique du début à la fin.'
)
WHERE LENGTH(description) < 300;

UPDATE restaurants
SET description = CONCAT(
	'Adresse gastronomique située à ', city, ', reconnue pour une cuisine ', LOWER(COALESCE(cuisine, 'raffinée')),
	' et une expérience soignée. L''établissement met en valeur les produits de saison, un service attentif et une identité culinaire clairement assumée.'
)
WHERE description IS NULL OR TRIM(description) = '';

-- ============================================================
-- ACCOMMODATION (50 Hôtels/Palaces Réels)
-- ============================================================
INSERT INTO accommodation (name, address, city, country, phone, description, award, facilities, price_from, website_url) VALUES
('Ritz Paris', '15 Place Vendôme', 'Paris', 'France', '+33143163030', 'L''un des hôtels les plus célèbres au monde, symbole du luxe à la française.', 'Palace', 'Spa, Piscine, Bar Hemingway', 1500, 'https://www.ritzparis.com'),
('Le Crillon', '10 Place de la Concorde', 'Paris', 'France', '+33144053000', 'Hôtel historique offrant une vue imprenable sur la Place de la Concorde.', 'Palace', 'Butler, Spa, Piscine', 1200, 'https://www.rosewoodhotels.com'),
('Hôtel de Ville de Crissier', '1 Rue d''Hôtel de Ville', 'Crissier', 'Suisse', '+41216340505', 'Une étape gastronomique et luxueuse.', '5 étoiles', 'Gastronomie, Calme', 400, 'https://www.restaurant-crissier.com'),
('La Réserve Paris', '42 Avenue Gabriel', 'Paris', 'France', '+33158366060', 'L''élégance d''un appartement privé avec les services d''un palace.', 'Palace', 'Spa, Bibliothèque, Majordome', 1100, 'https://www.lareserve-paris.com'),
('Le Meurice', '228 Rue de Rivoli', 'Paris', 'France', '+33144581010', 'Hôtel d''art et de génie face au jardin des Tuileries.', 'Palace', 'Spa, Bar, Restaurant Alain Ducasse', 950, 'https://www.dorchestercollection.com'),
('Hôtel Lutetia', '45 Boulevard Raspail', 'Paris', 'France', '+33149544600', 'L''unique palace de la Rive Gauche, monument historique Art Déco.', 'Palace', 'Spa Akasha, Piscine, Jazz Bar', 850, 'https://www.hotellutetia.com'),
('Royal Monceau', '37 Avenue Hoche', 'Paris', 'France', '+33142998800', 'Palace contemporain vibrant, tourné vers l''art et le design.', 'Palace', 'Cinéma, Spa Clarins, Piscine', 900, 'https://www.leroyalmonceau.com'),
('Shangri-La Paris', '10 Avenue d''Iéna', 'Paris', 'France', '+33153671998', 'Ancienne demeure du Prince Roland Bonaparte avec vue sur la Tour Eiffel.', 'Palace', 'Piscine, Vue Eiffel, Restaurant Chinois', 1000, 'https://www.shangri-la.com'),
('The Peninsula Paris', '19 Avenue Kléber', 'Paris', 'France', '+33158122888', 'Architecture haussmannienne et confort ultra-moderne.', 'Palace', 'Toit Terrasse, Spa, Flotte de Rolls', 1150, 'https://www.peninsula.com'),
('Park Hyatt Paris-Vendôme', '5 Rue de la Paix', 'Paris', 'France', '+33158711234', 'Design contemporain et luxe discret près de l''Opéra.', 'Palace', 'Spa, Terrasse intérieure, Restaurant Pur', 800, 'https://www.hyatt.com'),
('Hôtel de Paris Monte-Carlo', 'Place du Casino', 'Monaco', 'Monaco', '+37798063000', 'Le temple du jeu et du luxe international.', 'Palace', 'Casino, Spa, Cave à vin privée', 1300, 'https://www.montecarlosbm.com'),
('Byblos Saint-Tropez', '20 Avenue Paul Signac', 'Saint-Tropez', 'France', '+33494566800', 'L''âme de Saint-Tropez, entre fête et raffinement.', 'Palace', 'Night-club, Piscine, Spa Sisley', 750, 'https://www.byblos.com'),
('La Réserve Ramatuelle', '735 Chemin de la Quessine', 'Ramatuelle', 'France', '+33494449444', 'Hôtel spa suspendu entre ciel et mer.', 'Palace', 'Vue mer, Spa Médical, Design', 900, 'https://www.lareserve-ramatuelle.com'),
('Villa d''Este', 'Via Regina 40', 'Cernobbio', 'Italie', '+390313481', 'Légende sur les rives du lac de Côme (Destination Proche).', '5 étoiles', 'Lac, Piscine flottante, Jardins', 1200, 'https://www.villadeste.com'),
('Relais Bernard Loiseau', '2 Rue d''Argentine', 'Saulieu', 'France', '+33380905353', 'Une expérience sensorielle totale en Bourgogne.', '5 étoiles', 'Spa, Jardin, Gastronomie', 350, 'https://www.bernard-loiseau.com'),
('Domaine des Etangs', '16310 Massignac', 'Massignac', 'France', '+33545618500', 'Un château transformé en lieu de vie artistique et naturel.', '5 étoiles', 'Nature, Art, Étangs', 500, 'https://domainedesetangs.com'),
('Airelles Courchevel', 'Jardin Alpin', 'Courchevel', 'France', '+33479003838', 'Un château de conte de fées sur les pistes de ski.', 'Palace', 'Ski, Spa, Enfants', 1800, 'https://airelles.com'),
('K2 Palace', '238 Rue des Clarines', 'Courchevel', 'France', '+33479400880', 'Inspiration himalayenne pour un luxe alpin ultime.', 'Palace', 'Ski-in, Cinéma, Piscine', 1600, 'https://www.lek2palace.com'),
('Hotel du Cap-Eden-Roc', '167 Bd J. F. Kennedy', 'Antibes', 'France', '+33493613901', 'Le refuge des stars pendant le Festival de Cannes.', 'Palace', 'Plongeoir iconique, Tennis, Mer', 1200, 'https://www.oetkercollection.com'),
('Grand-Hôtel du Cap-Ferrat', '71 Bd du Général de Gaulle', 'St-Jean-Cap-Ferrat', 'France', '+33493765050', 'Luxe intemporel à la pointe du Cap Ferrat.', 'Palace', 'Piscine Club Dauphin, Funiculaire', 1100, 'https://www.fourseasons.com'),
-- (Suite pour atteindre 50...)
('Le Burgundy', '6-8 Rue Duphot', 'Paris', 'France', '+33142603412', 'Hôtel boutique chic et confidentiel.', '5 étoiles', 'Spa, Piscine, Michelin', 550, 'https://www.leburgundy.com'),
('Grand Powers', '52 Rue François 1er', 'Paris', 'France', '+33147239105', 'Charme historique revisité dans le triangle d''or.', '5 étoiles', 'Hammam, Balcons', 480, 'https://www.hotelgrandpowersparis.com'),
('JK Place Paris', '82 Rue de l''Université', 'Paris', 'France', '+33140604040', 'Ambiance villa italienne sur la Rive Gauche.', '5 étoiles', 'Design, Spa Casa Tua', 950, 'https://www.jkplace.paris'),
('Monsieur George', '17 Rue Washington', 'Paris', 'France', '+33187862525', 'Design signé Anouska Hempel près des Champs.', '5 étoiles', 'Cave, Design', 420, 'https://www.monsieurgeorge.com'),
('Saint James Paris', '5 Place du Chancelier Adenauer', 'Paris', 'France', '+33144058181', 'Hôtel-Château entouré de jardins en plein Paris.', 'Palace', 'Club privé, Spa Guerlain', 700, 'https://www.saint-james-paris.com'),
('Hôtel de Crillon', '10 Place de la Concorde', 'Paris', 'France', '+33144053000', 'Réouverture magistrale d''un monument.', 'Palace', 'Spa, Piscine', 1100, 'https://www.rosewoodhotels.com'),
('Pavillon de la Reine', '28 Place des Vosges', 'Paris', 'France', '+33140291919', 'L''adresse la plus secrète du Marais.', '5 étoiles', 'Jardin intérieur, Spa', 500, 'https://www.pavillon-de-la-reine.com'),
('Maison Villeroy', '33 Rue Jean Goujon', 'Paris', 'France', '+33145056800', 'L''ultra-exclusivité avec seulement 11 chambres.', 'Palace', 'Majordome 24/7, Spa', 1400, 'https://www.maisonvilleroy.com'),
('Brach Paris', '1-7 Rue Jean Richepin', 'Paris', 'France', '+33144301000', 'L''énergie de Philippe Starck dans le 16ème.', '5 étoiles', 'Potager sur le toit, Sport', 600, 'https://brachparis.com'),
('Sinner Paris', '116 Rue du Temple', 'Paris', 'France', '+33142712323', 'Luxe impertinent et mystique dans le Marais.', '5 étoiles', 'Atmosphère, Spa', 450, 'https://sinnerparis.com'),
('Nolinski Paris', '16 Avenue de l''Opéra', 'Paris', 'France', '+33142861010', 'L''élégance française avec une touche de théâtre.', '5 étoiles', 'Piscine sous miroir, Spa', 580, 'https://nolinskiparis.com'),
('Château de la Messardière', '2 Route de Tahiti', 'Saint-Tropez', 'France', '+33494567600', 'Château surplombant la baie de Pampelonne.', 'Palace', 'Spa Valmont, Piscines', 850, 'https://airelles.com'),
('Cheval Blanc Courchevel', 'Rue du Jardin Alpin', 'Courchevel', 'France', '+33479005050', 'L''art de recevoir au sommet par LVMH.', 'Palace', 'Ski-in, Restaurant 3*', 2000, 'https://www.chevalblanc.com'),
('Les Airelles', 'Rue du Jardin Alpin', 'Courchevel', 'France', '+33479003838', 'Un conte d''hiver autrichien en France.', 'Palace', 'Service royal', 1800, 'https://airelles.com'),
('Les Sources de Caudalie', 'Chemin de Smith Haut Lafitte', 'Martillac', 'France', '+33557838383', 'Vinothérapie au cœur des vignes de Bordeaux.', '5 étoiles', 'Spa Caudalie, Vignes', 380, 'https://www.sources-caudalie.com'),
('Hotel de la Cité', 'Place de l''Église', 'Carcassonne', 'France', '+33468719871', 'Dormir au cœur de la cité médiévale.', '5 étoiles', 'Histoire, Jardin', 320, 'https://www.hoteldelacite.com'),
('Hotel du Palais', '1 Avenue de l''Impératrice', 'Biarritz', 'France', '+33559416400', 'Ancienne résidence impériale face à l''Atlantique.', 'Palace', 'Vue Océan, Piscine', 550, 'https://www.hyatt.com'),
('InterContinental Bordeaux', '2-5 Place de la Comédie', 'Bordeaux', 'France', '+33557304444', 'Le Grand Hôtel face à l''Opéra.', '5 étoiles', 'Spa Gordon Ramsay', 400, 'https://bordeaux.intercontinental.com'),
('Hôtel de la Ville', 'Via Sistina 69', 'Rome', 'Italie', '+3906977931', 'Palazzo du XVIIIe siècle au-dessus de la Place d''Espagne.', '5 étoiles', 'Rooftop, Rome', 600, 'https://www.roccofortehotels.com'),
('Villa Cora', 'Viale Machiavelli 18', 'Florence', 'Italie', '+39055228790', 'Splendeur du XIXe siècle dans un parc dominant Boboli.', '5 étoiles', 'Piscine, Fresques', 500, 'https://www.villacora.it'),
('Aman Venice', 'Calle Tiepolo 1364', 'Venise', 'Italie', '+390412707333', 'Palais sur le Grand Canal où s''est marié George Clooney.', '5 étoiles', 'Jardins privés, Fresques', 1300, 'https://www.aman.com'),
('Belmond Hotel Cipriani', 'Giudecca 10', 'Venise', 'Italie', '+39041240801', 'L''île refuge de la jet-set vénitienne.', '5 étoiles', 'Piscine Olympique, Navette', 1100, 'https://www.belmond.com'),
('Four Seasons Florence', 'Borgo Pinti 99', 'Florence', 'Italie', '+3905526261', 'Le plus grand parc privé de Florence avec des suites musée.', '5 étoiles', 'Jardin, Spa, Chapelle', 1000, 'https://www.fourseasons.com'),
('Baur au Lac', 'Talstrasse 1', 'Zurich', 'Suisse', '+41442205020', 'Institution familiale face au lac depuis 1844.', '5 étoiles', 'Parc, Service luxe', 750, 'https://www.bauraulac.ch'),
('Beau-Rivage Palace', 'Chemin de Beau-Rivage 21', 'Lausanne', 'Suisse', '+41216133333', 'Un balcon sur le Lac Léman.', '5 étoiles', 'Spa Cinq Mondes, Lac', 550, 'https://www.brp.ch'),
('The Dolder Grand', 'Kurhausstrasse 65', 'Zurich', 'Suisse', '+41444566000', 'Château moderne dominant la ville et les Alpes.', '5 étoiles', 'Art collection, Spa', 800, 'https://www.thedoldergrand.com'),
('Four Seasons Megeve', '373 Chemin des Follières', 'Megève', 'France', '+33450211211', 'Le luxe contemporain sur les pentes du Mont d''Arbois.', '5 étoiles', 'Ski-in, Golf', 1200, 'https://www.fourseasons.com'),
('Le Coucou', '464 Route du Belvédère', 'Méribel', 'France', '+33457583737', 'Design de Pierre Yovanovitch pour ce refuge chic.', '5 étoiles', 'Ski-in, Piscines', 850, 'https://lecoucoumeribel.com'),
('Les Fermes de Marie', '163 Chemin de la Riante Colline', 'Megève', 'France', '+33450930310', 'Le charme authentique du vieux bois et du cocooning.', '5 étoiles', 'Spa Pure Altitude', 400, 'https://www.fermesdemarie.com'),
('Hotel de Tourrel', '5 Rue Carnot', 'Saint-Rémy-de-Provence', 'France', '+33484350720', 'Hôtel particulier du XVIIe entre design et vieilles pierres.', '5 étoiles', 'Design, Toit terrasse', 350, 'https://www.detourrel.com'),
('Villa Florentine', '25 Montée Saint-Barthélemy', 'Lyon', 'France', '+33472761010', 'Relais & Châteaux perché sur Fourvière, avec panorama sur Lyon et atmosphère de couvent italien revisité.', '5 étoiles', 'Spa, Piscine, Vue panoramique', 420, 'https://www.villaflorentine.com'),
('Boscolo Lyon Hotel & Spa', '11 Quai Jules Courmont', 'Lyon', 'France', '+33487250250', 'Adresse contemporaine installée dans un bâtiment historique au bord du Rhône, avec spa et piscine intérieure.', '5 étoiles', 'Spa, Piscine intérieure, Centre-ville', 280, 'https://www.boscolohotels.com/lyon'),
('InterContinental Lyon - Hotel Dieu', '20 Quai Jules Courmont', 'Lyon', 'France', '+33426109999', 'Hôtel emblématique de l''Hôtel-Dieu, remarquable par son dôme, son bar Le Dôme et sa situation centrale.', '5 étoiles', 'Patrimoine, Bar Le Dôme, Concierge', 330, 'https://www.ihg.com/intercontinental/hotels/fr/fr/lyon/lysha/hoteldetail'),
('Cour des Loges Lyon, A Radisson Collection Hotel', '6 Rue du Bœuf', 'Lyon', 'France', '+33472771010', 'Maison historique du Vieux Lyon combinant architecture Renaissance, gastronomie et prestations haut de gamme.', '5 étoiles', 'Spa, Patio Renaissance, Vieux Lyon', 390, 'https://www.radissonhotels.com/fr-fr/hotels/radisson-collection-lyon-cour-des-loges'),
('Villa Maïa', '8 Rue Professeur Pierre Marion', 'Lyon', 'France', '+33478642000', 'Refuge confidentiel sur la colline de Fourvière, connu pour son calme, son spa et ses vues sur la ville.', '5 étoiles', 'Spa, Jardin, Vue ville', 460, 'https://www.villa-maia.com');

UPDATE accommodation
SET description = CONCAT(
	description,
	' Les espaces bien-être, la qualité de literie et les prestations hôtelières sont pensés pour un séjour confortable et haut de gamme. ',
	'Selon l''adresse, l''établissement propose des vues remarquables, un spa complet et des services personnalisés.'
)
WHERE LENGTH(description) < 300;

UPDATE accommodation
SET award = CASE
	WHEN price_from >= 1400 THEN '5 étoiles'
	WHEN price_from >= 1000 THEN '4 étoiles'
	WHEN price_from >= 700 THEN '3 étoiles'
	WHEN price_from >= 450 THEN '2 étoiles'
	ELSE '1 étoile'
END;

-- ============================================================
-- CHAMBRES (Association 1 pour 1 pour le test)
-- ============================================================
INSERT INTO accommodation_rooms (accommodation_id, room_type, description, price_per_night, capacity, amenities)
SELECT id, 'Suite Signature', 'Une suite spacieuse avec vue panoramique et service de majordome.', price_from + 200, 2, 'WiFi, Mini-bar, Coffre-fort, Balcon' FROM accommodation;

INSERT INTO accommodation_rooms (accommodation_id, room_type, description, price_per_night, capacity, amenities)
SELECT id, 'Chambre Deluxe', 'Confort absolu et décoration raffinée.', price_from, 2, 'WiFi, TV, Mini-bar' FROM accommodation;

INSERT INTO accommodation_rooms (accommodation_id, room_type, description, price_per_night, capacity, amenities)
SELECT id, 'Junior Suite', 'Une suite lumineuse avec salon, matières nobles et atmosphère apaisante.', price_from + 120, 2, 'WiFi, Machine à café, Douche pluie' FROM accommodation;

INSERT INTO accommodation_rooms (accommodation_id, room_type, description, price_per_night, capacity, amenities)
SELECT id, 'Chambre Terrasse', 'Une chambre élégante avec ouverture sur l''extérieur et prestations premium.', price_from + 80, 2, 'WiFi, Terrasse, Literie king size' FROM accommodation;

-- ============================================================
-- PHOTOS RESTAURANTS (Exemples)
-- ============================================================
INSERT INTO restaurant_photos (restaurant_id, url, position)
SELECT
	r.id,
	CASE MOD(r.id + p.position, 12)
		WHEN 0 THEN 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=900&fit=crop'
		WHEN 1 THEN 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=900&fit=crop'
		WHEN 2 THEN 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=900&fit=crop'
		WHEN 3 THEN 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&h=900&fit=crop'
		WHEN 4 THEN 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&h=900&fit=crop'
		WHEN 5 THEN 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&h=900&fit=crop'
		WHEN 6 THEN 'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=1200&h=900&fit=crop'
		WHEN 7 THEN 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=1200&h=900&fit=crop'
		WHEN 8 THEN 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=900&fit=crop'
		WHEN 9 THEN 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=1200&h=900&fit=crop'
		WHEN 10 THEN 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1200&h=900&fit=crop'
		ELSE 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=1200&h=900&fit=crop'
	END,
	p.position
FROM restaurants r
CROSS JOIN (
	SELECT 1 AS position
	UNION ALL SELECT 2
	UNION ALL SELECT 3
	UNION ALL SELECT 4
) p;

-- ============================================================
-- PHOTOS HÉBERGEMENTS (Thématiques)
-- ============================================================
UPDATE accommodation
SET photo_url = CASE MOD(id, 10)
	WHEN 0 THEN 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&h=900&fit=crop'
	WHEN 1 THEN 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=900&fit=crop'
	WHEN 2 THEN 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=900&fit=crop'
	WHEN 3 THEN 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&h=900&fit=crop'
	WHEN 4 THEN 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&h=900&fit=crop'
	WHEN 5 THEN 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=900&fit=crop'
	WHEN 6 THEN 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=900&fit=crop'
	WHEN 7 THEN 'https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?w=1200&h=900&fit=crop'
	WHEN 8 THEN 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&h=900&fit=crop'
	ELSE 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&h=900&fit=crop'
END;

UPDATE accommodation_rooms
SET photo_url = CASE MOD(id, 8)
	WHEN 0 THEN 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&h=900&fit=crop'
	WHEN 1 THEN 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=900&fit=crop'
	WHEN 2 THEN 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=900&fit=crop'
	WHEN 3 THEN 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&h=900&fit=crop'
	WHEN 4 THEN 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&h=900&fit=crop'
	WHEN 5 THEN 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=900&fit=crop'
	WHEN 6 THEN 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=900&fit=crop'
	ELSE 'https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?w=1200&h=900&fit=crop'
END;

-- ============================================================
-- RÉTABLISSEMENT DES CONTRAINTES
-- ============================================================
SET FOREIGN_KEY_CHECKS = 1;