const db = require('../config/database');

// Create birth record
const createBirthRecord = async (req, res) => {
  const { name, date_of_birth, time_of_birth, place_of_birth, mother_name, father_name, address } = req.body;

  try {
    const [rows] = await db.execute(
      'INSERT INTO birth (name, date_of_birth, time_of_birth, place_of_birth, mother_name, father_name, address) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, date_of_birth, time_of_birth, place_of_birth, mother_name, father_name, address]
    );
    
    res.status(201).json({
      message: 'Birth record created successfully!',
      data: { user_id: rows.insertId, name, date_of_birth, time_of_birth, place_of_birth, mother_name, father_name, address },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while saving the birth record.' });
  }
};

module.exports = {
  createBirthRecord,
};