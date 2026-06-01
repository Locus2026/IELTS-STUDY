'use client';

import { useUserStore } from '@/stores/user-store';
import { useProgressStore } from '@/stores/progress-store';
import { useIsHydrated } from '@/providers/providers';
import { Trophy, Clock, BookOpen, Flame } from 'lucide-react';

export default function ProgressPage() {
  const hydrated = useIsHydrated();
  const user = useUserStore((s) => s);
  const progress = useProgressStore((s) => s);

  if (!hydrated) return <div className="p-8"><div className="animate-pulse h-64 bg-gray-200 rounded-2xl" /></div>;

  const totalLessons = Object.values(progress.lessons).filter((l) => l.completed).length;
  const skills = [
    { key: 'vocabulary' as const, label: '词汇' },
    { key: 'grammar' as const, label: '语法' },
    { key: 'listening' as const, label: '听力' },
    { key: 'reading' as const, label: '阅读' },
    { key: 'writing' as const, label: '写作' },
    { key: 'speaking' as const, label: '口语' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-6 pb-20">
      <h1 className="text-2xl font-bold mb-6">学习进度</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { icon: Flame, label: '连续打卡', value: `${user.streak}天`, color: 'text-orange-500' },
          { icon: Trophy, label: '总XP', value: String(user.totalXP), color: 'text-yellow-500' },
          { icon: BookOpen, label: '完成课程', value: `${totalLessons}节`, color: 'text-blue-500' },
          { icon: Clock, label: '学习时长', value: `${Math.floor(user.totalStudyMinutes / 60)}h`, color: 'text-green-500' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
              <Icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">技能分数</h2>
        <div className="space-y-3">
          {skills.map((s) => (
            <div key={s.key} className="flex items-center gap-3">
              <span className="w-12 text-sm text-gray-500">{s.label}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-3">
                <div className="h-3 rounded-full bg-brand-500 transition-all" style={{ width: `${progress.skillScores[s.key]}%` }} />
              </div>
              <span className="w-10 text-sm text-right font-medium">{progress.skillScores[s.key]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-semibold text-lg mb-4">最近活动</h2>
        {Object.keys(progress.dailyActivity).length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">还没有学习记录，完成第一节课开始追踪！</p>
        ) : (
          <div className="space-y-2">
            {Object.entries(progress.dailyActivity)
              .sort((a, b) => b[0].localeCompare(a[0]))
              .slice(0, 14)
              .map(([date, activity]) => (
                <div key={date} className="flex items-center gap-4 text-sm py-2 border-b border-gray-50">
                  <span className="text-gray-400 w-24">{date}</span>
                  <span className="text-gray-600">{activity.studyMinutes}分钟</span>
                  <span className="text-gray-400">{activity.lessonsCompleted}课 {activity.exercisesCompleted}练习</span>
                  <span className="text-brand-600 font-medium">{activity.xpEarned}XP</span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
