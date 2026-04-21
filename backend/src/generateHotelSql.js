import fs from "fs";
import { createRequire } from "module";

// Manual CSV parser (handles quoted fields with commas inside)
function parseCsv(content) {
  const lines = content.trim().split("\n");
  const headers = parseLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseLine(line);
    const obj = {};
    headers.forEach((h, i) => (obj[h.trim()] = (values[i] ?? "").trim()));
    return obj;
  });
}

function parseLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += c;
    }
  }
  result.push(current);
  return result;
}

function sqlStr(val) {
  if (val === null || val === undefined || val === "") return "NULL";
  return "'" + String(val).replace(/'/g, "''") + "'";
}

// ──────────────────────────────────────────────────────────────
// Read CSVs
// ──────────────────────────────────────────────────────────────
const hotels = parseCsv(fs.readFileSync("hotels.csv", "utf8"));
const rooms = parseCsv(fs.readFileSync("hotel_rooms.csv", "utf8"));

// ──────────────────────────────────────────────────────────────
// schema_hotels.sql
// ──────────────────────────────────────────────────────────────
const schema = `-- schema_hotels.sql

DROP TABLE IF EXISTS hotel_rooms;
DROP TABLE IF EXISTS hotels;

CREATE TABLE hotels (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(255)   NOT NULL,
  address      VARCHAR(500),
  city         VARCHAR(100),
  country      VARCHAR(100),
  latitude     DECIMAL(10, 6),
  longitude    DECIMAL(10, 6),
  stars        TINYINT        DEFAULT 3,
  phone        VARCHAR(50),
  description  TEXT,
  facilities   TEXT,
  price_from   INT,
  created_at   TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE hotel_rooms (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  hotel_id         INT            NOT NULL,
  room_type        VARCHAR(100)   NOT NULL,
  description      TEXT,
  price_per_night  INT,
  capacity         TINYINT,
  amenities        TEXT,
  CONSTRAINT fk_hotel FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

fs.writeFileSync("database/schema_hotels.sql", schema, "utf8");
console.log("✅ schema_hotels.sql written");

// ──────────────────────────────────────────────────────────────
// seed_hotels.sql
// ──────────────────────────────────────────────────────────────
const insertHotels = hotels.map((h) =>
  `(${[
    h.id,
    sqlStr(h.name),
    sqlStr(h.address),
    sqlStr(h.city),
    sqlStr(h.country),
    h.latitude || "NULL",
    h.longitude || "NULL",
    h.stars || 3,
    sqlStr(h.phone),
    sqlStr(h.description),
    sqlStr(h.facilities),
    h.price_from || "NULL",
  ].join(", ")})`
);

const insertRooms = rooms.map((r) =>
  `(${[
    r.id,
    r.hotel_id,
    sqlStr(r.room_type),
    sqlStr(r.description),
    r.price_per_night || "NULL",
    r.capacity || "NULL",
    sqlStr(r.amenities),
  ].join(", ")})`
);

// Split into chunks of 20 to keep SQL readable
function chunks(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

let seed = "-- seed_hotels.sql\n\nSET NAMES utf8mb4;\n\n";

seed += "-- Hotels\n";
for (const chunk of chunks(insertHotels, 20)) {
  seed += `INSERT INTO hotels (id, name, address, city, country, latitude, longitude, stars, phone, description, facilities, price_from) VALUES\n`;
  seed += chunk.join(",\n") + ";\n\n";
}

seed += "-- Hotel rooms\n";
for (const chunk of chunks(insertRooms, 25)) {
  seed += `INSERT INTO hotel_rooms (id, hotel_id, room_type, description, price_per_night, capacity, amenities) VALUES\n`;
  seed += chunk.join(",\n") + ";\n\n";
}

fs.writeFileSync("database/seed_hotels.sql", seed, "utf8");
console.log(`✅ seed_hotels.sql written — ${hotels.length} hotels, ${rooms.length} rooms`);
