import app from './app';
import { connectDB } from './config/db';
import { seedDatabase } from './utils/seed';

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`CoupleWalah API server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start CoupleWalah server:', err);
    process.exit(1);
  }
}

startServer();
