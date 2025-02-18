const db = require('../config/database');

const verifyOtpMiddleware = async (req, res, next) => {
  const { mobile, otp } = req.body;

  if (!mobile || !otp) {
    return res.status(400).json({ message: 'Mobile number and OTP are required.' });
  }

  try {
    const [otpRecord] = await db.query(
      'SELECT * FROM otp_requests WHERE mobile_number = ? AND otp = ? AND expires_at > NOW()',
      [mobile, otp]
    );

    if (otpRecord.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }

    next();
  } catch (error) {
    console.error('Error while verifying OTP:', error);
    return res.status(500).json({ message: 'An error occurred while verifying OTP.' });
  }
};

module.exports = verifyOtpMiddleware;
