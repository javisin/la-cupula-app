import asyncHandler from 'express-async-handler';
import { Stripe as StripeClient } from 'stripe';
import config from '../../Context/Shared/infraestructure/config';
import { UserModel } from '../../Context/Users/infraestructure/UserModel';

const handleStripe = asyncHandler(async (req, res) => {
  const stripe = new StripeClient(config.stripeKey, { apiVersion: '2023-08-16' });
  const sig = req.headers['stripe-signature'];
  const endpointSecret = config.stripeSecret;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig!, endpointSecret);
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case 'customer.subscription.updated': {
      const subscription = event.data.object as StripeClient.Subscription;
      const customer = (await stripe.customers.retrieve(
        subscription.customer as string,
      )) as StripeClient.Customer;
      const user = await UserModel.findOne({
        where: {
          customerId: customer.id,
        },
      });
      if (user === null) {
        res.status(404).json({ message: 'This user does not exist' });
        return;
      }
      user.planId = subscription.items.data[0].plan.product as string;
      await user.save();
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send();
});

export { handleStripe };
