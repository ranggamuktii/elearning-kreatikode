import Notification from "../models/notificationModel";
import User from "../models/userModel";

const Notification = require('../models/notificationModel');
const User = require('../models/userModel');

exports.createNotification = async (courseId, courseTitle) => {
    try {
      const users = await User.find({ role: 'user' });
      const notifications = users.map(user => ({
        userId: user._id,
        title: 'Course Baru Tersedia',
        message: `Course baru "${courseTitle}" telah ditambahkan!`,
        courseId: courseId
      }));
      
      await Notification.insertMany(notifications);
      io.emit('newNotification', {
        courseId,
        courseTitle
      });
      
      return true;
    } catch (error) {
      console.error('Error creating notifications:', error);
      throw error;
    }
  };
  
  exports.getUserNotifications = async (req, res) => {
    try {
      const notifications = await Notification.find({ 
        userId: req.user._id 
      })
      .sort({ createdAt: -1 })
      .limit(10);
      
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching notifications' });
    }
  };
  