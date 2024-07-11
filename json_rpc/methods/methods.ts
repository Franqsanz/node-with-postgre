// import { Request, Response } from 'express';

import { findAllBooks, findById } from '../handlers/bookHandlers'

// Definir las funciones de los métodos
export function findAll(limit: number, page: number) {
  return findAllBooks(limit, page)
}

export function findOne(id: string) {
  return findById(id)
}
