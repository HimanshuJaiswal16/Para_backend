const express = require('express');
const router = express.Router();
const birthController = require('./../controllers/birthController');
const validateBirthData = require('./../middlewares/birth');

// POST endpoint to create a new birth record
router.post('/', validateBirthData, birthController.createBirthRecord);

module.exports = router;
