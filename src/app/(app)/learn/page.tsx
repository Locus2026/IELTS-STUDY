'use client';

import { CURRICULUM } from '@/content/curriculum';
import { useProgressStore } from '@/stores/progress-store';
import { useIsHydrated } from '@/providers/providers';
import Link from 'next/link';

export default function LearnPage() {
  const hydrated = useIsHydrated();
  const progress = useProgressStore((s) => s);

  if (!hydrated) return <div className="p-8"><div className="animate-pulse h-48 bg-gray-200 rounded-2xl" /></div>;

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-6 pb-20">
      <h1 className="text-2xl font-bold mb-2">课程中心</h1>
      <p className="text-gray-500 mb-6">从零开始，三个级别循序渐进</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CURRICULUM.levels.map((level) => {
          const totalLessons = level.units.reduce((sum, u) => sum + u.lessons.length, 0);
          const completedLessons = level.units.reduce((sum, u) =>
            sum + u.lessons.filter((l) => progress.lessons[l.id]?.completed).length, 0
          );
          const pct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

          return (
            <Link
              key={level.id}
              href={`/learn/${level.id}`}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-brand-200 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-3">{level.icon}</div>
              <h3 className="font-semibold text-lg">{level.title}</h3>
              <p className="text-sm text-gray-400 mb-2">{level.subtitle} · 预估雅思 {level.targetIELTS}</p>
              <p className="text-sm text-gray-500 mb-4">{level.description}</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div className="bg-brand-500 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs text-gray-400">{pct}%</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">{level.units.length} 个单元 · {totalLessons} 节课</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
