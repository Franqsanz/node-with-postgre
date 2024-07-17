import { Request, Response } from 'express';

import { BookService } from '../../services/bookService';
import { IBook } from '../../interfaces/IBook';

const {
  findAllBooks,
  findById,
  findBySlug,
  findSearch,
  findByGroupFields,
  updateBook,
  createBook,
  deleteBook
} = BookService;

async function getAllBooks(req: Request, res: Response) {
  const limit = req.query.limit ? parseInt(req.query.limit as string) : null;
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const offset = limit ? (page - 1) * limit : 0;

  try {
    const { rows, totalResults } = await findAllBooks(limit, offset);

    if (limit === null) {
      return res.status(200).json(rows);
    } else {
      const totalPages = Math.ceil(totalResults as number / limit);
      const nextPage = page < totalPages ? page + 1 : null;

      if (rows.length < 1) {
        return res.status(404).json({ info: { message: 'No se encontraron más libros' } });
      }

      return res.status(200).json({
        page,
        limit,
        totalResults,
        totalPages,
        nextPage,
        data: rows,
      });
    }
  } catch (err) {
    console.error('Error al ejecutar la consulta');
    res.status(500).json({ message: 'Error al obtener los libros' });
  }
}

async function getOneBook(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const result = await findById(id);

    if (!result || result.length === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error('Error al leer un libro');
    res.status(500).json({ message: 'Error al leer un libro' });
  }
}

async function getOneBookBySlug(req: Request, res: Response) {
  const { slug } = req.params;

  try {
    const result = await findBySlug(slug);

    if (!result || result.length === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error('Error al leer un libro');
    res.status(500).json({ message: 'Error al leer un libro' });
  }
}

async function getSearchBook(req: Request, res: Response) {
  const { title } = req.query;

  try {
    const result = await findSearch(title as string);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error('Error al leer un libro');
    res.status(500).json({ message: 'Error al leer un libro' });
  }
}

async function getGroupFields(req: Request, res: Response) {
  try {
    const result = await findByGroupFields();

    if (result.length === 0) {
      return res.status(404).json({ message: 'Grupos no encontrados' });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error('Error al leer un libro');
    res.status(500).json({ message: 'Error al leer un libro' });
  }
}

async function addBook(req: Request, res: Response) {
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

  const values: IBook[] = [
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
    const result = await createBook(values);

    return res.status(200).json(result);
  } catch (err) {
    console.error('Error al crear un nuevo libro');
    res.status(500).json({ message: 'Error al crear un nuevo libro' });
  }
}

async function update(req: Request, res: Response) {
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

  const values: IBook[] = [
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
    const result = await updateBook(values);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error('Error al actualizar el libro');
    res.status(500).json({ message: 'Error al actualizar el libro' });
  }
}

async function removeBook(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const result = await deleteBook(id);

    if (result?.length === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    return res.status(200).json({ message: 'Libro eliminado correctamente', book: result });
  } catch (err) {
    console.error('Error al eliminar el libro');
    res.status(500).json({ message: 'Error al eliminar el libro' });
  }
}

export {
  getAllBooks,
  getOneBook,
  getOneBookBySlug,
  update,
  addBook,
  removeBook,
  getSearchBook,
  getGroupFields
}
