const pool = require('../../../config/database');  // Import MySQL connection pool

// Controller for searching Ration Card
exports.searchRationCard = async (req, res) => {
  try {
    // Validate the input data
    const { searchType, searchValue } = req.body;
    if (!searchType || !searchValue) {
      return res.status(400).json({
        success: false,
        message: 'Both search type and search value are required.',
      });
    }

    // Validate search type
    const validSearchTypes = ['ration_card_number', 'aadhaar_number', 'mobile_number'];
    if (!validSearchTypes.includes(searchType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid search type',
      });
    }

    // Construct the SQL query
    // const query = `SELECT * FROM ration_cards WHERE ${searchType} = ?`;
    
    // Execute the query
    // const [rows] = await pool.execute(query, [searchValue]);

    // Check if any record is found
    // if (rows.length === 0) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Ration Card not found',
    //   });
    // }

    // Return the found ration card details
    res.status(200).json({
      success: true,
      data: searchType,  // Assuming you are returning the first match
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
