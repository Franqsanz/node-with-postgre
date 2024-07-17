import { IReadUser } from '../interfaces/IRepository';
import { UserRepository } from '../repositories/userRepository';

export const UserService: IReadUser = {
  async findUsers() {
    return await UserRepository.findUsers();
  },

  async findUsersBooksDetails() {
    return await UserRepository.findUsersBooksDetails();
  },
}
