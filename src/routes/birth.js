// const express = require('express');
// const router = express.Router();
// const birthController = require('./../controllers/birthController');
// const validateBirthData = require('./../middlewares/birth');

// // POST endpoint to create a new birth record
// router.post('/birth', validateBirthData, birthController.createBirthRecord);

// module.exports = router;

const express = require('express');
const router = express.Router();

// Dummy data storage (for local testing)
const birthCertificates = [];

// POST route to handle form submission
router.post('/', (req, res) => {
    const { applicationNumber, applicantContact, applicantName, applicantAddress, applicantEmail } = req.body;

    // if (!applicationNumber || !applicantContact || !applicantName || !applicantAddress || !applicantEmail) {
    //     return res.status(400).json({ error: 'All fields are required' });
    // }

    const newCertificate = {
        applicationNumber,
        applicantContact,
        applicantName,
        applicantAddress,
        applicantEmail,
        createdAt: new Date()
    };

    birthCertificates.push(newCertificate);

    res.status(201).json({ message: "Birth certificate data saved successfully!", data: newCertificate });
});

module.exports = router;
