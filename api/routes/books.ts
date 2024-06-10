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
router.get('/book/:id', getOneBook);
router.get('/book/slug/:slug', getOneBookBySlug);
router.patch('/update/book/:id', updateBook);
router.post('/post/book', addBook);
router.delete('/delete/book/:id', removeBook);

export default router;
