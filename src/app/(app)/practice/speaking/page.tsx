'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Mic, Square, Loader2, Timer } from 'lucide-react';
import type { SpeakingFeedback } from '@/types/ai';

const PART1 = ['Do you like music? What kind do you listen to?','What do you usually do in your free time?','Tell me about your hometown.','Do you prefer to study alone or with others?'];
const PART2 = [
  { topic:'A person who chose a career in the medical field',prompts:['Who this person is','What job they do','How you know them','Why you admire them']},
  { topic:'A boring place you have been to',prompts:['Where it is','What it looks like','When you went','Why it was boring']},
  { topic:'Local news that interested you',prompts:['What the news was','When you heard it','How you reacted','Why it was interesting']},
  { topic:'A traditional object you like',prompts:['What the object is','Where you saw it','What it is used for','Why you like it']},
  { topic:'An activity you tried for the first time',prompts:['What the activity was','When you tried it','Who you did it with','How you felt']},
  { topic:'Food eaten on a special occasion',prompts:['What the food was','Where you ate it','Why the occasion was special','How you felt']},
];

export default function SpeakingPage() {
  const [part, setPart] = useState<1|2>(1);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob|null>(null);
  const [audioUrl, setAudioUrl] = useState<string|null>(null);
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<SpeakingFeedback|null>(null);
  const [error, setError] = useState('');
  const [qIdx, setQIdx] = useState(0);
  const [cueIdx, setCueIdx] = useState(0);
  const [prepPhase, setPrepPhase] = useState(false);
  const [prepTime, setPrepTime] = useState(60);
  const [speakTime, setSpeakTime] = useState(120);
  const mrRef = useRef<MediaRecorder|null>(null);
  const chRef = useRef<Blob[]>([]);
  const ptRef = useRef<NodeJS.Timeout|null>(null);

  const cue = PART2[cueIdx];

  const startRec = useCallback(async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({audio:true});
      const r = new MediaRecorder(s,{mimeType:'audio/webm'});
      mrRef.current=r; chRef.current=[];
      r.ondataavailable=e=>chRef.current.push(e.data);
      r.onstop=()=>{const b=new Blob(chRef.current,{type:'audio/webm'});setAudioBlob(b);setAudioUrl(URL.createObjectURL(b));s.getTracks().forEach(t=>t.stop());};
      r.start();setIsRecording(true);setError('');
    }catch{setError('无法访问麦克风。请授权浏览器麦克风权限。');}
  },[]);

  const stopRec = useCallback(()=>{mrRef.current?.stop();setIsRecording(false);},[]);

  const startPrep = useCallback(()=>{
    setPrepPhase(true);setPrepTime(60);
    ptRef.current=setInterval(()=>{setPrepTime(t=>{if(t<=1){clearInterval(ptRef.current!);return 0;}return t-1;});},1000);
  },[]);

  useEffect(()=>{
    if(prepTime===0&&prepPhase){setPrepPhase(false);setSpeakTime(120);startRec();
      const st=setInterval(()=>{setSpeakTime(t=>{if(t<=1){clearInterval(st);stopRec();}return t-1;});},1000);}
  },[prepTime,prepPhase]);

  useEffect(()=>{return ()=>{if(ptRef.current)clearInterval(ptRef.current);};},[]);

  const submit = async () => {
    if(!audioBlob)return;setLoading(true);setError('');
    try{
      const t=transcript||'(请手动输入回答内容以便AI评估)';
      const r=await fetch('/api/ai/speaking',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({transcript:t,partNumber:part,currentCEFR:'A2'})});
      if(!r.ok)throw new Error('评估暂不可用');
      setFeedback(await r.json());
    }catch(e:any){setError(e.message||'评估失败');}finally{setLoading(false);}
  };

  const next = () => {
    if(part===1)setQIdx(i=>(i+1)%PART1.length);
    else setCueIdx(i=>(i+1)%PART2.length);
    setAudioBlob(null);setAudioUrl(null);setTranscript('');setFeedback(null);setPrepPhase(false);setPrepTime(60);
  };

  return (<div className="max-w-2xl mx-auto p-4 lg:p-6 pb-20">
    <h1 className="text-2xl font-bold mb-2">AI 口语练习</h1>
    <p className="text-gray-500 mb-4">模拟真实口语考试，AI 评估发音和流利度</p>

    {/* Part Toggle */}
    <div className="flex gap-2 mb-6">
      {([1,2] as const).map(p=>(<button key={p} onClick={()=>{setPart(p);setFeedback(null);setAudioBlob(null);setAudioUrl(null);}}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${part===p?'bg-brand-600 text-white':'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
        Part {p} {p===1?'· 4-5分钟':'· Cue Card'}
      </button>))}
    </div>

    {/* Part 2: Cue Card */}
    {part===2 && (<div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
      <div className="flex items-center gap-2 mb-3"><span className="text-xs px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full">Part 2 · Cue Card</span><span className="text-xs text-gray-400">1分钟准备 + 2分钟讲述</span></div>
      <h3 className="font-semibold text-lg mb-2">{cue.topic}</h3>
      <p className="text-sm text-gray-500 mb-3">You should say:</p>
      <ul className="space-y-1 mb-4">{cue.prompts.map((p,i)=>(<li key={i} className="text-sm text-gray-700 flex items-start gap-2"><span className="text-brand-500">•</span> {p}</li>))}</ul>
      {prepPhase ? (<div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center"><Timer className="w-6 h-6 text-amber-500 mx-auto mb-1"/><div className="text-2xl font-bold text-amber-600">{prepTime}s</div><p className="text-xs text-amber-500 mt-1">准备时间，请思考你的回答...</p></div>):
       isRecording ? (<div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center"><Mic className="w-6 h-6 text-red-500 mx-auto mb-1 animate-pulse"/><div className="text-2xl font-bold text-red-600">{speakTime}s</div><p className="text-xs text-red-500 mt-1">正在录音，请持续讲述...</p></div>):
       !audioBlob ? (<button onClick={startPrep} className="w-full py-8 border-2 border-dashed border-brand-200 rounded-xl text-brand-500 hover:bg-brand-50 transition-colors"><Timer className="w-10 h-10 mx-auto mb-2"/><span className="font-medium">开始准备 (60秒)</span><p className="text-xs text-gray-400 mt-1">点击后计时60秒准备时间，然后自动开始2分钟录音</p></button>):null}
    </div>)}

    {/* Part 1: Question */}
    {part===1 && (<div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
      <div className="flex items-center gap-2 mb-3"><span className="text-xs px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full">Part 1</span><span className="text-xs text-gray-400">4-5 分钟</span></div>
      <p className="text-lg font-medium">{PART1[qIdx]}</p>
      <p className="text-sm text-gray-400 mt-2">请用英语回答 2-3 句话</p>
    </div>)}

    {/* Recording Controls (Part 1 only) */}
    {part===1 && (<div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 text-center">
      {!isRecording&&!audioBlob&&(<button onClick={startRec} className="px-8 py-4 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 inline-flex items-center gap-2"><Mic className="w-5 h-5"/> 开始录音</button>)}
      {isRecording&&(<button onClick={stopRec} className="px-8 py-4 bg-gray-800 text-white rounded-full font-medium hover:bg-gray-900 inline-flex items-center gap-2 animate-pulse"><Square className="w-5 h-5"/> 停止录音</button>)}
      {audioUrl&&!isRecording&&(<div className="space-y-4"><audio controls src={audioUrl} className="w-full"/><div className="flex items-center gap-3 justify-center"><button onClick={startRec} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">重新录制</button><button onClick={submit} disabled={loading} className="px-6 py-2.5 bg-brand-600 text-white rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-brand-700 flex items-center gap-2">{loading&&<Loader2 className="w-4 h-4 animate-spin"/>}{loading?'评估中...':'提交 AI 评估'}</button></div><div><label className="text-xs text-gray-400 block mb-1">手动输入你的回答（可选）</label><textarea value={transcript} onChange={e=>setTranscript(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="输入你说的内容..."/></div></div>)}
      {error&&<p className="text-red-500 text-sm mt-3">{error}</p>}
    </div>)}

    {/* Part 2: Manual transcript + AI submit */}
    {part===2&&audioUrl&&!isRecording&&(<div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6"><audio controls src={audioUrl} className="w-full mb-3"/><label className="text-xs text-gray-400 block mb-1">手动输入你的回答内容</label><textarea value={transcript} onChange={e=>setTranscript(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="输入你说的话..."/><button onClick={submit} disabled={loading} className="mt-3 w-full py-2.5 bg-brand-600 text-white rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-brand-700">{loading?'评估中...':'提交 AI 评估'}</button></div>)}

    {/* Feedback */}
    {feedback&&(<div className="bg-white rounded-2xl border border-gray-100 p-6"><div className="text-center mb-4"><div className="text-5xl font-bold text-brand-600">{feedback.overallBand}</div><p className="text-sm text-gray-500">预估雅思口语分数</p></div><div className="space-y-3 mb-4">{[{label:'流利度',s:feedback.subScores.fluencyAndCoherence},{label:'发音',s:feedback.subScores.pronunciation},{label:'词汇',s:feedback.subScores.lexicalResource},{label:'语法',s:feedback.subScores.grammaticalRangeAndAccuracy}].map(x=>(<div key={x.label} className="flex items-center gap-3"><span className="w-16 text-xs text-gray-500">{x.label}</span><div className="flex-1 bg-gray-100 rounded-full h-2"><div className="h-2 rounded-full bg-brand-500" style={{width:`${(x.s/9)*100}%`}}/></div><span className="text-xs font-medium">{x.s}</span></div>))}</div><div className="bg-gray-50 rounded-xl p-4 mb-4"><h4 className="font-semibold text-sm mb-2">总体评价</h4><p className="text-sm text-gray-600">{feedback.overallComment}</p></div>{feedback.tips.map((t,i)=>(<div key={i} className="bg-purple-50 rounded-lg p-3 text-sm mb-2"><span className="font-medium text-purple-700">{t.advice}</span></div>))}<button onClick={next} className="mt-4 w-full py-2.5 border border-brand-200 text-brand-600 rounded-lg text-sm hover:bg-brand-50">下一题 →</button></div>)}
  </div>);
}
