'use client';

import { useState, useEffect } from 'react';
import { Key, Eye, EyeOff, Trash2, CheckCircle2 } from 'lucide-react';

export function AIKeySettings() {
  const [apiKey, setApiKey] = useState('');
  const [configured, setConfigured] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('user-api-key');
    if (stored) { setApiKey(stored); setConfigured(true); }
  }, []);

  const save = () => {
    if (!apiKey.trim()) return;
    localStorage.setItem('user-api-key', apiKey.trim());
    setConfigured(true); setEditing(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const remove = () => {
    localStorage.removeItem('user-api-key');
    setApiKey(''); setConfigured(false); setEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <Key className="w-5 h-5 text-gray-500" /> AI 配置
        </h2>
        <div className="flex items-center gap-2">
          {configured && (
            <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="w-3 h-3" /> 已配置
            </span>
          )}
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {configured ? '公网模式' : '本地网络模式'}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-3">
        {configured
          ? '已配置自定义 API Key，公网访问将使用你的 Key。'
          : '同一 WiFi 下自动使用服务器 Key，无需配置。公网部署后，其他用户需在此配置自己的 API Key。'}
      </p>

      {!configured || editing ? (
        <div className="flex gap-2">
          <input type="password" value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder="粘贴 DeepSeek API Key (sk-...)"
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500"/>
          <button onClick={save} disabled={!apiKey.trim()}
            className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 disabled:opacity-50">
            {saved ? '已保存' : '保存'}
          </button>
          {configured && <button onClick={() => setEditing(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm">取消</button>}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
            <code className="flex-1 text-sm text-gray-600 truncate select-none">
              {showKey ? apiKey : apiKey.slice(0, 8) + '••••••••••••••••'}
            </code>
            <button onClick={() => setShowKey(!showKey)}
              className="p-1.5 text-gray-400 hover:text-gray-600">{showKey ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}</button>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setEditing(true)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">修改</button>
            <button onClick={remove} className="flex items-center gap-1 px-4 py-2 border border-red-100 text-red-500 rounded-lg text-sm hover:bg-red-50"><Trash2 className="w-4 h-4"/> 移除</button>
          </div>
        </div>
      )}
    </div>
  );
}
