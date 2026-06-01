'use client';

import { ExternalLink, BookOpen, Headphones, PenLine, Mic, FileText, GraduationCap } from 'lucide-react';

const officialResources = [
  {
    title: 'British Council 官方免费资源',
    icon: GraduationCap,
    color: 'bg-blue-500',
    items: [
      { label: '免费在线模考（学术类）', desc: '完整4科模考，自动评分', url: 'https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-english-practice-tests' },
      { label: '听力练习样题', desc: 'Section 1-4 完整样题+音频', url: 'https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-english-practice-tests/listening' },
      { label: '阅读练习样题', desc: '学术类+培训类', url: 'https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-english-practice-tests/reading' },
      { label: '写作样题+范文', desc: 'Task 1 + Task 2 样题及考官范文', url: 'https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-english-practice-tests/writing' },
      { label: '口语样题+视频', desc: 'Part 1-3 样题及考生录像', url: 'https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-english-practice-tests/speaking' },
      { label: 'IELTS Prep App', desc: '官方备考App，含语法+词汇+练习', url: 'https://takeielts.britishcouncil.org/take-ielts/prepare/ielts-prep-app' },
    ],
  },
  {
    title: 'IDP IELTS 官方资源',
    icon: BookOpen,
    color: 'bg-purple-500',
    items: [
      { label: '免费学术类模考', desc: '听力+阅读+写作完整模拟', url: 'https://ielts.idp.com/prepare/free-ielts-practice-test' },
      { label: '口语题库+模拟', desc: 'Part 1-3 当季话题+在线练习', url: 'https://ielts.idp.com/prepare/ielts-speaking-test' },
      { label: '写作Task 1+2 高频题', desc: '真题风格的练习题目', url: 'https://ielts.idp.com/prepare/ielts-writing-test' },
      { label: '听力技巧+练习', desc: '各题型策略+在线练习', url: 'https://ielts.idp.com/prepare/ielts-listening-test' },
      { label: '阅读技巧+练习', desc: '学术类阅读策略指南', url: 'https://ielts.idp.com/prepare/ielts-reading-test' },
    ],
  },
  {
    title: 'IELTS.org 官方资源',
    icon: FileText,
    color: 'bg-green-500',
    items: [
      { label: '官方样题下载', desc: 'PDF格式，含听力音频', url: 'https://www.ielts.org/for-test-takers/sample-test-questions' },
      { label: '评分标准（Band Descriptors）', desc: '写作+口语官方评分细则', url: 'https://www.ielts.org/for-test-takers/how-ielts-is-scored' },
      { label: '考试当天须知', desc: '官方流程+注意事项', url: 'https://www.ielts.org/for-test-takers/test-day-information' },
    ],
  },
  {
    title: 'IELTS Liz（前考官免费教学）',
    icon: Mic,
    color: 'bg-pink-500',
    items: [
      { label: '听力技巧+练习', desc: '前考官讲解各题型策略', url: 'https://ieltsliz.com/ielts-listening/' },
      { label: '阅读技巧+练习', desc: 'T/F/NG专项突破', url: 'https://ieltsliz.com/ielts-reading-lessons-information-and-tips/' },
      { label: '写作Task 1+2范文', desc: '考官范文+详细分析', url: 'https://ieltsliz.com/ielts-writing-task-2/' },
      { label: '口语话题+高分答案', desc: '当季Part 1-3话题+示范', url: 'https://ieltsliz.com/ielts-speaking-part-1-topics/' },
      { label: '词汇+语法提升', desc: '考试必备词汇和语法专题', url: 'https://ieltsliz.com/ielts-vocabulary/' },
    ],
  },
];

const aiResources = [
  { label: '听力专项训练', desc: 'Section 1-4 全覆盖 · AI生成听力脚本+题目 · TTS语音朗读', href: '/practice/listening' },
  { label: '阅读专项训练', desc: '学术阅读 · T/F/NG+选择+填空 · AI生成文章+题目', href: '/practice/reading' },
  { label: '写作专项训练', desc: 'Task 1图表+Task 2议论文 · AI批改+四项评分+逐句建议', href: '/practice/writing' },
  { label: '口语专项训练', desc: 'Part 1-3全覆盖 · 录音+AI评分 · 2026年最新题库', href: '/practice/speaking' },
  { label: '语法系统', desc: '17个IELTS语法点 · 分级学习 · 即时练习+反馈', href: '/grammar' },
  { label: '词汇系统', desc: 'A0-C1六级分级 · 110个雅思高频词 · 打字+语音记忆', href: '/vocab' },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-6 pb-20">
      <h1 className="text-2xl font-bold mb-2">备考资源中心</h1>
      <p className="text-gray-500 mb-6">官方免费真题 + AI仿真题 · 所有资源均合法可免费使用</p>

      {/* AI 仿真题入口 */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl p-6 text-white mb-6">
        <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
          🤖 AI 仿真题（本站）
        </h2>
        <p className="text-brand-100 text-sm mb-4">原创题目，题型和难度对标剑桥雅思真题，无限次练习</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {aiResources.map(r => (
            <a key={r.href} href={r.href}
              className="block p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-sm">
              <p className="font-medium">{r.label}</p>
              <p className="text-brand-200 text-xs mt-0.5">{r.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* 官方资源 */}
      <div className="space-y-4">
        {officialResources.map(group => {
          const Icon = group.icon;
          return (
            <div key={group.title} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 ${group.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-semibold">{group.title}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {group.items.map(item => (
                  <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-start gap-2 p-2.5 rounded-lg hover:bg-gray-50 transition-colors group">
                    <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-brand-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 group-hover:text-brand-600">{item.label}</p>
                      <p className="text-xs text-gray-400">{item.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-700">
        <p className="font-medium mb-1">📌 版权说明</p>
        <p>以上链接均为 IELTS 官方机构（British Council / IDP / Cambridge）及前考官公开提供的免费资源。第三方网站内容版权归原作者所有。本站 AI 仿真题为原创内容。</p>
      </div>
    </div>
  );
}
