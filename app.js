require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const chartRoutes = require('./routes/chartRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors());

// Connect to DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/charts', chartRoutes);
app.use('/api/products', productRoutes);

// Root
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
