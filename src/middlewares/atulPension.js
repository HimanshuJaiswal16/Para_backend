const validateAtulPensionData = (req, res, next) => {
    const {user_id, name, application_number, created_at } = req.body;
  
    if (!name || !application_number) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    // You can add more validation for specific fields here (e.g., format of date_of_birth, time_of_birth, etc.)
  
    next();
  };
  
  module.exports = validateAtulPensionData;