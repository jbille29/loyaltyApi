// api/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const businessRoutes = require('./routes/business');
const loyaltyRoutes = require('./routes/loyalty');
const punchCard = require('./routes/punchCard');
const stripeRoutes = require('./routes/stripe');

const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://loyalty-program-eight.vercel.app']; // or replace with actual Render frontend URL

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., mobile apps or CURL)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/business', businessRoutes);
app.use('/api/loyalty', loyaltyRoutes);
app.use('/api/punchcards', punchCard);
app.use('/api/stripe', stripeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
