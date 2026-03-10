import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { stripe, PLANS, PlanKey } from '@/lib/stripe/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const { planKey } = await request.json();

    if (!planKey || !PLANS[planKey as PlanKey]) {
      return NextResponse.json({ error: 'Plan invalide' }, { status: 400 });
    }

    const plan = PLANS[planKey as PlanKey];

    // Get or create Stripe customer
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .maybeSingle();

    let customerId = subscription?.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ecr360dig3006.builtwithrocket.new';

    // If priceId is configured, use it; otherwise create a price on the fly
    let priceId = plan.priceId;

    if (!priceId) {
      // Create a price dynamically if not configured
      const product = await stripe.products.create({
        name: `ECR360 - Pack ${plan.name}`,
      });
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: Math.round(plan.price * 100),
        currency: plan.currency,
        recurring: { interval: 'month' },
      });
      priceId = price.id;
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${siteUrl}/espace-client?success=true&plan=${planKey}`,
      cancel_url: `${siteUrl}/espace-client?canceled=true`,
      metadata: {
        supabase_user_id: user.id,
        plan_name: plan.name,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message || 'Erreur lors de la création du paiement' }, { status: 500 });
  }
}
