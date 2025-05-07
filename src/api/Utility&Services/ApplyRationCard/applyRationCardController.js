// controllers/applicationController.js
const db = require('../../../config/database');

exports.submitApplication = (req, res) => {
  console.log(req, "sdfgsfdgsdf")
  const { name, aadhaar, mobile, address, category } = req.body;

  try {
    // SQL query to insert new application data into the database
    const query = `
      INSERT INTO applications (name, aadhaar, mobile, address, category)
      VALUES (?, ?, ?, ?, ?)
      `;
      res.status(201).json({
        message: 'Birth record created successfully!',
        // data: { id: result.insertId, user_id, name, date_of_birth, time_of_birth, place_of_birth, mother_name, father_name, address, created_at },
      });
       
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while saving the birth record.' });
  }

  // // SQL query to insert new application data into the database
  // const query = `
  //   INSERT INTO applications (name, aadhaar, mobile, address, category)
  //   VALUES (?, ?, ?, ?, ?)
  // `;

  // Execute the query
  // db.execute(query, [name, aadhaar, mobile, address, category], (err, results) => {
  //   if (err) {
  //     console.error(err);
  //     return res.status(500).json({ message: 'Database error' });
  //   }

  //   const referenceNumber = `UP${new Date().getTime().toString().slice(5)}`;
  //   res.status(200).json({
  //     message: 'Application submitted successfully',
  //     referenceNumber: referenceNumber,
  //   });
  // });
};
