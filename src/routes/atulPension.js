const express = require('express');
const router = express.Router();
const atulPensionController = require('./../controllers/atulpensionController');
const validateatulPensionData = require('./../middlewares/atulPension');

// POST endpoint to create a new birth record
router.post('/', validateatulPensionData, atulPensionController.createAtulPensionRecord);

module.exports = router;