'use client';

import { useState } from 'react';
import { GUIDE, GUIDE_SUMMARY, type GuideSection } from '@/content/guide';
import { ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function GuidePage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    Object.fromEntries(GUIDE.map((s) => [s.id, true]))
  );

  const toggle = (id: string) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  return (
    <div className="max-w-3xl mx-auto p-4 lg:p-6 pb-20">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">📖 雅思从 0 到 1：零基础备考完全指南</h1>
        <p className="text-sm text-gray-400">British Council / IDP / Cambridge 官方资料及多源交叉验证</p>
      </div>

      {/* Summary card */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl p-6 text-white mb-6">
        <p className="text-brand-50 text-sm leading-relaxed">{GUIDE_SUMMARY}</p>
      </div>

      {/* Sidebar jump links */}
      <div className="flex flex-wrap gap-2 mb-6">
        {GUIDE.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-full hover:border-brand-300 hover:text-brand-600 transition-colors"
          >
            {section.icon} {section.title.slice(0, 4)}
          </a>
        ))}
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {GUIDE.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            expanded={expanded[section.id]}
            onToggle={() => toggle(section.id)}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm mb-4">看完指南，准备好开始学习了吗？</p>
        <div className="flex gap-3 justify-center">
          <Link href="/learn" className="px-6 py-3 bg-brand-600 text-white rounded-xl font-medium hover:bg-brand-700 transition-colors">
            进入课程中心
          </Link>
          <Link href="/practice/mock-test/1" className="px-6 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors">
            开始模考
          </Link>
        </div>
      </div>
    </div>
  );
}

function SectionCard({ section, expanded, onToggle }: { section: GuideSection; expanded: boolean; onToggle: () => void }) {
  return (
    <div id={section.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center gap-3 p-5 text-left hover:bg-gray-50 transition-colors">
        <span className="text-xl">{section.icon}</span>
        <h2 className="font-semibold flex-1">{section.title}</h2>
        {expanded ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-gray-50 pt-4">
          {section.content.map((block, i) => {
            if (block.type === 'text') {
              return <p key={i} className="text-sm text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: block.text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />;
            }
            if (block.type === 'subheading') {
              return <h3 key={i} className="font-semibold text-base text-gray-800 pt-2">{block.text}</h3>;
            }
            if (block.type === 'quote') {
              return (
                <blockquote key={i} className="border-l-4 border-brand-400 pl-4 py-2 bg-brand-50 rounded-r-lg text-sm text-gray-600 italic">
                  {block.text}
                </blockquote>
              );
            }
            if (block.type === 'checklist') {
              return (
                <ul key={i} className="space-y-1.5">
                  {block.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-brand-500 mt-0.5 flex-shrink-0">✅</span>
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }
            if (block.type === 'table') {
              return (
                <div key={i} className="overflow-x-auto -mx-2">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        {block.headers.map((h, j) => (
                          <th key={j} className="text-left px-3 py-2 text-gray-600 font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, j) => (
                        <tr key={j} className="border-b border-gray-100 hover:bg-gray-50">
                          {row.map((cell, k) => (
                            <td key={k} className="px-3 py-2 text-gray-700">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}
