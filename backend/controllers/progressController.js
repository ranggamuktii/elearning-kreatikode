import mongoose from 'mongoose';
import Progress from '../models/progressModel.js';
import User from '../models/userModel.js';
import Course from '../models/courseModel.js';

// Menambahkan User Baru
export const createUser = async (req, res) => {
  try {
    const { name, email, password, photoURL, gender, phone, dateOfBirth } = req.body;

    // Periksa apakah email sudah digunakan
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Membuat pengguna baru
    const newUser = new User({
      name,
      email,
      password, // Pastikan untuk mengenkripsi password sebelum menyimpan ke database
      photoURL,
      gender,
      phone,
      dateOfBirth,
      deleted: false, // Menambahkan field deleted
    });

    // Simpan ke database
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Mendapatkan Progress Kursus
export const getProgress = async (req, res) => {
  try {
    const { courseId, userId } = req.params;

    // Mengecek apakah courseId valid
    if (!courseId) {
      return res.status(400).json({ success: false, message: 'Course ID is required' });
    }

    // Mencari progress berdasarkan courseId
    const progress = await Progress.find({ course: courseId, user: userId})
      .populate('user', 'name email gender password') // Populate user dengan field name dan email
      .populate('course', 'title description category'); // Populate course dengan field title dan description

      if (!progress) {
        return res.status(200).json({ data: null });
      }

    // Mengirimkan response
    res.json({ success: true, data: progress });
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Menandai Materi Selesai
export const markMaterialComplete = async (req, res) => {
  try {
    const { courseId, materialId, userId } = req.params;
    // const { userId } = req.body; // Asumsi body mengirimkan userId

    // Validasi apakah courseId dan materialId adalah ObjectId yang valid
    if (!mongoose.Types.ObjectId.isValid(courseId) || !mongoose.Types.ObjectId.isValid(materialId)) {
      return res.status(400).json({ message: 'Invalid courseId or materialId' });
    }

    // Cek apakah progress untuk course dan user sudah ada
    let progress = await Progress.findOne({ course: courseId, user: userId });

    if (!progress) {
      progress = new Progress({
        user: userId,
        course: courseId,
        completedMaterials: [],
        lastAccessedMaterial: materialId,
      });
    }

    // Menandai materi sebagai selesai jika belum
    if (!progress.completedMaterials.includes(materialId)) {
      progress.completedMaterials.push(materialId);
      progress.lastAccessedMaterial = materialId;
      await progress.save();
      return res.status(200).json({ message: 'Material marked as completed', progress });
    }

    res.status(400).json({ message: 'Material already completed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProgressOverview = async (req, res) => {
  try {
    const progressOverview = await Progress.find().populate('user', 'name email gender password').populate('course', 'title description category');

    if (progressOverview.length === 0) {
      return res.status(404).json({ message: 'No progress data found' });
    }

    res.status(200).json({ progressOverview: progressOverview });
  } catch (error) {
    console.error('Error getting progress overview:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getCoursesWithProgressByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    const progress = await Progress.find({ user: userId }).populate('course');

    if (progress.length === 0) {
      return res.status(404).json({ message: 'No progress data found for this user' });
    }

    const coursesWithProgress = progress.map(entry => entry.course);
    const uniqueCourses = Array.from(new Set(coursesWithProgress.map(course => course._id)))
      .map(id => {
        return coursesWithProgress.find(course => course._id.equals(id));
      });

    res.status(200).json(uniqueCourses);
  } catch (error) {
    console.error('Error fetching courses with progress by userId:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const addQuizScore = async (req, res) => {
  try {
    const { courseId, userId } = req.params;
    const { score } = req.body;
    if (!mongoose.Types.ObjectId.isValid(courseId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid courseId or userId' });
    }
    let progress = await Progress.findOneAndUpdate({ course: courseId, user: userId }, {
      quizScore: score,
      quizCompleted: true,
      updatedAt: Date.now()
    });

    await progress.save();

    res.status(200).json({ message: 'Quiz score added successfully', progress });
  } catch (error) {
    console.error('Error adding quiz score:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
