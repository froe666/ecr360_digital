import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

// Use service role for webhook (bypasses RLS)
function getServiceClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

const PLAN_NAME_MAP: Record<string, string> = {
  essentiel: 'Essentiel',
  confort: 'Confort',
  croissance: 'Croissance',
};

function getPlanNameFromMetadata(metadata: Stripe.Metadata | null): string {
  if (!metadata) return 'Essentiel';
  return metadata.plan_name || 'Essentiel';
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  const supabase = getServiceClient();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.supabase_user_id;
        const planName = getPlanNameFromMetadata(session.metadata);

        if (!userId || !session.customer || !session.subscription) break;

        // Retrieve subscription details
        const stripeSubscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );

        await supabase.from('subscriptions').upsert({
          user_id: userId,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
          plan_name: planName,
          status: stripeSubscription.status,
          current_period_end: new Date(stripeSubscription.current_period_end * 1000).toISOString(),
          cancel_at_period_end: stripeSubscription.cancel_at_period_end,
        }, { onConflict: 'user_id' });
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.supabase_user_id;

        // Find user by stripe_customer_id if no metadata
        let updateQuery = supabase.from('subscriptions');
        const updateData = {
          status: subscription.status,
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          cancel_at_period_end: subscription.cancel_at_period_end,
        };

        if (userId) {
          await updateQuery.update(updateData).eq('user_id', userId);
        } else {
          await updateQuery.update(updateData).eq('stripe_subscription_id', subscription.id);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await supabase
          .from('subscriptions')
          .update({ status: 'canceled', cancel_at_period_end: false })
          .eq('stripe_subscription_id', subscription.id);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        if (invoice.subscription) {
          const stripeSubscription = await stripe.subscriptions.retrieve(
            invoice.subscription as string
          );
          await supabase
            .from('subscriptions')
            .update({
              status: stripeSubscription.status,
              current_period_end: new Date(stripeSubscription.current_period_end * 1000).toISOString(),
            })
            .eq('stripe_subscription_id', invoice.subscription as string);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        if (invoice.subscription) {
          await supabase
            .from('subscriptions')
            .update({ status: 'past_due' })
            .eq('stripe_subscription_id', invoice.subscription as string);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error: any) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
