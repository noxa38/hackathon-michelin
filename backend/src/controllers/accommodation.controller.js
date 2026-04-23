import db from "../config/db.js";

function toNullableNumber(value) {
  if (value === undefined || value === null || value === "") return null;
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
}

export async function getAccommodations(req, res) {
  try {
    const { q, city } = req.query;

    let query = `
      SELECT id, name, address, city, country, latitude, longitude, 
             stars, phone, description, facilities, price_from as price, photo_url
      FROM hotels
      WHERE 1=1
    `;
    const params = [];

    if (q && q.trim()) {
      query += ` AND (name LIKE ? OR description LIKE ?)`;
      params.push(`%${q.trim()}%`, `%${q.trim()}%`);
    }

    if (city && city.trim()) {
      query += ` AND city LIKE ?`;
      params.push(`%${city.trim()}%`);
    }

    query += ` ORDER BY name ASC`;

    const connection = await db.getConnection();
    const [accommodations] = await connection.query(query, params);
    connection.release();

    res.json(accommodations);
  } catch (error) {
    console.error("Error fetching accommodations:", error);
    res.status(500).json({ error: "Failed to fetch accommodations" });
  }
}

export async function getAccommodationById(req, res) {
  try {
    const { id } = req.params;

    const connection = await db.getConnection();

    // Get hotel
    const [hotels] = await connection.query(
      `SELECT id, name, address, city, country, latitude, longitude, 
              stars, phone, description, facilities, price_from as price, photo_url
       FROM hotels WHERE id = ?`,
      [id]
    );

    if (hotels.length === 0) {
      connection.release();
      return res.status(404).json({ error: "Hotel not found" });
    }

    const hotel = hotels[0];

    // Get rooms for this hotel
    const [rooms] = await connection.query(
      `SELECT id, hotel_id, room_type, description, price_per_night, capacity, amenities, photo_url
       FROM hotel_rooms WHERE hotel_id = ?`,
      [id]
    );

    connection.release();

    res.json({
      ...hotel,
      rooms: rooms || []
    });
  } catch (error) {
    console.error("Error fetching accommodation:", error);
    res.status(500).json({ error: "Failed to fetch accommodation" });
  }
}

export async function createAccommodationByAdmin(req, res) {
  try {
    const { name } = req.body;
    if (!name || !String(name).trim()) {
      return res.status(400).json({ error: "Le nom est requis" });
    }

    const payload = {
      name: String(name).trim(),
      address: req.body.address ?? null,
      city: req.body.city ?? null,
      country: req.body.country ?? null,
      latitude: toNullableNumber(req.body.latitude),
      longitude: toNullableNumber(req.body.longitude),
      stars: toNullableNumber(req.body.stars),
      phone: req.body.phone ?? null,
      description: req.body.description ?? null,
      facilities: req.body.facilities ?? null,
      price_from: toNullableNumber(req.body.price_from),
      photo_url: req.body.photo_url ?? null,
    };

    const connection = await db.getConnection();
    const [result] = await connection.query(
      `INSERT INTO hotels
        (name, address, city, country, latitude, longitude, stars, phone, description, facilities, price_from, photo_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        payload.name,
        payload.address,
        payload.city,
        payload.country,
        payload.latitude,
        payload.longitude,
        payload.stars,
        payload.phone,
        payload.description,
        payload.facilities,
        payload.price_from,
        payload.photo_url,
      ]
    );

    const [rows] = await connection.query(
      `SELECT id, name, address, city, country, latitude, longitude,
              stars, phone, description, facilities, price_from as price, photo_url
       FROM hotels WHERE id = ?`,
      [result.insertId]
    );

    connection.release();
    return res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error creating accommodation by admin:", error);
    return res.status(500).json({ error: "Failed to create accommodation" });
  }
}

export async function updateAccommodationByAdmin(req, res) {
  try {
    const accommodationId = Number(req.params.id);
    if (!Number.isFinite(accommodationId)) {
      return res.status(400).json({ error: "ID hébergement invalide" });
    }

    const fields = {
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      latitude: req.body.latitude === undefined ? undefined : toNullableNumber(req.body.latitude),
      longitude: req.body.longitude === undefined ? undefined : toNullableNumber(req.body.longitude),
      stars: req.body.stars === undefined ? undefined : toNullableNumber(req.body.stars),
      phone: req.body.phone,
      description: req.body.description,
      facilities: req.body.facilities,
      price_from: req.body.price_from === undefined ? undefined : toNullableNumber(req.body.price_from),
      photo_url: req.body.photo_url,
    };

    const updates = Object.entries(fields).filter(([, value]) => value !== undefined);
    if (!updates.length) {
      return res.status(400).json({ error: "Aucune donnée à mettre à jour" });
    }

    const connection = await db.getConnection();
    const [existingRows] = await connection.query("SELECT id FROM hotels WHERE id = ?", [accommodationId]);
    if (!Array.isArray(existingRows) || existingRows.length === 0) {
      connection.release();
      return res.status(404).json({ error: "Hébergement introuvable" });
    }

    const setClause = updates.map(([key]) => `${key} = ?`).join(", ");
    const values = updates.map(([, value]) => value);

    await connection.query(
      `UPDATE hotels SET ${setClause} WHERE id = ?`,
      [...values, accommodationId]
    );

    const [rows] = await connection.query(
      `SELECT id, name, address, city, country, latitude, longitude,
              stars, phone, description, facilities, price_from as price, photo_url
       FROM hotels WHERE id = ?`,
      [accommodationId]
    );

    connection.release();
    return res.json(rows[0]);
  } catch (error) {
    console.error("Error updating accommodation by admin:", error);
    return res.status(500).json({ error: "Failed to update accommodation" });
  }
}

export async function deleteAccommodationByAdmin(req, res) {
  try {
    const accommodationId = Number(req.params.id);
    if (!Number.isFinite(accommodationId)) {
      return res.status(400).json({ error: "ID hébergement invalide" });
    }

    const connection = await db.getConnection();
    const [existingRows] = await connection.query("SELECT id FROM hotels WHERE id = ?", [accommodationId]);
    if (!Array.isArray(existingRows) || existingRows.length === 0) {
      connection.release();
      return res.status(404).json({ error: "Hébergement introuvable" });
    }

    await connection.query("DELETE FROM hotels WHERE id = ?", [accommodationId]);
    connection.release();
    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting accommodation by admin:", error);
    return res.status(500).json({ error: "Failed to delete accommodation" });
  }
}
