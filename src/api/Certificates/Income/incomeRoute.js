const express = require('express');
const { sendIncomeOtp } = require('./incomeController');  // Importing sendOtp controller
const verifyIncomeMiddleware = require('./incomeMiddleware'); // Optional middleware

const router = express.Router();

// Route for sending OTP
router.post('/send-income-otp', sendIncomeOtp);

// Route for verifying OTP (optional middleware for verifying OTP)
router.post('/verify-income-otp', verifyIncomeMiddleware, (req, res) => {
  res.status(200).json({ message: 'OTP verified successfully!' });
});

module.exports = router;
