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
<<<<<<< HEAD
    `SELECT id,
            name,
            city,
            category,
            address
     FROM accommodations
     WHERE (name LIKE ? OR city LIKE ? OR address LIKE ?)
       AND (? = '' OR city = ?)
     LIMIT 50`,
    [like, like, like, city, city]
  )
  return rows
}

export async function getAccommodationById(id) {
  const [rows] = await pool.execute(
    `SELECT id,
=======
    `SELECT CONCAT('h-', id) AS id,
            'hotels' AS source,
>>>>>>> a991088 (phasna)
            name,
            city,
            category,
            address,
<<<<<<< HEAD
            created_at
     FROM accommodations
     WHERE id = ?`,
    [id]
=======
            country,
            stars,
            rating_stars,
            phone,
            description,
            facilities,
            price_from,
            image_url
     FROM hotels
     WHERE country = 'France'
       AND (name LIKE ? OR city LIKE ? OR address LIKE ?)
       AND (? = '' OR city = ?)
     ORDER BY name ASC
     LIMIT 80`,
    [like, like, like, city, city]
>>>>>>> a991088 (phasna)
  )
  return rows
}

export async function getAccommodationById(id) {
  if (typeof id !== 'string') return null

  const [sourcePrefix, rawId] = id.includes('-') ? id.split('-', 2) : ['h', id]
  const parsedId = Number(rawId)
  if (!Number.isFinite(parsedId)) return null

  if (sourcePrefix === 'a') {
    const [rows] = await pool.execute(
      `SELECT CONCAT('a-', id) AS id,
              'accommodations' AS source,
              name,
              city,
              COALESCE(category, 'Hébergement') AS category,
              address,
              NULL AS country,
              NULL AS stars,
              NULL AS rating_stars,
              NULL AS latitude,
              NULL AS longitude,
              NULL AS phone,
              NULL AS description,
              NULL AS facilities,
              NULL AS price_from,
              photo_url AS image_url,
              photo_url AS image_urls_raw
       FROM accommodations
       WHERE id = ?`,
      [parsedId]
    )
    if (!rows[0]) return null
    const { image_urls_raw, ...accommodation } = rows[0]
    return {
      ...accommodation,
      image_urls: parseImageUrls(image_urls_raw, accommodation.image_url),
      room_details: []
    }
  }

  const [rows] = await pool.execute(
    `SELECT CONCAT('h-', h.id) AS id,
            'hotels' AS source,
            h.name AS name,
            h.city AS city,
            CASE
              WHEN h.stars >= 4 THEN 'Hôtel de luxe'
              WHEN h.stars = 3 THEN 'Hôtel haut de gamme'
              ELSE 'Hôtel'
            END AS category,
            h.address AS address,
            h.country AS country,
            h.stars AS stars,
            h.rating_stars AS rating_stars,
            h.latitude AS latitude,
            h.longitude AS longitude,
            h.phone AS phone,
            h.description AS description,
            h.facilities AS facilities,
            h.price_from AS price_from,
            h.image_url AS image_url,
            GROUP_CONCAT(hr.photo_url ORDER BY hr.id SEPARATOR '|||') AS image_urls_raw
     FROM hotels h
     LEFT JOIN hotel_rooms hr ON hr.hotel_id = h.id
     WHERE h.id = ?
     GROUP BY h.id`,
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
     FROM hotel_rooms
     WHERE hotel_id = ?
     ORDER BY id ASC`,
    [parsedId]
  )

  return {
    ...accommodation,
    image_urls: parseImageUrls(image_urls_raw, accommodation.image_url),
    room_details: roomRows
  }
}
