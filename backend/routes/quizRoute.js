import express from 'express';
import quizController from '../controllers/quizController.js';

const router = express.Router();

router.post('/:courseId/quiz', quizController.createQuiz);
router.get('/:courseId/quiz', quizController.getQuizzesByCourseId);
router.put('/:courseId/quiz/edit', quizController.updateQuiz);
router.delete('/:courseId/quiz', quizController.deleteQuiz);
router.delete('/:courseId/quiz/questions/:questionId', quizController.deleteQuestion);


export default router;
