import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

const footerLinks = [
  { href: '/homepage', label: 'Accueil' },
  { href: '/pricing', label: 'Offres & Tarifs' },
  { href: '/marketing-solutions', label: 'Solutions Marketing' },
  { href: '/ai-automation', label: 'IA & Automatisation' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-accent/10">
      <div className="max-w-8xl mx-auto px-6 lg:px-8">
        {/* Main footer row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-10">
          {/* Logo */}
          <Link href="/homepage" className="flex items-center gap-3 group">
            <AppLogo
              src="/assets/images/1275785-1773171741897.png"
              size={32}
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-display font-semibold text-base text-fg tracking-tight">
              ECR360 <span className="text-accent">Digital</span>
            </span>
          </Link>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {footerLinks?.map((link) => (
              <Link
                key={link?.href}
                href={link?.href}
                className="text-sm font-medium text-muted hover:text-fg transition-colors duration-200 focus:outline-none focus:text-accent"
              >
                {link?.label}
              </Link>
            ))}
          </nav>

          {/* Social / Contact */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:info@ecr360.ch"
              className="text-muted hover:text-accent transition-colors duration-200 p-2 rounded-full hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent/40"
              aria-label="Email ECR360 Digital"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors duration-200 p-2 rounded-full hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent/40"
              aria-label="LinkedIn ECR360 Digital"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="divider-accent" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5 text-xs text-muted">
          <p>© 2026 ECR360 Digital — digital.ecr360.ch — Tous droits réservés</p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-fg transition-colors focus:outline-none focus:text-accent">Mentions légales</Link>
            <Link href="/contact" className="hover:text-fg transition-colors focus:outline-none focus:text-accent">Confidentialité</Link>
            <span className="text-accent/60">🇨🇭 Suisse</span>
          </div>
        </div>
      </div>
    </footer>
  );
}