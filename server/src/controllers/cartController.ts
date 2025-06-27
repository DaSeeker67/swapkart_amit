import { Request, Response, NextFunction } from 'express';
import Cart, { ICartItem } from '../models/Cart'; // Import Cart model
import Product from '../models/Product'; // Import Product model to get product details
import AppError from '../utils/appError'; // Import custom error class
import { Types } from 'mongoose'; // For ObjectId handling

/**
 * @desc    Get user's cart
 * @route   GET /api/cart
 * @access  Private
 */
const getCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Find the cart for the authenticated user
    const cart = await Cart.findOne({ user: req.user!.id });

    // If cart doesn't exist, return an empty array (or create one, depending on preference)
    if (!cart) {
      return res.json([]);
    }

    res.json(cart.items); // Return the items in the cart
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add product to cart
 * @route   POST /api/cart
 * @access  Private
 */
const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  const { productId, quantity = 1 } = req.body;

  // Basic validation
  if (!productId || typeof quantity !== 'number' || quantity < 1) {
    return next(new AppError('Invalid productId or quantity', 400));
  }
  if (!Types.ObjectId.isValid(productId)) {
    return next(new AppError('Invalid productId format', 400));
  }

  try {
    // Find the product to get its details (name, price, imageUrl)
    const product = await Product.findById(productId);
    if (!product) {
      return next(new AppError('Product not found', 404));
    }
    if (!product.inStock && quantity > 0) {
      return next(new AppError('Product is out of stock', 400));
    }

    // Find the user's cart
    let cart = await Cart.findOne({ user: req.user!.id });

    // If no cart exists for the user, create a new one
    if (!cart) {
      cart = await Cart.create({
        user: req.user!.id,
        items: [],
      });
    }

    // Check if the item already exists in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // If item exists, update its quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // If item doesn't exist, add it to the cart
      const newItem: ICartItem = {
        product: product._id as Types.ObjectId,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: quantity,
      };
      cart.items.push(newItem);
    }

    await cart.save(); // Save the updated cart

    res.status(200).json(cart.items); // Return the updated list of cart items
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update product quantity in cart
 * @route   PUT /api/cart/:productId
 * @access  Private
 */
const updateCartItem = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  // Basic validation
  if (!productId || typeof quantity !== 'number' || quantity < 0) {
    // If quantity is 0, client should call removeFromCart, but we can handle it here too
    return next(new AppError('Invalid productId or quantity', 400));
  }
  if (!Types.ObjectId.isValid(productId)) {
    return next(new AppError('Invalid productId format', 400));
  }

  try {
    const cart = await Cart.findOne({ user: req.user!.id });
    if (!cart) {
      return next(new AppError('Cart not found for this user', 404));
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      if (quantity === 0) {
        // Remove item if quantity is set to 0
        cart.items.splice(itemIndex, 1);
      } else {
        // Update quantity
        cart.items[itemIndex].quantity = quantity;
      }
      await cart.save();
      res.status(200).json(cart.items); // Return the updated list of cart items
    } else {
      return next(new AppError('Product not found in cart', 404));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Remove product from cart
 * @route   DELETE /api/cart/:productId
 * @access  Private
 */
const removeFromCart = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params;

  if (!Types.ObjectId.isValid(productId)) {
    return next(new AppError('Invalid productId format', 400));
  }

  try {
    const cart = await Cart.findOne({ user: req.user!.id });
    if (!cart) {
      return next(new AppError('Cart not found for this user', 404));
    }

    // Filter out the item to be removed
    const initialLength = cart.items.length;
    cart.items = cart.items.filter((item) => item.product.toString() !== productId);

    if (cart.items.length === initialLength) {
      // If the length didn't change, the product was not found in the cart
      return next(new AppError('Product not found in cart', 404));
    }

    await cart.save(); // Save the updated cart

    res.status(200).json(cart.items); // Return the updated list of cart items
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Clear user's entire cart
 * @route   DELETE /api/cart
 * @access  Private
 */
const clearCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = await Cart.findOne({ user: req.user!.id });
    if (!cart) {
      return next(new AppError('Cart not found for this user', 404));
    }

    cart.items = []; // Empty the items array
    await cart.save(); // Save the cleared cart

    res.status(200).json([]); // Return an empty array
  } catch (error) {
    next(error);
  }
};

export {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};