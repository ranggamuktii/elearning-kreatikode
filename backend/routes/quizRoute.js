import express from 'express';
import quizController from '../controllers/quizController.js';

const router = express.Router();

router.get('/:courseId', quizController.getQuizzesByCourseId);
router.post('/:courseId', quizController.createQuiz);
router.get('/:courseId/:quizId', quizController.getQuizById);
router.put('/:courseId/:quizId', quizController.updateQuiz);
router.delete('/:courseId/:quizId', quizController.deleteQuiz);
router.delete('/:courseId/:quizId/questions/:questionId', quizController.deleteQuestion);


export default router;
