import express from 'express';
import { searchProducts, getProductById, addProduct } from '../controllers/productController'; // Import all product controllers

const router = express.Router(); // Create an Express router instance

const asyncHandler = (fn: any) => (req: express.Request, res: express.Response, next: express.NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Public route for product search
// GET /api/products/search
router.get('/search', searchProducts);

// Public route to get a single product by ID
// GET /api/products/:id
router.get('/:id', asyncHandler(getProductById));

// Private route to add a new product (assuming authentication/authorization middleware will be added here later)
// POST /api/products
router.post('/', asyncHandler(addProduct));

export default router;
