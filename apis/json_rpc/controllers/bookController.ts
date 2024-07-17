import { BookService } from '../../../services/bookService';

export async function findBooks(limit: number, page: number) {
  const offset = limit ? (page - 1) * limit : 0;

  try {
    const { rows, totalResults } = await BookService.findBooks(limit, offset);

    if (limit === null) {
      return rows;
    } else {
      const totalPages = Math.ceil(totalResults as number / limit);
      const nextPage = page < totalPages ? page + 1 : null;

      if (rows.length < 1) {
        throw new Error('No se encontraron más libros');
      }

      return {
        page,
        limit,
        totalResults,
        totalPages,
        nextPage,
        data: rows,
      };
    }
  } catch (err) {
    console.error('Error al ejecutar la consulta');
    throw new Error('Error al obtener los libros');
  }
}

export async function findById(id: string) {
  try {
    const result = await BookService.findById(id);

    if (!result || result.length === 0) {
      throw new Error('Libro no encontrado');
    }

    return result;
  } catch (err) {
    console.error('Error al leer un libro');
    throw new Error('Error al obtener el libro');
  }
}
