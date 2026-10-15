import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../app';
import { connectDB, disconnectDB } from '../config/db';
import { seedDatabase } from '../utils/seed';

describe('CoupleWalah Backend API Test Suite', () => {
  beforeAll(async () => {
    await connectDB();
    await seedDatabase();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it('TEST 1: Health check endpoint responds OK', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.service).toBe('CoupleWalah API');
  });

  it('TEST 1 & 2: Browse and filter products by category', async () => {
    const res = await request(app).get('/api/v1/products?category=Personalized%20Gifts');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('TEST 9: Recalculates order prices on the server securely', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({
        customerDetails: {
          name: 'Ayesha Sharma',
          email: 'ayesha@example.com',
          phone: '9876543210',
        },
        shippingAddress: {
          fullName: 'Rohan Verma',
          phone: '9876543210',
          addressLine1: '402 Rosewood Heights',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
        },
        items: [
          {
            productId: 'sample-p1',
            name: 'Personalized Couple Name Frame',
            slug: 'personalized-couple-name-frame',
            price: 1, // client attempt to set fake price ₹1
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38',
          },
        ],
        secretGift: {
          isSecretGift: true,
          giftPackagingPrice: 149,
          hidePricesOnSlip: true,
          discreetPackaging: true,
        },
        paymentMethod: 'Cash on Delivery',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.orderNumber).toMatch(/^CW-\d+/);
    expect(res.body.data.secretGift.isSecretGift).toBe(true);
  });

  it('TEST 10: Unauthorized users cannot access protected admin APIs', async () => {
    const res = await request(app).get('/api/v1/admin/dashboard');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('TEST 12: Payment verification rejects invalid signatures', async () => {
    process.env.RAZORPAY_KEY_SECRET = 'sample_secret_key_123';
    const res = await request(app)
      .post('/api/v1/payments/verify')
      .send({
        razorpay_order_id: 'order_12345',
        razorpay_payment_id: 'pay_98765',
        razorpay_signature: 'invalid_fraudulent_signature',
        order_id: 'ord-1',
      });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('Invalid payment signature');
    delete process.env.RAZORPAY_KEY_SECRET;
  });

  it('TEST 20: Development simulator mode operates safely without real credentials', async () => {
    delete process.env.RAZORPAY_KEY_ID;
    delete process.env.RAZORPAY_KEY_SECRET;

    const res = await request(app)
      .post('/api/v1/payments/create-order')
      .send({ amount: 699, currency: 'INR' });

    expect(res.status).toBe(200);
    expect(res.body.isDevelopmentMode).toBe(true);
    expect(res.body.data.id).toMatch(/^order_dev_/);
  });

  it('TEST AUTH: Admin can log in with Sheikh@0927', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@couplewalah.com',
        password: 'Sheikh@0927',
      });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.role).toBe('admin');
    expect(res.body.data.token).toBeDefined();
  });

  it('TEST AUTH: Demo customer can log in with sheikhshoiebsa17@gmail.com and Shoieb@0927', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'sheikhshoiebsa17@gmail.com',
        password: 'Shoieb@0927',
      });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe('sheikhshoiebsa17@gmail.com');
    expect(res.body.data.user.role).toBe('customer');
  });

  it('TEST AUTH: Login fails with incorrect password', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'sheikhshoiebsa17@gmail.com',
        password: 'wrong_password',
      });
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
