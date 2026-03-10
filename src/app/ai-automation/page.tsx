"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

const solutions = [
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#a78bfa" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
    title: 'Chatbot Intelligent',
    desc: 'Répondez automatiquement aux questions fréquentes de vos visiteurs 24h/24. Qualifiez les leads avant qu\'ils vous contactent.',
    benefit: 'Économisez 15h/semaine de support client',
    color: 'bg-purple-500/20',
    tag: 'IA Conversationnelle',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#00C2FF" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    title: 'Email Automation',
    desc: 'Séquences d\'emails automatiques déclenchées par les actions de vos prospects. Nurturing intelligent jusqu\'à la conversion.',
    benefit: '4x plus de conversions sur les leads froids',
    color: 'bg-accent/20',
    tag: 'Marketing Automation',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#4ade80" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: 'Lead Scoring IA',
    desc: 'L\'IA analyse le comportement de vos visiteurs et score chaque lead selon sa probabilité de conversion. Concentrez-vous sur les meilleurs prospects.',
    benefit: '60% de réduction du temps de qualification',
    color: 'bg-green-500/20',
    tag: 'Intelligence Artificielle',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#fbbf24" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
      </svg>
    ),
    title: 'Reporting Automatisé',
    desc: 'Rapports de performance générés automatiquement chaque semaine. Insights actionnables sans effort de votre part.',
    benefit: 'Décisions 3x plus rapides basées sur les données',
    color: 'bg-yellow-500/20',
    tag: 'Business Intelligence',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#f472b6" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: 'Intégrations & CRM',
    desc: 'Connectez votre site à votre CRM, agenda, et outils métier. Tout synchronisé automatiquement, zéro saisie manuelle.',
    benefit: '8h/semaine gagnées sur les tâches administratives',
    color: 'bg-pink-500/20',
    tag: 'Automatisation',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#60a5fa" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    title: 'Génération de Contenu IA',
    desc: 'L\'IA génère des variantes de textes pour vos publicités, emails et posts sociaux. Testez plus vite, optimisez en continu.',
    benefit: '10x plus de variations testées par mois',
    color: 'bg-blue-500/20',
    tag: 'IA Générative',
  },
];

const useCases = [
  {
    sector: 'Artisans & PME',
    scenario: 'Un plombier reçoit automatiquement les demandes de devis via chatbot, qualifiées par l\'IA, avec notification SMS instantanée.',
    saving: '12h/semaine économisées',
  },
  {
    sector: 'Professionnels libéraux',
    scenario: 'Un cabinet médical automatise les rappels de rendez-vous, les suivis patients et les newsletters mensuelles.',
    saving: '8h/semaine économisées',
  },
  {
    sector: 'Commerce & Retail',
    scenario: 'Une boutique envoie des emails de relance automatiques après abandon de panier, avec offres personnalisées par l\'IA.',
    saving: '+35% de récupération de paniers',
  },
];

export default function AIAutomation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('revealed')),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal-hidden')?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-bg text-fg overflow-x-hidden">
      <div className="noise-overlay" />
      <Header />
      {/* Lightweight Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="blob bg-purple-500/10 w-[500px] h-[300px] top-0 right-[-100px]" />
        <div className="grid-bg absolute inset-0 opacity-40" />
        <div className="max-w-8xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="badge-accent mb-4 inline-block">Automatisation IA</span>
            <h1 className="font-display font-800 text-4xl md:text-6xl leading-tight tracking-tight mb-5">
              L&apos;IA qui travaille{' '}
              <span className="gradient-text">pendant que vous dormez</span>
            </h1>
            <p className="font-body text-muted text-xl leading-relaxed mb-8">
              Automatisez vos tâches répétitives, qualifiez vos leads et fidélisez vos clients — sans effort supplémentaire. L&apos;IA accessible aux PME suisses.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary px-7 py-3.5 text-base relative z-10">
                Demander une démo IA
              </Link>
              <Link href="/pricing" className="btn-secondary px-7 py-3.5 text-base">
                Voir les tarifs
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Live demo visual */}
      <section className="relative py-16 section-bg-alt">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="reveal-hidden card-glass rounded-2xl p-6 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-muted font-body font-medium">Chatbot ECR360 — En direct sur votre site</span>
              <span className="ml-auto flex items-center gap-1.5 text-xs text-green-400 font-body">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Actif 24/7
              </span>
            </div>

            <div className="space-y-4 max-w-2xl">
              {/* Bot message */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" fill="none" stroke="#00C2FF" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <div className="bg-white/5 rounded-2xl rounded-tl-none p-4 max-w-sm">
                  <p className="text-sm font-body text-fg/80">Bonjour! Je suis l&apos;assistant virtuel de Dubois Plomberie. Comment puis-je vous aider aujourd&apos;hui?</p>
                </div>
              </div>

              {/* User message */}
              <div className="flex gap-3 justify-end">
                <div className="bg-accent/20 border border-accent/20 rounded-2xl rounded-tr-none p-4 max-w-sm">
                  <p className="text-sm font-body text-fg/80">J&apos;ai une fuite d&apos;eau urgente, pouvez-vous intervenir aujourd&apos;hui?</p>
                </div>
              </div>

              {/* Bot response */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" fill="none" stroke="#00C2FF" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <div className="bg-white/5 rounded-2xl rounded-tl-none p-4 max-w-sm">
                  <p className="text-sm font-body text-fg/80">Oui, nous intervenons en urgence! Pour une fuite, notre équipe peut être chez vous dans 2h. Pouvez-vous me donner votre adresse et un numéro de contact?</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button className="text-xs bg-accent/20 border border-accent/30 text-accent rounded-lg py-1.5 px-3 font-body">Donner mon adresse</button>
                    <button className="text-xs bg-white/5 border border-white/10 text-fg/60 rounded-lg py-1.5 px-3 font-body">Appeler directement</button>
                  </div>
                </div>
              </div>

              {/* AI notification */}
              <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl p-3 mt-2">
                <svg width="16" height="16" fill="none" stroke="#4ade80" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
                <p className="text-xs font-body text-green-400">🤖 Lead qualifié envoyé par SMS à Marc Dubois — 17:43</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Solutions */}
      <section className="relative py-24">
        <div className="max-w-8xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14 reveal-hidden">
            <span className="badge-accent mb-4 inline-block">Solutions IA</span>
            <h2 className="font-display font-700 text-3xl md:text-4xl tracking-tight">
              Tout ce que l&apos;IA peut faire pour vous
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutions?.map((s, i) => (
              <div
                key={s?.title}
                className={`reveal-hidden stagger-${(i % 3) + 1} card-glass rounded-2xl p-6 card-glass-hover`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${s?.color} flex items-center justify-center`}>
                    {s?.icon}
                  </div>
                  <span className="text-xs font-body text-muted border border-white/10 rounded-full px-2 py-0.5">{s?.tag}</span>
                </div>
                <h3 className="font-display font-700 text-lg mb-2">{s?.title}</h3>
                <p className="text-muted font-body text-sm leading-relaxed mb-4">{s?.desc}</p>
                <div className="flex items-center gap-2 text-xs font-body text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                  {s?.benefit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Use cases */}
      <section className="relative py-20 section-bg-alt overflow-hidden">
        <div className="blob bg-purple-500/10 w-[400px] h-[300px] bottom-0 right-[-100px]" />
        <div className="max-w-8xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14 reveal-hidden">
            <span className="badge-accent mb-4 inline-block">Cas d&apos;usage</span>
            <h2 className="font-display font-700 text-3xl md:text-4xl tracking-tight">
              L&apos;IA dans votre secteur
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {useCases?.map((uc, i) => (
              <div
                key={uc?.sector}
                className={`reveal-hidden stagger-${i + 1} card-glass rounded-2xl p-7 card-glass-hover`}
              >
                <h3 className="font-display font-700 text-xl mb-3 text-accent">{uc?.sector}</h3>
                <p className="text-muted font-body text-sm leading-relaxed mb-4">{uc?.scenario}</p>
                <div className="flex items-center gap-2 text-xs font-body text-accent bg-accent/10 border border-accent/20 rounded-lg px-3 py-2">
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {uc?.saving}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ROI Calculator visual */}
      <section className="relative py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="reveal-hidden card-glass rounded-2xl p-10 md:p-14 text-center">
            <span className="badge-accent mb-4 inline-block">ROI Estimé</span>
            <h2 className="font-display font-700 text-3xl md:text-4xl tracking-tight mb-4">
              Combien l&apos;IA peut vous faire économiser?
            </h2>
            <p className="text-muted font-body mb-10 text-lg">
              En moyenne, nos clients PME économisent <span className="text-accent font-semibold">23h par semaine</span> grâce à l&apos;automatisation IA.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {[
                { value: '23h', label: 'Économisées/semaine', sub: 'En tâches répétitives' },
                { value: '94%', label: 'Taux de résolution', sub: 'Chatbot IA' },
                { value: '4x', label: 'Plus de conversions', sub: 'Sur leads automatisés' },
              ]?.map((stat) => (
                <div key={stat?.label} className="bg-white/5 rounded-xl p-5">
                  <p className="font-display font-800 text-4xl gradient-text mb-1">{stat?.value}</p>
                  <p className="text-sm font-display font-600 text-fg mb-0.5">{stat?.label}</p>
                  <p className="text-xs text-muted font-body">{stat?.sub}</p>
                </div>
              ))}
            </div>
            <Link href="/contact" className="btn-primary px-8 py-4 text-base inline-block relative z-10">
              Calculer mon ROI personnalisé
            </Link>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="relative py-20 section-bg-alt">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center reveal-hidden">
          <h2 className="font-display font-700 text-3xl md:text-4xl tracking-tight mb-4">
            Prêt à automatiser votre business?
          </h2>
          <p className="text-muted font-body mb-8 text-lg">
            Démo gratuite de 30 minutes pour voir l&apos;IA en action dans votre secteur.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary px-8 py-4 text-base relative z-10">
              Demander ma démo gratuite
            </Link>
            <Link href="/pricing" className="btn-secondary px-8 py-4 text-base">
              Voir les tarifs
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}