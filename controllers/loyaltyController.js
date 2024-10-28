// api/controllers/loyaltyController.js
const Loyalty = require('../models/Loyalty');
const Token = require('../models/Token'); 
const crypto = require('crypto');

const generateToken = async (req, res) => {
  const { customerId, businessId } = req.body;

  // Create a unique token
  const tokenValue = crypto.randomBytes(16).toString('hex');
  const token = await Token.create({ token: tokenValue, customerId, businessId, expiresAt: Date.now() + 15 * 60 * 1000 }); // Expires in 15 minutes

  res.json({ token: tokenValue });
};

const trackLoyaltyPoints = async (req, res) => {
  const { customerId, businessId, token } = req.body;

  try {
    // Check for a valid, unused, and unexpired token
    const validToken = await Token.findOne({
      token,
      customerId,
      businessId,
      used: false,
      expiresAt: { $gt: Date.now() },
    });
    if (!validToken) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Find loyalty entry for the customer and business
    let loyalty = await Loyalty.findOne({ customerId, businessId });

    // Rate limiting: check if last point addition was within 24 hours
    const oneDay = 24 * 60 * 60 * 1000;
    if (loyalty && new Date() - loyalty.updatedAt < oneDay) {
      return res.status(429).json({ error: 'Points can only be added once per day' });
    }

    // Create or increment points if rate limit allows
    if (!loyalty) {
      loyalty = await Loyalty.create({ customerId, businessId, points: 1 });
    } else {
      loyalty.points += 1;
      await loyalty.save();
    }

    // Mark the token as used
    validToken.used = true;
    await validToken.save();

    res.status(200).json(loyalty);
  } catch (error) {
    res.status(400).json({ error: 'Failed to track loyalty points' });
  }
};


module.exports = { trackLoyaltyPoints, generateToken };
