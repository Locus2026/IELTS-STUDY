'use client';

import Link from 'next/link';

export default function OnboardingPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
      <div className="text-6xl mb-6">🎯</div>
      <h1 className="text-3xl font-bold mb-4">欢迎来到 IELTS Bridge</h1>
      <p className="text-gray-500 max-w-md mb-2">
        在你正式开始学习之前，我们先做一个简短的测试，了解你目前的英语水平。
      </p>
      <div className="mt-6 text-left bg-white rounded-2xl border border-gray-100 p-6 max-w-md w-full space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <span className="text-blue-500 text-lg">📝</span>
          <span><strong>词汇测试</strong> — 20题，约8分钟</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-purple-500 text-lg">📐</span>
          <span><strong>语法测试</strong> — 20题，约8分钟</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-cyan-500 text-lg">🎧</span>
          <span><strong>听力小测</strong> — 15题，约8分钟</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-green-500 text-lg">📊</span>
          <span><strong>即时报告</strong> — 获得你的 CEFR 等级和学习规划</span>
        </div>
      </div>
      <p className="mt-6 text-sm text-gray-400 max-w-md">
        整个过程大约需要 <strong>20-25分钟</strong>。测试结果会保存在你的浏览器中，我们不会收集任何个人信息。
      </p>
      <Link
        href="/onboarding/placement-test"
        className="mt-8 px-8 py-3.5 bg-brand-600 text-white font-semibold rounded-xl text-lg hover:bg-brand-700 transition-colors shadow-lg"
      >
        开始测试 →
      </Link>
    </div>
  );
}
