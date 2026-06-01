import Link from 'next/link';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-brand-600">
            <span className="text-2xl">🎯</span>
            IELTS Bridge
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/onboarding" className="text-gray-600 hover:text-brand-600 transition-colors">开始学习</Link>
            <Link href="/#features" className="text-gray-600 hover:text-brand-600 transition-colors hidden sm:inline">功能介绍</Link>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-gray-900 text-gray-400 py-12 text-sm">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>IELTS Bridge — 从零基础到雅思6.5分，一站就够了</p>
          <p className="mt-2">© 2026 IELTS Bridge. 内容来源于官方备考资料与教研团队整理。</p>
        </div>
      </footer>
    </div>
  );
}
