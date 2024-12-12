import User from '../models/userModel.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mendapatkan data pengguna.', error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mendapatkan data pengguna.', error: error.message });
  }
};

export const saveUser = async (req, res) => {
  const { uid, email, name, photoURL, createdAt, password, ...rest } = req.body;

  try {
    let user = await User.findOne({ uid });
    if (user) {
      return res.status(200).json({ message: 'User already exists in MongoDB.', user });
    }

    user = new User({
      uid,
      email,
      name: name || '',
      photoURL: photoURL || '',
      gender: rest.gender || 'other',
      phone: rest.phone || 'N/A',
      password: password || '',
      dateOfBirth: rest.dateOfBirth || new Date(),
      createdAt,
    });

    const savedUser = await user.save();
    res.status(201).json({ message: 'User saved to MongoDB successfully.', user: savedUser });
  } catch (error) {
    console.error('Error saving user to MongoDB:', error);
    res.status(500).json({ message: 'Failed to save user to MongoDB', error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true, runValidators: true });
    if (!updatedUser) {
      console.warn(`User not found with UID: ${id}`);
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).json({ message: 'Gagal memperbarui data pengguna.', error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }
    res.status(200).json({ message: 'Pengguna berhasil dihapus.', deletedUser });
  } catch (error) {
    res.status(400).json({ message: 'Gagal menghapus pengguna.', error: error.message });
  }
};
