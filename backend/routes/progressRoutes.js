import express from 'express';
import { createUser, getProgress, getProgressOverview, markMaterialComplete, getCoursesWithProgressByUserId, addQuizScore } from '../controllers/progressController.js';
const router = express.Router();

router.get('/progress/overview', getProgressOverview);
router.get('/progress/:courseId/:userId', getProgress);
router.post('/progress/:courseId/material/:materialId/:userId', markMaterialComplete);
router.get('/progress/:userId', getCoursesWithProgressByUserId);
router.post('/progress/:courseId/:userId/quiz-score', addQuizScore);
router.post('/users', createUser);

export default router;
