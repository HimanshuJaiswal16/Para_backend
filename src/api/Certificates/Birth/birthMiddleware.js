const validateBirthData = (req, res, next) => {
    const {user_id, name, date_of_birth, time_of_birth, place_of_birth, mother_name, father_name, address, created_at } = req.body;
  
    if (!name || !date_of_birth || !time_of_birth || !place_of_birth || !mother_name || !father_name || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    // You can add more validation for specific fields here (e.g., format of date_of_birth, time_of_birth, etc.)
  
    next();
  };
  
  module.exports = validateBirthData;