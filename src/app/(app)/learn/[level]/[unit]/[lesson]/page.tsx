'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CURRICULUM } from '@/content/curriculum';
import { getLessonContent } from '@/content/lesson-contents';
import type { LessonContent, PracticeQuestion } from '@/types/lesson-content';
import { useProgressStore } from '@/stores/progress-store';
import { useUserStore } from '@/stores/user-store';
import { useIsHydrated } from '@/providers/providers';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Target, BookOpen, Lightbulb, AlertTriangle, PenLine, BarChart3 } from 'lucide-react';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const hydrated = useIsHydrated();
  const markLessonComplete = useProgressStore((s) => s.markLessonComplete);
  const addXP = useUserStore((s) => s.addXP);
  const addStudyMinutes = useUserStore((s) => s.addStudyMinutes);

  const level = CURRICULUM.levels.find((l) => l.id === (params.level as string));
  const unit = level?.units.find((u) => u.id === (params.unit as string));
  const lesson = unit?.lessons.find((l) => l.id === (params.lesson as string));
  const progress = useProgressStore((s) => s.lessons[params.lesson as string]);

  const content = getLessonContent(params.lesson as string);
  const [done, setDone] = useState(false);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, string>>({});
  const [practiceSubmitted, setPracticeSubmitted] = useState<Record<string, boolean>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    objectives: true, knowledge: true, example: true, practice: true, summary: false,
  });

  useEffect(() => {
    if (progress?.completed) setDone(true);
  }, [progress]);

  if (!hydrated) return <div className="p-8"><div className="animate-pulse h-96 bg-gray-200 rounded-2xl" /></div>;
  if (!lesson) return <div className="p-8 text-center text-gray-500">课程未找到</div>;

  const handleComplete = () => {
    markLessonComplete(lesson.id, lesson.xpReward, lesson.durationMinutes * 60);
    addXP(lesson.xpReward);
    addStudyMinutes(lesson.durationMinutes);
    setDone(true);
  };

  const allLessons = unit!.lessons;
  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const nextUnit = level!.units.find((u) => u.order === unit!.order + 1);
  const totalQuestions = content.practice.reduce((s, p) => s + p.questions.length, 0);
  const answeredCount = Object.keys(practiceSubmitted).length;
  const correctCount = Object.entries(practiceSubmitted).filter(([id, _]) => {
    for (const block of content.practice) {
      const q = block.questions.find((qq) => qq.id === id);
      if (q) return practiceAnswers[id]?.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
    }
    return false;
  }).length;

  const typeLabel: Record<string, string> = { vocab: '词汇', grammar: '语法', listening: '听力', reading: '阅读', writing: '写作', speaking: '口语', review: '复习', mixed: '综合', culture: '文化' };
  const typeColor: Record<string, string> = { vocab: 'bg-blue-50 text-blue-600', grammar: 'bg-purple-50 text-purple-600', listening: 'bg-cyan-50 text-cyan-600', reading: 'bg-emerald-50 text-emerald-600', writing: 'bg-orange-50 text-orange-600', speaking: 'bg-pink-50 text-pink-600', review: 'bg-gray-50 text-gray-600', mixed: 'bg-amber-50 text-amber-600', culture: 'bg-indigo-50 text-indigo-600' };

  return (
    <div className="max-w-3xl mx-auto p-4 lg:p-6 pb-20">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
        <Link href="/learn" className="hover:text-brand-600">课程</Link>
        <span>/</span>
        <Link href={`/learn/${level!.id}`} className="hover:text-brand-600">{level!.title}</Link>
        <span>/</span>
        <span>{unit!.title}</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs px-2 py-0.5 rounded-full ${typeColor[lesson.type]}`}>{typeLabel[lesson.type]}</span>
          <span className="text-xs text-gray-400">{lesson.durationMinutes}分钟 · {lesson.xpReward}XP</span>
        </div>
        <h1 className="text-xl font-bold">{lesson.title}</h1>
      </div>

      {/* ── ① OBJECTIVES ── */}
      <SectionBlock icon={<Target className="w-4 h-4 text-green-600" />} title="本课目标" id="objectives"
        expanded={expandedSections.objectives} onToggle={() => setExpandedSections(s => ({...s, objectives: !s.objectives}))}>
        <ul className="space-y-1">
          {content.objectives.map((o, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-green-500 mt-1 flex-shrink-0">✓</span> {o}
            </li>
          ))}
        </ul>
      </SectionBlock>

      {/* ── ② KNOWLEDGE ── */}
      <SectionBlock icon={<BookOpen className="w-4 h-4 text-brand-600" />} title="知识点讲解" id="knowledge"
        expanded={expandedSections.knowledge} onToggle={() => setExpandedSections(s => ({...s, knowledge: !s.knowledge}))}>
        <div className="space-y-6">
          {content.knowledge.map((k, i) => (
            <div key={i}>
              <h3 className="font-semibold text-base text-gray-800 mb-2">{k.title}</h3>
              <div className="text-sm text-gray-700 leading-relaxed prose-p:mb-2"
                dangerouslySetInnerHTML={{ __html: mdToHtml(k.body) }} />
              {k.tip && (
                <div className="mt-3 flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm">
                  <Lightbulb className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-blue-700">{k.tip}</span>
                </div>
              )}
              {k.warning && (
                <div className="mt-2 flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-lg p-3 text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-amber-700">{k.warning}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* ── ③ EXAMPLE ── */}
      {content.example.question && (
        <SectionBlock icon={<Lightbulb className="w-4 h-4 text-yellow-600" />} title="真题示例" id="example"
          expanded={expandedSections.example} onToggle={() => setExpandedSections(s => ({...s, example: !s.example}))}>
          {content.example.intro && <p className="text-sm text-gray-600 mb-3">{content.example.intro}</p>}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-3">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">{content.example.question}</pre>
          </div>
          {content.example.highlights && content.example.highlights.length > 0 && (
            <div className="space-y-2 mb-3">
              {content.example.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <span className="bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded text-xs font-mono flex-shrink-0">{h.text}</span>
                  <span className="text-gray-500">{h.note}</span>
                </div>
              ))}
            </div>
          )}
          {content.example.explanation && (
            <p className="text-sm text-gray-600 bg-brand-50 rounded-lg p-3">{content.example.explanation}</p>
          )}
        </SectionBlock>
      )}

      {/* ── ④ PRACTICE ── */}
      {content.practice.length > 0 && (
        <SectionBlock icon={<PenLine className="w-4 h-4 text-red-600" />} title="随堂练习" id="practice"
          expanded={expandedSections.practice} onToggle={() => setExpandedSections(s => ({...s, practice: !s.practice}))}
          badge={totalQuestions > 0 ? `${answeredCount}/${totalQuestions}` : undefined}>
          <div className="space-y-6">
            {content.practice.map((block, bi) => (
              <div key={bi}>
                <p className="text-sm font-medium text-gray-600 mb-3">{block.instruction}</p>
                <div className="space-y-3">
                  {block.questions.map((q) => (
                    <PracticeItem key={q.id} q={q} answers={practiceAnswers} submitted={practiceSubmitted}
                      onAnswer={(id, a) => setPracticeAnswers(prev => ({...prev, [id]: a}))}
                      onSubmit={(id) => setPracticeSubmitted(prev => ({...prev, [id]: true}))} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>
      )}

      {/* ── ⑤ SUMMARY ── */}
      <SectionBlock icon={<CheckCircle className="w-4 h-4 text-green-600" />} title="本课小结" id="summary"
        expanded={expandedSections.summary} onToggle={() => setExpandedSections(s => ({...s, summary: !s.summary}))}>
        <ul className="space-y-1">
          {content.summary.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-brand-500 mt-1 flex-shrink-0">•</span> {s}
            </li>
          ))}
        </ul>
      </SectionBlock>

      {/* ── ⑥ VOCAB REVIEW ── */}
      {content.vocabReview && content.vocabReview.length > 0 && (
        <SectionBlock icon={<BarChart3 className="w-4 h-4 text-purple-600" />} title="本课词汇" id="vocab"
          expanded={false} onToggle={() => setExpandedSections(s => ({...s, vocab: !s.vocab}))}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b-2 border-gray-200">
                <th className="text-left px-2 py-1.5 text-gray-500">单词</th>
                <th className="text-left px-2 py-1.5 text-gray-500">音标</th>
                <th className="text-left px-2 py-1.5 text-gray-500">中文</th>
                <th className="text-left px-2 py-1.5 text-gray-500">例句</th>
              </tr></thead>
              <tbody>
                {content.vocabReview.map((v, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="px-2 py-1.5 font-medium">{v.word}</td>
                    <td className="px-2 py-1.5 text-gray-400">{v.phonetic}</td>
                    <td className="px-2 py-1.5">{v.chinese}</td>
                    <td className="px-2 py-1.5 text-gray-500 text-xs">{v.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionBlock>
      )}

      {/* ── COMPLETE BUTTON ── */}
      <div className="mt-8">
        {!done ? (
          <button onClick={handleComplete}
            className="w-full py-4 bg-green-600 text-white font-bold rounded-xl text-lg hover:bg-green-700 transition-colors shadow-lg flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5" /> 完成学习（{lesson.xpReward}XP）
          </button>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <p className="text-green-700 font-medium flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" /> 已完成 ✓
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-4 flex items-center justify-between text-sm">
          {currentIndex > 0 ? (
            <Link href={`/learn/${level!.id}/${unit!.id}/${allLessons[currentIndex - 1].id}`} className="text-brand-600 hover:underline">← 上一课</Link>
          ) : <span />}
          {nextLesson ? (
            <Link href={`/learn/${level!.id}/${unit!.id}/${nextLesson.id}`} className="text-brand-600 hover:underline flex items-center gap-1">
              下一课 <ArrowRight className="w-3 h-3" />
            </Link>
          ) : nextUnit ? (
            <Link href={`/learn/${level!.id}/${nextUnit.id}`} className="text-brand-600 hover:underline flex items-center gap-1">
              下一个单元 <ArrowRight className="w-3 h-3" />
            </Link>
          ) : (
            <Link href="/learn" className="text-brand-600 hover:underline">返回课程列表</Link>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Helper: Practice Question Item ──
function PracticeItem({ q, answers, submitted, onAnswer, onSubmit }: {
  q: PracticeQuestion; answers: Record<string, string>; submitted: Record<string, boolean>;
  onAnswer: (id: string, a: string) => void; onSubmit: (id: string) => void;
}) {
  const isSubmitted = submitted[q.id];
  const userAnswer = answers[q.id] || '';
  const isCorrect = userAnswer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

  return (
    <div className={`border rounded-xl p-4 transition-all ${isSubmitted ? (isCorrect ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50') : 'border-gray-100 bg-white'}`}>
      <p className="text-sm font-medium text-gray-800 mb-2">{q.stem}</p>

      {q.options ? (
        <div className="space-y-1.5 mb-3">
          {q.options.map((opt, i) => {
            const selected = userAnswer === opt;
            const isCorrectOpt = isSubmitted && opt === q.correctAnswer;
            return (
              <button key={i} disabled={isSubmitted}
                onClick={() => { onAnswer(q.id, opt); if (!isSubmitted) onSubmit(q.id); }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm border transition-all ${
                  isSubmitted && isCorrectOpt ? 'border-green-400 bg-green-100 text-green-800' :
                  isSubmitted && selected && !isCorrect ? 'border-red-300 bg-red-100 text-red-700' :
                  selected ? 'border-brand-400 bg-brand-50 text-brand-700' :
                  'border-gray-100 hover:border-gray-300 text-gray-600'
                }`}>
                <span className="text-xs text-gray-400 mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="flex gap-2 mb-3">
          <input type="text" value={userAnswer} disabled={isSubmitted}
            onChange={(e) => onAnswer(q.id, e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !isSubmitted && userAnswer.trim()) onSubmit(q.id); }}
            className={`flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 ${
              isSubmitted ? (isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50') : 'border-gray-200'
            }`}
            placeholder="输入你的答案..." />
          {!isSubmitted && (
            <button onClick={() => userAnswer.trim() && onSubmit(q.id)}
              className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm hover:bg-brand-700">确定</button>
          )}
        </div>
      )}

      {isSubmitted && (
        <div className={`text-xs p-2 rounded-lg ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {isCorrect ? '✅ 正确！' : `❌ 正确答案：${q.correctAnswer}`} {q.explanation}
        </div>
      )}
      {!isSubmitted && q.hint && (
        <p className="text-xs text-gray-400">💡 提示：{q.hint}</p>
      )}
    </div>
  );
}

// ── Helper: Collapsible Section ──
function SectionBlock({ icon, title, id, expanded, onToggle, badge, children }: {
  icon: React.ReactNode; title: string; id: string; expanded: boolean; onToggle: () => void;
  badge?: string; children: React.ReactNode;
}) {
  return (
    <div id={id} className="bg-white rounded-2xl border border-gray-100 mb-4 overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-gray-50 transition-colors">
        {icon}
        <span className="font-semibold text-sm flex-1">{title}</span>
        {badge && <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{badge}</span>}
        <span className="text-gray-300 text-sm">{expanded ? '收起' : '展开'}</span>
      </button>
      {expanded && <div className="px-5 pb-5 border-t border-gray-50 pt-4">{children}</div>}
    </div>
  );
}

// ── Mini markdown renderer ──
function mdToHtml(md: string): string {
  return md
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-brand-700">$1</code>')
    .replace(/^### (.+)$/gm, '<h4 class="font-semibold mt-4 mb-2">$1</h4>')
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-3 border-brand-300 pl-3 py-1 my-2 text-gray-600 italic text-sm">$1</blockquote>')
    .replace(/\| (.+) \|/g, (match) => {
      if (match.includes('---')) return '';
      return '<tr>' + match.split('|').filter(c => c.trim()).map(c => `<td class="border border-gray-200 px-2 py-1 text-sm">${c.trim()}</td>`).join('') + '</tr>';
    })
    .replace(/\n\n/g, '</p><p class="text-sm text-gray-700 mb-2">')
    .replace(/^- (.+)$/gm, '<li class="text-sm text-gray-700 ml-4 list-disc">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="text-sm text-gray-700 ml-4 list-decimal">$2</li>')
    .replace(/^(\w[\w\s]*\n)-{2,}$/gm, '')
    .replace(/\n/g, '<br/>');
}
