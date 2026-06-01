import type { CEFRLevel } from '@/types/user';

export const CEFR_LABELS: Record<CEFRLevel, { label: string; color: string; description: string }> = {
  'A0': { label: '零基础', color: 'bg-gray-400', description: '尚未建立英语基础' },
  'A1': { label: '入门级', color: 'bg-blue-400', description: '能理解和使用日常简单表达' },
  'A2': { label: '基础级', color: 'bg-green-400', description: '能就日常话题进行简单交流' },
  'B1': { label: '进阶级', color: 'bg-yellow-400', description: '能应对大部分日常场景' },
  'B2': { label: '中高级', color: 'bg-orange-400', description: '能进行较流利的交流' },
  'C1': { label: '高级', color: 'bg-red-400', description: '能灵活有效地使用英语' },
};

export const SKILL_LABELS: Record<string, string> = {
  vocabulary: '词汇',
  grammar: '语法',
  listening: '听力',
  reading: '阅读',
  writing: '写作',
  speaking: '口语',
};
