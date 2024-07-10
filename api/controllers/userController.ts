import { Request, Response } from 'express';

import { UserService } from '../../services/userService';

const { findAll } = UserService;

export async function getUserFindBooks(req: Request, res: Response) {
  try {
    const result = await findAll();

    return res.status(200).json(result);
  } catch (err) {
    console.error('Error al leer un libro');
    res.status(500).json({ message: 'Error al leer un libro' });
  }
}
