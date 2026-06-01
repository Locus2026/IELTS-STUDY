'use client';

import { useState, useMemo } from 'react';
import { useUserStore } from '@/stores/user-store';
import { useProgressStore } from '@/stores/progress-store';
import { useIsHydrated } from '@/providers/providers';
import type { CEFRLevel } from '@/types/user';
import { IELTS_VOCAB, type VocabWord } from '@/content/vocab/ielts-vocab';
import { CheckCircle, SkipForward, Volume2, Keyboard } from 'lucide-react';

const VOCAB_DB = IELTS_VOCAB;

const CEFR_ORDER: CEFRLevel[] = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1'];
const LEVEL_LABELS: Record<CEFRLevel, string> = { A0:'零基础', A1:'入门', A2:'基础', B1:'进阶', B2:'中高', C1:'高级' };

export default function VocabPage() {
  const hydrated = useIsHydrated();
  const user = useUserStore((s) => s);
  const vocabMastered = useProgressStore((s) => s.vocabMastered);
  const addVocabMastered = useProgressStore((s) => s.addVocabMastered);
  const addXP = useUserStore((s) => s.addXP);

  const userCEFR = user.placementTest?.estimatedCEFR || 'A1';
  const userLevelIdx = CEFR_ORDER.indexOf(userCEFR);

  const [mode, setMode] = useState<'learn' | 'review'>('learn');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [currentLearnLevelIdx, setCurrentLearnLevelIdx] = useState(userLevelIdx);
  // Typing practice: user must type word correctly 5 times
  const [typingInput, setTypingInput] = useState('');
  const [typingCount, setTypingCount] = useState(0);
  const [typingDone, setTypingDone] = useState(false);

  // Filter: show words at currentLearnLevelIdx. Skip mastered words.
  const learnableWords = useMemo(() => {
    const level = CEFR_ORDER[currentLearnLevelIdx];
    return VOCAB_DB.filter(w => w.level === level && !vocabMastered.includes(w.id));
  }, [currentLearnLevelIdx, vocabMastered]);

  // Check if current level is complete
  const currentLevelTotal = useMemo(() =>
    VOCAB_DB.filter(w => w.level === CEFR_ORDER[currentLearnLevelIdx]).length,
  [currentLearnLevelIdx]);
  const currentLevelMastered = useMemo(() =>
    VOCAB_DB.filter(w => w.level === CEFR_ORDER[currentLearnLevelIdx] && vocabMastered.includes(w.id)).length,
  [currentLearnLevelIdx, vocabMastered]);
  const isLevelComplete = currentLevelTotal > 0 && currentLevelMastered === currentLevelTotal;
  const canAdvance = currentLearnLevelIdx < CEFR_ORDER.length - 1;

  // Words for review (already mastered)
  const reviewWords = useMemo(() => VOCAB_DB.filter(w => vocabMastered.includes(w.id)), [vocabMastered]);

  const words = mode === 'learn' ? learnableWords : reviewWords;
  const word = words[currentIdx] || null;

  const markKnown = () => {
    if (!word || !typingDone) return;
    addVocabMastered(word.id);
    addXP(3);
    setFlipped(false); setTypingInput(''); setTypingCount(0); setTypingDone(false);
    if (currentIdx >= words.length - 1) setCurrentIdx(0);
  };

  const skip = () => {
    setFlipped(false); setTypingInput(''); setTypingCount(0); setTypingDone(false);
    setCurrentIdx(i => (i + 1) % Math.max(words.length, 1));
  };

  const playAudio = (text: string) => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US'; u.rate = 0.8;
    synth.speak(u);
  };

  const handleTyping = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || !word || typingDone) return;
    const val = typingInput.trim();
    if (val.toLowerCase() === word.word.toLowerCase()) {
      const newCount = typingCount + 1;
      setTypingCount(newCount);
      setTypingInput('');
      if (newCount >= 5) setTypingDone(true);
    } else {
      setTypingInput('');
    }
  };

  if (!hydrated) return <div className="p-8"><div className="animate-pulse h-64 bg-gray-200 rounded-2xl" /></div>;

  return (
    <div className="max-w-2xl mx-auto p-4 lg:p-6 pb-20">
      <h1 className="text-2xl font-bold mb-2">词汇系统</h1>
      <p className="text-gray-500 mb-1">
        你的水平：<span className="text-brand-600 font-medium">{LEVEL_LABELS[userCEFR]} ({userCEFR})</span>
        · 已掌握：{vocabMastered.length} · 剩余：{learnableWords.length}
      </p>

      {/* Mode toggle */}
      <div className="flex items-center gap-2 mb-6 mt-3">
        <button onClick={() => { setMode('learn'); setCurrentIdx(0); setFlipped(false); }}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${mode === 'learn' ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
          学习新词 ({learnableWords.length})
        </button>
        <button onClick={() => { setMode('review'); setCurrentIdx(0); setFlipped(false); }}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${mode === 'review' ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
          复习 ({reviewWords.length})
        </button>
      </div>

      {/* Level progress bar */}
      <div className="flex items-center gap-1 mb-6">
        {CEFR_ORDER.map((lvl, i) => {
          const allWords = VOCAB_DB.filter(w => w.level === lvl).length;
          const mastered = VOCAB_DB.filter(w => w.level === lvl && vocabMastered.includes(w.id)).length;
          const isCurrent = i === currentLearnLevelIdx;
          const isUnlocked = i <= currentLearnLevelIdx || mastered > 0;
          return (
            <button key={lvl} onClick={() => { if (isUnlocked) { setCurrentLearnLevelIdx(i); setCurrentIdx(0); setFlipped(false); } }}
              disabled={!isUnlocked}
              className={`flex-1 text-center px-1 py-2 rounded-lg text-xs transition-all ${
                isCurrent ? 'bg-brand-600 text-white font-bold' :
                mastered === allWords && allWords > 0 ? 'bg-green-100 text-green-700' :
                isUnlocked ? 'bg-gray-100 text-gray-500 hover:bg-gray-200' :
                'bg-gray-50 text-gray-300 cursor-not-allowed'
              }`}>
              <div>{lvl}</div>
              <div className="text-[10px]">{mastered}/{allWords}</div>
            </button>
          );
        })}
      </div>

      {word ? (
        <>
          {/* Flashcard */}
          <div onClick={() => !flipped && setFlipped(true)}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm cursor-pointer mb-6" style={{ minHeight: '260px' }}>
            <div className="p-8 text-center">
              {!flipped ? (
                <>
                  <p className="text-xs text-gray-400 mb-2">{word.level} · {word.topic}</p>
                  <div className="text-5xl font-bold text-brand-700 mb-3">{word.word}</div>
                  <p className="text-gray-400 mb-4">{word.phonetic}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); playAudio(word.word); }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-50 text-brand-600 rounded-full hover:bg-brand-100 transition-colors text-sm font-medium">
                    <Volume2 className="w-4 h-4" /> 听发音
                  </button>
                  <p className="text-xs text-gray-300 mt-6" onClick={() => setFlipped(true)}>点击卡片翻转查看释义</p>
                </>
              ) : (
                <>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{word.chinese}</div>
                  <p className="text-sm text-gray-500 mb-4">{word.pos} · {word.phonetic}</p>
                  <div className="bg-gray-50 rounded-xl p-4 text-left mb-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm text-gray-700 mb-1">{word.example}</p>
                        <p className="text-xs text-gray-400">{word.exampleCN}</p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); playAudio(word.example); }}
                        className="flex-shrink-0 p-2 text-brand-500 hover:bg-brand-50 rounded-lg transition-colors"
                        title="听例句发音">
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Typing practice */}
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-2 mb-3 justify-center">
                      <Keyboard className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500">打字练习 · 正确输入5遍即可掌握</span>
                    </div>
                    {/* Typing progress dots */}
                    <div className="flex items-center justify-center gap-1.5 mb-3">
                      {[0,1,2,3,4].map(i => (
                        <div key={i} className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold transition-all ${
                          i < typingCount ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-300'
                        }`}>
                          {i < typingCount ? '✓' : i + 1}
                        </div>
                      ))}
                    </div>
                    {!typingDone ? (
                      <div className="relative">
                        <input
                          type="text"
                          value={typingInput}
                          onChange={e => setTypingInput(e.target.value)}
                          onKeyDown={handleTyping}
                          placeholder={`输入: ${word.word}`}
                          autoFocus
                          className="w-full px-4 py-3 border-2 border-brand-200 rounded-xl text-center text-lg font-medium focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                        />
                        <p className="text-xs text-gray-400 mt-1">按 Enter 确认 · 已正确 {typingCount}/5 次</p>
                      </div>
                    ) : (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
                        <p className="text-green-700 text-sm font-medium">🎉 打字练习完成！</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button onClick={skip} className="flex-1 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50">
              <SkipForward className="w-4 h-4 inline mr-1" /> 跳过
            </button>
            <button onClick={markKnown} disabled={!typingDone}
              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                typingDone ? 'bg-brand-600 text-white hover:bg-brand-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}>
              <CheckCircle className="w-4 h-4 inline mr-1" /> 我记住了 (+3XP)
            </button>
          </div>

          <div className="mt-4 text-center text-sm text-gray-400">
            {currentIdx + 1} / {words.length} · 本级别进度 {currentLevelMastered}/{currentLevelTotal}
          </div>
        </>
      ) : isLevelComplete ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-xl font-bold mb-2">{LEVEL_LABELS[CEFR_ORDER[currentLearnLevelIdx]]} 级别完成！</h2>
          <p className="text-gray-500 mb-6">已掌握 {currentLevelMastered} 个词汇</p>
          {canAdvance ? (
            <button
              onClick={() => { setCurrentLearnLevelIdx(i => i + 1); setCurrentIdx(0); setFlipped(false); }}
              className="px-8 py-4 bg-gradient-to-r from-brand-600 to-brand-700 text-white font-bold rounded-xl text-lg hover:from-brand-700 hover:to-brand-800 transition-all shadow-lg">
              进入 {LEVEL_LABELS[CEFR_ORDER[currentLearnLevelIdx + 1]]} 级别 → ({CEFR_ORDER[currentLearnLevelIdx + 1]} · {VOCAB_DB.filter(w => w.level === CEFR_ORDER[currentLearnLevelIdx + 1]).length} 个词汇)
            </button>
          ) : (
            <div>
              <p className="text-gray-500 mb-4">🎊 所有级别全部完成！你是词汇大师！</p>
              <button onClick={() => setMode('review')} className="px-6 py-3 border border-brand-200 text-brand-600 rounded-xl font-medium hover:bg-brand-50">
                进入复习模式
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <div className="text-4xl mb-4">{mode === 'learn' ? '📚' : '📚'}</div>
          <p className="text-gray-500">{mode === 'learn' ? '正在加载词汇...' : '还没有复习的词汇'}</p>
        </div>
      )}
    </div>
  );
}
