import { UserModel } from '../models/userModel';

const { userFind, userFindAllBooksDetails } = UserModel;

export const UserService = {
  async findAll() {
    try {
      return await userFind();
    } catch (err) {
      throw err;
    }
  },

  async findAllUsersBooksDetails() {
    try {
      return await userFindAllBooksDetails();
    } catch (err) {
      throw err;
    }
  },
}
