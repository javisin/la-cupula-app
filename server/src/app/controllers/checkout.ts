import asyncHandler from 'express-async-handler';
import config from '../../Context/Shared/infraestructure/config';
import Stripe from '../../Context/Shared/infraestructure/Stripe';

const getCheckoutSession = asyncHandler(async (req, res) => {
  const { planId } = req.query;
  const stripe = new Stripe(config.stripeKey);
  const sessionUrl = await stripe.getCheckoutUrl(planId as string);
  if (!sessionUrl) {
    res.status(404).json('Session could not be found');
    return;
  }
  res.json(sessionUrl);
});

export { getCheckoutSession };
