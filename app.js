require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Connect to DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);

// Root
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
