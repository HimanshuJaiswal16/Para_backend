const db = require('../../../config/database');
const otpGenerator = require('otp-generator');
const axios = require('axios');

const vidwaPensionVerify = async (req, res) => {
  const { pensionScheme, registrationId, mobile, user_id } = req.body;

  if (!pensionScheme || !registrationId || !mobile) {
    return res.status(400).json({ message: 'Invalid pensionScheme, registrationId and mobile number.' });
  }

  try {
    // Find user based on application number and DOB (in UTC)
    const [users] = await db.query(
      'SELECT * FROM users WHERE user_id=?',
      [user_id]
    );

    if (users.length === 0) {
      return res.status(400).json({ message: 'No matching user found.' });
    }

    const user = users[0];

    // Generate OTP
    const otp = otpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

    // Store OTP in database
    const expirationTime = new Date(Date.now() + 5 * 60 * 1000);
    await db.query(
      'INSERT INTO otp_requests (mobile_number, otp, expires_at) VALUES (?, ?, ?)',
      [user.mobile, otp, expirationTime]
    );

    res.status(200).json({
      message: 'OTP sent successfully',
      otp: otp,  // Remove otp in production, only for testing purpose show
      mobile_number: user.mobile,
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'An error occurred while sending OTP.' });
  }
};

module.exports = {
    vidwaPensionVerify
};
