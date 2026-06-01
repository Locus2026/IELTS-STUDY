'use client';

import { useState, useMemo } from 'react';
import { useUserStore } from '@/stores/user-store';
import { useProgressStore } from '@/stores/progress-store';
import { useIsHydrated } from '@/providers/providers';
import { CEFR_LABELS } from '@/lib/cefr';
import { getToday } from '@/lib/utils';
import { FeishuSettings } from '@/components/feishu/feishu-settings';
import { AIKeySettings } from '@/components/ai-key-settings';
import Link from 'next/link';
import { Flame, Trophy, Calendar, CheckCircle2, Circle, Sparkles, ArrowRight, BookOpen, Library, PenLine, Mic, FileText, BookMarked } from 'lucide-react';

// Daily tasks generated based on user CEFR level
function generateDailyTasks(cefr: string) {
  const levelMap: Record<string, { vocab: number; grammar: string; practice: string }> = {
    'A0': { vocab: 10, grammar: 'Be 动词 (am/is/are)', practice: '听力: 数字听写' },
    'A1': { vocab: 10, grammar: '一般现在时', practice: '听力: Section 1 表格填空' },
    'A2': { vocab: 10, grammar: '比较级与最高级', practice: '阅读: T/F/NG 判断' },
    'B1': { vocab: 8, grammar: '现在完成时', practice: '写作: PEEL 段落练习' },
    'B2': { vocab: 8, grammar: '被动语态', practice: '写作: Task 2 议论文' },
    'C1': { vocab: 5, grammar: '高分搭配运用', practice: '模考: 全真模拟' },
  };
  const cfg = levelMap[cefr] || levelMap['A1'];
  return [
    { id: 'vocab', label: `学习 ${cfg.vocab} 个新词汇`, icon: Library, href: '/vocab' },
    { id: 'grammar', label: `语法: ${cfg.grammar}`, icon: BookMarked, href: '/grammar' },
    { id: 'practice', label: cfg.practice, icon: PenLine, href: '/practice' },
    { id: 'speaking', label: '口语: 自述一段 1 分钟回答并录音', icon: Mic, href: '/practice/speaking' },
    { id: 'review', label: '复习昨日已学词汇', icon: BookOpen, href: '/vocab' },
  ];
}

export default function DashboardPage() {
  const hydrated = useIsHydrated();
  const user = useUserStore((s) => s);
  const progress = useProgressStore((s) => s);
  const updateStreak = useUserStore((s) => s.updateStreakIfNewDay);

  const today = getToday();
  const cefr = user.placementTest?.estimatedCEFR || 'A1';
  const ieltsEstimate = user.placementTest?.estimatedIELTS;

  const dailyTasks = useMemo(() => generateDailyTasks(cefr), [cefr]);

  // Check-in state: stored in localStorage under 'daily-checkins'
  const [checkedIn, setCheckedIn] = useState(() => {
    if (typeof window === 'undefined') return false;
    const checkins = JSON.parse(localStorage.getItem('daily-checkins') || '{}');
    return !!checkins[today];
  });

  const [taskDone, setTaskDone] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return {};
    const saved = JSON.parse(localStorage.getItem(`daily-tasks-${today}`) || '{}');
    return saved;
  });

  const allTasksDone = dailyTasks.every(t => taskDone[t.id]);
  const doneCount = dailyTasks.filter(t => taskDone[t.id]).length;

  const toggleTask = (id: string) => {
    const next = { ...taskDone, [id]: !taskDone[id] };
    setTaskDone(next);
    localStorage.setItem(`daily-tasks-${today}`, JSON.stringify(next));
  };

  const handleCheckIn = async () => {
    if (!allTasksDone) return;
    const checkins = JSON.parse(localStorage.getItem('daily-checkins') || '{}');
    checkins[today] = true;
    localStorage.setItem('daily-checkins', JSON.stringify(checkins));
    setCheckedIn(true);
    updateStreak();

    // Send to Feishu if configured
    const webhook = localStorage.getItem('feishu-webhook');
    if (webhook) {
      const newStreak = checkins[today] ? user.streak + 1 : 1;
      fetch('/api/feishu/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          webhookUrl: webhook,
          title: '🎉 学习打卡成功！',
          content: `**${user.nickname}** 刚刚完成了今日学习打卡！\n\n🔥 连续打卡：**${newStreak}** 天\n📚 词汇：已掌握 ${vocabMasteredCount} 个\n🎯 目标分数：${user.targetIELTSScore} 分\n\n> 每天进步一点点，雅思高分近在眼前 💪`,
          color: 'green',
        }),
      }).catch(() => {});
    }
  };

  const vocabMasteredCount = useProgressStore((s) => s.vocabMastered.length);

  // Last 7 days for mini calendar
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().slice(0, 10);
  });

  const checkinData = useMemo(() => {
    if (typeof window === 'undefined') return {};
    return JSON.parse(localStorage.getItem('daily-checkins') || '{}');
  }, [checkedIn]);

  if (!hydrated) {
    return <div className="p-8"><div className="animate-pulse space-y-4"><div className="h-8 bg-gray-200 rounded w-1/3" /><div className="h-48 bg-gray-200 rounded" /></div></div>;
  }

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto pb-20 lg:pb-6">
      {/* Welcome + Streak */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl p-6 text-white mb-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold">
              {new Date().getHours() < 12 ? '早上好' : new Date().getHours() < 18 ? '下午好' : '晚上好'}，{user.nickname}！
            </h1>
            <p className="mt-2 text-brand-100 text-sm">
              {cefr && `当前 ${CEFR_LABELS[cefr].label} (${cefr}) · 目标 ${user.targetIELTSScore} 分`}
              {!cefr && '完成定级测试，获取专属每日学习计划'}
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="text-center">
              <div className="text-3xl font-bold">{user.streak}</div>
              <div className="text-brand-200 text-xs">连续天数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{user.totalXP}</div>
              <div className="text-brand-200 text-xs">总 XP</div>
            </div>
          </div>
        </div>
        {/* Mini week calendar */}
        <div className="mt-4 flex items-center gap-1.5">
          {last7Days.map(d => {
            const done = checkinData[d];
            const isToday = d === today;
            return (
              <div key={d} className={`flex-1 text-center rounded-lg py-1.5 text-xs transition-all ${
                done ? 'bg-white/30 text-white font-medium' :
                isToday ? 'bg-white/20 text-white ring-1 ring-white/50' :
                'bg-white/5 text-white/40'
              }`}>
                <div>{['日','一','二','三','四','五','六'][new Date(d).getDay()]}</div>
                <div className="text-[10px]">{d.slice(5)}</div>
                {done && <div className="text-[10px]">✅</div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Tasks Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-600" />
            今日任务
            <span className="text-xs text-gray-400 font-normal">({today})</span>
          </h2>
          <span className="text-sm text-gray-400">{doneCount}/{dailyTasks.length} 完成</span>
        </div>

        <div className="space-y-2 mb-6">
          {dailyTasks.map(task => {
            const done = taskDone[task.id];
            const Icon = task.icon;
            return (
              <div key={task.id}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  done ? 'border-green-200 bg-green-50/50' : 'border-gray-100 hover:border-gray-200'
                }`}>
                <button onClick={() => toggleTask(task.id)} className="flex-shrink-0">
                  {done ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5 text-gray-300" />}
                </button>
                <Icon className={`w-4 h-4 ${done ? 'text-green-500' : 'text-gray-400'}`} />
                <span className={`flex-1 text-sm ${done ? 'text-green-700 line-through' : 'text-gray-700'}`}>{task.label}</span>
                <Link href={task.href} className="text-xs text-brand-600 hover:underline flex items-center gap-0.5">
                  去完成 <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Check-in button */}
        {checkedIn ? (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-white text-center">
            <div className="flex items-center justify-center gap-2 text-lg font-bold">
              <Sparkles className="w-5 h-5" /> 今日已打卡！
            </div>
            <p className="text-sm text-green-100 mt-1">连续 {user.streak} 天 · 明天继续加油 🔥</p>
          </div>
        ) : (
          <button
            onClick={handleCheckIn}
            disabled={!allTasksDone}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              allTasksDone
                ? 'bg-gradient-to-r from-brand-600 to-brand-700 text-white hover:from-brand-700 hover:to-brand-800 shadow-lg'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}>
            {allTasksDone ? '✅ 完成打卡 (+10XP)' : `还差 ${dailyTasks.length - doneCount} 项任务，完成后打卡`}
          </button>
        )}
      </div>

      {/* Feishu Settings */}
      <FeishuSettings />
      <div className="mt-4"><AIKeySettings /></div>

      {/* Quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
        {[
          { href: '/vocab', icon: Library, label: '词汇', color: 'bg-blue-50 text-blue-600' },
          { href: '/grammar', icon: BookMarked, label: '语法', color: 'bg-purple-50 text-purple-600' },
          { href: '/practice', icon: PenLine, label: '专项', color: 'bg-orange-50 text-orange-600' },
          { href: '/guide', icon: FileText, label: '指南', color: 'bg-green-50 text-green-600' },
        ].map(item => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}
              className="bg-white rounded-2xl border border-gray-100 p-4 text-center hover:border-brand-200 hover:shadow-sm transition-all">
              <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
