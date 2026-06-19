import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Connect to OctoFit MongoDB database
 * Using mongoose for ODM (Object Document Mapper)
 */
export async function connectOctoFitDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected to octofit_db successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
}

/**
 * Disconnect from MongoDB
 */
export async function disconnectOctoFitDB() {
  try {
    await mongoose.disconnect();
    console.log('📴 MongoDB connection closed');
  } catch (error) {
    console.error('❌ Failed to disconnect from MongoDB:', error);
    process.exit(1);
  }
}

/**
 * Get mongoose instance for advanced operations
 */
export function getMongooseInstance() {
  return mongoose;
}
