import express from 'express';
import commentRoute from './commentRoutes.js';
import progressRoute from './progressRoutes.js';
import courseRoutes from './courseRoutes.js';
import materialRoutes from './materialRoute.js';
import quizRoute from './quizRoute.js';

const router = express.Router();

router.use('/', progressRoute);
router.use('/courses', commentRoute);
router.use('/courses', materialRoutes);
router.use('/courses', courseRoutes);
router.use('/courses', quizRoute);
export default router;
