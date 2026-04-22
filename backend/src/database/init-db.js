import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const host = process.env.DB_HOST || "localhost";
const port = Number(process.env.DB_PORT) || 3306;
const user = process.env.DB_USER || "root";
const password = process.env.DB_PASSWORD || "";
const database = process.env.DB_NAME || "hackaton_michelin";

const schemaPath = path.join(__dirname, "schema.sql");
const seedPath = path.join(__dirname, "seed.sql");

async function runSqlFile(connection, sqlFilePath) {
  const sql = await fs.readFile(sqlFilePath, "utf8");
  const statements = sql
    .split(/;\s*$/m)
    .map(s => s.trim())
    .filter(s => s.length > 0);
    
  for (const statement of statements) {
    try {
      await connection.query(statement);
    } catch (err) {
      console.error("Error executing statement:", statement.substring(0, 100));
      throw err;
    }
  }
}

async function initDatabase() {
  const serverConnection = await mysql.createConnection({
    host,
    port,
    user,
    password,
    multipleStatements: true,
  });

  try {
    await serverConnection.query(
      `CREATE DATABASE IF NOT EXISTS \`${database}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
    );
  } finally {
    await serverConnection.end();
  }

  const dbConnection = await mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
    multipleStatements: true,
  });

  try {
    await runSqlFile(dbConnection, schemaPath);
    await runSqlFile(dbConnection, seedPath);
  } finally {
    await dbConnection.end();
  }
}

initDatabase().catch((error) => {
  console.error("Database initialization failed:", error.message);
  process.exit(1);
});
