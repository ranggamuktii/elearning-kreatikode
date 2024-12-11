import express from 'express';
import { addMaterial, deleteMaterial, editMaterial, getAllCourses, getCourseById } from '../controllers/materialController.js';

const router = express.Router();

router.get('/materials', getAllCourses);
router.post('/:courseId/materials', addMaterial);
router.get('/:courseId/materials', getCourseById);
router.put('/:courseId/materials/:id', editMaterial);
router.delete('/:courseId/materials/:id', deleteMaterial);

export default router;