'use client';

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import Link from 'next/link';
import type { WritingFeedback } from '@/types/ai';

const TASK2_PROMPT = `Some people believe that universities should provide free education for everyone, regardless of their financial background. To what extent do you agree or disagree?

Write at least 250 words. You should spend about 40 minutes on this task.`;

export default function WritingPage() {
  const [essay, setEssay] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<WritingFeedback | null>(null);
  const [error, setError] = useState('');

  const wordCount = essay.trim() ? essay.trim().split(/\s+/).length : 0;

  const handleSubmit = async () => {
    if (!essay.trim() || wordCount < 50) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/ai/writing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ essay, taskType: 'task2', currentCEFR: 'A2', targetBand: 6.5 }),
      });
      if (!res.ok) throw new Error('批改服务暂不可用');
      const data = await res.json();
      setFeedback(data);
    } catch (e: any) {
      setError(e.message || '批改失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-6 pb-20">
      <h1 className="text-2xl font-bold mb-2">AI 写作批改</h1>
      <p className="text-gray-500 mb-3">提交雅思作文，AI 将按四项评分标准给出详细反馈</p>
      <div className="flex gap-2 mb-6">
        <span className="px-3 py-1 bg-brand-600 text-white rounded-lg text-sm font-medium">Task 2 · 议论文</span>
        <Link href="/practice/writing/task1" className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-sm hover:bg-gray-200">Task 1 · 图表题 →</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input side */}
        <div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-semibold mb-3">写作题目（Task 2）</h3>
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 mb-4 whitespace-pre-wrap">{TASK2_PROMPT}</div>

            <h3 className="font-semibold mb-3">你的作文</h3>
            <textarea
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              placeholder="在这里输入你的作文..."
              className="w-full h-64 p-4 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <div className="flex items-center justify-between mt-2">
              <span className={`text-xs ${wordCount >= 250 ? 'text-green-600' : 'text-gray-400'}`}>
                字数：{wordCount} / 250
              </span>
              <button
                onClick={handleSubmit}
                disabled={loading || wordCount < 50}
                className="px-6 py-2.5 bg-brand-600 text-white rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-brand-700 transition-colors flex items-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {loading ? '批改中...' : '提交批改'}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </div>

        {/* Feedback side */}
        <div>
          {feedback ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-brand-600">{feedback.bandScore}</div>
                <p className="text-sm text-gray-500">预估雅思写作分数</p>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { label: '任务回应', score: feedback.subScores.taskResponse },
                  { label: '连贯与衔接', score: feedback.subScores.coherenceAndCohesion },
                  { label: '词汇资源', score: feedback.subScores.lexicalResource },
                  { label: '语法准确性', score: feedback.subScores.grammaticalRangeAndAccuracy },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <span className="w-24 text-xs text-gray-500">{s.label}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div className="h-2 rounded-full bg-brand-500" style={{ width: `${(s.score / 9) * 100}%` }} />
                    </div>
                    <span className="text-xs font-medium">{s.score}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <h4 className="font-semibold text-sm mb-2">总体评价</h4>
                <p className="text-sm text-gray-600">{feedback.overallComment}</p>
              </div>

              {feedback.suggestions.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">修改建议</h4>
                  <div className="space-y-2">
                    {feedback.suggestions.map((s, i) => (
                      <div key={i} className="bg-orange-50 border border-orange-100 rounded-lg p-3 text-sm">
                        <p className="text-orange-800">
                          <span className="line-through text-red-400">{s.originalText}</span>
                          {' → '}
                          <span className="text-green-600 font-medium">{s.correctedText}</span>
                        </p>
                        <p className="text-orange-600 text-xs mt-1">{s.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 text-center">
              <div className="text-4xl mb-3">📝</div>
              <p className="text-gray-400 text-sm">提交你的作文后，AI 批改结果将显示在这里</p>
              <p className="text-gray-400 text-xs mt-2">支持 Task 1 和 Task 2 批改</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
