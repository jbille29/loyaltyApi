const express = require('express');
const router = express.Router();
const punchCardController = require('../controllers/punchCardController');

// Route to create a new punch card
router.post('/', punchCardController.createPunchCard);

// Route to get all punch cards for a user or business
router.get('/', punchCardController.getAllPunchCards);

// Route to get a single punch card by ID
router.get('/:id', punchCardController.getPunchCardById);

// Route to update a punch card by ID
router.put('/:id', punchCardController.updatePunchCard);

// Route to delete a punch card by ID
router.delete('/:id', punchCardController.deletePunchCard);

module.exports = router;
