const cors = require('cors');

const corsMiddleware = cors({
    origin: '*', // Specific origin dena ho toh yahan likhein
    methods: 'GET, POST',
    allowedHeaders: 'Content-Type'
});

module.exports = corsMiddleware;
