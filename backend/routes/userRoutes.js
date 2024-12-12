import express from 'express';
import { getUsers, getUserById, saveUser, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', saveUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
