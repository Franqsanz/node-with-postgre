import pool from '../../db/connection';
import { IRepository } from '../interfaces/IRepository';
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
} from '../../db/queries';

export const BookRepository: IRepository = {
  async findBooks(limit, offset) {
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
      console.error('Error al ejecutar la consulta en el repositorio');
      throw err;
    }
  },

  async findById(id) {
    try {
      const result = await pool.query(qyOneBook, [id]);

      // if (result.rows.length === 0) {
      //   throw new Error('Libro no encontrado');
      // }

      return result.rows[0];
    } catch (err) {
      console.error('Error al leer un libro en el repositorio');
      throw err;
    }
  },

  async findBySlug(slug) {
    try {
      const result = await pool.query(qyOneBookBySlug, [slug]);

      // if (result.rows.length === 0) {
      //   throw new Error('Libro no encontrado');
      // }

      return result.rows[0];
    } catch (err) {
      console.error('Error al leer un libro en el repositorio');
      throw err;
    }
  },

  async findSearch(title) {
    try {
      const result = await pool.query(qySearchByField, [`%${title}%`]);

      // if (result.rows.length === 0) {
      //   throw new Error('Libro no encontrado');
      // }

      return result.rows;
    } catch (err) {
      console.error('Error al leer un libro en el repositorio');
      throw err;
    }
  },

  async findByGroupFields() {
    try {
      const result = await pool.query(qyGroupFields);

      // if (result.rows.length === 0) {
      //   throw new Error('Grupos no encontrados');
      // }

      return result.rows;
    } catch (err) {
      console.error('Error al leer los grupos en el repositorio');
      throw err;
    }
  },

  async createBook(values) {
    try {
      const result = await pool.query(qyCreateBook, values);

      return result.rows;
    } catch (err) {
      console.error('Error al leer un libro en el repositorio');
      throw err;
    }
  },

  async updateBook(values) {
    try {
      const result = await pool.query(qyPatchBook, values);

      // if (result.rows.length === 0) {
      //   throw new Error('Libro no encontrado');
      // }

      return result.rows;
    } catch (err) {
      console.error('Error al leer un libro en el repositorio');
      throw err;
    }
  },

  async deleteBook(id) {
    try {
      const result = await pool.query(qyDeleteBook, [id]);

      // if (result.rowCount === 0) {
      //   throw new Error('Libro no encontrado');
      // }

      return result.rows[0];
    } catch (err) {
      console.error('Error al leer un libro en el repositorio');
      throw err;
    }
  },
};
