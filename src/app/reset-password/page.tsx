'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { createClient } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

export default function ResetPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
      });
      if (resetError) throw resetError;
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

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
          href="/login"
          className="text-sm text-muted hover:text-accent transition-colors"
        >
          <span className="text-accent font-semibold">← Retour à la connexion</span>
        </Link>
      </div>

      {/* Main */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-primary/60 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
            {!submitted ? (
              <>
                {/* Title */}
                <div className="mb-8 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 mb-4">
                    <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  <h1 className="text-2xl font-display font-bold text-fg">Mot de passe oublié</h1>
                  <p className="text-muted text-sm mt-2 leading-relaxed">
                    Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                  </p>
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

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary py-3 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      'Envoyer le lien de réinitialisation'
                    )}
                  </button>
                </form>
              </>
            ) : (
              /* Success state */
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 mb-6">
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <h2 className="text-xl font-display font-bold text-fg mb-3">Email envoyé !</h2>
                <p className="text-muted text-sm leading-relaxed mb-2">
                  Un lien de réinitialisation a été envoyé à
                </p>
                <p className="text-accent font-semibold text-sm mb-6">{email}</p>
                <p className="text-muted text-xs leading-relaxed mb-8">
                  Vérifiez votre boîte de réception et vos spams. Le lien expire dans 24 heures.
                </p>
                <Link
                  href="/login"
                  className="btn-primary px-6 py-3 text-sm font-semibold inline-block"
                >
                  Retour à la connexion
                </Link>
              </div>
            )}

            {!submitted && (
              <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="text-sm text-muted">
                  Vous vous souvenez de votre mot de passe ?{' '}
                  <Link href="/login" className="text-accent hover:text-accent/80 font-semibold transition-colors">
                    Se connecter
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
