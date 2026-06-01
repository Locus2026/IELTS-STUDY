import type { ExerciseDefinition } from '@/types/exercise';

// Helper to create a fill-blank exercise
function fbEx(id: string, skill: ExerciseDefinition['skill'], diff: 1|2|3|4|5, title: string, qs: { before: string; after: string; answer: string; alts?: string[]; hint?: string }[]): ExerciseDefinition {
  return {
    id, type: 'fill-blank', skill, difficulty: diff,
    instructions: `请根据上下文填入正确的单词。${title}`,
    totalQuestions: qs.length, xpPerQuestion: 3,
    questions: qs.map((q, i) => ({
      id: `${id}-q${i + 1}`,
      type: 'fill-blank' as const,
      content: {
        kind: 'fill-blank' as const,
        textBefore: q.before, textAfter: q.after,
        correctAnswer: q.answer,
        acceptableAnswers: q.alts || [],
        hint: q.hint,
      },
    })),
  };
}

// Helper for multiple choice
function mcEx(id: string, skill: ExerciseDefinition['skill'], diff: 1|2|3|4|5, title: string, qs: { stem: string; opts: string[]; correct: number; exp: string }[]): ExerciseDefinition {
  return {
    id, type: 'multiple-choice', skill, difficulty: diff,
    instructions: `请选择正确答案。${title}`,
    totalQuestions: qs.length, xpPerQuestion: 3,
    questions: qs.map((q, i) => ({
      id: `${id}-q${i + 1}`,
      type: 'multiple-choice' as const,
      content: { kind: 'multiple-choice' as const, stem: q.stem, options: q.opts, correctIndex: q.correct, explanation: q.exp },
    })),
  };
}

// ══════════════════════════════════════════════════════
// BEGINNER EXERCISES
// ══════════════════════════════════════════════════════

// Unit 1: Alphabet & Phonics
const ex_b_u01_l01 = mcEx('ex-b-u01-l01', 'vocabulary', 1, '选择正确的字母', [
  { stem: '字母表第一个字母是？', opts: ['A', 'B', 'C', 'D'], correct: 0, exp: 'A 是英语字母表的第一个字母。' },
  { stem: '字母表中第五个字母是？', opts: ['D', 'E', 'F', 'G'], correct: 1, exp: 'E 是第五个字母，也是最重要的元音字母之一。' },
  { stem: '最后一个字母是？', opts: ['X', 'Y', 'Z', 'W'], correct: 2, exp: 'Z 是英语字母表的第26个字母。' },
  { stem: '哪个是元音字母？', opts: ['B', 'C', 'A', 'D'], correct: 2, exp: 'A 是五个元音字母之一。' },
  { stem: '"C" 的正确名称读作？', opts: ['/keɪ/', '/siː/', '/biː/', '/diː/'], correct: 1, exp: 'C 读作 /siː/（西）。' },
]);

const ex_b_u01_l04 = mcEx('ex-b-u01-l04', 'listening', 2, '基础音标辨识', [
  { stem: '/æ/ 是哪个单词中的元音？', opts: ['cat', 'meet', 'book', 'car'], correct: 0, exp: 'cat 中的 a 发 /æ/ 音（短元音）。' },
  { stem: '/iː/ 是哪个单词中的元音？', opts: ['bed', 'cat', 'see', 'cup'], correct: 2, exp: 'see 中的 ee 发长元音 /iː/。' },
  { stem: '/e/ 是哪个单词中的元音？', opts: ['bike', 'bed', 'food', 'hat'], correct: 1, exp: 'bed 中的 e 发 /e/ 音。' },
]);

const ex_b_u01_l06 = fbEx('ex-b-u01-l06', 'vocabulary', 1, '英文数字', [
  { before: 'There are', after: 'months in a year.', answer: 'twelve', alts: ['12'] },
  { before: 'I am', after: 'years old.（20）', answer: 'twenty', alts: ['20'] },
  { before: 'She has', after: 'fingers.（10）', answer: 'ten', alts: ['10'] },
]);

const ex_b_u01_l09 = mcEx('ex-b-u01-l09', 'speaking', 2, '选择合适的问候语', [
  { stem: '早上见到朋友，你应该说什么？', opts: ['Good night', 'Good morning', 'Good evening', 'Goodbye'], correct: 1, exp: '早上的问候语是 Good morning。' },
  { stem: '"How are you?" 的正确回答是？', opts: ['I am 20.', 'I am fine, thank you.', 'I am a student.', 'I am from China.'], correct: 1, exp: '当别人问你"你好吗"，标准回答是 I\'m fine, thank you. 或 I\'m good.' },
  { stem: '第一次见面，你应该说什么？', opts: ['Goodbye!', 'See you later!', 'Nice to meet you!', 'How old are you?'], correct: 2, exp: '初次见面说 Nice to meet you（很高兴认识你）。' },
]);

const ex_b_u01_l10 = mcEx('ex-b-u01-l10', 'vocabulary', 2, 'Unit 1 综合复习', [
  { stem: '以下哪个是辅音字母？', opts: ['A', 'E', 'B', 'O'], correct: 2, exp: 'B 是辅音字母。A, E, O 是元音。' },
  { stem: '"fifty" 对应的数字是？', opts: ['15', '50', '40', '5'], correct: 1, exp: 'fifty = 50，而 fifteen = 15。' },
  { stem: '"Good night" 什么时候说？', opts: ['早上起床时', '中午吃饭时', '晚上睡觉前', '下午见面时'], correct: 2, exp: 'Good night 是睡前说的晚安。' },
]);

// Unit 3: Basic Sentences
const ex_b_u03_l01 = fbEx('ex-b-u03-l01', 'grammar', 1, 'I am 句型', [
  { before: 'I am a', after: '.(学生)', answer: 'student' },
  { before: 'I am from', after: '.(中国)', answer: 'China', alts: ['china'] },
  { before: 'I am', after: 'years old.（18）', answer: 'eighteen', alts: ['18'] },
  { before: 'I am very', after: 'today.（开心）', answer: 'happy', alts: ['glad'] },
]);

const ex_b_u03_l05 = fbEx('ex-b-u03-l05', 'grammar', 2, 'He/She/It is 句型', [
  { before: 'He', after: 'a doctor.（是）', answer: 'is' },
  { before: 'She', after: 'my sister.（是）', answer: 'is' },
  { before: 'It', after: 'a big dog.（是）', answer: 'is' },
]);

const ex_b_u03_l07 = mcEx('ex-b-u03-l07', 'grammar', 3, '简单疑问句', [
  { stem: '"Are you a teacher?" → 肯定回答', opts: ['Yes, I am.', 'Yes, I are.', 'No, I am.', 'Yes, you are.'], correct: 0, exp: 'Are you...? → Yes, I am. / No, I\'m not.' },
  { stem: '"Is she happy?" → 否定回答', opts: ['No, she is.', 'No, she isn\'t.', 'No, she doesn\'t.', 'No, she not.'], correct: 1, exp: 'Is she...? → No, she isn\'t.' },
]);

// Unit 5: Present Tenses
const ex_b_u05_l01 = mcEx('ex-b-u05-l01', 'grammar', 2, '一般现在时', [
  { stem: '选择正确的句子：', opts: ['He work hard.', 'He works hard.', 'He working hard.', 'He is work hard.'], correct: 1, exp: '第三人称单数需要加 -s：He works hard.' },
  { stem: '"She ____ to school every day."', opts: ['go', 'goes', 'going', 'is go'], correct: 1, exp: 'She goes to school. 第三人称单数 go → goes。' },
  { stem: '"They ____ in Beijing."', opts: ['live', 'lives', 'living', 'is live'], correct: 0, exp: 'They 是复数主语，动词用原形 live。' },
]);

const ex_b_u05_l05 = mcEx('ex-b-u05-l05', 'grammar', 3, '两种时态对比', [
  { stem: '"Look! The baby ____."', opts: ['smiles', 'is smiling', 'smiled', 'smile'], correct: 1, exp: 'Look! 是现在进行时的标志词，表示正在发生的动作。' },
  { stem: '"I ____ breakfast at 7 every day."', opts: ['am eating', 'eat', 'eats', 'ate'], correct: 1, exp: 'every day 是一般现在时的标志词，表示习惯性动作。' },
]);

// Unit 6: Wh- Questions
const ex_b_u06_l01 = mcEx('ex-b-u06-l01', 'grammar', 1, 'What 疑问句', [
  { stem: '___ is your name?', opts: ['What', 'Where', 'When', 'Who'], correct: 0, exp: 'What is your name? 问名字。' },
  { stem: '___ time is it?', opts: ['Where', 'Who', 'What', 'Why'], correct: 2, exp: 'What time is it? 问时间。' },
]);

const ex_b_u06_l04 = mcEx('ex-b-u06-l04', 'grammar', 2, 'Who / Why 疑问句', [
  { stem: '___ is that woman? — She is my teacher.', opts: ['What', 'Where', 'Who', 'When'], correct: 2, exp: 'Who 用来问人。' },
  { stem: '___ are you late? — Because I missed the bus.', opts: ['What', 'Why', 'Who', 'Where'], correct: 1, exp: 'Why 用来问原因，回答用 Because。' },
]);

// Foundation exercises
const ex_f_u01_l01 = mcEx('ex-f-u01-l01', 'grammar', 2, '规则动词过去式', [
  { stem: '"I ____ TV last night." (watch)', opts: ['watch', 'watched', 'watching', 'watches'], correct: 1, exp: '规则动词过去式：watch → watched。' },
  { stem: '"She ____ in London in 2020." (live)', opts: ['lives', 'is living', 'lived', 'live'], correct: 2, exp: 'live → lived（以 e 结尾只加 d）。' },
]);

const ex_f_u01_l02 = mcEx('ex-f-u01-l02', 'grammar', 3, '不规则动词过去式', [
  { stem: '"I ____ to the cinema yesterday." (go)', opts: ['go', 'goes', 'went', 'gone'], correct: 2, exp: 'go 的过去式是 went（不规则）。' },
  { stem: '"She ____ a delicious cake." (make)', opts: ['make', 'makes', 'maked', 'made'], correct: 3, exp: 'make 的过去式是 made（不规则）。' },
]);

const ex_f_u03_l01 = mcEx('ex-f-u03-l01', 'grammar', 2, '比较级', [
  { stem: '"This book is ____ than that one." (interesting)', opts: ['interestinger', 'more interesting', 'most interesting', 'interesting'], correct: 1, exp: '多音节形容词用 more + adj + than。' },
  { stem: '"She is ____ than her sister." (tall)', opts: ['tall', 'more tall', 'taller', 'tallest'], correct: 2, exp: '单音节形容词 + er + than。' },
]);

// ══════════════════════════════════════════════════════
// EXPORT ALL
// ══════════════════════════════════════════════════════

export const beginnerExercises: ExerciseDefinition[] = [
  ex_b_u01_l01, ex_b_u01_l04, ex_b_u01_l06, ex_b_u01_l09, ex_b_u01_l10,
  ex_b_u03_l01, ex_b_u03_l05, ex_b_u03_l07,
  ex_b_u05_l01, ex_b_u05_l05,
  ex_b_u06_l01, ex_b_u06_l04,
];

export const foundationExercises: ExerciseDefinition[] = [
  ex_f_u01_l01, ex_f_u01_l02,
  ex_f_u03_l01,
];

export function getExerciseById(id: string): ExerciseDefinition | undefined {
  return [...beginnerExercises, ...foundationExercises].find((e) => e.id === id);
}
