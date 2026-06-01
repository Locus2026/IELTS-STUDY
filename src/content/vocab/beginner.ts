import type { VocabItem } from '@/types/curriculum';

export const beginnerVocab: VocabItem[] = [
  // Unit 1: Numbers & Colors
  ...[
    ['one','一','num.','/wʌn/','I have one brother.','我有一兄弟。','beginner','beginner-unit-01',['numbers']],
    ['two','二','num.','/tuː/','I have two hands.','我有两只手。','beginner','beginner-unit-01',['numbers']],
    ['three','三','num.','/θriː/','There are three books.','有三本书。','beginner','beginner-unit-01',['numbers']],
    ['five','五','num.','/faɪv/','Give me five minutes.','给我五分钟。','beginner','beginner-unit-01',['numbers']],
    ['ten','十','num.','/ten/','I waited for ten minutes.','我等了十分钟。','beginner','beginner-unit-01',['numbers']],
    ['twenty','二十','num.','/ˈtwen.ti/','She is twenty years old.','她二十岁。','beginner','beginner-unit-01',['numbers']],
    ['hundred','一百','num.','/ˈhʌn.drəd/','A hundred people came.','来了一百人。','beginner','beginner-unit-01',['numbers']],
    ['red','红色','adj.','/red/','She wore a red dress.','她穿了一条红裙子。','beginner','beginner-unit-01',['colors']],
    ['blue','蓝色','adj.','/bluː/','The sky is blue.','天空是蓝色的。','beginner','beginner-unit-01',['colors']],
    ['green','绿色','adj.','/ɡriːn/','The grass is green.','草是绿色的。','beginner','beginner-unit-01',['colors']],
    ['yellow','黄色','adj.','/ˈjel.əʊ/','She likes yellow flowers.','她喜欢黄色的花。','beginner','beginner-unit-01',['colors']],
    ['white','白色','adj.','/waɪt/','Snow is white.','雪是白色的。','beginner','beginner-unit-01',['colors']],
    ['black','黑色','adj.','/blæk/','He has a black cat.','他有一只黑猫。','beginner','beginner-unit-01',['colors']],
  ].map(([w,c,p,ph,ex,exc,lv,un,tg]) => ({
    id: `v-${w}`, word: w as string, chinese: c as string, partOfSpeech: p as string,
    phonetic: ph as string, exampleSentence: ex as string, exampleChinese: exc as string,
    level: lv as VocabItem['level'], unit: un as string, tags: tg as string[],
  })),

  // Unit 2: People & Life
  ...[
    ['father','父亲','n.','/ˈfɑː.ðər/','My father is a teacher.','我父亲是一名老师。','beginner','beginner-unit-02',['family']],
    ['mother','母亲','n.','/ˈmʌð.ər/','Her mother cooks very well.','她母亲做饭很好吃。','beginner','beginner-unit-02',['family']],
    ['brother','兄弟','n.','/ˈbrʌð.ər/','I have two brothers.','我有两个兄弟。','beginner','beginner-unit-02',['family']],
    ['sister','姐妹','n.','/ˈsɪs.tər/','His sister is very kind.','他的姐妹很善良。','beginner','beginner-unit-02',['family']],
    ['family','家庭','n.','/ˈfæm.əl.i/','I love my family.','我爱我的家人。','beginner','beginner-unit-02',['family']],
    ['head','头','n.','/hed/','Nod your head.','点一下头。','beginner','beginner-unit-02',['body']],
    ['hand','手','n.','/hænd/','Wash your hands.','洗一下手。','beginner','beginner-unit-02',['body']],
    ['eye','眼睛','n.','/aɪ/','She has beautiful eyes.','她有一双美丽的眼睛。','beginner','beginner-unit-02',['body']],
    ['ear','耳朵','n.','/ɪər/','Rabbits have long ears.','兔子有长耳朵。','beginner','beginner-unit-02',['body']],
    ['mouth','嘴巴','n.','/maʊθ/','Open your mouth.','张开嘴。','beginner','beginner-unit-02',['body']],
    ['shirt','衬衫','n.','/ʃɜːt/','He wears a white shirt.','他穿一件白衬衫。','beginner','beginner-unit-02',['clothes']],
    ['dress','连衣裙','n.','/dres/','She bought a new dress.','她买了一条新裙子。','beginner','beginner-unit-02',['clothes']],
    ['shoes','鞋子','n.','/ʃuːz/','I need new shoes.','我需要新鞋子。','beginner','beginner-unit-02',['clothes']],
    ['rice','米饭','n.','/raɪs/','I eat rice every day.','我每天吃米饭。','beginner','beginner-unit-02',['food']],
    ['bread','面包','n.','/bred/','I had bread for breakfast.','我早餐吃了面包。','beginner','beginner-unit-02',['food']],
    ['milk','牛奶','n.','/mɪlk/','Drink some milk.','喝点牛奶。','beginner','beginner-unit-02',['food']],
    ['water','水','n.','/ˈwɔː.tər/','I need a glass of water.','我需要一杯水。','beginner','beginner-unit-02',['food']],
    ['egg','鸡蛋','n.','/eɡ/','I had an egg for breakfast.','我早餐吃了一个鸡蛋。','beginner','beginner-unit-02',['food']],
    ['house','房子','n.','/haʊs/','This is my house.','这是我的房子。','beginner','beginner-unit-02',['home']],
    ['room','房间','n.','/ruːm/','My room is small.','我的房间很小。','beginner','beginner-unit-02',['home']],
    ['bed','床','n.','/bed/','Go to bed early.','早点上床睡觉。','beginner','beginner-unit-02',['home']],
    ['table','桌子','n.','/ˈteɪ.bəl/','The book is on the table.','书在桌子上。','beginner','beginner-unit-02',['home']],
  ].map(([w,c,p,ph,ex,exc,lv,un,tg]) => ({
    id: `v-${w}`, word: w as string, chinese: c as string, partOfSpeech: p as string,
    phonetic: ph as string, exampleSentence: ex as string, exampleChinese: exc as string,
    level: lv as VocabItem['level'], unit: un as string, tags: tg as string[],
  })),
];
