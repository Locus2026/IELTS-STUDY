import type { Skill } from './user';

export type ExerciseType = 'fill-blank' | 'multiple-choice' | 'drag-match' | 'listen-type';

export interface ExerciseDefinition {
  id: string;
  type: ExerciseType;
  skill: Skill;
  difficulty: 1 | 2 | 3 | 4 | 5;
  instructions: string;
  prompt?: string;
  totalQuestions: number;
  xpPerQuestion: number;
  questions: ExerciseQuestion[];
}

export interface ExerciseQuestion {
  id: string;
  type: ExerciseType;
  content: FillBlankContent | MultipleChoiceContent | DragMatchContent | ListenTypeContent;
}

export interface FillBlankContent {
  kind: 'fill-blank';
  textBefore: string;
  textAfter: string;
  correctAnswer: string;
  acceptableAnswers: string[];
  hint?: string;
}

export interface MultipleChoiceContent {
  kind: 'multiple-choice';
  stem: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DragMatchContent {
  kind: 'drag-match';
  instruction: string;
  pairs: { left: string; right: string; id: string }[];
}

export interface ListenTypeContent {
  kind: 'listen-type';
  audioUrl: string;
  correctAnswer: string;
  acceptableAnswers: string[];
  hints: string[];
}
