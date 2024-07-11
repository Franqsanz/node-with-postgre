import pool from '../db/connection';
import { IBook, IRows } from '../types/IBook';
import { qyUserFind, qyUserFindDetailsBooks } from '../db/queries';

export const UserModel = {
  async userFind() {
    try {
      const result = await pool.query(qyUserFind);

      return result.rows;
    } catch (err) {
      console.error('Error al ejecutar la consulta en el modelo');
      throw err;
    }
  },

  async userFindAllBooksDetails() {
    try {
      const result = await pool.query(qyUserFindDetailsBooks);

      return result.rows;
    } catch (err) {
      console.error('Error al ejecutar la consulta en el modelo');
      throw err;
    }
  }
};
