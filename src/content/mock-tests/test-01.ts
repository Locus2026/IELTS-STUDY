import type { MockTestDefinition, TestQuestion } from '@/types/mock-test';

// ── LISTENING (20 questions) ──
const listeningQuestions: TestQuestion[] = [
  { id: 'tl01', type: 'fill-blank' as const, stem: 'The man\'s name is ___.', correctAnswer: 'John Smith', points: 1 },
  { id: 'tl02', type: 'fill-blank' as const, stem: 'His phone number is ___.', correctAnswer: '07700 900 123', points: 1 },
  { id: 'tl03', type: 'fill-blank' as const, stem: 'He lives at ___ Road.', correctAnswer: 'Park', points: 1 },
  { id: 'tl04', type: 'fill-blank' as const, stem: 'The appointment is on ___ (day).', correctAnswer: 'Thursday', points: 1 },
  { id: 'tl05', type: 'multiple-choice' as const, stem: 'What time is the appointment?', options: ['9:00 AM', '10:30 AM', '2:00 PM', '4:30 PM'], correctAnswer: '10:30 AM', points: 1 },
  { id: 'tl06', type: 'multiple-choice' as const, stem: 'Which department does he need?', options: ['Sales', 'Customer Service', 'Human Resources', 'Finance'], correctAnswer: 'Customer Service', points: 1 },
  { id: 'tl07', type: 'fill-blank' as const, stem: 'The reference number is ___.', correctAnswer: 'REF-2024-887', points: 1 },
  { id: 'tl08', type: 'fill-blank' as const, stem: 'He should bring his ___.', correctAnswer: 'passport', points: 1 },
  { id: 'tl09', type: 'multiple-choice' as const, stem: 'What is being announced?', options: ['A flight delay', 'A gate change', 'A train cancellation', 'A weather warning'], correctAnswer: 'A gate change', points: 1 },
  { id: 'tl10', type: 'fill-blank' as const, stem: 'The new gate number is ___.', correctAnswer: 'Gate 24', points: 1 },
  { id: 'tl11', type: 'multiple-choice' as const, stem: 'Where is the flight going?', options: ['London', 'New York', 'Tokyo', 'Sydney'], correctAnswer: 'Tokyo', points: 1 },
  { id: 'tl12', type: 'fill-blank' as const, stem: 'Boarding will begin in ___ minutes.', correctAnswer: '15', points: 1 },
  { id: 'tl13', type: 'multiple-choice' as const, stem: 'What should passengers do?', options: ['Wait in the lounge', 'Go to the new gate immediately', 'Check their email', 'Return to check-in'], correctAnswer: 'Go to the new gate immediately', points: 1 },
  { id: 'tl14', type: 'fill-blank' as const, stem: 'The flight number is ___.', correctAnswer: 'BA 472', points: 1 },
  { id: 'tl15', type: 'multiple-choice' as const, stem: 'What is the main topic of discussion?', options: ['Climate change', 'Renewable energy sources', 'Research methodology', 'Exam preparation'], correctAnswer: 'Renewable energy sources', points: 1 },
  { id: 'tl16', type: 'fill-blank' as const, stem: 'The presentation is due on ___ (date).', correctAnswer: 'next Friday', points: 1 },
  { id: 'tl17', type: 'multiple-choice' as const, stem: 'How does the student feel?', options: ['Confident', 'Nervous', 'Bored', 'Angry'], correctAnswer: 'Nervous', points: 1 },
  { id: 'tl18', type: 'fill-blank' as const, stem: 'The professor suggests using ___ as a case study.', correctAnswer: 'Germany', points: 1 },
  { id: 'tl19', type: 'multiple-choice' as const, stem: 'How many sources are required?', options: ['3', '5', '8', '10'], correctAnswer: '8', points: 1 },
  { id: 'tl20', type: 'fill-blank' as const, stem: 'The presentation should be ___ minutes long.', correctAnswer: '15', points: 1 },
];

// ── READING (20 questions) ──
const readingQuestions: TestQuestion[] = [
  { id: 'tr01', type: 'multiple-choice' as const, stem: 'According to the passage, which energy sources are growing fastest?', options: ['Coal and gas', 'Solar and wind', 'Nuclear and hydro', 'Oil and biomass'], correctAnswer: 'Solar and wind', points: 1 },
  { id: 'tr02', type: 'multiple-choice' as const, stem: 'The EU aims to become carbon-neutral by:', options: ['2030', '2040', '2050', '2060'], correctAnswer: '2050', points: 1 },
  { id: 'tr03', type: 'multiple-choice' as const, stem: 'Which country leads in renewable energy capacity?', options: ['USA', 'Germany', 'China', 'Japan'], correctAnswer: 'China', points: 1 },
  { id: 'tr04', type: 'multiple-choice' as const, stem: 'What is mentioned as a challenge?', options: ['Public opposition', 'Energy storage technology', 'High fuel costs', 'Lack of sunlight'], correctAnswer: 'Energy storage technology', points: 1 },
  { id: 'tr05', type: 'multiple-choice' as const, stem: 'Renewable energy has become important in fighting climate change.', options: ['True', 'False', 'Not Given'], correctAnswer: 'True', points: 1 },
  { id: 'tr06', type: 'multiple-choice' as const, stem: 'Solar power is cheaper than coal in all countries.', options: ['True', 'False', 'Not Given'], correctAnswer: 'Not Given', points: 1 },
  { id: 'tr07', type: 'multiple-choice' as const, stem: 'Experts believe fossil fuels will remain dominant.', options: ['True', 'False', 'Not Given'], correctAnswer: 'False', points: 1 },
  { id: 'tr08', type: 'multiple-choice' as const, stem: 'The passage states that wind power creates more jobs than solar power.', options: ['True', 'False', 'Not Given'], correctAnswer: 'Not Given', points: 1 },
  { id: 'tr09', type: 'fill-blank' as const, stem: 'The EU aims to become ___ by 2050.', correctAnswer: 'carbon-neutral', acceptableAnswers: ['carbon neutral'], points: 1 },
  { id: 'tr10', type: 'fill-blank' as const, stem: 'China is the world\'s largest energy ___.', correctAnswer: 'consumer', points: 1 },
  { id: 'tr11', type: 'fill-blank' as const, stem: '___ storage technology is still developing.', correctAnswer: 'Energy', points: 1 },
  { id: 'tr12', type: 'fill-blank' as const, stem: 'The transition from ___ fuels requires significant changes.', correctAnswer: 'fossil', points: 1 },
  { id: 'tr13', type: 'multiple-choice' as const, stem: 'What is the main purpose of the passage?', options: ['To argue against renewable energy', 'To describe the current state of renewable energy', 'To explain how solar panels work', 'To compare energy prices'], correctAnswer: 'To describe the current state of renewable energy', points: 1 },
  { id: 'tr14', type: 'multiple-choice' as const, stem: 'The word "ambitious" in the passage most likely means:', options: ['Expensive', 'Impossible', 'Challenging and large-scale', 'Unnecessary'], correctAnswer: 'Challenging and large-scale', points: 1 },
  { id: 'tr15', type: 'multiple-choice' as const, stem: 'Governments worldwide have stopped investing in fossil fuels.', options: ['True', 'False', 'Not Given'], correctAnswer: 'Not Given', points: 1 },
  { id: 'tr16', type: 'multiple-choice' as const, stem: 'Infrastructure changes are needed for the energy transition.', options: ['True', 'False', 'Not Given'], correctAnswer: 'True', points: 1 },
  { id: 'tr17', type: 'fill-blank' as const, stem: 'Many countries have set ___ targets to reduce emissions.', correctAnswer: 'ambitious', points: 1 },
  { id: 'tr18', type: 'fill-blank' as const, stem: 'China has invested heavily in ___ panel production.', correctAnswer: 'solar', points: 1 },
  { id: 'tr19', type: 'multiple-choice' as const, stem: 'Despite obstacles, experts agree renewable energy is the ___ of power generation.', options: ['past', 'present', 'future', 'problem'], correctAnswer: 'future', points: 1 },
  { id: 'tr20', type: 'fill-blank' as const, stem: 'Renewable energy helps combat ___ change.', correctAnswer: 'climate', points: 1 },
];

// ══════════════════════════════════════════════════════
// MOCK TEST
// ══════════════════════════════════════════════════════

export const mockTest01: MockTestDefinition = {
  id: 'test-01',
  title: 'IELTS Bridge 模拟测试卷一',
  description: '听力20题 + 阅读20题 + 写作Task 2，完整模拟雅思考试体验。',
  totalTimeMinutes: 150,
  sections: [
    {
      type: 'listening',
      title: '听力理解（共20题）',
      timeMinutes: 20,
      instructions: '每段音频只播放一次。请认真听完后再作答。',
      questions: listeningQuestions,
    },
    {
      type: 'reading',
      title: '阅读理解（共20题）',
      timeMinutes: 30,
      instructions: '仔细阅读文章，根据内容选择或填写答案。True/False/Not Given 请仔细区分。',
      passages: [{
        title: 'The Rise of Renewable Energy',
        content: 'In recent years, renewable energy has become increasingly important in the global effort to combat climate change. Solar and wind power are now the fastest-growing energy sources worldwide. Many countries have set ambitious targets to reduce their carbon emissions. For example, the European Union aims to become carbon-neutral by 2050. China, the world\'s largest energy consumer, has invested heavily in solar panel production and now leads the world in renewable energy capacity. However, challenges remain. Energy storage technology is still developing, and the transition from fossil fuels requires significant infrastructure changes. Despite these obstacles, experts agree that renewable energy is the future of power generation.',
        wordCount: 120,
      }],
      questions: readingQuestions,
    },
    {
      type: 'writing',
      title: '写作 Task 2（议论文）',
      timeMinutes: 40,
      instructions: '请用40分钟完成一篇至少250词的议论文。',
      writingTask: {
        taskNumber: 2,
        prompt: 'Some people believe that artificial intelligence will bring more benefits than problems to society. Others worry that AI could lead to job losses and other serious issues. Discuss both views and give your own opinion.\n\nWrite at least 250 words.',
        wordLimit: 250,
      },
      questions: [],
    },
  ],
};
