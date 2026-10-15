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
    if (process.env.NODE_ENV === 'production' && !uri) {
      console.warn('[CoupleWalah DB] Note: No external MONGODB_URI provided in production. Server will run with resilient local mock data.');
      return;
    }
    console.log('[CoupleWalah DB] Starting local in-memory MongoDB instance...');
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    mongod = await MongoMemoryServer.create();
    const memoryUri = mongod.getUri();
    await mongoose.connect(memoryUri);
    console.log(`[CoupleWalah DB] In-memory MongoDB connected successfully at: ${memoryUri}`);
  } catch (memoryErr: any) {
    console.warn(`[CoupleWalah DB] In-memory database initialization notice: ${memoryErr?.message || memoryErr}. Please configure MONGODB_URI for production persistence.`);
  }
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
  if (mongod) {
    await mongod.stop();
  }
}
