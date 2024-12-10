import express from 'express';
import quizRoute from './quizRoute.js'
const router = express.Router();

router.use('/courses', quizRoute)


export default router;
