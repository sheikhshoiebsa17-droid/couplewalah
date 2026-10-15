import mongoose from 'mongoose';

let mongod: any = null;

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI;

  if (uri && uri.trim() !== '') {
    try {
      console.log(`[CoupleWalah DB] Connecting to MongoDB...`);
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
      console.log('[CoupleWalah DB] MongoDB connected successfully via MONGODB_URI.');
      return;
    } catch (err: any) {
      console.warn(`[CoupleWalah DB] Could not connect to external MONGODB_URI (${err.message}). Attempting in-memory fallback...`);
    }
  }

  try {
    console.log('[CoupleWalah DB] Starting local in-memory MongoDB instance...');
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    mongod = await MongoMemoryServer.create();
    const memoryUri = mongod.getUri();
    await mongoose.connect(memoryUri);
    console.log(`[CoupleWalah DB] In-memory MongoDB connected successfully at: ${memoryUri}`);
  } catch (memoryErr: any) {
    console.error('[CoupleWalah DB] In-memory MongoDB is unavailable. In production, ensure MONGODB_URI is set with a valid MongoDB Atlas connection string.');
    throw memoryErr;
  }
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
  if (mongod) {
    await mongod.stop();
  }
}
