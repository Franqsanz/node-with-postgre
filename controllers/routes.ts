import { Request, Response } from 'express';

import pool from '../db';

async function getAllBooks(req: Request, res: Response) {
  try {
    const result = await pool.query(`SELECT * FROM books;`); // Ejecuta la consulta SELECT en la tabla 'books'
    // console.log(result.rows)
    res.json(result.rows); // Devuelve los resultados como JSON
  } catch (err) {
    console.error('Error al ejecutar la consulta', err);
    res.status(500).json({ message: 'Error al obtener los libros' });
  }
}

async function postBook(req: Request, res: Response) {
  try {
    const result = await pool.query(
      `INSERT INTO books (
        title,
        category,
        sourcelink,
        language,
        year,
        numberpages,
        format,
        pathurl,
        image
      )
      VALUES (
        'DUNE',
        '{"Ciencia Ficción"}',
        'https://xbu.vercel.app/book/view/dune-adZC',
        'Español',
        2020,
        784,
        'Físico',
        'dune-adZC',
        '{
          "url": "https://res.cloudinary.com/xbu/image/upload/v1678705521/xbu/a5x8ms35xwbdpry1gb8w.webp",
          "public_id": "xbu/a5x8ms35xwbdpry1gb8w"
        }'
      )`
    );
    console.log(result)
    // res.json(result.rows);
  } catch (err) {
    console.error('Error al crear un nuevo libro', err);
    // res.status(500).json({ message: 'Error al crear un nuevo libro' });
  }
}

export { getAllBooks, postBook }