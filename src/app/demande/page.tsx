"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { createClient } from '@/lib/supabase/client';

const typeSiteOptions = [
  { value: 'vitrine', label: 'Site Vitrine', desc: 'Présentation de votre entreprise' },
  { value: 'ecommerce', label: 'E-Commerce', desc: 'Boutique en ligne avec paiements' },
  { value: 'portfolio', label: 'Portfolio', desc: 'Showcase de vos réalisations' },
  { value: 'autre', label: 'Autre', desc: 'Autre type de projet' },
];

const packOptions = [
  { value: 'essentiel', label: 'Pack Essentiel', price: '890.- + 19.90.-/mois', desc: 'Site professionnel sans entretien' },
  { value: 'confort', label: 'Pack Confort', price: '890.- + 39.90.-/mois', desc: 'Site + maintenance mensuelle' },
  { value: 'croissance', label: 'Pack Croissance', price: '890.- + 99.90.-/mois', desc: 'Site + marketing complet' },
];

const marketingOptions = [
  { value: 'google_ads', label: 'Google Ads', desc: 'Campagnes publicitaires payantes sur Google', icon: '🎯' },
  { value: 'seo', label: 'SEO / Référencement', desc: 'Optimisation pour apparaître en 1ère page Google', icon: '🔍' },
  { value: 'google_my_business', label: 'Google My Business', desc: 'Fiche Google Maps et avis clients', icon: '📍' },
  { value: 'reseaux_sociaux', label: 'Réseaux Sociaux', desc: 'Gestion Instagram, Facebook, LinkedIn', icon: '📱' },
  { value: 'meta_ads', label: 'Meta / LinkedIn Ads', desc: 'Publicités sur Facebook, Instagram ou LinkedIn', icon: '📣' },
  { value: 'email_marketing', label: 'Email Marketing', desc: 'Newsletters et campagnes email automatisées', icon: '✉️' },
];

const aiOptions = [
  { value: 'chatbot', label: 'Chatbot IA', desc: 'Assistant virtuel intelligent sur votre site', icon: '🤖' },
  { value: 'automatisation', label: 'Automatisation des tâches', desc: 'Workflows automatiques (devis, emails, CRM)', icon: '⚡' },
  { value: 'analyse_donnees', label: 'Analyse de données IA', desc: 'Tableaux de bord et rapports intelligents', icon: '📊' },
  { value: 'generation_contenu', label: 'Génération de contenu IA', desc: 'Textes, descriptions produits, articles de blog', icon: '✍️' },
];

// Color palette options for the client to choose from
const colorPaletteOptions = [
  {
    value: 'bleu_professionnel',
    label: 'Bleu Professionnel',
    desc: 'Confiance, sérieux, corporate',
    colors: ['#1E3A8A', '#3B82F6', '#BFDBFE', '#F8FAFC'],
  },
  {
    value: 'vert_nature',
    label: 'Vert Nature',
    desc: 'Écologie, santé, bien-être',
    colors: ['#14532D', '#22C55E', '#BBF7D0', '#F0FDF4'],
  },
  {
    value: 'rouge_energie',
    label: 'Rouge Énergie',
    desc: 'Dynamisme, passion, urgence',
    colors: ['#7F1D1D', '#EF4444', '#FECACA', '#FFF5F5'],
  },
  {
    value: 'violet_creatif',
    label: 'Violet Créatif',
    desc: 'Créativité, luxe, innovation',
    colors: ['#4C1D95', '#8B5CF6', '#DDD6FE', '#F5F3FF'],
  },
  {
    value: 'orange_chaleureux',
    label: 'Orange Chaleureux',
    desc: 'Convivialité, énergie, artisanat',
    colors: ['#7C2D12', '#F97316', '#FED7AA', '#FFF7ED'],
  },
  {
    value: 'gris_moderne',
    label: 'Gris Moderne',
    desc: 'Élégance, minimalisme, tech',
    colors: ['#111827', '#6B7280', '#E5E7EB', '#F9FAFB'],
  },
  {
    value: 'rose_elegant',
    label: 'Rose Élégant',
    desc: 'Beauté, mode, lifestyle',
    colors: ['#831843', '#EC4899', '#FBCFE8', '#FDF2F8'],
  },
  {
    value: 'jaune_optimiste',
    label: 'Jaune Optimiste',
    desc: 'Jeunesse, créativité, soleil',
    colors: ['#713F12', '#EAB308', '#FEF08A', '#FEFCE8'],
  },
  {
    value: 'turquoise_frais',
    label: 'Turquoise Frais',
    desc: 'Modernité, fraîcheur, digital',
    colors: ['#134E4A', '#14B8A6', '#99F6E4', '#F0FDFA'],
  },
  {
    value: 'noir_luxe',
    label: 'Noir Luxe',
    desc: 'Prestige, haut de gamme, exclusivité',
    colors: ['#000000', '#1F2937', '#6B7280', '#F9FAFB'],
  },
  {
    value: 'multicolore',
    label: 'Multicolore / Vif',
    desc: 'Créatif, festif, diversité',
    colors: ['#EF4444', '#F97316', '#22C55E', '#3B82F6'],
  },
  {
    value: 'pas_de_preference',
    label: 'Pas de préférence',
    desc: 'Laissez notre équipe choisir pour vous',
    colors: [],
  },
];

interface FormData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  nom_entreprise: string;
  url_souhaitee: string;
  type_site: string;
  pack_choisi: string;
  services_marketing: string[];
  services_ai: string[];
  description: string;
  color_palette: string;
  deadline_souhaitee: string;
  message_supplementaire: string;
  needs_logo_created: boolean;
}

export default function DemandePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    nom_entreprise: '',
    url_souhaitee: '',
    type_site: '',
    pack_choisi: '',
    services_marketing: [],
    services_ai: [],
    description: '',
    color_palette: '',
    deadline_souhaitee: '',
    message_supplementaire: '',
    needs_logo_created: false,
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('revealed')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal-hidden')?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
      if (checked) {
        setLogoFile(null);
        setLogoPreview(null);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleServiceToggle = (category: 'services_marketing' | 'services_ai', value: string) => {
    setFormData((prev) => {
      const current = prev[category];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return;
    const allowed = ['image/png', 'image/jpeg', 'image/svg+xml'];
    if (!allowed.includes(file.type)) {
      setError('Format non supporté. Utilisez PNG, JPG ou SVG.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Fichier trop grand. Maximum 5MB.');
      return;
    }
    setError(null);
    setLogoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setLogoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
    setFormData((prev) => ({ ...prev, needs_logo_created: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const supabase = createClient();
      let logo_url: string | null = null;

      if (logoFile && !formData.needs_logo_created) {
        const ext = logoFile.name.split('.').pop();
        const fileName = `${Date.now()}_${formData.email.replace(/[^a-z0-9]/gi, '_')}.${ext}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('logos')
          .upload(fileName, logoFile, { cacheControl: '3600', upsert: false });
        if (uploadError) {
          console.log('Logo upload error:', uploadError.message);
          setError(`Erreur lors de l'upload du logo : ${uploadError.message}`);
          setSubmitting(false);
          return;
        } else if (uploadData) {
          const { data: { publicUrl } } = supabase.storage.from('logos').getPublicUrl(uploadData.path);
          logo_url = publicUrl;
        }
      }

      const { error: insertError } = await supabase.from('project_requests').insert({
        prenom: formData.prenom,
        nom: formData.nom,
        email: formData.email,
        telephone: formData.telephone || null,
        nom_entreprise: formData.nom_entreprise || null,
        url_souhaitee: formData.url_souhaitee || null,
        type_site: formData.type_site,
        pack_choisi: formData.pack_choisi,
        services_marketing: formData.services_marketing,
        services_ai: formData.services_ai,
        description: formData.description,
        color_palette: formData.color_palette || null,
        logo_url,
        needs_logo_created: formData.needs_logo_created,
        deadline_souhaitee: formData.deadline_souhaitee || null,
        message_supplementaire: formData.message_supplementaire || null,
      });

      if (insertError) {
        console.log('Insert error:', insertError.message);
        setError(`Erreur lors de l'envoi : ${insertError.message}`);
        setSubmitting(false);
        return;
      }

      // Send notification email via Supabase Edge Function
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        await fetch(`${supabaseUrl}/functions/v1/send-project-notification`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prenom: formData.prenom,
            nom: formData.nom,
            email: formData.email,
            telephone: formData.telephone || '',
            nom_entreprise: formData.nom_entreprise || '',
            url_souhaitee: formData.url_souhaitee || '',
            type_site: formData.type_site,
            pack_choisi: formData.pack_choisi,
            services_marketing: formData.services_marketing,
            services_ai: formData.services_ai,
            color_palette: formData.color_palette || '',
            description: formData.description,
            deadline_souhaitee: formData.deadline_souhaitee || '',
            message_supplementaire: formData.message_supplementaire || '',
            logo_url: logo_url || null,
            needs_logo_created: formData.needs_logo_created,
          }),
        });
      } catch (emailErr) {
        // Email failure is non-blocking — form submission already succeeded
        console.log('Email notification error:', emailErr);
      }

      // Build query params for confirmation page
      const allServices = [...formData.services_marketing, ...formData.services_ai];
      const params = new URLSearchParams({
        prenom: formData.prenom,
        nom: formData.nom,
        email: formData.email,
        ...(formData.nom_entreprise ? { entreprise: formData.nom_entreprise } : {}),
        ...(formData.pack_choisi ? { pack: formData.pack_choisi } : {}),
        ...(allServices.length > 0 ? { services: allServices.join(',') } : {}),
      });
      router.push(`/demande/confirmation?${params.toString()}`);
    } catch (err: any) {
      console.log('Submission error:', err?.message);
      setError(`Une erreur est survenue : ${err?.message || 'Veuillez réessayer.'}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-bg text-fg overflow-x-hidden">
        <div className="noise-overlay" />
        <Header />
        <section className="relative min-h-screen flex items-center justify-center pt-20">
          <div className="blob bg-accent/10 w-[400px] h-[400px] top-0 right-0" />
          <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
            <div className="card-glass rounded-3xl p-12">
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                <svg width="40" height="40" fill="none" stroke="#00C2FF" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="font-display font-800 text-3xl md:text-4xl mb-4">
                Demande <span className="gradient-text">envoyée !</span>
              </h1>
              <p className="text-muted font-body text-lg leading-relaxed mb-8">
                Merci <strong className="text-fg">{formData.prenom}</strong> ! Votre demande de projet a bien été reçue. Notre équipe vous contactera dans les <strong className="text-accent">48 heures</strong> pour discuter de votre projet.
              </p>
              <div className="bg-white/5 rounded-2xl p-6 mb-8 text-left space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Pack choisi</span>
                  <span className="text-accent font-semibold capitalize">{formData.pack_choisi}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Type de site</span>
                  <span className="text-fg capitalize">{formData.type_site}</span>
                </div>
                {formData.color_palette && formData.color_palette !== 'pas_de_preference' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Palette de couleurs</span>
                    <span className="text-fg capitalize">{colorPaletteOptions.find(p => p.value === formData.color_palette)?.label || formData.color_palette}</span>
                  </div>
                )}
                {formData.services_marketing.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Marketing</span>
                    <span className="text-fg">{formData.services_marketing.length} service(s)</span>
                  </div>
                )}
                {formData.services_ai.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Automatisation IA</span>
                    <span className="text-fg">{formData.services_ai.length} service(s)</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Email</span>
                  <span className="text-fg">{formData.email}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/homepage" className="btn-primary px-7 py-3.5 text-base relative z-10">
                  Retour à l&apos;accueil
                </Link>
                <Link href="/pricing" className="btn-secondary px-7 py-3.5 text-base">
                  Voir nos offres
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-fg overflow-x-hidden">
      <div className="noise-overlay" />
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="blob bg-accent/10 w-[500px] h-[300px] top-0 right-[-100px]" />
        <div className="grid-bg absolute inset-0 opacity-40" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <span className="badge-accent mb-4 inline-block">Demande de Projet</span>
            <h1 className="font-display font-800 text-4xl md:text-5xl leading-tight tracking-tight mb-5">
              Démarrez votre{' '}
              <span className="gradient-text">projet digital</span>
            </h1>
            <p className="font-body text-muted text-lg leading-relaxed max-w-2xl mx-auto">
              Remplissez ce formulaire et notre équipe vous contactera sous 48h pour discuter de votre projet et vous proposer la meilleure solution.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="relative pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Step 1 — Personal Info */}
            <div className="reveal-hidden card-glass rounded-2xl p-8">
              <h2 className="font-display font-700 text-xl mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">1</span>
                Vos informations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-body font-medium text-muted mb-2">Prénom <span className="text-accent">*</span></label>
                  <input
                    type="text" name="prenom" required value={formData.prenom} onChange={handleChange}
                    placeholder="Jean"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-fg font-body text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:bg-white/8 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-muted mb-2">Nom <span className="text-accent">*</span></label>
                  <input
                    type="text" name="nom" required value={formData.nom} onChange={handleChange}
                    placeholder="Dupont"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-fg font-body text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:bg-white/8 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-muted mb-2">Email <span className="text-accent">*</span></label>
                  <input
                    type="email" name="email" required value={formData.email} onChange={handleChange}
                    placeholder="jean@entreprise.ch"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-fg font-body text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:bg-white/8 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-muted mb-2">Téléphone</label>
                  <input
                    type="tel" name="telephone" value={formData.telephone} onChange={handleChange}
                    placeholder="+41 79 123 45 67"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-fg font-body text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:bg-white/8 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-muted mb-2">Nom de l&apos;entreprise</label>
                  <input
                    type="text" name="nom_entreprise" value={formData.nom_entreprise} onChange={handleChange}
                    placeholder="Mon Entreprise SA"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-fg font-body text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:bg-white/8 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-muted mb-2">URL souhaitée</label>
                  <input
                    type="text" name="url_souhaitee" value={formData.url_souhaitee} onChange={handleChange}
                    placeholder="www.mon-entreprise.ch"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-fg font-body text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:bg-white/8 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Step 2 — Type de site */}
            <div className="reveal-hidden card-glass rounded-2xl p-8">
              <h2 className="font-display font-700 text-xl mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">2</span>
                Type de site <span className="text-accent text-sm">*</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {typeSiteOptions?.map((opt) => (
                  <label
                    key={opt.value}
                    className={`relative flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all duration-300 ${
                      formData.type_site === opt.value
                        ? 'border-accent/60 bg-accent/10' : 'border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <input
                      type="radio" name="type_site" value={opt.value} required
                      checked={formData.type_site === opt.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                      formData.type_site === opt.value ? 'border-accent' : 'border-white/30'
                    }`}>
                      {formData.type_site === opt.value && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                    </div>
                    <div>
                      <p className="font-display font-600 text-sm text-fg">{opt.label}</p>
                      <p className="text-xs text-muted font-body mt-0.5">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 3 — Pack */}
            <div className="reveal-hidden card-glass rounded-2xl p-8">
              <h2 className="font-display font-700 text-xl mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">3</span>
                Pack choisi <span className="text-accent text-sm">*</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {packOptions?.map((pack) => (
                  <label
                    key={pack.value}
                    className={`relative flex flex-col gap-2 p-5 rounded-xl border cursor-pointer transition-all duration-300 ${
                      formData.pack_choisi === pack.value
                        ? 'border-accent/60 bg-accent/10' : 'border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <input
                      type="radio" name="pack_choisi" value={pack.value} required
                      checked={formData.pack_choisi === pack.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                        formData.pack_choisi === pack.value ? 'border-accent' : 'border-white/30'
                      }`}>
                        {formData.pack_choisi === pack.value && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                      </div>
                      <p className="font-display font-700 text-sm text-fg">{pack.label}</p>
                    </div>
                    <p className="text-accent font-display font-600 text-sm">{pack.price}</p>
                    <p className="text-xs text-muted font-body">{pack.desc}</p>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 4 — Services additionnels */}
            <div className="reveal-hidden card-glass rounded-2xl p-8">
              <h2 className="font-display font-700 text-xl mb-2 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">4</span>
                Services additionnels
                <span className="text-xs font-body font-400 text-muted ml-1">(optionnel)</span>
              </h2>
              <p className="text-sm text-muted font-body mb-8 ml-11">
                En plus de votre site web, avez-vous besoin d&apos;autres services ? Cochez tout ce qui vous intéresse.
              </p>

              {/* Marketing Solutions */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-base">📈</div>
                  <div>
                    <h3 className="font-display font-700 text-base text-fg">Solutions Marketing Digital</h3>
                    <p className="text-xs text-muted font-body">Google, réseaux sociaux, publicités en ligne</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {marketingOptions.map((opt) => {
                    const isSelected = formData.services_marketing.includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleServiceToggle('services_marketing', opt.value)}
                        className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-200 ${
                          isSelected
                            ? 'border-blue-400/60 bg-blue-500/10' : 'border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/5'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                          isSelected ? 'border-blue-400 bg-blue-400' : 'border-white/30 bg-transparent'
                        }`}>
                          {isSelected && (
                            <svg width="10" height="10" fill="none" stroke="#070E1A" strokeWidth="3" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-base leading-none">{opt.icon}</span>
                            <p className="font-display font-600 text-sm text-fg">{opt.label}</p>
                          </div>
                          <p className="text-xs text-muted font-body mt-1">{opt.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/8 mb-8" />

              {/* AI Automation */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-base">🤖</div>
                  <div>
                    <h3 className="font-display font-700 text-base text-fg">Automatisation & Intelligence Artificielle</h3>
                    <p className="text-xs text-muted font-body">Chatbots, workflows automatiques, IA sur mesure</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {aiOptions.map((opt) => {
                    const isSelected = formData.services_ai.includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleServiceToggle('services_ai', opt.value)}
                        className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-200 ${
                          isSelected
                            ? 'border-purple-400/60 bg-purple-500/10' : 'border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/5'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                          isSelected ? 'border-purple-400 bg-purple-400' : 'border-white/30 bg-transparent'
                        }`}>
                          {isSelected && (
                            <svg width="10" height="10" fill="none" stroke="#070E1A" strokeWidth="3" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-base leading-none">{opt.icon}</span>
                            <p className="font-display font-600 text-sm text-fg">{opt.label}</p>
                          </div>
                          <p className="text-xs text-muted font-body mt-1">{opt.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Summary badge when something is selected */}
              {(formData.services_marketing.length > 0 || formData.services_ai.length > 0) && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {formData.services_marketing.map((v) => {
                    const opt = marketingOptions.find((o) => o.value === v);
                    return opt ? (
                      <span key={v} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-xs text-blue-300 font-body">
                        {opt.icon} {opt.label}
                      </span>
                    ) : null;
                  })}
                  {formData.services_ai.map((v) => {
                    const opt = aiOptions.find((o) => o.value === v);
                    return opt ? (
                      <span key={v} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-400/30 text-xs text-purple-300 font-body">
                        {opt.icon} {opt.label}
                      </span>
                    ) : null;
                  })}
                </div>
              )}
            </div>

            {/* Step 5 — Description */}
            <div className="reveal-hidden card-glass rounded-2xl p-8">
              <h2 className="font-display font-700 text-xl mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">5</span>
                Description du projet <span className="text-accent text-sm">*</span>
              </h2>
              <textarea
                name="description" required value={formData.description} onChange={handleChange}
                rows={5}
                placeholder="Décrivez votre projet, vos objectifs, votre secteur d'activité, vos concurrents, ce que vous aimez ou n'aimez pas dans votre site actuel..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-fg font-body text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:bg-white/8 transition-all resize-none"
              />
            </div>

            {/* Step 6 — Logo */}
            <div className="reveal-hidden card-glass rounded-2xl p-8">
              <h2 className="font-display font-700 text-xl mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">6</span>
                Logo
              </h2>

              {/* Upload zone */}
              <div
                onClick={() => !formData.needs_logo_created && fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  formData.needs_logo_created
                    ? 'border-white/10 opacity-40 cursor-not-allowed'
                    : logoFile
                    ? 'border-accent/50 bg-accent/5 cursor-pointer' : 'border-white/20 hover:border-accent/40 hover:bg-white/3 cursor-pointer'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".png,.jpg,.jpeg,.svg"
                  onChange={handleLogoChange}
                  disabled={formData.needs_logo_created}
                  className="sr-only"
                />
                {logoPreview ? (
                  <div className="flex flex-col items-center gap-3">
                    <img src={logoPreview} alt="Aperçu du logo" className="max-h-24 max-w-48 object-contain rounded-lg" />
                    <p className="text-sm text-accent font-body">{logoFile?.name}</p>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setLogoFile(null); setLogoPreview(null); }}
                      className="text-xs text-muted hover:text-fg transition-colors"
                    >
                      Supprimer
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center">
                      <svg width="28" height="28" fill="none" stroke="#00C2FF" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 015.25 21h13.5A2.25 2.25 0 0121 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-display font-600 text-sm text-fg">Déposez votre logo ici</p>
                      <p className="text-xs text-muted font-body mt-1">PNG, JPG ou SVG — max 5MB</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Checkbox */}
              <label className={`flex items-start gap-4 mt-5 p-5 rounded-xl border cursor-pointer transition-all duration-300 ${
                formData.needs_logo_created
                  ? 'border-accent/50 bg-accent/10' : 'border-white/10 bg-white/3 hover:border-white/20'
              }`}>
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    name="needs_logo_created"
                    checked={formData.needs_logo_created}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    formData.needs_logo_created ? 'border-accent bg-accent' : 'border-white/30 bg-transparent'
                  }`}>
                    {formData.needs_logo_created && (
                      <svg width="12" height="12" fill="none" stroke="#070E1A" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    )}
                  </div>
                </div>
                <div>
                  <p className="font-display font-600 text-sm text-fg">Je n&apos;ai pas de logo — j&apos;aimerais en faire créer un</p>
                  <p className="text-xs text-muted font-body mt-1">Notre équipe vous proposera des options de création de logo adaptées à votre identité.</p>
                </div>
              </label>
            </div>

            {/* Step 7 — Palette de couleurs */}
            <div className="reveal-hidden card-glass rounded-2xl p-8">
              <h2 className="font-display font-700 text-xl mb-2 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">7</span>
                Palette de couleurs
                <span className="text-xs font-body font-400 text-muted ml-1">(optionnel)</span>
              </h2>
              <p className="text-sm text-muted font-body mb-6 ml-11">
                Choisissez une palette de couleurs qui correspond à l&apos;image que vous souhaitez donner à votre site. Notre équipe s&apos;en inspirera pour le design.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {colorPaletteOptions.map((palette) => {
                  const isSelected = formData.color_palette === palette.value;
                  return (
                    <button
                      key={palette.value}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, color_palette: isSelected ? '' : palette.value }))}
                      className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-accent/60 bg-accent/10' : 'border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/5'
                      }`}
                    >
                      {/* Color swatches */}
                      <div className="flex-shrink-0 mt-0.5">
                        {palette.colors.length > 0 ? (
                          <div className="flex gap-0.5">
                            {palette.colors.map((color, idx) => (
                              <div
                                key={idx}
                                className="w-5 h-10 rounded-sm first:rounded-l-lg last:rounded-r-lg"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="w-[84px] h-10 rounded-lg bg-gradient-to-r from-white/10 to-white/5 border border-white/10 flex items-center justify-center">
                            <svg width="16" height="16" fill="none" stroke="#6B7FA3" strokeWidth="1.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-display font-600 text-sm text-fg">{palette.label}</p>
                          {isSelected && (
                            <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                              <svg width="8" height="8" fill="none" stroke="#070E1A" strokeWidth="3" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-muted font-body mt-0.5">{palette.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected palette summary */}
              {formData.color_palette && formData.color_palette !== 'pas_de_preference' && (
                <div className="mt-5 flex items-center gap-3 bg-accent/5 border border-accent/20 rounded-xl px-4 py-3">
                  <svg width="16" height="16" fill="none" stroke="#00C2FF" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <p className="text-sm font-body text-fg">
                    Palette sélectionnée :{' '}
                    <span className="text-accent font-semibold">
                      {colorPaletteOptions.find(p => p.value === formData.color_palette)?.label}
                    </span>
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, color_palette: '' }))}
                    className="ml-auto text-xs text-muted hover:text-fg transition-colors"
                  >
                    Effacer
                  </button>
                </div>
              )}
            </div>

            {/* Step 8 — Deadline + Message */}
            <div className="reveal-hidden card-glass rounded-2xl p-8">
              <h2 className="font-display font-700 text-xl mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">8</span>
                Informations complémentaires
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-body font-medium text-muted mb-2">Deadline souhaitée</label>
                  <input
                    type="date" name="deadline_souhaitee" value={formData.deadline_souhaitee} onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full md:w-64 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-fg font-body text-sm focus:outline-none focus:border-accent/50 focus:bg-white/8 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-muted mb-2">Message supplémentaire</label>
                  <textarea
                    name="message_supplementaire" value={formData.message_supplementaire} onChange={handleChange}
                    rows={4}
                    placeholder="Toute information supplémentaire que vous souhaitez nous communiquer..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-fg font-body text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:bg-white/8 transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-4 text-red-400 font-body text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <p className="text-xs text-muted font-body">
                <span className="text-accent">*</span> Champs obligatoires. Vos données sont traitées de manière confidentielle.
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary px-10 py-4 text-base font-display font-600 relative z-10 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-3"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    Envoyer ma demande
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
export const dynamic = 'force-dynamic';