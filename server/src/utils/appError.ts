class AppError extends Error {
  statusCode: number; // HTTP status code for the error
  status: string;     // 'fail' or 'error' indicating the nature of the error
  isOperational: boolean; // Flag to distinguish operational errors from programming errors
  errorCode?: string; // Optional custom error code

  constructor(message: string, statusCode: number, errorCode?: string) {
    super(message); // Call the parent Error class constructor with the error message

    this.statusCode = statusCode;
    // Determine status based on statusCode: 'fail' for 4xx errors, 'error' for 5xx errors
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // Mark as an operational error
    this.errorCode = errorCode; // Set optional custom error code

    // Capture the stack trace, excluding the constructor call itself
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;