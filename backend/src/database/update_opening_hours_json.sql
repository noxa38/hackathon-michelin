-- update_opening_hours_json.sql
-- Migration : convertit les horaires en JSON {Lun, Mar, Mer, Jeu, Ven, Sam, Dim}
-- Chaque jour a une valeur : "HH-HH", "HH-HH & HH-HH", ou "fermé"

SET NAMES utf8mb4;

-- ── Restaurants allemands ──────────────────────────────────────────────────
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"fermé","Mer":"12h-14h & 19h-21h30","Jeu":"12h-14h & 19h-21h30","Ven":"12h-14h & 19h-21h30","Sam":"12h-14h & 19h-21h30","Dim":"fermé"}' WHERE name = 'ES:SENZ';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"19h-22h","Mer":"19h-22h","Jeu":"19h-22h","Ven":"19h-22h","Sam":"19h-22h","Dim":"fermé"}' WHERE name = 'Tohru in der Schreiberei';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"fermé","Mer":"19h-21h30","Jeu":"19h-21h30","Ven":"19h-21h30","Sam":"19h-21h30","Dim":"19h-21h30"}' WHERE name = 'Schwarzwaldstube';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"fermé","Mer":"19h-21h30","Jeu":"19h-21h30","Ven":"19h-21h30","Sam":"19h-21h30","Dim":"fermé"}' WHERE name = 'Victor''s Fine Dining by christian bau';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"fermé","Mer":"fermé","Jeu":"12h-13h30 & 19h-21h","Ven":"12h-13h30 & 19h-21h","Sam":"12h-13h30 & 19h-21h","Dim":"fermé"}' WHERE name = 'schanz. restaurant.';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"18h30-22h","Mer":"18h30-22h","Jeu":"18h30-22h","Ven":"18h30-22h","Sam":"18h30-22h","Dim":"fermé"}' WHERE name = 'Restaurant Haerlin';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"fermé","Mer":"19h-22h","Jeu":"19h-22h","Ven":"19h-22h","Sam":"19h-22h","Dim":"fermé"}' WHERE name = 'The Table Kevin Fehling';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"fermé","Mer":"fermé","Jeu":"19h-21h30","Ven":"19h-21h30","Sam":"19h-21h30","Dim":"19h-21h30"}' WHERE name = 'Waldhotel Sonnora';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"19h-22h","Mer":"19h-22h","Jeu":"19h-22h","Ven":"19h-22h","Sam":"19h-22h","Dim":"fermé"}' WHERE name = 'JAN';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"12h-14h & 19h-21h30","Mer":"12h-14h & 19h-21h30","Jeu":"12h-14h & 19h-21h30","Ven":"12h-14h & 19h-21h30","Sam":"12h-14h & 19h-21h30","Dim":"12h-14h & 19h-21h30"}' WHERE name = 'Restaurant Bareiss';
UPDATE restaurants SET opening_hours = '{"Lun":"19h-22h","Mar":"19h-22h","Mer":"19h-22h","Jeu":"19h-22h","Ven":"19h-22h","Sam":"19h-22h","Dim":"fermé"}' WHERE name = 'Rutz';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"fermé","Mer":"19h-22h","Jeu":"19h-22h","Ven":"19h-22h","Sam":"19h-22h","Dim":"fermé"}' WHERE name = 'Grande Étoile';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"fermé","Mer":"12h-14h & 18h-21h","Jeu":"12h-14h & 18h-21h","Ven":"12h-14h & 18h-21h","Sam":"12h-14h & 18h-21h","Dim":"12h-14h & 18h-21h"}' WHERE name = 'Goldener Engel';
UPDATE restaurants SET opening_hours = '{"Lun":"12h-22h","Mar":"12h-22h","Mer":"12h-22h","Jeu":"12h-22h","Ven":"12h-22h","Sam":"12h-22h","Dim":"12h-22h"}' WHERE name = 'Chiemgauhof';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"19h-22h","Mer":"19h-22h","Jeu":"19h-22h","Ven":"19h-22h","Sam":"19h-22h","Dim":"fermé"}' WHERE name = 'Chefs Atelier';

-- ── Restaurants scandinaves ────────────────────────────────────────────────
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"18h30-22h","Mer":"18h30-22h","Jeu":"18h30-22h","Ven":"18h30-22h","Sam":"18h30-22h","Dim":"fermé"}' WHERE name = 'Maaemo';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"18h-22h","Mer":"18h-22h","Jeu":"18h-22h","Ven":"18h-22h","Sam":"18h-22h","Dim":"fermé"}' WHERE name = 'RE-NAA';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"18h-22h","Mer":"18h-22h","Jeu":"18h-22h","Ven":"18h-22h","Sam":"18h-22h","Dim":"fermé"}' WHERE name = 'Frantzén';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"fermé","Mer":"18h30-22h","Jeu":"18h30-22h","Ven":"18h30-22h","Sam":"18h30-22h","Dim":"fermé"}' WHERE name = 'Jordnær';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"12h-13h & 18h-21h30","Mer":"12h-13h & 18h-21h30","Jeu":"12h-13h & 18h-21h30","Ven":"12h-13h & 18h-21h30","Sam":"12h-13h & 18h-21h30","Dim":"fermé"}' WHERE name = 'Geranium';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"19h-22h","Mer":"19h-22h","Jeu":"19h-22h","Ven":"19h-22h","Sam":"19h-22h","Dim":"19h-22h"}' WHERE name = 'Hiša Franko';

-- ── Restaurants Dubai ──────────────────────────────────────────────────────
UPDATE restaurants SET opening_hours = '{"Lun":"19h-23h","Mar":"19h-23h","Mer":"19h-23h","Jeu":"19h-23h","Ven":"19h-23h","Sam":"19h-23h","Dim":"19h-23h"}' WHERE name = 'Trèsind Studio';
UPDATE restaurants SET opening_hours = '{"Lun":"19h-23h","Mar":"fermé","Mer":"fermé","Jeu":"19h-23h","Ven":"19h-23h","Sam":"19h-23h","Dim":"19h-23h"}' WHERE name = 'FZN by Björn Frantzén';

-- ── Restaurants français — 3 étoiles ──────────────────────────────────────
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"12h-14h & 19h30-22h","Mer":"12h-14h & 19h30-22h","Jeu":"12h-14h & 19h30-22h","Ven":"12h-14h & 19h30-22h","Sam":"12h-14h & 19h30-22h","Dim":"fermé"}' WHERE name = 'Guy Savoy';
UPDATE restaurants SET opening_hours = '{"Lun":"12h-14h & 19h30-22h","Mar":"12h-14h & 19h30-22h","Mer":"12h-14h & 19h30-22h","Jeu":"12h-14h & 19h30-22h","Ven":"12h-14h & 19h30-22h","Sam":"12h-14h & 19h30-22h","Dim":"12h-14h & 19h30-22h"}' WHERE name = 'Épicure';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"fermé","Mer":"12h-13h30 & 19h30-21h30","Jeu":"12h-13h30 & 19h30-21h30","Ven":"12h-13h30 & 19h30-21h30","Sam":"12h-13h30 & 19h30-21h30","Dim":"12h-13h30 & 19h30-21h30"}' WHERE name = 'Flocons de Sel';
UPDATE restaurants SET opening_hours = '{"Lun":"12h-13h30 & 19h30-21h","Mar":"fermé","Mer":"fermé","Jeu":"12h-13h30 & 19h30-21h","Ven":"12h-13h30 & 19h30-21h","Sam":"12h-13h30 & 19h30-21h","Dim":"12h-13h30 & 19h30-21h"}' WHERE name = 'Auberge du Vieux Puits';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"fermé","Mer":"12h-14h & 19h30-21h30","Jeu":"12h-14h & 19h30-21h30","Ven":"12h-14h & 19h30-21h30","Sam":"12h-14h & 19h30-21h30","Dim":"12h-14h & 19h30-21h30"}' WHERE name = 'Maison Lameloise';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"fermé","Mer":"12h-13h30 & 19h-21h","Jeu":"12h-13h30 & 19h-21h","Ven":"12h-13h30 & 19h-21h","Sam":"12h-13h30 & 19h-21h","Dim":"12h-13h30 & 19h-21h"}' WHERE name = 'Auberge de l''Ill';

-- ── Restaurants français — 2 étoiles ──────────────────────────────────────
UPDATE restaurants SET opening_hours = '{"Lun":"12h-14h & 19h-22h","Mar":"12h-14h & 19h-22h","Mer":"12h-14h & 19h-22h","Jeu":"12h-14h & 19h-22h","Ven":"12h-14h & 19h-22h","Sam":"fermé","Dim":"fermé"}' WHERE name = 'Taillevent';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"12h-14h & 19h30-22h","Mer":"12h-14h & 19h30-22h","Jeu":"12h-14h & 19h30-22h","Ven":"12h-14h & 19h30-22h","Sam":"12h-14h & 19h30-22h","Dim":"fermé"}' WHERE name = 'Le Meurice';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"12h-14h30 & 19h30-22h","Mer":"12h-14h30 & 19h30-22h","Jeu":"12h-14h30 & 19h30-22h","Ven":"12h-14h30 & 19h30-22h","Sam":"12h-14h30 & 19h30-22h","Dim":"fermé"}' WHERE name = 'Kei';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"fermé","Mer":"12h-13h30 & 19h30-21h","Jeu":"12h-13h30 & 19h30-21h","Ven":"12h-13h30 & 19h30-21h","Sam":"12h-13h30 & 19h30-21h","Dim":"12h-13h30 & 19h30-21h"}' WHERE name = 'La Grenouillère';
UPDATE restaurants SET opening_hours = '{"Lun":"12h-14h & 19h30-21h30","Mar":"12h-14h & 19h30-21h30","Mer":"12h-14h & 19h30-21h30","Jeu":"12h-14h & 19h30-21h30","Ven":"12h-14h & 19h30-21h30","Sam":"12h-14h & 19h30-21h30","Dim":"12h-14h & 19h30-21h30"}' WHERE name = 'Oustau de Baumanière';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"19h-22h","Mer":"19h-22h","Jeu":"19h-22h","Ven":"19h-22h","Sam":"19h-22h","Dim":"fermé"}' WHERE name = 'Le Pressoir d''Argent';

-- ── Restaurants français — 1 étoile ───────────────────────────────────────
UPDATE restaurants SET opening_hours = '{"Lun":"12h15-14h & 19h15-22h","Mar":"12h15-14h & 19h15-22h","Mer":"12h15-14h & 19h15-22h","Jeu":"12h15-14h & 19h15-22h","Ven":"12h15-14h & 19h15-22h","Sam":"fermé","Dim":"fermé"}' WHERE name = 'Septime';
UPDATE restaurants SET opening_hours = '{"Lun":"12h30-14h & 19h30-22h","Mar":"12h30-14h & 19h30-22h","Mer":"12h30-14h & 19h30-22h","Jeu":"12h30-14h & 19h30-22h","Ven":"12h30-14h & 19h30-22h","Sam":"fermé","Dim":"fermé"}' WHERE name = 'Le Grand Véfour';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"fermé","Mer":"12h-13h30 & 19h30-21h","Jeu":"12h-13h30 & 19h30-21h","Ven":"12h-13h30 & 19h30-21h","Sam":"12h-13h30 & 19h30-21h","Dim":"12h-13h30 & 19h30-21h"}' WHERE name = 'Maison Marcon';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"12h30-14h & 19h30-22h","Mer":"12h30-14h & 19h30-22h","Jeu":"12h30-14h & 19h30-22h","Ven":"12h30-14h & 19h30-22h","Sam":"12h30-14h & 19h30-22h","Dim":"fermé"}' WHERE name = 'L''Envol';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"12h-14h & 19h30-21h30","Mer":"12h-14h & 19h30-21h30","Jeu":"12h-14h & 19h30-21h30","Ven":"12h-14h & 19h30-21h30","Sam":"12h-14h & 19h30-21h30","Dim":"fermé"}' WHERE name = 'La Table de Ventabren';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"12h-14h & 19h30-22h","Mer":"12h-14h & 19h30-22h","Jeu":"12h-14h & 19h30-22h","Ven":"12h-14h & 19h30-22h","Sam":"12h-14h & 19h30-22h","Dim":"fermé"}' WHERE name = 'Léon de Lyon';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"12h-14h & 19h-22h","Mer":"12h-14h & 19h-22h","Jeu":"12h-14h & 19h-22h","Ven":"12h-14h & 19h-22h","Sam":"12h-14h & 19h-22h","Dim":"fermé"}' WHERE name = 'Le Quinzième';
UPDATE restaurants SET opening_hours = '{"Lun":"12h-14h & 19h-22h","Mar":"12h-14h & 19h-22h","Mer":"12h-14h & 19h-22h","Jeu":"12h-14h & 19h-22h","Ven":"12h-14h & 19h-22h","Sam":"fermé","Dim":"fermé"}' WHERE name = 'La Scène';

-- ── Restaurants français — Bib Gourmand ───────────────────────────────────
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"12h-14h30 & 19h30-23h","Mer":"12h-14h30 & 19h30-23h","Jeu":"12h-14h30 & 19h30-23h","Ven":"12h-14h30 & 19h30-23h","Sam":"12h-14h30 & 19h30-23h","Dim":"fermé"}' WHERE name = 'Bistrot Paul Bert';
UPDATE restaurants SET opening_hours = '{"Lun":"12h-23h","Mar":"12h-23h","Mer":"12h-23h","Jeu":"12h-23h","Ven":"12h-23h","Sam":"12h-23h","Dim":"12h-23h"}' WHERE name = 'Le Comptoir du Relais';
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"12h-13h45 & 19h-21h45","Mer":"12h-13h45 & 19h-21h45","Jeu":"12h-13h45 & 19h-21h45","Ven":"12h-13h45 & 19h-21h45","Sam":"12h-13h45 & 19h-21h45","Dim":"fermé"}' WHERE name = 'L''Atelier du Peintre';
UPDATE restaurants SET opening_hours = '{"Lun":"12h-14h & 19h-22h","Mar":"12h-14h & 19h-22h","Mer":"12h-14h & 19h-22h","Jeu":"12h-14h & 19h-22h","Ven":"12h-14h & 19h-22h","Sam":"12h-14h & 19h-22h","Dim":"fermé"}' WHERE name = 'Café Moderne';
UPDATE restaurants SET opening_hours = '{"Lun":"12h-14h30 & 19h-22h30","Mar":"12h-14h30 & 19h-22h30","Mer":"12h-14h30 & 19h-22h30","Jeu":"12h-14h30 & 19h-22h30","Ven":"12h-14h30 & 19h-22h30","Sam":"fermé","Dim":"fermé"}' WHERE name = 'La Régalade Conservatoire';

-- ── Restaurants français — Green Star ─────────────────────────────────────
UPDATE restaurants SET opening_hours = '{"Lun":"fermé","Mar":"12h-13h30 & 19h30-21h30","Mer":"12h-13h30 & 19h30-21h30","Jeu":"12h-13h30 & 19h30-21h30","Ven":"12h-13h30 & 19h30-21h30","Sam":"12h-13h30 & 19h30-21h30","Dim":"fermé"}' WHERE name = 'La Marine';
UPDATE restaurants SET opening_hours = '{"Lun":"12h-14h & 19h30-21h30","Mar":"fermé","Mer":"fermé","Jeu":"12h-14h & 19h30-21h30","Ven":"12h-14h & 19h30-21h30","Sam":"12h-14h & 19h30-21h30","Dim":"12h-14h & 19h30-21h30"}' WHERE name = 'Le Jardin des Plumes';
