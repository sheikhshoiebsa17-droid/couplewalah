import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  discountPercentage?: number;
  sku: string;
  stock: number;
  categories: string[];
  occasions: string[];
  recipient: ('Him' | 'Her' | 'Couple' | 'Both')[];
  images: string[];
  variants?: {
    name: string;
    options: {
      value: string;
      stock: number;
      priceModifier?: number;
      image?: string;
    }[];
  }[];
  isPersonalizable: boolean;
  personalizationSchema?: {
    fields: {
      id: string;
      label: string;
      type: string;
      required: boolean;
      maxLength?: number;
      placeholder?: string;
      options?: string[];
      additionalPrice?: number;
    }[];
  };
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  isActive: boolean;
  specifications?: Map<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    shortDescription: { type: String },
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, min: 0 },
    discountPercentage: { type: Number, min: 0, max: 100 },
    sku: { type: String, required: true, unique: true, uppercase: true },
    stock: { type: Number, required: true, default: 0, min: 0 },
    categories: [{ type: String, required: true }],
    occasions: [{ type: String }],
    recipient: [{ type: String, enum: ['Him', 'Her', 'Couple', 'Both'] }],
    images: [{ type: String, required: true }],
    variants: [
      {
        name: { type: String, required: true },
        options: [
          {
            value: { type: String, required: true },
            stock: { type: Number, required: true, default: 0 },
            priceModifier: { type: Number, default: 0 },
            image: { type: String },
          },
        ],
      },
    ],
    isPersonalizable: { type: Boolean, default: false },
    personalizationSchema: {
      fields: [
        {
          id: { type: String, required: true },
          label: { type: String, required: true },
          type: { type: String, required: true },
          required: { type: Boolean, default: false },
          maxLength: { type: Number },
          placeholder: { type: String },
          options: [{ type: String }],
          additionalPrice: { type: Number, default: 0 },
        },
      ],
    },
    rating: { type: Number, default: 5.0, min: 0, max: 5 },
    numReviews: { type: Number, default: 0, min: 0 },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    specifications: { type: Map, of: String },
  },
  { timestamps: true }
);

ProductSchema.index({ name: 'text', description: 'text', categories: 'text' });
ProductSchema.index({ price: 1 });
ProductSchema.index({ rating: -1 });

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
