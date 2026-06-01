import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="text-6xl mb-4">🔍</div>
      <h1 className="text-3xl font-bold mb-2">页面未找到</h1>
      <p className="text-gray-500 mb-8">你访问的页面不存在或已被移除</p>
      <div className="flex gap-3">
        <Link href="/" className="px-6 py-3 bg-brand-600 text-white rounded-xl font-medium hover:bg-brand-700 transition-colors">
          返回首页
        </Link>
        <Link href="/dashboard" className="px-6 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors">
          进入学习
        </Link>
      </div>
    </div>
  );
}
