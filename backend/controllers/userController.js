// backend/controllers/userController.js
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwtUtils.js';

// Register controller
export const register = async (req, res) => {
  const { name, email, password, gender, phone, dateOfBirth } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email sudah terdaftar' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      gender,
      phone,
      dateOfBirth: new Date(dateOfBirth),
    });

    const savedUser = await user.save();
    const token = generateToken(savedUser);

    // Return user data without password
    const { password: _, ...userWithoutPassword } = savedUser.toObject();

    res.status(201).json({
      message: 'Registrasi berhasil',
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Gagal melakukan registrasi',
      error: error.message,
    });
  }
};

// Login controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    const token = generateToken(user);
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      message: 'Login berhasil',
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Gagal melakukan login',
      error: error.message,
    });
  }
};

// Existing controllers dengan modifikasi
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mendapatkan data pengguna', error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mendapatkan data pengguna', error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Gagal memperbarui data pengguna', error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }
    res.status(200).json({ message: 'Pengguna berhasil dihapus' });
  } catch (error) {
    res.status(400).json({ message: 'Gagal menghapus pengguna', error: error.message });
  }
};
