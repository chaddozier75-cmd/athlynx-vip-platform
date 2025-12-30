import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const [rows] = await connection.execute("SELECT id, name, category, image FROM products WHERE name LIKE '%Fuel Bot%' OR category LIKE '%ai%' OR category LIKE '%fuel%' LIMIT 10");
console.log(JSON.stringify(rows, null, 2));
await connection.end();
