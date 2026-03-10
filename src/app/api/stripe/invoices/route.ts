import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe/server';

export async function GET(request: NextRequest) {
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
      return NextResponse.json({ invoices: [] });
    }

    const invoices = await stripe.invoices.list({
      customer: subscription.stripe_customer_id,
      limit: 24,
    });

    const formattedInvoices = invoices.data.map((inv) => ({
      id: inv.id,
      number: inv.number,
      date: inv.created,
      amount: inv.amount_paid / 100,
      currency: inv.currency,
      status: inv.status,
      pdf: inv.invoice_pdf,
      hosted_url: inv.hosted_invoice_url,
    }));

    return NextResponse.json({ invoices: formattedInvoices });
  } catch (error: any) {
    console.error('Invoices error:', error);
    return NextResponse.json({ error: error.message || 'Erreur lors de la récupération des factures' }, { status: 500 });
  }
}
