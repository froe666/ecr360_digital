"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

const googleServices = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#4285F4"/>
      </svg>
    ),
    badge: 'Google',
    title: 'Google My Business',
    subtitle: 'Fiche Google & Visibilité Locale',
    desc: 'Création et optimisation complète de votre fiche Google My Business. Apparaissez dans les recherches locales, Google Maps et le pack local Google.',
    benefits: [
      'Création / optimisation de votre fiche GMB',
      'Gestion des avis clients et réponses',
      'Publication de posts et actualités',
      'Photos professionnelles et visuels',
      'Suivi des statistiques de visibilité',
    ],
    color: 'bg-blue-500/15',
    borderColor: 'border-blue-500/20',
    badgeColor: 'bg-blue-500/20 text-blue-400',
    metric: '+300% de visibilité locale',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
    badge: 'Google',
    title: 'Google Ads',
    subtitle: 'Campagnes Publicitaires Payantes',
    desc: 'Campagnes Google Ads ciblées pour atteindre vos clients au moment où ils cherchent vos services. Search, Display et Remarketing.',
    benefits: [
      'Campagnes Search (annonces textuelles)',
      'Campagnes Display (bannières visuelles)',
      'Remarketing (reciblage visiteurs)',
      'Optimisation du budget et enchères',
      'Rapports ROI détaillés mensuels',
    ],
    color: 'bg-yellow-500/15',
    borderColor: 'border-yellow-500/20',
    badgeColor: 'bg-yellow-500/20 text-yellow-400',
    metric: 'ROI moyen 340%',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#34A853" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 0z" />
      </svg>
    ),
    badge: 'Google',
    title: 'Google Search Console',
    subtitle: 'Indexation & Performances SEO',
    desc: 'Suivi complet de l\'indexation de votre site, analyse des mots-clés qui génèrent du trafic et optimisation de vos performances dans les résultats Google.',
    benefits: [
      'Soumission et suivi de l\'indexation',
      'Analyse des mots-clés et positions',
      'Détection et correction des erreurs',
      'Optimisation des Core Web Vitals',
      'Rapports de performance hebdomadaires',
    ],
    color: 'bg-green-500/15',
    borderColor: 'border-green-500/20',
    badgeColor: 'bg-green-500/20 text-green-400',
    metric: 'Top 3 Google en 3 mois',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#FBBC05" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    badge: 'Google',
    title: 'Google Analytics',
    subtitle: 'Statistiques & Comportement',
    desc: 'Configuration et analyse de Google Analytics 4. Comprenez le comportement de vos visiteurs, les sources de trafic et les conversions.',
    benefits: [
      'Configuration GA4 complète',
      'Suivi des conversions et objectifs',
      'Analyse du comportement visiteurs',
      'Rapports sources de trafic',
      'Dashboard personnalisé en temps réel',
    ],
    color: 'bg-orange-500/15',
    borderColor: 'border-orange-500/20',
    badgeColor: 'bg-orange-500/20 text-orange-400',
    metric: 'Données en temps réel 24/7',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#00C2FF" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
    badge: 'Google',
    title: 'Google Maps',
    subtitle: 'Intégration & Présence Cartographique',
    desc: 'Intégration Google Maps sur votre site web et optimisation de votre présence sur la carte Google pour maximiser votre visibilité locale.',
    benefits: [
      'Intégration Maps sur votre site',
      'Optimisation fiche Maps complète',
      'Gestion des photos et horaires',
      'Réponse aux questions & avis',
      'Suivi des itinéraires et appels',
    ],
    color: 'bg-cyan-500/15',
    borderColor: 'border-cyan-500/20',
    badgeColor: 'bg-cyan-500/20 text-cyan-400',
    metric: '+250% de demandes d\'itinéraire',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#00C2FF" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 0z" />
      </svg>
    ),
    badge: 'SEO',
    title: 'SEO / Référencement Naturel',
    subtitle: 'Optimisation On-Page & Off-Page',
    desc: 'Stratégie SEO complète pour améliorer votre positionnement organique. Audit technique, optimisation on-page, création de backlinks de qualité.',
    benefits: [
      'Audit SEO technique complet',
      'Optimisation on-page (titres, métas, contenu)',
      'Stratégie de backlinks et netlinking',
      'Optimisation vitesse et Core Web Vitals',
      'Suivi des positions et rapport mensuel',
    ],
    color: 'bg-accent/15',
    borderColor: 'border-accent/20',
    badgeColor: 'bg-accent/20 text-accent',
    metric: '+180% de trafic organique',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#a78bfa" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
    ),
    badge: 'Social',
    title: 'Réseaux Sociaux',
    subtitle: 'Facebook, Instagram, LinkedIn, TikTok',
    desc: 'Gestion professionnelle de vos réseaux sociaux. Création de contenu engageant, planification, community management et croissance organique.',
    benefits: [
      'Gestion Facebook & Instagram',
      'Stratégie LinkedIn B2B',
      'Création contenu TikTok',
      'Planning éditorial mensuel',
      'Analyse des performances et engagement',
    ],
    color: 'bg-purple-500/15',
    borderColor: 'border-purple-500/20',
    badgeColor: 'bg-purple-500/20 text-purple-400',
    metric: '+250% d\'engagement moyen',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#f472b6" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    badge: 'Ads',
    title: 'Meta Ads & LinkedIn Ads',
    subtitle: 'Publicité sur Réseaux Sociaux',
    desc: 'Campagnes publicitaires ciblées sur Facebook, Instagram et LinkedIn. Audiences précises, créatifs percutants et optimisation continue du ROI.',
    benefits: [
      'Campagnes Meta Ads (Facebook/Instagram)',
      'Publicités LinkedIn pour B2B',
      'Ciblage audiences personnalisées',
      'Création des visuels publicitaires',
      'A/B testing et optimisation continue',
    ],
    color: 'bg-pink-500/15',
    borderColor: 'border-pink-500/20',
    badgeColor: 'bg-pink-500/20 text-pink-400',
    metric: 'CPA réduit de 60%',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#4ade80" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    badge: 'Email',
    title: 'Email Marketing',
    subtitle: 'Campagnes, Newsletters & Automatisation',
    desc: 'Stratégie email marketing complète pour fidéliser vos clients et générer des ventes récurrentes. Newsletters, séquences automatisées et segmentation.',
    benefits: [
      'Création de campagnes newsletters',
      'Séquences d\'automatisation (drip)',
      'Segmentation et personnalisation',
      'Templates HTML professionnels',
      'Analyse taux ouverture et clics',
    ],
    color: 'bg-green-500/15',
    borderColor: 'border-green-500/20',
    badgeColor: 'bg-green-500/20 text-green-400',
    metric: 'Taux ouverture 38% (vs 21%)',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#60a5fa" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
    badge: 'Contenu',
    title: 'Création de Contenu',
    subtitle: 'Textes, Visuels & Photos Produits',
    desc: 'Production de contenu professionnel pour votre site et vos réseaux sociaux. Rédaction SEO, visuels graphiques, photos produits et vidéos courtes.',
    benefits: [
      'Rédaction de textes optimisés SEO',
      'Création de visuels et infographies',
      'Photos produits professionnelles',
      'Vidéos courtes pour réseaux sociaux',
      'Blog et articles de fond',
    ],
    color: 'bg-blue-500/15',
    borderColor: 'border-blue-500/20',
    badgeColor: 'bg-blue-500/20 text-blue-400',
    metric: '3x plus de leads inbound',
  },
];

const process = [
  { step: '01', title: 'Audit Digital', desc: 'Analyse complète de votre présence digitale actuelle et de celle de vos concurrents.' },
  { step: '02', title: 'Stratégie Sur Mesure', desc: 'Définition d\'une stratégie marketing adaptée à votre secteur, vos objectifs et votre budget.' },
  { step: '03', title: 'Mise en Oeuvre', desc: 'Déploiement des actions marketing avec suivi hebdomadaire et optimisations continues.' },
  { step: '04', title: 'Mesure & Optimisation', desc: 'Reporting mensuel avec KPIs clés et ajustements stratégiques pour maximiser le ROI.' },
];

export default function MarketingSolutions() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('revealed')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal-hidden')?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-bg text-fg overflow-x-hidden">
      <div className="noise-overlay" />
      <Header />
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="blob bg-accent/10 w-[500px] h-[300px] top-0 right-[-100px]" />
        <div className="grid-bg absolute inset-0 opacity-40" />
        <div className="max-w-8xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="badge-accent mb-4 inline-block">Solutions Marketing</span>
            <h1 className="font-display font-800 text-4xl md:text-6xl leading-tight tracking-tight mb-5">
              Marketing digital{' '}
              <span className="gradient-text">360° complet</span>
            </h1>
            <p className="font-body text-muted text-xl leading-relaxed mb-8">
              Google My Business, Google Ads, SEO, réseaux sociaux, email marketing — tout ce qu&apos;il faut pour dominer votre marché local et générer des clients en continu.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary px-7 py-3.5 text-base relative z-10">
                Audit gratuit de ma présence
              </Link>
              <Link href="/demande" className="btn-secondary px-7 py-3.5 text-base">
                Démarrer mon projet
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Google Ecosystem Banner */}
      <section className="relative py-10 section-bg-alt">
        <div className="max-w-8xl mx-auto px-6 lg:px-8">
          <div className="card-glass rounded-2xl px-8 py-6 flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="font-display font-700 text-lg text-fg">Partenaire certifié Google</p>
              <p className="text-muted font-body text-sm mt-1">Nous maîtrisons l&apos;ensemble de l&apos;écosystème Google pour votre croissance</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {['Google My Business', 'Google Ads', 'Search Console', 'Analytics', 'Google Maps']?.map((g) => (
                <span key={g} className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-body font-medium">{g}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Services Grid */}
      <section className="relative py-20">
        <div className="max-w-8xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14 reveal-hidden">
            <span className="badge-accent mb-4 inline-block">Nos services</span>
            <h2 className="font-display font-700 text-3xl md:text-4xl tracking-tight">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-muted font-body mt-3 max-w-2xl mx-auto">
              De la visibilité locale à la publicité payante, en passant par les réseaux sociaux et l&apos;email marketing.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {googleServices?.map((s, i) => (
              <div
                key={s?.title}
                className={`reveal-hidden stagger-${(i % 3) + 1} card-glass rounded-2xl p-6 card-glass-hover border ${s?.borderColor}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${s?.color} flex items-center justify-center`}>
                    {s?.icon}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-body font-medium ${s?.badgeColor}`}>
                    {s?.badge}
                  </span>
                </div>
                <h3 className="font-display font-700 text-lg mb-1">{s?.title}</h3>
                <p className="text-accent text-xs font-body font-medium mb-3">{s?.subtitle}</p>
                <p className="text-muted font-body text-sm leading-relaxed mb-4">{s?.desc}</p>
                <ul className="space-y-2 mb-4">
                  {s?.benefits?.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-xs font-body text-fg/80">
                      <svg className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="pt-3 border-t border-white/5">
                  <span className="text-xs font-body text-accent font-medium">📈 {s?.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Process */}
      <section className="relative py-24 section-bg-alt overflow-hidden">
        <div className="blob bg-accent2/10 w-[400px] h-[400px] top-0 left-[-150px]" />
        <div className="max-w-8xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14 reveal-hidden">
            <span className="badge-accent mb-4 inline-block">Notre processus</span>
            <h2 className="font-display font-700 text-3xl md:text-4xl tracking-tight">Comment ça fonctionne</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {process?.map((p, i) => (
              <div key={p?.step} className={`reveal-hidden stagger-${i + 1} card-glass rounded-2xl p-8 card-glass-hover relative overflow-hidden`}>
                <span className="absolute top-4 right-6 font-display font-800 text-6xl text-fg/5 select-none">{p?.step}</span>
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                  <span className="font-display font-700 text-sm text-accent">{p?.step}</span>
                </div>
                <h3 className="font-display font-700 text-xl mb-2">{p?.title}</h3>
                <p className="text-muted font-body text-sm leading-relaxed">{p?.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Results */}
      <section className="relative py-20">
        <div className="max-w-8xl mx-auto px-6 lg:px-8">
          <div className="reveal-hidden card-glass rounded-2xl p-10 md:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="badge-accent mb-4 inline-block">Résultats concrets</span>
                <h2 className="font-display font-700 text-3xl md:text-4xl tracking-tight mb-4">
                  Des chiffres qui parlent d&apos;eux-mêmes
                </h2>
                <p className="text-muted font-body leading-relaxed mb-6">
                  Nos clients PME suisses voient des résultats mesurables dès les premiers mois. Performances moyennes sur 6 mois.
                </p>
                <Link href="/demande" className="btn-primary px-7 py-3.5 text-base inline-block relative z-10">
                  Démarrer mon projet
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '+180%', label: 'Trafic organique', color: 'text-accent' },
                  { value: '340%', label: 'ROI Google Ads moyen', color: 'text-green-400' },
                  { value: '+67%', label: 'Leads générés', color: 'text-accent' },
                  { value: '38%', label: 'Taux ouverture email', color: 'text-purple-400' },
                  { value: '+300%', label: 'Visibilité Google Maps', color: 'text-blue-400' },
                  { value: '-60%', label: 'Coût par acquisition', color: 'text-yellow-400' },
                ]?.map((stat) => (
                  <div key={stat?.label} className="bg-white/5 rounded-xl p-4 text-center">
                    <p className={`font-display font-800 text-2xl ${stat?.color} mb-1`}>{stat?.value}</p>
                    <p className="text-xs text-muted font-body">{stat?.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="relative py-24 section-bg-alt">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center reveal-hidden">
          <h2 className="font-display font-700 text-3xl md:text-4xl tracking-tight mb-4">
            Prêt à booster votre marketing?
          </h2>
          <p className="text-muted font-body mb-8 text-lg">
            Audit digital gratuit de votre présence actuelle. Sans engagement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary px-8 py-4 text-base relative z-10">
              Demander mon audit gratuit
            </Link>
            <Link href="/demande" className="btn-secondary px-8 py-4 text-base">
              Soumettre mon projet
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}