import express from 'express';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from '../controllers/wishlistContoller'; // Import wishlist controllers
import { protect } from '../middleware/authMiddleware'; // Import authentication middleware

const router = express.Router(); // Create an Express router instance

// Helper to wrap async route handlers and forward errors to Express
const asyncHandler = (fn: any) => (req: express.Request, res: express.Response, next: express.NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router
  .route('/')
  .get(protect, asyncHandler(getWishlist))   // Get the authenticated user's wishlist
  .post(protect, asyncHandler(addToWishlist)); // Add a product to the wishlist

router
  .route('/:productId')
  .delete(protect, asyncHandler(removeFromWishlist)); // Remove a specific product from the wishlist

router
  .route('/:productId')
  .delete(protect, removeFromWishlist); // Remove a specific product from the wishlist

export default router;