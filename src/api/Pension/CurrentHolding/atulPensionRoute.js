const express = require('express');
const router = express.Router();
const atulPensionController = require('./atulpensionController');
const validateatulPensionData = require('./atulPensionMiddleware');

// POST endpoint to create a new birth record
router.post('/', validateatulPensionData, atulPensionController.createAtulPensionRecord);

module.exports = router;