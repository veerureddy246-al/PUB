import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return true;
  
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/1522_mumbai';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    isConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[Database] MongoDB local instance not reachable (${error.message}). Falling back to in-memory resilient state store.`);
    return false;
  }
};

export const getDBStatus = () => isConnected;
