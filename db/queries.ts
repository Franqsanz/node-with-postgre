// Leer todos los libros ordenados en forma ascendente.
const qyAllBooks = `SELECT * FROM books ORDER BY id ASC`;
// Leer un solo libro por ID.
const qyOneBook = `SELECT * FROM books WHERE id = $1`;
// Borrar un libro por ID.
const qyDeleteBook = `DELETE FROM books WHERE id = $1 RETURNING *`;
// Crear un nuevo libro.
const qyCreateBook = `INSERT INTO books (
    title,
    author,
    category,
    sourcelink,
    language,
    year,
    numberpages,
    format,
    pathurl,
    image
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  RETURNING *;
`;
// Actualizar un libro.
const qyPatchBook = `UPDATE books SET
    title = $1,
    author = $2,
    category = $3,
    sourcelink = $4,
    language = $5,
    year = $6,
    numberpages = $7,
    format = $8,
    pathurl = $9,
    image = $10
  WHERE id = $11
  RETURNING *
`;

export {
  qyCreateBook,
  qyAllBooks,
  qyOneBook,
  qyPatchBook,
  qyDeleteBook
}