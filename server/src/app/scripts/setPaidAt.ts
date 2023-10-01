import { Op } from 'sequelize';
import { Stripe } from 'stripe';
import { SequelizeUser } from '../../Context/Users/infraestructure/UserModel';
import config from '../../Context/Shared/infraestructure/config';

process.env.TZ = 'Europe/London';

async function getStripeCustomerSubscriptions(stripe: Stripe, customerId: string) {
  const response = await stripe.subscriptions.list({ customer: customerId });
  return response.data;
}

async function main() {
  const stripe = new Stripe(config.stripeKey, { apiVersion: '2023-08-16' });
  const usersWithPlan = await SequelizeUser.findAll({
    where: { planId: { [Op.ne]: null } },
  });

  // eslint-disable-next-line no-restricted-syntax
  for (const user of usersWithPlan) {
    const stripeSubscriptions = await getStripeCustomerSubscriptions(stripe, user.customerId);
    const currentSubscription = stripeSubscriptions[0];
    if (!currentSubscription) continue;
    user.subscriptionId = currentSubscription.id;
    user.paidAt = new Date(currentSubscription.current_period_start * 1000);
    await user.save();
  }
  process.exit();
}

main();
