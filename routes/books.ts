import express from 'express';

import {
  getAllBooks,
  getOneBook,
  patchBook,
  postBook,
  deleteBook,
  getSearchBook,
  getGroupFields
} from '../controllers/routes';

const router = express.Router();

router.get('/books', getAllBooks);
router.get('/books/search', getSearchBook);
router.get('/books/group', getGroupFields);
router.get('/book/:id', getOneBook);
router.patch('/update/book/:id', patchBook);
router.post('/post/book', postBook);
router.delete('/delete/book/:id', deleteBook);

export default router;
