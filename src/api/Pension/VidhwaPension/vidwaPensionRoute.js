const express = require('express');
const { vidwaPensionVerify } = require('./vidwaPensionController');
const verifyVidwaPensionOtpMiddleware = require('./vidwaPensionMiddleware');

const router = express.Router();

// Route to send OTP via application number and DOB
router.post('/send-vidwaYojana-otp', vidwaPensionVerify);

// Route to verify OTP
router.post('/verify-vidwaYojana-otp', verifyVidwaPensionOtpMiddleware);

module.exports = router;