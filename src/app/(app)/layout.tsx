'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PenLine, BarChart3, Library, FileText, BookMarked, StickyNote } from 'lucide-react';

const desktopNavItems = [
  { href: '/dashboard', label: '首页', icon: Home },
  { href: '/guide', label: '指南', icon: FileText },
  { href: '/vocab', label: '词汇', icon: Library },
  { href: '/practice', label: '专项', icon: PenLine },
  { href: '/grammar', label: '语法', icon: BookMarked },
  { href: '/notes', label: '笔记', icon: StickyNote },
  { href: '/progress', label: '进度', icon: BarChart3 },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-gray-200">
        <Link href="/dashboard" className="flex items-center gap-2 px-6 py-5 font-bold text-lg text-brand-600 border-b border-gray-100">
          <span className="text-xl">🎯</span> IELTS Bridge
        </Link>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {desktopNavItems.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50'
                }`}>
                <Icon className="w-5 h-5" />{item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-4 lg:px-6">
          <Link href="/dashboard" className="lg:hidden font-bold text-brand-600">🎯 IELTS Bridge</Link>
          <div className="hidden lg:block text-sm text-gray-500">{''}</div>
          <div className="text-sm text-gray-400">{''}</div>
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around h-14">
          {desktopNavItems.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href}
                className={`flex flex-col items-center gap-0.5 text-xs font-medium ${
                  active ? 'text-brand-600' : 'text-gray-400'
                }`}>
                <Icon className="w-5 h-5" />{item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
