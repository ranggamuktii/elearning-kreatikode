import express from 'express';
import { getAllComments, getCommentById, createComment, updateComment, deleteComment } from '../controllers/commentController.js';

const router = express.Router();

router.get('/:courseId/comments', getAllComments);
router.get('/:courseId/comments/:id', getCommentById);
router.post('/:courseId/comments', createComment);
router.put('/:courseId/comments/:id', updateComment);
router.delete('/:courseId/comments/:id', deleteComment);

export default router;
