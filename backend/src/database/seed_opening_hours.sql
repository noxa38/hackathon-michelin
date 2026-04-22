-- seed_opening_hours.sql — Horaires d'ouverture de tous les restaurants
-- Couvre les restaurants originaux (Allemagne, Nordique, Dubai) ET les restaurants français

-- ── Restaurants français ──────────────────────────────────────────────────
UPDATE restaurants SET opening_hours = 'Mar-Sam · 12h-14h & 19h30-22h | Dim-Lun fermé'   WHERE name = 'Guy Savoy';
UPDATE restaurants SET opening_hours = 'Lun-Dim · 12h-14h & 19h30-22h'                    WHERE name = 'Épicure';
UPDATE restaurants SET opening_hours = 'Mer-Dim · 12h-13h30 & 19h30-21h30 | Lun-Mar fermé' WHERE name = 'Flocons de Sel';
UPDATE restaurants SET opening_hours = 'Jeu-Lun · 12h-13h30 & 19h30-21h | Mar-Mer fermé'  WHERE name = 'Auberge du Vieux Puits';
UPDATE restaurants SET opening_hours = 'Mer-Dim · 12h-14h & 19h30-21h30 | Lun-Mar fermé'  WHERE name = 'Maison Lameloise';
UPDATE restaurants SET opening_hours = 'Mer-Dim · 12h-13h30 & 19h-21h | Lun-Mar fermé'    WHERE name = 'Auberge de l''Ill';
UPDATE restaurants SET opening_hours = 'Lun-Ven · 12h-14h & 19h-22h | Sam-Dim fermé'      WHERE name = 'Taillevent';
UPDATE restaurants SET opening_hours = 'Mar-Sam · 12h-14h & 19h30-22h | Dim-Lun fermé'    WHERE name = 'Le Meurice';
UPDATE restaurants SET opening_hours = 'Mar-Sam · 12h-14h30 & 19h30-22h | Dim-Lun fermé'  WHERE name = 'Kei';
UPDATE restaurants SET opening_hours = 'Mer-Dim · 12h-13h30 & 19h30-21h | Lun-Mar fermé'  WHERE name = 'La Grenouillère';
UPDATE restaurants SET opening_hours = 'Lun-Dim · 12h-14h & 19h30-21h30'                   WHERE name = 'Oustau de Baumanière';
UPDATE restaurants SET opening_hours = 'Mar-Sam · 19h-22h | Dim-Lun fermé'                 WHERE name = 'Le Pressoir d''Argent';
UPDATE restaurants SET opening_hours = 'Lun-Ven · 12h15-14h & 19h15-22h | Sam-Dim fermé'  WHERE name = 'Septime';
UPDATE restaurants SET opening_hours = 'Lun-Ven · 12h30-14h & 19h30-22h | Sam-Dim fermé'  WHERE name = 'Le Grand Véfour';
UPDATE restaurants SET opening_hours = 'Mer-Dim · 12h-13h30 & 19h30-21h | Lun-Mar fermé'  WHERE name = 'Maison Marcon';
UPDATE restaurants SET opening_hours = 'Mar-Sam · 12h30-14h & 19h30-22h | Dim-Lun fermé'  WHERE name = 'L''Envol';
UPDATE restaurants SET opening_hours = 'Mar-Sam · 12h-14h & 19h30-21h30 | Dim-Lun fermé'  WHERE name = 'La Table de Ventabren';
UPDATE restaurants SET opening_hours = 'Mar-Sam · 12h-14h & 19h30-22h | Dim-Lun fermé'    WHERE name = 'Léon de Lyon';
UPDATE restaurants SET opening_hours = 'Mar-Sam · 12h-14h & 19h-22h | Dim-Lun fermé'      WHERE name = 'Le Quinzième';
UPDATE restaurants SET opening_hours = 'Lun-Ven · 12h-14h & 19h-22h | Sam-Dim fermé'      WHERE name = 'La Scène';
UPDATE restaurants SET opening_hours = 'Mar-Sam · 12h-14h30 & 19h30-23h | Dim-Lun fermé'  WHERE name = 'Bistrot Paul Bert';
UPDATE restaurants SET opening_hours = 'Lun-Dim · 12h-23h'                                  WHERE name = 'Le Comptoir du Relais';
UPDATE restaurants SET opening_hours = 'Mar-Sam · 12h-13h45 & 19h-21h45 | Dim-Lun fermé'  WHERE name = 'L''Atelier du Peintre';
UPDATE restaurants SET opening_hours = 'Lun-Sam · 12h-14h & 19h-22h | Dim fermé'           WHERE name = 'Café Moderne';
UPDATE restaurants SET opening_hours = 'Lun-Ven · 12h-14h30 & 19h-22h30 | Sam-Dim fermé'  WHERE name = 'La Régalade Conservatoire';
UPDATE restaurants SET opening_hours = 'Mar-Sam · 12h-13h30 & 19h30-21h30 | Dim-Lun fermé' WHERE name = 'La Marine';
UPDATE restaurants SET opening_hours = 'Jeu-Lun · 12h-14h & 19h30-21h30 | Mar-Mer fermé'  WHERE name = 'Le Jardin des Plumes';

-- ── Restaurants originaux (Allemagne, Scandinavie, Dubai) ─────────────────
UPDATE restaurants SET opening_hours = 'Mer-Sam · 12h-14h & 19h-21h30 | Dim-Mar fermé'  WHERE name = 'ES:SENZ';
UPDATE restaurants SET opening_hours = 'Mar-Sam · 19h-22h | Dim-Lun fermé'               WHERE name = 'Tohru in der Schreiberei';
UPDATE restaurants SET opening_hours = 'Mer-Dim · 19h-21h30 | Lun-Mar fermé'             WHERE name = 'Schwarzwaldstube';
UPDATE restaurants SET opening_hours = 'Mer-Sam · 19h-21h30 | Dim-Mar fermé'             WHERE name = 'Victor''s Fine Dining by christian bau';
UPDATE restaurants SET opening_hours = 'Jeu-Sam · 12h-13h30 & 19h-21h | Dim-Mer fermé'  WHERE name = 'schanz. restaurant.';
UPDATE restaurants SET opening_hours = 'Mar-Sam · 18h30-22h | Dim-Lun fermé'             WHERE name = 'Restaurant Haerlin';
UPDATE restaurants SET opening_hours = 'Mer-Sam · 19h-22h | Dim-Mar fermé'               WHERE name = 'The Table Kevin Fehling';
UPDATE restaurants SET opening_hours = 'Jeu-Dim · 19h-21h30 | Lun-Mer fermé'            WHERE name = 'Waldhotel Sonnora';
UPDATE restaurants SET opening_hours = 'Mar-Sam · 19h-22h | Dim-Lun fermé'               WHERE name = 'JAN';
UPDATE restaurants SET opening_hours = 'Mar-Dim · 12h-14h & 19h-21h30 | Lun fermé'      WHERE name = 'Restaurant Bareiss';
UPDATE restaurants SET opening_hours = 'Lun-Sam · 19h-22h | Dim fermé'                   WHERE name = 'Rutz';
UPDATE restaurants SET opening_hours = 'Mar-Sam · 18h30-22h | Dim-Lun fermé'             WHERE name = 'Maaemo';
UPDATE restaurants SET opening_hours = 'Mar-Sam · 18h-22h | Dim-Lun fermé'               WHERE name = 'RE-NAA';
UPDATE restaurants SET opening_hours = 'Mar-Sam · 18h-22h | Dim-Lun fermé'               WHERE name = 'Frantzén';
UPDATE restaurants SET opening_hours = 'Mer-Sam · 18h30-22h | Dim-Mar fermé'             WHERE name = 'Jordnær';
UPDATE restaurants SET opening_hours = 'Mar-Sam · 12h-13h & 18h-21h30 | Dim-Lun fermé'  WHERE name = 'Geranium';
UPDATE restaurants SET opening_hours = 'Mar-Dim · 19h-22h | Lun fermé'                   WHERE name = 'Hiša Franko';
UPDATE restaurants SET opening_hours = 'Lun-Dim · 19h-23h'                               WHERE name = 'Trèsind Studio';
UPDATE restaurants SET opening_hours = 'Lun-Dim · 12h-14h & 18h-23h'                    WHERE name = 'Grande Étoile';
UPDATE restaurants SET opening_hours = 'Mer-Dim · 12h-14h & 18h-21h | Lun-Mar fermé'    WHERE name = 'Goldener Engel';
UPDATE restaurants SET opening_hours = 'Lun-Dim · 12h-22h'                               WHERE name = 'Chiemgauhof';
UPDATE restaurants SET opening_hours = 'Mar-Sam · 19h-22h | Dim-Lun fermé'               WHERE name = 'Chefs Atelier';
UPDATE restaurants SET opening_hours = 'Jeu-Lun · 19h-23h | Mar-Mer fermé'              WHERE name = 'FZN by Björn Frantzén';
