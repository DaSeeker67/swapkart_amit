import { Request, Response, NextFunction } from 'express';
import Wishlist from '../models/Wishlist'; // Import Wishlist model
import Product from '../models/Product'; // Import Product model for validation
import AppError from '../utils/appError'; // Import custom error class
import { Types } from 'mongoose'; // For ObjectId handling

/**
 * @desc    Get user's wishlist
 * @route   GET /api/wishlist
 * @access  Private
 */
const getWishlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Find the wishlist for the authenticated user and populate product details
    const wishlist = await Wishlist.findOne({ user: req.user!.id }).populate(
      'products' // Populate the actual product documents
    );

    // If wishlist doesn't exist, return an empty array
    if (!wishlist) {
      return res.json([]);
    }

    res.json(wishlist.products); // Return the products in the wishlist
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add product to wishlist
 * @route   POST /api/wishlist
 * @access  Private
 */
const addToWishlist = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.body;

  // Basic validation
  if (!productId) {
    return next(new AppError('Product ID is required', 400));
  }
  if (!Types.ObjectId.isValid(productId)) {
    return next(new AppError('Invalid productId format', 400));
  }

  try {
    // Check if product exists
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return next(new AppError('Product not found', 404));
    }

    // Find the user's wishlist
    let wishlist = await Wishlist.findOne({ user: req.user!.id });

    // If no wishlist exists for the user, create a new one
    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user!.id,
        products: [],
      });
    }

    // Check if the product is already in the wishlist
    if (wishlist.products.includes(new Types.ObjectId(productId))) {
      return next(new AppError('Product already in wishlist', 400));
    }

    // Add product to the wishlist
    wishlist.products.push(new Types.ObjectId(productId));
    await wishlist.save(); // Save the updated wishlist

    // Populate the product details before sending the response
    const updatedWishlist = await wishlist.populate('products');

    res.status(200).json(updatedWishlist.products); // Return the updated list of wishlist products
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Remove product from wishlist
 * @route   DELETE /api/wishlist/:productId
 * @access  Private
 */
const removeFromWishlist = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params;

  if (!Types.ObjectId.isValid(productId)) {
    return next(new AppError('Invalid productId format', 400));
  }

  try {
    const wishlist = await Wishlist.findOne({ user: req.user!.id });
    if (!wishlist) {
      return next(new AppError('Wishlist not found for this user', 404));
    }

    // Filter out the product to be removed
    const initialLength = wishlist.products.length;
    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );

    if (wishlist.products.length === initialLength) {
      // If the length didn't change, the product was not found in the wishlist
      return next(new AppError('Product not found in wishlist', 404));
    }

    await wishlist.save(); // Save the updated wishlist

    // Populate the product details before sending the response
    const updatedWishlist = await wishlist.populate('products');

    res.status(200).json(updatedWishlist.products); // Return the updated list of wishlist products
  } catch (error) {
    next(error);
  }
};

export {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};