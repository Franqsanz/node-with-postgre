import pool from '../db/connection';
import { IBook, IRows } from '../types/IBook';
import { qyUserFindBooks } from '../db/queries';

export const UserModel = {
  async userFindBooks() {
    try {
      const result = await pool.query(qyUserFindBooks);

      return result.rows;
    } catch (err) {
      console.error('Error al ejecutar la consulta en el modelo');
      throw err;
    }
  }
};
