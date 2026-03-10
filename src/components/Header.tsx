"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
  { href: '/homepage', label: 'Accueil' },
  { href: '/pricing', label: 'Offres & Tarifs' },
  { href: '/marketing-solutions', label: 'Marketing' },
  { href: '/ai-automation', label: 'IA & Automatisation' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'nav-blur' : 'bg-transparent'
        }`}
      >
        <div className="max-w-8xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/homepage" className="flex items-center gap-3 group">
              <AppLogo
                src="/assets/images/1275785-1773171741897.png"
                size={44}
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks?.map((link) => {
                const isActive = pathname === link?.href;
                return (
                  <Link
                    key={link?.href}
                    href={link?.href}
                    className={`relative px-4 py-2 text-sm font-body font-medium rounded-full transition-all duration-300 ${
                      isActive
                        ? 'text-accent bg-accent/10' :'text-muted hover:text-fg hover:bg-white/5'
                    }`}
                  >
                    {link?.label}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href={user ? '/espace-client' : '/login'}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-full border border-accent/30 text-accent hover:bg-accent/10 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                Espace Client
              </Link>
              <Link href="/demande" className="btn-primary px-5 py-2.5 text-sm relative z-10">
                Démarrer mon projet
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Menu"
            >
              <span className={`block w-6 h-0.5 bg-fg transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-fg transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-fg transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-bg/98 backdrop-blur-xl flex flex-col pt-24 px-6 pb-8">
          <nav className="flex flex-col gap-2 flex-1">
            {navLinks?.map((link, i) => {
              const isActive = pathname === link?.href;
              return (
                <Link
                  key={link?.href}
                  href={link?.href}
                  onClick={() => setMobileOpen(false)}
                  className={`mobile-menu-open px-5 py-4 rounded-xl text-lg font-display font-semibold transition-all duration-300 ${
                    isActive
                      ? 'text-accent bg-accent/10 border border-accent/20' :'text-muted hover:text-fg hover:bg-white/5'
                  }`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {link?.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/demande"
            onClick={() => setMobileOpen(false)}
            className="btn-primary px-6 py-4 text-center text-base relative z-10"
          >
            Démarrer mon projet
          </Link>
          <Link
            href={user ? '/espace-client' : '/login'}
            onClick={() => setMobileOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-all text-base font-medium"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            Espace Client
          </Link>
        </div>
      )}
    </>
  );
}