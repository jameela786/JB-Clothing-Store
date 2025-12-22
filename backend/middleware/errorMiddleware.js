// middlewares/errorMiddleware.js

// Not Found Middleware
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  // Error Handler Middleware
  const errorHandler = (err, req, res, next) => {
    // Status code: if status is 200 (OK), change to 500 (Server Error)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
      success: false,
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
  };
  
  module.exports = { notFound, errorHandler };