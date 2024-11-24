import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  introduction: {
    overview: { type: String, required: true },
    whatWillLearn: [{ type: String }],
    prerequisites: [{ type: String }],
    targetAudience: [{ type: String }],
    tools: [{ type: String }],
  },
  materials: [
    {
      title: { type: String, required: true },
      content: { type: String, required: true },
      order: { type: Number, required: true },
    },
  ],
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Course', courseSchema);
