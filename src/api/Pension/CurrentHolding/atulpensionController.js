const db = require('../../../config/database');

// Create birth record
const createAtulPensionRecord = async (req, res) => {
  const { name, application_number } = req.body;

  const user_id = req.body.user_id;
  const created_at = new Date();

  try {
    const [result] = await db.query(
      'INSERT INTO atul_pension_yojana (user_id, name, application_number, created_at) VALUES (?, ?, ?, ?)',
      [user_id, name, application_number, created_at]
    );

    res.status(201).json({
      message: 'Your atul pension record created successfully!',
      data: { id: result.insertId, user_id, name, application_number, created_at },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while saving the atul pension record.' });
  }
};

module.exports = {
    createAtulPensionRecord,
};
