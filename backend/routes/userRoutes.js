// backend/routes/userRoutes.js
import express from 'express';
import { register, login, getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes (perlu token)
router.get('/', authenticateToken, getUsers);
router.get('/:id', authenticateToken, getUserById);
router.patch('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, deleteUser);

export default router;
