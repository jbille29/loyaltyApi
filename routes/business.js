// api/routes/business.js
const express = require('express');
const { registerBusiness, loginBusiness, getProfile, getAnalytics } = require('../controllers/businessController');
const authenticate = require('../middleware/auth');
const router = express.Router();

router.post('/register', registerBusiness);
router.post('/login', loginBusiness);
router.get('/profile', authenticate, getProfile);
router.get('/:businessId/analytics', authenticate, getAnalytics);

module.exports = router;
