// middlewares/validateRequest.js
const validateRequest = (req, res, next) => {
    const { name, aadhaar, mobile, address, category } = req.body;
  
    if (!name || !aadhaar || !mobile || !address || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    if (aadhaar.length !== 12 || mobile.length !== 10) {
      return res.status(400).json({ message: 'Invalid Aadhaar or Mobile Number' });
    }
  
    next();
  };
  
  module.exports = validateRequest;
  