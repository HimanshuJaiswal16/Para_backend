const express = require('express');
const router = express.Router();
const birthController = require('./birthController');
const validateBirthData = require('./birthMiddleware');

// POST endpoint to create a new birth record
router.post('/', validateBirthData, birthController.createBirthRecord);

module.exports = router;
