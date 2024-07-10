// import { Request, Response } from 'express';

import { getAllBooks } from '../handlers/bookHandlers'

// Definir las funciones de los métodos
export function allBooks(limit: number, page: number) {
  return getAllBooks(limit, page)
}
