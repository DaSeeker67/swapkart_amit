import express from 'express';
import { searchProducts, getProductById, addProduct } from '../controllers/productController'; // Import all product controllers

const router = express.Router(); 

const asyncHandler = (fn: any) => (req: express.Request, res: express.Response, next: express.NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.get('/search', searchProducts);

router.get('/:id', asyncHandler(getProductById));

router.post('/', asyncHandler(addProduct));

export default router;
