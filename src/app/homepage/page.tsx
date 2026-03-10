"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

const stats = [
  { value: '150+', label: 'Sites livrés', suffix: '' },
  { value: '98', label: 'Clients satisfaits', suffix: '%' },
  { value: '48h', label: 'Délai de réponse', suffix: '' },
  { value: '3', label: 'Packs disponibles', suffix: '' },
];

const packs = [
  {
    name: 'Pack 1',
    title: 'Site Sans Entretien',
    price: '19.90',
    setup: '890.-',
    color: 'from-blue-900/30 to-bg',
    borderColor: 'border-blue-500/20',
    features: [
      'Site web professionnel',
      'Design responsive mobile',
      'Hébergement inclus',
      'Nom de domaine (.ch)',
      'Certificat SSL',
      'Formulaire de contact',
    ],
    cta: 'Choisir Pack 1',
    featured: false,
  },
  {
    name: 'Pack 2',
    title: 'Site + Entretien',
    price: '39.90',
    setup: '890.-',
    color: 'from-accent/10 to-accent2/10',
    borderColor: 'border-accent/40',
    features: [
      'Tout du Pack 1',
      'Mises à jour mensuelles',
      'Maintenance technique',
      'Sauvegardes automatiques',
      'Support prioritaire',
      'Rapport mensuel',
    ],
    cta: 'Choisir Pack 2',
    featured: true,
  },
  {
    name: 'Pack 3',
    title: 'Site + Marketing',
    price: '99.90',
    setup: '890.-',
    color: 'from-purple-900/20 to-bg',
    borderColor: 'border-purple-500/20',
    features: [
      'Tout du Pack 2',
      'Stratégie SEO locale',
      'Gestion réseaux sociaux',
      'Campagnes Google Ads',
      'Email marketing',
      'Tableau de bord analytics',
    ],
    cta: 'Choisir Pack 3',
    featured: false,
  },
];

const testimonials = [
  {
    name: 'Marc Dubois',
    role: 'Gérant, Plomberie Dubois SA',
    location: 'Genève',
    quote: 'ECR360 Digital a transformé notre présence en ligne. En 3 mois, nos demandes de devis ont augmenté de 60%. Service impeccable, équipe réactive.',
    rating: 5,
  },
  {
    name: 'Sophie Favre',
    role: 'Directrice, Cabinet Favre RH',
    location: 'Lausanne',
    quote: 'Le Pack 3 nous a permis d\'automatiser notre marketing. On reçoit maintenant des leads qualifiés chaque semaine sans effort de notre part.',
    rating: 5,
  },
  {
    name: 'Thomas Müller',
    role: 'Fondateur, Müller Consulting',
    location: 'Zurich',
    quote: 'Rapport qualité-prix imbattable pour la Suisse. Notre site est magnifique et le support est toujours disponible. Je recommande vivement.',
    rating: 5,
  },
];

export default function Homepage() {
  const revealRefs = useRef<HTMLElement[]>([]);
  const [countersStarted, setCountersStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal-hidden').forEach((el) => observer.observe(el));

    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countersStarted) {
          setCountersStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    const statsSection = document.getElementById('stats-section');
    if (statsSection) statsObserver.observe(statsSection);

    return () => { observer.disconnect(); statsObserver.disconnect(); };
  }, [countersStarted]);

  return (
    <div className="min-h-screen bg-bg text-fg overflow-x-hidden">
      <div className="noise-overlay" />
      <Header />

      {/* ═══════════════════════════════════════ HERO ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center hero-bg overflow-hidden pt-20">
        {/* Grid background */}
        <div className="grid-bg absolute inset-0" />

        {/* Blobs */}
        <div className="blob bg-accent2/20 w-[600px] h-[600px] top-[-100px] left-[-200px]" />
        <div className="blob blob2 bg-accent/10 w-[400px] h-[400px] bottom-[-50px] right-[-100px]" />

        {/* Scan line */}
        <div className="scan-line" />

        <div className="max-w-8xl mx-auto px-6 lg:px-8 relative z-10 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div>
              {/* Badge */}
              <div className="hero-badges mb-6">
                <span className="badge-accent">
                  🇨🇭 Solutions Digitales Suisses
                </span>
              </div>

              {/* Title */}
              <h1 className="hero-title font-display font-800 text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6">
                Votre présence digitale,{' '}
                <span className="gradient-text">clé en main</span>
              </h1>

              {/* Subtitle */}
              <p className="hero-subtitle font-body text-lg md:text-xl text-muted leading-relaxed mb-8 max-w-lg">
                Sites web professionnels, marketing digital et automatisation IA pour PME suisses. À partir de{' '}
                <span className="text-accent font-semibold">890.- setup</span> et{' '}
                <span className="text-accent font-semibold">19.90.-/mois</span>.
              </p>

              {/* CTAs */}
              <div className="hero-cta flex flex-wrap gap-4">
                <Link href="/pricing" className="btn-primary px-7 py-3.5 text-base relative z-10">
                  Voir les offres
                  <svg className="inline ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link href="/contact" className="btn-secondary px-7 py-3.5 text-base">
                  Parler à un expert
                </Link>
              </div>

              {/* Trust signals */}
              <div className="hero-badges mt-8 flex flex-wrap gap-4 text-sm text-muted">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Pas de frais cachés
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Support en français
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Résiliation mensuelle
                </span>
              </div>
            </div>

            {/* Right: Floating Cards */}
            <div className="relative h-[500px] hidden lg:block">
              {/* Main card */}
              <div className="hero-card-1 absolute top-8 right-0 w-72 card-glass rounded-2xl p-5 glow-accent">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                    <svg width="20" height="20" fill="none" stroke="#00C2FF" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-muted font-body">Site en ligne</p>
                    <p className="text-sm font-display font-semibold text-fg">Pack 2 — Actif</p>
                  </div>
                  <span className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>
                <div className="divider-accent mb-4" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-xs text-muted">Visiteurs/mois</p>
                    <p className="text-lg font-display font-bold text-accent">+2'340</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-xs text-muted">Leads</p>
                    <p className="text-lg font-display font-bold text-green-400">+47</p>
                  </div>
                </div>
              </div>

              {/* Second card */}
              <div className="hero-card-2 absolute top-64 left-0 w-64 card-glass rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <svg width="16" height="16" fill="none" stroke="#a78bfa" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                    </svg>
                  </div>
                  <p className="text-xs font-display font-semibold text-fg">IA Active</p>
                </div>
                <p className="text-xs text-muted font-body leading-relaxed">Chatbot répondu à 23 questions aujourd&apos;hui</p>
                <div className="mt-3 bg-white/5 rounded-lg p-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted">Taux résolution</span>
                    <span className="text-accent font-semibold">94%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[94%] rounded-full bg-accent" />
                  </div>
                </div>
              </div>

              {/* Third card — SEO */}
              <div className="hero-card-3 absolute bottom-8 right-8 w-56 card-glass rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg width="16" height="16" fill="none" stroke="#00C2FF" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                  <p className="text-xs font-display font-semibold text-fg">SEO Score</p>
                </div>
                <p className="text-3xl font-display font-bold text-accent">92<span className="text-sm text-muted">/100</span></p>
                <p className="text-xs text-green-400 mt-1">↑ +12 ce mois</p>
              </div>

              {/* Logo in center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-bg border border-accent/20 flex items-center justify-center">
                <AppImage
                  src="/assets/images/1275785-1773171741897.png"
                  alt="ECR360 Digital logo — solutions digitales suisses"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted text-xs">
          <span className="font-body">Découvrir</span>
          <div className="w-px h-8 bg-gradient-to-b from-accent/50 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ═══════════════════════════════════════ STATS ═══════════════════════════════════════ */}
      <section id="stats-section" className="relative py-16 section-bg-alt">
        <div className="max-w-8xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`reveal-hidden stagger-${i + 1} card-glass rounded-2xl p-6 text-center card-glass-hover`}
              >
                <p className="text-3xl md:text-4xl font-display font-800 gradient-text">
                  {stat.value}{stat.suffix}
                </p>
                <p className="text-sm text-muted font-body mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ PROBLÈME/SOLUTION ═══════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden">
        <div className="blob bg-accent2/10 w-[500px] h-[500px] top-0 right-[-200px]" />
        <div className="max-w-8xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="reveal-hidden">
              <span className="badge-accent mb-4 inline-block">Le problème</span>
              <h2 className="font-display font-700 text-4xl md:text-5xl leading-tight tracking-tight mb-6">
                Votre business mérite mieux qu&apos;un site{' '}
                <span className="text-muted line-through">amateur</span>
              </h2>
              <p className="font-body text-muted text-lg leading-relaxed mb-8">
                En Suisse, 67% des PME perdent des clients faute d&apos;une présence digitale professionnelle. Pendant ce temps, vos concurrents captent ces clients en ligne.
              </p>
              <div className="space-y-4">
                {[
                  'Site non trouvable sur Google',
                  'Design non adapté mobile',
                  'Aucun système de capture de leads',
                  'Pas de marketing automatisé',
                ].map((pain) => (
                  <div key={pain} className="flex items-center gap-3 text-muted">
                    <svg width="16" height="16" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="font-body text-sm">{pain}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="reveal-hidden stagger-2">
              <span className="badge-accent mb-4 inline-block">Notre solution</span>
              <h2 className="font-display font-700 text-4xl md:text-5xl leading-tight tracking-tight mb-6">
                Une solution complète,{' '}
                <span className="gradient-text">sans complexité</span>
              </h2>
              <p className="font-body text-muted text-lg leading-relaxed mb-8">
                ECR360 Digital prend en charge votre présence digitale de A à Z. Vous vous concentrez sur votre métier, nous gérons le reste.
              </p>
              <div className="space-y-4">
                {[
                  'Site professionnel livré en 5 jours',
                  'Référencement Google optimisé dès le départ',
                  'Automatisation marketing intégrée',
                  'Support en français, équipe suisse',
                ].map((solution) => (
                  <div key={solution} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <svg width="12" height="12" fill="none" stroke="#00C2FF" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="font-body text-sm text-fg">{solution}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ PACKS ═══════════════════════════════════════ */}
      <section className="relative py-24 section-bg-alt overflow-hidden">
        <div className="max-w-8xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 reveal-hidden">
            <span className="badge-accent mb-4 inline-block">Nos Offres</span>
            <h2 className="font-display font-700 text-4xl md:text-5xl leading-tight tracking-tight mb-4">
              3 packs pour{' '}
              <span className="gradient-text">chaque ambition</span>
            </h2>
            <p className="font-body text-muted text-lg max-w-xl mx-auto">
              Choisissez le pack adapté à votre situation. Évoluez à tout moment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packs.map((pack, i) => (
              <div
                key={pack.name}
                className={`reveal-hidden stagger-${i + 1} relative rounded-2xl p-6 flex flex-col transition-all duration-500 ${
                  pack.featured
                    ? 'pricing-featured'
                    : `card-glass bg-gradient-to-br ${pack.color} border ${pack.borderColor}`
                }`}
              >
                {pack.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="badge-accent text-xs px-4 py-1.5 bg-accent text-bg font-bold border-none">
                      ⭐ Populaire
                    </span>
                  </div>
                )}
                <div className="mb-5">
                  <span className="text-xs font-display font-700 text-accent uppercase tracking-widest">{pack.name}</span>
                  <h3 className="font-display font-700 text-xl mt-1 text-fg">{pack.title}</h3>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-display font-800 gradient-text">{pack.price}</span>
                    <span className="text-muted text-sm font-body">CHF/mois</span>
                  </div>
                  <p className="text-xs text-muted mt-1">+ {pack.setup} setup unique</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {pack.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm font-body text-fg/80">
                      <svg width="14" height="14" fill="none" stroke="#00C2FF" strokeWidth="2.5" viewBox="0 0 24 24" className="mt-0.5 flex-shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/pricing"
                  className={`block text-center py-3 px-5 rounded-full text-sm font-display font-600 transition-all duration-300 ${
                    pack.featured
                      ? 'btn-primary relative z-10' :'btn-secondary'
                  }`}
                >
                  {pack.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 reveal-hidden">
            <Link href="/pricing" className="text-accent hover:text-fg transition-colors text-sm font-body font-medium underline underline-offset-4">
              Voir la comparaison détaillée →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ SERVICES ═══════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden">
        <div className="blob bg-accent/8 w-[400px] h-[400px] bottom-0 left-[-100px]" />
        <div className="max-w-8xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 reveal-hidden">
            <span className="badge-accent mb-4 inline-block">Nos Services</span>
            <h2 className="font-display font-700 text-4xl md:text-5xl leading-tight tracking-tight">
              Plus que des sites web —{' '}
              <span className="gradient-text">un écosystème digital</span>
            </h2>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Large card — Marketing */}
            <div className="reveal-hidden lg:col-span-2 card-glass rounded-2xl p-8 card-glass-hover group">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <svg width="24" height="24" fill="none" stroke="#00C2FF" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
                  </svg>
                </div>
                <Link href="/marketing-solutions" className="text-accent text-sm font-body font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Découvrir →
                </Link>
              </div>
              <h3 className="font-display font-700 text-2xl mb-3">Solutions Marketing Digital</h3>
              <p className="text-muted font-body leading-relaxed mb-4">
                SEO local, Google Ads, réseaux sociaux, email marketing. Tout ce dont vous avez besoin pour attirer et convertir des clients en ligne.
              </p>
              <div className="flex flex-wrap gap-2">
                {['SEO', 'Google Ads', 'Social Media', 'Email Marketing'].map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-body border border-accent/20">{tag}</span>
                ))}
              </div>
            </div>

            {/* AI card */}
            <div className="reveal-hidden stagger-2 card-glass rounded-2xl p-8 card-glass-hover group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
                <svg width="24" height="24" fill="none" stroke="#a78bfa" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                </svg>
              </div>
              <h3 className="font-display font-700 text-xl mb-3">Automatisation IA</h3>
              <p className="text-muted font-body text-sm leading-relaxed mb-4">
                Chatbots, automatisation des emails, qualification de leads. L&apos;IA au service de votre croissance.
              </p>
              <Link href="/ai-automation" className="text-accent text-sm font-body font-medium group-hover:underline">
                Explorer l&apos;IA →
              </Link>
            </div>

            {/* Support card */}
            <div className="reveal-hidden stagger-3 card-glass rounded-2xl p-6 card-glass-hover">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">
                <svg width="20" height="20" fill="none" stroke="#4ade80" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="font-display font-600 text-lg mb-2">Support Suisse</h3>
              <p className="text-muted font-body text-xs leading-relaxed">Équipe basée en Suisse, support en français, réponse sous 48h garantie.</p>
            </div>

            {/* Speed card */}
            <div className="reveal-hidden stagger-4 card-glass rounded-2xl p-6 card-glass-hover">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center mb-4">
                <svg width="20" height="20" fill="none" stroke="#fbbf24" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="font-display font-600 text-lg mb-2">Livraison en 5 jours</h3>
              <p className="text-muted font-body text-xs leading-relaxed">Votre site professionnel mis en ligne en moins d&apos;une semaine.</p>
            </div>

            {/* Analytics card */}
            <div className="reveal-hidden stagger-5 card-glass rounded-2xl p-6 card-glass-hover">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                <svg width="20" height="20" fill="none" stroke="#60a5fa" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <h3 className="font-display font-600 text-lg mb-2">Analytics inclus</h3>
              <p className="text-muted font-body text-xs leading-relaxed">Tableau de bord clair pour suivre vos performances en temps réel.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ TESTIMONIALS ═══════════════════════════════════════ */}
      <section className="relative py-24 section-bg-alt overflow-hidden">
        <div className="max-w-8xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 reveal-hidden">
            <span className="badge-accent mb-4 inline-block">Témoignages</span>
            <h2 className="font-display font-700 text-4xl md:text-5xl leading-tight tracking-tight">
              Ils nous font{' '}
              <span className="gradient-text">confiance</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`reveal-hidden stagger-${i + 1} card-glass rounded-2xl p-6 card-glass-hover`}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <svg key={si} width="14" height="14" fill="#00C2FF" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="font-body text-fg/80 text-sm leading-relaxed mb-5 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="divider-accent mb-4" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-display font-700 text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-display font-600 text-sm text-fg">{t.name}</p>
                    <p className="text-xs text-muted font-body">{t.role}</p>
                    <p className="text-xs text-accent font-body">🇨🇭 {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ CTA FINAL ═══════════════════════════════════════ */}
      <section className="relative py-28 overflow-hidden">
        <div className="blob bg-accent2/20 w-[600px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-8xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="reveal-hidden text-center max-w-3xl mx-auto">
            <h2 className="font-display font-800 text-4xl md:text-6xl leading-tight tracking-tight mb-6">
              Prêt à{' '}
              <span className="gradient-text">transformer</span>
              {' '}votre présence digitale?
            </h2>
            <p className="font-body text-muted text-xl mb-10 leading-relaxed">
              Rejoignez plus de 150 PME suisses qui font confiance à ECR360 Digital. Consultation gratuite, sans engagement.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary px-8 py-4 text-base relative z-10">
                Démarrer mon projet gratuitement
                <svg className="inline ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/pricing" className="btn-secondary px-8 py-4 text-base">
                Voir les tarifs
              </Link>
            </div>
            <p className="text-xs text-muted mt-6 font-body">Consultation 100% gratuite · Réponse sous 48h · Pas d&apos;engagement</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}