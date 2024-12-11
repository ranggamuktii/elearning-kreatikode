import express from 'express';
import commentRoute from './commentRoutes.js';
import progressRoute from './progressRoutes.js';
import quizRoute from './quizRoute.js';

const router = express.Router();

router.use('/', progressRoute);
router.use('/courses', commentRoute);
router.use('/courses', quizRoute);
export default router;
