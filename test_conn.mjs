import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "gpiw_di_khan"
});

async function main() {
  try {
    const [rows] = await pool.execute("SELECT * FROM site_settings WHERE id = 1");
    console.log("Success:", rows);
  } catch (error) {
    console.error("Connection failed:", error);
  }
  process.exit(0);
}

main();
