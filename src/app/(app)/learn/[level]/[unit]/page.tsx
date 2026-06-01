'use client';

import { useParams } from 'next/navigation';
import { CURRICULUM } from '@/content/curriculum';
import { useProgressStore } from '@/stores/progress-store';
import { useIsHydrated } from '@/providers/providers';
import Link from 'next/link';
import { CheckCircle, Play } from 'lucide-react';

export default function UnitPage() {
  const params = useParams();
  const hydrated = useIsHydrated();
  const progress = useProgressStore((s) => s);
  const level = CURRICULUM.levels.find((l) => l.id === params.level);
  const unit = level?.units.find((u) => u.id === params.unit);

  if (!hydrated) return <div className="p-8"><div className="animate-pulse h-48 bg-gray-200 rounded-2xl" /></div>;
  if (!unit) return <div className="p-8 text-center text-gray-500">单元未找到</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 lg:p-6 pb-20">
      <h1 className="text-2xl font-bold mb-1">{unit.title}</h1>
      <p className="text-gray-500 text-sm mb-6">{unit.subtitle} · {unit.lessons.length} 节课</p>

      <div className="space-y-3">
        {unit.lessons.map((lesson) => {
          const done = progress.lessons[lesson.id]?.completed;
          return (
            <Link
              key={lesson.id}
              href={`/learn/${level!.id}/${unit.id}/${lesson.id}`}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                done ? 'bg-green-50 border-green-100' : 'bg-white border-gray-100 hover:border-brand-200'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                done ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {done ? <CheckCircle className="w-5 h-5 text-green-600" /> : <Play className="w-4 h-4 text-gray-400" />}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{lesson.title}</h4>
                <p className="text-xs text-gray-400">{lesson.description} · {lesson.durationMinutes}分钟 · {lesson.xpReward}XP</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                lesson.type === 'vocab' ? 'bg-blue-50 text-blue-600' :
                lesson.type === 'grammar' ? 'bg-purple-50 text-purple-600' :
                lesson.type === 'listening' ? 'bg-cyan-50 text-cyan-600' :
                lesson.type === 'writing' ? 'bg-orange-50 text-orange-600' :
                lesson.type === 'speaking' ? 'bg-pink-50 text-pink-600' :
                'bg-gray-50 text-gray-500'
              }`}>
                {{vocab:'词汇', grammar:'语法', listening:'听力', reading:'阅读', writing:'写作', speaking:'口语', review:'复习', culture:'文化', mixed:'综合'}[lesson.type]}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
