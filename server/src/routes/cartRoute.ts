import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cartController'; // Import cart controllers
import { protect } from '../middleware/authMiddleware'; // Import authentication middleware

const router = express.Router(); // Create an Express router instance

// Helper to wrap async route handlers
const asyncHandler = (fn: any) => (req: express.Request, res: express.Response, next: express.NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Routes for cart management. All require authentication.
router
  .route('/')
  .get(protect, asyncHandler(getCart))   // Get the authenticated user's cart
  .post(protect, asyncHandler(addToCart)) // Add a product to the cart
  .delete(protect, asyncHandler(clearCart)); // Clear the entire cart

router
  .route('/:productId')
  .put(protect, asyncHandler(updateCartItem))    // Update the quantity of a product in the cart
  .delete(protect, asyncHandler(removeFromCart)); // Remove a specific product from the cart

export default router;