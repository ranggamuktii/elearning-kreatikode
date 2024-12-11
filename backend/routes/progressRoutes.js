import express from 'express';
import { createUser, getProgress, getProgressOverview, markMaterialComplete } from '../controllers/progressController';
const router = express.Router();

router.get('/progress/overview', getProgressOverview);
router.get('/progress/:courseId', getProgress);
router.post('/progress/:courseId/material/:materialId', markMaterialComplete);
router.post('/users', createUser);

export default router;
