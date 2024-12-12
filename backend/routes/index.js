import express from 'express';
import userRoutes from './userRoutes.js';
import commentRoutes from './commentRoutes.js';
import progressRoutes from './progressRoutes.js';
import courseRoutes from './courseRoutes.js';
import materialRoutes from './materialRoute.js';
import quizRoutes from './quizRoute.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/', progressRoutes);
router.use('/courses', commentRoutes);
router.use('/courses', materialRoutes);
router.use('/courses', courseRoutes);
router.use('/courses', quizRoutes);
export default router;
