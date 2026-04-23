import pool from "../config/db.js";

async function attachPhotos(restaurants) {
  if (!restaurants.length) return restaurants;
  const ids = restaurants.map((r) => r.id);
  const placeholders = ids.map(() => "?").join(",");
  const [photos] = await pool.execute(
    `SELECT restaurant_id, url, position
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
      position: p.position,
    });
  }
  return restaurants.map((r) => ({ ...r, photos: photoMap[r.id] ?? [] }));
}

export async function getAllRestaurants() {
  const [rows] = await pool.execute(
    `SELECT id, name, address, city, country, price, cuisine,
            NULL AS longitude, NULL AS latitude,
            phone, NULL AS michelin_url, website_url, award,
            CASE
              WHEN award LIKE '3%' THEN 3
              WHEN award LIKE '2%' THEN 2
              WHEN award LIKE '1%' THEN 1
              ELSE 0
            END AS stars,
            green_star,
            facilities, description, opening_hours, menu
     FROM restaurants
     ORDER BY name ASC`,
  );
  return attachPhotos(rows);
}

export async function searchRestaurants(query, city) {
  const like = `%${query}%`;
  const [rows] = await pool.execute(
    `SELECT id, name, address, city, country, price, cuisine,
            phone, website_url, award,
            CASE
              WHEN award LIKE '3%' THEN 3
              WHEN award LIKE '2%' THEN 2
              WHEN award LIKE '1%' THEN 1
              ELSE 0
            END AS stars,
            green_star, opening_hours, menu
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
  void latitude;
  void longitude;
  void radiusKm;
  void limit;
  return [];
}

export async function createRestaurant(payload) {
  const restaurantPayload = {
    name: payload.name,
    address: payload.address,
    city: payload.city,
    country: payload.country,
    price: payload.price,
    cuisine: payload.cuisine,
    phone: payload.phone,
    website_url: payload.website_url,
    award: payload.award,
    menu: payload.menu,
    green_star: payload.green_star,
    facilities: payload.facilities,
    description: payload.description,
    opening_hours: payload.opening_hours,
  };

  const [result] = await pool.execute(
    `INSERT INTO restaurants
      (name, address, city, country, price, cuisine,
       phone, website_url, award, menu, green_star,
       facilities, description, opening_hours)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      restaurantPayload.name,
      restaurantPayload.address ?? null,
      restaurantPayload.city ?? null,
      restaurantPayload.country ?? null,
      restaurantPayload.price ?? null,
      restaurantPayload.cuisine ?? null,
      restaurantPayload.phone ?? null,
      restaurantPayload.website_url ?? null,
      restaurantPayload.award ?? null,
      restaurantPayload.menu ?? null,
      restaurantPayload.green_star ?? 0,
      restaurantPayload.facilities ?? null,
      restaurantPayload.description ?? null,
      restaurantPayload.opening_hours ?? null,
    ],
  );
  return Number(result.insertId);
}

export async function updateRestaurant(id, payload) {
  const allowedFields = new Set([
    'name',
    'address',
    'city',
    'country',
    'price',
    'cuisine',
    'phone',
    'website_url',
    'award',
    'menu',
    'green_star',
    'facilities',
    'description',
    'opening_hours',
  ]);

  const entries = Object.entries(payload).filter(
    ([key, value]) => value !== undefined && allowedFields.has(key),
  );

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
