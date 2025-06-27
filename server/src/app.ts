import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoute';
import productRoutes from './routes/productRoute';
import cartRoutes from './routes/cartRoute';
import wishlistRoutes from './routes/wishlistRoute';
import { notFound, errorHandler } from './middleware/errorHandler';

const app = express(); // Initialize Express application

// Middleware setup
// Enable CORS for all origins. In a production environment, you should restrict this
// to specific origins (e.g., your frontend's URL).
app.use(cors());

// Parse incoming JSON requests. This is essential for handling request bodies.
app.use(express.json());


// Base route for the API
app.get('/api', (req, res) => {
  res.send('Flipkart Clone API is running!');
});

// Mount specific routes for different functionalities
app.use('/api/auth', authRoutes); // User authentication routes
app.use('/api/products', productRoutes); // Product related routes (e.g., search)
app.use('/api/cart', cartRoutes); // Shopping cart routes
app.use('/api/wishlist', wishlistRoutes); // Wishlist routes

// Custom error handling middleware
// This middleware catches requests to undefined routes (404 Not Found)
app.use(notFound);
// This middleware handles all other errors that occur during request processing
app.use(errorHandler);

export default app;