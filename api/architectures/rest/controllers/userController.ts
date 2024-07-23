import { Request, Response } from 'express';

import { UserService } from '../../../services/userService';

const { findUsers, findUsersBooksDetails } = UserService;

export async function getUserFindBooks(req: Request, res: Response) {
  try {
    const result = await findUsers();

    return res.status(200).json(result);
  } catch (err) {
    console.error('Error al leer los usuarios');
    res.status(500).json({ message: 'Error al leer los usuarios' });
  }
}

export async function getUserFindBooksDetails(req: Request, res: Response) {
  try {
    const result = await findUsersBooksDetails();

    return res.status(200).json(result);
  } catch (err) {
    console.error('Error al leer los usuarios');
    res.status(500).json({ message: 'Error al leer los usuarios' });
  }
}
