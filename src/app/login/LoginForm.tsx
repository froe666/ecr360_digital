'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn, user, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && user) {
      router.replace('/espace-client');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await signIn(email, password);
      router.replace('/espace-client');
    } catch (err: any) {
      setError(
        err?.message === 'Invalid login credentials' ?'Email ou mot de passe incorrect.' : err?.message ||'Une erreur est survenue. Veuillez réessayer.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent2/5 blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-border">
        <Link href="/homepage">
          <AppLogo
            src="/assets/images/1275785-1773171741897.png"
            size={110}
            className="transition-opacity hover:opacity-80"
          />
        </Link>
        <Link
          href="/signup"
          className="text-sm text-muted hover:text-accent transition-colors"
        >
          Pas encore de compte ?{' '}
          <span className="text-accent font-semibold">S&apos;inscrire</span>
        </Link>
      </div>

      {/* Main */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-primary/60 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
            {/* Title */}
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 mb-4">
                <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h1 className="text-2xl font-display font-bold text-fg">Connexion</h1>
              <p className="text-muted text-sm mt-1">Accédez à votre espace client ECR360</p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-fg/80 mb-2">Adresse email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                  required
                  autoComplete="email"
                  className="w-full bg-bg/60 border border-border rounded-xl px-4 py-3 text-fg placeholder-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all text-sm"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-fg/80">Mot de passe</label>
                  <Link
                    href="/reset-password"
                    className="text-xs text-accent hover:text-accent/80 transition-colors"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    className="w-full bg-bg/60 border border-border rounded-xl px-4 py-3 pr-11 text-fg placeholder-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-fg transition-colors"
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-3 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Connexion en cours...
                  </>
                ) : (
                  'Se connecter'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted">
                Pas encore de compte ?{' '}
                <Link href="/signup" className="text-accent hover:text-accent/80 font-semibold transition-colors">
                  Créer mon compte
                </Link>
              </p>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-muted mt-6">
            Vos données sont protégées et chiffrées selon les standards suisses.
          </p>
        </div>
      </div>
    </div>
  );
}
