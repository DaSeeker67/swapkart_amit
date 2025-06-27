import mongoose, { Document, Schema } from 'mongoose';

// Define the Product interface
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  brand: string;
  rating: number; // Avg rating
  numReviews: number;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Product Schema
const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true, // Removes whitespace from both ends of a string
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'], // Minimum value for price
    },
    imageUrl: {
      type: String,
      required: [true, 'Product image URL is required'],
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
    },
    brand: {
      type: String,
      required: [true, 'Product brand is required'],
    },
    rating: {
      type: Number,
      default: 0, // Default rating if none provided
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot be more than 5'],
    },
    numReviews: {
      type: Number,
      default: 0, // Default number of reviews
      min: [0, 'Number of reviews cannot be negative'],
    },
    inStock: {
      type: Boolean,
      default: true, // Products are in stock by default
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Product model
const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;