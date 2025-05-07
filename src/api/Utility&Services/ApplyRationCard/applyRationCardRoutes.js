// routes/applicationRoutes.js
const express = require('express');
const router = express.Router();
const applicationController = require('./applyRationCardController');
const validateRequest = require('./applyRationCardMiddleware');

// Route for submitting an application
router.post('/applyration', validateRequest, applicationController.submitApplication);

module.exports = router;
