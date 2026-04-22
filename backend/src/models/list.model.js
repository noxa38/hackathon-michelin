import db from "../config/db.js";

class List {
  static async findByUserId(userId) {
    try {
      const [rows] = await db.execute(
        `SELECT l.*, COUNT(lr.id) as restaurant_count
         FROM lists l
         LEFT JOIN list_restaurants lr ON l.id = lr.list_id
         WHERE l.user_id = ?
         GROUP BY l.id
         ORDER BY l.created_at DESC`,
        [userId]
      );
      return rows || [];
    } catch (err) {
      throw err;
    }
  }

  static async findById(id, userId) {
    try {
      const [rows] = await db.execute(
        `SELECT l.*, COUNT(lr.id) as restaurant_count
         FROM lists l
         LEFT JOIN list_restaurants lr ON l.id = lr.list_id
         WHERE l.id = ? AND l.user_id = ?
         GROUP BY l.id`,
        [id, userId]
      );
      return rows[0] || null;
    } catch (err) {
      throw err;
    }
  }

  static async create(userId, name, description = "") {
    try {
      const result = await db.execute(
        "INSERT INTO lists (user_id, name, description) VALUES (?, ?, ?)",
        [userId, name, description]
      );
      return result[0];
    } catch (err) {
      throw err;
    }
  }

  static async update(id, userId, data) {
    const fields = [];
    const values = [];

    Object.entries(data).forEach(([key, value]) => {
      const dbKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
      fields.push(`${dbKey} = ?`);
      values.push(value);
    });

    values.push(id);
    values.push(userId);

    try {
      const result = await db.execute(
        `UPDATE lists SET ${fields.join(", ")} WHERE id = ? AND user_id = ?`,
        values
      );
      return result[0];
    } catch (err) {
      throw err;
    }
  }

  static async delete(id, userId) {
    try {
      const result = await db.execute(
        "DELETE FROM lists WHERE id = ? AND user_id = ?",
        [id, userId]
      );
      return result[0];
    } catch (err) {
      throw err;
    }
  }

  static async addRestaurant(listId, restaurantId, userId) {
    try {
      // Vérifier que la liste appartient à l'utilisateur
      const [listRows] = await db.execute(
        "SELECT id FROM lists WHERE id = ? AND user_id = ?",
        [listId, userId]
      );
      
      if (listRows.length === 0) throw new Error("List not found");
      
      const result = await db.execute(
        "INSERT IGNORE INTO list_restaurants (list_id, restaurant_id) VALUES (?, ?)",
        [listId, restaurantId]
      );
      return result[0];
    } catch (err) {
      throw err;
    }
  }

  static async removeRestaurant(listId, restaurantId, userId) {
    try {
      const result = await db.execute(
        `DELETE lr FROM list_restaurants lr
         JOIN lists l ON lr.list_id = l.id
         WHERE lr.list_id = ? AND lr.restaurant_id = ? AND l.user_id = ?`,
        [listId, restaurantId, userId]
      );
      return result[0];
    } catch (err) {
      throw err;
    }
  }

  static async getRestaurants(listId, userId) {
    try {
      const [rows] = await db.execute(
        `SELECT r.* FROM restaurants r
         JOIN list_restaurants lr ON r.id = lr.restaurant_id
         JOIN lists l ON lr.list_id = l.id
         WHERE lr.list_id = ? AND l.user_id = ?
         ORDER BY lr.added_at DESC`,
        [listId, userId]
      );
      return rows || [];
    } catch (err) {
      throw err;
    }
  }
}

export default List;
