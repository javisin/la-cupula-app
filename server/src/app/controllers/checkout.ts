import asyncHandler from 'express-async-handler';
import config from '../../Context/Shared/infraestructure/config';
import Stripe from '../../Context/Shared/infraestructure/Stripe';
import { AuthorizedRequest } from '../jwt';
import { UserModel } from '../../Context/Users/infraestructure/UserModel';

const getCheckoutSession = asyncHandler(async (req: AuthorizedRequest, res) => {
  const { planId } = req.query;
  const stripe = new Stripe(config.stripeKey);
  const userId = req.user!.sub;
  const user = (await UserModel.findOne({ where: { id: userId } })) as UserModel;
  const sessionUrl = await stripe.getCheckoutUrl(planId as string, user.customerId);
  if (!sessionUrl) {
    res.status(404).json('Session could not be found');
    return;
  }
  res.json(sessionUrl);
});

export { getCheckoutSession };
