import app from './app';
import { connectDB } from './config/db';
import { seedDatabase } from './utils/seed';

const PORT = Number(process.env.PORT) || 5000;

async function startServer() {
  try {
    await connectDB();
    await seedDatabase();
  } catch (err: any) {
    console.warn(`[CoupleWalah] Database initialization notice: ${err?.message || err}. Server will run and serve storefront.`);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CoupleWalah server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
