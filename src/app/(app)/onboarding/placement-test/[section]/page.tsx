'use client';

import { useState, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPlacementQuestions } from '@/content/exercises/placement/placement-test';
import { Volume2, CheckCircle2, Pause, Play } from 'lucide-react';

type Section = 'vocab' | 'grammar' | 'listening';

export default function PlacementTestSectionPage() {
  const params = useParams();
  const router = useRouter();
  const section = params.section as Section;

  const questions = getPlacementQuestions(section);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [playedQuestions, setPlayedQuestions] = useState<Set<string>>(new Set());
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const allAnswered = Object.keys(answers).length === questions.length;
  const isListening = section === 'listening';
  const hasPlayed = playedQuestions.has(question?.id || '');
  const hasAudio = !!question?.audioText;

  // TTS playback
  const playAudio = useCallback(() => {
    if (!question?.audioText || hasPlayed) return;
    if (isPaused) {
      synthRef.current?.resume();
      setIsSpeaking(true);
      setIsPaused(false);
      return;
    }
    const synth = window.speechSynthesis;
    synthRef.current = synth;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(question.audioText);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setPlayedQuestions((prev) => new Set(prev).add(question.id));
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setPlayedQuestions((prev) => new Set(prev).add(question.id));
    };
    synth.speak(utterance);
  }, [question, hasPlayed, isPaused]);

  const pauseAudio = useCallback(() => {
    synthRef.current?.pause();
    setIsSpeaking(false);
    setIsPaused(true);
  }, []);

  // Stop speaking when navigating away
  const cleanupSpeech = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const selectAnswer = useCallback((qId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: answer }));
  }, []);

  const next = useCallback(() => {
    cleanupSpeech();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, questions.length, cleanupSpeech]);

  const prev = useCallback(() => {
    cleanupSpeech();
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  }, [currentIndex, cleanupSpeech]);

  const finish = useCallback(() => {
    if (!allAnswered && !submitted) return;
    cleanupSpeech();
    setSubmitted(true);
    const existing = JSON.parse(localStorage.getItem('placement-answers') || '{}');
    existing[section] = answers;
    localStorage.setItem('placement-answers', JSON.stringify(existing));

    const nextMap: Record<Section, string> = {
      vocab: '/onboarding/placement-test/grammar',
      grammar: '/onboarding/placement-test/listening',
      listening: '/onboarding/placement-test/result',
    };
    router.push(nextMap[section]);
  }, [answers, section, allAnswered, submitted, router, cleanupSpeech]);

  if (!question) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold mb-2">此部分已完成</h2>
        <p className="text-gray-500">答案已保存</p>
      </div>
    );
  }

  const sectionLabel = { vocab: '词汇测试', grammar: '语法测试', listening: '听力测试' }[section];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto p-4 lg:p-6 pb-20">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>{sectionLabel}</span>
          <span>{currentIndex + 1} / {questions.length}</span>
        </div>
        <div className="bg-gray-200 rounded-full h-2">
          <div className="bg-brand-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        {/* Audio player for listening section */}
        {isListening && hasAudio && (
          <div className="mb-6">
            <button
              onClick={playAudio}
              disabled={hasPlayed || isSpeaking}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl border-2 transition-all w-full justify-center ${
                hasPlayed
                  ? 'border-green-200 bg-green-50 text-green-600 cursor-default'
                  : isSpeaking
                  ? 'border-brand-300 bg-brand-50 text-brand-600 animate-pulse'
                  : 'border-brand-200 bg-brand-50 text-brand-600 hover:bg-brand-100 hover:border-brand-400 active:scale-[0.98]'
              }`}
            >
              {hasPlayed ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">已播放</span>
                </>
              ) : isSpeaking ? (
                <>
                  <Volume2 className="w-5 h-5 animate-pulse" />
                  <span className="font-medium">播放中...</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-5 h-5" />
                  <span className="font-medium">🔊 播放音频（仅一次）</span>
                </>
              )}
            </button>
            {hasPlayed && (
              <p className="text-xs text-gray-400 text-center mt-2">音频已播放，请根据记忆作答。真实雅思听力只播放一遍。</p>
            )}
            {!hasPlayed && (
              <p className="text-xs text-amber-500 text-center mt-2">⚠️ 先点播放，仔细听完再答题。只能播放一次！</p>
            )}
          </div>
        )}

        <p className="text-lg font-medium mb-6">{question.stem}</p>
        <div className="space-y-3">
          {question.options!.map((opt, i) => {
            const selected = answers[question.id] === opt;
            return (
              <button
                key={i}
                onClick={() => selectAnswer(question.id, opt)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selected
                    ? 'border-brand-500 bg-brand-50 text-brand-700'
                    : 'border-gray-100 hover:border-gray-300'
                }`}
              >
                <span className="font-medium text-sm text-gray-400 mr-3">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={prev}
          disabled={currentIndex === 0}
          className="px-4 py-2 text-sm text-gray-500 disabled:opacity-30"
        >
          ← 上一题
        </button>
        <div className="flex gap-2">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                answers[questions[i].id] ? 'bg-brand-500' : i === currentIndex ? 'bg-gray-400' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        {isLast ? (
          <button
            onClick={finish}
            disabled={!allAnswered}
            className="px-6 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-brand-700 transition-colors"
          >
            完成{sectionLabel}
          </button>
        ) : (
          <button
            onClick={next}
            className="px-4 py-2 text-sm text-brand-600 font-medium"
          >
            下一题 →
          </button>
        )}
      </div>
    </div>
  );
}
