import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User'; // Import User model and interface
import AppError from '../utils/appError'; // Import custom error class
import Cart from '../models/Cart'; // Import Cart model to create one for new user
import Wishlist from '../models/Wishlist'; // Import Wishlist model to create one for new user

/**
 * Generates a JWT token for a given user ID.
 * @param id - The user's ID.
 * @returns A JWT string.
 */
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '1d', // Token expires in 1 day
  });
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, phone } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !password) {
    return next(new AppError('Please enter all required fields: name, email, password', 400));
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new AppError('User with this email already exists', 400));
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      phone,
    });

    // Create an empty cart and wishlist for the new user
    await Cart.create({ user: user._id, items: [] });
    await Wishlist.create({ user: user._id, products: [] });

    // Respond with user data and token
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token: generateToken(user._id!.toString()),
    });
  } catch (error) {
    next(error); // Pass any Mongoose or other errors to error handling middleware
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return next(new AppError('Please enter email and password', 400));
  }

  try {
    // Find user by email, explicitly include password as it's selected false by default
    const user = await User.findOne({ email }).select('+password');

    // Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
      res.json({
        message: 'Logged in successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
        token: generateToken(user._id!.toString()),
      });
    } else {
      return next(new AppError('Invalid credentials', 401));
    }
  } catch (error) {
    next(error); // Pass errors to error handling middleware
  }
};

/**
 * @desc    Get user profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // req.user.id is set by the protect middleware
    const user = await User.findById(req.user!.id).select('-password'); // Exclude password

    if (user) {
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } else {
      return next(new AppError('User not found', 404));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user!.id).select('+password'); // Select password to allow hashing if updated

    if (user) {
      // Update fields if provided in the request body
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;

      // Only update password if a new one is provided
      if (req.body.password) {
        user.password = req.body.password; // Mongoose pre-save hook will hash this
      }

      const updatedUser = await user.save(); // Save the updated user

      res.json({
        message: 'Profile updated successfully',
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
        },
        token: generateToken(updatedUser._id!.toString()), // Generate new token if email changed (optional)
      });
    } else {
      return next(new AppError('User not found', 404));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Logout user (client-side token removal)
 * @route   POST /api/auth/logout
 * @access  Private
 *
 * This backend endpoint simply acknowledges the logout,
 * but the actual token removal happens on the client side
 * as JWTs are stateless.
 */
const logoutUser = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Logged out successfully (client should clear token)' });
};


export {
  registerUser,
  loginUser,
  getUserProfile,
  updateProfile,
  logoutUser,
};