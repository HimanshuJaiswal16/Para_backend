const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');


// Import routes
const authRoutes = require('./routes/authRoute');
const documentRoutes = require('./routes/documents');
const birthRoutes = require('./api/Certificates/Birth/birthRoute');
const atulPensionRoutes = require('./api/Pension/CurrentHolding/atulPensionRoute');
const otpRoutes = require('./routes/otpRoutes');
const smsRoutes = require('./routes/smsRoutes');
const incomeRoutes = require('./api/Certificates/Income/incomeRoute');
const characterRoutes = require('./api/Certificates/Character/characterRoute');
const casteRoutes = require('./api/Certificates/Caste/casteCertificateRoute');
const vidwaYojanaRoutes = require('./api/Pension/VidhwaPension/vidwaPensionRoute');
const viklangYojanaRoutes = require('./api/Pension/ViklangPension/viklangPensionRoute');
const kissanCreditRoutes = require('./api/Farmer/KissanCreditCard/kissanCreditRoute');
const fasalBimaRoutes = require('./api/Farmer/FasalBimaYojana/fasalBimaRoute');
const rkvyloginRoutes = require('./api/Farmer/RKVY/rkvyloginRoute');


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
app.use('/api/income', incomeRoutes);
app.use('/api/character', characterRoutes);
app.use('/api/caste', casteRoutes);
app.use('/api/vidwaYojana', vidwaYojanaRoutes);
app.use('/api/viklangYojana', viklangYojanaRoutes);
app.use('/api/kissanCredit', kissanCreditRoutes);
app.use('/api/fasalBima', fasalBimaRoutes);
app.use('/api/rkvylogin',rkvyloginRoutes);



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on: http://localhost:${PORT}`);
});
