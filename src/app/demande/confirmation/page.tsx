"use client";
import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

const packLabels: Record<string, string> = {
  essentiel: 'Pack Essentiel — 890.- + 19.90.-/mois',
  confort: 'Pack Confort — 890.- + 39.90.-/mois',
  croissance: 'Pack Croissance — 890.- + 99.90.-/mois',
};

const serviceLabels: Record<string, string> = {
  google_ads: 'Google Ads',
  seo: 'SEO / Référencement',
  google_my_business: 'Google My Business',
  reseaux_sociaux: 'Réseaux Sociaux',
  meta_ads: 'Meta / LinkedIn Ads',
  email_marketing: 'Email Marketing',
  chatbot: 'Chatbot IA',
  automatisation: 'Automatisation des tâches',
  analyse_donnees: 'Analyse de données IA',
  generation_contenu: 'Génération de contenu IA',
};

const steps = [
  {
    num: 1,
    title: 'Confirmation par email',
    desc: 'Vous recevrez un email de confirmation avec le récapitulatif de votre demande.',
    delay: '24h',
    delayColor: 'text-accent',
  },
  {
    num: 2,
    title: 'Prise de contact par notre équipe',
    desc: 'Un membre de notre équipe vous contactera pour valider votre projet.',
    delay: '48h ouvrables',
    delayColor: 'text-accent',
  },
  {
    num: 3,
    title: 'Appel de découverte et analyse de vos besoins',
    desc: 'Nous planifions un appel pour comprendre en détail vos objectifs et votre vision.',
    delay: null,
    delayColor: '',
  },
  {
    num: 4,
    title: 'Envoi de votre devis personnalisé',
    desc: 'Vous recevrez une proposition détaillée adaptée à vos besoins spécifiques.',
    delay: null,
    delayColor: '',
  },
  {
    num: 5,
    title: 'Lancement du projet',
    desc: 'Après validation du devis, nous démarrons la création de votre projet.',
    delay: null,
    delayColor: '',
  },
];

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);

  const prenom = searchParams.get('prenom') || '';
  const nom = searchParams.get('nom') || '';
  const email = searchParams.get('email') || '';
  const entreprise = searchParams.get('entreprise') || '';
  const pack = searchParams.get('pack') || '';
  const servicesRaw = searchParams.get('services') || '';
  const services = servicesRaw ? servicesRaw.split(',').filter(Boolean) : [];

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 100);
    const t2 = setTimeout(() => setChecked(true), 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-4">
      {/* Background blobs */}
      <div className="blob bg-accent/10 w-[500px] h-[500px] top-0 right-0 pointer-events-none" />
      <div className="blob bg-accent/5 w-[300px] h-[300px] bottom-20 left-0 pointer-events-none" />

      <div
        className="max-w-3xl w-full mx-auto relative z-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        {/* Animated checkmark */}
        <div className="flex flex-col items-center mb-10">
          <div
            className="relative w-28 h-28 rounded-full flex items-center justify-center mb-6"
            style={{
              background: 'radial-gradient(circle, rgba(0,194,255,0.18) 0%, rgba(0,194,255,0.04) 70%)',
              boxShadow: checked ? '0 0 48px 8px rgba(0,194,255,0.25)' : '0 0 0px 0px rgba(0,194,255,0)',
              transition: 'box-shadow 0.8s ease',
            }}
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="32"
                cy="32"
                r="30"
                stroke="#00C2FF"
                strokeWidth="2.5"
                strokeDasharray="188.5"
                strokeDashoffset={checked ? 0 : 188.5}
                style={{ transition: 'stroke-dashoffset 0.7s ease 0.2s' }}
              />
              <path
                d="M18 33L27 42L46 22"
                stroke="#00C2FF"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="40"
                strokeDashoffset={checked ? 0 : 40}
                style={{ transition: 'stroke-dashoffset 0.5s ease 0.8s' }}
              />
            </svg>
          </div>

          <h1 className="font-display font-800 text-3xl md:text-4xl lg:text-5xl text-center mb-3">
            Demande envoyée{' '}
            <span className="gradient-text">avec succès !</span>
          </h1>
          {prenom && (
            <p className="text-muted font-body text-lg text-center">
              Merci <strong className="text-fg">{prenom} {nom}</strong>, votre demande a bien été reçue.
            </p>
          )}
        </div>

        {/* Summary card */}
        {(email || pack || services.length > 0 || entreprise) && (
          <div className="card-glass rounded-3xl p-8 mb-8">
            <h2 className="font-display font-700 text-xl mb-5 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm">📋</span>
              Récapitulatif de votre demande
            </h2>
            <div className="space-y-4">
              {(prenom || nom) && (
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-3 border-b border-white/10">
                  <span className="text-muted text-sm">Nom complet</span>
                  <span className="text-fg font-medium">{prenom} {nom}</span>
                </div>
              )}
              {email && (
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-3 border-b border-white/10">
                  <span className="text-muted text-sm">Email</span>
                  <span className="text-accent font-medium">{email}</span>
                </div>
              )}
              {entreprise && (
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-3 border-b border-white/10">
                  <span className="text-muted text-sm">Entreprise</span>
                  <span className="text-fg font-medium">{entreprise}</span>
                </div>
              )}
              {pack && (
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-3 border-b border-white/10">
                  <span className="text-muted text-sm">Pack choisi</span>
                  <span className="text-accent font-semibold capitalize">
                    {packLabels[pack] || pack}
                  </span>
                </div>
              )}
              {services.length > 0 && (
                <div className="py-3">
                  <span className="text-muted text-sm block mb-3">Services sélectionnés</span>
                  <div className="flex flex-wrap gap-2">
                    {services.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium"
                      >
                        {serviceLabels[s] || s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="card-glass rounded-3xl p-8 mb-8">
          <h2 className="font-display font-700 text-xl mb-6 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm">🗓</span>
            Prochaines étapes
          </h2>
          <div className="relative">
            <div className="absolute left-5 top-6 bottom-6 w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent hidden sm:block" />
            <div className="space-y-6">
              {steps.map((step, idx) => (
                <div
                  key={step.num}
                  className="flex gap-4 sm:gap-6 items-start"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateX(0)' : 'translateX(-16px)',
                    transition: `opacity 0.5s ease ${0.3 + idx * 0.12}s, transform 0.5s ease ${0.3 + idx * 0.12}s`,
                  }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent font-display font-700 text-sm z-10">
                    {step.num}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-display font-600 text-base text-fg">{step.title}</h3>
                      {step.delay && (
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 ${step.delayColor}`}>
                          {step.delay}
                        </span>
                      )}
                    </div>
                    <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/homepage"
            className="btn-primary text-center px-8 py-4 rounded-2xl font-display font-600 text-base"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/pricing"
            className="btn-secondary text-center px-8 py-4 rounded-2xl font-display font-600 text-base"
          >
            Voir nos offres
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-bg text-fg overflow-x-hidden">
      <div className="noise-overlay" />
      <Header />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <ConfirmationContent />
      </Suspense>
      <Footer />
    </div>
  );
}
