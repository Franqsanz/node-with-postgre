import { UserModel } from '../models/userModel';

const { userFindBooks } = UserModel;

export const UserService = {
  async findAll() {
    try {
      return await userFindBooks();
    } catch (err) {
      throw err;
    }
  },
}
