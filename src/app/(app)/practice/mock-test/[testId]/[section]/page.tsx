'use client';

import { createUtterance } from "@/lib/tts";
import { useState, useCallback, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { formatTime } from '@/lib/utils';
import { Volume2, CheckCircle2 } from 'lucide-react';
import { mockTest01 } from '@/content/mock-tests/test-01';

const listeningQuestions = mockTest01.sections[0].questions;
const readingQuestions = mockTest01.sections[1].questions;
const writingPrompt = mockTest01.sections[2].writingTask?.prompt || 'Write at least 250 words.';

export default function MockTestSectionPage() {
  const params = useParams();
  const router = useRouter();
  const section = params.section as string;
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(section === 'listening' ? 600 : section === 'reading' ? 600 : 600);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [playedAudios, setPlayedAudios] = useState<Set<string>>(new Set());
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const questions = section === 'listening' ? listeningQuestions : section === 'reading' ? readingQuestions : [];
  const totalPoints = questions.reduce((s, q) => s + q.points, 0);
  const isListening = section === 'listening';

  // Countdown timer
  useEffect(() => {
    if (submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timer); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted]);

  // Auto-submit when time runs out
  useEffect(() => {
    if (timeLeft <= 0 && !submitted) {
      handleSubmit();
    }
  }, [timeLeft]);

  // Stop speech on unmount
  useEffect(() => {
    return () => {
      if (synthRef.current) synthRef.current.cancel();
    };
  }, []);

  const playAudio = useCallback((qId: string, audioText: string) => {
    if (playedAudios.has(qId) || speakingId) return;

    const synth = window.speechSynthesis;
    synthRef.current = synth;
    synth.cancel();

    const utterance = createUtterance(audioText);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    utterance.pitch = 1.0;

    utterance.onstart = () => setSpeakingId(qId);
    utterance.onend = () => {
      setSpeakingId(null);
      setPlayedAudios((prev) => new Set(prev).add(qId));
    };
    utterance.onerror = () => {
      setSpeakingId(null);
      setPlayedAudios((prev) => new Set(prev).add(qId));
    };

    synth.speak(utterance);
  }, [playedAudios, speakingId]);

  const handleSubmit = useCallback(() => {
    if (section === 'writing') {
      setSubmitted(true);
      return;
    }
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id]?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()) correct += q.points;
    });
    setScore(Math.min(9, Math.round((correct / totalPoints) * 9)));
    setSubmitted(true);
  }, [answers, questions, section, totalPoints]);

  const nextSection = () => {
    const next: Record<string, string> = { listening: '/practice/mock-test/1/reading', reading: '/practice/mock-test/1/writing', writing: '/dashboard' };
    router.push(next[section] || '/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 lg:p-6 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">{section === 'listening' ? '听力理解' : section === 'reading' ? '阅读理解' : '写作'}</h1>
        {!submitted && (
          <span className={`text-lg font-mono font-bold ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-red-500'}`}>
            {formatTime(timeLeft)}
          </span>
        )}
      </div>

      {!submitted && section !== 'writing' && (
        <div className="space-y-6">
          {isListening && questions.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
              ⚠️ 每段音频只能播放一次。真实雅思听力考试录音也是只放一遍。
            </div>
          )}
          {questions.map((q: any, i: number) => (
            <div key={q.id} className="bg-white rounded-2xl border border-gray-100 p-6">
              <p className="text-sm text-gray-400 mb-3">第 {i + 1} 题</p>

              {isListening && (q as any).audioText || q.stem && (
                <div className="mb-4">
                  <button
                    onClick={() => playAudio(q.id, (q as any).audioText || q.stem)}
                    disabled={playedAudios.has(q.id) || speakingId === q.id}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all text-sm ${
                      playedAudios.has(q.id)
                        ? 'border-green-200 bg-green-50 text-green-600 cursor-default'
                        : speakingId === q.id
                        ? 'border-brand-300 bg-brand-50 text-brand-600 animate-pulse'
                        : 'border-brand-200 bg-brand-50 text-brand-600 hover:bg-brand-100 active:scale-[0.98]'
                    }`}
                  >
                    {playedAudios.has(q.id) ? (
                      <><CheckCircle2 className="w-4 h-4" /> 已播放</>
                    ) : speakingId === q.id ? (
                      <><Volume2 className="w-4 h-4 animate-pulse" /> 播放中...</>
                    ) : (
                      <><Volume2 className="w-4 h-4" /> 🔊 播放音频</>
                    )}
                  </button>
                </div>
              )}

              <p className="font-medium mb-4">{q.stem}</p>
              {q.options ? (
                <div className="space-y-2">
                  {q.options.map((opt: string) => (
                    <button
                      key={opt}
                      onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt }))}
                      className={`w-full text-left p-3 rounded-lg border-2 text-sm transition-all ${
                        answers[q.id] === opt ? 'border-brand-500 bg-brand-50' : 'border-gray-100 hover:border-gray-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  value={answers[q.id] || ''}
                  onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                  className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="输入你的答案..."
                />
              )}
            </div>
          ))}
          <button onClick={handleSubmit}
            className="w-full py-4 bg-brand-600 text-white font-bold rounded-xl text-lg hover:bg-brand-700 transition-colors">
            提交答案
          </button>
        </div>
      )}

      {!submitted && section === 'writing' && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <p className="text-sm text-gray-700 mb-4 whitespace-pre-wrap">{writingPrompt}</p>
          <textarea
            className="w-full h-80 p-4 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="在这里写你的作文..."
          />
          <button onClick={handleSubmit}
            className="w-full py-4 bg-brand-600 text-white font-bold rounded-xl text-lg hover:bg-brand-700 transition-colors mt-4">
            提交作文
          </button>
        </div>
      )}

      {submitted && (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <div className="text-6xl mb-4">{section === 'writing' ? '📝' : '✅'}</div>
          <h2 className="text-2xl font-bold mb-2">完成！</h2>
          {score !== null && (
            <>
              <div className="text-5xl font-bold text-brand-600 mb-2">{score}</div>
              <p className="text-sm text-gray-500 mb-2">预估雅思 {section === 'listening' ? '听力' : '阅读'}分数</p>
              <p className="text-xs text-gray-400 mb-6">答对 {answers ? Object.entries(answers).filter(([id, ans]) => {
                const q = questions.find(qq => qq.id === id);
                return q && ans.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim();
              }).length : 0} / {totalPoints} 分</p>
            </>
          )}
          {section === 'writing' && <p className="text-gray-500 mb-6">作文已提交</p>}
          <button onClick={nextSection}
            className="px-8 py-3 bg-brand-600 text-white rounded-xl font-medium hover:bg-brand-700 transition-colors">
            {section === 'writing' ? '返回首页' : '下一部分'}
          </button>
        </div>
      )}
    </div>
  );
}
