const db = require('../../../config/database');
const otpGenerator = require('otp-generator');
const axios = require('axios');

const casteCerificateVerify = async (req, res) => {
  const { application_number, date_of_birth, user_id } = req.body;

  if (!application_number || !date_of_birth) {
    return res.status(400).json({ message: 'Application number and date of birth are required.' });
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

     // const response = await axios.post(
    //   `http://sms.paragalaxy.com/smpp_api/sms?token=0e396ff2ce9d865fff42aefcd3b71def&To=${mobile_number}&Text=Your%20verification%20code%20is%20${otp}.%20Please%20enter%20OTP%20to%20confirm%20mobile%20number.%20PARAHIT%20REALTY%20PRIVATE%20LIMITED&tid=1607100000000341418`  
    // );

    // Store OTP in database
    const expirationTime = new Date(Date.now() + 5 * 60 * 1000);
    await db.query(
      'INSERT INTO otp_requests (mobile_number, otp, expires_at) VALUES (?, ?, ?)',
      [user.mobile, otp, expirationTime]
    );

    res.status(200).json({
      message: 'OTP sent successfully',
      otp: otp,  // Remove otp in production, only for testing purpose show
      mobile_number: user.mobile
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'An error occurred while sending OTP.' });
  }
};

module.exports = {
    casteCerificateVerify
};
