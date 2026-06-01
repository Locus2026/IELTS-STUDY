'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { Providers } from '@/providers/providers';

export function AppShell({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR / before mount, render empty shell matching server output
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600" />
      </div>
    );
  }

  // After mount, render full app with all client features
  return <Providers>{children}</Providers>;
}
