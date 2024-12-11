import express from 'express';
import courseRoutes from './courseRoute.js';
import materialRoutes from './materialRoute.js';

const router = express.Router();

router.use('/courses', materialRoutes);
router.use('/courses', courseRoutes);

export default router;
