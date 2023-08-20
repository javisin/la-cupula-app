import { Stripe } from 'stripe';
import config from '../../Context/Shared/infraestructure/config';
import User from '../../database/models/user';

async function createStripeCustomer(stripe: Stripe, user: User) {
  const stripeRequest: Stripe.CustomerCreateParams = {
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
  };

  const stripeCustomer = await stripe.customers.create(stripeRequest);

  return stripeCustomer.id;
}

async function main() {
  const stripe = new Stripe(config.stripeKey, { apiVersion: '2023-08-16' });
  const users = await User.findAll();
  // eslint-disable-next-line no-restricted-syntax
  for (const user of users) {
    user.customerId = await createStripeCustomer(stripe, user);
    await user.save();
  }
  process.exit();
}

main();
