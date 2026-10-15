import { Request, Response } from 'express';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { Coupon } from '../models/Reminder';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export const createOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      customerDetails,
      shippingAddress,
      billingAddress,
      items,
      secretGift,
      couponCode,
      paymentMethod,
    } = req.body;

    if (!items || !items.length || !customerDetails || !shippingAddress) {
      return res.status(400).json({ success: false, message: 'Invalid order payload.' });
    }

    // Recalculate trusted price on server
    let calculatedSubtotal = 0;
    const verifiedItems = [];

    for (const item of items) {
      const dbProduct = await Product.findById(item.productId).catch(() => null);
      const unitPrice = dbProduct ? dbProduct.price : item.price;
      const qty = Math.max(1, Number(item.quantity) || 1);

      calculatedSubtotal += unitPrice * qty;

      verifiedItems.push({
        productId: item.productId,
        name: dbProduct ? dbProduct.name : item.name,
        slug: dbProduct ? dbProduct.slug : item.slug,
        price: unitPrice,
        quantity: qty,
        image: item.image,
        selectedVariants: item.selectedVariants,
        isPersonalized: item.isPersonalized,
        personalizationValues: item.personalizationValues,
      });

      // Update inventory safely
      if (dbProduct && dbProduct.stock >= qty) {
        dbProduct.stock -= qty;
        await dbProduct.save();
      }
    }

    const deliveryFee = calculatedSubtotal >= 999 ? 0 : 79;
    const packagingFee = secretGift?.isSecretGift ? 149 : 0;

    let discountAmount = 0;
    if (couponCode) {
      if (couponCode.toUpperCase() === 'LOVE10') {
        discountAmount = Math.round(calculatedSubtotal * 0.1);
      } else if (couponCode.toUpperCase() === 'COUPLE100' && calculatedSubtotal >= 500) {
        discountAmount = 100;
      }
    }

    const totalAmount = Math.max(0, calculatedSubtotal - discountAmount + deliveryFee + packagingFee);

    const orderNumber = `CW-${Math.floor(100000 + Math.random() * 900000)}`;

    const order = await Order.create({
      orderNumber,
      userId: req.user?._id,
      customerDetails,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      items: verifiedItems,
      secretGift,
      subtotal: calculatedSubtotal,
      discountAmount,
      couponCode,
      deliveryFee,
      packagingFee,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      orderStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Payment Confirmed',
      timeline: [
        {
          status: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Payment Confirmed',
          timestamp: new Date(),
          note: `Order registered via ${paymentMethod}.`,
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully.',
      data: order,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getMyOrders = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const orders = await Order.find({
      $or: [{ userId: req.user?._id }, { 'customerDetails.email': req.user?.email }],
    }).sort({ createdAt: -1 });

    res.json({ success: true, data: orders });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getOrderById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({
      $or: [{ _id: id }, { orderNumber: id }],
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    res.json({ success: true, data: order });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
