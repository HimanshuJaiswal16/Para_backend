const db = require('../config/database');
const otpGenerator = require('otp-generator');
// const sendOtpViaSms = (mobile, otp) => {
//   console.log(`Sending OTP ${otp} to ${mobile}`); 
//   // You can replace this with actual SMS sending logic.
// };

const sendOtp = async (req, res) => {
  const { mobile_number } = req.body;

  // // Validate that the mobile number is a valid 10-digit Indian mobile number
  // const mobileRegex = /^[6789]\d{9}$/;
  // if (!mobile || !mobileRegex.test(mobile)) {
  //   return res.status(400).json({ message: 'Please enter a valid 10-digit Indian mobile number.' });
  // }
  

  try {
    // console.log(`Processing OTP request for mobile number: ${mobile_number}`);
    
  // Find user
  const [users] = await db.query(
    'SELECT * FROM users WHERE mobile = ?',
    [mobile_number]
  );

    console.log(users.length, "user.length")
    
    if (users.length === 0) {
      // console.log(`Mobile number ${mobile} not found in the database.`);
      return res.status(400).json({ message: 'Mobile number not registered.' });
    }

    // Generate OTP (6 digits, numeric)
    const otp = otpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    console.log(`Generated OTP: ${otp}`);

    // Send OTP via SMS gateway (for demo)
    // sendOtpViaSms(mobile_number, otp);

    // Store OTP in the database with an expiration time (5 minutes from now)
    const expirationTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiration
    await db.query('INSERT INTO otp_requests (mobile_number, otp, expires_at) VALUES (?, ?, ?)', [mobile_number, otp, expirationTime]);

    // Respond with success message
    res.status(200).json({ 
      message: 'OTP sent successfully',
      otp: otp
     });
  } catch (error) {
    console.error('Error processing OTP request:', error); // Log detailed error for debugging
    res.status(500).json({ message: 'An error occurred while processing the OTP request.' });
  }
};

module.exports = {
  sendOtp,
};
