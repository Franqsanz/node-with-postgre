// Leer todos los libros ordenados en forma descendente.
const qyAllBooks = `SELECT * FROM books ORDER BY created_at DESC`;
// Todos los libros más el total
const qyAllBooksMoreTotal = `WITH total_count AS (
  SELECT COUNT(*)::integer AS total FROM books),
  result_set AS (
    SELECT
      id,
      title,
      category,
      image,
      language,
      slug,
      authors
    FROM books
    ORDER BY created_at DESC
  )
  SELECT (SELECT total FROM total_count) AS total,
  json_agg(result_set.*) AS results
  FROM result_set;
`;
// Leer un solo libro por ID.
const qyOneBook = `SELECT * FROM books WHERE id = $1`;
// Leer un solo libro por Slug.
const qyOneBookBySlug = `SELECT * FROM books WHERE slug = $1`;
// Borrar un libro por ID.
const qyDeleteBook = `DELETE FROM books WHERE id = $1 RETURNING *`;
// Paginación.
const qyPaginateBook = `SELECT * FROM books LIMIT $1 OFFSET $2`;
// Crear un nuevo libro.
const qyCreateBook = `INSERT INTO books (
    title,
    authors,
    synopsis,
    category,
    source_link,
    language,
    year,
    number_pages,
    format,
    slug,
    image
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
  RETURNING *;
`;
// Actualizar un libro.
const qyPatchBook = `UPDATE books SET
    title = $1,
    authors = $2,
    synopsis= $3,
    category = $4,
    source_link = $5,
    language = $6,
    year = $7,
    number_Pages = $8,
    format = $9,
    slug = $10,
    image = $11
  WHERE id = $12
  RETURNING *
`;
// Buscar/filtar campo
const qySearchByField = `SELECT * FROM books WHERE title ILIKE $1`;
// Buscar/filtar varios campos
const qySearchByFields = `SELECT * FROM books WHERE title ILIKE $1 OR author ILIKE $2`;
// Agrupar varios campos, esta consulta es compleja (por ahora)
const qyGroupFields = `SELECT field,
    json_agg(json_build_object('value', values, 'count', count)) AS values
  FROM (
    SELECT 'category' AS field, values, COUNT(*) AS count
    FROM (
      SELECT UNNEST(category) AS values
      FROM books
    ) AS unnested_categories
    GROUP BY values

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
const qyTotalCount = `SELECT COUNT(*) FROM books`;
// Filtrar por multiples campos
// `1=1` es una condición que siempre es verdadera.
// Esto simplifica la construcción de la consulta dinámica,
// permitiendo que las condiciones adicionales se agreguen fácilmente
// con `AND` sin preocuparse por si hay una condición previa.
const qyFilter = `SELECT image, title, authors, category, language, year, slug FROM books WHERE 1=1`;

export {
  qyCreateBook,
  qyAllBooks,
  qyAllBooksMoreTotal,
  qyOneBook,
  qyOneBookBySlug,
  qyPatchBook,
  qyDeleteBook,
  qyPaginateBook,
  qySearchByField,
  qySearchByFields,
  qyGroupFields,
  qyTotalCount,
  qyFilter
}
