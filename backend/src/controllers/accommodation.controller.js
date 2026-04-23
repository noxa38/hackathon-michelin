import db from "../config/db.js";

function toNullableNumber(value) {
  if (value === undefined || value === null || value === "") return null;
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
}

function buildAccommodationImages(photoUrl, rooms) {
  const imageCandidates = [photoUrl, ...(rooms || []).map((room) => room.photo_url)];
  return [...new Set(imageCandidates.filter(Boolean))].slice(0, 5);
}

export async function getAccommodations(req, res) {
  try {
    const { q, city } = req.query;

    let query = `
      SELECT id, name, address, city, country, phone,
             description, award, facilities, price_from as price_from, photo_url, website_url, opening_hours
      FROM accommodation
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

    const [accommodations] = await connection.query(
      `SELECT id, name, address, city, country, phone,
              description, award, facilities, price_from as price_from, photo_url, website_url, opening_hours
       FROM accommodation WHERE id = ?`,
      [id]
    );

    if (accommodations.length === 0) {
      connection.release();
      return res.status(404).json({ error: "Accommodation not found" });
    }

    const accommodation = accommodations[0];

    const [rooms] = await connection.query(
      `SELECT id, accommodation_id, room_type, description, price_per_night, capacity, amenities, photo_url
       FROM accommodation_rooms WHERE accommodation_id = ?`,
      [id]
    );

    connection.release();

    res.json({
      ...accommodation,
      image_urls: buildAccommodationImages(accommodation.photo_url, rooms),
      room_details: rooms || []
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
      phone: req.body.phone ?? null,
      description: req.body.description ?? null,
      award: req.body.award ?? null,
      facilities: req.body.facilities ?? null,
      price_from: toNullableNumber(req.body.price_from),
      photo_url: req.body.photo_url ?? null,
      website_url: req.body.website_url ?? null,
      opening_hours: req.body.opening_hours ?? null,
    };

    const connection = await db.getConnection();
    const [result] = await connection.query(
      `INSERT INTO accommodation
        (name, address, city, country, phone, description, award, facilities, price_from, photo_url, website_url, opening_hours)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        payload.name,
        payload.address,
        payload.city,
        payload.country,
        payload.phone,
        payload.description,
        payload.award,
        payload.facilities,
        payload.price_from,
        payload.photo_url,
        payload.website_url,
        payload.opening_hours,
      ]
    );

    const [rows] = await connection.query(
      `SELECT id, name, address, city, country, phone,
              description, award, facilities, price_from as price_from, photo_url, website_url, opening_hours
        FROM accommodation WHERE id = ?`,
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
      phone: req.body.phone,
      description: req.body.description,
      award: req.body.award,
      facilities: req.body.facilities,
      price_from: req.body.price_from === undefined ? undefined : toNullableNumber(req.body.price_from),
      photo_url: req.body.photo_url,
      website_url: req.body.website_url,
      opening_hours: req.body.opening_hours,
    };

    const updates = Object.entries(fields).filter(([, value]) => value !== undefined);
    if (!updates.length) {
      return res.status(400).json({ error: "Aucune donnée à mettre à jour" });
    }

    const connection = await db.getConnection();
    const [existingRows] = await connection.query("SELECT id FROM accommodation WHERE id = ?", [accommodationId]);
    if (!Array.isArray(existingRows) || existingRows.length === 0) {
      connection.release();
      return res.status(404).json({ error: "Hébergement introuvable" });
    }

    const setClause = updates.map(([key]) => `${key} = ?`).join(", ");
    const values = updates.map(([, value]) => value);

    await connection.query(
      `UPDATE accommodation SET ${setClause} WHERE id = ?`,
      [...values, accommodationId]
    );

    const [rows] = await connection.query(
      `SELECT id, name, address, city, country, phone,
              description, award, facilities, price_from as price_from, photo_url, website_url, opening_hours
        FROM accommodation WHERE id = ?`,
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
    const [existingRows] = await connection.query("SELECT id FROM accommodation WHERE id = ?", [accommodationId]);
    if (!Array.isArray(existingRows) || existingRows.length === 0) {
      connection.release();
      return res.status(404).json({ error: "Hébergement introuvable" });
    }

    await connection.query("DELETE FROM accommodation WHERE id = ?", [accommodationId]);
    connection.release();
    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting accommodation by admin:", error);
    return res.status(500).json({ error: "Failed to delete accommodation" });
  }
}
