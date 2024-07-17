import { Pool } from 'pg';

const { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } = process.env;

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: parseInt(DB_PORT as string),
});

async function connect() {
  const client = await pool.connect();

  try {
    const res = await client.query(`SELECT NOW()`);
    console.log('Conexión exitosa a la base de datos:', res.rows[0].now);
  } catch (err) {
    console.log('Error al conectar a la base de datos', err);
  } finally {
    client.release();
  }
}

connect();

export default pool;
