// Leer todos los libros ordenados en forma ascendente.
const qyAllBooks = `SELECT * FROM books ORDER BY id DESC`;
// Todos los libros más el total
const qyAllBooksMoreTotal = `WITH total_count AS (
  SELECT COUNT(*) AS total FROM books),
  result_set AS (
    SELECT * FROM books ORDER BY id DESC
  )
  SELECT (SELECT total FROM total_count) AS total,
  json_agg(result_set.*) AS result
  FROM result_set;
`;
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
// Buscar/filtar campo
const qySearchByField = `SELECT * FROM books WHERE title ILIKE $1`;
// Buscar/filtar varios campos
const qySearchByFields = `SELECT * FROM books WHERE title ILIKE $1 OR author ILIKE $2`;
// Agrupar varios campos, esta consulta es compleja
const qyGroupFields = `SELECT field,
    json_agg(json_build_object('value', values, 'count', count)) AS values
  FROM (
    SELECT 'category' AS field, UNNEST(category) AS values, COUNT(*) AS count
    FROM books
    GROUP BY category

    UNION ALL

    SELECT 'language' AS field, language AS values, COUNT(*) AS count
    FROM books
    GROUP BY language

    UNION ALL

    SELECT 'year' AS field, year::text AS values, COUNT(*) AS count
    FROM books
    GROUP BY year
  ) AS all_groups
  GROUP BY field
  ORDER BY field;
`;
// Consultar el total de registros
const qyTotalCount = `SELECT COUNT(*) AS total_count FROM books`;

export {
  qyCreateBook,
  qyAllBooks,
  qyAllBooksMoreTotal,
  qyOneBook,
  qyPatchBook,
  qyDeleteBook,
  qySearchByField,
  qySearchByFields,
  qyGroupFields,
  qyTotalCount
}
