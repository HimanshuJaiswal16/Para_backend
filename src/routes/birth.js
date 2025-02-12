const express = require('express');
const router = express.Router();
const birthController = require('../controllers/birthController');
const validateBirthData = require('../middlewares/validateBirthData');

// POST endpoint to create a new birth record
router.post('/birth', validateBirthData, birthController.createBirthRecord);

module.exports = router;