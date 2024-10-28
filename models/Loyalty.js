// server/models/Loyalty.js
const mongoose = require('mongoose');

const LoyaltySchema = new mongoose.Schema({
  customerId: String,
  businessId: String,
  points: { type: Number, default: 0 },
  lastScanDate: Date,
});

module.exports = mongoose.model('Loyalty', LoyaltySchema);
