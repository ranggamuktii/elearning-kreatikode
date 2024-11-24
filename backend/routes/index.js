import express from 'express';
import adminRoutes from './adminRoute.js';
import courseRoutes from './courseRoute.js';

const router = express.Router();

router.use('/courses', courseRoutes);
router.use('/admin', adminRoutes);

export default router;
