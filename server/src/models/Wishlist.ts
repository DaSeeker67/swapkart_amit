import mongoose, { Document, Schema, Types } from 'mongoose';

// Define the Wishlist interface
export interface IWishlist extends Document {
  user: Types.ObjectId; // Reference to the User model
  products: Types.ObjectId[]; // Array of product IDs in the wishlist
  createdAt: Date;
  updatedAt: Date;
}

// Define the Wishlist Schema
const WishlistSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // References the 'User' collection
      required: true,
      unique: true, // Ensures each user has only one wishlist
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product', // References the 'Product' collection
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Wishlist model
const Wishlist = mongoose.model<IWishlist>('Wishlist', WishlistSchema);
export default Wishlist;