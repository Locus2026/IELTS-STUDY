'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/user-store';
import { useProgressStore } from '@/stores/progress-store';
import { calculatePlacementResult } from '@/lib/scoring';
import { CEFR_LABELS } from '@/lib/cefr';
import type { PlacementTestResult } from '@/types/user';

const skillLabelMap: Record<string, string> = {
  vocabulary: '词汇', grammar: '语法', listening: '听力',
  reading: '阅读', writing: '写作', speaking: '口语',
};

const levelLabelMap: Record<string, string> = {
  beginner: '入门级', foundation: '基础级', 'ielts-prep': '雅思衔接级',
};

export default function PlacementResultPage() {
  const router = useRouter();
  const completePlacementTest = useUserStore((s) => s.completePlacementTest);
  const completeOnboarding = useUserStore((s) => s.completeOnboarding);
  const updateSkillScore = useProgressStore((s) => s.updateSkillScore);
  const [result, setResult] = useState<PlacementTestResult | null>(null);
  const processedRef = useRef(false);

  useEffect(() => {
    // Guard against React Strict Mode double-invocation
    if (processedRef.current) return;
    processedRef.current = true;

    const raw = JSON.parse(localStorage.getItem('placement-answers') || '{}');

    // Answer key keyed by question ID (robust against reordering)
    const correctMap: Record<string, string> = {
      // Vocab
      'p-v01':'苹果','p-v02':'Sad','p-v03':'beautiful','p-v04':'Significant','p-v05':'smart',
      'p-v06':'环境','p-v07':'sad','p-v08':'机会','p-v09':'decrease','p-v10':'令人愉快的',
      'p-v11':'thorough','p-v12':'勤奋的','p-v13':'considerable','p-v14':'详细说明','p-v15':'模糊的',
      'p-v16':'简洁的','p-v17':'reduce','p-v18':'假设','p-v19':'accommodation','p-v20':'有洞见的',
      // Grammar
      'p-g01':'is','p-g02':'are','p-g03':'go','p-g04':'is watching','p-g05':'has',
      'p-g06':'were','p-g07':'was written','p-g08':'for','p-g09':'Would','p-g10':'better',
      'p-g11':'were','p-g12':'arrive','p-g13':'had I arrived','p-g14':'does she dance','p-g15':'whose',
      'p-g16':'will have been','p-g17':'I lived','p-g18':'attend','p-g19':'had studied','p-g20':'would have failed',
      // Listening
      'p-l01':'3:30','p-l02':'图书馆','p-l03':'晴天温暖','p-l04':'悉尼','p-l05':'15美元',
      'p-l06':'交通拥堵','p-l07':'徒步','p-l08':'紧张','p-l09':'航班登机','p-l10':'教师',
      'p-l11':'酒店','p-l12':'持保留意见','p-l13':'下周五','p-l14':'气候变化的经济影响','p-l15':'可能但需要更多支持',
    };

    function calcScore(answers: Record<string, string>): number {
      const ids = Object.keys(answers);
      if (!ids.length) return 0;
      let correct = 0;
      for (const id of ids) {
        if (correctMap[id] !== undefined && answers[id].trim() === correctMap[id].trim()) {
          correct++;
        }
      }
      return Math.round((correct / ids.length) * 100);
    }

    const vocabScore = calcScore(raw.vocab || {});
    const grammarScore = calcScore(raw.grammar || {});
    const listeningScore = calcScore(raw.listening || {});

    const res = calculatePlacementResult({ vocab: vocabScore, grammar: grammarScore, listening: listeningScore });
    setResult(res);
    completePlacementTest(res);
    updateSkillScore('vocabulary', vocabScore);
    updateSkillScore('grammar', grammarScore);
    updateSkillScore('listening', listeningScore);
    localStorage.removeItem('placement-answers');
  }, [completePlacementTest, updateSkillScore]);

  const handleStartLearning = () => {
    completeOnboarding();
    router.push('/dashboard');
  };

  if (!result) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600 mx-auto" />
        <p className="mt-4 text-gray-500">正在分析你的测试结果...</p>
      </div>
    );
  }

  const cefrInfo = CEFR_LABELS[result.estimatedCEFR];

  return (
    <div className="max-w-2xl mx-auto p-4 lg:p-6 pb-20">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold">测试完成！</h1>
        <p className="text-gray-500 mt-2">以下是你的英语水平评估结果</p>
      </div>

      <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-2xl p-8 text-white text-center mb-6">
        <p className="text-brand-100 text-sm mb-2">你的预估雅思分数</p>
        <div className="text-6xl font-bold mb-2">{result.estimatedIELTS}</div>
        <p className="text-brand-200 mb-4">CEFR 等级：{cefrInfo.label}（{result.estimatedCEFR}）</p>
        <div className={`inline-block px-4 py-1.5 rounded-full text-sm bg-white/20 text-white`}>
          {cefrInfo.description}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">各分项得分</h2>
        {([
          { label: '词汇', score: result.vocabScore, color: '#3b82f6' },
          { label: '语法', score: result.grammarScore, color: '#8b5cf6' },
          { label: '听力', score: result.listeningScore, color: '#06b6d4' },
        ]).map((s) => (
          <div key={s.label} className="flex items-center gap-3 mb-3">
            <span className="w-10 text-sm text-gray-500">{s.label}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-3">
              <div className="h-3 rounded-full transition-all duration-700" style={{ width: `${s.score}%`, backgroundColor: s.color }} />
            </div>
            <span className="w-10 text-sm text-right font-medium">{s.score}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="font-semibold text-lg mb-3">分析</h2>
        <div className="space-y-3 text-sm">
          {result.strengths.length > 0 && (
            <div>
              <span className="text-green-600 font-medium">优势：</span>
              <span className="text-gray-600">{result.strengths.map((s) => skillLabelMap[s] || s).join('、')}</span>
            </div>
          )}
          {result.weaknesses.length > 0 && (
            <div>
              <span className="text-orange-600 font-medium">需要加强：</span>
              <span className="text-gray-600">{result.weaknesses.map((s) => skillLabelMap[s] || s).join('、')}</span>
            </div>
          )}
          <p className="text-gray-500 mt-2">
            推荐从 <strong>{levelLabelMap[result.recommendedStartingLevel] || result.recommendedStartingLevel}</strong> 开始学习。
          </p>
        </div>
      </div>

      <button
        onClick={handleStartLearning}
        className="w-full py-4 bg-brand-600 text-white font-bold rounded-xl text-lg hover:bg-brand-700 transition-colors shadow-lg"
      >
        开始我的学习 →
      </button>
    </div>
  );
}
