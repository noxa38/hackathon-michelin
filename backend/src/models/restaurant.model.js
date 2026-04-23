import pool from "../config/db.js";

async function attachPhotos(restaurants) {
  if (!restaurants.length) return restaurants;
  const ids = restaurants.map((r) => r.id);
  const placeholders = ids.map(() => "?").join(",");
  const [photos] = await pool.execute(
    `SELECT restaurant_id, url, caption, position
     FROM restaurant_photos
     WHERE restaurant_id IN (${placeholders})
     ORDER BY restaurant_id, position ASC`,
    ids,
  );
  const photoMap = {};
  for (const p of photos) {
    if (!photoMap[p.restaurant_id]) photoMap[p.restaurant_id] = [];
    photoMap[p.restaurant_id].push({
      url: p.url,
      caption: p.caption,
      position: p.position,
    });
  }
  return restaurants.map((r) => ({ ...r, photos: photoMap[r.id] ?? [] }));
}

export async function getAllRestaurants() {
  const [rows] = await pool.execute(
    `SELECT id, name, address, location, city, price, cuisine, longitude, latitude,
            phone_number, michelin_url, website_url, award, stars, green_star,
            facilities, description, opening_hours
     FROM restaurants
     ORDER BY stars DESC, name ASC`,
  );
  return attachPhotos(rows);
}

export async function searchRestaurants(query, city) {
  const like = `%${query}%`;
  const [rows] = await pool.execute(
    `SELECT id, name, address, location, city, price, cuisine,
            michelin_url, award, stars, green_star, opening_hours
     FROM restaurants
     WHERE (name LIKE ? OR city LIKE ?)
       AND (? = '' OR city = ?)
     LIMIT 20`,
    [like, like, city, city],
  );
  return attachPhotos(rows);
}

export async function getRestaurantById(id) {
  const [rows] = await pool.execute("SELECT * FROM restaurants WHERE id = ?", [
    id,
  ]);
  if (!rows[0]) return null;
  const [withPhotos] = await attachPhotos([rows[0]]);
  return withPhotos;
}

export async function getNearbyRestaurants(
  latitude,
  longitude,
  radiusKm = 20,
  limit = 12,
) {
  const safeLatitude = Number(latitude);
  const safeLongitude = Number(longitude);
  const safeRadiusKm = Number.isFinite(Number(radiusKm))
    ? Math.min(Math.max(Number(radiusKm), 1), 200)
    : 20;
  const safeLimit = Number.isFinite(Number(limit))
    ? Math.min(Math.max(Math.floor(Number(limit)), 1), 100)
    : 12;

  if (!Number.isFinite(safeLatitude) || !Number.isFinite(safeLongitude)) {
    return [];
  }

  const [rows] = await pool.execute(
    `SELECT id,
            name,
            city,
            latitude,
            longitude,
            (6371 * ACOS(
              COS(RADIANS(?)) * COS(RADIANS(latitude)) *
              COS(RADIANS(longitude) - RADIANS(?)) +
              SIN(RADIANS(?)) * SIN(RADIANS(latitude))
            )) AS distance_km
     FROM restaurants
     WHERE latitude IS NOT NULL
       AND longitude IS NOT NULL
     HAVING distance_km <= ${safeRadiusKm}
     ORDER BY distance_km ASC
     LIMIT ${safeLimit}`,
    [safeLatitude, safeLongitude, safeLatitude],
  );
  return rows;
}

export async function createRestaurant(payload) {
  const [result] = await pool.execute(
    `INSERT INTO restaurants
      (name, address, location, city, country, price, cuisine, longitude, latitude,
       phone_number, michelin_url, website_url, award, stars, green_star,
       facilities, description, opening_hours)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      payload.name,
      payload.address ?? null,
      payload.location ?? null,
      payload.city ?? null,
      payload.country ?? null,
      payload.price ?? null,
      payload.cuisine ?? null,
      payload.longitude ?? null,
      payload.latitude ?? null,
      payload.phone_number ?? null,
      payload.michelin_url ?? null,
      payload.website_url ?? null,
      payload.award ?? null,
      payload.stars ?? 0,
      payload.green_star ?? 0,
      payload.facilities ?? null,
      payload.description ?? null,
      payload.opening_hours ?? null,
    ],
  );
  return Number(result.insertId);
}

export async function updateRestaurant(id, payload) {
  const entries = Object.entries(payload).filter(([, value]) => value !== undefined);
  if (!entries.length) return;

  const fields = entries.map(([key]) => `${key} = ?`).join(', ');
  const values = entries.map(([, value]) => value);

  await pool.execute(
    `UPDATE restaurants SET ${fields} WHERE id = ?`,
    [...values, id],
  );
}

export async function deleteRestaurant(id) {
  await pool.execute('DELETE FROM restaurants WHERE id = ?', [id]);
}
