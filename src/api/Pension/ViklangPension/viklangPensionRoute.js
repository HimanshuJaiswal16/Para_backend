const express = require('express');
const { viklangPensionVerify } = require('./viklangPensionController');
const verifyViklangPensionOtpMiddleware = require('./viklangPensionMiddleware');

const router = express.Router();

// Route to send OTP via application number and DOB
router.post('/send-viklangYojana-otp', viklangPensionVerify);

// Route to verify OTP
router.post('/verify-viklangYojana-otp', verifyViklangPensionOtpMiddleware);

module.exports = router;