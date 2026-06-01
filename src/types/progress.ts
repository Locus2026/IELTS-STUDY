import type { Skill } from './user';

export interface ProgressData {
  lessons: Record<string, LessonProgress>;
  exercises: Record<string, ExerciseAttempt[]>;
  mockTests: Record<string, MockTestResult>;
  dailyActivity: Record<string, DailyActivity>;
  skillScores: Record<Skill, number>;
  vocabMastered: string[];
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt: string | null;
  timeSpentSeconds: number;
  xpEarned: number;
}

export interface ExerciseAttempt {
  attemptId: string;
  exerciseId: string;
  timestamp: string;
  score: number;
  timeSpentSeconds: number;
  xpEarned: number;
}

export interface DailyActivity {
  date: string;
  studyMinutes: number;
  lessonsCompleted: number;
  exercisesCompleted: number;
  xpEarned: number;
}

export interface MockTestResult {
  testId: string;
  completedAt: string;
  overallBand: number;
  sections: {
    listening: number | null;
    reading: number | null;
    writing: number | null;
    speaking: number | null;
  };
  answers: Record<string, string>;
}

export function createDefaultProgress(): ProgressData {
  return {
    lessons: {},
    exercises: {},
    mockTests: {},
    dailyActivity: {},
    skillScores: { vocabulary: 0, grammar: 0, listening: 0, reading: 0, writing: 0, speaking: 0 },
    vocabMastered: [],
  };
}
