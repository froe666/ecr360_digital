'use client';
import React, { Suspense } from 'react';
import EspaceClientDashboard from './EspaceClientDashboard';

export default function EspaceClientPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <EspaceClientDashboard />
    </Suspense>
  );
}
