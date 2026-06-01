import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProgressData, LessonProgress, ExerciseAttempt, MockTestResult, DailyActivity } from '@/types/progress';
import type { Skill } from '@/types/user';
import { createDefaultProgress } from '@/types/progress';
import { getToday } from '@/lib/utils';

interface ProgressStore extends ProgressData {
  markLessonComplete: (lessonId: string, xpEarned: number, timeSpent: number) => void;
  recordExerciseAttempt: (attempt: ExerciseAttempt) => void;
  recordMockTest: (result: MockTestResult) => void;
  updateSkillScore: (skill: Skill, score: number) => void;
  addVocabMastered: (vocabId: string) => void;
  getLessonProgress: (lessonId: string) => LessonProgress | undefined;
  hydrate: () => void;
  _hydrated: boolean;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...createDefaultProgress(),
      _hydrated: false,

      markLessonComplete: (lessonId: string, xpEarned: number, timeSpent: number) => {
        const today = getToday();
        set((s) => {
          const daily = { ...s.dailyActivity };
          if (!daily[today]) {
            daily[today] = { date: today, studyMinutes: 0, lessonsCompleted: 0, exercisesCompleted: 0, xpEarned: 0 };
          }
          daily[today] = {
            ...daily[today],
            studyMinutes: daily[today].studyMinutes + Math.ceil(timeSpent / 60),
            lessonsCompleted: daily[today].lessonsCompleted + 1,
            xpEarned: daily[today].xpEarned + xpEarned,
          };
          return {
            lessons: {
              ...s.lessons,
              [lessonId]: { lessonId, completed: true, completedAt: new Date().toISOString(), timeSpentSeconds: timeSpent, xpEarned },
            },
            dailyActivity: daily,
          };
        });
      },

      recordExerciseAttempt: (attempt: ExerciseAttempt) => {
        const today = getToday();
        set((s) => {
          const existing = s.exercises[attempt.exerciseId] || [];
          const daily = { ...s.dailyActivity };
          if (!daily[today]) {
            daily[today] = { date: today, studyMinutes: 0, lessonsCompleted: 0, exercisesCompleted: 0, xpEarned: 0 };
          }
          daily[today] = {
            ...daily[today],
            studyMinutes: daily[today].studyMinutes + Math.ceil(attempt.timeSpentSeconds / 60),
            exercisesCompleted: daily[today].exercisesCompleted + 1,
            xpEarned: daily[today].xpEarned + attempt.xpEarned,
          };
          return {
            exercises: { ...s.exercises, [attempt.exerciseId]: [...existing, attempt] },
            dailyActivity: daily,
          };
        });
      },

      recordMockTest: (result: MockTestResult) =>
        set((s) => ({ mockTests: { ...s.mockTests, [result.testId]: result } })),

      updateSkillScore: (skill: Skill, score: number) =>
        set((s) => ({ skillScores: { ...s.skillScores, [skill]: Math.min(100, Math.max(0, score)) } })),

      addVocabMastered: (vocabId: string) =>
        set((s) => ({ vocabMastered: s.vocabMastered.includes(vocabId) ? s.vocabMastered : [...s.vocabMastered, vocabId] })),

      getLessonProgress: (lessonId: string) => get().lessons[lessonId],

      hydrate: () => set({ _hydrated: true }),
    }),
    {
      name: 'ielts-progress',
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrate();
      },
    }
  )
);
