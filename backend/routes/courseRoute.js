import express from 'express';
import { upload } from '../middlewares/uploadMiddleware.js';
import { addThumbnailToCourse, createCourse, deleteCourse, filterCourseByCategory, getAllCourses, getCourseById, updateCourse, } from '../controllers/courseController.js';

const router = express.Router();

router.post('/', createCourse);
router.get('/', getAllCourses);
router.get('/category', filterCourseByCategory);
router.get('/:id', getCourseById);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);
router.post('/:id/thumbnail', upload.single('thumbnail'), addThumbnailToCourse)

export default router;
