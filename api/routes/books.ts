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

router.get('/books', query, getAllBooks);
router.get('/books/search', getSearchBook);
router.get('/books/group', getGroupFields);
router.get('/books/:id', getOneBook);
router.get('/books/slug/:slug', getOneBookBySlug);
router.patch('/books/:id', updateBook);
router.post('/books', addBook);
router.delete('/books/:id', removeBook);

export default router;
