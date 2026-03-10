import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (!subscription?.stripe_customer_id) {
      return NextResponse.json({ error: 'Aucun abonnement trouvé' }, { status: 404 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ecr360dig3006.builtwithrocket.new';

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: subscription.stripe_customer_id,
      return_url: `${siteUrl}/espace-client`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error: any) {
    console.error('Portal error:', error);
    return NextResponse.json({ error: error.message || 'Erreur lors de l\'ouverture du portail' }, { status: 500 });
  }
}
