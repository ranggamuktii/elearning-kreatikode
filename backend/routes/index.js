import express from 'express';
import commentRoute from './commentRoutes.js';
import progressRoute from './progressRoutes.js';

const router = express.Router();

router.use('/', progressRoute);
router.use('/courses', commentRoute);
export default router;
