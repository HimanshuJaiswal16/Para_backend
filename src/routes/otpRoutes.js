const express = require('express');
const { sendOtp } = require('../controllers/otpController');  // Importing sendOtp controller
const verifyOtpMiddleware = require('../middlewares/verifyOtpMiddleware'); // Optional middleware

const router = express.Router();

// Route for sending OTP
router.post('/send-otp', sendOtp);

// Route for verifying OTP (optional middleware for verifying OTP)
router.post('/verify-otp', verifyOtpMiddleware, (req, res) => {
  res.status(200).json({ message: 'OTP verified successfully!' });
});

module.exports = router;
