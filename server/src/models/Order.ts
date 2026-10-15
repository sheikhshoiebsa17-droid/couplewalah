import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  orderNumber: string;
  userId?: mongoose.Types.ObjectId;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  billingAddress?: {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: {
    productId: mongoose.Types.ObjectId | string;
    name: string;
    slug: string;
    price: number;
    quantity: number;
    image: string;
    selectedVariants?: Map<string, string>;
    isPersonalized?: boolean;
    personalizationValues?: {
      fieldId: string;
      label: string;
      value: string;
    }[];
  }[];
  secretGift?: {
    isSecretGift: boolean;
    giftPackagingId?: string;
    giftPackagingPrice: number;
    personalizedCardMessage?: string;
    recipientName?: string;
    recipientPhone?: string;
    deliveryInstructions?: string;
    hidePricesOnSlip: boolean;
    discreetPackaging: boolean;
  };
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  deliveryFee: number;
  packagingFee: number;
  totalAmount: number;
  paymentMethod: 'Razorpay' | 'Cash on Delivery';
  paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  paymentDetails?: {
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
    paidAt?: Date;
  };
  orderStatus:
    | 'Pending'
    | 'Payment Confirmed'
    | 'Processing'
    | 'Packed'
    | 'Shipped'
    | 'Out for Delivery'
    | 'Delivered'
    | 'Cancelled'
    | 'Return Requested'
    | 'Returned'
    | 'Refunded';
  timeline: {
    status: string;
    timestamp: Date;
    note?: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    customerDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    billingAddress: {
      fullName: { type: String },
      phone: { type: String },
      addressLine1: { type: String },
      addressLine2: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: String },
    },
    items: [
      {
        productId: { type: Schema.Types.Mixed, required: true },
        name: { type: String, required: true },
        slug: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
        image: { type: String, required: true },
        selectedVariants: { type: Map, of: String },
        isPersonalized: { type: Boolean, default: false },
        personalizationValues: [
          {
            fieldId: { type: String },
            label: { type: String },
            value: { type: String },
          },
        ],
      },
    ],
    secretGift: {
      isSecretGift: { type: Boolean, default: false },
      giftPackagingId: { type: String },
      giftPackagingPrice: { type: Number, default: 0 },
      personalizedCardMessage: { type: String },
      recipientName: { type: String },
      recipientPhone: { type: String },
      deliveryInstructions: { type: String },
      hidePricesOnSlip: { type: Boolean, default: true },
      discreetPackaging: { type: Boolean, default: true },
    },
    subtotal: { type: Number, required: true },
    discountAmount: { type: Number, default: 0 },
    couponCode: { type: String },
    deliveryFee: { type: Number, default: 0 },
    packagingFee: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['Razorpay', 'Cash on Delivery'], required: true },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
      default: 'Pending',
    },
    paymentDetails: {
      razorpayOrderId: { type: String },
      razorpayPaymentId: { type: String },
      razorpaySignature: { type: String },
      paidAt: { type: Date },
    },
    orderStatus: {
      type: String,
      enum: [
        'Pending',
        'Payment Confirmed',
        'Processing',
        'Packed',
        'Shipped',
        'Out for Delivery',
        'Delivered',
        'Cancelled',
        'Return Requested',
        'Returned',
        'Refunded',
      ],
      default: 'Pending',
    },
    timeline: [
      {
        status: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        note: { type: String },
      },
    ],
  },
  { timestamps: true }
);

OrderSchema.index({ userId: 1 });
OrderSchema.index({ 'customerDetails.email': 1 });

export const Order = mongoose.model<IOrder>('Order', OrderSchema);
