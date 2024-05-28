import express from 'express';

import {
  getAllBooks,
  getOneBook,
  getOneBookBySlug,
  patchBook,
  postBook,
  deleteBook,
  getSearchBook,
  getGroupFields
} from '../controllers/bookController';

const router = express.Router();

router.get('/books', getAllBooks);
router.get('/books/search', getSearchBook);
router.get('/books/group', getGroupFields);
router.get('/book/:id', getOneBook);
router.get('/book/slug/:slug', getOneBookBySlug);
router.patch('/update/book/:id', patchBook);
router.post('/post/book', postBook);
router.delete('/delete/book/:id', deleteBook);

export default router;
