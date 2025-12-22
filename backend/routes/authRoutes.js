// routes/authRoutes.js
const express = require('express');
const {
  registerUser,
  loginUser,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
// router.post('/logout', protect, logoutUser);
// router.get('/profile', protect, getUserProfile);

module.exports = router;