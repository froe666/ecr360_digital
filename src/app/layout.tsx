import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';
import ChatBot from '@/components/ChatBot';
import { AuthProvider } from '@/contexts/AuthContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'ECR360 Digital — Solutions Digitales pour PME Suisses',
  description: 'Sites web professionnels, marketing digital et automatisation IA pour PME suisses. 3 packs à partir de 890.- setup et 19.90.-/mois. digital.ecr360.ch',
  icons: {
    icon: [
      { url: '/assets/images/1275785-1773171741897.png', type: 'image/png' }
    ],
    apple: [
      { url: '/assets/images/1275785-1773171741897.png', type: 'image/png' }
    ],
    shortcut: '/assets/images/1275785-1773171741897.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
        <ChatBot />
</body>
    </html>
  );
}