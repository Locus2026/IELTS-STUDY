'use client';

import { useState } from 'react';
import { useNotesStore, type NoteItem } from '@/stores/notes-store';
import { useIsHydrated } from '@/providers/providers';
import { Trash2, BookOpen, Lightbulb, Library, FileText, Search, Filter } from 'lucide-react';

const typeConfig: Record<string, {icon:typeof Library;label:string;color:string}> = {
  'vocab': {icon:Library,label:'词汇',color:'bg-red-50 text-red-600'},
  'grammar': {icon:BookOpen,label:'语法',color:'bg-purple-50 text-purple-600'},
  'test-point': {icon:Lightbulb,label:'考点',color:'bg-amber-50 text-amber-600'},
  'sentence': {icon:FileText,label:'句型',color:'bg-green-50 text-green-600'},
};

export default function NotesPage() {
  const hydrated = useIsHydrated();
  const { items, removeNote, clearAll } = useNotesStore();
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  if (!hydrated) return <div className="p-8"><div className="animate-pulse h-64 bg-gray-200 rounded-2xl"/></div>;

  const filtered = items.filter(i => {
    if (filter !== 'all' && i.type !== filter) return false;
    if (search && !i.content.toLowerCase().includes(search.toLowerCase()) && !(i.translation||'').toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const typeCounts = {all:items.length} as Record<string,number>;
  items.forEach(i => { typeCounts[i.type]=(typeCounts[i.type]||0)+1; });

  return (
    <div className="max-w-3xl mx-auto p-4 lg:p-6 pb-20">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">学习笔记</h1>
          <p className="text-sm text-gray-500">从阅读训练的考点分析中保存的词汇和考点</p>
        </div>
        {items.length>0 && (
          <button onClick={()=>{if(confirm('确定清空所有笔记？'))clearAll();}}
            className="text-xs text-red-400 hover:text-red-600 flex items-center gap-1">
            <Trash2 className="w-3 h-3"/> 清空
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <div className="text-5xl mb-4">📝</div>
          <h2 className="font-semibold text-lg mb-2">还没有笔记</h2>
          <p className="text-sm text-gray-500 mb-4">
            完成阅读训练后，点击考点分析和重点词汇旁边的 <span className="text-brand-600">🔖</span> 按钮保存到笔记
          </p>
          <a href="/practice/reading" className="inline-block px-6 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-medium hover:bg-brand-700">
            去阅读训练 →
          </a>
        </div>
      ) : (
        <>
          {/* Filter + Search */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-1">
              {Object.entries({all:'全部',vocab:'词汇',grammar:'语法','test-point':'考点',sentence:'句型'}).map(([k,v])=>(
                <button key={k} onClick={()=>setFilter(k)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter===k?'bg-brand-600 text-white':'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                  {v} {typeCounts[k]?`(${typeCounts[k]})`:''}
                </button>
              ))}
            </div>
            <div className="flex-1"/>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-300 absolute left-3 top-1/2 -translate-y-1/2"/>
              <input type="text" value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="搜索笔记..." className="pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg text-sm w-40 focus:outline-none focus:ring-2 focus:ring-brand-500"/>
            </div>
          </div>

          {/* Notes list */}
          <div className="space-y-2">
            {filtered.map(note => {
              const cfg = typeConfig[note.type]||typeConfig['vocab'];
              const Icon = cfg.icon;
              return (
                <div key={note.id} className="bg-white rounded-xl border border-gray-100 p-4 hover:border-gray-200 transition-colors group">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${cfg.color}`}>
                      <Icon className="w-4 h-4"/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-400">{cfg.label}</span>
                        {note.source && <span className="text-xs text-gray-300">· {note.source}</span>}
                      </div>
                      <p className="font-medium text-sm text-gray-800">{note.content}</p>
                      {note.translation && <p className="text-xs text-gray-400 mt-0.5">{note.translation}</p>}
                      <p className="text-[10px] text-gray-300 mt-1">{new Date(note.createdAt).toLocaleString('zh-CN')}</p>
                    </div>
                    <button onClick={()=>removeNote(note.id)}
                      className="flex-shrink-0 p-1.5 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                      <Trash2 className="w-4 h-4"/>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
