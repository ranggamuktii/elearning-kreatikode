import express from 'express';
import { getAllNotifications, getNotificationById, createNotification, updateNotification,  } from '../controllers/notificationController.js';

const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const auth = require('../middlewares/authMiddleware');

router.get('/notifications', auth, notificationController.getUserNotifications);

module.exports = router;