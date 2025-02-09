import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: null,
  },
  phone: {
    type: String,
    default: null,
  },
  dateOfBirth: {
    type: Date,
    default: null,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  verificationTokenExpires: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('User', userSchema);
