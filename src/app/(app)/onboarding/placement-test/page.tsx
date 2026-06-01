'use client';

import Link from 'next/link';

export default function PlacementTestPage() {
  return (
    <div className="max-w-2xl mx-auto p-4 lg:p-6 pb-20">
      <h1 className="text-2xl font-bold mb-2">定级测试</h1>
      <p className="text-gray-500 mb-6">共三个部分，按顺序完成即可。真实反映你的当前水平。</p>

      <div className="space-y-4">
        <Link
          href="/onboarding/placement-test/vocab"
          className="block bg-white rounded-2xl border border-gray-100 p-6 hover:border-brand-200 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl">📝</div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">第一部分：词汇测试</h3>
              <p className="text-sm text-gray-500">20道题 · 约8分钟 · 测试你的词汇认知和理解能力</p>
            </div>
            <span className="text-brand-600 text-sm font-medium">开始 →</span>
          </div>
        </Link>

        <Link
          href="/onboarding/placement-test/grammar"
          className="block bg-white rounded-2xl border border-gray-100 p-6 hover:border-brand-200 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-xl">📐</div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">第二部分：语法测试</h3>
              <p className="text-sm text-gray-500">20道题 · 约8分钟 · 测试基础语法掌握程度</p>
            </div>
            <span className="text-brand-600 text-sm font-medium">开始 →</span>
          </div>
        </Link>

        <Link
          href="/onboarding/placement-test/listening"
          className="block bg-white rounded-2xl border border-gray-100 p-6 hover:border-brand-200 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-xl flex items-center justify-center text-xl">🎧</div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">第三部分：听力小测</h3>
              <p className="text-sm text-gray-500">15道题 · 约8分钟 · 测试基础听力理解能力</p>
            </div>
            <span className="text-brand-600 text-sm font-medium">开始 →</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
