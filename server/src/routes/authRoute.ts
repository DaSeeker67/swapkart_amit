import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateProfile,
  logoutUser,
} from '../controllers/authController'; // Import authentication controllers
import { protect } from '../middleware/authMiddleware'; // Import authentication middleware

const router = express.Router(); // Create an Express router instance

// Public routes for authentication
router.post('/register', registerUser); // Route for new user registration
router.post('/login', loginUser);     // Route for user login

// Protected routes (require JWT authentication)
router
  .route('/profile')
  .get(protect, getUserProfile)  // Route to get authenticated user's profile
  .put(protect, updateProfile); // Route to update authenticated user's profile

router.post('/logout', protect, logoutUser); // Route for user logout (clears token on client)

export default router;