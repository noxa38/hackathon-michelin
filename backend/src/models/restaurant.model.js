import pool from '../config/db.js'

async function attachPhotos(restaurants) {
  if (!restaurants.length) return restaurants
  const ids = restaurants.map(r => r.id)
  const placeholders = ids.map(() => '?').join(',')
  const [photos] = await pool.execute(
    `SELECT restaurant_id, url, caption, position
     FROM restaurant_photos
     WHERE restaurant_id IN (${placeholders})
     ORDER BY restaurant_id, position ASC`,
    ids
  )
  const photoMap = {}
  for (const p of photos) {
    if (!photoMap[p.restaurant_id]) photoMap[p.restaurant_id] = []
    photoMap[p.restaurant_id].push({ url: p.url, caption: p.caption, position: p.position })
  }
  return restaurants.map(r => ({ ...r, photos: photoMap[r.id] ?? [] }))
}

export async function getAllRestaurants() {
  const [rows] = await pool.execute(
    `SELECT id, name, address, location, city, price, cuisine, longitude, latitude,
            phone_number, michelin_url, website_url, award, stars, green_star,
            facilities, description, opening_hours
     FROM restaurants
     ORDER BY stars DESC, name ASC`
  )
  return attachPhotos(rows)
}

export async function searchRestaurants(query, city) {
  const like = `%${query}%`
  const [rows] = await pool.execute(
    `SELECT id, name, address, location, city, price, cuisine,
            michelin_url, award, stars, green_star, opening_hours
     FROM restaurants
     WHERE (name LIKE ? OR city LIKE ?)
       AND (? = '' OR city = ?)
     LIMIT 20`,
    [like, like, city, city]
  )
  return attachPhotos(rows)
}

export async function getRestaurantById(id) {
  const [rows] = await pool.execute(
    'SELECT * FROM restaurants WHERE id = ?',
    [id]
  )
  if (!rows[0]) return null
  const [withPhotos] = await attachPhotos([rows[0]])
  return withPhotos
}

export async function getNearbyRestaurants(latitude, longitude, radiusKm = 20, limit = 12) {
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
     HAVING distance_km <= ?
     ORDER BY distance_km ASC
     LIMIT ?`,
    [latitude, longitude, latitude, radiusKm, limit]
  )
  return rows
}
