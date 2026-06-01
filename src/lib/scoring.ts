import type { CEFRLevel, PlacementTestResult, Skill } from '@/types/user';

interface ScoreTable {
  vocab: number;
  grammar: number;
  listening: number;
}

const CEFR_THRESHOLDS: { cefr: CEFRLevel; minScore: number; ielts: number }[] = [
  { cefr: 'C1', minScore: 85, ielts: 7.5 },
  { cefr: 'B2', minScore: 70, ielts: 6.0 },
  { cefr: 'B1', minScore: 50, ielts: 4.5 },
  { cefr: 'A2', minScore: 30, ielts: 3.5 },
  { cefr: 'A1', minScore: 15, ielts: 2.5 },
  { cefr: 'A0', minScore: 0, ielts: 2.0 },
];

export function calculatePlacementResult(scores: ScoreTable): PlacementTestResult {
  const overall = Math.round((scores.vocab * 0.35 + scores.grammar * 0.35 + scores.listening * 0.3));

  let cefr: CEFRLevel = 'A0';
  let ielts = 2.0;
  for (const threshold of CEFR_THRESHOLDS) {
    if (overall >= threshold.minScore) {
      cefr = threshold.cefr;
      ielts = threshold.ielts;
      break;
    }
  }

  const strengths: Skill[] = [];
  const weaknesses: Skill[] = [];
  const skillMap: [number, Skill][] = [
    [scores.vocab, 'vocabulary'],
    [scores.grammar, 'grammar'],
    [scores.listening, 'listening'],
  ];
  skillMap.sort((a, b) => b[0] - a[0]);
  strengths.push(skillMap[0][1]);
  if (skillMap[0][0] >= 60) strengths.push(skillMap[1][1]);
  if (skillMap[2][0] < 40) weaknesses.push(skillMap[2][1]);
  if (skillMap[1][0] < 50) weaknesses.push(skillMap[1][1]);

  const recommendedStartingLevel = cefr === 'A0' || cefr === 'A1' ? 'beginner' as const
    : cefr === 'A2' || cefr === 'B1' ? 'foundation' as const
    : 'ielts-prep' as const;

  return {
    completedAt: new Date().toISOString(),
    vocabScore: scores.vocab,
    grammarScore: scores.grammar,
    listeningScore: scores.listening,
    overallScore: overall,
    estimatedCEFR: cefr,
    estimatedIELTS: ielts,
    strengths,
    weaknesses,
    recommendedStartingLevel,
  };
}

export function bandScoreFromCorrect(correct: number, total: number, type: 'listening' | 'academic-reading' | 'gt-reading'): number {
  const pct = correct / total;
  if (pct >= 0.975) return 9.0;
  if (pct >= 0.925) return 8.5;
  if (pct >= 0.875) return 8.0;
  if (pct >= 0.80) return 7.5;
  if (pct >= 0.75) return 7.0;
  if (pct >= 0.65) return 6.5;
  if (pct >= 0.575) return 6.0;
  if (pct >= 0.50) return 5.5;
  if (pct >= 0.40) return 5.0;
  if (pct >= 0.30) return 4.5;
  if (pct >= 0.20) return 4.0;
  return 3.5;
}
