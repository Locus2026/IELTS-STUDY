export type CEFRLevel = 'A0' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
export type Skill = 'vocabulary' | 'grammar' | 'listening' | 'reading' | 'writing' | 'speaking';
export type Level = 'beginner' | 'foundation' | 'ielts-prep';
export type LessonType = 'vocab' | 'grammar' | 'reading' | 'listening' | 'speaking' | 'writing' | 'culture' | 'review' | 'mixed';

export interface UserProfile {
  id: string;
  nickname: string;
  createdAt: string;
  hasCompletedOnboarding: boolean;
  placementTest: PlacementTestResult | null;
  targetIELTSScore: number;
  weeklyStudyGoalMinutes: number;
  streak: number;
  longestStreak: number;
  lastActiveDate: string;
  totalXP: number;
  totalStudyMinutes: number;
  soundEnabled: boolean;
  dailyReminderEnabled: boolean;
}

export interface PlacementTestResult {
  completedAt: string;
  vocabScore: number;
  grammarScore: number;
  listeningScore: number;
  overallScore: number;
  estimatedCEFR: CEFRLevel;
  estimatedIELTS: number;
  strengths: Skill[];
  weaknesses: Skill[];
  recommendedStartingLevel: Level;
}

export function createDefaultUser(): UserProfile {
  return {
    id: crypto.randomUUID(),
    nickname: '学习者',
    createdAt: new Date().toISOString(),
    hasCompletedOnboarding: false,
    placementTest: null,
    targetIELTSScore: 6.5,
    weeklyStudyGoalMinutes: 210,
    streak: 0,
    longestStreak: 0,
    lastActiveDate: '',
    totalXP: 0,
    totalStudyMinutes: 0,
    soundEnabled: true,
    dailyReminderEnabled: false,
  };
}
