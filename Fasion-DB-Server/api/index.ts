import mongoose from 'mongoose';
import app from '../src/app';
import config from '../src/app/config';

// Connect to database if not connected
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(config.db_url as string);
};

export default async (req: any, res: any) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error('Error in Vercel handler:', error);
    res.status(500).send('Internal Server Error during connection');
  }
};
