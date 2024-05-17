import express from 'express';

import { getAllBooks, postBook } from '../controllers/routes';

const router = express.Router();

router.get('/books', getAllBooks);
router.get('/post/book', postBook);

export default router;