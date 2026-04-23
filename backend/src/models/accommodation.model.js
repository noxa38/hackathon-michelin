import pool from '../config/db.js'

function parseImageUrls(rawValue, fallbackImage) {
  if (typeof rawValue === 'string' && rawValue.trim()) {
    return rawValue
      .split('|||')
      .map((value) => value.trim())
      .filter(Boolean)
  }
  return fallbackImage ? [fallbackImage] : []
}

export async function searchAccommodations(query, city) {
  const like = `%${query}%`
  const [rows] = await pool.execute(
    `SELECT CONCAT('a-', a.id) AS id,
            'accommodation' AS source,
            a.name AS name,
            a.city AS city,
            CASE
              WHEN a.stars >= 4 THEN 'Hôtel de luxe'
              WHEN a.stars = 3 THEN 'Hôtel haut de gamme'
              ELSE 'Hôtel'
            END AS category,
            a.address AS address,
            a.country AS country,
            a.stars AS stars,
            a.stars AS rating_stars,
            a.latitude AS latitude,
            a.longitude AS longitude,
            a.phone AS phone,
            a.description AS description,
            a.facilities AS facilities,
            a.price_from AS price_from,
            a.photo_url AS image_url
     FROM accommodation a
     WHERE (a.name LIKE ? OR a.city LIKE ? OR a.address LIKE ?)
       AND (? = '' OR a.city = ?)
     ORDER BY name ASC
     LIMIT 120`,
    [like, like, like, city, city]
  )
  return rows
}

export async function getAccommodationById(id) {
  if (typeof id !== 'string') return null

  const [, rawId] = id.includes('-') ? id.split('-', 2) : ['a', id]
  const parsedId = Number(rawId)
  if (!Number.isFinite(parsedId)) return null

  const [rows] = await pool.execute(
    `SELECT CONCAT('a-', a.id) AS id,
            'accommodation' AS source,
            a.name AS name,
            a.city AS city,
            CASE
              WHEN a.stars >= 4 THEN 'Hôtel de luxe'
              WHEN a.stars = 3 THEN 'Hôtel haut de gamme'
              ELSE 'Hôtel'
            END AS category,
            a.address AS address,
            a.country AS country,
            a.stars AS stars,
            a.stars AS rating_stars,
            a.latitude AS latitude,
            a.longitude AS longitude,
            a.phone AS phone,
            a.description AS description,
            a.facilities AS facilities,
            a.price_from AS price_from,
            a.photo_url AS image_url,
            GROUP_CONCAT(ar.photo_url ORDER BY ar.id SEPARATOR '|||') AS image_urls_raw
     FROM accommodation a
     LEFT JOIN accommodation_rooms ar ON ar.accommodation_id = a.id
     WHERE a.id = ?
     GROUP BY a.id`,
    [parsedId]
  )
  if (!rows[0]) return null
  const { image_urls_raw, ...accommodation } = rows[0]
  const [roomRows] = await pool.execute(
    `SELECT room_type,
            description,
            price_per_night,
            capacity,
            amenities,
            photo_url
     FROM accommodation_rooms
     WHERE accommodation_id = ?
     ORDER BY id ASC`,
    [parsedId]
  )

  return {
    ...accommodation,
    image_urls: parseImageUrls(image_urls_raw, accommodation.image_url),
    room_details: roomRows
  }
}
