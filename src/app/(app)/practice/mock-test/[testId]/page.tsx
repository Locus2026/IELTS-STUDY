'use client';

import Link from 'next/link';

export default function MockTestIntroPage() {
  return (
    <div className="max-w-2xl mx-auto p-4 lg:p-6 pb-20">
      <h1 className="text-2xl font-bold mb-2">全真模拟测试</h1>
      <p className="text-gray-500 mb-6">模拟真实雅思考试环境，检验你的备考成果</p>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">模拟测试卷一</h2>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span>听力</span><span>30分钟 · 40题</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span>阅读</span><span>60分钟 · 40题</span>
          </div>
          <div className="flex justify-between py-2">
            <span>写作</span><span>60分钟 · 2篇</span>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700 mb-6">
        请在安静、不受打扰的环境中完成模考。考试开始后将严格计时，不可暂停。
      </div>

      <Link
        href="/practice/mock-test/1/listening"
        className="block w-full py-4 bg-brand-600 text-white font-bold rounded-xl text-lg text-center hover:bg-brand-700 transition-colors shadow-lg"
      >
        开始考试
      </Link>
    </div>
  );
}
