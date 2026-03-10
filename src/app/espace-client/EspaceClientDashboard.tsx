'use client';
import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';

type Section = 'dashboard' | 'abonnement' | 'factures' | 'profil';

interface Subscription {
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  plan_name: string | null;
  status: string;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
}

interface Invoice {
  id: string;
  number: string | null;
  date: number;
  amount: number;
  currency: string;
  status: string | null;
  pdf: string | null;
  hosted_url: string | null;
}

interface Profile {
  full_name: string;
  company_name: string;
  email: string;
}

const PACKS = [
  {
    key: 'essentiel',
    name: 'Essentiel',
    price: '19.90',
    description: 'Site web professionnel, hébergement, domaine',
    color: 'border-accent/30 bg-accent/5',
    badge: '',
  },
  {
    key: 'confort',
    name: 'Confort',
    price: '39.90',
    description: 'Site + entretien, mises à jour, SEO de base',
    color: 'border-accent/50 bg-accent/10',
    badge: '⭐ Populaire',
  },
  {
    key: 'croissance',
    name: 'Croissance',
    price: '99.90',
    description: 'Site + marketing complet, Google Ads, Social Media',
    color: 'border-purple-500/30 bg-purple-500/5',
    badge: '',
  },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    active: { label: 'Actif', cls: 'bg-green-500/20 text-green-400 border-green-500/30' },
    trialing: { label: 'Essai', cls: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    past_due: { label: 'Impayé', cls: 'bg-red-500/20 text-red-400 border-red-500/30' },
    canceled: { label: 'Annulé', cls: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
    inactive: { label: 'Inactif', cls: 'bg-gray-500/20 text-muted border-border' },
  };
  const s = map[status] || map.inactive;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${s.cls}`}>
      {s.label}
    </span>
  );
}

export default function EspaceClientDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading, signOut } = useAuth();
  const supabase = createClient();

  const [section, setSection] = useState<Section>('dashboard');
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [profile, setProfile] = useState<Profile>({ full_name: '', company_name: '', email: '' });
  const [loadingSub, setLoadingSub] = useState(true);
  const [loadingInvoices, setLoadingInvoices] = useState(false);
  const [loadingPortal, setLoadingPortal] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState<string | null>(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  useEffect(() => {
    const success = searchParams?.get('success');
    const canceled = searchParams?.get('canceled');
    if (success) showToast('Abonnement activé avec succès ! 🎉', 'success');
    if (canceled) showToast('Paiement annulé.', 'error');
  }, [searchParams]);

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchSubscription = useCallback(async () => {
    if (!user) return;
    setLoadingSub(true);
    try {
      const { data } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      setSubscription(data || null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingSub(false);
    }
  }, [user]);

  const fetchProfile = useCallback(async () => {
    if (!user) return;
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();
      if (data) {
        setProfile({
          full_name: data.full_name || user?.user_metadata?.full_name || '',
          company_name: data.company_name || user?.user_metadata?.company_name || '',
          email: data.email || user?.email || '',
        });
      } else {
        setProfile({
          full_name: user?.user_metadata?.full_name || '',
          company_name: user?.user_metadata?.company_name || '',
          email: user?.email || '',
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  const fetchInvoices = useCallback(async () => {
    if (!user) return;
    setLoadingInvoices(true);
    try {
      const res = await fetch('/api/stripe/invoices');
      const data = await res.json();
      setInvoices(data.invoices || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingInvoices(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchSubscription();
      fetchProfile();
    }
  }, [user, fetchSubscription, fetchProfile]);

  useEffect(() => {
    if (section === 'factures' && user) fetchInvoices();
  }, [section, user, fetchInvoices]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckout = async (planKey: string) => {
    setLoadingCheckout(planKey);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planKey }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        showToast(data.error || 'Erreur lors du paiement', 'error');
      }
    } catch (e: any) {
      showToast('Erreur réseau', 'error');
    } finally {
      setLoadingCheckout(null);
    }
  };

  const handlePortal = async () => {
    setLoadingPortal(true);
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        showToast(data.error || 'Erreur portail', 'error');
      }
    } catch (e: any) {
      showToast('Erreur réseau', 'error');
    } finally {
      setLoadingPortal(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setSavingProfile(true);
    try {
      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        full_name: profile.full_name,
        company_name: profile.company_name,
        email: profile.email,
      }, { onConflict: 'id' });
      if (error) throw error;
      setProfileSaved(true);
      showToast('Profil mis à jour !', 'success');
      setTimeout(() => setProfileSaved(false), 3000);
    } catch (e: any) {
      showToast('Erreur lors de la sauvegarde', 'error');
    } finally {
      setSavingProfile(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const displayName = profile.company_name || profile.full_name || user?.user_metadata?.company_name || user?.user_metadata?.full_name || 'Client';
  const initials = displayName.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2);
  const isActive = subscription?.status === 'active' || subscription?.status === 'trialing';

  const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
    {
      id: 'dashboard',
      label: 'Tableau de bord',
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>,
    },
    {
      id: 'abonnement',
      label: 'Abonnement',
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>,
    },
    {
      id: 'factures',
      label: 'Factures',
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" /></svg>,
    },
    {
      id: 'profil',
      label: 'Profil',
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>,
    },
  ];

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex flex-col h-full ${mobile ? '' : 'w-64'}`}>
      <div className="p-6 border-b border-border">
        <Link href="/homepage" onClick={() => setSidebarOpen(false)}>
          <AppLogo src="/assets/images/1275785-1773171741897.png" size={100} className="transition-opacity hover:opacity-80" />
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => { setSection(item.id); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              section === item.id
                ? 'bg-accent/15 text-accent border border-accent/25' :'text-muted hover:text-fg hover:bg-white/5'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-9 h-9 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0">
            <span className="text-accent text-xs font-bold">{initials}</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-fg truncate">{displayName}</p>
            <p className="text-xs text-muted truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-muted hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent2/5 blur-3xl" />
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl border text-sm font-medium shadow-lg ${
          toast.type === 'success' ?'bg-green-500/20 border-green-500/30 text-green-400' :'bg-red-500/20 border-red-500/30 text-red-400'
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-primary border-r border-border z-50">
            <SidebarContent mobile />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-primary/60 border-r border-border backdrop-blur-xl fixed left-0 top-0 bottom-0 z-30">
        <SidebarContent />
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-20 border-b border-border bg-primary/60 backdrop-blur-xl px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg text-muted hover:text-fg hover:bg-white/5 transition-all">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <AppLogo src="/assets/images/1275785-1773171741897.png" size={90} />
          <div className="w-9 h-9 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
            <span className="text-accent text-xs font-bold">{initials}</span>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8">
          {/* DASHBOARD */}
          {section === 'dashboard' && (
            <div>
              <div className="mb-8">
                <h1 className="text-2xl font-display font-bold text-fg">Tableau de bord</h1>
                <p className="text-muted text-sm mt-1">Bienvenue, {displayName} 👋</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-primary/40 border border-border rounded-2xl p-5">
                  <p className="text-xs text-muted mb-2">Statut abonnement</p>
                  {loadingSub ? <div className="h-6 w-20 bg-white/5 rounded animate-pulse" /> : <StatusBadge status={subscription?.status || 'inactive'} />}
                </div>
                <div className="bg-primary/40 border border-border rounded-2xl p-5">
                  <p className="text-xs text-muted mb-1">Pack actuel</p>
                  {loadingSub ? <div className="h-6 w-24 bg-white/5 rounded animate-pulse" /> : <p className="text-lg font-display font-bold text-accent">{subscription?.plan_name || '—'}</p>}
                </div>
                <div className="bg-primary/40 border border-border rounded-2xl p-5">
                  <p className="text-xs text-muted mb-1">Prochain renouvellement</p>
                  {loadingSub ? <div className="h-6 w-28 bg-white/5 rounded animate-pulse" /> : (
                    <p className="text-lg font-display font-bold text-fg">
                      {subscription?.current_period_end ? new Date(subscription.current_period_end).toLocaleDateString('fr-CH', { day: '2-digit', month: 'long', year: 'numeric' }) : '—'}
                    </p>
                  )}
                </div>
              </div>

              {!loadingSub && !isActive && (
                <div className="bg-gradient-to-r from-accent/10 to-accent2/10 border border-accent/20 rounded-2xl p-6 mb-8">
                  <h3 className="font-display font-semibold text-fg mb-2">Aucun abonnement actif</h3>
                  <p className="text-muted text-sm mb-4">Choisissez un pack pour accéder à tous nos services digitaux.</p>
                  <button onClick={() => setSection('abonnement')} className="btn-primary px-5 py-2.5 text-sm relative z-10">Voir les packs →</button>
                </div>
              )}

              {!loadingSub && isActive && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 mb-8">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h3 className="font-display font-semibold text-fg mb-1">Pack {subscription?.plan_name} actif</h3>
                      <p className="text-muted text-sm">
                        {subscription?.cancel_at_period_end ? 'Annulation prévue à la fin de la période' : `Renouvellement le ${subscription?.current_period_end ? new Date(subscription.current_period_end).toLocaleDateString('fr-CH') : '—'}`}
                      </p>
                    </div>
                    <button onClick={handlePortal} disabled={loadingPortal} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm text-muted hover:text-fg hover:border-fg/20 transition-all disabled:opacity-50">
                      {loadingPortal && <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
                      Gérer l&apos;abonnement
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-primary/40 border border-border rounded-2xl p-6">
                  <h3 className="font-display font-semibold text-fg mb-3">Actions rapides</h3>
                  <div className="space-y-2">
                    <button onClick={() => setSection('abonnement')} className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-fg transition-all">→ Gérer mon abonnement</button>
                    <button onClick={() => setSection('factures')} className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-fg transition-all">→ Voir mes factures</button>
                    <button onClick={() => setSection('profil')} className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-fg transition-all">→ Modifier mon profil</button>
                  </div>
                </div>
                <div className="bg-primary/40 border border-border rounded-2xl p-6">
                  <h3 className="font-display font-semibold text-fg mb-3">Besoin d&apos;aide ?</h3>
                  <p className="text-muted text-sm mb-4">Notre équipe est disponible pour vous accompagner.</p>
                  <div className="flex gap-3">
                    <Link href="/contact" className="px-4 py-2 rounded-xl border border-border text-sm text-muted hover:text-fg transition-all">Contact</Link>
                    <Link href="/demande" className="btn-primary px-4 py-2 text-sm relative z-10">Nouveau projet</Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABONNEMENT */}
          {section === 'abonnement' && (
            <div>
              <div className="mb-8">
                <h1 className="text-2xl font-display font-bold text-fg">Abonnement</h1>
                <p className="text-muted text-sm mt-1">Gérez votre plan et vos options de facturation.</p>
              </div>

              {loadingSub ? (
                <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-32 bg-white/5 rounded-2xl animate-pulse" />)}</div>
              ) : isActive ? (
                <div className="space-y-6">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
                    <div className="flex items-start justify-between flex-wrap gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-lg font-display font-bold text-fg">Pack {subscription?.plan_name}</h2>
                          <StatusBadge status={subscription?.status || 'inactive'} />
                        </div>
                        {subscription?.cancel_at_period_end && <p className="text-amber-400 text-sm mb-2">⚠️ Annulation prévue à la fin de la période</p>}
                        <p className="text-muted text-sm">Prochain renouvellement :{' '}<span className="text-fg font-medium">{subscription?.current_period_end ? new Date(subscription.current_period_end).toLocaleDateString('fr-CH', { day: '2-digit', month: 'long', year: 'numeric' }) : '—'}</span></p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button onClick={handlePortal} disabled={loadingPortal} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-bg text-sm font-semibold hover:bg-accent/90 transition-all disabled:opacity-50">
                          {loadingPortal && <span className="w-4 h-4 border-2 border-bg border-t-transparent rounded-full animate-spin" />}
                          Gérer via Stripe
                        </button>
                        <button onClick={() => setCancelModal(true)} className="px-5 py-2.5 rounded-xl border border-red-500/30 text-red-400 text-sm hover:bg-red-500/10 transition-all">Annuler l&apos;abonnement</button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-display font-semibold text-fg mb-4">Changer de plan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {PACKS.map((pack) => (
                        <div key={pack.key} className={`relative rounded-2xl border p-5 flex flex-col gap-3 ${subscription?.plan_name === pack.name ? 'border-accent/50 bg-accent/10' : pack.color}`}>
                          {pack.badge && <span className="absolute -top-3 left-4 bg-accent text-bg text-xs font-bold px-3 py-1 rounded-full">{pack.badge}</span>}
                          {subscription?.plan_name === pack.name && <span className="absolute -top-3 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">Plan actuel</span>}
                          <div>
                            <p className="font-display font-bold text-fg">{pack.name}</p>
                            <p className="text-2xl font-display font-bold text-accent mt-1">{pack.price} <span className="text-sm text-muted font-normal">CHF/mois</span></p>
                          </div>
                          <p className="text-xs text-muted flex-1">{pack.description}</p>
                          {subscription?.plan_name !== pack.name && (
                            <button onClick={handlePortal} disabled={loadingPortal} className="w-full py-2 rounded-xl border border-accent/30 text-accent text-sm hover:bg-accent/10 transition-all disabled:opacity-50">Passer à ce plan</button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-muted text-sm mb-6">Vous n&apos;avez pas encore d&apos;abonnement actif. Choisissez un pack pour commencer.</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {PACKS.map((pack) => (
                      <div key={pack.key} className={`relative rounded-2xl border p-6 flex flex-col gap-4 ${pack.color}`}>
                        {pack.badge && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-bg text-xs font-bold px-4 py-1 rounded-full">{pack.badge}</span>}
                        <div>
                          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-1">Pack {pack.name}</p>
                          <p className="text-3xl font-display font-bold text-fg">{pack.price} <span className="text-base text-muted font-normal">CHF/mois</span></p>
                        </div>
                        <p className="text-sm text-muted flex-1">{pack.description}</p>
                        <button onClick={() => handleCheckout(pack.key)} disabled={loadingCheckout === pack.key} className="w-full py-3 rounded-xl bg-accent text-bg text-sm font-bold hover:bg-accent/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                          {loadingCheckout === pack.key && <span className="w-4 h-4 border-2 border-bg border-t-transparent rounded-full animate-spin" />}
                          S&apos;abonner
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* FACTURES */}
          {section === 'factures' && (
            <div>
              <div className="mb-8">
                <h1 className="text-2xl font-display font-bold text-fg">Factures</h1>
                <p className="text-muted text-sm mt-1">Historique de vos paiements et factures.</p>
              </div>

              {loadingInvoices ? (
                <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 bg-white/5 rounded-xl animate-pulse" />)}</div>
              ) : invoices.length === 0 ? (
                <div className="bg-primary/40 border border-border rounded-2xl p-12 text-center">
                  <svg className="w-12 h-12 text-muted mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" /></svg>
                  <p className="text-muted">Aucune facture pour le moment.</p>
                </div>
              ) : (
                <div className="bg-primary/40 border border-border rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Facture</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Date</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Montant</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Statut</th>
                          <th className="text-right px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">PDF</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {invoices.map((inv) => (
                          <tr key={inv.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 text-sm text-fg font-mono">{inv.number || inv.id.slice(0, 12)}</td>
                            <td className="px-6 py-4 text-sm text-muted">{new Date(inv.date * 1000).toLocaleDateString('fr-CH', { day: '2-digit', month: 'long', year: 'numeric' })}</td>
                            <td className="px-6 py-4 text-sm font-semibold text-fg">{inv.amount.toFixed(2)} {inv.currency.toUpperCase()}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${inv.status === 'paid' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                                {inv.status === 'paid' ? 'Payée' : 'Impayée'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              {inv.pdf ? (
                                <a href={inv.pdf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 text-sm transition-colors">
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                                  PDF
                                </a>
                              ) : <span className="text-muted text-sm">—</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PROFIL */}
          {section === 'profil' && (
            <div>
              <div className="mb-8">
                <h1 className="text-2xl font-display font-bold text-fg">Profil</h1>
                <p className="text-muted text-sm mt-1">Gérez vos informations personnelles.</p>
              </div>
              <div className="max-w-lg">
                <div className="bg-primary/40 border border-border rounded-2xl p-6 space-y-5">
                  <div className="flex items-center gap-4 pb-4 border-b border-border">
                    <div className="w-16 h-16 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center">
                      <span className="text-accent text-xl font-bold">{initials}</span>
                    </div>
                    <div>
                      <p className="font-display font-semibold text-fg">{displayName}</p>
                      <p className="text-sm text-muted">{user?.email}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Nom complet</label>
                    <input type="text" value={profile.full_name} onChange={(e) => setProfile(p => ({ ...p, full_name: e.target.value }))} className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-fg text-sm focus:outline-none focus:border-accent/50 transition-colors" placeholder="Votre nom complet" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Nom de l&apos;entreprise</label>
                    <input type="text" value={profile.company_name} onChange={(e) => setProfile(p => ({ ...p, company_name: e.target.value }))} className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-fg text-sm focus:outline-none focus:border-accent/50 transition-colors" placeholder="Nom de votre entreprise" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Email</label>
                    <input type="email" value={profile.email} disabled className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-muted text-sm cursor-not-allowed" />
                    <p className="text-xs text-muted mt-1">L&apos;email ne peut pas être modifié ici.</p>
                  </div>
                  <button onClick={handleSaveProfile} disabled={savingProfile} className="w-full py-3 rounded-xl bg-accent text-bg text-sm font-bold hover:bg-accent/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                    {savingProfile && <span className="w-4 h-4 border-2 border-bg border-t-transparent rounded-full animate-spin" />}
                    {profileSaved ? '✓ Sauvegardé' : 'Sauvegarder'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Cancel modal */}
      {cancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setCancelModal(false)} />
          <div className="relative bg-primary border border-border rounded-2xl p-6 max-w-md w-full">
            <h3 className="font-display font-bold text-fg text-lg mb-2">Annuler l&apos;abonnement ?</h3>
            <p className="text-muted text-sm mb-6">Votre abonnement restera actif jusqu&apos;à la fin de la période en cours. Vous pouvez annuler via le portail Stripe.</p>
            <div className="flex gap-3">
              <button onClick={() => setCancelModal(false)} className="flex-1 py-2.5 rounded-xl border border-border text-muted hover:text-fg transition-all text-sm">Retour</button>
              <button onClick={() => { setCancelModal(false); handlePortal(); }} disabled={loadingPortal} className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all text-sm font-semibold disabled:opacity-50">Annuler via Stripe</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
