import type { CEFRLevel, Level, LessonType, Skill } from './user';

export interface Curriculum {
  levels: CurriculumLevel[];
}

export interface CurriculumLevel {
  id: Level;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  targetCEFR: CEFRLevel;
  targetIELTS: string;
  units: CurriculumUnit[];
}

export interface CurriculumUnit {
  id: string;
  level: Level;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  estimatedHours: number;
  targetCEFR: CEFRLevel;
  skillsCovered: Skill[];
  prerequisiteUnitId: string | null;
  lessons: CurriculumLesson[];
}

export interface CurriculumLesson {
  id: string;
  unitId: string;
  order: number;
  title: string;
  description: string;
  type: LessonType;
  durationMinutes: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  content: string;
  exerciseIds: string[];
  vocabIds: string[];
  xpReward: number;
}

export interface VocabItem {
  id: string;
  word: string;
  chinese: string;
  partOfSpeech: string;
  phonetic: string;
  exampleSentence: string;
  exampleChinese: string;
  level: Level;
  unit: string;
  tags: string[];
}
