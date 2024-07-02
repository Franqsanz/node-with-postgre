import pool from '../db/connection';
import { IBook, IRows } from '../types/IBook';
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
  async findAllBooks(limit: number | null, offset: number): Promise<IRows> {
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
      console.error('Error al ejecutar la consulta en el modelo');
      throw err;
    }
  },

  async findById(id: string): Promise<IBook[] | null> {
    try {
      const result = await pool.query(qyOneBook, [id]);

      // if (result.rows.length === 0) {
      //   throw new Error('Libro no encontrado');
      // }

      return result.rows[0];
    } catch (err) {
      console.error('Error al leer un libro en el modelo');
      throw err;
    }
  },

  async findBySlug(slug: string): Promise<IBook[] | null> {
    try {
      const result = await pool.query(qyOneBookBySlug, [slug]);

      // if (result.rows.length === 0) {
      //   throw new Error('Libro no encontrado');
      // }

      return result.rows[0];
    } catch (err) {
      console.error('Error al leer un libro en el modelo');
      throw err;
    }
  },

  async findSearch(title: string | string[] | undefined): Promise<IBook[]> {
    try {
      const result = await pool.query(qySearchByField, [`%${title}%`]);

      // if (result.rows.length === 0) {
      //   throw new Error('Libro no encontrado');
      // }

      return result.rows;
    } catch (err) {
      console.error('Error al leer un libro en el modelo');
      throw err;
    }
  },

  async findByGroupFields(): Promise<IBook[]> {
    try {
      const result = await pool.query(qyGroupFields);

      // if (result.rows.length === 0) {
      //   throw new Error('Grupos no encontrados');
      // }

      return result.rows;
    } catch (err) {
      console.error('Error al leer los grupos en el modelo');
      throw err;
    }
  },

  async findUpdateBook(values: any[]): Promise<IBook[]> {
    try {
      const result = await pool.query(qyPatchBook, values);

      // if (result.rows.length === 0) {
      //   throw new Error('Libro no encontrado');
      // }

      return result.rows;
    } catch (err) {
      console.error('Error al leer un libro en el modelo');
      throw err;
    }
  },

  async createBook(values: any[]): Promise<IBook[]> {
    try {
      const result = await pool.query(qyCreateBook, values);

      return result.rows;
    } catch (err) {
      console.error('Error al leer un libro en el modelo');
      throw err;
    }
  },

  async deleteBook(id: string): Promise<IBook[] | null> {
    try {
      const result = await pool.query(qyDeleteBook, [id]);

      // if (result.rowCount === 0) {
      //   throw new Error('Libro no encontrado');
      // }

      return result.rows[0];
    } catch (err) {
      console.error('Error al leer un libro en el modelo');
      throw err;
    }
  },
};
