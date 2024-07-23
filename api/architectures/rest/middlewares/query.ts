import { Request, Response, NextFunction } from 'express';

import pool from '../../../../db/connection';
import { qyFilter } from '../../../../db/queries';

export async function query(req: Request, res: Response, next: NextFunction) {
  const { category, year, language } = req.query;
  const queryParams: any[] = [];
  let queryStr = qyFilter;

  if (!category && !year && !language) {
    // Si no hay filtros, pasa al siguiente middleware/controlador
    return next();
  }

  try {
    if (category) {
      queryParams.push(`%${category}%`);
      queryStr += ` AND EXISTS (SELECT 1 FROM unnest(category) AS cat WHERE cat ILIKE $${queryParams.length})`;
    }

    if (year) {
      queryParams.push(year);
      queryStr += ` AND year = $${queryParams.length}`;
    }

    if (language) {
      queryParams.push(`%${language}%`);
      queryStr += ` AND language ILIKE $${queryParams.length}`;
    }

    queryStr += ' ORDER BY created_at DESC';

    const results = await pool.query(queryStr, queryParams);

    if (results.rows.length < 1) {
      return res.status(404).json({ info: { message: 'La búsqueda que introdujiste no ha sido encontrada.' } });
    }

    return res.status(200).json(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: { message: 'Error en el servidor' } });
  }
};
