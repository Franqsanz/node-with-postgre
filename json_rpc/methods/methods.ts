import { findAllBooks, findById } from '../controllers/bookController'

// Definir las funciones de los métodos
function findAll(limit: number, page: number) {
  return findAllBooks(limit, page)
}

function findOne(id: string) {
  return findById(id)
}

export { findAll, findOne }
