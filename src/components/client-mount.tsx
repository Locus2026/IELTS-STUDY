'use client';

import { useState, useEffect, type ReactNode } from 'react';

export function ClientMount({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    console.log('ClientMount: mounted via useEffect');
  }, []);
  
  // Double-insurance: also check via raw DOM
  useEffect(() => {
    const el = document.getElementById('client-mount-root');
    if (el) el.setAttribute('data-mounted', 'true');
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div id="client-mount-root" className="flex items-center justify-center min-h-screen">
        <div>
          <p className="text-gray-400 text-center">加载中...</p>
          <p className="text-xs text-gray-300 text-center mt-2">如果长时间停留，请刷新页面</p>
        </div>
      </div>
    );
  }
  
  return <div>{children}</div>;
}
