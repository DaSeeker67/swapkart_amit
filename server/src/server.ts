import app from './app';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 5000; // Default to 5000 if PORT not set in .env

// Connect to MongoDB
connectDB();

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access the backend at http://localhost:${PORT}`);
});