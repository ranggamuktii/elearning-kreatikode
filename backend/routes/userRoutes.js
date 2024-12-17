// backend/routes/userRoutes.js
import express from 'express';
import { register, login, getUsers, getUserById, updateUser, deleteUser, handleUploadError } from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes (perlu token)
router.get('/', getUsers);
router.get('/:id', authenticateToken, getUserById);
router.put('/:id', upload.single('photo'), handleUploadError, updateUser);
router.delete('/:id', deleteUser);

export default router;
