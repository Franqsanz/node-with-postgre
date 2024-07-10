import { BookService } from '../../services/bookService';

export async function getAllBooks(limit: number, page: number) {
  const offset = limit ? (page - 1) * limit : 0;

  try {
    const { rows, totalResults } = await BookService.findAllBooks(limit, offset);

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
    console.error('Error al ejecutar la consulta', err);
    throw new Error('Error al obtener los libros');
  }
}
