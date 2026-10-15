import { connectDB, disconnectDB } from '../config/db';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { Coupon } from '../models/Reminder';

const SEED_PRODUCTS = [
  {
    name: 'Personalized Couple Name Frame',
    slug: 'personalized-couple-name-frame',
    description: 'A timeless minimalist wooden shadow box frame intricately engraved with both of your names, an established date, and an optional personalized vow or message.',
    shortDescription: 'Custom engraved oak frame with couple names and special anniversary date.',
    price: 699,
    compareAtPrice: 999,
    discountPercentage: 30,
    sku: 'CW-FRM-001',
    stock: 45,
    categories: ['Personalized Gifts', 'Photo Frames', 'Anniversary Gifts'],
    occasions: ['Anniversary', 'Wedding', 'First Date', 'Valentine\'s Day'],
    recipient: ['Couple', 'Him', 'Her'],
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80',
    ],
    isPersonalizable: true,
    rating: 4.9,
    numReviews: 84,
    isFeatured: true,
    isActive: true,
  },
  {
    name: 'Matching Magnetic Heart Couple Bracelets',
    slug: 'matching-couple-bracelets',
    description: 'Crafted with premium matte agate stone beads and a magnetic half-heart charm that clicks together magnetically whenever you hold hands.',
    shortDescription: 'Dual stone bracelets with magnetic mutual attraction charm.',
    price: 499,
    compareAtPrice: 799,
    discountPercentage: 38,
    sku: 'CW-BRC-002',
    stock: 60,
    categories: ['Matching Bracelets', 'Long-Distance Gifts', 'Gifts Under ₹499'],
    occasions: ['Birthday', 'Anniversary', 'Valentine\'s Day', 'Just Because'],
    recipient: ['Couple', 'Him', 'Her'],
    images: [
      'https://images.unsplash.com/photo-1611591475152-47e2566d2169?auto=format&fit=crop&w=900&q=80',
    ],
    isPersonalizable: false,
    rating: 4.8,
    numReviews: 62,
    isFeatured: true,
    isActive: true,
  },
  {
    name: 'Custom 3D Acrylic Photo Lamp',
    slug: 'custom-photo-lamp',
    description: 'Transform your favourite couple photo into a radiant, warm-glowing 3D illusion night lamp with solid beech wood base.',
    shortDescription: 'Laser engraved photo lamp with warm romantic glow on wooden base.',
    price: 999,
    compareAtPrice: 1499,
    discountPercentage: 33,
    sku: 'CW-LMP-003',
    stock: 30,
    categories: ['Custom Photo Gifts', 'Personalized Gifts', 'Anniversary Gifts'],
    occasions: ['Anniversary', 'Birthday', 'Valentine\'s Day'],
    recipient: ['Couple', 'Her', 'Him'],
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=80',
    ],
    isPersonalizable: true,
    rating: 4.9,
    numReviews: 110,
    isFeatured: true,
    isActive: true,
  },
  {
    name: 'Couple Initial Engraved Adjustable Rings',
    slug: 'couple-initial-rings',
    description: 'Sterling silver matching bands custom engraved with each other’s initials.',
    price: 799,
    compareAtPrice: 1199,
    discountPercentage: 33,
    sku: 'CW-RNG-004',
    stock: 40,
    categories: ['Couple Rings', 'Personalized Gifts'],
    occasions: ['Engagement', 'Anniversary'],
    recipient: ['Couple'],
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80'],
    isPersonalizable: true,
    rating: 4.7,
    numReviews: 48,
    isFeatured: true,
    isActive: true,
  },
  {
    name: 'Personalized Love Letter Vintage Wooden Box',
    slug: 'personalized-love-letter-box',
    description: 'Antique stained wooden treasure box carrying your personalized wax-sealed parchment love letter.',
    price: 399,
    compareAtPrice: 599,
    discountPercentage: 33,
    sku: 'CW-LTR-005',
    stock: 50,
    categories: ['Personalized Gifts', 'Gifts Under ₹499'],
    occasions: ['Anniversary', 'Just Because'],
    recipient: ['Her', 'Him'],
    images: ['https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=900&q=80'],
    isPersonalizable: true,
    rating: 4.8,
    numReviews: 39,
    isFeatured: false,
    isActive: true,
  },
];

export async function seedDatabase() {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('Seeding initial products into database...');
      await Product.insertMany(SEED_PRODUCTS);
    } else {
      console.log(`Database already has ${count} products. Preserving catalog.`);
    }

    // Ensure Admin User with requested password
    const adminUser = await User.findOne({ email: 'admin@couplewalah.com' });
    if (!adminUser) {
      await User.create({
        name: 'Staff Administrator',
        email: 'admin@couplewalah.com',
        password: 'Sheikh@0927',
        role: 'admin',
      });
      console.log('Created default admin: admin@couplewalah.com / Sheikh@0927');
    } else {
      adminUser.password = 'Sheikh@0927';
      await adminUser.save();
      console.log('Updated admin password: admin@couplewalah.com / Sheikh@0927');
    }

    // Ensure Demo Customer User with requested email & password
    const demoCust = await User.findOne({ email: 'sheikhshoiebsa17@gmail.com' });
    if (!demoCust) {
      // Check if previous ayesha exists and migrate or create new
      const oldCust = await User.findOne({ email: 'ayesha@example.com' });
      if (oldCust) {
        oldCust.name = 'Sheikh Shoieb Ahamad';
        oldCust.email = 'sheikhshoiebsa17@gmail.com';
        oldCust.password = 'Shoieb@0927';
        await oldCust.save();
        console.log('Updated customer account to: sheikhshoiebsa17@gmail.com / Shoieb@0927');
      } else {
        await User.create({
          name: 'Sheikh Shoieb Ahamad',
          email: 'sheikhshoiebsa17@gmail.com',
          password: 'Shoieb@0927',
          phone: '9876543210',
          role: 'customer',
        });
        console.log('Created demo customer: sheikhshoiebsa17@gmail.com / Shoieb@0927');
      }
    } else {
      demoCust.name = 'Sheikh Shoieb Ahamad';
      demoCust.password = 'Shoieb@0927';
      await demoCust.save();
      console.log('Updated demo customer password: sheikhshoiebsa17@gmail.com / Shoieb@0927');
    }

    // Seed Coupons
    const couponCount = await Coupon.countDocuments();
    if (couponCount === 0) {
      await Coupon.create([
        {
          code: 'LOVE10',
          discountType: 'percentage',
          discountValue: 10,
          minOrderValue: 0,
          expiresAt: new Date('2026-12-31'),
          isActive: true,
        },
        {
          code: 'COUPLE100',
          discountType: 'fixed',
          discountValue: 100,
          minOrderValue: 500,
          expiresAt: new Date('2026-12-31'),
          isActive: true,
        },
      ]);
      console.log('Seeded LOVE10 and COUPLE100 coupons.');
    }

    console.log('Database seeding complete!');
  } catch (err) {
    console.error('Seeding error:', err);
  }
}

if (require.main === module) {
  (async () => {
    await connectDB();
    await seedDatabase();
    await disconnectDB();
    process.exit(0);
  })();
}
