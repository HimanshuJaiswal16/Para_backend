const express = require('express');
const { kissanCreditVerify } = require('./kissanCreditController');
const verifyViklangPensionOtpMiddleware = require('./kissanCreditMiddleware');

const router = express.Router();

// Route to send OTP via application number and DOB
router.post('/send-kissanCredit-otp', kissanCreditVerify);

// Route to verify OTP
router.post('/verify-kissanCredit-otp', verifyViklangPensionOtpMiddleware);

module.exports = router;