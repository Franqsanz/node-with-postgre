import express from 'express';

import { getUserFindBooks, getUserFindBooksDetails } from '../controllers/userController';

const router = express.Router();

router.get('/', getUserFindBooks);
router.get('/details', getUserFindBooksDetails);

export default router;
