// api/routes/stripe.js
const express = require('express');
const { createCheckoutSession } = require('../controllers/stripeController');
const router = express.Router();

router.post('/create-checkout-session', createCheckoutSession);

// api/routes/stripe.js (add this at the bottom)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    
    // Handle successful subscription
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      // Update the user's subscription status in your database here
    }
  
    res.status(200).end();
  });
  

module.exports = router;
