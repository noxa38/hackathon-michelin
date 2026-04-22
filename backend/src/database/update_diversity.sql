-- update_diversity.sql — Mise à jour des distinctions pour plus de diversité
-- À exécuter UNE SEULE FOIS sur la BDD existante

SET NAMES utf8mb4;

-- ── 2 Étoiles ──────────────────────────────────────────────────────────────
UPDATE restaurants SET award='2 Stars', stars=2, green_star=0 WHERE name='Tohru in der Schreiberei';
UPDATE restaurants SET award='2 Stars', stars=2, green_star=0 WHERE name='schanz. restaurant.';
UPDATE restaurants SET award='2 Stars', stars=2, green_star=0 WHERE name='Restaurant Haerlin';
UPDATE restaurants SET award='2 Stars', stars=2, green_star=0 WHERE name='The Table Kevin Fehling';
UPDATE restaurants SET award='2 Stars', stars=2, green_star=0 WHERE name='Restaurant Bareiss';
UPDATE restaurants SET award='2 Stars', stars=2, green_star=0 WHERE name='Jordnær';

-- ── 1 Étoile ───────────────────────────────────────────────────────────────
UPDATE restaurants SET award='1 Star',  stars=1, green_star=0 WHERE name='Waldhotel Sonnora';
UPDATE restaurants SET award='1 Star',  stars=1, green_star=0 WHERE name='Maaemo';
UPDATE restaurants SET award='1 Star',  stars=1, green_star=0 WHERE name='Hiša Franko';

-- ── Bib Gourmand (pas d''étoile, pas d''étoile verte) ───────────────────────
UPDATE restaurants SET award='Bib Gourmand', stars=0, green_star=0 WHERE name='Rutz';
UPDATE restaurants SET award='Bib Gourmand', stars=0, green_star=0 WHERE name='Grande Étoile';
UPDATE restaurants SET award='Bib Gourmand', stars=0, green_star=0 WHERE name='Chiemgauhof';

-- ── Étoile Verte (pas d''étoile classique, pas de Bib) ──────────────────────
UPDATE restaurants SET award='Green Star',  stars=0, green_star=1 WHERE name='RE-NAA';
UPDATE restaurants SET award='Green Star',  stars=0, green_star=1 WHERE name='Goldener Engel';
