"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

const packOptions = [
  { value: '', label: 'Choisir un pack (optionnel)' },
  { value: 'pack1', label: 'Pack 1 — Site Sans Entretien (19.90.-/mois)' },
  { value: 'pack2', label: 'Pack 2 — Site + Entretien (39.90.-/mois)' },
  { value: 'pack3', label: 'Pack 3 — Site + Marketing (99.90.-/mois)' },
  { value: 'marketing', label: 'Solutions Marketing uniquement' },
  { value: 'ai', label: 'Automatisation IA uniquement' },
  { value: 'custom', label: 'Solution sur mesure' },
];

const contactInfo = [
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="#00C2FF" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: 'Email',
    value: 'info@ecr360.ch',
    href: 'mailto:info@ecr360.ch',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="#00C2FF" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    label: 'Site web',
    value: 'digital.ecr360.ch',
    href: 'https://digital.ecr360.ch',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="#00C2FF" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: 'Localisation',
    value: 'Suisse 🇨🇭',
    href: null,
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="#00C2FF" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Réponse',
    value: 'Sous 48 heures',
    href: null,
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    pack: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('revealed')),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal-hidden').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Mock submit — backend connection point
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-bg text-fg overflow-x-hidden">
      <div className="noise-overlay" />
      <Header />

      {/* Lightweight Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="blob bg-accent2/15 w-[400px] h-[300px] top-0 right-[-50px]" />
        <div className="grid-bg absolute inset-0 opacity-40" />
        <div className="max-w-8xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <span className="badge-accent mb-4 inline-block">Contact</span>
          <h1 className="font-display font-800 text-4xl md:text-6xl leading-tight tracking-tight mb-5">
            Parlons de votre{' '}
            <span className="gradient-text">projet digital</span>
          </h1>
          <p className="font-body text-muted text-xl max-w-2xl mx-auto leading-relaxed">
            Consultation 100% gratuite. Notre équipe suisse vous répond sous 48 heures pour vous proposer la solution adaptée.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="relative py-16">
        <div className="max-w-8xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Left: Info sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact info */}
              <div className="reveal-hidden card-glass rounded-2xl p-7">
                <h2 className="font-display font-700 text-xl mb-5">Nos coordonnées</h2>
                <div className="space-y-5">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-xs text-muted font-body">{info.label}</p>
                        {info.href ? (
                          <a href={info.href} className="text-sm font-display font-600 text-fg hover:text-accent transition-colors">
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-sm font-display font-600 text-fg">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What to expect */}
              <div className="reveal-hidden stagger-2 card-glass rounded-2xl p-7">
                <h3 className="font-display font-700 text-lg mb-4">Ce qui se passe ensuite</h3>
                <div className="space-y-4">
                  {[
                    { step: '1', text: 'Nous analysons votre demande et votre secteur' },
                    { step: '2', text: 'Appel de 30 min pour comprendre vos objectifs' },
                    { step: '3', text: 'Proposition personnalisée avec devis transparent' },
                    { step: '4', text: 'Démarrage du projet sous 5 jours ouvrables' },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs font-display font-700 text-accent flex-shrink-0 mt-0.5">
                        {item.step}
                      </span>
                      <p className="text-sm font-body text-muted leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust signals */}
              <div className="reveal-hidden stagger-3 card-glass rounded-2xl p-7">
                <h3 className="font-display font-700 text-lg mb-4">Pourquoi ECR360 Digital?</h3>
                <div className="space-y-3">
                  {[
                    '150+ sites livrés en Suisse',
                    'Équipe 100% suisse, support en français',
                    'Tarifs transparents, sans surprise',
                    'Résiliation mensuelle sans pénalité',
                    'Consultation initiale gratuite',
                  ].map((trust) => (
                    <div key={trust} className="flex items-center gap-2.5 text-sm font-body text-fg/80">
                      <svg width="14" height="14" fill="none" stroke="#00C2FF" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {trust}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <div className="reveal-hidden stagger-1 card-glass rounded-2xl p-8 md:p-10">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6 glow-accent">
                      <svg width="36" height="36" fill="none" stroke="#4ade80" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <h3 className="font-display font-700 text-2xl mb-3 text-fg">Message envoyé!</h3>
                    <p className="text-muted font-body mb-6 leading-relaxed">
                      Merci pour votre demande. Notre équipe vous contactera sous 48 heures pour votre consultation gratuite.
                    </p>
                    <Link href="/homepage" className="btn-primary px-6 py-3 text-sm inline-block relative z-10">
                      Retour à l&apos;accueil
                    </Link>
                  </div>
                ) : (
                  <>
                    <h2 className="font-display font-700 text-2xl mb-2">Envoyez-nous votre demande</h2>
                    <p className="text-muted font-body text-sm mb-8">Tous les champs marqués * sont obligatoires.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Name row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-display font-600 text-muted mb-1.5">
                            Prénom *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            placeholder="Jean"
                            className="input-field w-full px-4 py-3 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-display font-600 text-muted mb-1.5">
                            Nom *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            placeholder="Dupont"
                            className="input-field w-full px-4 py-3 text-sm"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-display font-600 text-muted mb-1.5">
                          Email professionnel *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="jean.dupont@entreprise.ch"
                          className="input-field w-full px-4 py-3 text-sm"
                        />
                      </div>

                      {/* Company & Phone row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-display font-600 text-muted mb-1.5">
                            Entreprise
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Dupont Sàrl"
                            className="input-field w-full px-4 py-3 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-display font-600 text-muted mb-1.5">
                            Téléphone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+41 79 123 45 67"
                            className="input-field w-full px-4 py-3 text-sm"
                          />
                        </div>
                      </div>

                      {/* Pack selection */}
                      <div>
                        <label className="block text-xs font-display font-600 text-muted mb-1.5">
                          Offre qui vous intéresse
                        </label>
                        <select
                          name="pack"
                          value={formData.pack}
                          onChange={handleChange}
                          className="input-field w-full px-4 py-3 text-sm appearance-none cursor-pointer"
                        >
                          {packOptions.map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-primary text-fg">
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-display font-600 text-muted mb-1.5">
                          Décrivez votre projet *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          placeholder="Parlez-nous de votre entreprise, vos objectifs digitaux et ce que vous recherchez..."
                          className="input-field w-full px-4 py-3 text-sm resize-none"
                        />
                      </div>

                      {/* Privacy note */}
                      <p className="text-xs text-muted font-body">
                        En soumettant ce formulaire, vous acceptez que vos données soient utilisées pour vous contacter concernant votre projet.
                        Conformément à la LPD suisse, vous pouvez demander la suppression de vos données à tout moment.
                      </p>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-primary w-full py-4 text-base relative z-10 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <>
                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            Envoyer ma demande
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick packs reminder */}
      <section className="relative py-16 section-bg-alt">
        <div className="max-w-8xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10 reveal-hidden">
            <h2 className="font-display font-700 text-2xl tracking-tight">
              Rappel de nos offres
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Pack 1', title: 'Site Sans Entretien', price: '19.90', setup: '890', color: 'border-blue-500/20' },
              { name: 'Pack 2', title: 'Site + Entretien', price: '39.90', setup: '890', color: 'border-accent/40', featured: true },
              { name: 'Pack 3', title: 'Site + Marketing', price: '99.90', setup: '890', color: 'border-purple-500/20' },
            ].map((pack, i) => (
              <div
                key={pack.name}
                className={`reveal-hidden stagger-${i + 1} card-glass rounded-xl p-5 flex items-center justify-between border ${pack.color} ${pack.featured ? 'pricing-featured' : ''}`}
              >
                <div>
                  <span className="text-xs font-display font-700 text-accent uppercase tracking-widest">{pack.name}</span>
                  <p className="font-display font-600 text-base text-fg mt-0.5">{pack.title}</p>
                  <p className="text-xs text-muted font-body mt-1">+ CHF {pack.setup}.- setup</p>
                </div>
                <div className="text-right">
                  <p className="font-display font-800 text-2xl gradient-text">{pack.price}</p>
                  <p className="text-xs text-muted font-body">CHF/mois</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6 reveal-hidden">
            <Link href="/pricing" className="text-accent hover:text-fg transition-colors text-sm font-body font-medium underline underline-offset-4">
              Voir la comparaison complète des packs →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}