"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

const packs = [
  {
    name: 'Pack 1',
    title: 'Site Sans Entretien',
    subtitle: 'Parfait pour démarrer',
    price: '19.90',
    setup: '890',
    period: '/mois',
    color: 'card-glass',
    featured: false,
    features: [
      { label: 'Site web professionnel (jusqu\'à 5 pages)', included: true },
      { label: 'Design responsive mobile & tablette', included: true },
      { label: 'Hébergement suisse inclus', included: true },
      { label: 'Nom de domaine .ch ou .com', included: true },
      { label: 'Certificat SSL (HTTPS)', included: true },
      { label: 'Formulaire de contact', included: true },
      { label: 'Intégration Google Maps', included: true },
      { label: 'Mises à jour du contenu', included: false },
      { label: 'Maintenance technique', included: false },
      { label: 'SEO optimisé', included: false },
      { label: 'Support prioritaire', included: false },
      { label: 'Solutions Marketing', included: false },
    ],
    cta: 'Choisir Pack 1',
    ideal: 'Idéal pour les indépendants et petites structures qui veulent une vitrine professionnelle.',
  },
  {
    name: 'Pack 2',
    title: 'Site + Entretien',
    subtitle: 'Le plus populaire',
    price: '39.90',
    setup: '890',
    period: '/mois',
    color: 'pricing-featured',
    featured: true,
    features: [
      { label: 'Site web professionnel (jusqu\'à 10 pages)', included: true },
      { label: 'Design responsive mobile & tablette', included: true },
      { label: 'Hébergement suisse inclus', included: true },
      { label: 'Nom de domaine .ch ou .com', included: true },
      { label: 'Certificat SSL (HTTPS)', included: true },
      { label: 'Formulaire de contact avancé', included: true },
      { label: 'Intégration Google Maps', included: true },
      { label: 'Mises à jour du contenu (2x/mois)', included: true },
      { label: 'Maintenance technique', included: true },
      { label: 'SEO de base', included: true },
      { label: 'Support prioritaire (48h)', included: true },
      { label: 'Solutions Marketing', included: false },
    ],
    cta: 'Choisir Pack 2',
    ideal: 'Idéal pour les PME qui veulent une présence digitale maintenue et optimisée en continu.',
  },
  {
    name: 'Pack 3',
    title: 'Site + Marketing',
    subtitle: 'Solution complète',
    price: '99.90',
    setup: '890',
    period: '/mois',
    color: 'card-glass border border-purple-500/20',
    featured: false,
    features: [
      { label: 'Site web professionnel (pages illimitées)', included: true },
      { label: 'Design responsive mobile & tablette', included: true },
      { label: 'Hébergement suisse inclus', included: true },
      { label: 'Nom de domaine .ch ou .com', included: true },
      { label: 'Certificat SSL (HTTPS)', included: true },
      { label: 'Formulaires avancés + CRM', included: true },
      { label: 'Intégration Google Maps', included: true },
      { label: 'Mises à jour illimitées', included: true },
      { label: 'Maintenance technique complète', included: true },
      { label: 'SEO avancé + rapport mensuel', included: true },
      { label: 'Support dédié (24h)', included: true },
      { label: 'Google Ads + Social Media + Email', included: true },
    ],
    cta: 'Choisir Pack 3',
    ideal: 'Idéal pour les entreprises ambitieuses qui veulent générer des leads et croître rapidement.',
  },
];

const faqs = [
  {
    q: 'Puis-je changer de pack après avoir souscrit?',
    a: 'Oui, vous pouvez upgrader ou downgrader votre pack à tout moment. La modification prend effet au prochain cycle de facturation.',
  },
  {
    q: 'Le setup de 890.- est-il obligatoire?',
    a: 'Oui, le setup unique de CHF 890.- couvre la création, le design et la mise en ligne de votre site. Il n\'est payé qu\'une seule fois.',
  },
  {
    q: 'Puis-je résilier à tout moment?',
    a: 'Oui, nos abonnements sont sans engagement longue durée. Vous pouvez résilier avec un préavis d\'un mois.',
  },
  {
    q: 'Que se passe-t-il avec mon site si je résilie?',
    a: 'Vous gardez votre nom de domaine et nous vous fournissons une export de votre site. Vous restez propriétaire de votre contenu.',
  },
  {
    q: 'Les prix sont-ils en CHF?',
    a: 'Oui, tous nos prix sont en Francs Suisses (CHF), TVA incluse.',
  },
  {
    q: 'Proposez-vous des tarifs pour les associations?',
    a: 'Oui, nous proposons des tarifs préférentiels pour les associations et organisations à but non lucratif. Contactez-nous pour un devis personnalisé.',
  },
];

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('revealed')),
      { threshold: 0.15 }
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
        <div className="blob bg-accent2/15 w-[400px] h-[400px] top-0 right-0" />
        <div className="grid-bg absolute inset-0 opacity-50" />
        <div className="max-w-8xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <span className="badge-accent mb-4 inline-block">Offres & Tarifs</span>
          <h1 className="font-display font-800 text-4xl md:text-6xl leading-tight tracking-tight mb-5">
            Choisissez votre{' '}
            <span className="gradient-text">Pack Digital</span>
          </h1>
          <p className="font-body text-muted text-xl max-w-2xl mx-auto leading-relaxed">
            3 packs transparents, sans frais cachés, résiliables à tout moment. Setup unique de CHF 890.- pour tous les packs.
          </p>
        </div>
      </section>
      {/* Pricing Cards */}
      <section className="relative py-16">
        <div className="max-w-8xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packs?.map((pack, i) => (
              <div
                key={pack?.name}
                className={`reveal-hidden stagger-${i + 1} relative rounded-2xl p-7 flex flex-col ${pack?.color}`}
              >
                {pack?.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-accent text-bg text-xs font-display font-700 px-5 py-1.5 rounded-full tracking-wide">
                      ⭐ Plus Populaire
                    </span>
                  </div>
                )}

                <div className="mb-2">
                  <span className="text-xs font-display font-700 text-accent uppercase tracking-widest">{pack?.name}</span>
                </div>
                <h2 className="font-display font-700 text-2xl text-fg mb-1">{pack?.title}</h2>
                <p className="text-sm text-muted font-body mb-6">{pack?.subtitle}</p>

                <div className="mb-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-display font-800 gradient-text">{pack?.price}</span>
                    <span className="text-muted text-base font-body">CHF{pack?.period}</span>
                  </div>
                  <p className="text-sm text-muted mt-1 font-body">+ CHF {pack?.setup}.- setup unique</p>
                </div>

                <div className="divider-accent my-6" />

                <p className="text-xs text-muted font-body italic mb-6 leading-relaxed">{pack?.ideal}</p>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {pack?.features?.map((f) => (
                    <li key={f?.label} className={`flex items-start gap-2.5 text-sm font-body ${f?.included ? 'text-fg/80' : 'text-muted/50'}`}>
                      {f?.included ? (
                        <svg width="14" height="14" fill="none" stroke="#00C2FF" strokeWidth="2.5" viewBox="0 0 24 24" className="mt-0.5 flex-shrink-0">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      ) : (
                        <svg width="14" height="14" fill="none" stroke="#6B7FA3" strokeWidth="2" viewBox="0 0 24 24" className="mt-0.5 flex-shrink-0">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                      {f?.label}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`block text-center py-3.5 px-5 rounded-full text-sm font-display font-600 transition-all duration-300 ${
                    pack?.featured ? 'btn-primary relative z-10' : 'btn-secondary'
                  }`}
                >
                  {pack?.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 reveal-hidden">
            <p className="text-muted text-sm font-body">
              Besoin d&apos;une solution sur mesure?{' '}
              <Link href="/contact" className="text-accent hover:underline">Contactez-nous pour un devis personnalisé →</Link>
            </p>
          </div>
        </div>
      </section>
      {/* Setup explanation */}
      <section className="relative py-16 section-bg-alt">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="reveal-hidden card-glass rounded-2xl p-8 md:p-12">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                <svg width="28" height="28" fill="none" stroke="#00C2FF" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
              </div>
              <div>
                <h3 className="font-display font-700 text-2xl mb-3">À propos du setup de CHF 890.-</h3>
                <p className="text-muted font-body leading-relaxed mb-4">
                  Le frais de setup est un investissement unique qui couvre la création complète de votre site web: design sur mesure, développement, configuration technique, mise en ligne, et formation initiale.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Design personnalisé à votre image',
                    'Développement & intégration',
                    'Configuration hébergement & domaine',
                    'Formation à l\'utilisation',
                    'Tests & optimisation performance',
                    'Mise en ligne & vérification',
                  ]?.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-fg/70 font-body">
                      <svg width="14" height="14" fill="none" stroke="#00C2FF" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className="relative py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 reveal-hidden">
            <span className="badge-accent mb-4 inline-block">FAQ</span>
            <h2 className="font-display font-700 text-3xl md:text-4xl tracking-tight">
              Questions fréquentes
            </h2>
          </div>
          <div className="space-y-3">
            {faqs?.map((faq, i) => (
              <div
                key={i}
                className={`reveal-hidden stagger-${(i % 5) + 1} card-glass rounded-xl overflow-hidden transition-all duration-300`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-display font-600 text-sm md:text-base text-fg pr-4">{faq?.q}</span>
                  <svg
                    width="18" height="18" fill="none" stroke="#00C2FF" strokeWidth="2" viewBox="0 0 24 24"
                    className={`flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <div className="divider-accent mb-4" />
                    <p className="text-muted font-body text-sm leading-relaxed">{faq?.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="relative py-20 section-bg-alt">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center reveal-hidden">
          <h2 className="font-display font-700 text-3xl md:text-4xl tracking-tight mb-4">
            Prêt à démarrer?
          </h2>
          <p className="text-muted font-body mb-8">Consultation gratuite pour choisir le pack adapté à votre situation.</p>
          <Link href="/contact" className="btn-primary px-8 py-4 text-base inline-block relative z-10">
            Démarrer ma consultation gratuite
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}