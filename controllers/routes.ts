import { Request, Response } from 'express';

import pool from '../db/db';
import {
  qyCreateBook,
  qyAllBooks,
  qyAllBooksMoreTotal,
  qyOneBook,
  qyPatchBook,
  qyDeleteBook,
  qySearchByField,
  qyGroupFields
} from '../db/queries';

async function getAllBooks(req: Request, res: Response) {
  try {
    const result = await pool.query(qyAllBooksMoreTotal); // Ejecuta la consulta SELECT en la tabla 'books'
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error al ejecutar la consulta', err);
    res.status(500).json({ message: 'Error al obtener los libros' });
  }
}

async function getOneBook(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const result = await pool.query(qyOneBook, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error al leer un libro', err);
    res.status(500).json({ message: 'Error al leer un libro' });
  }
}

async function getSearchBook(req: Request, res: Response) {
  const { title } = req.query;

  try {
    const result = await pool.query(qySearchByField, [`%${title}%`]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error al leer un libro', err);
    res.status(500).json({ message: 'Error al leer un libro' });
  }
}

async function getGroupFields(req: Request, res: Response) {
  try {
    const result = await pool.query(qyGroupFields);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error al leer un libro', err);
    res.status(500).json({ message: 'Error al leer un libro' });
  }
}

async function patchBook(req: Request, res: Response) {
  const { id } = req.params;
  const {
    title,
    authors,
    synopsis,
    category,
    source_link,
    language,
    year,
    number_pages,
    format,
    slug,
    image
  } = req.body;

  const values = [
    title,
    authors,
    synopsis,
    category,
    source_link,
    language,
    year,
    number_pages,
    format,
    slug,
    image,
    id
  ];

  try {
    const result = await pool.query(qyPatchBook, values);

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
  const {
    title,
    authors,
    synopsis,
    category,
    source_link,
    language,
    year,
    number_pages,
    format,
    slug,
    image
  } = req.body;

  const values = [
    title,
    authors,
    synopsis,
    category,
    source_link,
    language,
    year,
    number_pages,
    format,
    slug,
    image
  ];

  try {
    const result = await pool.query(qyCreateBook, values);
    res.status(200).json(result.rowCount);
  } catch (err) {
    console.error('Error al crear un nuevo libro', err);
    res.status(500).json({ message: 'Error al crear un nuevo libro' });
  }
}

async function deleteBook(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const result = await pool.query(qyDeleteBook, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.status(200).json({ message: 'Libro eliminado correctamente', book: result.rows[0] });
  } catch (err) {
    console.error('Error al eliminar el libro', err);
    res.status(500).json({ message: 'Error al eliminar el libro' });
  }
}

export {
  getAllBooks,
  getOneBook,
  patchBook,
  postBook,
  deleteBook,
  getSearchBook,
  getGroupFields
}
