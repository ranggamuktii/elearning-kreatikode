import express from 'express';
import adminRoutes from './adminRoute.js';
import courseRoutes from './courseRoute.js';
import quizRoute from './quizRoute.js'

const router = express.Router();

router.use('/courses', courseRoutes);
router.use('/admin', adminRoutes);
router.use('/quiz', quizRoute)

export default router;
