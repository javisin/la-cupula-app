import * as dotenv from 'dotenv';

dotenv.config();

const { STRIPE_KEY } = process.env;
if (!STRIPE_KEY) {
  throw new Error('STRIPE_KEY not defined');
}

const { STRIPE_SECRET } = process.env;
if (!STRIPE_SECRET) {
  throw new Error('STRIPE_SECRET not defined');
}

const { DOMAIN } = process.env;
if (!DOMAIN) {
  throw new Error('DOMAIN not defined');
}

const { RESEND_API_KEY } = process.env;
if (!RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY not defined');
}

export default {
  stripeKey: STRIPE_KEY,
  stripeSecret: STRIPE_SECRET,
  domain: DOMAIN,
  checkPasswords: process.env.CHECK_PASSWORDS !== 'false',
  resendApiKey: process.env.RESEND_API_KEY,
};
