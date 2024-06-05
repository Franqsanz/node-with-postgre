import { Request, Response } from 'express';

import pool from '../db/db';
import {
  qyCreateBook,
  qyAllBooksMoreTotal,
  qyOneBook,
  qyOneBookBySlug,
  qyPatchBook,
  qyDeleteBook,
  qyPaginateBook,
  qySearchByField,
  qyGroupFields,
  qyTotalCount,
} from '../db/queries';

async function getAllBooks(req: Request, res: Response) {
  const limit = req.query.limit ? parseInt(req.query.limit as string) : null;
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const offset = limit ? (page - 1) * limit : 0;

  let results;

  try {
    const query = {
      text: qyPaginateBook,
      values: [limit, offset],
    };

    if (limit === null) {
      results = await pool.query(qyAllBooksMoreTotal);

      res.status(200).json(results.rows);
    } else {
      results = await pool.query(query);
      const totalResultsQuery = await pool.query(qyTotalCount);

      const totalResults = parseInt(totalResultsQuery.rows[0].count, 10);
      const totalPages = Math.ceil(totalResults / limit);
      const nextPage = page < totalPages ? page + 1 : null;

      if (results.rows.length < 1) {
        return res.status(404).json({ info: { message: 'No se encontraron más libros' } });
      }

      res.status(200).json({
        page: page,
        limit: limit,
        totalResults,
        totalPages,
        nextPage,
        data: results.rows,
      });
    }
  } catch (err) {
    console.error('Error al ejecutar la consulta', err);
    res.status(500).json({ message: 'Error al obtener los libros' });
  }
}

// async function getAllBooks(req: Request, res: Response) {
//   try {
//     const result = await pool.query(qyAllBooksMoreTotal); // Ejecuta la consulta SELECT en la tabla 'books'
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error('Error al ejecutar la consulta', err);
//     res.status(500).json({ message: 'Error al obtener los libros' });
//   }
// }

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

async function getOneBookBySlug(req: Request, res: Response) {
  const { slug } = req.params;

  try {
    const result = await pool.query(qyOneBookBySlug, [slug]);

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
  getOneBookBySlug,
  patchBook,
  postBook,
  deleteBook,
  getSearchBook,
  getGroupFields
}
