import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'XBuniverse',
  password: 'MyDataBase',
  port: 5432, // Puerto por defecto de PostgreSQL
});

async function connect() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Conexión exitosa a la base de datos:', res.rows[0].now);
  } catch (err) {
    console.error('Error al conectar a la base de datos', err);
  }
}

connect();

export default pool;