const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');


// Import routes
const authRoutes = require('./routes/auth');
const documentRoutes = require('./routes/documents');
const birthRoutes = require('./routes/birth');
const atulPensionRoutes = require('./routes/atulPension');
const otpRoutes = require('./routes/otpRoutes');
const smsRoutes = require('./routes/smsRoutes');
const incomeRoutes = require('./routes/incomeRoute');
const corsMiddleware = require('./middlewares/corsMiddleware');

const app = express();

// Middleware
// app.use(cors());
app.use(express.json());
app.use(corsMiddleware);

// Create uploads directory if it doesn't exist
const uploadsDir = path.resolve(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files from the uploads directory
app.use('/uploads', express.static(uploadsDir));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/birth', birthRoutes);
app.use('/api/atulPension', atulPensionRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/sms', smsRoutes);
app.use('/api/income', incomeRoutes)


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on: http://localhost:${PORT}`);
});
