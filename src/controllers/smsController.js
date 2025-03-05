const axios = require('axios');

const sendSms = async (req, res) => {
    const { mobile } = req.body;

    console.log(mobile, "mobileNumber")

    if (!mobile) {
        return res.status(400).json({ error: 'Mobile number is required' });
    }

    try {
        console.log("Test");
        const response = await axios.post(
            `http://sms.paragalaxy.com/smpp_api/sms?token=0e396ff2ce9d865fff42aefcd3b71def&To=${mobile}`,
            {}, // Empty body if API does not require it
            { headers: { 'Content-Type': 'application/json' } }
        );

        res.json(response.data);
    } catch (error) {
        console.error('Error sending SMS:', error.message);
        res.status(500).json({ error: 'Failed to send SMS' });
    }
};

module.exports = { sendSms };
