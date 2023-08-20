export default interface PaymentProcessor {
  getCheckoutUrl: (planId: string, customerId: string) => Promise<string | null>;
}
