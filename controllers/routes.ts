import { Request, Response } from 'express';

import pool from '../db';

async function getAllBooks(req: Request, res: Response) {
  try {
    const result = await pool.query(`SELECT * FROM books ORDER BY id ASC`); // Ejecuta la consulta SELECT en la tabla 'books'
    // console.log(result.rows)
    res.json(result.rows); // Devuelve los resultados como JSON
  } catch (err) {
    console.error('Error al ejecutar la consulta', err);
    res.status(500).json({ message: 'Error al obtener los libros' });
  }
}

async function getOneBook(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const result = await pool.query(`SELECT * FROM books WHERE id = $1`, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error al leer un libro', err);
    res.status(500).json({ message: 'Error al leer un libro' });
  }
}

async function patchBook(req: Request, res: Response) {
  const { id } = req.params;
  const {
    title,
    category,
    sourcelink,
    language,
    year,
    numberpages,
    format,
    pathurl,
    image
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE books
        SET title = $1,
            category = $2,
            sourcelink = $3,
            language = $4,
            year = $5,
            numberpages = $6,
            format = $7,
            pathurl = $8,
            image = $9
        WHERE id = $10
        RETURNING *`,
      [
        title,
        category,
        sourcelink,
        language,
        year,
        numberpages,
        format,
        pathurl,
        image,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error al actualizar el libro', err);
    res.status(500).json({ message: 'Error al actualizar el libro' });
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
    // console.log(result)
    res.status(200).json(result.rowCount);
  } catch (err) {
    console.error('Error al crear un nuevo libro', err);
    // res.status(500).json({ message: 'Error al crear un nuevo libro' });
  }
}

async function deleteBook(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM books WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.status(200).json({ message: 'Libro eliminado correctamente', book: result.rows[0] });
  } catch (err) {
    console.error('Error al eliminar el libro', err);
    res.status(500).json({ message: 'Error al eliminar el libro' });
  }
}

export { getAllBooks, getOneBook, patchBook, postBook, deleteBook }