import type { LessonContent } from '@/types/lesson-content';

// ══════════════════════════════════════════════════════
// LESSON CONTENT DATABASE (keyed by lesson ID)
// Each lesson follows the 6-step standard structure:
// objectives → knowledge → example → practice → summary → vocabReview
// ══════════════════════════════════════════════════════

export const LESSON_CONTENTS: Record<string, LessonContent> = {

  // ── BEGINNER: Unit 1 Lesson 1 ──
  'b-u01-l01': {
    objectives: ['认识26个英文字母的名称和大小写', '区分5个元音字母和21个辅音字母', '掌握A-G的字母顺序和发音'],
    knowledge: [
      {
        title: '字母表概览',
        body: '英语字母表共有 **26个字母**，分为大写（uppercase）和小写（lowercase）。每个字母有自己独特的名称（name）和发音（sound）。\n\n字母名称 ≠ 字母发音。例如字母 C 名称念作 /siː/，但在 cat 中它发 /k/ 音。',
        tip: '把26个字母分成三组来记：A-G（7个）、H-P（9个）、Q-Z（10个），每组一次记完。',
      },
      {
        title: '五个元音字母 — 单词发音的核心',
        body: '**A、E、I、O、U** 是元音字母。每个英语单词必须至少包含一个元音字母。\n\n元音字母的关键特点：\n- 发音时气流不受阻碍\n- 可以独立构成音节（如 I、a）\n- 同一个元音字母在不同单词中可能发不同的音',
        warning: 'Y 比较特殊：在 yes 中它是辅音，在 fly 中它当元音用。这个以后会学到。',
      },
      {
        title: '二十一个辅音字母',
        body: 'B, C, D, F, G, H, J, K, L, M, N, P, Q, R, S, T, V, W, X, Y, Z',
      },
    ],
    example: {
      intro: '看下面的表格，注意每个字母的大写、小写和名称读音：',
      question: '| 大写 | 小写 | 名称 | 类似中文音 |\n|------|------|------|----------|\n| A | a | /eɪ/ | 诶 |\n| B | b | /biː/ | 比 |\n| C | c | /siː/ | 西 |\n| D | d | /diː/ | 迪 |\n| E | e | /iː/ | 伊 |',
      correctAnswer: '',
      explanation: '试着大声读出每个字母的名称。注意 A、E、I、O、U 这五个元音的名称都是以元音开头的。',
    },
    practice: [
      {
        type: 'multiple-choice',
        instruction: '选择正确的字母：',
        questions: [
          { id: 'q1', stem: '字母表中第一个字母是？', options: ['B', 'A', 'C', 'D'], correctAnswer: 'A', explanation: 'A 是英语字母表第一个字母。' },
          { id: 'q2', stem: '以下哪个是元音字母？', options: ['B', 'C', 'A', 'D'], correctAnswer: 'A', explanation: 'A 是五个元音字母（A E I O U）之一。' },
          { id: 'q3', stem: '最后一个字母是？', options: ['X', 'Y', 'Z', 'W'], correctAnswer: 'Z', explanation: 'Z 是第26个也是最后一个字母。' },
          { id: 'q4', stem: '"C" 的名称读作？', options: ['/keɪ/', '/siː/', '/biː/', '/diː/'], correctAnswer: '/siː/', explanation: 'C 的名称是 /siː/（西），但发音可能不同。' },
        ],
      },
      {
        type: 'fill-blank',
        instruction: '填入缺少的字母：',
        questions: [
          { id: 'q5', stem: 'A, B, ___, D, E', correctAnswer: 'C', explanation: '字母表顺序：A, B, C, D, E。' },
          { id: 'q6', stem: 'B 是第 ___ 个字母', correctAnswer: '2', acceptableAnswers: ['二', 'two'], explanation: 'B 排在 A 后面，是第二个字母。' },
        ],
      },
    ],
    summary: [
      '英语字母表共26个字母，分大小写',
      '5个元音字母：A E I O U，是单词发音的核心',
      '每个字母有名称（name）和发音（sound），两者不同',
      '记忆技巧：分三组记忆（A-G / H-P / Q-Z）',
    ],
    vocabReview: [
      { word: 'alphabet', phonetic: '/ˈæl.fə.bet/', chinese: '字母表', example: 'The English alphabet has 26 letters.' },
      { word: 'letter', phonetic: '/ˈlet.ər/', chinese: '字母', example: 'Write the letter A.' },
      { word: 'vowel', phonetic: '/vaʊəl/', chinese: '元音', example: 'A is a vowel.' },
      { word: 'consonant', phonetic: '/ˈkɒn.sə.nənt/', chinese: '辅音', example: 'B is a consonant.' },
    ],
  },

  // ── BEGINNER: Unit 3 Lesson 1 ──
  'b-u03-l01': {
    objectives: ['掌握 "I am + 名词/形容词" 的基本句型', '学会用 I am 介绍自己的身份和状态', '理解 I\'m 是 I am 的口语缩写形式'],
    knowledge: [
      {
        title: '"I am" 是什么？',
        body: '"**I am**" 是英语中最基本的句型之一，意思是"我是"或"我在"。\n\n它可以用来：\n1. **介绍身份** → I am + 名词\n2. **描述状态** → I am + 形容词\n3. **说明来源** → I am from + 地点',
        tip: '中文说"我是学生"，英语说"I am a student"——注意英语要加 a/an！',
      },
      {
        title: '句型结构',
        body: '**I am + 名词**（介绍身份）\n- I am a student. 我是一名学生。\n- I am a teacher. 我是一名老师。\n\n**I am + 形容词**（描述状态）\n- I am happy. 我很开心。\n- I am tired. 我累了。\n\n**I am from + 地点**（说明来源）\n- I am from China. 我来自中国。',
        warning: 'I 永远搭配 am，不能说 "I is" 或 "I are"！这是初学者最容易犯的错误。',
      },
      {
        title: '口语缩写：I\'m',
        body: '在日常对话中，I am 通常缩写为 **I\'m**：\n- I\'m a student. = I am a student.\n- I\'m happy. = I am happy.\n- I\'m from China. = I am from China.\n\n在正式写作（如雅思写作 Task 2）中，建议用完整形式 **I am**。',
      },
    ],
    example: {
      intro: '下面是一段用 I am 句型的自我介绍。读一遍，看看你能理解多少：',
      question: 'Hello! My name is Li Ming. **I am a student.** I am from Beijing. **I am 20 years old.** I am interested in music and sports. **I am very happy** to meet you!',
      correctAnswer: '',
      explanation: '这段自我介绍用了4次 I am 句型：介绍身份（a student）、说明来源（from Beijing）、说明年龄（20 years old）、表达感受（very happy）。试着用同样的模板介绍你自己！',
      highlights: [
        { text: 'I am a student.', note: '身份：I am + 名词' },
        { text: 'I am from Beijing.', note: '来源：I am from + 地点' },
        { text: 'I am 20 years old.', note: '年龄：I am + 数字 + years old' },
        { text: 'I am very happy.', note: '感受：I am + 形容词' },
      ],
    },
    practice: [
      {
        type: 'fill-blank',
        instruction: '用 I am / I\'m 完成句子：',
        questions: [
          { id: 'q1', stem: '___ a student.', correctAnswer: 'I am', acceptableAnswers: ['I\'m', 'i am', 'i\'m'], explanation: '"I am a student." 我是学生。' },
          { id: 'q2', stem: '___ from Shanghai.', correctAnswer: 'I am', acceptableAnswers: ['I\'m', 'i am', 'i\'m'], explanation: '"I am from Shanghai." 我来自上海。' },
          { id: 'q3', stem: '___ very tired today.', correctAnswer: 'I am', acceptableAnswers: ['I\'m', 'i am', 'i\'m'], explanation: '"I am very tired today." 我今天很累。' },
        ],
      },
    ],
    summary: [
      'I am + 名词 = 介绍身份 → I am a student.',
      'I am + 形容词 = 描述状态 → I am happy.',
      'I am from + 地点 = 说明来源 → I am from China.',
      '口语中 I am 缩写为 I\'m，正式写作建议用完整形式',
    ],
    vocabReview: [
      { word: 'student', phonetic: '/ˈstjuː.dənt/', chinese: '学生', example: 'I am a student.' },
      { word: 'happy', phonetic: '/ˈhæp.i/', chinese: '开心的', example: 'I am happy.' },
      { word: 'tired', phonetic: '/taɪəd/', chinese: '疲惫的', example: 'I am tired.' },
    ],
  },

  // ── BEGINNER: Unit 1 Lesson 8 (speaking) ──
  'b-u01-l08': {
    objectives: ['学会用英语打招呼和回应问候', '掌握 Good morning/afternoon/evening 的使用时机', '能用 How are you? 和对方寒暄'],
    knowledge: [
      {
        title: '基础问候语',
        body: '| 英文 | 中文 | 使用时机 |\n|------|------|---------|\n| Hello! / Hi! | 你好 | 任何时候 |\n| Good morning! | 早上好 | 中午12点前 |\n| Good afternoon! | 下午好 | 中午12点到傍晚 |\n| Good evening! | 晚上好 | 傍晚到睡前 |\n| Good night! | 晚安 | 睡觉前（告别用） |',
        warning: 'Good night 不是见面问候语！它是"晚安"，用在睡觉前告别。晚上见面要说 Good evening。',
      },
      {
        title: 'How are you? — 最常用的寒暄',
        body: '"How are you?" 是英语中最常用的问候方式，意思是"你好吗？"\n\n**常见回答**：\n- I\'m fine, thank you. — 我很好，谢谢。（最标准）\n- I\'m good, thanks. — 挺好的，谢谢。（较口语）\n- Not bad. — 还行。\n- Great! — 非常好！\n\n**注意**：对方回答后，可以说 "And you?" 反问对方。',
      },
    ],
    example: {
      intro: '这是一段典型的初次见面对话：',
      question: 'A: Hello! How are you?\nB: I\'m fine, thank you. And you?\nA: I\'m good, thanks. Nice to meet you!\nB: Nice to meet you too!',
      explanation: '初次见面先说 Hello 或 Hi，然后互相问 How are you，寒暄之后说 Nice to meet you（很高兴认识你）。对方回复 Nice to meet you too。',
    },
    practice: [
      {
        type: 'multiple-choice',
        instruction: '选择合适的问候语：',
        questions: [
          { id: 'q1', stem: '早上见到朋友，你应该说：', options: ['Good night', 'Good morning', 'Good evening', 'Goodbye'], correctAnswer: 'Good morning', explanation: '早上的问候是 Good morning。' },
          { id: 'q2', stem: '"How are you?" 的合适回答：', options: ['I am 20.', 'I am fine, thank you.', 'I am a student.', 'I am from China.'], correctAnswer: 'I am fine, thank you.', explanation: 'How are you 问的是"你好吗"，回答应该说你状态好不好。' },
          { id: 'q3', stem: '第一次见面结束时应说：', options: ['Good night!', 'See you!', 'Nice to meet you!', 'Goodbye forever!'], correctAnswer: 'Nice to meet you!', explanation: '初次见面说 Nice to meet you（很高兴认识你）是最合适的。' },
        ],
      },
    ],
    summary: [
      '早上: Good morning | 下午: Good afternoon | 晚上见面: Good evening | 睡前: Good night',
      'How are you? 回答：I\'m fine / I\'m good / Not bad',
      '初次见面：Nice to meet you → Nice to meet you too',
    ],
  },

  // ── FOUNDATION: Unit 1 Lesson 1 (past tense regular verbs) ──
  'f-u01-l01': {
    objectives: ['理解一般过去时的使用场景', '掌握规则动词 +ed 的四种拼写规则', '掌握过去式 ed 的三种发音（/t/ /d/ /ɪd/）'],
    knowledge: [
      {
        title: '什么是一般过去时？',
        body: '一般过去时（Simple Past Tense）用来描述**过去某个时间已经发生并结束的动作**。\n\n中文说"我昨天去了超市"，"去了"= 过去。英语说 "I **went** to the supermarket yesterday."，went 就是 go 的过去式。\n\n**标志词**：yesterday, last week, last year, in 2020, ago, this morning（如果已经是下午）',
      },
      {
        title: '规则动词过去式：+ed 的四条规则',
        body: '**规则1**：大多数动词直接 +ed\n→ work → worked, play → played, clean → cleaned\n\n**规则2**：以 e 结尾，只 +d\n→ like → liked, live → lived, close → closed\n\n**规则3**：辅音字母 + y 结尾，变 y 为 i + ed\n→ study → studied, try → tried, carry → carried\n\n**规则4**：重读闭音节，双写末尾辅音 + ed\n→ stop → stopped, plan → planned, drop → dropped',
        tip: '判断"重读闭音节"：一个元音字母 + 一个辅音字母结尾，且重音在最后一个音节。例如 stop（/stɒp/），o 后只有一个 p，且是重读 → stopped。',
      },
      {
        title: 'ed 的三种发音',
        body: '/t/ — 清辅音后：worked, stopped, watched\n/d/ — 浊辅音和元音后：played, cleaned, lived\n/ɪd/ — t/d 音后：wanted, needed, started',
        warning: '发音是关键！很多学习者把所有 ed 都读成 /ɪd/，这是错误的。规则是：只有 t 和 d 结尾的词才加 /ɪd/。',
      },
    ],
    example: {
      intro: '看下面一段昨天发生的事情，注意过去式动词：',
      question: 'Yesterday, I **walked** to the park. I **played** basketball with my friends. Then I **studied** English for two hours. I **stopped** at a cafe and **ordered** a coffee. I **enjoyed** the day very much.',
      explanation: '这段文字用了6个规则动词过去式。注意 walked (/t/)、played (/d/)、studied (/d/，study 变 y 为 i)、stopped (/t/，双写 p)、ordered (/d/)、enjoyed (/d/)。',
      highlights: [
        { text: 'walked', note: '/wɔːkt/ — ed 发 /t/' },
        { text: 'played', note: '/pleɪd/ — ed 发 /d/' },
        { text: 'studied', note: 'study → studied，y 变 i' },
        { text: 'stopped', note: 'stop → stopped，双写 p' },
      ],
    },
    practice: [
      { type: 'fill-blank', instruction: '写出下列动词的过去式：',
        questions: [
          { id: 'q1', stem: 'work → ___', correctAnswer: 'worked', explanation: '大多数动词直接 +ed：work → worked。' },
          { id: 'q2', stem: 'like → ___', correctAnswer: 'liked', explanation: '以 e 结尾只 +d：like → liked。' },
          { id: 'q3', stem: 'study → ___', correctAnswer: 'studied', explanation: '辅音+y：变 y 为 i + ed → studied。' },
          { id: 'q4', stem: 'stop → ___', correctAnswer: 'stopped', explanation: '重读闭音节双写尾字母：stop → stopped。' },
        ],
      },
    ],
    summary: [
      '一般过去时 = 主语 + 动词过去式，表示过去的动作',
      '规则动词过去式 = 原形 + ed（有四条特殊规则）',
      'ed 有三种发音：/t/ /d/ /ɪd/，取决于原形动词的尾音',
      '标志词：yesterday, last..., ...ago, in 2020 等',
    ],
    vocabReview: [
      { word: 'yesterday', phonetic: '/ˈjes.tər.deɪ/', chinese: '昨天', example: 'I went there yesterday.' },
      { word: 'worked', phonetic: '/wɜːkt/', chinese: '工作（过去式）', example: 'She worked late.' },
      { word: 'studied', phonetic: '/ˈstʌd.id/', chinese: '学习（过去式）', example: 'He studied hard.' },
    ],
  },

  // ── IELTS PREP: Reading - True/False/Not Given ──
  'i-u02-l02': {
    objectives: ['理解 True/False/Not Given 三种答案的定义', '掌握区分 False 和 Not Given 的关键技巧', '避免常见的判断陷阱（绝对词、推测、常识干扰）'],
    knowledge: [
      {
        title: '什么是 T/F/NG？',
        body: '**True** = 题目陈述与文章内容**一致**（原文明确说了同样的事）\n**False** = 题目陈述与文章内容**相反**（原文明确说了不同的事）\n**Not Given** = 文章中**根本没有提到**这个信息（既不确认也不否认）\n\n> 这是雅思阅读中中国考生失分最多的题型。',
        tip: '做题时不要用你的常识或知识去判断！只根据文章内容判断。文章中没说的就是 Not Given。',
      },
      {
        title: 'False vs Not Given — 核心区别',
        body: '| | False | Not Given |\n|------|-------|----------|\n| **文章有没有提到这个信息？** | 有，但是相反 | 完全没有提到 |\n| **例子** | 文章："Apples are red." 题目："Apples are blue." → **False** | 文章："Apples are red." 题目："Apples are sweet." → **Not Given** |\n\n关键问题：文章有没有直接提到这个信息？有 → 看是否一致。没有 → Not Given。',
        warning: '最常见的错误：用自己的常识判断。例如文章没有提到"太阳从东方升起"，但题目这样说——你可能会选 True，因为你"知道"这是对的。但如果文章没提，就是 Not Given！',
      },
      {
        title: '三大陷阱',
        body: '**陷阱1：绝对词**\n文章："Some people prefer tea." 题目："All people prefer tea." → **False**（some ≠ all）\n\n**陷阱2：比较级**\n文章："Tea is popular." 题目："Tea is more popular than coffee." → **Not Given**（文章没有和咖啡比较）\n\n**陷阱3：时间变化**\n文章："In 2020, the population was 10 million." 题目："The population is 10 million now." → **Not Given**（文章没说现在是多少）',
      },
    ],
    example: {
      intro: '阅读以下短文，然后判断后面三道题：',
      question: '**文章**：Coffee is one of the most popular drinks in the world. It was first discovered in Ethiopia. Today, Brazil is the largest producer of coffee, followed by Vietnam. Many people drink coffee to stay alert because it contains caffeine.',
      correctAnswer: '',
      explanation: '',
      highlights: [
        { text: 'was first discovered in Ethiopia', note: '注意"first"限定词和过去时' },
        { text: 'Brazil is the largest producer', note: '最高级 — Brazil 是最大生产国' },
        { text: 'followed by Vietnam', note: '越南排第二' },
      ],
    },
    practice: [
      { type: 'multiple-choice', instruction: '根据上面的文章，判断以下陈述：',
        questions: [
          { id: 'q1', stem: 'Coffee was first discovered in Ethiopia.', options: ['True', 'False', 'Not Given'], correctAnswer: 'True', explanation: '文章明确说"It was first discovered in Ethiopia"。' },
          { id: 'q2', stem: 'Vietnam produces more coffee than Brazil.', options: ['True', 'False', 'Not Given'], correctAnswer: 'False', explanation: '文章说 Brazil 是最大生产国，Vietnam 排第二 → Vietnam 产量比 Brazil 少，题目说"more"是错的。' },
          { id: 'q3', stem: 'Coffee is more popular than tea in China.', options: ['True', 'False', 'Not Given'], correctAnswer: 'Not Given', explanation: '文章没有提到中国，也没有把咖啡和茶在中国进行比较。' },
        ],
      },
    ],
    summary: [
      'True = 文章说了，和题目一致',
      'False = 文章说了，和题目相反',
      'Not Given = 文章根本没提这件事',
      '不要用自己的常识判断！只看文章说了什么',
      '注意绝对词（all/never）、比较级、时间限定',
    ],
  },

  // ── IELTS PREP: Writing Task 2 - Technology & AI topic ──
  'i-u04-l04': {
    objectives: ['了解科技/AI类雅思写作话题的常见出题角度', '掌握该话题的核心词汇和搭配', '能用PEEL段落法写一段关于AI利弊的论证'],
    knowledge: [
      {
        title: '2026年科技话题高频出题角度',
        body: '1. **AI 替代人类工作** — AI replacing human jobs: advantage or disadvantage?\n2. **社交媒体对社会关系的影响** — connecting people or making us isolated?\n3. **在线教育 vs 传统课堂** — can online replace classroom learning?\n4. **科技对隐私的威胁** — surveillance, data collection, privacy concerns\n5. **自动化与就业市场** — automation, job displacement, reskilling',
        tip: '2026年最高频：AI + jobs。准备这个角度，至少能应对30%的科技类题目。',
      },
      {
        title: '核心词汇库（必背）',
        body: '| 词汇 | 用法 |\n|------|------|\n| automation | 自动化（生产过程）|\n| artificial intelligence (AI) | 人工智能 |\n| algorithm | 算法 |\n| to displace workers | 取代工人 |\n| to reskill the workforce | 对劳动力进行再培训 |\n| digital literacy | 数字素养 |\n| to bridge the digital divide | 弥合数字鸿沟 |\n| technological unemployment | 技术性失业 |',
      },
      {
        title: 'PEEL 段落框架（科技话题示例）',
        body: '**P** (Point): AI will inevitably displace many routine jobs.\n**E** (Explanation): This is because machines can perform repetitive tasks faster and more accurately than humans.\n**E** (Example): For instance, in manufacturing, robots now assemble cars with greater precision than human workers ever could.\n**L** (Link back): Therefore, while AI brings efficiency, governments must prepare for the social impact of job losses.',
        warning: '2026年新规：模板化作文 Task Response 封顶 Band 4.0。PEEL 是一个思维框架，不是填词模板——每个句子应该自然衔接。',
      },
    ],
    example: {
      intro: '阅读这个 PEEL 段落示例，注意每个环节是如何自然过渡的：',
      question: '**题目**：Some people believe artificial intelligence will bring more benefits than problems. Do you agree?\n\n**Body 段落**：\nOn the one hand, artificial intelligence has the potential to greatly improve efficiency across many industries. Machines powered by AI can process vast amounts of data in seconds and perform repetitive tasks without fatigue. For example, in the healthcare sector, AI diagnostic tools can already detect certain cancers with higher accuracy than human doctors. This means that AI not only saves time but can also save lives. It is clear, therefore, that the benefits of AI in fields like medicine are substantial.',
      explanation: '注意段落结构：Point（效率提升）→ Explanation（处理数据+不知疲倦）→ Example（医疗诊断癌症）→ Link back（好处是实质性的）。每个环节之间的过渡很自然 — "This means that" → "It is clear, therefore, that"。',
    },
    practice: [
      { type: 'fill-blank', instruction: '填入合适的科技话题词汇：',
        questions: [
          { id: 'q1', stem: 'Many factory workers have been ___ by automated machines.', correctAnswer: 'displaced', explanation: '"displaced" = 被取代。Many workers have been displaced by automation.' },
          { id: 'q2', stem: 'Governments should invest in programs to ___ the workforce.', correctAnswer: 'reskill', explanation: '"reskill" = 再培训。Workers need to be reskilled for the digital economy.' },
        ],
      },
    ],
    summary: [
      '科技/AI 是2026年雅思写作最高频话题',
      '必背核心词：automation, displace, reskill, digital literacy',
      'PEEL 段落是思维框架，不是填词模板',
      '每个例子的作用是"证明你的观点成立"，不是"展示你知道这个例子"',
    ],
  },

  // ── Default fallback ──
  '_default': {
    objectives: ['理解本课的核心概念', '能够独立完成课后练习', '为下一课的学习做好准备'],
    knowledge: [
      {
        title: '本课知识点',
        body: '本课内容正在精心准备中。我们的内容团队正在根据最新雅思考试动态和 CEFR 标准编写课程内容。',
        tip: '你可以先跳到其他已完成的课程学习，或者查看备考指南获取全面的备考信息。',
      },
    ],
    example: {
      intro: '',
      question: '',
      explanation: '请先完成有详细内容的课程。',
    },
    practice: [],
    summary: ['本课内容即将上线'],
  },
};

export function getLessonContent(lessonId: string): LessonContent {
  return LESSON_CONTENTS[lessonId] || LESSON_CONTENTS['_default'];
}
