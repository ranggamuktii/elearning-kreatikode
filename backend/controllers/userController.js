import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwtUtils.js';
import fs from 'fs';
import path from 'path';
import { randomBytes } from 'crypto';
import { sendVerificationEmail } from '../utils/emailUtils.js';

export const register = async (req, res) => {
  const { name, email, password, gender, phone, dateOfBirth } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email sudah terdaftar' });
    }

    const verificationToken = randomBytes(32).toString('hex');
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      gender,
      phone,
      dateOfBirth: new Date(dateOfBirth),
      verificationToken,
      verificationTokenExpires,
      isEmailVerified: false,
    });

    const savedUser = await user.save();
    const token = generateToken(savedUser);

    await sendVerificationEmail(email, name, verificationToken);

    // const authToken = generateToken({ _id: user._id });

    const { password: _, ...userWithoutPassword } = savedUser.toObject();

    res.status(201).json({
      message: 'Registrasi berhasil. Silakan cek email Anda untuk verifikasi.',
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

    if (!user.isEmailVerified) {
      return res.status(403).json({
        message: 'Email belum diverifikasi. Silakan cek email Anda untuk verifikasi.',
        needsVerification: true,
      });
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

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    console.log('Received verification token:', token);

    const user = await User.findOne({ verificationToken: token });

    console.log('Found user:', user ? 'Yes' : 'No');
    console.log(user)

    if (user.isEmailVerified) {
      console.log('Email already verified');
      return res.status(200).json({
        message: 'Email sudah terverifikasi sebelumnya',
      });
    }

    if (!user) {
      return res.status(400).json({
        message: 'Token verifikasi tidak valid atau sudah kadaluarsa',
      });
    }
    
    user.isEmailVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();
    console.log('User updated successfully');

    res.json({ message: 'Email berhasil diverifikasi' });
  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan saat verifikasi email',
      error: error.message,
    });
  }
};

export const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Email tidak terdaftar' });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ message: 'Email sudah terverifikasi' });
    }

    const verificationToken = randomBytes(32).toString('hex');
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    user.verificationToken = verificationToken;
    user.verificationTokenExpires = verificationTokenExpires;
    await user.save();

    await sendVerificationEmail(email, user.name, verificationToken);

    res.json({ message: 'Email verifikasi telah dikirim ulang' });
  } catch (error) {
    res.status(500).json({
      message: 'Gagal mengirim ulang email verifikasi',
      error: error.message,
    });
  }
};

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
    let updateData = { ...req.body };

    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    if (req.file) {
      const user = await User.findById(req.params.id);
      if (user?.photoURL) {
        const oldPhotoPath = path.join('./public/thumbnail', path.basename(user.photoURL));
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      }

      updateData.photoURL = `/thumbnail/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true }).select('-password');

    if (!updatedUser) {
      if (req.file) {
        fs.unlinkSync(path.join('./public/thumbnail', req.file.filename));
      }
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }

    const newToken = generateToken(updatedUser);

    res.status(200).json({
      ...updatedUser.toObject(),
      token: newToken,
    });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(path.join('./public/thumbnail', req.file.filename));
    }
    res.status(400).json({
      message: 'Gagal memperbarui data pengguna',
      error: error.message,
    });
  }
};

export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'File terlalu besar. Maksimal ukuran file adalah 5MB',
      });
    }
    return res.status(400).json({
      message: 'Error saat upload file',
      error: err.message,
    });
  } else if (err.message === 'Only JPG, JPEG and PNG files are allowed') {
    return res.status(400).json({
      message: 'Hanya file JPG, JPEG, dan PNG yang diperbolehkan',
    });
  }
  next(err);
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
