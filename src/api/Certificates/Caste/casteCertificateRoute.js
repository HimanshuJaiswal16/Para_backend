const express = require('express');
const { casteCerificateVerify } = require('./casteCertificateController');
const verifyCasteCertificateOtpMiddleware = require('./casteCertificateMiddleWare');

const router = express.Router();

// Route to send OTP via application number and DOB
router.post('/send-casteCertificate-otp', casteCerificateVerify);

// Route to verify OTP
router.post('/verify-casteCertificate-otp', verifyCasteCertificateOtpMiddleware);

module.exports = router;