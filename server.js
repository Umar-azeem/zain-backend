const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();

app.use(cors({
  origin: 'https://product-dashboard-two-eta.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(bodyParser.json());

app.use('/api/products', productRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
