export function calculateXP(
  type: 'lesson' | 'exercise' | 'mock-test',
  score: number,
  durationMinutes: number
): number {
  switch (type) {
    case 'lesson': return 10 + Math.floor(durationMinutes / 5) * 5;
    case 'exercise': return Math.floor(score * 0.2) + 5;
    case 'mock-test': return 50 + Math.floor(score * 0.5);
    default: return 5;
  }
}
