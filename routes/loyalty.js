// api/routes/loyalty.js
const express = require('express');
const { trackLoyaltyPoints, generateToken } = require('../controllers/loyaltyController');
const router = express.Router();


router.post('/generate-token', generateToken)
router.post('/track', trackLoyaltyPoints);

module.exports = router;
