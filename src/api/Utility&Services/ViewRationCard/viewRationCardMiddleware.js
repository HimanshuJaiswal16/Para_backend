// Middleware for validating search request
const validateSearchRequest = (req, res, next) => {
  const { searchType, searchValue } = req.body;
  
  if (!searchType || !searchValue) {
    return res.status(400).json({
      success: false,
      message: 'Both search type and search value are required.',
    });
  }

  const validSearchTypes = ['ration_card_number', 'aadhaar_number', 'mobile_number'];
  if (!validSearchTypes.includes(searchType)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid search type',
    });
  }

  next();
};

module.exports = validateSearchRequest;
