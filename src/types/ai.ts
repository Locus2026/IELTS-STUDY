export interface WritingFeedback {
  bandScore: number;
  subScores: {
    taskResponse: number;
    coherenceAndCohesion: number;
    lexicalResource: number;
    grammaticalRangeAndAccuracy: number;
  };
  overallComment: string;
  suggestions: WritingSuggestion[];
}

export interface WritingSuggestion {
  type: 'grammar' | 'vocabulary' | 'coherence' | 'task-response';
  originalText: string;
  correctedText: string;
  explanation: string;
}

export interface SpeakingFeedback {
  overallBand: number;
  subScores: {
    fluencyAndCoherence: number;
    pronunciation: number;
    lexicalResource: number;
    grammaticalRangeAndAccuracy: number;
  };
  overallComment: string;
  transcript: string;
  tips: SpeakingTip[];
}

export interface SpeakingTip {
  category: 'fluency' | 'pronunciation' | 'vocabulary' | 'grammar';
  advice: string;
  example: string;
}
