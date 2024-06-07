import { Request, Response } from 'express';

// import pool from '../../db/connection';
// import {
//   qyCreateBook,
//   qyAllBooksMoreTotal,
//   qyOneBook,
//   qyOneBookBySlug,
//   qyPatchBook,
//   qyDeleteBook,
//   qyPaginateBook,
//   qySearchByField,
//   qyGroupFields,
//   qyTotalCount,
// } from '../../db/queries';
import { BookModel } from '../../model/bookModel';

async function getAllBooks(req: Request, res: Response) {
  const limit = req.query.limit ? parseInt(req.query.limit as string) : null;
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const offset = limit ? (page - 1) * limit : 0;

  try {
    const { rows, totalResults } = await BookModel.getAllBooks(limit, offset);

    if (limit === null) {
      return res.status(200).json(rows);
    } else {
      const totalPages = Math.ceil(totalResults as number / limit);
      const nextPage = page < totalPages ? page + 1 : null;

      if (rows.length < 1) {
        return res.status(404).json({ info: { message: 'No se encontraron más libros' } });
      }

      res.status(200).json({
        page,
        limit,
        totalResults,
        totalPages,
        nextPage,
        data: rows,
      });
    }
  } catch (err) {
    console.error('Error al ejecutar la consulta', err);
    res.status(500).json({ message: 'Error al obtener los libros' });
  }
}

async function getOneBook(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const result = await BookModel.getOneBook(id);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error('Error al leer un libro', err);
    res.status(500).json({ message: 'Error al leer un libro' });
  }
}

async function getOneBookBySlug(req: Request, res: Response) {
  const { slug } = req.params;

  try {
    const result = await BookModel.getOneBookBySlug(slug);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error('Error al leer un libro', err);
    res.status(500).json({ message: 'Error al leer un libro' });
  }
}

async function getSearchBook(req: Request, res: Response) {
  const { title } = req.query;

  try {
    const result = await BookModel.getSearchBook(title as string);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error('Error al leer un libro', err);
    res.status(500).json({ message: 'Error al leer un libro' });
  }
}

async function getGroupFields(req: Request, res: Response) {
  try {
    const result = await BookModel.getGroupFields();

    if (result.length === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.status(200).json(result);
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
    // const result = await pool.query(qyPatchBook, values);
    const result = await BookModel.updateBook(values);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.status(200).json(result);
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
    // const result = await pool.query(qyCreateBook, values);
    const result = await BookModel.createBook(values);

    res.status(200).json(result);
  } catch (err) {
    console.error('Error al crear un nuevo libro', err);
    res.status(500).json({ message: 'Error al crear un nuevo libro' });
  }
}

async function deleteBook(req: Request, res: Response) {
  const { id } = req.params;

  try {
    // const result = await pool.query(qyDeleteBook, [id]);
    const result = await BookModel.deleteBook(id);

    if (result === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.status(200).json({ message: 'Libro eliminado correctamente', book: result });
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
