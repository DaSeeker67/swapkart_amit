import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError'; // Import the custom AppError class

/**
 * Middleware for handling 404 Not Found errors.
 * If a request reaches this middleware, it means no other route handler
 * has responded, thus the requested resource was not found.
 */
const notFound = (req: Request, res: Response, next: NextFunction) => {
  // Create an error object for 404 with a specific message
  const error = new AppError(`Not Found - ${req.originalUrl}`, 404);
  res.status(404); // Set response status to 404
  next(error); // Pass the error to the next error handling middleware
};

/**
 * Global error handling middleware.
 * This catches all errors passed via `next(error)` from other middlewares or routes.
 */
const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  // Determine the status code: use the error's statusCode or default to 500 (Internal Server Error)
  const statusCode = err.statusCode === 200 ? 500 : err.statusCode || 500;
  res.status(statusCode); // Set the response status

  // Send a JSON response with the error message and stack trace (in development)
  res.json({
    message: err.message, // The error message
    // Include stack trace only if in development mode
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    // Add an optional error code if it exists on the AppError object
    errorCode: err.errorCode || 'SERVER_ERROR',
  });
};

export { notFound, errorHandler }; // Export the error handling middlewares
