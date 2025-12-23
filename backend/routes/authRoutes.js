// routes/authRoutes.js
const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
  getMe
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
console.log("before login route")
router.post('/login', loginUser);
router.post('/logout',logoutUser);
console.log("before route")
router.get('/me', protect,getMe);

// Protected routes
// router.post('/logout', protect, logoutUser);
// router.get('/profile', protect, getUserProfile);

module.exports = router;