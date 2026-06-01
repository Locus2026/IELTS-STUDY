interface PlacementQuestion {
  id: string;
  stem: string;
  options: string[];
  correctAnswer: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  audioText?: string;
  playCount?: number;
}

function v(id: string, stem: string, opts: string[], correct: string, d: 1|2|3|4|5 = 3, audio?: string): PlacementQuestion {
  return { id: `p-${id}`, stem, options: opts, correctAnswer: correct, difficulty: d, audioText: audio, playCount: 0 };
}

const vocabQuestions: PlacementQuestion[] = [
  v('v01', '"Apple" 的中文意思是？', ['苹果', '香蕉', '橘子', '葡萄'], '苹果', 1),
  v('v02', '"Happy" 的反义词是？', ['Sad', 'Angry', 'Tired', 'Hungry'], 'Sad', 1),
  v('v03', '选择正确的拼写：', ['beautiful', 'beautifull', 'beautifull', 'beutiful'], 'beautiful', 1),
  v('v04', '"Important" 最接近的意思是？', ['Significant', 'Interesting', 'Difficult', 'Beautiful'], 'Significant', 2),
  v('v05', '"She is very ___." 空格中最合适的词是？', ['smart', 'run', 'quickly', 'under'], 'smart', 1),
  v('v06', '"Environment" 的中文意思是？', ['环境', '设备', '娱乐', '入口'], '环境', 2),
  v('v07', '选择意思不同的词：', ['happy', 'glad', 'sad', 'joyful'], 'sad', 2),
  v('v08', '"Opportunity" 的正确中文解释是？', ['机会', '反对', '操作', '选择'], '机会', 2),
  v('v09', '以下哪个词表示 "减少"？', ['decrease', 'increase', 'improve', 'develop'], 'decrease', 2),
  v('v10', '"The weather is pleasant today." "pleasant" 的意思是？', ['令人愉快的', '令人讨厌的', '令人紧张的', '令人困惑的'], '令人愉快的', 2),
  v('v11', '"Comprehensive" 最接近的意思是？', ['thorough', 'short', 'simple', 'expensive'], 'thorough', 3),
  v('v12', '"He is very diligent." "diligent" 表示？', ['勤奋的', '懒惰的', '聪明的', '勇敢的'], '勤奋的', 3),
  v('v13', '"Significant" 的近义词是？', ['considerable', 'trivial', 'temporary', 'similar'], 'considerable', 3),
  v('v14', '"She elaborated on her plan." "elaborated" 的意思是？', ['详细说明', '简化', '取消', '推迟'], '详细说明', 3),
  v('v15', '"The results were ambiguous." "ambiguous" 表示？', ['模糊的', '明确的', '积极的', '消极的'], '模糊的', 4),
  v('v16', '"He gave a concise summary." "concise" 的意思是？', ['简洁的', '冗长的', '复杂的', '有趣的'], '简洁的', 3),
  v('v17', '"The policy will alleviate poverty." "alleviate" 的近义词是？', ['reduce', 'increase', 'maintain', 'ignore'], 'reduce', 4),
  v('v18', '"Her hypothesis was confirmed." "hypothesis" 的意思是？', ['假设', '结论', '实验', '理论'], '假设', 4),
  v('v19', '选择拼写正确的词：', ['accommodation', 'accomodation', 'acommodation', 'acomodation'], 'accommodation', 3),
  v('v20', '"The lecture was very insightful." "insightful" 表示？', ['有洞见的', '无聊的', '简短的', '困难的'], '有洞见的', 4),
];

const grammarQuestions: PlacementQuestion[] = [
  v('g01', 'She ___ a student.', ['is', 'are', 'am', 'be'], 'is', 1),
  v('g02', 'There ___ many books on the table.', ['are', 'is', 'am', 'be'], 'are', 1),
  v('g03', 'I ___ to school every day.', ['go', 'goes', 'going', 'gone'], 'go', 1),
  v('g04', 'He ___ TV now.', ['is watching', 'watches', 'watch', 'watched'], 'is watching', 2),
  v('g05', 'She ___ already finished her homework.', ['has', 'have', 'had', 'having'], 'has', 2),
  v('g06', 'If I ___ rich, I would travel the world.', ['were', 'am', 'was', 'be'], 'were', 3),
  v('g07', 'The book ___ by Mark Twain.', ['was written', 'wrote', 'written', 'is writing'], 'was written', 2),
  v('g08', 'I have been studying English ___ three years.', ['for', 'since', 'during', 'in'], 'for', 2),
  v('g09', '___ you like some coffee?', ['Would', 'Will', 'Are', 'Do'], 'Would', 2),
  v('g10', 'The movie was ___ than I expected.', ['better', 'good', 'best', 'well'], 'better', 2),
  v('g11', 'Neither he nor his friends ___ there.', ['were', 'was', 'is', 'be'], 'were', 3),
  v('g12', 'She suggested that he ___ early.', ['arrive', 'arrives', 'arrived', 'arriving'], 'arrive', 4),
  v('g13', 'Hardly ___ when the phone rang.', ['had I arrived', 'I had arrived', 'I arrived', 'did I arrive'], 'had I arrived', 4),
  v('g14', 'Not only ___ but she also sings.', ['does she dance', 'she dances', 'she dance', 'dance she'], 'does she dance', 4),
  v('g15', 'The man ___ car was stolen is my neighbor.', ['whose', 'who', 'which', 'that'], 'whose', 3),
  v('g16', 'By next year, I ___ here for 10 years.', ['will have been', 'will be', 'am', 'have been'], 'will have been', 4),
  v('g17', 'She asked me where ___.', ['I lived', 'did I live', 'I live', 'do I live'], 'I lived', 3),
  v('g18', 'It is essential that everyone ___ the meeting.', ['attend', 'attends', 'attended', 'attending'], 'attend', 4),
  v('g19', 'I wish I ___ harder for the exam.', ['had studied', 'studied', 'study', 'would study'], 'had studied', 3),
  v('g20', 'Were it not for his help, I ___.', ['would have failed', 'will fail', 'would fail', 'failed'], 'would have failed', 4),
];

const listeningQuestions: PlacementQuestion[] = [
  v('l01', '请听音频，然后选择听到的时间。', ['3:30', '2:30', '4:30', '3:00'], '3:30', 1, 'The meeting is at three thirty PM.'),
  v('l02', '请听音频，说话者建议去哪里？', ['图书馆', '餐厅', '公园', '超市'], '图书馆', 1, 'Let us go to the library.'),
  v('l03', '请听音频，今天的天气怎么样？', ['晴天温暖', '下雨', '下雪', '阴天'], '晴天温暖', 1, 'It is sunny and warm today.'),
  v('l04', '请听音频，说话者来自哪个城市？', ['悉尼', '伦敦', '纽约', '多伦多'], '悉尼', 2, 'I am from Sydney, Australia.'),
  v('l05', '请听音频，商品的价格是多少？', ['15美元', '50美元', '5美元', '25美元'], '15美元', 1, 'That will be fifteen dollars.'),
  v('l06', '请听音频，这个人为什么迟到了？', ['交通拥堵', '睡过头', '忘记时间', '车坏了'], '交通拥堵', 2, 'Sorry I am late, the traffic was terrible.'),
  v('l07', '请听音频，他们周末计划做什么？', ['徒步', '看电影', '购物', '在家休息'], '徒步', 2, 'We are going hiking on Saturday.'),
  v('l08', '请听音频，说话者心情如何？', ['紧张', '兴奋', '无聊', '生气'], '紧张', 2, 'I am really nervous about the presentation.'),
  v('l09', '请听音频，这是什么类型的广播？', ['航班登机', '火车晚点', '公交车到站', '商店促销'], '航班登机', 2, 'Flight eight forty seven to Tokyo is now boarding at Gate twelve.'),
  v('l10', '请听音频，说话者的职业是什么？', ['教师', '医生', '工程师', '律师'], '教师', 2, 'I have been teaching English for ten years.'),
  v('l11', '请听音频，这段对话发生在哪里？', ['酒店', '餐厅', '机场', '商店'], '酒店', 3, 'I would like to check in, please. I have a reservation.'),
  v('l12', '请听音频，说话者持什么态度？', ['持保留意见', '完全同意', '非常兴奋', '不感兴趣'], '持保留意见', 3, 'To be honest, I think the plan needs more work.'),
  v('l13', '请听音频，论文的截止日期是？', ['下周五', '本周四', '下周四', '本周五'], '下周五', 3, 'The essay is due next Friday, not this Thursday.'),
  v('l14', '请听音频，这次讲座的主题是什么？', ['气候变化的经济影响', '全球变暖的历史', '经济政策改革', '环境保护法'], '气候变化的经济影响', 4, 'Today\'s lecture will focus on climate change and its economic impact.'),
  v('l15', '请听音频，说话者在暗示什么？', ['可能但需要更多支持', '完全不可能', '马上就可以开始', '已经放弃了这个想法'], '可能但需要更多支持', 4, 'I would not say it is impossible, but we need more time and resources.'),
];

export function getPlacementQuestions(section: 'vocab' | 'grammar' | 'listening'): PlacementQuestion[] {
  const map = { vocab: vocabQuestions, grammar: grammarQuestions, listening: listeningQuestions };
  return map[section];
}
