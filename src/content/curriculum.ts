import type { Curriculum, CurriculumUnit, CurriculumLesson } from '@/types/curriculum';

function L(
  id: string, unitId: string, order: number, title: string, description: string,
  type: CurriculumLesson['type'], duration: number, diff: 1|2|3|4|5,
  exerciseIds: string[], vocabIds: string[], xp: number
): CurriculumLesson {
  return { id, unitId, order, title, description, type, durationMinutes: duration, difficulty: diff, content: '', exerciseIds, vocabIds, xpReward: xp };
}

// ══════════════════════════════════════════════════════
// LEVEL 1: 入门级 (Beginner) — CEFR A0→A1
// Source: CEFR A1-A2 ESL Curriculum (Cambridge/Oxford/Pearson)
// ══════════════════════════════════════════════════════

const bU01 = {
  id: 'beginner-unit-01', level: 'beginner' as const, order: 1,
  title: '字母与发音入门', subtitle: '掌握字母表和基础音标',
  description: '英语学习的第一步：认识26个英文字母，学习44个国际音标（IPA）中的基础音素，建立正确的发音习惯。',
  icon: '🔤', estimatedHours: 3, targetCEFR: 'A1' as const,
  skillsCovered: ['vocabulary', 'listening', 'speaking'] as CurriculumUnit['skillsCovered'],
  prerequisiteUnitId: null,
  lessons: [
    L('b-u01-l01', 'beginner-unit-01', 1, '认识26个英文字母', '学习A-Z的字母名称、大小写形式和基本发音规则', 'vocab', 10, 1, [], [], 10),
    L('b-u01-l02', 'beginner-unit-01', 2, '元音与辅音', '区分5个元音字母（A E I O U）和21个辅音字母', 'vocab', 10, 1, [], [], 10),
    L('b-u01-l03', 'beginner-unit-01', 3, '字母书写练习', '大小写字母的标准书写笔顺和常见书写错误纠正', 'writing', 12, 1, [], [], 10),
    L('b-u01-l04', 'beginner-unit-01', 4, '基础元音音标 /ae/ /e/ /i:/', '三个最常见元音音标的发音口型和练习', 'listening', 10, 2, [], [], 15),
    L('b-u01-l05', 'beginner-unit-01', 5, '基础元音音标 /o/ /u/ /u:/', '短元音和长元音的对比发音训练', 'listening', 10, 2, [], [], 15),
    L('b-u01-l06', 'beginner-unit-01', 6, '数字 1-100', '英文数字的读法、拼写和实际场景应用', 'vocab', 10, 1, [], [], 10),
    L('b-u01-l07', 'beginner-unit-01', 7, '颜色与形状', '12种基础颜色 + 6种常见形状的英文表达', 'vocab', 8, 1, [], [], 10),
    L('b-u01-l08', 'beginner-unit-01', 8, '日常问候语', 'Hello, Good morning, How are you? 等基本社交用语', 'speaking', 10, 1, [], [], 15),
    L('b-u01-l09', 'beginner-unit-01', 9, '自我介绍', '用 I am / My name is 句型进行简单自我介绍', 'speaking', 10, 2, [], [], 15),
    L('b-u01-l10', 'beginner-unit-01', 10, '单元复习：字母·音标·数字', '综合测试：字母拼写、音标辨识、数字听写、自我介绍', 'review', 15, 2, [], [], 20),
  ],
};

const bU02 = {
  id: 'beginner-unit-02', level: 'beginner' as const, order: 2,
  title: '基础词汇 I：人与生活', subtitle: '学会约200个日常生活词汇',
  description: '涵盖家庭、身体、衣物、食物、住所等日常主题，用场景记忆法系统积累第一批实用词汇。',
  icon: '👤', estimatedHours: 4, targetCEFR: 'A1' as const,
  skillsCovered: ['vocabulary', 'reading'] as CurriculumUnit['skillsCovered'],
  prerequisiteUnitId: 'beginner-unit-01',
  lessons: [
    L('b-u02-l01', 'beginner-unit-02', 1, '家庭称谓', 'Father, Mother, Brother, Sister, Grandparents 等家庭成员词汇', 'vocab', 10, 1, [], [], 10),
    L('b-u02-l02', 'beginner-unit-02', 2, '身体部位', 'Head, Shoulder, Hand, Foot, Eye, Ear, Mouth 等身体部位', 'vocab', 8, 1, [], [], 10),
    L('b-u02-l03', 'beginner-unit-02', 3, '衣物与配饰', 'Shirt, Pants, Dress, Shoes, Hat 等日常穿着词汇', 'vocab', 10, 1, [], [], 10),
    L('b-u02-l04', 'beginner-unit-02', 4, '食物与饮料 I', '常见水果、蔬菜、肉类和饮品的英文名称', 'vocab', 10, 1, [], [], 10),
    L('b-u02-l05', 'beginner-unit-02', 5, '食物与饮料 II', '一日三餐、点餐用语和饮食偏好的表达', 'vocab', 10, 2, [], [], 15),
    L('b-u02-l06', 'beginner-unit-02', 6, '房间与家具', 'Bedroom, Kitchen, Living Room 及各房间常见物品', 'vocab', 10, 1, [], [], 10),
    L('b-u02-l07', 'beginner-unit-02', 7, '场景词汇综合复习', '综合复习本单元6大主题词汇，场景分类记忆', 'review', 12, 2, [], [], 20),
  ],
};

const bU03 = {
  id: 'beginner-unit-03', level: 'beginner' as const, order: 3,
  title: '简单句型：从现在开始说话', subtitle: '用英语说出完整的句子',
  description: '掌握英语最基本的句子结构——主谓宾（SVO），学会用 I am / This is / I have 三个核心句型表达自己。',
  icon: '💬', estimatedHours: 4, targetCEFR: 'A1' as const,
  skillsCovered: ['grammar', 'writing', 'speaking'] as CurriculumUnit['skillsCovered'],
  prerequisiteUnitId: 'beginner-unit-02',
  lessons: [
    L('b-u03-l01', 'beginner-unit-03', 1, '"I am" 句型', '学会用 I am + 名词/形容词介绍自己和描述状态', 'grammar', 10, 1, [], [], 10),
    L('b-u03-l02', 'beginner-unit-03', 2, 'I am 缩写与否定', 'I\'m 和 I\'m not 的口语缩写用法', 'grammar', 8, 2, [], [], 10),
    L('b-u03-l03', 'beginner-unit-03', 3, '"This is" 句型', '用 This is / That is 介绍身边的人和事物', 'grammar', 10, 1, [], [], 10),
    L('b-u03-l04', 'beginner-unit-03', 4, '"I have" 句型', '用 I have + 名词表达所属关系', 'grammar', 10, 1, [], [], 10),
    L('b-u03-l05', 'beginner-unit-03', 5, 'She/He/It is 第三人称', '扩展到第三人称：He is, She is, It is 的用法', 'grammar', 10, 2, [], [], 15),
    L('b-u03-l06', 'beginner-unit-03', 6, '主语代词总复习', 'I/You/He/She/It/We/They + am/is/are 完整表格', 'grammar', 12, 2, [], [], 15),
    L('b-u03-l07', 'beginner-unit-03', 7, '简单疑问句', '学会问 Is he...? Are you...? 并做肯定/否定回答', 'grammar', 12, 3, [], [], 15),
    L('b-u03-l08', 'beginner-unit-03', 8, '句型综合练习', '用三个核心句型写一段自我介绍', 'writing', 15, 3, [], [], 20),
  ],
};

const bU04 = {
  id: 'beginner-unit-04', level: 'beginner' as const, order: 4,
  title: '基础词汇 II：世界与日常', subtitle: '扩展至约400个词汇',
  description: '学习动物、自然、交通、地点、时间、天气、职业、爱好等主题的实用词汇。',
  icon: '🌍', estimatedHours: 3, targetCEFR: 'A1' as const,
  skillsCovered: ['vocabulary', 'reading'] as CurriculumUnit['skillsCovered'],
  prerequisiteUnitId: 'beginner-unit-03',
  lessons: [
    L('b-u04-l01', 'beginner-unit-04', 1, '动物与宠物', 'Dog, Cat, Bird, Fish 及常见野生动物词汇', 'vocab', 10, 1, [], [], 10),
    L('b-u04-l02', 'beginner-unit-04', 2, '天气与季节', 'Sunny, Rainy, Hot, Cold + Spring/Summer/Autumn/Winter', 'vocab', 10, 1, [], [], 10),
    L('b-u04-l03', 'beginner-unit-04', 3, '时间与日期', 'Days, Months, Telling Time', 'vocab', 12, 1, [], [], 15),
    L('b-u04-l04', 'beginner-unit-04', 4, '城市中的地点', 'Bank, Supermarket, Park, Hospital, Station 等', 'vocab', 10, 1, [], [], 10),
    L('b-u04-l05', 'beginner-unit-04', 5, '交通工具', 'Car, Bus, Train, Bicycle, Taxi 及出行相关表达', 'vocab', 10, 1, [], [], 10),
    L('b-u04-l06', 'beginner-unit-04', 6, '职业与工作', 'Teacher, Doctor, Nurse, Student, Engineer 等常见职业', 'vocab', 10, 1, [], [], 10),
    L('b-u04-l07', 'beginner-unit-04', 7, '爱好与休闲', 'Reading, Swimming, Cooking, Music, Sports 等爱好表达', 'vocab', 10, 1, [], [], 10),
  ],
};

const bU05 = {
  id: 'beginner-unit-05', level: 'beginner' as const, order: 5,
  title: '现在时态', subtitle: '一般现在时和现在进行时',
  description: '掌握英语最核心的两个现在时态——一般现在时（习惯/事实）和现在进行时（正在发生）。CEFR A1核心语法。',
  icon: '⏰', estimatedHours: 3, targetCEFR: 'A1' as const,
  skillsCovered: ['grammar', 'writing'] as CurriculumUnit['skillsCovered'],
  prerequisiteUnitId: 'beginner-unit-04',
  lessons: [
    L('b-u05-l01', 'beginner-unit-05', 1, '一般现在时：肯定句', 'I work / He works 的结构和第三人称单数 +s 规则', 'grammar', 12, 2, [], [], 15),
    L('b-u05-l02', 'beginner-unit-05', 2, '一般现在时：否定句', 'don\'t / doesn\'t 的用法', 'grammar', 10, 2, [], [], 15),
    L('b-u05-l03', 'beginner-unit-05', 3, '描述日常作息', '用一般现在时描述 Daily Routine', 'writing', 12, 2, [], [], 15),
    L('b-u05-l04', 'beginner-unit-05', 4, '现在进行时', 'am/is/are + -ing 的结构和拼写变化规则', 'grammar', 12, 2, [], [], 15),
    L('b-u05-l05', 'beginner-unit-05', 5, '两种时态的对比', '什么时候用一般现在时？什么时候用现在进行时？', 'grammar', 12, 3, [], [], 15),
  ],
};

const bU06 = {
  id: 'beginner-unit-06', level: 'beginner' as const, order: 6,
  title: '问问题：Wh- 疑问词', subtitle: '学会用英语提问',
  description: '掌握 What/Where/When/Who/Why/How 六大疑问词和一般疑问句，从"会说陈述句"升级到"会问问题"。',
  icon: '❓', estimatedHours: 3, targetCEFR: 'A1' as const,
  skillsCovered: ['grammar', 'speaking'] as CurriculumUnit['skillsCovered'],
  prerequisiteUnitId: 'beginner-unit-05',
  lessons: [
    L('b-u06-l01', 'beginner-unit-06', 1, 'What 问事物', 'What is this? What do you do? What time is it?', 'grammar', 10, 1, [], [], 10),
    L('b-u06-l02', 'beginner-unit-06', 2, 'Where 问地点', 'Where are you from? Where is the bank?', 'grammar', 10, 1, [], [], 10),
    L('b-u06-l03', 'beginner-unit-06', 3, 'When 问时间', 'When is your birthday? When do you wake up?', 'grammar', 10, 1, [], [], 10),
    L('b-u06-l04', 'beginner-unit-06', 4, 'Who + Why 问人和原因', 'Who is she? Why are you late?', 'grammar', 10, 2, [], [], 15),
    L('b-u06-l05', 'beginner-unit-06', 5, 'How 问方式', 'How are you? How do you go to school? How much?', 'grammar', 10, 2, [], [], 15),
    L('b-u06-l06', 'beginner-unit-06', 6, '疑问句综合对话', '两人一组互相用 Wh- 问题采访对方', 'speaking', 15, 3, [], [], 20),
  ],
};

const bU07 = {
  id: 'beginner-unit-07', level: 'beginner' as const, order: 7,
  title: '基础阅读入门', subtitle: '从单词到短文的跨越',
  description: '从认识单词到读懂50-80词的简单段落，掌握略读（Skimming）和扫读（Scanning）的基础用法。',
  icon: '📖', estimatedHours: 3, targetCEFR: 'A1' as const,
  skillsCovered: ['reading', 'vocabulary'] as CurriculumUnit['skillsCovered'],
  prerequisiteUnitId: 'beginner-unit-06',
  lessons: [
    L('b-u07-l01', 'beginner-unit-07', 1, '读懂标识和通知', '商店标识、公共通知等短文本阅读', 'reading', 10, 1, [], [], 10),
    L('b-u07-l02', 'beginner-unit-07', 2, '简单邮件和消息', '阅读日常生活中的简短邮件和手机消息', 'reading', 10, 1, [], [], 10),
    L('b-u07-l03', 'beginner-unit-07', 3, '图片+文字理解', '图文结合理解简短故事', 'reading', 10, 2, [], [], 15),
    L('b-u07-l04', 'beginner-unit-07', 4, '关键词定位技巧', '学会在一段文字中快速找到具体信息', 'reading', 12, 2, [], [], 15),
    L('b-u07-l05', 'beginner-unit-07', 5, '短文阅读理解', '阅读50-80词短文，回答简单问题', 'reading', 12, 3, [], [], 20),
  ],
};

const bU08 = {
  id: 'beginner-unit-08', level: 'beginner' as const, order: 8,
  title: '基础听力训练', subtitle: '从听到的关键词到听懂大意',
  description: '适应英音和美音的基础区别，学会抓取关键词（数字、名字、地点），为后续雅思听力 Part 1 打基础。',
  icon: '🎧', estimatedHours: 3, targetCEFR: 'A1' as const,
  skillsCovered: ['listening', 'vocabulary'] as CurriculumUnit['skillsCovered'],
  prerequisiteUnitId: 'beginner-unit-07',
  lessons: [
    L('b-u08-l01', 'beginner-unit-08', 1, '听数字和电话号码', '训练对英文数字的快速反应', 'listening', 10, 1, [], [], 10),
    L('b-u08-l02', 'beginner-unit-08', 2, '听人名和地址', '英语名字的拼写和地址听写训练', 'listening', 10, 1, [], [], 10),
    L('b-u08-l03', 'beginner-unit-08', 3, '听简单指令', 'Turn left, Open the door 等动作指令', 'listening', 10, 1, [], [], 10),
    L('b-u08-l04', 'beginner-unit-08', 4, '短对话理解', '听懂2-3轮的简单日常对话', 'listening', 12, 2, [], [], 15),
    L('b-u08-l05', 'beginner-unit-08', 5, '听天气预报和广播', '抓取天气预报、机场广播等短独白中的关键信息', 'listening', 12, 3, [], [], 20),
  ],
};

const bU09 = {
  id: 'beginner-unit-09', level: 'beginner' as const, order: 9,
  title: '入门级综合测评', subtitle: '全面检验入门级学习成果',
  description: '涵盖本级别所有核心知识点的综合测试，生成升级到基础级的评估报告。',
  icon: '🏆', estimatedHours: 2, targetCEFR: 'A1' as const,
  skillsCovered: ['vocabulary', 'grammar', 'listening', 'reading', 'writing', 'speaking'] as CurriculumUnit['skillsCovered'],
  prerequisiteUnitId: 'beginner-unit-08',
  lessons: [
    L('b-u09-l01', 'beginner-unit-09', 1, '词汇与语法总复习', '入门级400词 + 3大句型 + 2大时态的全面回顾', 'review', 15, 3, [], [], 20),
    L('b-u09-l02', 'beginner-unit-09', 2, '听力与阅读模拟', '简化版听力（8题）+ 阅读（6题），体验考试形式', 'mixed', 15, 3, [], [], 20),
    L('b-u09-l03', 'beginner-unit-09', 3, '口语自评', '用学过的句型做1分钟自我介绍录音，对比标准发音自评', 'speaking', 15, 3, [], [], 20),
  ],
};

const beginnerUnits = [bU01, bU02, bU03, bU04, bU05, bU06, bU07, bU08, bU09];

// ══════════════════════════════════════════════════════
// LEVEL 2: 基础级 (Foundation) — CEFR A1→A2
// Source: CEFR A2 Grammar/Vocabulary Scope; Cambridge Empower
// ══════════════════════════════════════════════════════

const fU01 = {
  id: 'foundation-unit-01', level: 'foundation' as const, order: 1,
  title: '核心语法 I：过去与将来', subtitle: '过去时和将来时的完整掌握',
  description: '从"现在"走向"过去"和"将来"——掌握一般过去时（规则/不规则动词）、一般将来时（will & be going to）。',
  icon: '⏳', estimatedHours: 5, targetCEFR: 'A2' as const,
  skillsCovered: ['grammar', 'writing'] as CurriculumUnit['skillsCovered'],
  prerequisiteUnitId: null,
  lessons: [
    L('f-u01-l01', 'foundation-unit-01', 1, '一般过去时：规则动词', '动词 +ed 的四种拼写变化规则和发音', 'grammar', 12, 2, [], [], 15),
    L('f-u01-l02', 'foundation-unit-01', 2, '一般过去时：不规则动词 I', 'go-went, have-had, do-did, see-saw 等20个高频不规则动词', 'grammar', 12, 3, [], [], 15),
    L('f-u01-l03', 'foundation-unit-01', 3, '一般过去时：否定与疑问', 'didn\'t + 原形和 Did you...? 的结构', 'grammar', 10, 2, [], [], 15),
    L('f-u01-l04', 'foundation-unit-01', 4, '过去时的实际运用', '用过去时描述昨天的经历和上周末的活动', 'writing', 12, 2, [], [], 15),
    L('f-u01-l05', 'foundation-unit-01', 5, '一般将来时：will', 'will + 原形的肯定/否定/疑问，描述预测和承诺', 'grammar', 10, 2, [], [], 15),
    L('f-u01-l06', 'foundation-unit-01', 6, '一般将来时：be going to', 'be going to 用于已有计划 vs will 用于当场决定', 'grammar', 12, 3, [], [], 15),
  ],
};

const fU02 = {
  id: 'foundation-unit-02', level: 'foundation' as const, order: 2,
  title: '词汇扩展 I：社会与生活', subtitle: '词汇量从400扩展到800',
  description: '系统学习教育、健康、购物、旅行、科技、社会话题等6个A2核心主题的实用词汇和常见搭配。',
  icon: '📝', estimatedHours: 4, targetCEFR: 'A2' as const,
  skillsCovered: ['vocabulary', 'reading'] as CurriculumUnit['skillsCovered'],
  prerequisiteUnitId: 'foundation-unit-01',
  lessons: [
    L('f-u02-l01', 'foundation-unit-02', 1, '教育相关词汇', 'Subject, Exam, Homework, Term, University 等', 'vocab', 10, 2, [], [], 15),
    L('f-u02-l02', 'foundation-unit-02', 2, '健康与身体', 'Headache, Fever, Exercise, Diet, Appointment 等', 'vocab', 10, 2, [], [], 15),
    L('f-u02-l03', 'foundation-unit-02', 3, '购物与消费', 'Price, Discount, Receipt, Size, Refund 等', 'vocab', 10, 2, [], [], 15),
    L('f-u02-l04', 'foundation-unit-02', 4, '旅行与交通', 'Flight, Reservation, Passport, Departure 等', 'vocab', 10, 1, [], [], 10),
    L('f-u02-l05', 'foundation-unit-02', 5, '科技与网络', 'Computer, App, Download, WiFi, Password 等', 'vocab', 10, 2, [], [], 15),
    L('f-u02-l06', 'foundation-unit-02', 6, '社会话题相关词汇', 'Environment, Pollution, Population, Government 等', 'vocab', 12, 3, [], [], 20),
  ],
};

const fU03 = {
  id: 'foundation-unit-03', level: 'foundation' as const, order: 3,
  title: '核心语法 II：比较级/情态动词/完成时', subtitle: '三大中级语法点',
  description: '形容词比较级和最高级、情态动词（can/must/should）、现在完成时的基本用法——雅思口语和写作的基础语法工具。',
  icon: '📐', estimatedHours: 5, targetCEFR: 'A2' as const,
  skillsCovered: ['grammar', 'writing'] as CurriculumUnit['skillsCovered'],
  prerequisiteUnitId: 'foundation-unit-02',
  lessons: [
    L('f-u03-l01', 'foundation-unit-03', 1, '比较级', '-er + than / more ... than 的结构和拼写规则', 'grammar', 12, 2, [], [], 15),
    L('f-u03-l02', 'foundation-unit-03', 2, '最高级', 'the -est / the most ... 的用法', 'grammar', 10, 2, [], [], 15),
    L('f-u03-l03', 'foundation-unit-03', 3, '情态动词：Can & Could', '表达能力、请求、可能性', 'grammar', 10, 2, [], [], 15),
    L('f-u03-l04', 'foundation-unit-03', 4, '情态动词：Must & Should', '表达义务、建议和推测', 'grammar', 10, 2, [], [], 15),
    L('f-u03-l05', 'foundation-unit-03', 5, '现在完成时：入门', 'have/has + 过去分词；与一般过去时的核心区别', 'grammar', 15, 3, [], [], 20),
    L('f-u03-l06', 'foundation-unit-03', 6, '现在完成时：ever/never/just/yet', '用时间副词丰富的完成时表达', 'grammar', 12, 3, [], [], 15),
  ],
};

const fU04 = {
  id: 'foundation-unit-04', level: 'foundation' as const, order: 4,
  title: '阅读技巧：精读与略读', subtitle: '为雅思阅读打基础',
  description: '系统训练 Skimming（略读找主旨）和 Scanning（扫读找细节），学会处理60-120词的中等长度文章，识别同义替换。',
  icon: '📖', estimatedHours: 4, targetCEFR: 'A2' as const,
  skillsCovered: ['reading', 'vocabulary'] as CurriculumUnit['skillsCovered'],
  prerequisiteUnitId: 'foundation-unit-03',
  lessons: [
    L('f-u04-l01', 'foundation-unit-04', 1, '找主旨大意', '阅读段落，用一句话概括 Main Idea', 'reading', 10, 2, [], [], 15),
    L('f-u04-l02', 'foundation-unit-04', 2, '定位具体信息', '在文章中快速找到人名、日期、数字等', 'reading', 10, 2, [], [], 15),
    L('f-u04-l03', 'foundation-unit-04', 3, '识别同义替换', '题目和文章中不同词语表达相同意思——雅思阅读的核心考点', 'reading', 12, 3, [], [], 15),
    L('f-u04-l04', 'foundation-unit-04', 4, '理解长难句', '学会拆分含有连接词和从句的复杂句子', 'reading', 15, 3, [], [], 20),
    L('f-u04-l05', 'foundation-unit-04', 5, '计时阅读训练', '15分钟完成一篇120词文章+5道题', 'reading', 12, 3, [], [], 20),
  ],
};

const fU05 = {
  id: 'foundation-unit-05', level: 'foundation' as const, order: 5,
  title: '听力训练：从短对话到段落', subtitle: '适应多口音和自然语速',
  description: '接触英音、美音、澳音三种主要口音，听懂1-2分钟的短对话和独白，为雅思听力 Section 1-2 做准备。',
  icon: '🎧', estimatedHours: 4, targetCEFR: 'A2' as const,
  skillsCovered: ['listening'] as CurriculumUnit['skillsCovered'],
  prerequisiteUnitId: 'foundation-unit-04',
  lessons: [
    L('f-u05-l01', 'foundation-unit-05', 1, '英音 vs 美音：关键差异', '元音、r音、语调上的主要区别', 'listening', 10, 2, [], [], 15),
    L('f-u05-l02', 'foundation-unit-05', 2, '听短对话：生活场景', '购物、问路、预约等日常对话', 'listening', 10, 2, [], [], 15),
    L('f-u05-l03', 'foundation-unit-05', 3, '听短独白：通知和广播', '机场广播、商场促销、天气预报', 'listening', 10, 2, [], [], 15),
    L('f-u05-l04', 'foundation-unit-05', 4, '数字和拼写的快速听写', '电话号码、日期、人名拼写', 'listening', 12, 2, [], [], 15),
    L('f-u05-l05', 'foundation-unit-05', 5, '信号词识别', 'But, However, Actually 后面才是真实答案', 'listening', 12, 3, [], [], 20),
  ],
};

const fU06 = {
  id: 'foundation-unit-06', level: 'foundation' as const, order: 6,
  title: '写作入门：从句子到段落', subtitle: '学会写50-80词的英文段落',
  description: '从写出完整句子开始，逐步学会组织结构清晰的小段落——Topic Sentence + Supporting Sentences + Concluding Sentence。',
  icon: '✍️', estimatedHours: 4, targetCEFR: 'A2' as const,
  skillsCovered: ['writing', 'grammar'] as CurriculumUnit['skillsCovered'],
  prerequisiteUnitId: 'foundation-unit-05',
  lessons: [
    L('f-u06-l01', 'foundation-unit-06', 1, '写出一个完整的句子', '确保每个句子有主语+谓语，避免中式英语常见错误', 'writing', 10, 2, [], [], 15),
    L('f-u06-l02', 'foundation-unit-06', 2, '用连接词串联句子', 'and, but, because, so, however 的正确使用', 'writing', 10, 2, [], [], 15),
    L('f-u06-l03', 'foundation-unit-06', 3, '段落结构：Topic Sentence', '学会写一个清晰的主题句概括段落大意', 'writing', 12, 3, [], [], 15),
    L('f-u06-l04', 'foundation-unit-06', 4, '段落结构：Supporting Sentences', '用2-3个支撑句展开主题，加入例子和细节', 'writing', 12, 3, [], [], 15),
    L('f-u06-l05', 'foundation-unit-06', 5, '写一个完整的段落', '50-80词小短文：描述你的家乡/爱好/一天', 'writing', 15, 3, [], [], 20),
  ],
};

const fU07 = {
  id: 'foundation-unit-07', level: 'foundation' as const, order: 7,
  title: '口语基础：2分钟持续表达', subtitle: '从说一句话到说一段话',
  description: '克服"开口恐惧"，学会用 PREP 方法（Point→Reason→Example→Personal）组织口语回答，为雅思口语 Part 1 做准备。',
  icon: '🗣️', estimatedHours: 4, targetCEFR: 'A2' as const,
  skillsCovered: ['speaking', 'listening'] as CurriculumUnit['skillsCovered'],
  prerequisiteUnitId: 'foundation-unit-06',
  lessons: [
    L('f-u07-l01', 'foundation-unit-07', 1, '克服开口恐惧', '为什么说错比不说好？口语练习的心态建立', 'speaking', 8, 1, [], [], 10),
    L('f-u07-l02', 'foundation-unit-07', 2, '描述类话题', 'Describe your hometown/your family/your job', 'speaking', 10, 2, [], [], 15),
    L('f-u07-l03', 'foundation-unit-07', 3, '喜好类话题', 'Do you like music/sports/cooking? Why?', 'speaking', 10, 2, [], [], 15),
    L('f-u07-l04', 'foundation-unit-07', 4, 'PREP 回答法', 'Point → Reason → Example → Personal detail', 'speaking', 12, 3, [], [], 20),
    L('f-u07-l05', 'foundation-unit-07', 5, '1分钟自我展示', '综合运用所学，做一段1分钟的连贯自我介绍', 'speaking', 12, 3, [], [], 20),
  ],
};

const fU08 = {
  id: 'foundation-unit-08', level: 'foundation' as const, order: 8,
  title: '核心语法 III：条件句和被动语态', subtitle: '两个B1级别的关键语法',
  description: '掌握 Zero/First Conditional 和被动语态——雅思写作 Task 2 的重要语法工具。',
  icon: '🔧', estimatedHours: 4, targetCEFR: 'A2' as const,
  skillsCovered: ['grammar', 'writing'] as CurriculumUnit['skillsCovered'],
  prerequisiteUnitId: 'foundation-unit-07',
  lessons: [
    L('f-u08-l01', 'foundation-unit-08', 1, 'Zero Conditional', 'If + 现在时, 现在时 —— 描述普遍真理和科学事实', 'grammar', 10, 2, [], [], 15),
    L('f-u08-l02', 'foundation-unit-08', 2, 'First Conditional', 'If + 现在时, will + 原形 —— 描述真实可能性', 'grammar', 12, 3, [], [], 15),
    L('f-u08-l03', 'foundation-unit-08', 3, '条件句实际运用', '用条件句讨论环保、健康、教育等雅思常见话题', 'writing', 12, 3, [], [], 15),
    L('f-u08-l04', 'foundation-unit-08', 4, '被动语态：结构和用法', 'be + 过去分词 —— 学术写作中最常用的语态之一', 'grammar', 12, 3, [], [], 15),
    L('f-u08-l05', 'foundation-unit-08', 5, '主动 vs 被动：使用场景', '正式写作中被动语态的适当频率', 'writing', 12, 3, [], [], 15),
  ],
};

const fU09 = {
  id: 'foundation-unit-09', level: 'foundation' as const, order: 9,
  title: '基础级综合测评', subtitle: '检验A2水平，定位雅思起点',
  description: '全真模拟低难度雅思考试，生成衔接级学习建议。',
  icon: '🏆', estimatedHours: 2, targetCEFR: 'A2' as const,
  skillsCovered: ['vocabulary', 'grammar', 'listening', 'reading', 'writing', 'speaking'] as CurriculumUnit['skillsCovered'],
  prerequisiteUnitId: 'foundation-unit-08',
  lessons: [
    L('f-u09-l01', 'foundation-unit-09', 1, '综合知识回顾', '基础级所有语法点和800词汇的全面复习', 'review', 15, 3, [], [], 20),
    L('f-u09-l02', 'foundation-unit-09', 2, '模拟雅思：听力+阅读', 'Section 1-2 级别听力 + 简化版阅读', 'mixed', 20, 3, [], [], 25),
    L('f-u09-l03', 'foundation-unit-09', 3, '模拟雅思：写作+口语', '80词段落 + Part 1 级别口语问题', 'mixed', 20, 3, [], [], 25),
  ],
};

const foundationUnits = [fU01, fU02, fU03, fU04, fU05, fU06, fU07, fU08, fU09];

// ══════════════════════════════════════════════════════
// LEVEL 3: 雅思衔接级 (IELTS Bridge) — CEFR A2→B1+
// Source: IDP 2026 Test Format, 2026 Speaking Topics (May-Aug),
//         2026 Writing Task 2 Topics, Band Descriptors
// ══════════════════════════════════════════════════════

const iU01 = {
  id: 'ielts-unit-01', level: 'ielts-prep' as const, order: 1,
  title: '雅思听力题型精讲', subtitle: '4个Section × 8种题型',
  description: '逐个攻克雅思听力所有题型——填空题、选择题、配对题、地图题等，掌握信号词识别和同义替换。基于2026年考试格式。',
  icon: '🎧', estimatedHours: 6, targetCEFR: 'B1' as const,
  skillsCovered: ['listening', 'vocabulary'] as CurriculumUnit['skillsCovered'],
  prerequisiteUnitId: null,
  lessons: [
    L('i-u01-l01', 'ielts-unit-01', 1, 'Section 1：表格/表单填空', '个人信息填空——名字、号码、日期。预判词性技巧', 'listening', 12, 2, [], [], 15),
    L('i-u01-l02', 'ielts-unit-01', 2, 'Section 1：数字和字母听写', '电话号码、邮编、价格的精确听写（最易失分处）', 'listening', 10, 2, [], [], 15),
    L('i-u01-l03', 'ielts-unit-01', 3, 'Section 2：多选题策略', '排除法+信号词。注意"说一遍又改口"的陷阱', 'listening', 12, 3, [], [], 15),
    L('i-u01-l04', 'ielts-unit-01', 4, 'Section 2：地图/方位题', 'opposite, adjacent to, at the end of 等方位词汇', 'listening', 12, 3, [], [], 15),
    L('i-u01-l05', 'ielts-unit-01', 5, 'Section 3：学术讨论', '多人对话中的观点识别——同意vs反对vs保留意见', 'listening', 15, 4, [], [], 20),
    L('i-u01-l06', 'ielts-unit-01', 6, 'Section 4：学术讲座笔记填空', '长独白的结构预判——Intro→Main Points→Conclusion', 'listening', 15, 4, [], [], 20),
    L('i-u01-l07', 'ielts-unit-01', 7, '配对题专项', '选项→题干快速匹配，多种同义替换形式', 'listening', 12, 4, [], [], 20),
    L('i-u01-l08', 'ielts-unit-01', 8, '听力全真模拟', '完整30分钟40题，模拟真实考试节奏', 'mixed', 30, 4, [], [], 30),
  ],
};

const iU02 = {
  id: 'ielts-unit-02', level: 'ielts-prep' as const, order: 2,
  title: '雅思阅读题型与技巧', subtitle: '平行阅读法+同义替换',
  description: '基于2026年趋势——Matching Sentence Endings题型增多，Heading题减少。重点攻克 T/F/NG 和配对类题型。',
  icon: '📖', estimatedHours: 6, targetCEFR: 'B1' as const,
  skillsCovered: ['reading', 'vocabulary'] as CurriculumUnit['skillsCovered'],
  prerequisiteUnitId: null,
  lessons: [
    L('i-u02-l01', 'ielts-unit-02', 1, '雅思阅读概览与时间策略', '20分钟/篇硬性分配 + 平行阅读法的核心逻辑', 'reading', 10, 2, [], [], 10),
    L('i-u02-l02', 'ielts-unit-02', 2, 'True / False / Not Given I', 'False=文章说反了，NG=文章根本没提', 'reading', 15, 3, [], [], 20),
    L('i-u02-l03', 'ielts-unit-02', 3, 'True / False / Not Given II', '高频陷阱：绝对词、比较级、主观推断', 'reading', 15, 4, [], [], 20),
    L('i-u02-l04', 'ielts-unit-02', 4, 'Matching Headings', '先读Heading列表再扫段落首尾句', 'reading', 12, 3, [], [], 15),
    L('i-u02-l05', 'ielts-unit-02', 5, 'Matching Sentence Endings', '2026年趋势：此题型增多。语法+逻辑双重分析', 'reading', 12, 4, [], [], 20),
    L('i-u02-l06', 'ielts-unit-02', 6, 'Summary/Table Completion', '摘要填空——在原文中定位+提取原词', 'reading', 12, 3, [], [], 15),
    L('i-u02-l07', 'ielts-unit-02', 7, '同义替换大全', '归纳阅读中最常见的50组替换词对', 'reading', 15, 4, [], [], 20),
    L('i-u02-l08', 'ielts-unit-02', 8, '阅读全真模拟', '完整60分钟3篇文章40题，时间压力下完成', 'mixed', 60, 4, [], [], 30),
  ],
};

const iU03 = {
  id: 'ielts-unit-03', level: 'ielts-prep' as const, order: 3,
  title: '雅思写作 Task 1：图表描述', subtitle: '6大图表类型的完整写法',
  description: '线图/柱图/饼图/表格/流程图/地图——每种图表的写法、数据描述动词和Overview段落（评分关键）。',
  icon: '📊', estimatedHours: 6, targetCEFR: 'B1' as const,
  skillsCovered: ['writing', 'grammar'] as CurriculumUnit['skillsCovered'],
  prerequisiteUnitId: null,
  lessons: [
    L('i-u03-l01', 'ielts-unit-03', 1, 'Task 1 评分标准解读', '4项标准详解——Overview为什么是最关键的段落？', 'writing', 10, 2, [], [], 10),
    L('i-u03-l02', 'ielts-unit-03', 2, 'Introduction 写法', '如何改写题目——不照抄原文，保留原意', 'writing', 10, 2, [], [], 15),
    L('i-u03-l03', 'ielts-unit-03', 3, 'Overview 写法（核心）', '2句话概括最大趋势和最大对比——缺失直接封顶Band 6', 'writing', 15, 4, [], [], 20),
    L('i-u03-l04', 'ielts-unit-03', 4, '线图与柱状图', '趋势描述动词：surge, rise, plateau, plummet, fluctuate', 'writing', 12, 2, [], [], 15),
    L('i-u03-l05', 'ielts-unit-03', 5, '饼图与表格', '比较和占比：the largest proportion, twice as much as', 'writing', 12, 2, [], [], 15),
    L('i-u03-l06', 'ielts-unit-03', 6, '流程图', '顺序连接词：Firstly, Subsequently, Finally', 'writing', 12, 3, [], [], 15),
    L('i-u03-l07', 'ielts-unit-03', 7, '地图题', '方位变化：was replaced by, was extended, was converted into', 'writing', 12, 3, [], [], 15),
    L('i-u03-l08', 'ielts-unit-03', 8, 'Task 1 计时写作', '20分钟限时写一篇Task 1，对照范文自查', 'writing', 20, 3, [], [], 20),
  ],
};

const iU04 = {
  id: 'ielts-unit-04', level: 'ielts-prep' as const, order: 4,
  title: '雅思写作 Task 2：议论文', subtitle: '5种题型 × 8大热点话题',
  description: '基于2026年真题题库——科技AI、环境、教育、城市化、工作、健康、全球化、犯罪。掌握PEEL段落法和非模板化写作。2026新规：模板化作文封顶4.0。',
  icon: '📝', estimatedHours: 8, targetCEFR: 'B1' as const,
  skillsCovered: ['writing', 'vocabulary'] as CurriculumUnit['skillsCovered'],
  prerequisiteUnitId: null,
  lessons: [
    L('i-u04-l01', 'ielts-unit-04', 1, 'Task 2 评分标准与5大题型', 'Opinion/Discussion/Problem-Solution/Advantages-Disadvantages/Two-Part', 'writing', 10, 2, [], [], 10),
    L('i-u04-l02', 'ielts-unit-04', 2, 'Introduction 写法', 'Background + Paraphrase + Thesis Statement', 'writing', 12, 3, [], [], 15),
    L('i-u04-l03', 'ielts-unit-04', 3, 'PEEL 段落法', 'Point → Explanation → Example → Link back', 'writing', 15, 4, [], [], 20),
    L('i-u04-l04', 'ielts-unit-04', 4, '科技与AI话题', 'AI replacing jobs, social media impact —— 2026最高频', 'writing', 15, 4, [], [], 20),
    L('i-u04-l05', 'ielts-unit-04', 5, '环境话题', 'Individual vs Government, climate change, carbon-neutral', 'writing', 15, 4, [], [], 20),
    L('i-u04-l06', 'ielts-unit-04', 6, '教育话题', 'Online vs classroom, financial literacy in schools', 'writing', 15, 4, [], [], 20),
    L('i-u04-l07', 'ielts-unit-04', 7, '社会与城市化话题', 'Rich-poor gap, aging population, small town decline', 'writing', 15, 4, [], [], 20),
    L('i-u04-l08', 'ielts-unit-04', 8, 'Conclusion + 全文练习', 'Restate position + Summary —— 绝不引入新观点', 'writing', 15, 3, [], [], 20),
    L('i-u04-l09', 'ielts-unit-04', 9, '写作模板化陷阱（重要）', '2026新规：模板化作文Task Response封顶4.0。如何写出自然的文章', 'writing', 12, 3, [], [], 15),
    L('i-u04-l10', 'ielts-unit-04', 10, 'Task 2 计时写作', '40分钟限时写一篇250+词Task 2', 'writing', 40, 4, [], [], 30),
  ],
};

const iU05 = {
  id: 'ielts-unit-05', level: 'ielts-prep' as const, order: 5,
  title: '雅思口语 Part 1', subtitle: '2026年5-8月真题题库训练',
  description: '基于2026年5-8月真实考题——Study/Work, Hometown, Accommodation + 13个新话题。每个回答2-3句，"观点+具体细节"。',
  icon: '💬', estimatedHours: 5, targetCEFR: 'B1' as const,
  skillsCovered: ['speaking', 'listening'] as CurriculumUnit['skillsCovered'],
  prerequisiteUnitId: null,
  lessons: [
    L('i-u05-l01', 'ielts-unit-05', 1, 'Part 1 评分标准与策略', '4项评分维度——每个回答2-3句，"观点+具体细节"', 'speaking', 10, 2, [], [], 10),
    L('i-u05-l02', 'ielts-unit-05', 2, '必考题：Study/Work', 'Are you a student or do you work? 每人必问的第一题', 'speaking', 10, 2, [], [], 15),
    L('i-u05-l03', 'ielts-unit-05', 3, '必考题：Hometown & Accommodation', 'Describe your hometown; House or apartment?', 'speaking', 10, 2, [], [], 15),
    L('i-u05-l04', 'ielts-unit-05', 4, '新话题：Singing, Tidiness, Science', '2026年5-8月换题季新话题', 'speaking', 12, 3, [], [], 15),
    L('i-u05-l05', 'ielts-unit-05', 5, '新话题：Watch, Parks, Websites', '遇到不熟悉的话题——用已知词汇描述', 'speaking', 12, 3, [], [], 15),
    L('i-u05-l06', 'ielts-unit-05', 6, '新话题：Space, Music, Dreams', '抽象话题的回答——具体化、个人化', 'speaking', 12, 3, [], [], 20),
    L('i-u05-l07', 'ielts-unit-05', 7, '自然回答 vs 背诵回答', '2026考官专门训练识别背诵答案。如何让回答听起来自然？', 'speaking', 12, 3, [], [], 15),
    L('i-u05-l08', 'ielts-unit-05', 8, 'Part 1 全真模拟', '随机抽取10个Part 1话题，逐题录音回听', 'speaking', 15, 3, [], [], 20),
  ],
};

const iU06 = {
  id: 'ielts-unit-06', level: 'ielts-prep' as const, order: 6,
  title: '雅思口语 Part 2 & 3', subtitle: 'Cue Card 2分钟独白 + 深度讨论',
  description: '基于2026年5-8月17个新Cue Card——人物/地点/物品/事件四大类，Story Chain法串联话题。Part 3用O-R-E方法展开抽象讨论。',
  icon: '🎤', estimatedHours: 6, targetCEFR: 'B1' as const,
  skillsCovered: ['speaking', 'vocabulary'] as CurriculumUnit['skillsCovered'],
  prerequisiteUnitId: null,
  lessons: [
    L('i-u06-l01', 'ielts-unit-06', 1, 'Part 2 结构：1分钟准备策略', '60秒内组织2分钟讲话——关键词笔记法', 'speaking', 10, 2, [], [], 10),
    L('i-u06-l02', 'ielts-unit-06', 2, '人物类Cue Card', 'A person in medical field / A business person you admire', 'speaking', 12, 3, [], [], 15),
    L('i-u06-l03', 'ielts-unit-06', 3, '地点类Cue Card', 'A boring place / A tall building / A place you traveled to', 'speaking', 12, 3, [], [], 15),
    L('i-u06-l04', 'ielts-unit-06', 4, '物品类Cue Card', 'Food in special situation / An animal / A traditional object', 'speaking', 12, 3, [], [], 15),
    L('i-u06-l05', 'ielts-unit-06', 5, '事件类Cue Card', 'Local news / Live sports / New activity / Power outage', 'speaking', 15, 4, [], [], 20),
    L('i-u06-l06', 'ielts-unit-06', 6, 'Part 3 深度讨论方法', 'O-R-E 法：Opinion → Reason → Example', 'speaking', 12, 3, [], [], 15),
    L('i-u06-l07', 'ielts-unit-06', 7, 'Part 3 高频议题', 'Technology & Society, Education, Environment', 'speaking', 15, 4, [], [], 20),
    L('i-u06-l08', 'ielts-unit-06', 8, 'Part 2+3 完整模拟', '抽Cue Card → 准备 → 2分钟讲话 → Part 3追问', 'speaking', 20, 4, [], [], 25),
  ],
};

const iU07 = {
  id: 'ielts-unit-07', level: 'ielts-prep' as const, order: 7,
  title: '学术词汇强化', subtitle: 'AWL 570词 + 话题词汇',
  description: 'Academic Word List (AWL) 570个学术高频词 + 2026年8大写作话题专项词汇。系统学习搭配（collocation）和同义替换。',
  icon: '📚', estimatedHours: 5, targetCEFR: 'B1' as const,
  skillsCovered: ['vocabulary', 'writing'] as CurriculumUnit['skillsCovered'],
  prerequisiteUnitId: null,
  lessons: [
    L('i-u07-l01', 'ielts-unit-07', 1, 'AWL Sublist 1-2', 'analyse, approach, assess, assume, authority, benefit 等', 'vocab', 12, 3, [], [], 15),
    L('i-u07-l02', 'ielts-unit-07', 2, 'AWL Sublist 3-4', 'alternative, circumstance, comment, compensate 等', 'vocab', 12, 3, [], [], 15),
    L('i-u07-l03', 'ielts-unit-07', 3, '学术搭配 Collocations', 'make progress, take responsibility, implement policies', 'vocab', 12, 3, [], [], 15),
    L('i-u07-l04', 'ielts-unit-07', 4, '科技与环境话题词汇', 'automation, biodiversity, carbon-neutral, sustainability', 'vocab', 12, 3, [], [], 15),
    L('i-u07-l05', 'ielts-unit-07', 5, '教育与社会话题词汇', 'pedagogy, curriculum, demographic, urbanization', 'vocab', 12, 3, [], [], 15),
    L('i-u07-l06', 'ielts-unit-07', 6, '词汇运用：从认识到使用', '如何把被动词汇转化为主动词汇——造句练习法', 'mixed', 12, 4, [], [], 20),
  ],
};

const iU08 = {
  id: 'ielts-unit-08', level: 'ielts-prep' as const, order: 8,
  title: '雅思备考策略与考场实战', subtitle: '考前7天冲刺 + 考场技巧',
  description: '基于2026年考试新规——机考为主、纸笔退出、One Skill Retake、模板化惩罚。全面掌握考场策略和常见错误避免。',
  icon: '🎯', estimatedHours: 3, targetCEFR: 'B1' as const,
  skillsCovered: ['vocabulary', 'grammar', 'listening', 'reading', 'writing', 'speaking'] as CurriculumUnit['skillsCovered'],
  prerequisiteUnitId: null,
  lessons: [
    L('i-u08-l01', 'ielts-unit-08', 1, '2026年考试新规解读', '机考为主/纸笔2026年6月退出/One Skill Retake/模板惩罚', 'mixed', 10, 2, [], [], 10),
    L('i-u08-l02', 'ielts-unit-08', 2, '考前7天冲刺计划', '每天4小时的7天备考安排——重点放在弱项和模考', 'mixed', 10, 2, [], [], 10),
    L('i-u08-l03', 'ielts-unit-08', 3, '听力考前提醒', '拼写错误=0分、信号词定位、放弃不纠结', 'listening', 10, 2, [], [], 10),
    L('i-u08-l04', 'ielts-unit-08', 4, '阅读时间管理', '20分钟/篇硬性分配、答题卡边做边填', 'reading', 10, 2, [], [], 10),
    L('i-u08-l05', 'ielts-unit-08', 5, '写作避坑指南', '5秒审题法、Task 2优先、避免模板化的策略', 'writing', 10, 3, [], [], 10),
    L('i-u08-l06', 'ielts-unit-08', 6, '口语考前准备', '当季题库全覆盖、换题季避开首场、自然表达', 'speaking', 10, 2, [], [], 10),
  ],
};

const iU09 = {
  id: 'ielts-unit-09', level: 'ielts-prep' as const, order: 9,
  title: '全真模考与诊断', subtitle: '完整4科模考 + 能力诊断',
  description: '完成完整雅思模考（听力+阅读+写作），AI评估写作，生成弱点分析报告和考前2周定制冲刺方案。',
  icon: '🏆', estimatedHours: 4, targetCEFR: 'B1' as const,
  skillsCovered: ['listening', 'reading', 'writing', 'speaking'] as CurriculumUnit['skillsCovered'],
  prerequisiteUnitId: null,
  lessons: [
    L('i-u09-l01', 'ielts-unit-09', 1, '全真模考：听力（30分钟）', '完整Section 1-4，只播一遍，计时作答', 'listening', 30, 4, [], [], 30),
    L('i-u09-l02', 'ielts-unit-09', 2, '全真模考：阅读（60分钟）', '3篇学术文章，40题，严格计时', 'reading', 60, 4, [], [], 30),
    L('i-u09-l03', 'ielts-unit-09', 3, '全真模考：写作（60分钟）', 'Task 1（20分钟）+ Task 2（40分钟），AI批改', 'writing', 60, 4, [], [], 30),
    L('i-u09-l04', 'ielts-unit-09', 4, 'AI诊断报告与冲刺计划', '分析模考数据 → 弱点雷达图 → 考前2周个性化复习计划', 'review', 15, 3, [], [], 25),
  ],
};

const ieltsPrepUnits = [iU01, iU02, iU03, iU04, iU05, iU06, iU07, iU08, iU09];

// ══════════════════════════════════════════════════════
// EXPORT
// ══════════════════════════════════════════════════════

export const CURRICULUM: Curriculum = {
  levels: [
    {
      id: 'beginner',
      title: '入门级',
      subtitle: 'CEFR A0→A1',
      description: '从零建立英语基础：字母音标、400核心词汇、简单句型、基础时态。来源：CEFR A1-A2 ESL Curriculum（Cambridge/Oxford/Pearson）',
      icon: '🌱',
      targetCEFR: 'A1',
      targetIELTS: '2.0–3.5',
      units: beginnerUnits,
    },
    {
      id: 'foundation',
      title: '基础级',
      subtitle: 'CEFR A1→A2',
      description: '系统构建语法体系（时态/比较级/情态动词/完成时/条件句/被动语态），词汇量800+，听说读写综合训练。来源：CEFR A2 Scope; Cambridge Empower A2',
      icon: '🌿',
      targetCEFR: 'A2',
      targetIELTS: '3.5–4.5',
      units: foundationUnits,
    },
    {
      id: 'ielts-prep',
      title: '雅思衔接级',
      subtitle: 'CEFR A2→B1+',
      description: '2026年真题题型精讲、5-8月口语题库、8大写作热点话题、AWL学术词汇、全真模考。来源：IDP 2026 Test Format, 2026 Speaking/Writing Topics',
      icon: '🎯',
      targetCEFR: 'B1',
      targetIELTS: '4.5–6.5+',
      units: ieltsPrepUnits,
    },
  ],
};
