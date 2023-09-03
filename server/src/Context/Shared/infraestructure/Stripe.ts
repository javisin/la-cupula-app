import { Stripe as StripeClient } from 'stripe';
import config from './config';
import PaymentProcessor from '../domain/PaymentProcessor';

export default class Stripe implements PaymentProcessor {
  private readonly stripeClient: StripeClient;

  constructor(stripeKey: string) {
    this.stripeClient = new StripeClient(stripeKey, { apiVersion: '2023-08-16' });
  }

  async getCheckoutUrl(planId: string, customerId: string) {
    const { data: prices } = await this.stripeClient.prices.list({
      active: true,
      product: planId,
    });
    const session = await this.stripeClient.checkout.sessions.create({
      line_items: [
        {
          price: prices[0].id,
          quantity: 1,
        },
      ],
      mode: prices[0].recurring === null ? 'payment' : 'subscription',
      success_url: `${config.domain}?success=true`,
      cancel_url: `${config.domain}?success=false`,
      customer: customerId,
    });
    return session.url;
  }
}
