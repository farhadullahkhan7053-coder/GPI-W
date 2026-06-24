import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gpiw_di_khan',
});

console.log('Connected to database.');

const [result] = await connection.execute(
  `UPDATE site_settings SET institute_name = 'GOVERNMENT POLYTECHNIC INSTITUTE (WOMEN) DERA ISMAIL KHAN' WHERE id = 1`
);
console.log('Rows affected:', result.affectedRows);

const [rows] = await connection.execute('SELECT institute_name FROM site_settings WHERE id = 1');
console.log('New institute name:', rows[0]?.institute_name);

await connection.end();
console.log('Done!');
