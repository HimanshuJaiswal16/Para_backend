const db = require('../../../config/database');
const jwt = require('jsonwebtoken');

const verifyFasalBimaOtpMiddleware = async (req, res, next) => {
  const { mobile, user_id, otp } = req.body;

  if (!mobile ||!otp) {
    return res.status(400).json({ message: 'Mobile is required.' });
  }

  try {
    // Fetch user by application number and DOB
    const [users] = await db.query(
        'SELECT * FROM users WHERE user_id=?',
        [user_id]
      );

    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid mobile number.' });
    }

    const user = users[0];

    if(mobile !== user.mobile){
        return res.status(400).json({ message: 'Entered Number is not registered' });
    }

    // Verify OTP
    const [otpRecords] = await db.query(
      'SELECT * FROM otp_requests WHERE mobile_number = ? AND otp = ? AND expires_at > NOW()',
      [user.mobile, otp]
    );

    if (otpRecords.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }

    res.status(200).json({
      message: 'OTP verified successfully!',
    //   token: token,
      user_id: user.user_id
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'An error occurred while verifying OTP.' });
  }
};

module.exports = verifyFasalBimaOtpMiddleware;
