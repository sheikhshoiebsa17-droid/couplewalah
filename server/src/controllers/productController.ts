import { Request, Response } from 'express';
import { Product } from '../models/Product';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const {
      q,
      category,
      recipient,
      occasion,
      personalizable,
      minPrice,
      maxPrice,
      sort = 'featured',
      page = 1,
      limit = 24,
    } = req.query;

    const filter: any = { isActive: true };

    if (q) {
      filter.$or = [
        { name: { $regex: q as string, $options: 'i' } },
        { description: { $regex: q as string, $options: 'i' } },
        { categories: { $regex: q as string, $options: 'i' } },
      ];
    }

    if (category && category !== 'all') {
      filter.categories = { $regex: category as string, $options: 'i' };
    }

    if (recipient && recipient !== 'all') {
      filter.recipient = { $in: [recipient, 'Couple', 'Both'] };
    }

    if (occasion && occasion !== 'all') {
      filter.occasions = { $regex: occasion as string, $options: 'i' };
    }

    if (personalizable === 'yes') {
      filter.isPersonalizable = true;
    } else if (personalizable === 'no') {
      filter.isPersonalizable = false;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sortOptions: any = {};
    if (sort === 'price-low') sortOptions.price = 1;
    else if (sort === 'price-high') sortOptions.price = -1;
    else if (sort === 'rating') sortOptions.rating = -1;
    else if (sort === 'newest') sortOptions.createdAt = -1;
    else sortOptions.isFeatured = -1;

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      data: products,
      meta: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug, isActive: true });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }
    res.json({ success: true, data: product });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
