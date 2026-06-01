'use client';

import { useParams } from 'next/navigation';
import { CURRICULUM } from '@/content/curriculum';
import { useProgressStore } from '@/stores/progress-store';
import { useIsHydrated } from '@/providers/providers';
import Link from 'next/link';
import { CheckCircle, Lock } from 'lucide-react';

export default function LevelPage() {
  const params = useParams();
  const hydrated = useIsHydrated();
  const progress = useProgressStore((s) => s);
  const level = CURRICULUM.levels.find((l) => l.id === params.level);

  if (!hydrated) return <div className="p-8"><div className="animate-pulse h-48 bg-gray-200 rounded-2xl" /></div>;
  if (!level) return <div className="p-8 text-center text-gray-500">课程未找到</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-6 pb-20">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-3xl">{level.icon}</span>
        <div>
          <h1 className="text-2xl font-bold">{level.title}</h1>
          <p className="text-sm text-gray-500">目标 CEFR {level.targetCEFR} · 预估雅思 {level.targetIELTS}</p>
        </div>
      </div>
      <div className="space-y-4">
        {level.units.map((unit) => {
          const totalLessons = unit.lessons.length;
          const completedLessons = unit.lessons.filter((l) => progress.lessons[l.id]?.completed).length;
          const allDone = completedLessons === totalLessons;

          return (
            <Link
              key={unit.id}
              href={`/learn/${level.id}/${unit.id}`}
              className="block bg-white rounded-2xl border border-gray-100 p-5 hover:border-brand-200 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl">{unit.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold">{unit.title}</h3>
                  <p className="text-sm text-gray-500">{unit.subtitle}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    <span>{totalLessons} 节课</span>
                    <span>约 {unit.estimatedHours} 小时</span>
                    <span>目标 CEFR {unit.targetCEFR}</span>
                  </div>
                </div>
                {allDone ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : completedLessons > 0 ? (
                  <span className="text-xs text-brand-600 font-medium">{completedLessons}/{totalLessons}</span>
                ) : (
                  <span className="text-xs text-gray-400">待学习</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
