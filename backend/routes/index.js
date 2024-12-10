import express from 'express';
import comment from './commentRoutes.js';
const router = express.Router();

router.use('/courses', comment);
export default router;
