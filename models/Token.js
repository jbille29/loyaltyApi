// api/models/Token.js
const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  customerId: { type: String, required: true },
  businessId: { type: String, required: true },
  used: { type: Boolean, default: false },
  expiresAt: { type: Date, required: true },
});

module.exports = mongoose.model('Token', tokenSchema);
