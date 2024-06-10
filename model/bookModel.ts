import pool from '../db/connection';
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

export const BookModel = {
  findAllBooks: async (limit: number | null, offset: number) => {
    try {
      const query = {
        text: qyPaginateBook,
        values: [limit, offset],
      };

      if (limit === null) {
        const results = await pool.query(qyAllBooksMoreTotal);

        return { rows: results.rows };
      } else {
        const results = await pool.query(query);
        const totalResultsQuery = await pool.query(qyTotalCount);
        const totalResults = parseInt(totalResultsQuery.rows[0].count, 10);

        return { rows: results.rows, totalResults };
      }
    } catch (err) {
      console.error('Error al ejecutar la consulta en el modelo', err);
      throw err;
    }
  },

  findById: async (id: string) => {
    try {
      const result = await pool.query(qyOneBook, [id]);

      // if (result.rows.length === 0) {
      //   throw new Error('Libro no encontrado');
      // }

      return result.rows[0];
    } catch (err) {
      console.error('Error al leer un libro en el modelo', err);
      throw err;
    }
  },

  findBySlug: async (slug: string) => {
    try {
      const result = await pool.query(qyOneBookBySlug, [slug]);

      // if (result.rows.length === 0) {
      //   throw new Error('Libro no encontrado');
      // }

      return result.rows[0];
    } catch (err) {
      console.error('Error al leer un libro en el modelo', err);
      throw err;
    }
  },

  findSearch: async (title: string | string[] | undefined) => {
    try {
      const result = await pool.query(qySearchByField, [`%${title}%`]);

      // if (result.rows.length === 0) {
      //   throw new Error('Libro no encontrado');
      // }

      return result.rows;
    } catch (err) {
      console.error('Error al leer un libro en el modelo', err);
      throw err;
    }
  },

  findByGroupFields: async () => {
    try {
      const result = await pool.query(qyGroupFields);

      // if (result.rows.length === 0) {
      //   throw new Error('Grupos no encontrados');
      // }

      return result.rows;
    } catch (err) {
      console.error('Error al leer los grupos en el modelo', err);
      throw err;
    }
  },

  findUpdateBook: async (values: any[]) => {
    try {
      const result = await pool.query(qyPatchBook, values);

      // if (result.rows.length === 0) {
      //   throw new Error('Libro no encontrado');
      // }

      return result.rows;
    } catch (err) {
      console.error('Error al leer un libro en el modelo', err);
      throw err;
    }
  },

  createBook: async (values: any[]) => {
    try {
      const result = await pool.query(qyCreateBook, values);

      return result.rowCount;
    } catch (err) {
      console.error('Error al leer un libro en el modelo', err);
      throw err;
    }
  },

  deleteBook: async (id: string) => {
    try {
      const result = await pool.query(qyDeleteBook, [id]);

      // if (result.rowCount === 0) {
      //   throw new Error('Libro no encontrado');
      // }

      return result.rows[0];
    } catch (err) {
      console.error('Error al leer un libro en el modelo', err);
      throw err;
    }
  },
};
