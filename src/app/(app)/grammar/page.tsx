'use client';

import { useState } from 'react';
import { useUserStore } from '@/stores/user-store';
import { useIsHydrated } from '@/providers/providers';
import { Lightbulb, AlertTriangle, ChevronDown, ChevronRight, Target } from 'lucide-react';

interface GrammarPoint {
  id: string; title: string; level: string; ieltsUse: string;
  rules: { title: string; body: string }[];
  examples: string[];
  mistake: { wrong: string; right: string; note: string };
  extraMistakes?: { wrong: string; right: string; note: string }[];
  exercises: { stem: string; options?: string[]; answer: string; explanation: string }[];
}

const GRAMMAR: GrammarPoint[] = [

  // ═══ A0-A1: 基础时态和句型 ═══
  { id:'g-be',title:'Be 动词',level:'A0-A1',ieltsUse:'Speaking Part 1 自我介绍、Writing 基本句型',
    rules:[
      {title:'基本规则',body:'**I am / He/She/It is / We/You/They are**\n\n口语缩写：I am → I\'m, He is → He\'s, They are → They\'re\n否定：I am not → I\'m not, He is not → He isn\'t, They are not → They aren\'t'},
      {title:'IELTS 考查方式',body:'Speaking Part 1 必问："Are you a student or do you work?" — 回答需要用 I am...\nWriting 开头段：It is widely believed that... / There is no doubt that...'},
    ],
    examples:['I am a university student.','She is from London.','They are very helpful.','It is important to protect the environment.','There is a significant difference between the two approaches.'],
    mistake:{wrong:'I is a student.',right:'I am a student.',note:'I 永远搭配 am，不能搭配 is 或 are。'},
    extraMistakes:[
      {wrong:'She is go to school.',right:'She goes to school.',note:'be动词后面不能直接跟动词原形。'},
      {wrong:'There have many people.',right:'There are many people.',note:'There be 句型用 be 动词，不用 have。'},
    ],
    exercises:[
      {stem:'She ___ a teacher.',options:['is','are','am','be'],answer:'is',explanation:'第三人称单数 She 搭配 is。'},
      {stem:'There ___ many reasons for this.',options:['is','are','have','has'],answer:'are',explanation:'reasons 是复数，用 There are。'},
      {stem:'I ___ not sure about that.',options:['is','are','am','be'],answer:'am',explanation:'I 永远搭配 am。'},
    ],
  },
  { id:'g-present-simple',title:'一般现在时',level:'A0-A1',ieltsUse:'Speaking 描述习惯、Writing 陈述事实',
    rules:[
      {title:'基本规则',body:'**I/You/We/They + 动词原形 | He/She/It + 动词-s/es**\n\n否定：don\'t / doesn\'t + 原形\n疑问：Do/Does + 主语 + 原形？'},
      {title:'IELTS 用法',body:'写作中陈述普遍事实：The data **shows** a clear trend.\n口语中描述日常生活：I usually **get up** at 7.\n听力中区分第三人称单数：录音中的 s 音很关键。'},
    ],
    examples:['The graph shows a significant increase.','Many people believe that education is important.','She works for a multinational company.','This essay argues that governments should take action.'],
    mistake:{wrong:'He work hard.',right:'He works hard.',note:'第三人称单数必须加 -s。这是中国考生最常见的语法错误之一。'},
    exercises:[
      {stem:'The chart ___ (show) the percentage of people who own cars.',answer:'shows',explanation:'The chart 是第三人称单数，show → shows。'},
      {stem:'Many experts ___ (believe) that climate change is accelerating.',answer:'believe',explanation:'Many experts 是复数，believe 用原形。'},
    ],
  },

  // ═══ A1-A2: 时态扩展 ═══
  { id:'g-past-simple',title:'一般过去时',level:'A1-A2',ieltsUse:'Speaking Part 2 描述过去经历、Writing Task 1 描述历史数据',
    rules:[
      {title:'基本规则',body:'规则动词 +ed（worked, played, studied）；不规则动词逐个记（go→went, have→had, see→saw, eat→ate, make→made）。\n否定：didn\'t + 原形。疑问：Did + 主语 + 原形？'},
      {title:'IELTS Task 1 用法',body:'描述过去数据：In 2010, the figure **stood** at 20%.\n描述变化：The number **increased** dramatically between 2000 and 2010.\n最高频不规则动词在 Task 1：rise→rose, fall→fell, grow→grew, see→saw'},
    ],
    examples:['In 2015, the population reached 50 million.','The price fell sharply between 2008 and 2010.','I went to Beijing last summer.','The policy was introduced in 2020.'],
    mistake:{wrong:'Did you went there?',right:'Did you go there?',note:'疑问句 Did 后面用动词原形，不用过去式。'},
    extraMistakes:[
      {wrong:'The number rised.',right:'The number rose.',note:'rise 是不规则动词，过去式是 rose，不是 rised。'},
    ],
    exercises:[
      {stem:'The figure ___ (rise) from 20% to 35% between 2000 and 2010.',answer:'rose',explanation:'rise 的过去式是 rose（不规则）。'},
      {stem:'In 1990, the number of students ___ (stand) at 5,000.',answer:'stood',explanation:'stand 的过去式是 stood。Task 1 高频句式：stood at + 数字。'},
    ],
  },
  { id:'g-present-perfect',title:'现在完成时',level:'A2-B1',ieltsUse:'Writing Task 2 讨论持续至今的趋势、Speaking 谈经历',
    rules:[
      {title:'基本规则',body:'**have/has + 过去分词**\n表示 1)过去的经历 2)持续到现在的动作 3)对现在有影响的动作。\n标志词：ever, never, just, already, yet, since, for, recently, so far'},
      {title:'与一般过去时的区别',body:'一般过去时 = 过去发生且已结束，有具体时间（yesterday, in 2010, last week）\n现在完成时 = 与"现在"有关联：\n- I have visited London.（经历，不强调何时）\n- I visited London in 2019.（具体时间，用过去时）'},
      {title:'IELTS 写作高频用法',body:'In recent years, there **has been** a dramatic increase in...\nTechnology **has changed** the way we communicate.\nGovernments **have introduced** new policies to address this issue.'},
    ],
    examples:['In recent years, there has been a significant shift towards online learning.','Scientists have discovered new evidence about climate change.','I have never been to Europe.','The government has implemented several measures to reduce pollution.'],
    mistake:{wrong:'I have went there.',right:'I have gone there.',note:'完成时用过去分词，go → gone，不是 went。'},
    extraMistakes:[
      {wrong:'I have seen him yesterday.',right:'I saw him yesterday.',note:'有具体过去时间(yesterday)用一般过去时，不用完成时。'},
    ],
    exercises:[
      {stem:'In recent years, there ___ (be) a dramatic increase in online shopping.',answer:'has been',explanation:'In recent years 是现在完成时标志，there 后用 has been。'},
      {stem:'I ___ never ___ (visit) a foreign country.',answer:'have visited',explanation:'ever/never 通常搭配现在完成时：have never visited。'},
    ],
  },

  // ═══ B1: 冠词、情态、比较 ═══
  { id:'g-articles',title:'冠词 a/an/the（雅思高频考点）',level:'A2-B1',ieltsUse:'Writing 中冠词错误直接拉低 Grammatical Range 分数',
    rules:[
      {title:'基本规则',body:'**a/an** = 泛指，第一次提到，可数名词单数\n**the** = 特指，双方都知道的，上文提过的，独一无二的\n**零冠词** = 复数/不可数名词的泛指，专有名词'},
      {title:'最容易出错的情况',body:'1. 可数名词单数不能"裸奔"——必须有 a/an/the 或物主代词\n   ❌ I bought book. → ✅ I bought a book.\n2. 抽象概念/泛指复数不用 the\n   ❌ The technology is important. → ✅ Technology is important.\n3. 独一无二的事物用 the\n   ✅ the sun, the internet, the environment, the government'},
      {title:'Task 2 常见冠词错误',body:'❌ Government should take action.\n✅ The government should take action.（特指某个/某国的政府）'},
    ],
    examples:['The internet has transformed education.','Technology plays a crucial role in modern society.','I saw a movie last night. The movie was excellent.','Education is the key to success.'],
    mistake:{wrong:'She is a engineer.',right:'She is an engineer.',note:'元音音素前用 an——engineer 以元音 /e/ 开头。看发音，不看字母。'},
    extraMistakes:[
      {wrong:'The pollution is a serious problem.',right:'Pollution is a serious problem.',note:'泛指 pollution 时不用 the。但特指"某个城市的污染"时可以说 the pollution in Beijing。'},
    ],
    exercises:[
      {stem:'___ government should invest more in education.',options:['A','The','An','(不用冠词)'],answer:'The',explanation:'特指政府，用 The。'},
      {stem:'He is ___ honest person.',options:['a','an','the','(不用冠词)'],answer:'an',explanation:'honest 的 h 不发音，以元音 /ɒ/ 开头，用 an。'},
    ],
  },
  { id:'g-modals-full',title:'情态动词全解析',level:'A2-B1',ieltsUse:'Writing Task 2 表达建议/推测/义务、Speaking Part 3 表达观点',
    rules:[
      {title:'用法总览',body:'| 情态动词 | 用法 | IELTS 场景 |\n|---------|------|----------|\n| **can** | 能力/可能性 | Can individuals make a difference? |\n| **could** | 过去能力/礼貌请求/可能性 | This could lead to serious consequences. |\n| **may/might** | 可能性（不确定） | It may be argued that... |\n| **must** | 必须/肯定推测 | Governments must take action. |\n| **should** | 建议 | Schools should focus on practical skills. |\n| **would** | 假设/委婉 | It would be beneficial to... |'},
      {title:'IELTS Writing 句型模板',body:'Governments **should** invest more in renewable energy.\nThis **could** have serious implications for society.\nIt **might** be argued that the benefits outweigh the drawbacks.\nIndividuals **must** take responsibility for their own health.'},
    ],
    examples:['Governments must address this issue urgently.','It could be argued that technology has both benefits and drawbacks.','Students should be taught practical skills.','If more people recycled, it would make a significant difference.'],
    mistake:{wrong:'You must to go.',right:'You must go.',note:'情态动词后直接跟动词原形，不加 to。'},
    exercises:[
      {stem:'Governments ___ take immediate action to tackle climate change.',options:['must','must to','should to','could to'],answer:'must',explanation:'must + 动词原形，不加 to。'},
      {stem:'This policy ___ have a negative impact on small businesses.',options:['could','could to','should to','must to'],answer:'could',explanation:'could + 动词原形，表示可能性。'},
    ],
  },
  { id:'g-comparatives-full',title:'比较级与最高级',level:'A2-B1',ieltsUse:'Task 1 数据对比必备、Task 2 论证比较',
    rules:[
      {title:'变化规则',body:'单音节：+er / +est → bigger, the biggest\n双音节：-y 结尾 → -ier / -iest → happier, the happiest\n多音节：more/the most + 原级 → more expensive, the most expensive\n不规则：good→better→best, bad→worse→worst, far→farther→farthest'},
      {title:'Task 1 必用句型',body:'X was **higher than** Y.\nX was **the highest** among all categories.\nX was **twice as high as** Y.\nX was **significantly lower than** Y.'},
    ],
    examples:['The number of cars was higher than the number of buses.','China had the highest percentage of internet users.','The figure was twice as high as that of the previous year.','This is far more important than most people realize.'],
    mistake:{wrong:'This is more better than that.',right:'This is better than that.',note:'good 的比较级是 better，不能加 more——"more better" 是双重比较，语法错误。'},
    exercises:[
      {stem:'The cost of living in Beijing is ___ (high) than in most other Chinese cities.',answer:'higher',explanation:'单音节词 +er：high → higher。'},
      {stem:'This was the ___ (significant) change observed during the period.',answer:'most significant',explanation:'多音节词用 the most：significant → the most significant。'},
    ],
  },

  // ═══ B1-B2: 雅思核心语法 ═══
  { id:'g-passive-full',title:'被动语态（Academic Writing 核心）',level:'B1-B2',ieltsUse:'Task 1 描述图表/流程、Task 2 学术表达',
    rules:[
      {title:'基本结构',body:'**be + 过去分词**\n\n时态变化：\n- 现在：is/are + done\n- 过去：was/were + done\n- 完成：has/have been + done\n- 将来：will be + done'},
      {title:'Task 1 流程图必用',body:'The raw materials **are collected** and **transported** to the factory.\nThe products **are then packaged** and **distributed** to retailers.\nThe liquid **is heated** to 100 degrees.'},
      {title:'Task 2 学术表达',body:'It **is widely believed** that education is the key to success.\nNew policies **have been introduced** to address this issue.\nMore research **needs to be conducted** in this area.'},
    ],
    examples:['The book was written in 1990.','English is spoken in many countries.','The project will be completed next year.','It can be seen that the number increased dramatically.'],
    mistake:{wrong:'The bridge was build in 2010.',right:'The bridge was built in 2010.',note:'被动语态 = be + 过去分词。build 的过去分词是 built，不是 build。'},
    extraMistakes:[
      {wrong:'It was happened yesterday.',right:'It happened yesterday.',note:'happen 是不及物动词，不能用于被动语态。'},
    ],
    exercises:[
      {stem:'The goods ___ (transport) to warehouses across the country.',answer:'are transported',explanation:'被动语态：are + 过去分词 transported。'},
      {stem:'It ___ (believe) that technology will continue to advance.',answer:'is believed',explanation:'It is believed that... = 人们相信...。写作高频句型。'},
    ],
  },
  { id:'g-conditionals-full',title:'条件句（四种类型）',level:'B1-B2',ieltsUse:'Task 2 论证假设和结果、Speaking Part 3 深入讨论',
    rules:[
      {title:'四种条件句',body:'**Zero**: If + 现在时, 现在时 → 事实/规律\n  If you heat ice, it melts.\n\n**First**: If + 现在时, will → 真实可能\n  If the government invests more, the economy will improve.\n\n**Second**: If + 过去时, would → 假设/不太可能\n  If people used public transport more, traffic would decrease.\n\n**Third**: If + had done, would have done → 对过去的假设\n  If the policy had been implemented earlier, the crisis could have been avoided.'},
      {title:'IELTS 写作黄金句型',body:'If governments **took** stricter measures, pollution levels **would decrease**.\nIf more funding **were allocated** to education, society **would benefit** greatly.\nIf the trend **continues**, the figure **will reach** 50% by 2030.'},
    ],
    examples:['If people recycled more, the environment would benefit.','If the government invested in public transport, traffic would be reduced.','If I were the president, I would focus on education.','If we had acted earlier, the damage could have been prevented.'],
    mistake:{wrong:'If I will see him, I will tell him.',right:'If I see him, I will tell him.',note:'条件从句中用现在时，不用 will。主句才用 will。'},
    exercises:[
      {stem:'If the government ___ (invest) more in education, society would benefit.',answer:'invested',explanation:'Second Conditional：从句用过去时 invested，主句用 would。'},
      {stem:'If current trends ___ (continue),the figure will double by 2050.',answer:'continue',explanation:'First Conditional：从句用现在时 continue，主句用 will。'},
    ],
  },
  { id:'g-relative',title:'关系从句',level:'B1-B2',ieltsUse:'Writing 增加句子复杂度、Reading 理解长难句',
    rules:[
      {title:'引导词用法',body:'**who** = 指人 | **which** = 指物 | **that** = 人+物（通用）\n**whose** = 所属关系 | **where** = 地点 | **when** = 时间\n\n限定性（不加逗号）：The book **that I read** was great.\n非限定性（加逗号）：Beijing, **which is the capital**, is a large city.'},
      {title:'IELTS 写作运用',body:'Students **who study abroad** gain valuable experience.\nThe chart shows data **which was collected over ten years**.\nThere are several reasons **why this trend has occurred**.'},
    ],
    examples:['The man who lives next door is a doctor.','The book that I read last week was fascinating.','Beijing, which is the capital of China, has over 20 million residents.','This is the reason why I chose this topic.'],
    mistake:{wrong:'The man which I saw.',right:'The man who/that I saw.',note:'指人用 who 或 that，不能只用 which。'},
    exercises:[
      {stem:'Students ___ study abroad often become more independent.',options:['which','who','whose','where'],answer:'who',explanation:'指人（students），用 who。'},
      {stem:'The data, ___ was collected in 2025, shows a clear trend.',options:['who','what','which','whom'],answer:'which',explanation:'指物（data），非限定性从句用 which。'},
    ],
  },

  // ═══ B2-C1: 高分语法 ═══
  { id:'g-subjunctive',title:'虚拟语气 (Band 7+)',level:'B2-C1',ieltsUse:'Task 2 表达强烈的建议/要求/假设',
    rules:[
      {title:'常见句型',body:'**It is essential/vital/crucial that + 主语 + (should) + 动词原形**\n\nIt is essential that the government **take** action.\nIt is vital that every child **have** access to education.\nI suggest that he **study** harder.\n\n注意：第三人称单数也不加 -s！'},
      {title:'wish / if only',body:'I wish I **had** more time. (现在的不现实愿望 → 过去式)\nI wish I **had studied** harder. (对过去的遗憾 → had done)\nIf only the government **would listen**.'},
    ],
    examples:['It is crucial that the government address this issue immediately.','I wish I had started learning English earlier.','It is recommended that students be given more practical training.'],
    mistake:{wrong:'It is important that he studies hard.',right:'It is important that he study hard.',note:'虚拟语气中，第三人称也用动词原形 study，不加 -s。'},
    exercises:[
      {stem:'It is essential that every student ___ (have) access to the internet.',answer:'have',explanation:'虚拟语气：It is essential that... 后面用动词原形 have。'},
      {stem:'I wish I ___ (know) the answer earlier.',answer:'had known',explanation:'对过去的虚拟：wish + had done。'},
    ],
  },
  { id:'g-inversion',title:'倒装句 (Band 7+)',level:'B2-C1',ieltsUse:'Task 2 展现语法丰富度，大幅提升 Grammatical Range 分数',
    rules:[
      {title:'常见倒装结构',body:'**Not only... but also...**\nNot only does technology save time, but it also improves efficiency.\n\n**Only by/Only when/Only if**\nOnly by working together can we solve this problem.\n\n**So... that...** (倒装)\nSo serious is the problem that immediate action is needed.\n\n**Rarely/Seldom/Never**\nRarely do people consider the long-term consequences.'},
    ],
    examples:['Not only does education provide knowledge, but it also develops critical thinking.','Only by taking immediate action can we prevent further damage.','So rapid has the change been that many cannot adapt.','Rarely do governments prioritize environmental protection over economic growth.'],
    mistake:{wrong:'Not only it saves time, but it also improves efficiency.',right:'Not only does it save time, but it also improves efficiency.',note:'Not only 在句首时，句子需要部分倒装（助动词提前）。'},
    exercises:[
      {stem:'Not only ___ (do) technology save time, but it also creates new jobs.',answer:'does',explanation:'Not only 句首 → 部分倒装：does technology save...'},
    ],
  },
  { id:'g-participle',title:'分词短语 (Band 7+)',level:'B2-C1',ieltsUse:'Task 2 使句子更紧凑、Writing 展现高级语法',
    rules:[
      {title:'现在分词（-ing）',body:'表示主动或同时进行的动作\n**Having considered** both sides, I believe the advantages outweigh the disadvantages.\n**Looking at** the data more closely, we can see a clear pattern.\n\n**过去分词（-ed）**\n表示被动或完成的动作\n**Written in** 2020, the report highlights several issues.\n**Compared with** the previous year, the figure increased by 20%.'},
    ],
    examples:['Having analysed the data, we can draw several conclusions.','Compared with other countries, China has made significant progress.','Faced with this challenge, governments must take action.'],
    mistake:{wrong:'Compare with last year, the number increased.',right:'Compared with last year, the number increased.',note:'分词短语修饰主句主语——用过去分词 Compared，不是原形 Compare。'},
    exercises:[
      {stem:'___ (compare) with the previous decade, carbon emissions have fallen significantly.',answer:'Compared',explanation:'分词短语开头，被动含义用过去分词 Compared。'},
    ],
  },
  { id:'g-gerund-inf',title:'动名词 vs 不定式',level:'B1-B2',ieltsUse:'全科通用——避免"中式英语"动词搭配错误',
    rules:[
      {title:'必须用 doing 的动词',body:'enjoy, avoid, consider, suggest, recommend, practise, finish, mind, imagine, involve\n\n✅ I enjoy **reading**.\n✅ We should avoid **making** the same mistake.\n✅ The job involves **travelling** frequently.'},
      {title:'必须用 to do 的动词',body:'want, hope, decide, plan, agree, refuse, promise, afford, manage, tend\n\n✅ I want **to improve** my English.\n✅ The government decided **to invest** in education.\n✅ People tend **to use** social media more often.'},
      {title:'两者都可以但意思不同',body:'remember to do = 记得要去做（未做）\nremember doing = 记得做过（已做）\nstop to do = 停下来去做另一件事\nstop doing = 停止做某事'},
    ],
    examples:['I enjoy learning new languages.','The government should consider investing more in healthcare.','Many people want to live in big cities.','We need to address this problem urgently.'],
    mistake:{wrong:'I enjoy to read books.',right:'I enjoy reading books.',note:'enjoy 后面只能跟 doing，不能跟 to do。'},
    exercises:[
      {stem:'We should avoid ___ (make) the same mistakes.',answer:'making',explanation:'avoid + doing：avoid making。'},
      {stem:'The government plans ___ (introduce) new regulations.',answer:'to introduce',explanation:'plan + to do：plans to introduce。'},
    ],
  },
  { id:'g-prepositions',title:'介词搭配',level:'B1-B2',ieltsUse:'Listening Section 1-2 填空题必考、写作中搭配错误扣分',
    rules:[
      {title:'时间介词',body:'**at** + 具体时间：at 3 PM, at noon, at night\n**on** + 具体某天：on Monday, on May 1st, on the weekend\n**in** + 时间段：in the morning, in May, in 2025, in the past'},
      {title:'常见动词+介词搭配（IELTS高频）',body:'depend **on** | focus **on** | lead **to** | result **in** | contribute **to**\ncompare **with/to** | relate **to** | deal **with** | belong **to**\ninvest **in** | succeed **in** | participate **in** | believe **in**'},
    ],
    examples:['The meeting is at 3 PM on Friday.','This leads to several problems.','We need to focus on the main issue.','The policy resulted in significant changes.'],
    mistake:{wrong:'It depends from the situation.',right:'It depends on the situation.',note:'depend 固定搭配 on，不是 from——这是中文"取决于"的直译错误。'},
    exercises:[
      {stem:'This could lead ___ serious consequences.',options:['to','in','on','for'],answer:'to',explanation:'lead to = 导致。固定搭配。'},
      {stem:'We should focus ___ the most important issues first.',options:['on','in','at','to'],answer:'on',explanation:'focus on = 专注于。'},
    ],
  },
  { id:'g-cohesion',title:'衔接手段 (Cohesive Devices)',level:'B1-B2',ieltsUse:'Writing Coherence & Cohesion 评分直接关联',
    rules:[
      {title:'分类用法',body:'**递进**: Furthermore, Moreover, In addition, Additionally\n**转折**: However, Nevertheless, On the other hand, In contrast\n**因果**: Therefore, Consequently, As a result, Hence\n**举例**: For instance, For example, Such as, To illustrate\n**总结**: In conclusion, To sum up, Overall, In summary'},
      {title:'IELTS 写作关键原则',body:'不要机械堆砌连接词！每个连接词必须有逻辑含义。\n❌ Firstly... Secondly... Finally... In conclusion...（模板化！）\n✅ 用代词指代、同义替换、过渡句来自然衔接'},
    ],
    examples:['Furthermore, technology has transformed education.','However, there are also significant drawbacks.','As a result, many people choose to work from home.','For instance, in China, the number of internet users has grown dramatically.'],
    mistake:{wrong:'Although it is expensive, but I want to buy it.',right:'Although it is expensive, I want to buy it.',note:'Although 和 but 不能同时使用——这是中式英语的典型错误。'},
    exercises:[
      {stem:'Technology has many benefits. ___, it also has some drawbacks.',options:['However','Therefore','Moreover','For instance'],answer:'However',explanation:'前后文是转折关系，用 However。'},
    ],
  },

  // ═══ Advanced IELTS-only ═══
  { id:'g-nominalization',title:'名词化 (Nominalization)',level:'C1',ieltsUse:'Task 2 Band 7+ 必备——学术写作的核心特征',
    rules:[
      {title:'什么是名词化',body:'把动词/形容词变成名词，让文章更正式、更学术。\n\nThe population **is growing** rapidly.\n→ The rapid **growth** of the population...\n\nTechnology **has developed** quickly.\n→ The rapid **development** of technology...'},
      {title:'常见名词化转换',body:'improve → improvement\ndevelop → development\nincrease → increase (词形不变)\nreduce → reduction\napply → application\nanalyse → analysis\nrespond → response\nfail → failure'},
    ],
    examples:['The rapid development of technology has changed society.','The reduction in carbon emissions was significant.','The government\'s response to the crisis was swift.'],
    mistake:{wrong:'The develop of technology is fast.',right:'The development of technology is rapid.',note:'develop 是动词，development 是名词。名词化用名词。'},
    exercises:[
      {stem:'The rapid ___ (grow) of cities has caused many problems.',answer:'growth',explanation:'grow 的名词形式是 growth——The rapid growth of cities...'},
    ],
  },
];

// ══════════════════════════════════════════════════════

function generateExercises(point: GrammarPoint) {
  return point.exercises;
}

export default function GrammarPage() {
  const hydrated = useIsHydrated();
  const user = useUserStore((s) => s);
  const userCEFR = user.placementTest?.estimatedCEFR || 'A1';

  const [selectedPoint, setSelectedPoint] = useState<GrammarPoint | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [expandedLevel, setExpandedLevel] = useState('A2-B1');

  const levels = ['A0-A1','A1-A2','A2-B1','B1-B2','B2-C1','C1'];
  const groupedByLevel = (lvl: string) => GRAMMAR.filter(p => p.level === lvl);

  if (!hydrated) return <div className="p-8"><div className="animate-pulse h-64 bg-gray-200 rounded-2xl" /></div>;

  return (
    <div className="max-w-5xl mx-auto p-4 lg:p-6 pb-20">
      <h1 className="text-2xl font-bold mb-2">语法系统</h1>
      <p className="text-gray-500 mb-6">
        共 {GRAMMAR.length} 个语法点 · 按 CEFR 分级 · 标注 IELTS 考查方式 · 你的水平：<span className="text-brand-600 font-medium">{userCEFR}</span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          {levels.map(lvl => {
            const pts = groupedByLevel(lvl);
            if (!pts.length) return null;
            const isExpanded = expandedLevel === lvl;
            return (
              <div key={lvl} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button onClick={() => setExpandedLevel(isExpanded ? '' : lvl)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium hover:bg-gray-50">
                  <span>{lvl} ({pts.length})</span>
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                {isExpanded && pts.map(p => (
                  <button key={p.id} onClick={() => { setSelectedPoint(p); setAnswers({}); setSubmitted({}); }}
                    className={`w-full text-left px-4 py-2 text-sm border-t border-gray-50 transition-colors ${
                      selectedPoint?.id === p.id ? 'bg-brand-50 text-brand-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
                    }`}>{p.title}</button>
                ))}
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-3">
          {selectedPoint ? (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full">{selectedPoint.level}</span>
                  <Target className="w-3 h-3 text-brand-500" />
                  <span className="text-xs text-brand-600">{selectedPoint.ieltsUse}</span>
                </div>
                <h2 className="font-semibold text-xl mt-2 mb-4">{selectedPoint.title}</h2>

                {selectedPoint.rules.map((r, i) => (
                  <div key={i} className="mb-4">
                    <h4 className="font-medium text-sm text-gray-800 mb-1">{r.title}</h4>
                    <div className="text-sm text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: r.body
                        .replace(/\*\*(.+?)\*\*/g,'<strong class="text-brand-700">$1</strong>')
                        .replace(/\n\n/g,'</p><p class="text-sm text-gray-700 mb-2">')
                        .replace(/\n/g,'<br/>')
                        .replace(/\| (.+) \|/g, m => m.includes('---') ? '' : '<tr>'+m.split('|').filter(c=>c.trim()).map(c=>`<td class="border border-gray-200 px-2 py-1 text-sm">${c.trim()}</td>`).join('')+'</tr>')
                      }} />
                  </div>
                ))}

                <h4 className="font-medium text-sm text-gray-500 mt-4 mb-2">例句</h4>
                <div className="space-y-1 mb-4">
                  {selectedPoint.examples.map((ex, i) => (
                    <p key={i} className="text-sm text-gray-700 pl-3 border-l-2 border-brand-300">{ex}</p>
                  ))}
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="text-amber-800 font-medium mb-1">常见错误</p>
                      <p className="text-red-600 line-through text-xs">{selectedPoint.mistake.wrong}</p>
                      <p className="text-green-600 font-medium text-xs">→ {selectedPoint.mistake.right}</p>
                      <p className="text-amber-700 text-xs mt-1">{selectedPoint.mistake.note}</p>
                    </div>
                  </div>
                </div>

                {selectedPoint.extraMistakes?.map((em, i) => (
                  <div key={i} className="bg-amber-50/50 border border-amber-100 rounded-xl p-3 mb-2">
                    <div className="flex items-start gap-2 text-xs">
                      <AlertTriangle className="w-3 h-3 text-amber-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-red-500 line-through">{em.wrong}</span>
                        <span className="mx-1">→</span>
                        <span className="text-green-600 font-medium">{em.right}</span>
                        <span className="text-gray-500 ml-1">— {em.note}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Exercises */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-semibold mb-4">随堂练习（{selectedPoint.exercises.length} 题）</h3>
                <div className="space-y-3">
                  {generateExercises(selectedPoint).map((q, i) => {
                    const qId = `${selectedPoint.id}-q${i}`;
                    const isSubmitted = submitted[qId];
                    const userAnswer = answers[qId] || '';
                    const isCorrect = userAnswer.trim().toLowerCase() === q.answer.trim().toLowerCase();
                    return (
                      <div key={qId} className={`border rounded-xl p-4 ${isSubmitted ? (isCorrect ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50') : 'border-gray-100'}`}>
                        <p className="text-sm font-medium mb-2">{q.stem}</p>
                        {q.options ? (
                          <div className="space-y-1.5 mb-2">
                            {q.options.map((opt, j) => (
                              <button key={j} disabled={isSubmitted}
                                onClick={() => { setAnswers(p=>({...p,[qId]:opt})); setSubmitted(p=>({...p,[qId]:true})); }}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm border transition-all ${
                                  isSubmitted && opt===q.answer ? 'border-green-400 bg-green-100' :
                                  isSubmitted && opt===userAnswer && opt!==q.answer ? 'border-red-300 bg-red-100' :
                                  opt===userAnswer ? 'border-brand-400 bg-brand-50' : 'border-gray-100 hover:border-gray-300'
                                }`}>
                                <span className="text-xs text-gray-400 mr-2">{String.fromCharCode(65+j)}.</span>{opt}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="flex gap-2 mb-2">
                            <input type="text" value={userAnswer} disabled={isSubmitted}
                              onChange={e=>setAnswers(p=>({...p,[qId]:e.target.value}))}
                              onKeyDown={e=>{if(e.key==='Enter'&&!isSubmitted&&userAnswer.trim())setSubmitted(p=>({...p,[qId]:true}));}}
                              className={`flex-1 px-3 py-2 border rounded-lg text-sm ${isSubmitted ? (isCorrect?'border-green-300 bg-green-50':'border-red-300 bg-red-50') : 'border-gray-200'}`}
                              placeholder="输入答案..." />
                            {!isSubmitted && <button onClick={()=>userAnswer.trim()&&setSubmitted(p=>({...p,[qId]:true}))} className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm">确定</button>}
                          </div>
                        )}
                        {isSubmitted && (
                          <p className={`text-xs p-2 rounded-lg ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {isCorrect ? '✅' : `❌ 正确答案：${q.answer}`} {q.explanation}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <div className="text-5xl mb-4">📐</div>
              <p className="text-gray-500">从左侧选择语法点开始</p>
              <p className="text-sm text-gray-400 mt-2">共 {GRAMMAR.length} 个语法点 · 每个标注了 IELTS 考查方式 · 配 2-3 道练习题</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
