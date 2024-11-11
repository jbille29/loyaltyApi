const PunchCard = require('../models/PunchCard');

// Create a new punch card
exports.createPunchCard = async (req, res) => {
  console.log('Create Punch Card')
  try {
    const punchCard = new PunchCard(req.body);
    await punchCard.save();
    console.log('Punch Card Created')
    res.status(201).json(punchCard);
  } catch (error) {
    console.log('Punch Card Failed')
    res.status(400).json({ message: error.message });
  }
};

// Get all punch cards (can filter by user or business)
exports.getAllPunchCards = async (req, res) => {
  try {
    const filter = {};
    if (req.query.businessId) filter.businessId = req.query.businessId;
    if (req.query.userId) filter.userId = req.query.userId;

    const punchCards = await PunchCard.find(filter);
    res.status(200).json(punchCards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single punch card by ID
exports.getPunchCardById = async (req, res) => {
  try {
    const punchCard = await PunchCard.findById(req.params.id);
    if (!punchCard) return res.status(404).json({ message: 'Punch card not found' });

    res.status(200).json(punchCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a punch card by ID
exports.updatePunchCard = async (req, res) => {
  try {
    const punchCard = await PunchCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!punchCard) return res.status(404).json({ message: 'Punch card not found' });

    res.status(200).json(punchCard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a punch card by ID
exports.deletePunchCard = async (req, res) => {
  try {
    const punchCard = await PunchCard.findByIdAndDelete(req.params.id);
    if (!punchCard) return res.status(404).json({ message: 'Punch card not found' });

    res.status(200).json({ message: 'Punch card deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
