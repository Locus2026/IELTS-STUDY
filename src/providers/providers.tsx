'use client';

import { createContext, useContext, type ReactNode } from 'react';

const HydrationContext = createContext(true);

export function useIsHydrated() {
  return useContext(HydrationContext);
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <HydrationContext.Provider value={true}>
      {children}
    </HydrationContext.Provider>
  );
}
