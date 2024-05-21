import { Pool } from 'pg';
import { config } from 'dotenv';

config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT as string),
});

async function connect() {
  try {
    const res = await pool.query(`SELECT NOW()`);
    console.log('Conexión exitosa a la base de datos:', res.rows[0].now);
  } catch (err) {
    console.error('Error al conectar a la base de datos', err);
  }
}

connect();

export default pool;