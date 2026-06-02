'use client';

import { useState } from 'react';
import { Send, Loader2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const CHART_TYPES = ['line','bar','pie','table','process','map'] as const;
type ChartType = typeof CHART_TYPES[number];

const PROMPTS: Record<ChartType,{title:string;desc:string;prompt:string;example:string;tips:string}> = {
  line:{title:'线图 Line Graph',desc:'描述一条或多条线随时间变化的趋势',prompt:'The graph below shows the number of international visitors to three different countries between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',example:'Overall, all three countries experienced an increase in international visitors over the period, with Country A showing the most dramatic growth. In 2000, Country A had around 5 million visitors, while Country B and Country C had approximately 8 million and 3 million respectively. By 2020, Country A had risen sharply to 25 million visitors, surpassing both Country B (15 million) and Country C (10 million).',tips:'用 surge/rise steadily/plateau/plummet 描述趋势。Overview 必须在第二段，2句话概括最大趋势+最大对比。'},
  bar:{title:'柱状图 Bar Chart',desc:'比较不同类别的数据大小',prompt:'The chart below shows the percentage of people in different age groups who used public transport in a European city in 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',example:'Overall, public transport usage was highest among young adults and declined steadily with age. The 18-25 age group had the highest usage at 65%, followed by the 26-35 group at 55%. Usage dropped significantly among the 36-50 group (35%) and was lowest among those over 65 at just 15%.',tips:'用 the highest / the lowest / twice as many as 做对比。按类别或按值排序组织Body段落。'},
  pie:{title:'饼图 Pie Chart',desc:'展示各部分占整体的比例',prompt:'The pie charts below show the sources of energy production in a country in 2000 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',example:'Overall, there was a significant shift from fossil fuels toward renewable energy sources over the period. In 2000, coal accounted for 45% of energy production, followed by natural gas at 30%. By 2025, coal had fallen to 25%, while solar and wind had risen from a combined 5% to 30%.',tips:'用 account for / represent / make up 描述占比。比较两个饼图的变化时，强调增减和替代关系。'},
  table:{title:'表格 Table',desc:'从表格中提取关键趋势和对比',prompt:'The table below shows the average monthly spending in dollars of three different income groups on five categories in 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',example:'Overall, the high-income group spent the most across all categories, while housing was the largest expense for all three groups. The low-income group spent $450 on housing, compared to $1,200 for the high-income group. Notably, spending on entertainment showed the widest gap, with the high-income group spending six times more than the low-income group.',tips:'选最有对比价值的数据描述，不需要每个数字都提。用 compared to / whereas / in contrast 做对比。'},
  process:{title:'流程图 Process Diagram',desc:'描述一个过程或生命周期的各个阶段',prompt:'The diagram below shows the process of producing instant noodles. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',example:'Overall, the production of instant noodles involves eight stages, from raw material storage to final packaging. First, flour is transported from storage silos to a mixer, where it is combined with water and oil. The resulting dough is then rolled into sheets and cut into strips. These strips are then cooked in oil, dried, and cooled. Finally, the noodles are packaged along with seasoning sachets.',tips:'用 First/Then/Next/Subsequently/Finally 描述顺序。大量使用被动语态：is mixed/are cut/are packaged。'},
  map:{title:'地图题 Map',desc:'描述地理位置的变化或布局',prompt:'The maps below show the changes to a town centre between 2005 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',example:'Overall, the town centre underwent significant development, with new commercial and leisure facilities replacing older structures. In 2005, the centre was dominated by a large car park and several small shops. By 2025, the car park had been replaced by a shopping mall, and a new pedestrian zone had been created. The old library was demolished and replaced by a cinema complex.',tips:'用 was replaced by / was demolished / was constructed / was extended 描述变化。Overview 概括总体变化方向。'},
};

export default function Task1Page() {
  const [chartType, setChartType] = useState<ChartType>('line');
  const [essay, setEssay] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);

  const prompt = PROMPTS[chartType];

  const handleSubmit = async () => {
    if (!essay.trim() || essay.trim().split(/\s+/).length < 30) return;
    setLoading(true);
    try {
      const uk=typeof window!=='undefined'?localStorage.getItem('user-api-key'):null;const h: any = {'Content-Type': 'application/json'};if(uk)h['x-api-key']=uk;const r=await fetch('/api/ai/writing',{method:'POST',headers:h,body:JSON.stringify({essay,taskType:'task1'})});
      const d=await r.json();if(d.needKey){alert('请先在仪表盘的 AI 配置中填入你的 DeepSeek API Key');setLoading(false);return;}if(!r.ok)throw new Error('批改暂不可用');
      setFeedback(d);
    } catch (e: any) { alert(e.message); }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-6 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/practice/writing" className="text-sm text-brand-600 hover:underline">← 写作训练</Link>
        <span className="text-gray-300">/</span>
        <span className="text-sm text-gray-500">Task 1</span>
      </div>

      <h1 className="text-2xl font-bold mb-2">写作 Task 1：图表描述</h1>
      <p className="text-gray-500 mb-6">6种图表类型 · 范例 + 结构模板 · AI 批改</p>

      {/* Chart Type Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CHART_TYPES.map(t => (<button key={t} onClick={()=>{setChartType(t);setFeedback(null);setEssay('');}}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${chartType===t?'bg-brand-600 text-white':'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>{PROMPTS[t].title}</button>))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-semibold mb-2">{prompt.title}</h3>
            <p className="text-xs text-gray-400 mb-3">{prompt.desc}</p>
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 mb-4 whitespace-pre-wrap">{prompt.prompt}</div>
            <h4 className="text-xs font-medium text-gray-500 mb-2">范例 Overview + Body</h4>
            <div className="bg-blue-50 rounded-xl p-4 text-sm text-gray-700 mb-4 whitespace-pre-wrap">{prompt.example}</div>
            <div className="bg-amber-50 rounded-xl p-3 text-xs text-amber-700">💡 {prompt.tips}</div>
            <textarea value={essay} onChange={e=>setEssay(e.target.value)} placeholder="在这里写你的 Task 1 作文（至少150词）..."
              className="w-full h-48 mt-4 p-4 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-500"/>
            <button onClick={handleSubmit} disabled={loading||essay.trim().split(/\s+/).length<30}
              className="mt-3 w-full py-3 bg-brand-600 text-white rounded-xl font-medium hover:bg-brand-700 disabled:opacity-50 flex items-center justify-center gap-2">
              {loading?<Loader2 className="w-4 h-4 animate-spin"/>:<Send className="w-4 h-4"/>}{loading?'批改中...':'提交 AI 批改'}
            </button>
          </div>
        </div>

        <div>
          {feedback ? (<div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="text-center mb-4"><div className="text-5xl font-bold text-brand-600">{feedback.bandScore}</div><p className="text-sm text-gray-500">预估 IELTS 写作分数</p></div>
            <div className="space-y-3 mb-4">
              {[{label:'任务完成',s:feedback.subScores?.taskResponse},{label:'连贯衔接',s:feedback.subScores?.coherenceAndCohesion},{label:'词汇资源',s:feedback.subScores?.lexicalResource},{label:'语法准确性',s:feedback.subScores?.grammaticalRangeAndAccuracy}].map(x=>(<div key={x.label} className="flex items-center gap-3"><span className="w-20 text-xs text-gray-500">{x.label}</span><div className="flex-1 bg-gray-100 rounded-full h-2"><div className="h-2 rounded-full bg-brand-500" style={{width:`${((x.s||0)/9)*100}%`}}/></div><span className="text-xs font-medium">{x.s||'-'}</span></div>))}
            </div>
            {feedback.overallComment&&(<div className="bg-gray-50 rounded-xl p-4 mb-4"><h4 className="font-semibold text-sm mb-2">总体评价</h4><p className="text-sm text-gray-600">{feedback.overallComment}</p></div>)}
            {feedback.suggestions?.length>0&&(<div><h4 className="font-semibold text-sm mb-2">修改建议</h4><div className="space-y-2">{feedback.suggestions.map((s:any,i:number)=>(<div key={i} className="bg-orange-50 border border-orange-100 rounded-lg p-3 text-sm"><span className="line-through text-red-400">{s.originalText}</span>{' → '}<span className="text-green-600 font-medium">{s.correctedText}</span><p className="text-orange-600 text-xs mt-1">{s.explanation}</p></div>))}</div></div>)}
          </div>):(<div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 text-center"><div className="text-4xl mb-3">📊</div><p className="text-gray-400 text-sm">选择图表类型，参考范例，写完后提交 AI 批改</p></div>)}
        </div>
      </div>
    </div>);
}
