const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./../config/database');
const crypto = require("crypto"); // Import crypto module

const signup = async (req, res) => {
  try {
    const { user_id, mobile, mpin, created_at } = req.body;

    // Check if user exists
    const [existingUsers] = await db.query(
      'SELECT * FROM users WHERE mobile = ?',
      [mobile]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Mobile number already registered' });
    }

    // Hash MPIN
    const hashedMpin = await bcrypt.hash(mpin, 8);

    let uuid = crypto.randomUUID(); // Generate unique user_id
    const currentDate = new Date();

    // Create user
    const [result] = await db.query(
      'INSERT INTO users (user_id, mobile, mpin, created_at) VALUES (?, ?, ?, ?)',
      [uuid, mobile, hashedMpin, currentDate]
    );

    const token = jwt.sign(
      { id: result.insertId, mobile },
      process.env.JWT_SECRET || 'your-secret-key'
    );

    let user = {
      user_id: uuid,
      mobile: mobile,
      mpin: hashedMpin,
      created_at: currentDate
    }

    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { mobile, mpin } = req.body;

    // Find user
    const [users] = await db.query(
      'SELECT * FROM users WHERE mobile = ?',
      [mobile]
    );


    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(mpin, user.mpin);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.user_id, mobile },
      process.env.JWT_SECRET || 'your-secret-key'
    );

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signup,
  login
};
