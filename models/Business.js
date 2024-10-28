// server/models/Business.js
const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  loyaltyThreshold: { type: Number, default: 5 },
});

module.exports = mongoose.model('Business', BusinessSchema);
