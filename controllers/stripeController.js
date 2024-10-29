// api/controllers/stripeController.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  console.log('register route!')
  res.send('hello from checkout')
  /*
  const { priceId, customerEmail } = req.body;
  
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId, // Use the price ID from Stripe dashboard
          quantity: 1,
        },
      ],
      customer_email: customerEmail,
      success_url: `${process.env.CLIENT_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/pricing`,
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
    */
};

module.exports = { createCheckoutSession };
