import mongoose from 'mongoose';

const connectDB = async () => {
  console.log('check db connection started...');
  try {
    const mongodbUri = process.env.MONGODB_URI;
    const collection = process.env.MONGODB_COLLECTION;
    await mongoose.connect(mongodbUri, { dbName: collection });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

export default connectDB;