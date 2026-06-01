import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile, PlacementTestResult } from '@/types/user';
import { createDefaultUser } from '@/types/user';
import { getToday } from '@/lib/utils';
import { updateStreak } from '@/lib/streak-calculator';

interface UserStore extends UserProfile {
  completePlacementTest: (result: PlacementTestResult) => void;
  completeOnboarding: () => void;
  updateStreakIfNewDay: () => void;
  addXP: (amount: number) => void;
  addStudyMinutes: (minutes: number) => void;
  setNickname: (name: string) => void;
  hydrate: () => void;
  _hydrated: boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      ...createDefaultUser(),
      _hydrated: false,

      completePlacementTest: (result: PlacementTestResult) =>
        set({ placementTest: result }),

      completeOnboarding: () =>
        set({ hasCompletedOnboarding: true }),

      updateStreakIfNewDay: () => {
        const { lastActiveDate, streak } = get();
        const today = getToday();
        if (lastActiveDate === today) return;
        const { streak: newStreak, longestStreak } = updateStreak(lastActiveDate, streak);
        set({
          lastActiveDate: today,
          streak: Math.max(newStreak, streak || 1),
          longestStreak: Math.max(longestStreak, get().longestStreak),
        });
      },

      addXP: (amount: number) =>
        set((s) => ({ totalXP: s.totalXP + amount })),

      addStudyMinutes: (minutes: number) =>
        set((s) => ({ totalStudyMinutes: s.totalStudyMinutes + minutes })),

      setNickname: (name: string) =>
        set({ nickname: name }),

      hydrate: () => set({ _hydrated: true }),
    }),
    {
      name: 'ielts-user',
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrate();
      },
    }
  )
);
