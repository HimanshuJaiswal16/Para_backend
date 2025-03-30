const db = require('../config/database');
const otpGenerator = require('otp-generator');
const axios = require('axios');

const sendIncomeOtp = async (req, res) => {
  const { mobile_number } = req.body;

  try {
    // Find user
    const [users] = await db.query(
      'SELECT * FROM users WHERE mobile = ?',
      [mobile_number]
    );

    if (users.length === 0) {
      return res.status(400).json({ message: 'Mobile number not registered.' });
    }

    // Generate OTP (6 digits, numeric)
    const otp = otpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

    // Store OTP in the database with an expiration time (5 minutes from now)
    const expirationTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiration
    await db.query('INSERT INTO otp_requests (mobile_number, otp, expires_at) VALUES (?, ?, ?)', [mobile_number, otp, expirationTime]);


    // const response = await axios.post(
    //   `http://sms.paragalaxy.com/smpp_api/sms?token=0e396ff2ce9d865fff42aefcd3b71def&To=${mobile_number}&Text=Your%20verification%20code%20is%20${otp}.%20Please%20enter%20OTP%20to%20confirm%20mobile%20number.%20PARAHIT%20REALTY%20PRIVATE%20LIMITED&tid=1607100000000341418`  
    // );

    // Respond with success message
    res.status(200).json({ 
      message: 'OTP sent successfully',
      otp: otp,
    //   response: response
     });
  } catch (error) {
    console.error('Error processing OTP request:', error);
    res.status(500).json({ message: 'An error occurred while processing the OTP request.' });
  }
};

module.exports = {
    sendIncomeOtp,
};
