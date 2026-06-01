import { getToday, daysBetween } from './utils';

export function updateStreak(lastActiveDate: string, currentStreak: number): { streak: number; longestStreak: number } {
  const today = getToday();
  if (!lastActiveDate) {
    return { streak: 1, longestStreak: 1 };
  }
  if (lastActiveDate === today) {
    return { streak: currentStreak, longestStreak: currentStreak };
  }
  const diff = daysBetween(today, lastActiveDate);
  if (diff === 1) {
    return { streak: currentStreak + 1, longestStreak: currentStreak + 1 };
  }
  return { streak: 1, longestStreak: currentStreak };
}
