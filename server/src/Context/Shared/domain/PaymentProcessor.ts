export default interface PaymentProcessor {
  getCheckoutUrl: (planId: string) => Promise<string | null>;
}
