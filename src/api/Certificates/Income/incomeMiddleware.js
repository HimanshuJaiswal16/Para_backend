const db = require('../../../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const verifyIncomeMiddleware = async (req, res, next) => {
  const { mobile_number, otp } = req.body;


  if (!mobile_number || !otp) {
    return res.status(400).json({ message: 'Mobile number and OTP are required.' });
  }

  try {

    const [users] = await db.query(
      'SELECT * FROM users WHERE mobile = ?',
      [mobile_number]
    );


    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }

    // next();
    const user = users[0];

    // const token = jwt.sign(
    //    { id: user.user_id, mobile_number },
    //    process.env.JWT_SECRET || 'your-secret-key'
    //  );
 
    res.status(200).json({
      message: 'OTP verified successfully!',
    //   token: token,
    //   user_id: user.user_id
    });
  } catch (error) {
    console.error('Error while verifying OTP:', error);
    return res.status(500).json({ message: 'An error occurred while verifying OTP.' });
  }
};

module.exports = verifyIncomeMiddleware;
