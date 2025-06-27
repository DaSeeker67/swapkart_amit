import mongoose, { Document, Schema, Types } from 'mongoose';

// Define the interface for a single item within the cart
export interface ICartItem {
  product: Types.ObjectId; // Reference to the Product model
  name: string; // Storing product name to avoid extra lookup for display
  price: number; // Storing price to capture price at time of adding to cart
  imageUrl: string; // Storing image URL for display
  quantity: number;
}

// Define the Cart interface
export interface ICart extends Document {
  user: Types.ObjectId; // Reference to the User model
  items: ICartItem[]; // Array of cart items
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for a single cart item
const CartItemSchema: Schema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product', // References the 'Product' collection
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'], // Minimum quantity allowed
    },
  },
  { _id: false } // Do not create an _id for subdocuments unless explicitly needed
);

// Define the Cart Schema
const CartSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // References the 'User' collection
      required: true,
      unique: true, // Ensures each user has only one cart
    },
    items: [CartItemSchema], // Array of CartItemSchema
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Cart model
const Cart = mongoose.model<ICart>('Cart', CartSchema);
export default Cart;