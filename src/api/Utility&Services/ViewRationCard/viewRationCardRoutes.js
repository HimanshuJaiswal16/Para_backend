const express = require('express');
const router = express.Router();
const { searchRationCard } = require('./viewRationCardController');
const validateSearchRequest = require('./viewRationCardMiddleware');

// Search Ration Card Route
router.get('/search-ration-card', validateSearchRequest, searchRationCard);

module.exports = router;
