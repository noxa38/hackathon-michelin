import db from "../config/db.js";
import bcrypt from "bcryptjs";

class User {
  static async findByEmail(email) {
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
      return rows[0] || null;
    } catch (err) {
      throw err;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
      return rows[0] || null;
    } catch (err) {
      throw err;
    }
  }

  static async findByUsername(username) {
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
      return rows[0] || null;
    } catch (err) {
      throw err;
    }
  }

  static async create(email, username, hashedPassword, firstName, lastName) {
    try {
      const result = await db.query(
        "INSERT INTO users (email, username, password, first_name, last_name) VALUES (?, ?, ?, ?, ?)",
        [email, username, hashedPassword, firstName, lastName]
      );
      return result[0];
    } catch (err) {
      throw err;
    }
  }

  static async update(id, data) {
    const fields = [];
    const values = [];

    Object.entries(data).forEach(([key, value]) => {
      const dbKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
      fields.push(`${dbKey} = ?`);
      values.push(value);
    });

    values.push(id);

    try {
      const result = await db.query(
        `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
        values
      );
      return result[0];
    } catch (err) {
      throw err;
    }
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  static async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  // Professional requests management
  static async createProfessionalRequest(userId, restaurantId, proofDocumentUrl) {
    try {
      const result = await db.query(
        "INSERT INTO professional_requests (user_id, restaurant_id, proof_document_url, status) VALUES (?, ?, ?, 'pending')",
        [userId, restaurantId, proofDocumentUrl]
      );
      return result[0];
    } catch (err) {
      throw err;
    }
  }

  static async getProfessionalRequest(userId, restaurantId) {
    try {
      const [rows] = await db.query(
        "SELECT * FROM professional_requests WHERE user_id = ? AND restaurant_id = ?",
        [userId, restaurantId]
      );
      return rows[0] || null;
    } catch (err) {
      throw err;
    }
  }

  static async getPendingProfessionalRequests() {
    try {
      const [rows] = await db.query(`
        SELECT
          pr.id,
          pr.user_id AS userId,
          pr.restaurant_id AS restaurantId,
          pr.proof_document_url AS proofDocumentUrl,
          pr.status,
          pr.rejection_reason AS rejectionReason,
          pr.created_at AS createdAt,
          pr.updated_at AS updatedAt,
          u.first_name AS firstName,
          u.last_name AS lastName,
          u.email,
          r.name AS restaurantName
        FROM professional_requests pr
        JOIN users u ON pr.user_id = u.id
        JOIN restaurants r ON pr.restaurant_id = r.id
        ORDER BY pr.created_at DESC
      `);
      return rows;
    } catch (err) {
      throw err;
    }
  }

  static async approveProfessionalRequest(requestId) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      const [request] = await connection.query("SELECT * FROM professional_requests WHERE id = ?", [requestId]);
      if (!request[0]) throw new Error("Request not found");

      const { user_id, restaurant_id } = request[0];

      // Update request status
      await connection.query(
        "UPDATE professional_requests SET status = 'approved', rejection_reason = NULL WHERE id = ?",
        [requestId]
      );

      // Update user type to professional
      await connection.query(
        "UPDATE users SET user_type = 'professional' WHERE id = ?",
        [user_id]
      );

      // Ensure professional_restaurants entry exists
      await connection.query(
        "INSERT INTO professional_restaurants (user_id, restaurant_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP",
        [user_id, restaurant_id]
      );

      await connection.commit();

      return true;
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }

  static async rejectProfessionalRequest(requestId, rejectionReason) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      const [request] = await connection.query("SELECT * FROM professional_requests WHERE id = ?", [requestId]);
      if (!request[0]) throw new Error("Request not found");

      const { user_id, restaurant_id } = request[0];

      await connection.query(
        "UPDATE professional_requests SET status = 'rejected', rejection_reason = ? WHERE id = ?",
        [rejectionReason, requestId]
      );

      // Revoke professional association for this specific restaurant if it exists.
      await connection.query(
        "DELETE FROM professional_restaurants WHERE user_id = ? AND restaurant_id = ?",
        [user_id, restaurant_id]
      );

      // Downgrade to individual only when no managed restaurants remain.
      const [remainingManaged] = await connection.query(
        "SELECT COUNT(*) AS count FROM professional_restaurants WHERE user_id = ?",
        [user_id]
      );

      if ((remainingManaged[0]?.count || 0) === 0) {
        await connection.query(
          "UPDATE users SET user_type = 'individual' WHERE id = ? AND user_type = 'professional'",
          [user_id]
        );
      }

      await connection.commit();
      return true;
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }

  // Professional restaurant management
  static async getProfessionalRestaurant(userId, restaurantId) {
    try {
      const [rows] = await db.query(
        "SELECT * FROM professional_restaurants WHERE user_id = ? AND restaurant_id = ?",
        [userId, restaurantId]
      );
      return rows[0] || null;
    } catch (err) {
      throw err;
    }
  }

  static async getProfessionalRestaurants(userId) {
    try {
      const [rows] = await db.query(`
        SELECT pr.*, r.* 
        FROM professional_restaurants pr
        JOIN restaurants r ON pr.restaurant_id = r.id
        WHERE pr.user_id = ?
      `, [userId]);
      return rows;
    } catch (err) {
      throw err;
    }
  }

  static async updateProfessionalRestaurant(userId, restaurantId, data) {
    const restaurantEditableFields = new Set([
      "name",
      "address",
      "city",
      "country",
      "cuisine",
      "phone_number",
      "description",
    ]);

    const professionalFields = new Set(["hours", "menu", "prices", "photos"]);

    const restaurantSet = [];
    const restaurantValues = [];
    const professionalSet = [];
    const professionalValues = [];

    Object.entries(data).forEach(([key, value]) => {
      if (restaurantEditableFields.has(key)) {
        restaurantSet.push(`${key} = ?`);
        restaurantValues.push(value);
      }

      if (professionalFields.has(key)) {
        professionalSet.push(`${key} = ?`);
        professionalValues.push(typeof value === "object" ? JSON.stringify(value) : value);
      }
    });

    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      if (restaurantSet.length > 0) {
        await connection.query(
          `UPDATE restaurants SET ${restaurantSet.join(", ")} WHERE id = ?`,
          [...restaurantValues, restaurantId]
        );
      }

      if (professionalSet.length > 0) {
        await connection.query(
          `UPDATE professional_restaurants SET ${professionalSet.join(", ")} WHERE user_id = ? AND restaurant_id = ?`,
          [...professionalValues, userId, restaurantId]
        );
      }

      await connection.commit();
      return true;
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }

  // Admin user creation
  static async createAdmin(email, username, hashedPassword, firstName, lastName) {
    try {
      const result = await db.query(
        "INSERT INTO users (email, username, password, first_name, last_name, user_type) VALUES (?, ?, ?, ?, ?, 'admin')",
        [email, username, hashedPassword, firstName, lastName]
      );
      return result[0];
    } catch (err) {
      throw err;
    }
  }

  // Statistics for admin dashboard
  static async getStatistics() {
    try {
      const [userCount] = await db.query("SELECT COUNT(*) as count FROM users WHERE user_type != 'admin'");
      const [restaurantCount] = await db.query("SELECT COUNT(*) as count FROM restaurants");
      const [accommodationCount] = await db.query("SELECT COUNT(*) as count FROM hotels");
      
      return {
        totalUsers: userCount[0]?.count || 0,
        totalRestaurants: restaurantCount[0]?.count || 0,
        totalAccommodations: accommodationCount[0]?.count || 0
      };
    } catch (err) {
      throw err;
    }
  }

  static async getAdminManagedUsers() {
    try {
      const [rows] = await db.query(
        `SELECT id,
                email,
                username,
                first_name,
                last_name,
                user_type,
                created_at
         FROM users
         ORDER BY created_at DESC, id DESC`
      );
      return rows;
    } catch (err) {
      throw err;
    }
  }

  static async createUserByAdmin(data) {
    try {
      const result = await db.query(
        `INSERT INTO users (email, username, password, first_name, last_name, user_type)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          data.email,
          data.username,
          data.password,
          data.firstName,
          data.lastName,
          data.userType,
        ]
      );
      return result[0];
    } catch (err) {
      throw err;
    }
  }

  static async updateUserByAdmin(id, data) {
    const fields = [];
    const values = [];

    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined) return;
      const dbKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
      fields.push(`${dbKey} = ?`);
      values.push(value);
    });

    if (!fields.length) return;

    values.push(id);

    try {
      const result = await db.query(
        `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
        values
      );
      return result[0];
    } catch (err) {
      throw err;
    }
  }

  static async deleteUserByAdmin(id) {
    try {
      const result = await db.query("DELETE FROM users WHERE id = ?", [id]);
      return result[0];
    } catch (err) {
      throw err;
    }
  }
}

export default User;
