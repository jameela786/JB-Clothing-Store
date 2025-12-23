// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');

// Protect routes - Check if user is authenticated
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // ✅ Check Authorization header FIRST (more reliable for SPAs)
  if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
  ) {
      token = req.headers.authorization.split(' ')[1];
  }
  // Fallback to cookies
  else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
  }

  // Check if token exists
  if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token provided');
  }

  try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded); // Debug log

      // Get user from token (exclude password)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
          res.status(404);
          throw new Error('User not found');
      }

      console.log('Authenticated user:', req.user._id); // Debug log
      next();
  } catch (error) {
      console.error('Token verification error:', error.message);
      res.status(401);
      throw new Error('Not authorized, invalid token');
  }
});

// Admin middleware - Check if user is admin
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as admin');
  }
};

module.exports = { protect, admin };