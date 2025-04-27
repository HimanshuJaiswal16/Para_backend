const express = require('express');
const { characterCerificateVerify } = require('./characterCertificateController');
const verifyCharacterCertificateOtpMiddleware = require('./characterCerticateMiddleware');

const router = express.Router();

// Route to send OTP via application number and DOB
router.post('/send-characterCertificate-otp', characterCerificateVerify);

// Route to verify OTP
router.post('/verify-characterCertificate-otp', verifyCharacterCertificateOtpMiddleware);

module.exports = router;