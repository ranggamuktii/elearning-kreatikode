import express from 'express';
import { getProgress, markMaterialComplete, getProgressOverview, createUser } from '../controllers/progressController.js';

const router = express.Router();

// Rute untuk mendapatkan Ringkasan Progress harus diletakkan terlebih dahulu
router.get('/progress/overview', getProgressOverview);

// Rute untuk mendapatkan Progress berdasarkan courseId
router.get('/progress/:courseId', getProgress);

// Menandai Materi Selesai
router.post('/progress/:courseId/material/:materialId', markMaterialComplete);

// Menambahkan User Baru
router.post('/users', createUser);

router.get('/', (req, res) => {
  res.send('Welcome to the API');
});

export default router;
