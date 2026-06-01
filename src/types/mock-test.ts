export type TestSection = 'listening' | 'reading' | 'writing';

export interface MockTestDefinition {
  id: string;
  title: string;
  description: string;
  totalTimeMinutes: number;
  sections: MockTestSection[];
}

export interface MockTestSection {
  type: TestSection;
  title: string;
  timeMinutes: number;
  instructions: string;
  audioUrl?: string;
  passages?: ReadingPassage[];
  writingTask?: WritingTask;
  questions: TestQuestion[];
}

export interface TestQuestion {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'short-answer' | 'essay';
  stem: string;
  options?: string[];
  correctAnswer: string;
  acceptableAnswers?: string[];
  points: number;
}

export interface ReadingPassage {
  title: string;
  content: string;
  wordCount: number;
}

export interface WritingTask {
  taskNumber: 1 | 2;
  prompt: string;
  wordLimit: number;
}
