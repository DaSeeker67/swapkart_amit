import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AppError from '../utils/appError';

// Extend the Express Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string; // The user's ID
      };
    }
  }
}


const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  // Check if Authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token part
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

      // Find user by ID and attach to request object (excluding password)
      // Select only the necessary fields, excluding sensitive ones like password
      req.user = { id: decoded.id };

      next(); // Proceed to the next middleware/route handler
    } catch (error) {
      // Handle various JWT errors
      if (error instanceof jwt.TokenExpiredError) {
        return next(new AppError('Token expired', 401));
      }
      if (error instanceof jwt.JsonWebTokenError) {
        return next(new AppError('Invalid token, not authorized', 401));
      }
      // Catch any other unexpected errors
      return next(new AppError('Not authorized, token failed', 401));
    }
  }

  // If no token is found in the header
  if (!token) {
    return next(new AppError('Not authorized, no token', 401));
  }
};

export { protect }