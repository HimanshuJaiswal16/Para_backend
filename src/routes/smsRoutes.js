const express = require('express');
const { sendSms } = require('../controllers/smsController');

const router = express.Router();

router.post('/', sendSms);

module.exports = router;
