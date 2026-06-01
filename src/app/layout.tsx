import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/providers/providers';

export const metadata: Metadata = {
  title: 'IELTS Bridge',
  description: '从零基础到雅思6.5分，一站式学习平台',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, title: 'IELTS Bridge', statusBarStyle: 'default' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="theme-color" content="#2563eb" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/icon-192.svg" />
      </head>
      <body className="bg-gray-50 text-gray-900 antialiased min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
