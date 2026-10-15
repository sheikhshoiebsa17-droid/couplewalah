export type Role = 'customer' | 'admin';

export interface Address {
  _id?: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  addresses?: Address[];
  wishlist?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PersonalizationField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'date' | 'image' | 'select';
  required: boolean;
  maxLength?: number;
  placeholder?: string;
  helpText?: string;
  options?: string[];
  additionalPrice?: number;
}

export interface PersonalizationSchema {
  fields: PersonalizationField[];
  previewTemplate?: string;
}

export interface PersonalizationValue {
  fieldId: string;
  label: string;
  value: string;
  additionalPrice?: number;
}

export interface ProductVariant {
  _id?: string;
  name: string; // e.g. "Size", "Color"
  options: {
    value: string;
    sku?: string;
    priceModifier?: number;
    stock: number;
    image?: string;
  }[];
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  discountPercentage?: number;
  sku: string;
  stock: number;
  categories: string[]; // category slugs or names
  occasions: string[]; // e.g. 'Anniversary', 'Birthday', 'Valentine's Day'
  recipient: ('Him' | 'Her' | 'Couple' | 'Both')[];
  images: string[];
  variants?: ProductVariant[];
  isPersonalizable: boolean;
  personalizationSchema?: PersonalizationSchema;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  isActive: boolean;
  specifications?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  isActive: boolean;
  displayOrder?: number;
}

export interface BundleItem {
  product: Product | string;
  quantity: number;
}

export interface GiftBundle {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  includedProducts: {
    productId: string;
    productName: string;
    quantity: number;
    image?: string;
  }[];
  stock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string; // unique item id (composite of productId + variants + customization hash)
  productId: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  quantity: number;
  selectedVariants?: Record<string, string>;
  isPersonalized?: boolean;
  personalizationValues?: PersonalizationValue[];
  addedAt?: string;
}

export interface PackagingOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface SecretGiftDetails {
  isSecretGift: boolean;
  giftPackagingId?: string;
  giftPackagingName?: string;
  giftPackagingPrice: number;
  personalizedCardMessage?: string;
  senderName?: string;
  recipientName: string;
  recipientPhone?: string;
  deliveryInstructions?: string;
  hidePricesOnSlip: boolean;
  discreetPackaging: boolean;
}

export interface Cart {
  items: CartItem[];
  couponCode?: string;
  discountAmount: number;
  secretGift?: SecretGiftDetails;
  subtotal: number;
  deliveryFee: number;
  packagingFee: number;
  total: number;
}

export type OrderStatus =
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

export type PaymentMethod = 'Razorpay' | 'Cash on Delivery';

export type PaymentStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded';

export interface OrderTimelineEvent {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  image: string;
  selectedVariants?: Record<string, string>;
  isPersonalized?: boolean;
  personalizationValues?: PersonalizationValue[];
}

export interface Order {
  _id: string;
  orderNumber: string;
  userId?: string;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: Address;
  billingAddress?: Address;
  items: OrderItem[];
  secretGift?: SecretGiftDetails;
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  deliveryFee: number;
  packagingFee: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentDetails?: {
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
    paidAt?: string;
  };
  orderStatus: OrderStatus;
  timeline: OrderTimelineEvent[];
  trackingNumber?: string;
  courierName?: string;
  cancelReason?: string;
  returnReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Reminder {
  _id: string;
  userId: string;
  title: string;
  occasionType: 'Birthday' | 'Anniversary' | 'First Date' | 'Engagement' | 'Other';
  eventDate: string; // ISO date string YYYY-MM-DD
  recipientName: string;
  recipientRelationship?: string;
  daysInAdvance: number; // e.g. 7 days before
  emailNotification: boolean;
  isActive: boolean;
  lastSentYear?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  title?: string;
  comment: string;
  images?: string[];
  isVerifiedPurchase: boolean;
  isApproved: boolean;
  createdAt: string;
}

export interface Coupon {
  _id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  expiresAt: string;
  usageLimit?: number;
  timesUsed: number;
  isActive: boolean;
  createdAt: string;
}

export interface GiftFinderCriteria {
  recipient: 'Boyfriend' | 'Girlfriend' | 'Husband' | 'Wife' | 'Fiancé' | 'Partner';
  occasion: 'Birthday' | 'Anniversary' | 'Wedding' | 'Engagement' | 'Valentine\'s Day' | 'Long-Distance Surprise' | 'Just Because';
  budget: '299-499' | '500-999' | '1000-1999' | '2000+';
  preferredType: 'Personalized' | 'Romantic' | 'Practical' | 'Matching Couple Gifts' | 'Photo Gifts' | 'Gift Hampers';
  interests?: string[];
}

export interface GiftFinderRecommendation {
  product: Product;
  relevanceScore: number;
  explanation: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}
