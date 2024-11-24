import express from 'express';
import courseController from '../controllers/courseController.js';

const router = express.Router();

router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.post('/:courseId/materials', courseController.addMaterial);
router.put('/:courseId/materials/:materialOrder', courseController.editMaterial);
router.delete('/:courseId/materials/:materialOrder', courseController.deleteMaterial);

export default router;
