import mongoose, { Document, Schema } from 'mongoose';

export interface IReminder extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  occasionType: 'Birthday' | 'Anniversary' | 'First Date' | 'Engagement' | 'Other';
  eventDate: Date;
  recipientName: string;
  daysInAdvance: number;
  emailNotification: boolean;
  isActive: boolean;
  lastSentYear?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ReminderSchema = new Schema<IReminder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    occasionType: {
      type: String,
      enum: ['Birthday', 'Anniversary', 'First Date', 'Engagement', 'Other'],
      default: 'Anniversary',
    },
    eventDate: { type: Date, required: true },
    recipientName: { type: String, required: true },
    daysInAdvance: { type: Number, default: 7 },
    emailNotification: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
    lastSentYear: { type: Number },
  },
  { timestamps: true }
);

export const Reminder = mongoose.model<IReminder>('Reminder', ReminderSchema);

export interface ICoupon extends Document {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  expiresAt: Date;
  usageLimit?: number;
  timesUsed: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CouponSchema = new Schema<ICoupon>(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
    discountValue: { type: Number, required: true, min: 0 },
    minOrderValue: { type: Number, default: 0, min: 0 },
    maxDiscount: { type: Number },
    expiresAt: { type: Date, required: true },
    usageLimit: { type: Number },
    timesUsed: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Coupon = mongoose.model<ICoupon>('Coupon', CouponSchema);
