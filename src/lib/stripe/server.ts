import Stripe from 'stripe';

// Lazy initialization to avoid build-time crash when env var is not set
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-01-27.acacia',
      typescript: true,
    });
  }
  return _stripe;
}

// Keep backward-compatible named export used throughout the codebase
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as any)[prop];
  },
});

// Plan configuration
export const PLANS = {
  essentiel: {
    name: 'Essentiel',
    price: 19.90,
    priceId: process.env.STRIPE_PRICE_ESSENTIEL || '',
    currency: 'chf',
  },
  confort: {
    name: 'Confort',
    price: 39.90,
    priceId: process.env.STRIPE_PRICE_CONFORT || '',
    currency: 'chf',
  },
  croissance: {
    name: 'Croissance',
    price: 99.90,
    priceId: process.env.STRIPE_PRICE_CROISSANCE || '',
    currency: 'chf',
  },
} as const;

export type PlanKey = keyof typeof PLANS;
