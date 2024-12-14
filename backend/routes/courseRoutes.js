import express from 'express';
import { upload } from '../middlewares/uploadMiddleware.js';
import { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse, addThumbnailToCourse, filterCourseByCategory } from '../controllers/courseController.js';

const router = express.Router();

router.get('/:id', getCourseById);
router.get('/', getAllCourses);
router.post('/', upload.single('thumbnail'), createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);
router.get('/category', filterCourseByCategory);
router.put('/:id/thumbnail', upload.single('thumbnail'), addThumbnailToCourse);

export default router;
