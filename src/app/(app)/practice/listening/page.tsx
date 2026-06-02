'use client';

import { createUtterance, parseDialogue, speakDialogue } from '@/lib/tts';
import { useState, useCallback } from 'react';
import { Volume2, CheckCircle2, RefreshCw, Headphones, Pause, Play } from 'lucide-react';

// IELTS-format listening practice: 4 Sections, real question types
interface ListeningSet {
  section: number; title: string; context: string; timeMinutes: number; questions: number;
  script: string; instructions: string;
  questions_data: { id: string; type: 'form-completion'|'multiple-choice'|'map-labelling'|'sentence-completion'|'short-answer'|'matching'; stem: string; options?: string[]; answer: string; acceptable?: string[] }[];
}

const LISTENING_SETS: ListeningSet[] = [
  {
    section: 1, title: 'Section 1: 旅行住宿预订', context: '日常生活对话 — 两人对话', timeMinutes: 8, questions: 10,
    instructions: '你将听到一段关于预订酒店房间的对话。请根据对话内容，完成下面的表格。每空不超过两个单词和/或一个数字。',
    script: 'Receptionist: Good afternoon, Grand Hotel. How can I help you?\n\nCustomer: Hello, I would like to book a room for two nights, from the fifteenth to the seventeenth of March.\n\nReceptionist: Certainly. What type of room would you prefer?\n\nCustomer: A single room with a view of the garden, if possible. And I need it to be on a non-smoking floor.\n\nReceptionist: Let me check... Yes, we have a single room with a garden view on the third floor. The rate is 85 pounds per night, including breakfast.\n\nCustomer: That sounds perfect. My name is David Wilson. That is W-I-L-S-O-N.\n\nReceptionist: Thank you, Mr. Wilson. Could I have a contact number?\n\nCustomer: Yes, it is 07700 900 123.\n\nReceptionist: And will you be arriving by car? We have limited parking spaces available at 12 pounds per night.\n\nCustomer: Yes, I will be driving. Please reserve a parking space for me.\n\nReceptionist: Certainly. So that is a single room, garden view, non-smoking, with parking, from March 15th to 17th. The total including parking will be 194 pounds. Check-in is from 2 PM and check-out is before 11 AM.\n\nCustomer: Thank you very much.\n\nReceptionist: You are welcome. We look forward to seeing you on the 15th.',
    questions_data: [
      { id:'s1q1', type:'form-completion', stem:'Hotel name: ___ Hotel', answer:'Grand' },
      { id:'s1q2', type:'form-completion', stem:'Guest name: David ___', answer:'Wilson' },
      { id:'s1q3', type:'form-completion', stem:'Room type: ___ room', answer:'single' },
      { id:'s1q4', type:'form-completion', stem:'Room preference: ___ view', answer:'garden' },
      { id:'s1q5', type:'form-completion', stem:'Floor: ___ floor', answer:'third', acceptable:['3rd'] },
      { id:'s1q6', type:'form-completion', stem:'Price per night: £___', answer:'85' },
      { id:'s1q7', type:'form-completion', stem:'Contact number: ___', answer:'07700 900 123' },
      { id:'s1q8', type:'form-completion', stem:'Parking price per night: £___', answer:'12' },
      { id:'s1q9', type:'form-completion', stem:'Total cost: £___', answer:'194' },
      { id:'s1q10', type:'form-completion', stem:'Check-out time: before ___ AM', answer:'11' },
    ],
  },
  {
    section: 2, title: 'Section 2: 校园设施介绍', context: '公共场所独白 — 一人介绍', timeMinutes: 6, questions: 6,
    instructions: '你将听到一段关于大学校园设施的导览介绍。选择正确的答案。',
    script: 'Good morning everyone and welcome to Riverside University. My name is Sarah and I will be your guide today. Let me start by pointing out some key facilities on our campus map. The main library is located in the centre of the campus, directly opposite the Administration Building. It is open from 8 AM to midnight on weekdays. To the east of the library, you will find the Sports Complex, which includes a swimming pool, a gym, and two tennis courts. The Student Centre is situated next to the library, on the west side. This is where you can find the cafeteria, the bookshop, and the student advice office. If you continue north from the library, you will reach the Science Building, which houses our state-of-the-art laboratories. Finally, the Arts Building is located behind the Administration Building, to the south.',
    questions_data: [
      { id:'s2q1', type:'multiple-choice', stem:'Where is the library located?', options:['East of the campus','In the centre of the campus','North of the campus','West of the campus'], answer:'In the centre of the campus' },
      { id:'s2q2', type:'multiple-choice', stem:'What is directly opposite the library?', options:['Sports Complex','Student Centre','Administration Building','Science Building'], answer:'Administration Building' },
      { id:'s2q3', type:'multiple-choice', stem:'What facilities does the Sports Complex include?', options:['Gym and library','Swimming pool, gym, and tennis courts','Tennis courts and cafeteria','Swimming pool and bookshop'], answer:'Swimming pool, gym, and tennis courts' },
      { id:'s2q4', type:'multiple-choice', stem:'Where is the Student Centre located?', options:['East of the library','West of the library','North of the library','South of the library'], answer:'West of the library' },
      { id:'s2q5', type:'multiple-choice', stem:'What can be found in the Student Centre?', options:['Laboratories and offices','Cafeteria, bookshop, and student advice office','Gym and swimming pool','Library and lecture rooms'], answer:'Cafeteria, bookshop, and student advice office' },
      { id:'s2q6', type:'multiple-choice', stem:'Where is the Arts Building?', options:['Next to the library','Behind the Administration Building','East of the Sports Complex','In front of the Science Building'], answer:'Behind the Administration Building' },
    ],
  },
  {
    section: 3, title: 'Section 3: 学术讨论', context: '学术场景多人讨论', timeMinutes: 8, questions: 6,
    instructions: '你将听到一段学生和导师关于研究项目的讨论。选择正确的答案。',
    script: 'Tutor: So, how is your research project coming along?\n\nStudent A: It is going well. We have decided to focus on the effects of social media on teenagers.\n\nTutor: That is a popular topic. What specific aspect are you looking at?\n\nStudent B: We are comparing the impact of Instagram versus TikTok on self-esteem among 14 to 16 year olds.\n\nTutor: Interesting. What methods are you using?\n\nStudent A: We are conducting a survey with about 200 participants from three local schools. We have also arranged to interview 12 of them in more depth.\n\nTutor: Good. Make sure your questions are clear and unbiased. Have you reviewed the existing literature?\n\nStudent B: Yes, we found several studies. Most suggest a negative correlation between social media use and self-esteem, but some newer research indicates the relationship is more complex.\n\nTutor: That is the key — do not oversimplify. Your deadline is in three weeks. Will you be ready?\n\nStudent A: We should be fine. We have collected most of the data. We just need to analyse it and write up our findings.\n\nTutor: Excellent. Send me a draft by next Friday and I will give you feedback.',
    questions_data: [
      { id:'s3q1', type:'multiple-choice', stem:'What is the main topic of their research?',options:['Social media and adults','Effects of social media on teenagers','Instagram marketing','TikTok algorithms'],answer:'Effects of social media on teenagers' },
      { id:'s3q2', type:'multiple-choice', stem:'What two platforms are they comparing?',options:['Facebook and Instagram','Instagram and TikTok','TikTok and YouTube','Instagram and Snapchat'],answer:'Instagram and TikTok' },
      { id:'s3q3', type:'multiple-choice', stem:'How many survey participants do they plan to involve?',options:['100','150','About 200','300'],answer:'About 200' },
      { id:'s3q4', type:'multiple-choice', stem:'How many participants will be interviewed in depth?',options:['6','12','20','200'],answer:'12' },
      { id:'s3q5', type:'multiple-choice', stem:'What does most existing research suggest?',options:['No correlation','Positive correlation','Negative correlation','The relationship is complex'],answer:'Negative correlation' },
      { id:'s3q6', type:'multiple-choice', stem:'When is the draft due?',options:['This Friday','Next Friday','In three weeks','Next month'],answer:'Next Friday' },
    ],
  },
  {
    section: 4, title: 'Section 4: 学术讲座', context: '学术讲座独白', timeMinutes: 8, questions: 8,
    instructions: '你将听到一段关于气候变化的学术讲座。完成下面的句子，每空不超过两个单词。',
    script: 'Good morning. Today I will discuss the impact of climate change on marine ecosystems. Over the past century, ocean temperatures have risen by approximately 0.8 degrees Celsius on average. This may sound small, but it has had profound effects. Firstly, coral reefs around the world are experiencing bleaching at unprecedented rates. When water temperatures rise by just 1 to 2 degrees above normal, corals expel the algae living in their tissues, causing them to turn white. Scientists estimate that up to 90 percent of coral reefs could be lost by 2050 if current trends continue. Secondly, fish populations are migrating towards the poles as waters warm. This disrupts local fishing industries and food chains. Finally, rising carbon dioxide levels are making oceans more acidic, which affects the ability of shellfish and plankton to form shells. The consequences for the entire marine food web could be devastating. However, there is hope. Marine protected areas have shown that ecosystems can recover when given adequate protection. The key is to act quickly and decisively.',
    questions_data: [
      { id:'s4q1', type:'sentence-completion', stem:'Ocean temperatures have risen by about ___ degrees Celsius.', answer:'0.8' },
      { id:'s4q2', type:'sentence-completion', stem:'Corals expel ___ when temperatures rise.', answer:'algae' },
      { id:'s4q3', type:'sentence-completion', stem:'Bleached corals turn ___.', answer:'white' },
      { id:'s4q4', type:'sentence-completion', stem:'Up to ___ percent of coral reefs could be lost by 2050.', answer:'90' },
      { id:'s4q5', type:'sentence-completion', stem:'Fish populations are moving towards the ___.', answer:'poles' },
      { id:'s4q6', type:'sentence-completion', stem:'Rising CO2 makes oceans more ___.', answer:'acidic' },
      { id:'s4q7', type:'sentence-completion', stem:'Shellfish need to form ___ to survive.', answer:'shells' },
      { id:'s4q8', type:'sentence-completion', stem:'___ areas have shown that ecosystems can recover.', answer:'marine protected', acceptable:['protected'] },
    ],
  },
  // Section 1: Job Interview
  {
    section:1, title:'Section 1: 求职面试预约', context:'日常对话', timeMinutes:7, questions:8,
    instructions:'你将听到一段关于求职面试的电话对话。完成下面的表格。',
    script:'Receptionist: Good morning, Thompson and Associates. How may I help you?\n\nCaller: Hello, I am calling about the marketing assistant position advertised on your website.\n\nReceptionist: Certainly. May I have your name?\n\nCaller: Yes, it is Sarah Chen. That is C-H-E-N.\n\nReceptionist: Thank you, Ms. Chen. The interviews are being held next week. Are you available on Tuesday the 8th?\n\nCaller: Tuesday would be fine. What time?\n\nReceptionist: We have slots at 10:30 AM and 2:30 PM.\n\nCaller: 2:30 PM would be better for me.\n\nReceptionist: Perfect. Please bring a copy of your CV and a portfolio of your previous work. The interview will be conducted by our marketing director, Ms. Williams, and will last approximately 45 minutes.\n\nCaller: Is there anything else I should prepare?\n\nReceptionist: We would like you to give a short presentation about a recent marketing campaign you admire. About 5 minutes would be ideal.\n\nCaller: I will prepare that. Thank you.\n\nReceptionist: Our office is at 42 West Street, on the third floor. Please arrive 15 minutes early to sign in at reception.',
    questions_data:[
      {id:'s5q1',type:'form-completion',stem:'Position applied for: ___ assistant',answer:'marketing'},
      {id:'s5q2',type:'form-completion',stem:'Applicant name: Sarah ___',answer:'Chen'},
      {id:'s5q3',type:'form-completion',stem:'Interview date: Tuesday the ___',answer:'8th',acceptable:['8']},
      {id:'s5q4',type:'form-completion',stem:'Interview time: ___ PM',answer:'2:30'},
      {id:'s5q5',type:'form-completion',stem:'Bring: CV and ___',answer:'portfolio'},
      {id:'s5q6',type:'form-completion',stem:'Interviewer: Ms. ___',answer:'Williams'},
      {id:'s5q7',type:'form-completion',stem:'Presentation length: ___ minutes',answer:'5',acceptable:['five']},
      {id:'s5q8',type:'form-completion',stem:'Office address: 42 ___ Street, third floor',answer:'West'},
    ],
  },
  // Section 2: Public Library Tour
  {
    section:2, title:'Section 2: 公共图书馆介绍', context:'公共场所独白', timeMinutes:6, questions:6,
    instructions:'你将听到一段图书馆工作人员对新会员的介绍。选择正确答案。',
    script:'Welcome to Central City Library. My name is Robert and I will give you a brief introduction to our facilities. The library is open from 9 AM to 8 PM on weekdays, and from 10 AM to 5 PM on Saturdays. We are closed on Sundays. On the ground floor, you will find the fiction section, the children\'s area, and the main information desk. The non-fiction collection is located on the first floor, along with the reference section and the study area. If you need to use a computer, there are 30 computers available on the first floor, and Wi-Fi is free throughout the building. You can borrow up to 12 items at a time, including books, DVDs, and audiobooks. The loan period is three weeks for books and one week for DVDs. You can renew items online or by phone up to three times, as long as no one else has reserved them. We also run a number of free events, including a book club that meets on the first Thursday of each month, and children\'s story time every Saturday morning at 10:30.',
    questions_data:[
      {id:'s6q1',type:'multiple-choice',stem:'What are the library\'s weekday opening hours?',options:['8 AM to 6 PM','9 AM to 8 PM','9 AM to 5 PM','10 AM to 8 PM'],answer:'9 AM to 8 PM'},
      {id:'s6q2',type:'multiple-choice',stem:'Where is the fiction section located?',options:['First floor','Basement','Ground floor','Second floor'],answer:'Ground floor'},
      {id:'s6q3',type:'multiple-choice',stem:'How many computers are available for public use?',options:['20','25','30','35'],answer:'30'},
      {id:'s6q4',type:'multiple-choice',stem:'How many items can be borrowed at one time?',options:['8','10','12','15'],answer:'12'},
      {id:'s6q5',type:'multiple-choice',stem:'What is the loan period for books?',options:['One week','Two weeks','Three weeks','Four weeks'],answer:'Three weeks'},
      {id:'s6q6',type:'multiple-choice',stem:'When does the book club meet?',options:['First Tuesday of each month','First Thursday of each month','Every Saturday','Last Friday of each month'],answer:'First Thursday of each month'},
    ],
  },
];

export default function ListeningPracticePage() {
  const [currentSet, setCurrentSet] = useState(0);
  const [played, setPlayed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const [submitted, setSubmitted] = useState<Record<string,boolean>>({});
  const [showScript, setShowScript] = useState(false);

  const data = LISTENING_SETS[currentSet];
  const qs = data.questions_data;
  const answeredCount = Object.keys(submitted).length;
  const correctCount = qs.filter(q => {
    const ua = (answers[q.id]||'').trim().toLowerCase();
    const ca = q.answer.trim().toLowerCase();
    const acc = (q.acceptable||[]).map(a=>a.toLowerCase());
    return ua === ca || acc.includes(ua);
  }).length;

  const playAudio = useCallback(() => {
    const synth = window.speechSynthesis;
    if (paused) { synth.resume(); setPaused(false); setPlaying(true); return; }
    synth.cancel();

    if (data.section === 1 || data.section === 3) {
      const lines = parseDialogue(data.script);
      if (lines.length > 1) {
        setPlaying(true);
        speakDialogue(lines, 0.85);
        const totalMs = lines.length * 4000 + 1000;
        setTimeout(() => { setPlaying(false); setPaused(false); setPlayed(true); }, totalMs);
        return;
      }
    }

    const u = createUtterance(data.script);
    u.onstart = () => setPlaying(true);
    u.onend = () => { setPlaying(false); setPaused(false); setPlayed(true); };
    u.onerror = () => { setPlaying(false); setPaused(false); };
    synth.speak(u);
  },[data, paused]);

  const pauseAudio = useCallback(() => {
    window.speechSynthesis.pause();
    setPlaying(false); setPaused(true);
  },[]);

  const newSet = () => { setCurrentSet(i=>(i+1)%LISTENING_SETS.length); setAnswers({}); setSubmitted({}); setPlayed(false); setPaused(false); setShowScript(false); };

  const bandEstimate = answeredCount===qs.length ? (correctCount/qs.length>=0.9?'8.0-9.0':correctCount/qs.length>=0.75?'7.0-7.5':correctCount/qs.length>=0.6?'6.0-6.5':correctCount/qs.length>=0.4?'5.0-5.5':'4.0-4.5') : '';

  return (
    <div className="max-w-3xl mx-auto p-4 lg:p-6 pb-20">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">听力训练</h1>
          <p className="text-sm text-gray-500">IELTS 真实题型 · Section 1-4 全覆盖 · 每段只播一次</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">{currentSet+1}/{LISTENING_SETS.length}</span>
          <button onClick={newSet} className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-xs hover:bg-gray-50"><RefreshCw className="w-3 h-3"/>换题</button>
        </div>
      </div>

      {/* Info card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs px-2 py-0.5 bg-cyan-50 text-cyan-600 rounded-full">Section {data.section}</span>
          <span className="text-xs text-gray-400">{data.context}</span>
          <span className="text-xs text-gray-400">{data.questions}题 · ~{data.timeMinutes}分钟</span>
        </div>
        <h2 className="font-semibold text-lg mb-2">{data.title}</h2>
        <p className="text-sm text-gray-500 mb-3">{data.instructions}</p>
        <div className="flex items-center gap-3 flex-wrap">
          {!played && (
            <div className="flex items-center gap-3">
              {paused ? (
                <button onClick={playAudio} className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-all">
                  <Play className="w-4 h-4"/> 继续播放
                </button>
              ) : playing ? (
                <>
                  <button disabled className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-brand-100 text-brand-700 border border-brand-200">
                    <Headphones className="w-4 h-4 animate-pulse"/> 播放中...
                  </button>
                  <button onClick={pauseAudio} className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-all">
                    <Pause className="w-4 h-4"/> 暂停
                  </button>
                </>
              ) : (
                <button onClick={playAudio} className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-brand-600 text-white hover:bg-brand-700 transition-all">
                  <Headphones className="w-4 h-4"/> 🔊 播放录音（仅一次）
                </button>
              )}
            </div>
          )}
          {played && (
            <>
              <span className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium border border-green-200">
                <CheckCircle2 className="w-4 h-4"/> 已播放 ✓
              </span>
              <button onClick={()=>setShowScript(!showScript)} className="text-sm text-brand-600 hover:underline">
                {showScript?'隐藏原文':'显示听力原文'}
              </button>
            </>
          )}
        </div>
        {showScript && <pre className="mt-4 p-4 bg-gray-50 rounded-xl text-xs text-gray-700 leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto">{data.script}</pre>}
      </div>

      {/* Questions */}
      <div className="space-y-3">
        {qs.map((q,i) => {
          const isSubmitted = submitted[q.id];
          const ua = (answers[q.id]||'').trim().toLowerCase();
          const ca = q.answer.trim().toLowerCase();
          const acc = (q.acceptable||[]).map(a=>a.toLowerCase());
          const isCorrect = ua === ca || acc.includes(ua);
          return (
            <div key={q.id} className={`bg-white rounded-xl border p-4 ${isSubmitted?(isCorrect?'border-green-200 bg-green-50/50':'border-red-200 bg-red-50/50'):'border-gray-100'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-400 font-mono">{i+1}.</span>
                <span className="text-xs px-1.5 py-0.5 bg-gray-100 rounded text-gray-500">{q.type==='form-completion'?'表格填空':q.type==='multiple-choice'?'选择':q.type==='sentence-completion'?'句子填空':'简答'}</span>
              </div>
              <p className="text-sm font-medium mb-2">{q.stem}</p>
              {q.type==='multiple-choice' && q.options ? (
                <div className="space-y-1.5">{q.options.map((o,j)=>(
                  <button key={j} disabled={isSubmitted}
                    onClick={()=>{setAnswers(p=>({...p,[q.id]:o}));setSubmitted(p=>({...p,[q.id]:true}));}}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm border transition-all ${
                      isSubmitted&&o===q.answer?'border-green-400 bg-green-100':
                      isSubmitted&&o===ua&&o!==q.answer?'border-red-300 bg-red-100':
                      o===ua?'border-brand-400 bg-brand-50':'border-gray-100 hover:border-gray-300'
                    }`}><span className="text-xs text-gray-400 mr-2">{String.fromCharCode(65+j)}.</span>{o}</button>
                ))}</div>
              ) : (
                <div className="flex gap-2">
                  <input type="text" value={answers[q.id]||''} disabled={isSubmitted}
                    onChange={e=>setAnswers(p=>({...p,[q.id]:e.target.value}))}
                    onKeyDown={e=>{if(e.key==='Enter'&&!isSubmitted&&(answers[q.id]||'').trim())setSubmitted(p=>({...p,[q.id]:true}));}}
                    className={`flex-1 px-3 py-2 border rounded-lg text-sm ${isSubmitted?(isCorrect?'border-green-300 bg-green-50':'border-red-300 bg-red-50'):'border-gray-200'}`}
                    placeholder="输入答案..."/>
                  {!isSubmitted&&<button onClick={()=>(answers[q.id]||'').trim()&&setSubmitted(p=>({...p,[q.id]:true}))} className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm">确定</button>}
                </div>
              )}
              {isSubmitted&&<p className={`text-xs p-2 rounded-lg mt-2 ${isCorrect?'bg-green-100 text-green-700':'bg-red-100 text-red-700'}`}>{isCorrect?'✅':`❌ 正确答案：${q.answer}`}</p>}
            </div>
          );
        })}
      </div>

      {answeredCount===qs.length && (
        <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-6 text-center">
          <div className="text-4xl font-bold text-brand-600">{correctCount}/{qs.length}</div>
          <p className="text-sm text-gray-500 mt-2">正确率 {Math.round(correctCount/qs.length*100)}% · 预估雅思听力 {bandEstimate}</p>
          <p className="text-xs text-gray-400 mt-1">真实雅思听力共40题，建议用 Cambridge IELTS 真题做完整模考</p>
          <button onClick={newSet} className="mt-4 px-6 py-2.5 bg-brand-600 text-white rounded-xl text-sm hover:bg-brand-700">下一套题</button>
        </div>
      )}
    </div>
  );
}
