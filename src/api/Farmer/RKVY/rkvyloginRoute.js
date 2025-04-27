const express = require('express');
const { rkvyloginVerify } = require('./rkvyloginController');
const rkvyloginVerifyOtp = require('./rkvyloginMiddleware');

const router = express.Router();

// Route to send OTP via application number and DOB
router.post('/send-rkvylogin-otp', rkvyloginVerify);

// Route to verify OTP
router.post('/verify-rkvylogin-otp', rkvyloginVerifyOtp);

module.exports = router;