import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";

const [email, password, name = "Administrator"] = process.argv.slice(2);
if (!email || !password) {
  console.error("Usage: node scripts/create-admin.mjs admin@example.com password \"Admin Name\"");
  process.exit(1);
}

const connection = await mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "gpiw_di_khan"
});

const hash = await bcrypt.hash(password, 12);
await connection.execute(
  "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'admin') ON DUPLICATE KEY UPDATE name=VALUES(name), password=VALUES(password)",
  [name, email, hash]
);
await connection.end();
console.log(`Admin user ready: ${email}`);
