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
}

export default User;
