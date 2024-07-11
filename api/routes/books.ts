import express from 'express';

import {
  getAllBooks,
  getOneBook,
  getOneBookBySlug,
  updateBook,
  addBook,
  removeBook,
  getSearchBook,
  getGroupFields
} from '../controllers/bookController';
import { query } from '../middleware/query';

const router = express.Router();

router.get('/', query, getAllBooks);
router.get('/search', getSearchBook);
router.get('/group', getGroupFields);
router.get('/:id', getOneBook);
router.get('/slug/:slug', getOneBookBySlug);
router.patch('/:id', updateBook);
router.post('/', addBook);
router.delete('/:id', removeBook);

export default router;
