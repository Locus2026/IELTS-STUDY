'use client';

import Link from 'next/link';
import { Headphones, BookOpen, PenLine, Mic, Sparkles, ChevronRight } from 'lucide-react';

const sections = [
  { id: 'listening', label: '听力', icon: Headphones, desc: '填空+选择+配对+地图，AI生成听力脚本和题目', color: 'text-cyan-600', bg: 'bg-cyan-50', href: '/practice/listening' },
  { id: 'reading', label: '阅读', icon: BookOpen, desc: 'T/F/NG+标题匹配+填空，AI生成文章+模仿真题逻辑', color: 'text-emerald-600', bg: 'bg-emerald-50', href: '/practice/reading' },
  { id: 'writing', label: '写作', icon: PenLine, desc: 'Task 1图表+Task 2议论文，AI批改+四项评分+逐句建议', color: 'text-orange-600', bg: 'bg-orange-50', href: '/practice/writing' },
  { id: 'speaking', label: '口语', icon: Mic, desc: 'Part 1-3全覆盖，AI语音评分+流利度/发音/词汇/语法', color: 'text-purple-600', bg: 'bg-purple-50', href: '/practice/speaking' },
];

export default function PracticeHubPage() {
  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-6 pb-20">
      <h1 className="text-2xl font-bold mb-2">专项训练</h1>
      <p className="text-gray-500 mb-6">四科独立训练，AI出题 + AI评分。点击任一科目开始</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.id} href={s.href}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-brand-200 hover:shadow-md transition-all group">
              <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${s.color}`} />
              </div>
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                {s.label}
                <Sparkles className="w-4 h-4 text-amber-400" />
              </h3>
              <p className="text-sm text-gray-500 mb-4">{s.desc}</p>
              <span className="text-brand-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                开始训练 <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-6">
        <Link href="/practice/resources" className="block bg-white rounded-2xl border border-gray-100 p-5 hover:border-brand-200 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📚</span>
              <div>
                <h3 className="font-semibold">官方真题资源</h3>
                <p className="text-sm text-gray-500">British Council · IDP · IELTS.org 免费真题汇总</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </div>
        </Link>
      </div>

      <div className="mt-6 bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">全真模考</h3>
            <p className="text-brand-100 text-sm mt-1">听力20题 + 阅读20题 + 写作Task 2，严格计时</p>
          </div>
          <Link href="/practice/mock-test/1"
            className="px-6 py-2.5 bg-white text-brand-700 rounded-xl text-sm font-medium hover:bg-brand-50 transition-colors">
            进入模考
          </Link>
        </div>
      </div>
    </div>
  );
}
