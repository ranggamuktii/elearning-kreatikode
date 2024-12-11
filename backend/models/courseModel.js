import mongoose from 'mongoose';
const { Schema } = mongoose;

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  category: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true,
  },
  thumbnail: {
    type: String,
    // required: true,
  },
  introduction: {
    overview: {
      type: String,
      required: true,
    },
    whatWillLearn: [String],
    prerequisites: {
      type: [String],
      default: [],
    },
  },
  materials: [{
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  }, ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  deleted: {
    type: Boolean,
    default: false,
  }
});

export default mongoose.model('Course', courseSchema);
