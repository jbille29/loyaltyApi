// api/controllers/businessController.js
const Business = require('../models/Business');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerBusiness = async (req, res) => {
  const { name, email, password, loyaltyThreshold } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const business = await Business.create({ name, email, password: hashedPassword, loyaltyThreshold });
    res.status(201).json({ message: 'Business registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed' });
  }
};

const loginBusiness = async (req, res) => {
  const { email, password } = req.body;
  try {
    const business = await Business.findOne({ email });
    if (!business || !(await bcrypt.compare(password, business.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ businessId: business._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

const getProfile = async (req, res) => {
  const { businessId } = req.business;
  try {
    const business = await Business.findById(businessId).select('-password');
    res.json(business);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load profile' });
  }
};

// Get basic analytics for a business
const getAnalytics = async (req, res) => {
  const { businessId } = req.params;

  try {
    const totalCustomers = await Loyalty.countDocuments({ businessId });
    const totalPoints = await Loyalty.aggregate([
      { $match: { businessId } },
      { $group: { _id: null, totalPoints: { $sum: '$points' } } },
    ]);

    res.status(200).json({
      totalCustomers,
      totalPoints: totalPoints[0]?.totalPoints || 0,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to load analytics' });
  }
};

module.exports = { registerBusiness, loginBusiness, getProfile, getAnalytics };
