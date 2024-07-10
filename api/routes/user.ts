import express from 'express';

import { getUserFindBooks } from '../controllers/userController';

const router = express.Router();

router.get('/user', getUserFindBooks);

export default router;
