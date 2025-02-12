const db = require('../config/database');

// Create birth record
const createBirthRecord = async (req, res) => {
  const { user_id ,name, date_of_birth, time_of_birth, place_of_birth, mother_name, father_name, address, created_at } = req.body;

  try {
    const [rows] = await db.query(
      'INSERT INTO birth (user_id ,name, date_of_birth, time_of_birth, place_of_birth, mother_name, father_name, address) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [ user_id ,name, date_of_birth, time_of_birth, place_of_birth, mother_name, father_name, address, created_at]
    );
    
    res.status(201).json({
      message: 'Birth record created successfully!',
      data: { user_id: rows.insertId, name, date_of_birth, time_of_birth, place_of_birth, mother_name, father_name, address, created_at },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while saving the birth record.' });
  }
};

module.exports = {
  createBirthRecord,
};