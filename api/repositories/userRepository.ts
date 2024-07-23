import pool from '../../db/connection';
import { IReadUser } from '../interfaces/IRepository';
import { qyUserFind, qyUserFindDetailsBooks } from '../../db/queries';

export const UserRepository: IReadUser = {
  async findUsers() {
    try {
      const result = await pool.query(qyUserFind);

      return result.rows;
    } catch (err) {
      console.error('Error al ejecutar la consulta en el modelo');
      throw err;
    }
  },

  async findUsersBooksDetails() {
    try {
      const result = await pool.query(qyUserFindDetailsBooks);

      return result.rows;
    } catch (err) {
      console.error('Error al ejecutar la consulta en el modelo');
      throw err;
    }
  }
};
