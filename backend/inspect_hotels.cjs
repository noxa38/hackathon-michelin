
const mysql = require("mysql2/promise");
require("dotenv").config({ path: "./.env" });

async function run() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });

    console.log("Structure de la table hotels :");
    const [columns] = await connection.execute("SHOW COLUMNS FROM hotels");
    console.table(columns);

    await connection.end();
  } catch (err) {
    console.error("Erreur :", err.message);
  }
}

run();

