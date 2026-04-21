import fs from "fs";

// ──────────────────────────────────────────────────────────────
// Data pools
// ──────────────────────────────────────────────────────────────

const CITIES = [
  { city: "Paris", country: "France", lat: 48.8566, lon: 2.3522 },
  { city: "Lyon", country: "France", lat: 45.7640, lon: 4.8357 },
  { city: "Bordeaux", country: "France", lat: 44.8378, lon: -0.5792 },
  { city: "Nice", country: "France", lat: 43.7102, lon: 7.2620 },
  { city: "Marseille", country: "France", lat: 43.2965, lon: 5.3698 },
  { city: "Strasbourg", country: "France", lat: 48.5734, lon: 7.7521 },
  { city: "London", country: "United Kingdom", lat: 51.5074, lon: -0.1278 },
  { city: "Edinburgh", country: "United Kingdom", lat: 55.9533, lon: -3.1883 },
  { city: "Bath", country: "United Kingdom", lat: 51.3811, lon: -2.3590 },
  { city: "Munich", country: "Germany", lat: 48.1351, lon: 11.5820 },
  { city: "Berlin", country: "Germany", lat: 52.5200, lon: 13.4050 },
  { city: "Hamburg", country: "Germany", lat: 53.5511, lon: 9.9937 },
  { city: "Baden-Baden", country: "Germany", lat: 48.7606, lon: 8.2401 },
  { city: "Amsterdam", country: "Netherlands", lat: 52.3676, lon: 4.9041 },
  { city: "Rome", country: "Italy", lat: 41.9028, lon: 12.4964 },
  { city: "Florence", country: "Italy", lat: 43.7696, lon: 11.2558 },
  { city: "Venice", country: "Italy", lat: 45.4408, lon: 12.3155 },
  { city: "Milan", country: "Italy", lat: 45.4642, lon: 9.1900 },
  { city: "Madrid", country: "Spain", lat: 40.4168, lon: -3.7038 },
  { city: "Barcelona", country: "Spain", lat: 41.3851, lon: 2.1734 },
  { city: "San Sebastián", country: "Spain", lat: 43.3183, lon: -1.9812 },
  { city: "Lisbon", country: "Portugal", lat: 38.7223, lon: -9.1393 },
  { city: "Porto", country: "Portugal", lat: 41.1579, lon: -8.6291 },
  { city: "Zurich", country: "Switzerland", lat: 47.3769, lon: 8.5417 },
  { city: "Geneva", country: "Switzerland", lat: 46.2044, lon: 6.1432 },
  { city: "Vienna", country: "Austria", lat: 48.2082, lon: 16.3738 },
  { city: "Salzburg", country: "Austria", lat: 47.8095, lon: 13.0550 },
  { city: "Copenhagen", country: "Denmark", lat: 55.6761, lon: 12.5683 },
  { city: "Stockholm", country: "Sweden", lat: 59.3293, lon: 18.0686 },
  { city: "Oslo", country: "Norway", lat: 59.9139, lon: 10.7522 },
  { city: "Helsinki", country: "Finland", lat: 60.1699, lon: 24.9384 },
  { city: "Prague", country: "Czech Republic", lat: 50.0755, lon: 14.4378 },
  { city: "Budapest", country: "Hungary", lat: 47.4979, lon: 19.0402 },
  { city: "Dubai", country: "United Arab Emirates", lat: 25.2048, lon: 55.2708 },
  { city: "Brussels", country: "Belgium", lat: 50.8503, lon: 4.3517 },
];

const PREFIXES = [
  "Grand Hôtel", "Hôtel", "Maison", "Le Château", "La Villa", "Domaine",
  "Palais", "Auberge", "Résidence", "The", "Hotel", "Das", "Il",
];

const SUFFIXES = [
  "de la Paix", "Royal", "des Arts", "du Commerce", "de l'Opéra",
  "Imperial", "Palace", "Prestige", "Baroque", "Heritage", "Lumière",
  "Noir", "Blanc", "Classique", "Moderne", "Élégance", "Tradition",
  "Bellevue", "Panorama", "Terrasse", "Jardin", "Lacustre",
  "Alpin", "Maritime", "Côté Cour", "Côté Jardin", "Central",
];

const STREET_TYPES = ["rue", "avenue", "boulevard", "place", "allée", "chemin", "impasse"];
const STREET_NAMES = [
  "de la Liberté", "Victor Hugo", "des Fleurs", "du Marché", "Royale",
  "des Artisans", "de la République", "du Général de Gaulle", "Saint-Michel",
  "de Rivoli", "des Capucines", "Montaigne", "du Faubourg", "de la Paix",
  "de l'Église", "du Vieux-Port", "des Tanneurs", "de la Cathédrale",
];

const HOTEL_DESCRIPTIONS = [
  "Niché au cœur de la ville, cet établissement élégant allie tradition et modernité dans un cadre raffiné. Chaque détail a été pensé pour offrir une expérience de séjour mémorable, du mobilier soigneusement sélectionné aux services personnalisés.",
  "Installé dans un bâtiment haussmannien entièrement rénové, cet hôtel de caractère vous accueille dans un environnement chaleureux et sophistiqué. Sa situation idéale en fait le point de départ parfait pour explorer les richesses culturelles de la région.",
  "Au cœur d'un domaine verdoyant, cette demeure historique transformée en hôtel de prestige vous propose une escapade hors du temps. Les chambres spacieuses, décorées avec goût, offrent une vue imprenable sur les jardins à la française.",
  "Perché sur les hauteurs de la ville, cet hôtel boutique offre une vue panoramique exceptionnelle. Son restaurant gastronomique, animé par un chef étoilé, et son spa luxueux en font une destination de choix pour les amateurs de fine art de vivre.",
  "Dans un quartier historique prisé, cette maison d'hôtes d'exception cultive l'art de la discrétion et de l'exclusivité. Avec seulement quinze suites, chaque séjour bénéficie d'une attention toute particulière et d'un service sur mesure irréprochable.",
  "Symbole d'élégance depuis sa fondation, cet hôtel iconique perpétue une tradition d'hospitalité incomparable. Ses façades Belle Époque abritent des espaces de vie luxueux où se conjuguent matières nobles, objets d'art et technologies de pointe.",
  "Au bord des eaux, cette adresse de prestige rayonne par son architecture audacieuse et sa décoration intérieure signée par de grands noms du design contemporain. Les chambres ouvertes sur le paysage aquatique créent une communion unique avec la nature.",
  "Ancienne demeure aristocratique reconvertie en hôtel de charme, cette adresse cultive un esprit de maison de famille tout en offrant des prestations cinq étoiles. Bibliothèque garnie, salons feutrés et jardins secrets composent ce décor d'exception.",
  "Établissement phare de la ville depuis plus d'un siècle, cet hôtel conjugue patrimoine architectural remarquable et confort contemporain. Son histoire, jalonnée d'illustres visiteurs, imprègne chaque recoin de ce lieu chargé d'âme et de prestige.",
  "Véritable havre de paix en plein centre-ville, cet hôtel design propose une expérience sensorielle unique. Matériaux durables, luminosité travaillée et végétalisation intérieure créent une atmosphère zen et revigorante, renforcée par un spa holistique primé.",
];

const ROOM_TYPE_POOLS = [
  {
    type: "Chambre Classique",
    descriptions: [
      "Chambre confortable de 22 m², décorée avec soin, dotée d'un lit double ou twin, d'une salle de bain privative avec douche, de la climatisation et d'une connexion Wi-Fi haut débit.",
      "Chambre intime de 20 m² aux tons neutres et apaisants, équipée d'un bureau de travail, d'une télévision écran plat et d'un minibar. Idéale pour un séjour d'affaires ou de loisirs.",
    ],
    price_range: [120, 200],
    capacity: 2,
    amenities: "Wi-Fi,Climatisation,TV,Minibar,Coffre-fort",
  },
  {
    type: "Chambre Supérieure",
    descriptions: [
      "Chambre spacieuse de 30 m² avec vue sur la cour intérieure ou les toits de la ville. Literie premium, salle de bain avec baignoire et douche séparées, peignoirs et produits de toilette de luxe.",
      "Espace de 28 m² rehaussé de touches décoratives élégantes : parquet, moulures, mobilier chiné. Coin salon séparé, nespresso, et accès au club lounge de l'hôtel inclus.",
    ],
    price_range: [200, 320],
    capacity: 2,
    amenities: "Wi-Fi,Climatisation,TV,Minibar,Coffre-fort,Baignoire,Peignoirs",
  },
  {
    type: "Chambre Deluxe",
    descriptions: [
      "Chambre premium de 38 m² bénéficiant d'une vue dégagée. Literie cinq étoiles, salle de bain en marbre avec douche à l'italienne et baignoire îlot, plateau de courtoisie garni.",
      "Chambre de 35 m² entièrement rénovée, décorée par un designer reconnu. Fenêtres panoramiques, lit king-size, walk-in closet et salle de bain dotée d'une douche chromothérapie.",
    ],
    price_range: [320, 500],
    capacity: 2,
    amenities: "Wi-Fi,Climatisation,TV,Minibar,Coffre-fort,Baignoire,Peignoirs,Service en chambre,Nespresso",
  },
  {
    type: "Junior Suite",
    descriptions: [
      "Suite de 55 m² composée d'un salon lumineux et d'une chambre séparée. Terrasse privative avec mobilier de jardin, salle de bain en marbre, hammam et produits de soin exclusifs.",
      "50 m² de raffinement absolu : dressing privatif, salon avec canapé convertible, salle à manger compacte et salle de bain double vasque avec vue plongeante sur la ville.",
    ],
    price_range: [500, 800],
    capacity: 3,
    amenities: "Wi-Fi,Climatisation,TV,Minibar,Coffre-fort,Baignoire,Peignoirs,Service en chambre,Nespresso,Terrasse,Salon privé",
  },
  {
    type: "Suite Prestige",
    descriptions: [
      "Suite de 90 m² au dernier étage, offrant une vue à 180° sur les monuments et les toits. Salon de réception, salle à manger privée, chambre aux volumes majestueux et salle de bain spa avec jacuzzi.",
      "Une suite de 85 m² pensée comme un appartement de luxe : deux salles de bain, une cuisine équipée, un salon avec système home cinéma et une terrasse aménagée avec bain à remous.",
    ],
    price_range: [800, 1500],
    capacity: 4,
    amenities: "Wi-Fi,Climatisation,TV,Minibar,Coffre-fort,Baignoire,Peignoirs,Service en chambre,Nespresso,Terrasse,Salon privé,Jacuzzi,Conciergerie dédiée",
  },
  {
    type: "Suite Royale",
    descriptions: [
      "L'apogée du luxe : 140 m² déployés sur un étage, avec grand salon de réception, bureau directorial, chambre principale et seconde chambre d'appoint, deux salles de bain en onyx et terrasse panoramique.",
      "Suite signature de l'établissement, 120 m² habillés de matériaux nobles — marbre de Carrare, soieries et bois précieux. Service de majordome 24h/24, transfert en limousine et accès au spa privatif.",
    ],
    price_range: [1500, 4000],
    capacity: 4,
    amenities: "Wi-Fi,Climatisation,TV,Minibar,Coffre-fort,Baignoire,Peignoirs,Service en chambre,Nespresso,Terrasse,Salon privé,Jacuzzi,Conciergerie dédiée,Majordome,Spa privatif,Transfert limousine",
  },
];

const FACILITIES = [
  "Spa & Bien-être,Piscine intérieure,Restaurant gastronomique,Bar,Salle de fitness,Room service 24h/24,Conciergerie,Parking",
  "Restaurant,Bar lounge,Terrasse panoramique,Salle de conférences,Service de blanchisserie,Navette aéroport",
  "Piscine extérieure,Spa,Restaurant étoilé,Cave à vins,Jardin privé,Yoga,Parking voiturier",
  "Bar à cocktails,Bistrot,Salle de sport,Sauna,Bain turc,Conciergerie,Wi-Fi gratuit,Parking",
  "Petit-déjeuner gastronomique,Restaurant,Bar,Terrasse,Jardin,Salle de réunion,Service en chambre",
];

// ──────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function jitter(val, delta = 0.05) {
  return +(val + (Math.random() - 0.5) * delta).toFixed(6);
}

function escapeCsv(str) {
  if (str == null) return "";
  const s = String(str);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function generateHotelName(city) {
  if (Math.random() < 0.5) {
    return `${pick(PREFIXES)} ${pick(SUFFIXES)}`;
  }
  return `${pick(PREFIXES)} ${city}`;
}

function generateAddress(num) {
  return `${rand(1, 200)} ${pick(STREET_TYPES)} ${pick(STREET_NAMES)}`;
}

// Assign 3–5 distinct room type pools per hotel (always ordered cheapest→priciest)
function pickRoomTypes() {
  const count = rand(3, 5);
  const shuffled = [...ROOM_TYPE_POOLS].sort(() => Math.random() - 0.5);
  // Always include Classique and Prestige for variety, fill rest randomly
  const chosen = [ROOM_TYPE_POOLS[0], ...shuffled.filter(r => r !== ROOM_TYPE_POOLS[0]).slice(0, count - 1)];
  return chosen.sort((a, b) => a.price_range[0] - b.price_range[0]);
}

// ──────────────────────────────────────────────────────────────
// Generation
// ──────────────────────────────────────────────────────────────

const hotels = [];
const rooms = [];
let roomId = 1;

// Shuffle cities and repeat to fill 100 slots
const cityPool = [];
while (cityPool.length < 100) cityPool.push(...CITIES);
const selectedCities = cityPool.slice(0, 100).sort(() => Math.random() - 0.5);

for (let i = 0; i < 100; i++) {
  const id = i + 1;
  const { city, country, lat, lon } = selectedCities[i];
  const name = generateHotelName(city);
  const address = generateAddress(i);
  const stars = rand(3, 5);
  const description = pick(HOTEL_DESCRIPTIONS);
  const phone = `+${rand(30, 49)}${rand(100000000, 999999999)}`;
  const facilities = pick(FACILITIES);
  const price_from = rand(120, 400);

  hotels.push({ id, name, address, city, country, latitude: jitter(lat), longitude: jitter(lon), stars, phone, description, facilities, price_from });

  const roomTypes = pickRoomTypes();
  for (const rt of roomTypes) {
    const price = rand(rt.price_range[0], rt.price_range[1]);
    const desc = pick(rt.descriptions);
    rooms.push({
      id: roomId++,
      hotel_id: id,
      room_type: rt.type,
      description: desc,
      price_per_night: price,
      capacity: rt.capacity,
      amenities: rt.amenities,
    });
  }
}

// ──────────────────────────────────────────────────────────────
// Write hotels.csv
// ──────────────────────────────────────────────────────────────

const hotelHeaders = ["id", "name", "address", "city", "country", "latitude", "longitude", "stars", "phone", "description", "facilities", "price_from"];
const hotelCsv = [
  hotelHeaders.join(","),
  ...hotels.map(h => hotelHeaders.map(k => escapeCsv(h[k])).join(","))
].join("\n");

fs.writeFileSync("hotels.csv", hotelCsv, "utf8");

// ──────────────────────────────────────────────────────────────
// Write hotel_rooms.csv
// ──────────────────────────────────────────────────────────────

const roomHeaders = ["id", "hotel_id", "room_type", "description", "price_per_night", "capacity", "amenities"];
const roomCsv = [
  roomHeaders.join(","),
  ...rooms.map(r => roomHeaders.map(k => escapeCsv(r[k])).join(","))
].join("\n");

fs.writeFileSync("hotel_rooms.csv", roomCsv, "utf8");

// ──────────────────────────────────────────────────────────────
// Summary
// ──────────────────────────────────────────────────────────────

const cityCounts = {};
hotels.forEach(h => { cityCounts[h.city] = (cityCounts[h.city] || 0) + 1; });

console.log(`✅ hotels.csv       → ${hotels.length} hôtels`);
console.log(`✅ hotel_rooms.csv  → ${rooms.length} types de chambre`);
console.log(`\nRépartition par ville :`);
Object.entries(cityCounts).sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([city, count]) => {
  console.log(`  ${city.padEnd(20)} ${count} hôtel(s)`);
});
