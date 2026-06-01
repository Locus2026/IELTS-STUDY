// Standard 6-step lesson structure
// Based on research of British Council, Magoosh, E2Language course design

export interface LessonContent {
  objectives: string[];           // ① 本课目标 — what you'll learn
  knowledge: KnowledgeBlock[];    // ② 知识点讲解 — core content
  example: ExampleBlock;          // ③ 真题示例 — real IELTS example
  practice: PracticeBlock[];      // ④ 随堂练习 — embedded exercises
  summary: string[];              // ⑤ 本课小结 — key takeaways
  vocabReview?: VocabReviewItem[]; // 词汇回顾
}

export interface KnowledgeBlock {
  title: string;
  body: string;         // Markdown text
  tip?: string;         // 技巧提示
  warning?: string;     // 常见错误提醒
}

export interface ExampleBlock {
  intro: string;
  question: string;     // The IELTS-style question
  options?: string[];   // For multiple choice
  correctAnswer?: string;
  explanation: string;  // Step-by-step explanation of the answer
  highlights?: { text: string; note: string }[]; // Key phrases/words to notice
}

export interface PracticeBlock {
  type: 'fill-blank' | 'multiple-choice' | 'match' | 'write' | 'speak';
  instruction: string;
  questions: PracticeQuestion[];
}

export interface PracticeQuestion {
  id: string;
  stem: string;
  options?: string[];
  correctAnswer: string;
  acceptableAnswers?: string[];
  explanation: string;
  hint?: string;
}

export interface VocabReviewItem {
  word: string;
  phonetic: string;
  chinese: string;
  example: string;
}
