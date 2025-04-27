const express = require('express');
const { fasalBimaVerify } = require('./fasalBimaController');
const verifyFasalBimaOtpMiddleware = require('./fasalBimaMiddleware');

const router = express.Router();

// Route to send OTP via application number and DOB
router.post('/send-fasalBima-otp', fasalBimaVerify);

// Route to verify OTP
router.post('/verify-fasalBima-otp', verifyFasalBimaOtpMiddleware);

module.exports = router;