'use client';

import { createUtterance } from '@/lib/tts';
import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { RefreshCw, BookmarkPlus, Lightbulb, Library, Languages, Volume2, X } from 'lucide-react';
import { useNotesStore } from '@/stores/notes-store';

// Mini dictionary for word lookup
// Chinese dictionary cache (uses our API route: dictionary API + DeepSeek translation)
const DICT_CACHE: Record<string,{chinese:string;phonetic:string;pos:string;example?:string;audioUrl?:string}|null> = {};
async function fetchDefinition(word: string): Promise<{chinese:string;phonetic:string;pos:string;example?:string;audioUrl?:string}> {
  const key = word.toLowerCase();
  if (DICT_CACHE[key]) return DICT_CACHE[key]!;
  if (DICT_CACHE[key] === null) return {chinese:'未找到',phonetic:'',pos:'',audioUrl:''};
  try {
    const res = await fetch(`/api/ai/dictionary?word=${encodeURIComponent(key)}`);
    if (!res.ok) throw new Error('not found');
    const data = await res.json();
    DICT_CACHE[key] = data; return data;
    return data;
  } catch {
    DICT_CACHE[key] = null;
    return {chinese:'未找到',phonetic:'',pos:''};
  }
}

// Legacy mini-dict for common IELTS words
const MINI_DICT: Record<string,{chinese:string;phonetic:string;pos:string}> = {
  // Passage 1: The Decline of Cash
  'declined':{chinese:'下降/减少',phonetic:'/dɪˈklaɪnd/',pos:'v.'},
  'dramatically':{chinese:'急剧地/显著地',phonetic:'/drəˈmætɪkli/',pos:'adv.'},
  'transition':{chinese:'转变/过渡',phonetic:'/trænˈzɪʃən/',pos:'n.'},
  'transactions':{chinese:'交易',phonetic:'/trænˈzækʃənz/',pos:'n.'},
  'accelerated':{chinese:'加速',phonetic:'/əkˈseləreɪtɪd/',pos:'v.'},
  'minimise':{chinese:'最小化/减少',phonetic:'/ˈmɪnɪmaɪz/',pos:'v.'},
  'physical':{chinese:'身体的/实体的',phonetic:'/ˈfɪzɪkəl/',pos:'adj.'},
  'digital':{chinese:'数字的',phonetic:'/ˈdɪdʒɪtəl/',pos:'adj.'},
  'advantages':{chinese:'优势/优点',phonetic:'/ədˈvɑːntɪdʒɪz/',pos:'n.'},
  'convenient':{chinese:'方便的',phonetic:'/kənˈviːniənt/',pos:'adj.'},
  'permanent':{chinese:'永久的',phonetic:'/ˈpɜːrmənənt/',pos:'adj.'},
  'evasion':{chinese:'逃避/规避',phonetic:'/ɪˈveɪʒən/',pos:'n.'},
  'corruption':{chinese:'腐败',phonetic:'/kəˈrʌpʃən/',pos:'n.'},
  'concerns':{chinese:'担忧/关切',phonetic:'/kənˈsɜːrnz/',pos:'n.'},
  'excluded':{chinese:'被排除的',phonetic:'/ɪkˈskluːdɪd/',pos:'adj.'},
  'vulnerable':{chinese:'脆弱的/弱势的',phonetic:'/ˈvʌlnərəbəl/',pos:'adj.'},
  'cyberattacks':{chinese:'网络攻击',phonetic:'/ˈsaɪbərəˌtæks/',pos:'n.'},
  'outage':{chinese:'中断/故障',phonetic:'/ˈaʊtɪdʒ/',pos:'n.'},
  'privacy':{chinese:'隐私',phonetic:'/ˈprɪvəsi/',pos:'n.'},
  'monitor':{chinese:'监控/监测',phonetic:'/ˈmɒnɪtər/',pos:'v.'},
  'unprecedented':{chinese:'前所未有的',phonetic:'/ʌnˈpresɪdentɪd/',pos:'adj.'},
  'recent':{chinese:'最近的',phonetic:'/ˈriːsənt/',pos:'adj.'},
  'decline':{chinese:'下降/减少',phonetic:'/dɪˈklaɪn/',pos:'v./n.'},
  'accounting':{chinese:'占比/解释',phonetic:'/əˈkaʊntɪŋ/',pos:'v.'},
  'pandemic':{chinese:'流行病/疫情',phonetic:'/pænˈdemɪk/',pos:'n.'},
  'consumers':{chinese:'消费者',phonetic:'/kənˈsjuːmərz/',pos:'n.'},
  'retailers':{chinese:'零售商',phonetic:'/ˈriːteɪlərz/',pos:'n.'},
  'contact':{chinese:'接触/联系',phonetic:'/ˈkɒntækt/',pos:'n./v.'},
  'methods':{chinese:'方法/方式',phonetic:'/ˈmeθədz/',pos:'n.'},
  'including':{chinese:'包括',phonetic:'/ɪnˈkluːdɪŋ/',pos:'prep.'},
  'wallets':{chinese:'钱包',phonetic:'/ˈwɒlɪts/',pos:'n.'},
  'banking':{chinese:'银行业',phonetic:'/ˈbæŋkɪŋ/',pos:'n.'},
  'default':{chinese:'默认/预设',phonetic:'/dɪˈfɔːlt/',pos:'n.'},
  'cashless':{chinese:'无现金的',phonetic:'/ˈkæʃləs/',pos:'adj.'},
  'handling':{chinese:'处理',phonetic:'/ˈhændlɪŋ/',pos:'v.'},
  'record':{chinese:'记录',phonetic:'/ˈrekɔːrd/',pos:'n./v.'},
  'illegal':{chinese:'非法的',phonetic:'/ɪˈliːɡəl/',pos:'adj.'},
  'activities':{chinese:'活动',phonetic:'/ækˈtɪvətiz/',pos:'n.'},
  'ability':{chinese:'能力',phonetic:'/əˈbɪləti/',pos:'n.'},
  'track':{chinese:'追踪/轨道',phonetic:'/træk/',pos:'v./n.'},
  'financial':{chinese:'金融的/财务的',phonetic:'/faɪˈnænʃəl/',pos:'adj.'},
  'represents':{chinese:'代表/表示',phonetic:'/ˌreprɪˈzents/',pos:'v.'},
  'against':{chinese:'反对/对抗',phonetic:'/əˈɡenst/',pos:'prep.'},
  'organised':{chinese:'有组织的',phonetic:'/ˈɔːrɡənaɪzd/',pos:'adj.'},
  'crime':{chinese:'犯罪',phonetic:'/kraɪm/',pos:'n.'},
  'serious':{chinese:'严重的/认真的',phonetic:'/ˈsɪəriəs/',pos:'adj.'},
  'elderly':{chinese:'老年人/年长的',phonetic:'/ˈeldərli/',pos:'adj./n.'},
  'access':{chinese:'访问/获取',phonetic:'/ˈækses/',pos:'n./v.'},
  'services':{chinese:'服务',phonetic:'/ˈsɜːrvɪsɪz/',pos:'n.'},
  'completely':{chinese:'完全地',phonetic:'/kəmˈpliːtli/',pos:'adv.'},
  'expenses':{chinese:'开支/费用',phonetic:'/ɪkˈspensɪz/',pos:'n.'},
  'technical':{chinese:'技术的',phonetic:'/ˈteknɪkəl/',pos:'adj.'},
  'failures':{chinese:'失败/故障',phonetic:'/ˈfeɪljərz/',pos:'n.'},
  'widespread':{chinese:'广泛的',phonetic:'/ˈwaɪdspred/',pos:'adj.'},
  'system':{chinese:'系统',phonetic:'/ˈsɪstəm/',pos:'n.'},
  'advocates':{chinese:'倡导者',phonetic:'/ˈædvəkeɪts/',pos:'n.'},
  'corporations':{chinese:'公司/企业',phonetic:'/ˌkɔːrpəˈreɪʃənz/',pos:'n.'},
  'individual':{chinese:'个人的/个体',phonetic:'/ˌɪndɪˈvɪdʒuəl/',pos:'adj./n.'},
  'spending':{chinese:'支出/消费',phonetic:'/ˈspendɪŋ/',pos:'n.'},
  'habits':{chinese:'习惯',phonetic:'/ˈhæbɪts/',pos:'n.'},
  'detail':{chinese:'细节',phonetic:'/ˈdiːteɪl/',pos:'n.'},
  'transaction':{chinese:'交易',phonetic:'/trænˈzækʃən/',pos:'n.'},
  'medical':{chinese:'医疗的',phonetic:'/ˈmedɪkəl/',pos:'adj.'},
  'economists':{chinese:'经济学家',phonetic:'/ɪˈkɒnəmɪsts/',pos:'n.'},
  'unlikely':{chinese:'不太可能的',phonetic:'/ʌnˈlaɪkli/',pos:'adj.'},
  'disappear':{chinese:'消失',phonetic:'/ˌdɪsəˈpɪər/',pos:'v.'},
  'entirely':{chinese:'完全地',phonetic:'/ɪnˈtaɪərli/',pos:'adv.'},
  'realistic':{chinese:'现实的',phonetic:'/ˌriːəˈlɪstɪk/',pos:'adj.'},
  'scenario':{chinese:'场景/情况',phonetic:'/sɪˈnærioʊ/',pos:'n.'},
  'dominate':{chinese:'主导/占优势',phonetic:'/ˈdɒmɪneɪt/',pos:'v.'},
  'currency':{chinese:'货币',phonetic:'/ˈkʌrənsi/',pos:'n.'},
  'backup':{chinese:'备份/备用',phonetic:'/ˈbækʌp/',pos:'n./adj.'},
  // Passage 2: Bilingualism
  'cognitive':{chinese:'认知的',phonetic:'/ˈkɒɡnətɪv/',pos:'adj.'},
  'bilingualism':{chinese:'双语能力',phonetic:'/baɪˈlɪŋɡwəlɪzəm/',pos:'n.'},
  'profound':{chinese:'深远的/深刻的',phonetic:'/prəˈfaʊnd/',pos:'adj.'},
  'executive':{chinese:'执行的',phonetic:'/ɪɡˈzekjətɪv/',pos:'adj.'},
  'suppressing':{chinese:'抑制/压制',phonetic:'/səˈpresɪŋ/',pos:'v.'},
  'mechanisms':{chinese:'机制',phonetic:'/ˈmekənɪzəmz/',pos:'n.'},
  'dementia':{chinese:'痴呆症',phonetic:'/dɪˈmenʃə/',pos:'n.'},
  'landmark':{chinese:'里程碑式的',phonetic:'/ˈlændmɑːrk/',pos:'adj.'},
  'pathology':{chinese:'病理学/病变',phonetic:'/pəˈθɒlədʒi/',pos:'n.'},
  'confounding':{chinese:'混杂的/混淆的',phonetic:'/kənˈfaʊndɪŋ/',pos:'adj.'},
  'socioeconomic':{chinese:'社会经济的',phonetic:'/ˌsoʊsioʊˌiːkəˈnɒmɪk/',pos:'adj.'},
  'robust':{chinese:'稳健的/强有力的',phonetic:'/roʊˈbʌst/',pos:'adj.'},
  'mandatory':{chinese:'强制性的',phonetic:'/ˈmændətəri/',pos:'adj.'},
  'recognised':{chinese:'公认的/被认可的',phonetic:'/ˈrekəɡnaɪzd/',pos:'adj.'},
  'valuable':{chinese:'有价值的/宝贵的',phonetic:'/ˈvæljuəbəl/',pos:'adj.'},
  'research':{chinese:'研究',phonetic:'/rɪˈsɜːrtʃ/',pos:'n./v.'},
  'suggests':{chinese:'表明/建议',phonetic:'/səˈdʒests/',pos:'v.'},
  'benefits':{chinese:'好处/益处',phonetic:'/ˈbenɪfɪts/',pos:'n.'},
  'conducted':{chinese:'进行/实施',phonetic:'/kənˈdʌktɪd/',pos:'v.'},
  'decades':{chinese:'十年',phonetic:'/ˈdekeɪdz/',pos:'n.'},
  'individuals':{chinese:'个人/个体',phonetic:'/ˌɪndɪˈvɪdʒuəlz/',pos:'n.'},
  'perform':{chinese:'表现/执行',phonetic:'/pərˈfɔːrm/',pos:'v.'},
  'requiring':{chinese:'需要/要求',phonetic:'/rɪˈkwaɪərɪŋ/',pos:'v.'},
  'control':{chinese:'控制',phonetic:'/kənˈtroʊl/',pos:'n./v.'},
  'attention':{chinese:'注意力',phonetic:'/əˈtenʃən/',pos:'n.'},
  'switch':{chinese:'切换/转变',phonetic:'/swɪtʃ/',pos:'v.'},
  'ignore':{chinese:'忽略',phonetic:'/ɪɡˈnɔːr/',pos:'v.'},
  'irrelevant':{chinese:'无关的',phonetic:'/ɪˈreləvənt/',pos:'adj.'},
  'explanation':{chinese:'解释/说明',phonetic:'/ˌekspləˈneɪʃən/',pos:'n.'},
  'constantly':{chinese:'不断地',phonetic:'/ˈkɒnstəntli/',pos:'adv.'},
  'exercise':{chinese:'锻炼/练习',phonetic:'/ˈeksərsaɪz/',pos:'v./n.'},
  'active':{chinese:'活跃的/积极的',phonetic:'/ˈæktɪv/',pos:'adj.'},
  'select':{chinese:'选择',phonetic:'/sɪˈlekt/',pos:'v.'},
  'correct':{chinese:'正确的',phonetic:'/kəˈrekt/',pos:'adj.'},
  'competing':{chinese:'竞争的/对立的',phonetic:'/kəmˈpiːtɪŋ/',pos:'adj.'},
  'constant':{chinese:'持续的/不断的',phonetic:'/ˈkɒnstənt/',pos:'adj.'},
  'mental':{chinese:'心理的/精神的',phonetic:'/ˈmentəl/',pos:'adj.'},
  'strengthen':{chinese:'加强/增强',phonetic:'/ˈstreŋθən/',pos:'v.'},
  'regular':{chinese:'规律的/定期的',phonetic:'/ˈreɡjələr/',pos:'adj.'},
  'striking':{chinese:'显著的/惊人的',phonetic:'/ˈstraɪkɪŋ/',pos:'adj.'},
  'finding':{chinese:'发现/调查结果',phonetic:'/ˈfaɪndɪŋ/',pos:'n.'},
  'relationship':{chinese:'关系',phonetic:'/rɪˈleɪʃənʃɪp/',pos:'n.'},
  'colleagues':{chinese:'同事',phonetic:'/ˈkɒliːɡz/',pos:'n.'},
  'symptoms':{chinese:'症状',phonetic:'/ˈsɪmptəmz/',pos:'n.'},
  'average':{chinese:'平均的/普通的',phonetic:'/ˈævərɪdʒ/',pos:'adj.'},
  'reserve':{chinese:'储备/保留',phonetic:'/rɪˈzɜːrv/',pos:'n./v.'},
  'function':{chinese:'功能/运作',phonetic:'/ˈfʌŋkʃən/',pos:'v./n.'},
  'despite':{chinese:'尽管',phonetic:'/dɪˈspaɪt/',pos:'prep.'},
  'damage':{chinese:'损害/损伤',phonetic:'/ˈdæmɪdʒ/',pos:'n./v.'},
  'occurring':{chinese:'发生/出现',phonetic:'/əˈkɜːrɪŋ/',pos:'v.'},
  'prevent':{chinese:'预防/阻止',phonetic:'/prɪˈvent/',pos:'v.'},
  'cope':{chinese:'应对/处理',phonetic:'/koʊp/',pos:'v.'},
  'condition':{chinese:'状况/条件',phonetic:'/kənˈdɪʃən/',pos:'n.'},
  'critics':{chinese:'批评者',phonetic:'/ˈkrɪtɪks/',pos:'n.'},
  'differ':{chinese:'不同/区别',phonetic:'/ˈdɪfər/',pos:'v.'},
  'status':{chinese:'地位/状态',phonetic:'/ˈsteɪtəs/',pos:'n.'},
  'immigration':{chinese:'移民',phonetic:'/ˌɪmɪˈɡreɪʃən/',pos:'n.'},
  'independently':{chinese:'独立地',phonetic:'/ˌɪndɪˈpendəntli/',pos:'adv.'},
  'addressed':{chinese:'解决/处理',phonetic:'/əˈdrest/',pos:'v.'},
  'matching':{chinese:'匹配/对应',phonetic:'/ˈmætʃɪŋ/',pos:'v.'},
  'participants':{chinese:'参与者',phonetic:'/pɑːrˈtɪsɪpənts/',pos:'n.'},
  'background':{chinese:'背景',phonetic:'/ˈbækɡraʊnd/',pos:'n.'},
  'pattern':{chinese:'模式/图案',phonetic:'/ˈpætərn/',pos:'n.'},
  'remains':{chinese:'保持/仍然是',phonetic:'/rɪˈmeɪnz/',pos:'v.'},
  'implications':{chinese:'影响/含义',phonetic:'/ˌɪmplɪˈkeɪʃənz/',pos:'n.'},
  'educators':{chinese:'教育工作者',phonetic:'/ˈedʒukeɪtərz/',pos:'n.'},
  'instruction':{chinese:'教学/指导',phonetic:'/ɪnˈstrʌkʃən/',pos:'n.'},
  'merely':{chinese:'仅仅/只是',phonetic:'/ˈmɪərli/',pos:'adv.'},
  'cultural':{chinese:'文化的',phonetic:'/ˈkʌltʃərəl/',pos:'adj.'},
  'economic':{chinese:'经济的',phonetic:'/ˌiːkəˈnɒmɪk/',pos:'adj.'},
  'training':{chinese:'训练/培训',phonetic:'/ˈtreɪnɪŋ/',pos:'n.'},
  'extend':{chinese:'延伸/扩展',phonetic:'/ɪkˈstend/',pos:'v.'},
};

interface ReadingSet {
  title: string; passage: string; translation: string; wordCount: number; timeMinutes: number;
  questions: { id:string; type:'t-f-ng'|'ynng'|'multiple-choice'|'sentence-completion'|'matching-headings'; stem:string; options?:string[]; answer:string; explanation?:string }[];
}

const SETS: ReadingSet[] = [
  {
    title:'Passage 1: The Decline of Cash', wordCount:310, timeMinutes:18,
    passage:`In recent years, the use of physical cash has declined dramatically across the world. Countries such as Sweden and China have led this transition, with cash now accounting for less than 2 percent of all transactions in Sweden. The COVID-19 pandemic accelerated this trend, as consumers and retailers alike sought to minimise physical contact. Digital payment methods — including credit cards, mobile wallets, and online banking — have become the default for millions of people.

There are several advantages to a cashless society. Digital payments are generally faster and more convenient than handling coins and notes. They also create a permanent record of transactions, which can help reduce tax evasion and illegal activities. For governments, the ability to track financial flows more effectively represents a powerful tool against corruption and organised crime.

However, the move away from cash also raises serious concerns. Elderly people and those without access to banking services may find themselves excluded from the economy. In the United Kingdom, for example, over a million people still rely almost entirely on cash for their daily expenses. A completely cashless society could leave these vulnerable groups behind. Furthermore, digital payment systems are vulnerable to technical failures and cyberattacks. A widespread system outage could leave millions unable to make even basic purchases.

Privacy advocates also warn that digital payments allow corporations and governments to monitor individual spending habits in unprecedented detail. Every transaction — from a morning coffee to a medical bill — becomes part of a permanent data trail.

Most economists agree that while cash will continue to decline, it is unlikely to disappear entirely in the near future. A more realistic scenario is a "less-cash" society, where digital payments dominate but physical currency remains available as a backup option for those who need it.`,
    translation:`近年来，实体现金的使用在全球范围内急剧下降。瑞典和中国等国家引领了这一转变，现金交易在瑞典已降至不到2%。新冠疫情加速了这一趋势，因为消费者和零售商都尽量减少了身体接触。包括信用卡、移动钱包和网上银行在内的数字支付方式已成为数百万人的默认选择。

无现金社会有几个优点。数字支付通常比处理硬币和纸币更快、更方便。它们还会创建永久的交易记录，有助于减少逃税和非法活动。对政府来说，更有效地追踪资金流动是对抗腐败和有组织犯罪的有力工具。

然而，远离现金也引发了严重的担忧。老年人和无法获得银行服务的人可能会发现自己被排除在经济之外。例如，在英国，超过一百万人仍然几乎完全依赖现金进行日常消费。一个完全无现金的社会可能会让这些弱势群体掉队。此外，数字支付系统容易受到技术故障和网络攻击的影响。大规模系统故障可能导致数百万人连基本的购物都无法完成。

隐私倡导者也警告说，数字支付允许企业和政府以前所未有的细节监控个人的消费习惯。每一笔交易——从早上的咖啡到医药费——都成为永久数据痕迹的一部分。

大多数经济学家认为，虽然现金将继续减少，但在不久的将来不太可能完全消失。一个更现实的前景是"少现金"社会——数字支付占主导地位，但实物货币仍然作为备用选项提供给需要的人。`,
    questions:[
      {id:'r1',type:'multiple-choice',stem:'According to the passage, what percentage of Swedish transactions use cash?',options:['About 10%','Less than 5%','Less than 2%','About 20%'],answer:'Less than 2%'},
      {id:'r2',type:'t-f-ng',stem:'Sweden was the first country to introduce mobile payment systems.',options:['True','False','Not Given'],answer:'Not Given',explanation:'文章只说瑞典现金使用率不到2%，没有说它是否是第一个引入移动支付的国家。'},
      {id:'r3',type:'t-f-ng',stem:'Digital payments can help governments reduce tax evasion.',options:['True','False','Not Given'],answer:'True',explanation:'文章明确说：They also create a permanent record ... which can help reduce tax evasion。'},
      {id:'r4',type:'multiple-choice',stem:'How many people in the UK still rely almost entirely on cash?',options:['About 500,000','Over 1 million','Over 2 million','Less than 100,000'],answer:'Over 1 million'},
      {id:'r5',type:'t-f-ng',stem:'The COVID-19 pandemic slowed down the transition to digital payments.',options:['True','False','Not Given'],answer:'False',explanation:'文章说COVID-19 accelerated this trend（加速了趋势），不是slow down。'},
      {id:'r6',type:'multiple-choice',stem:'What do privacy advocates worry about?',options:['Technical failures','Tax evasion','Transaction monitoring','System outages'],answer:'Transaction monitoring'},
      {id:'r7',type:'sentence-completion',stem:'Most economists predict a "___" society rather than a fully cashless one.',answer:'less-cash'},
      {id:'r8',type:'t-f-ng',stem:'Sweden plans to completely eliminate cash by 2030.',options:['True','False','Not Given'],answer:'Not Given',explanation:'文章没有提到瑞典计划在2030年完全消除现金。'},
    ],
  },
  {
    title:'Passage 2: The Benefits of Bilingualism', wordCount:290, timeMinutes:18,
    passage:`Speaking more than one language has long been recognised as a valuable skill, but recent research suggests that the cognitive benefits of bilingualism may be even more profound than previously thought. Studies conducted over the past two decades have shown that bilingual individuals tend to perform better on tasks requiring executive control — the ability to focus attention, switch between tasks, and ignore irrelevant information.

The most widely accepted explanation for this advantage is that bilinguals constantly exercise their executive control system. Every time a bilingual person speaks, both of their languages are active in the brain. The speaker must select words from the correct language while suppressing the competing language. This constant mental juggling appears to strengthen the brain\'s control mechanisms, much like regular physical exercise strengthens muscles.

Perhaps the most striking finding concerns the relationship between bilingualism and dementia. A landmark study by Bialystok and colleagues found that bilingual patients developed symptoms of dementia an average of four to five years later than monolingual patients with the same level of brain pathology. In other words, bilingualism appeared to provide a "cognitive reserve" that allowed individuals to function normally for longer despite the physical damage occurring in their brains. This does not mean that bilingualism prevents dementia, but rather that it helps the brain cope with the condition for a longer period.

Critics have pointed out that many early studies on bilingualism suffered from confounding variables. Bilingual individuals often differ from monolinguals in socioeconomic status, education, and immigration history — all factors that could independently affect cognitive performance. More recent research has addressed these concerns by carefully matching participants on relevant background variables. While the effect sizes are sometimes smaller than originally reported, the overall pattern of cognitive advantages for bilinguals remains robust.

The practical implications are significant. Some educators have called for mandatory second-language instruction from an early age, not merely for cultural or economic reasons, but as a form of cognitive training. Whether these benefits extend to adults who learn a second language later in life is an active area of research.`,
    translation:`讲多种语言长期以来被认为是一项宝贵技能，但最新研究表明，双语对认知的益处可能比之前认为的更加深远。过去二十年进行的研究表明，双语者在需要执行控制的任务上往往表现更好——执行控制是集中注意力、在任务间切换和忽略无关信息的能力。

对这一优势最广泛接受的解释是双语者不断锻炼他们的执行控制系统。每次双语者说话时，他们大脑中的两种语言都是活跃的。说话者必须从正确的语言中选择词汇，同时抑制竞争语言。这种持续的心理杂耍似乎能增强大脑的控制机制，就像规律的体育锻炼能增强肌肉一样。

也许最引人注目的发现涉及双语与痴呆症之间的关系。Bialystok及其同事的一项里程碑式研究发现，双语患者出现痴呆症状的时间比具有相同脑部病理水平的单语患者平均晚四到五年。换句话说，双语似乎提供了一种"认知储备"，使个体在大脑发生物理损伤的情况下，仍能在更长时间内正常运作。这并不意味着双语能预防痴呆，而是它帮助大脑在更长时间内应对这种情况。

批评者指出，许多早期关于双语的研究存在混杂变量的问题。双语者在社会经济地位、教育程度和移民背景方面往往与单语者不同——所有这些因素都可能独立影响认知表现。更新的研究通过对参与者进行相关背景变量的仔细匹配解决了这些问题。虽然效应量有时比最初报告的更小，但双语者认知优势的整体模式仍然是可靠的。

实际影响是重大的。一些教育工作者呼吁从幼年开始强制进行第二语言教学，不仅是出于文化或经济原因，更是作为一种认知训练形式。这些益处是否延伸到成年后学习第二语言的人，仍是一个活跃的研究领域。`,
    questions:[
      {id:'r9',type:'multiple-choice',stem:'What cognitive ability do bilinguals perform better on, according to the passage?',options:['Memory recall','Executive control','Spatial reasoning','Mathematical calculation'],answer:'Executive control'},
      {id:'r10',type:'sentence-completion',stem:'Bilinguals must ___ the competing language when speaking.',answer:'suppress'},
      {id:'r11',type:'multiple-choice',stem:'How many years later did bilingual patients develop dementia symptoms in the Bialystok study?',options:['1-2 years','4-5 years','7-8 years','10 years'],answer:'4-5 years'},
      {id:'r12',type:'t-f-ng',stem:'Bilingualism completely prevents dementia.',options:['True','False','Not Given'],answer:'False',explanation:'文章明确说This does not mean that bilingualism prevents dementia。'},
      {id:'r13',type:'multiple-choice',stem:'What criticism did early bilingualism studies face?',options:['Small sample sizes','Confounding variables','Inaccurate data','Short study periods'],answer:'Confounding variables'},
      {id:'r14',type:'t-f-ng',stem:'Recent studies show that the cognitive benefits of bilingualism have been disproven.',options:['True','False','Not Given'],answer:'False',explanation:'文章说the overall pattern of cognitive advantages for bilinguals remains robust。'},
      {id:'r15',type:'multiple-choice',stem:'What have some educators called for?',options:['More research funding','Mandatory second-language instruction','Reduced language classes','Adult-only language programs'],answer:'Mandatory second-language instruction'},
      {id:'r16',type:'t-f-ng',stem:'Adults who learn a second language definitely receive the same cognitive benefits as early bilinguals.',options:['True','False','Not Given'],answer:'Not Given',explanation:'文章最后一句说这是an active area of research——还没有确定结论。'},
      {id:'r31',type:'ynng',stem:'The writer believes that bilingualism provides a "cognitive reserve" that delays dementia symptoms.',options:['Yes','No','Not Given'],answer:'Yes',explanation:'文章明确支持这个观点：bilingualism appeared to provide a cognitive reserve。'},
      {id:'r32',type:'ynng',stem:'The writer suggests that critics of bilingualism research were correct about confounding variables.',options:['Yes','No','Not Given'],answer:'No',explanation:'文章说later research addressed these concerns且the overall pattern remains robust——说明作者并不认为批评者的质疑否定了整体结论。'},
      {id:'r33',type:'matching-headings',stem:'Paragraph 1 of the passage is best described by which heading?',options:['The economic benefits of bilingualism','Cognitive advantages of speaking multiple languages','How children learn languages','The history of bilingual education'],answer:'Cognitive advantages of speaking multiple languages',explanation:'第一段介绍了双语对认知的益处，引用了过去20年的研究。'},
      {id:'r34',type:'matching-headings',stem:'Paragraph 3 (about dementia) is best described by which heading?',options:['The link between bilingualism and dementia','How to prevent dementia','The costs of healthcare','Language learning in old age'],answer:'The link between bilingualism and dementia',explanation:'第三段重点讨论了双语与痴呆症延迟发作的关系。'},
    ],
  },
  // Passage 3: Climate Change & Economy
  {
    title:'Passage 3: Climate Change and the Global Economy', wordCount:280, timeMinutes:18,
    passage:`Climate change is no longer a distant threat but an immediate economic reality. According to a report by the World Economic Forum, extreme weather events cost the global economy over 300 billion dollars in 2025 alone. Floods in Asia, wildfires in North America, and droughts in Africa have disrupted supply chains, destroyed infrastructure, and displaced millions of people.

The agricultural sector is particularly vulnerable. Rising temperatures and unpredictable rainfall patterns have reduced crop yields in many regions. For example, coffee production in Brazil has declined by nearly 20 percent over the past decade due to higher temperatures and more frequent pests. Similarly, wheat farmers in Australia have struggled with consecutive years of drought, pushing up global food prices.

However, the transition to a low-carbon economy also presents significant opportunities. Investment in renewable energy has created millions of jobs worldwide. The solar industry alone now employs more people than coal mining globally. Countries that take early action to develop green technologies may gain a competitive advantage in the emerging green economy.

Critics argue that the costs of transitioning to renewable energy are too high, especially for developing nations. They point out that countries like India and Indonesia still rely heavily on coal for electricity generation and cannot afford to switch to more expensive alternatives. However, supporters of green investment counter that the long-term costs of inaction far outweigh the short-term costs of transition. As one economist noted, "We cannot afford not to act."

The debate is no longer about whether climate change is real, but about how to balance economic growth with environmental sustainability. Most experts agree that international cooperation is essential, as no single country can solve this problem alone.`,
    translation:`气候变化不再是遥远的威胁，而是眼前的经济现实。据世界经济论坛报告，仅在2025年，极端天气事件就给全球经济造成了超过3000亿美元的损失。亚洲的洪水、北美的野火和非洲的干旱扰乱了供应链，摧毁了基础设施，使数百万人流离失所。

农业部门尤其脆弱。气温上升和不可预测的降雨模式降低了许多地区的作物产量。例如，由于气温升高和病虫害增加，巴西的咖啡产量在过去十年下降了近20%。同样，澳大利亚的小麦农民连续多年面临干旱，推高了全球食品价格。

然而，向低碳经济转型也带来了重大机遇。可再生能源投资在全球创造了数百万就业岗位。仅太阳能行业的全球就业人数就已超过煤炭开采业。那些率先发展绿色技术的国家可能在新兴的绿色经济中获得竞争优势。

批评者认为，转向可再生能源的成本太高，尤其对发展中国家而言。他们指出，像印度和印度尼西亚这样的国家仍然严重依赖煤炭发电，无法负担转向更昂贵的替代能源。然而，绿色投资的支持者反驳说，不作为的长期代价远超转型的短期成本。正如一位经济学家所说："我们承受不起不采取行动的代价。"

争论已不再是气候变化是否真实存在，而是如何在经济增长与环境可持续性之间取得平衡。大多数专家认为，国际合作至关重要，因为没有任何一个国家能独自解决这个问题。`,
    questions:[
      {id:'r17',type:'multiple-choice',stem:'According to the passage, how much did extreme weather cost the global economy in 2025?',options:['$100 billion','$200 billion','Over $300 billion','$500 billion'],answer:'Over $300 billion'},
      {id:'r18',type:'t-f-ng',stem:'Coffee production in Brazil has declined by nearly 20% in the past decade.',options:['True','False','Not Given'],answer:'True',explanation:'文章明确说巴西咖啡产量在过去十年下降了近20%。'},
      {id:'r19',type:'multiple-choice',stem:'What industry now employs more people than coal mining?',options:['Wind power','Solar industry','Oil industry','Nuclear power'],answer:'Solar industry'},
      {id:'r20',type:'t-f-ng',stem:'India has already stopped using coal for electricity generation.',options:['True','False','Not Given'],answer:'False',explanation:'文章说印度still rely heavily on coal。'},
      {id:'r21',type:'sentence-completion',stem:'The debate is now about balancing economic growth with environmental ___.',answer:'sustainability'},
      {id:'r22',type:'multiple-choice',stem:'What do most experts agree is essential?',options:['Higher taxes','International cooperation','Nuclear energy','Reducing population'],answer:'International cooperation'},
      {id:'r23',type:'t-f-ng',stem:'The World Economic Forum predicts climate costs will decrease in the future.',options:['True','False','Not Given'],answer:'Not Given',explanation:'文章没有预测未来气候成本是升还是降。'},
      {id:'r24',type:'sentence-completion',stem:'The economist said: "We cannot afford not to ___."',answer:'act'},
    ],
  },
  // Passage 4: Social Media's Impact
  {
    title:'Passage 4: The Impact of Social Media on Society', wordCount:270, timeMinutes:18,
    passage:`Social media has fundamentally changed how people communicate, consume information, and form opinions. Platforms such as Facebook, Instagram, and TikTok now have billions of users worldwide, making them some of the most influential institutions in modern society. While these platforms offer unprecedented opportunities for connection, a growing body of research suggests their impact on mental health and social cohesion deserves serious attention.

One of the most studied effects is the relationship between social media use and mental well-being. A 2025 meta-analysis of over 50 studies found a moderate but consistent correlation between heavy social media use and increased rates of anxiety and depression, particularly among adolescents. The mechanism appears to involve social comparison — users compare their ordinary lives to the carefully curated highlights of others, leading to feelings of inadequacy.

Social media has also transformed the news landscape. Traditional gatekeepers such as newspapers and broadcasters have been replaced by algorithms that prioritise engagement over accuracy. This has contributed to the spread of misinformation and the creation of "echo chambers," where users are exposed only to information that confirms their existing beliefs. The consequences for democratic discourse have been profound, with some scholars arguing that social media has contributed to increasing political polarisation.

On the positive side, social media has given voice to marginalised communities and enabled social movements to organise more effectively. The MeToo movement and climate strikes organised by young activists both gained momentum largely through social media platforms. For many people, these platforms provide a sense of community that may not be available in their physical environment.

The challenge for policymakers is to regulate social media in a way that preserves its benefits while minimising its harms. Some countries have introduced laws requiring platforms to remove harmful content more quickly. Others have focused on digital literacy education, teaching young people how to critically evaluate online information. Most experts agree that a combination of approaches is needed.`,
    translation:`社交媒体从根本上改变了人们沟通、消费信息和形成观点的方式。Facebook、Instagram和TikTok等平台如今拥有数十亿用户，使其成为现代社会中最具影响力的机构之一。虽然这些平台提供了前所未有的连接机会，但越来越多的研究表明，它们对心理健康和社会凝聚力的影响值得认真关注。

研究最多的影响之一是社交媒体使用与心理健康之间的关系。2025年一项涵盖50多项研究的综合分析发现，重度社交媒体使用与焦虑和抑郁率上升之间存在中度但持续的关联，尤其在青少年中。机制似乎涉及社会比较——用户将自己普通的生活与他人精心策划的高光时刻比较，从而产生不足感。

社交媒体也改变了新闻格局。传统的守门人如报纸和广播公司已被算法取代，这些算法优先考虑参与度而非准确性。这导致了错误信息的传播和"回音室"的产生，用户只接触到确认其现有信念的信息。对民主话语的后果是深远的，一些学者认为社交媒体加剧了政治两极分化。

从积极方面看，社交媒体为边缘化群体提供了发声渠道，使社会运动能够更有效地组织。#MeToo运动和年轻活动人士组织的气候罢课都是主要通过社交媒体平台获得势头的。对许多人来说，这些平台提供了在物理环境中可能无法获得的社区感。

政策制定者面临的挑战是如何在保留社交媒体益处的同时最大程度减少其危害。一些国家已出台法律，要求平台更快地删除有害内容。其他国家则专注于数字素养教育，教导年轻人如何批判性地评估在线信息。大多数专家一致认为，需要多种方法的组合。`,
    questions:[
      {id:'r25',type:'multiple-choice',stem:'What did the 2025 meta-analysis find?',options:['No correlation between social media and mental health','A strong causal relationship','A moderate correlation with anxiety and depression','Social media improves mental health'],answer:'A moderate correlation with anxiety and depression'},
      {id:'r26',type:'t-f-ng',stem:'Social comparison is identified as a mechanism linking social media to poor mental health.',options:['True','False','Not Given'],answer:'True',explanation:'文章说social comparison导致inadequacy。'},
      {id:'r27',type:'sentence-completion',stem:'Traditional news gatekeepers have been replaced by ___.',answer:'algorithms'},
      {id:'r28',type:'multiple-choice',stem:'What have "echo chambers" contributed to?',options:['Better journalism','Political polarisation','Faster internet','Lower prices'],answer:'Political polarisation'},
      {id:'r29',type:'t-f-ng',stem:'The MeToo movement was entirely organised through social media.',options:['True','False','Not Given'],answer:'Not Given',explanation:'文章说largely through social media，而非entirely。'},
      {id:'r30',type:'sentence-completion',stem:'Some countries teach ___ to help young people evaluate online information.',answer:'digital literacy'},
      {id:'r35',type:'ynng',stem:'The writer believes social media algorithms prioritise accuracy over engagement.',options:['Yes','No','Not Given'],answer:'No',explanation:'文章说algorithms prioritise engagement over accuracy——与题干相反。'},
      {id:'r36',type:'ynng',stem:'The writer thinks that a combination of regulatory and educational approaches is the best solution.',options:['Yes','No','Not Given'],answer:'Yes',explanation:'文章最后说Most experts agree that a combination of approaches is needed——作者赞同这个观点。'},
      {id:'r37',type:'matching-headings',stem:'Paragraph 2 of Passage 4 is best described by which heading?',options:['The history of social media','Social media and mental health','How algorithms work','The benefits of digital connection'],answer:'Social media and mental health',explanation:'第二段讨论社交媒体对心理健康的影响，引用了2025年的meta-analysis。'},
      {id:'r38',type:'matching-headings',stem:'Paragraph 3 of Passage 4 is best described by which heading?',options:['Traditional media vs new media','The economics of journalism','Social media and the news landscape','How to write a good headline'],answer:'Social media and the news landscape',explanation:'第三段讨论社交媒体如何改变了新闻传播格局，提到了算法和echo chambers。'},
    ],
  },
];

export default function ReadingPracticePage() {
  const [currentSet, setCurrentSet] = useState(0);
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const [submitted, setSubmitted] = useState<Record<string,boolean>>({});
  const [analysis, setAnalysis] = useState<{vocab:{word:string;count:number}[],points:{questionIndex:number;stem:string;type:string;answer:string;point:string;skill:string;location?:{sentence:string;position:string}}[]}|null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [popupWord, setPopupWord] = useState<{word:string;x:number;y:number}|null>(null);
  const addNote = useNotesStore(s=>s.addNote);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Word click handler — each word is a clickable span
  const handleWordTap = useCallback((e: React.MouseEvent, word: string) => {
    e.stopPropagation();
    const clean = word.replace(/^[^a-zA-Z-]+|[^a-zA-Z-]+$/g, '').toLowerCase();
    if (clean.length >= 2 && /[a-z]/.test(clean)) {
      const cached = DICT_CACHE[clean];
      setPopupWord({ word: clean, x: e.clientX, y: e.clientY, ...(cached || {}) });
    }
  }, []);

  const closePopup = () => setPopupWord(null);

  const playWordAudio = (text: string, audioUrl?: string) => {
    if (audioUrl) {
      if (!audioRef.current) audioRef.current = new Audio();
      audioRef.current.src = audioUrl;
      audioRef.current.load();
      audioRef.current.play().catch(() => {});
      return;
    }
    const u=createUtterance(text,0.85); speechSynthesis.cancel(); speechSynthesis.speak(u);
  };

  const lookupWord = (word: string) => {
    return MINI_DICT[word.toLowerCase()] || {chinese:'释义加载中...',phonetic:'',pos:''};
  };

  // Load audio + definition from API (always fetch for audioUrl, MINI_DICT provides instant display)
  useEffect(() => {
    if (popupWord) {
      fetchDefinition(popupWord.word).then(def => {
        setPopupWord(prev => prev?.word === popupWord.word ? {...prev, ...def} : prev);
      });
    }
  }, [popupWord?.word]);

  const data = SETS[currentSet];
  const qs = data.questions;
  const answeredCount = Object.keys(submitted).length;
  const correctCount = qs.filter(q => (answers[q.id]||'').trim().toLowerCase()===q.answer.trim().toLowerCase()).length;
  const allDone = answeredCount === qs.length;

  // Render passage as clickable words
  const highlightWords = useMemo(() => new Set((analysis?.vocab||[]).map(v=>v.word.toLowerCase())), [analysis]);
  const renderPassage = useCallback((text: string) => {
    return text.split(/(\s+)/).map((token, i) => {
      if (/^\s+$/.test(token)) return token;
      const clean = token.replace(/^[^a-zA-Z-]+|[^a-zA-Z-]+$/g, '').toLowerCase();
      const isHighlighted = allDone && highlightWords.has(clean);
      return (
        <span key={i}
          onClick={(e) => handleWordTap(e, token)}
          className={`cursor-pointer hover:bg-amber-100 rounded px-0.5 transition-colors ${isHighlighted ? 'bg-red-100 text-red-700 font-medium' : ''}`}
          title={clean.length>=2?'点击查看释义':''}>
          {token}
        </span>
      );
    });
  }, [handleWordTap, highlightWords, allDone]);

  // Fetch AI analysis when all questions done
  useEffect(() => {
    if (allDone && !analysis && !analysisLoading) {
      setAnalysisLoading(true);
      fetch('/api/ai/reading-analysis', {
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({title:data.title,passage:data.passage,questions:qs}),
      }).then(r=>r.json()).then(d=>{setAnalysis(d);setAnalysisLoading(false);}).catch(()=>setAnalysisLoading(false));
    }
  }, [allDone, analysis, analysisLoading, data.title, data.passage, qs]);

  const newSet = () => { setCurrentSet(i=>(i+1)%SETS.length); setAnswers({}); setSubmitted({}); setAnalysis(null); setAnalysisLoading(false); };

  return (
    <div className="max-w-5xl mx-auto p-4 lg:p-6 pb-20">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">阅读训练</h1>
          <p className="text-sm text-gray-500">IELTS 学术阅读 · T/F/NG + 选择 + 填空 · 2篇文章</p>
        </div>
        <button onClick={newSet} className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-xs hover:bg-gray-50"><RefreshCw className="w-3 h-3"/>换题</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Passage - takes 2/5 width */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:sticky lg:top-20" style={{maxHeight:'calc(100vh - 120px)',overflowY:'auto'}}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-gray-400">{data.wordCount}词 · 建议{data.timeMinutes}分钟</span>
              <button onClick={()=>setShowTranslation(!showTranslation)}
                className={`ml-auto flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${showTranslation?'bg-green-100 text-green-700':'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                <Languages className="w-3.5 h-3.5"/> {showTranslation?'隐藏翻译':'中英对照'}
              </button>
            </div>
            <h2 className="font-semibold text-lg mb-4">{data.title}</h2>
            {showTranslation ? (
              <div className="text-sm leading-relaxed space-y-3">
                <p className="text-gray-700 whitespace-pre-wrap">{data.passage}</p>
                <div className="border-t border-gray-200 pt-3"/>
                <p className="text-gray-500 whitespace-pre-wrap">{data.translation}</p>
              </div>
            ) : (
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap select-none">
                {renderPassage(data.passage)}
              </div>
            )}
          </div>
        </div>

        {/* Questions - takes 3/5 width */}
        <div className="lg:col-span-3 space-y-3">
          {qs.map((q,i) => {
            const isSubmitted = submitted[q.id];
            const ua = (answers[q.id]||'').trim().toLowerCase();
            const isCorrect = ua===q.answer.trim().toLowerCase();
            const typeLabel:Record<string,string>={'t-f-ng':'T/F/NG','ynng':'Y/N/NG','multiple-choice':'选择','sentence-completion':'填空','matching-headings':'标题匹配'};
            return (
              <div key={q.id} className={`bg-white rounded-xl border p-4 ${isSubmitted?(isCorrect?'border-green-200 bg-green-50/50':'border-red-200 bg-red-50/50'):'border-gray-100'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-gray-400 font-mono">{i+1}.</span>
                  <span className="text-xs px-1.5 py-0.5 bg-gray-100 rounded text-gray-500">{typeLabel[q.type]||q.type}</span>
                </div>
                <p className="text-sm font-medium mb-2">{q.stem}</p>
                {q.type==='multiple-choice'||q.type==='t-f-ng'||q.type==='ynng' ? (
                  <div className="space-y-1.5">{(q.options||[]).map((o,j)=>(
                    <button key={j} disabled={isSubmitted}
                      onClick={()=>{setAnswers(p=>({...p,[q.id]:o}));setSubmitted(p=>({...p,[q.id]:true}));}}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm border transition-all ${
                        isSubmitted&&o===q.answer?'border-green-400 bg-green-100':
                        isSubmitted&&o===ua&&o!==q.answer?'border-red-300 bg-red-100':
                        o===ua?'border-brand-400 bg-brand-50':'border-gray-100 hover:border-gray-300'
                      }`}><span className="text-xs text-gray-400 mr-2">{q.type==='t-f-ng'||q.type==='ynng'?['T','F','NG'][j]||o:String.fromCharCode(65+j)}.</span>{o}</button>
                  ))}</div>
                ) : (
                  <div className="flex gap-2">
                    <input type="text" value={answers[q.id]||''} disabled={isSubmitted}
                      onChange={e=>setAnswers(p=>({...p,[q.id]:e.target.value}))}
                      onKeyDown={e=>{if(e.key==='Enter'&&!isSubmitted&&(answers[q.id]||'').trim())setSubmitted(p=>({...p,[q.id]:true}));}}
                      className={`flex-1 px-3 py-2 border rounded-lg text-sm ${isSubmitted?(isCorrect?'border-green-300 bg-green-50':'border-red-300 bg-red-50'):'border-gray-200'}`}/>
                    {!isSubmitted&&<button onClick={()=>(answers[q.id]||'').trim()&&setSubmitted(p=>({...p,[q.id]:true}))} className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm">确定</button>}
                  </div>
                )}
                {isSubmitted&&<p className={`text-xs p-2 rounded-lg mt-2 ${isCorrect?'bg-green-100 text-green-700':'bg-red-100 text-red-700'}`}>{isCorrect?'✅':`❌ 正确答案：${q.answer}`} {q.explanation||''}</p>}
              </div>
            );
          })}
        </div>
      </div>

      {allDone && (
        <div className="mt-6 space-y-4">
          {/* Score Card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
            <div className="text-4xl font-bold text-brand-600">{correctCount}/{qs.length}</div>
            <p className="text-sm text-gray-500 mt-2">正确率 {Math.round(correctCount/qs.length*100)}% · 预估雅思阅读 {correctCount/qs.length>=0.875?'7.0-8.0':correctCount/qs.length>=0.75?'6.0-6.5':correctCount/qs.length>=0.5?'5.0-5.5':'4.0-4.5'}</p>
          </div>

          {/* AI Analysis */}
          {analysisLoading && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-600 mx-auto mb-2"/>
              <p className="text-sm text-gray-400">AI 正在分析文章考点和重点词汇...</p>
            </div>
          )}

          {analysis && (
            <>
              {/* Key Vocabulary */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold flex items-center gap-2"><Library className="w-4 h-4 text-red-500"/> 重点词汇（文中已标红）</h3>
                  <button onClick={() => {
                    analysis.vocab.forEach(v => addNote({type:'vocab',content:v.word,translation:`出现${v.count}次`,source:data.title}));
                    alert('已全部加入学习笔记');
                  }} className="text-xs text-brand-600 hover:underline flex items-center gap-1"><BookmarkPlus className="w-3 h-3"/> 全部加入笔记</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.vocab.map(v => (
                    <button key={v.word} onClick={() => addNote({type:'vocab',content:v.word,translation:`出现${v.count}次`,source:data.title})}
                      className="group inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-700 rounded-full text-sm hover:bg-red-100 transition-colors">
                      {v.word} <span className="text-xs text-red-400">×{v.count}</span>
                      <BookmarkPlus className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"/>
                    </button>
                  ))}
                </div>
              </div>

              {/* Test Point Analysis */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold flex items-center gap-2"><Lightbulb className="w-4 h-4 text-amber-500"/> 考点解析</h3>
                  <button onClick={() => {
                    analysis.points.forEach(p => addNote({type:'test-point',content:`[${p.type}] ${p.stem}`,translation:`答案:${p.answer} | ${p.skill}`,source:data.title}));
                    alert('考点已全部加入学习笔记');
                  }} className="text-xs text-brand-600 hover:underline flex items-center gap-1"><BookmarkPlus className="w-3 h-3"/> 全部加入笔记</button>
                </div>
                <div className="space-y-3">
                  {analysis.points.map(p => (
                    <div key={p.questionIndex} className="border border-gray-100 rounded-xl p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-gray-400">Q{p.questionIndex}</span>
                            <span className="text-xs px-1.5 py-0.5 bg-gray-100 rounded text-gray-500">{p.type}</span>
                            <span className="text-xs text-green-600 font-medium">答案: {p.answer}</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-1">{p.point}</p>
                          <p className="text-xs text-brand-600">💡 {p.skill}</p>
                        </div>
                        <button onClick={() => addNote({type:'test-point',content:`Q${p.questionIndex}: ${p.stem}`,translation:`答案:${p.answer} | ${p.skill}`,source:data.title})}
                          className="flex-shrink-0 p-1.5 text-gray-300 hover:text-brand-500 hover:bg-brand-50 rounded-lg transition-colors">
                          <BookmarkPlus className="w-4 h-4"/>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={newSet} className="w-full py-3 bg-brand-600 text-white rounded-xl font-medium hover:bg-brand-700 transition-colors">下一篇 →</button>
            </>
          )}
        </div>
      )}

      {/* Floating Word Popup */}
      {popupWord && (() => {
        const dictEntry = MINI_DICT[popupWord.word];
        const def = dictEntry || {chinese:(popupWord as any).chinese||'释义加载中...',phonetic:(popupWord as any).phonetic||'',pos:(popupWord as any).pos||''};
        const example = (popupWord as any).example;
        return (
          <div className="fixed z-50" style={{left:Math.min(popupWord.x,window.innerWidth-320),top:Math.min(popupWord.y+20,window.innerHeight-280)}}>
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 w-72 animate-in">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-brand-700">{popupWord.word}</h3>
                <button onClick={closePopup} className="p-1 text-gray-300 hover:text-gray-500"><X className="w-4 h-4"/></button>
              </div>
              {def.phonetic && <p className="text-sm text-gray-400 mb-1">{def.phonetic} · {def.pos}</p>}
              <p className="text-lg font-medium text-gray-800 mb-1">{def.chinese}</p>
              {example && <p className="text-xs text-gray-500 italic mb-3">📖 "{example}"</p>}
              {!example && !dictEntry && <p className="text-xs text-gray-400 mb-3">正在查询在线词典...</p>}
              <div className="flex items-center gap-2">
                <button onClick={()=>playWordAudio(popupWord.word, (popupWord as any).audioUrl)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-brand-50 text-brand-600 rounded-lg text-sm hover:bg-brand-100 transition-colors">
                  <Volume2 className="w-4 h-4"/> 听发音
                </button>
                <button onClick={()=>{
                  addNote({type:'vocab',content:popupWord.word,translation:def.chinese,source:data.title});
                  closePopup();
                }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-amber-50 text-amber-700 rounded-lg text-sm hover:bg-amber-100 transition-colors">
                  <BookmarkPlus className="w-4 h-4"/> 加入笔记
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
