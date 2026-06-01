'use client';

import { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Settings2, Trash2, Eye, EyeOff } from 'lucide-react';

export function FeishuSettings() {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [configured, setConfigured] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success'|'fail'|null>(null);
  const [showSetup, setShowSetup] = useState(false);
  const [showUrl, setShowUrl] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('feishu-webhook');
    if (stored) { setWebhookUrl(stored); setConfigured(true); }
  }, []);

  const save = () => {
    if (!webhookUrl.trim()) return;
    localStorage.setItem('feishu-webhook', webhookUrl.trim());
    setConfigured(true);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const remove = () => {
    localStorage.removeItem('feishu-webhook');
    setWebhookUrl('');
    setConfigured(false);
    setTestResult(null);
    setEditing(false);
  };

  const testSend = async () => {
    if (!webhookUrl.trim()) return;
    setTesting(true);
    try {
      const res = await fetch('/api/feishu/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          webhookUrl: webhookUrl.trim(),
          title: '🎯 测试消息',
          content: '**IELTS Bridge** 飞书集成测试成功！\n\n如果你收到这条消息，说明配置正确。\n\n打卡后将自动同步学习报告到本群。',
          color: 'green',
        }),
      });
      setTestResult(res.ok ? 'success' : 'fail');
    } catch { setTestResult('fail'); }
    setTesting(false);
  };

  const maskedUrl = webhookUrl ? webhookUrl.slice(0, 45) + '••••••••' : '';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <Settings2 className="w-5 h-5 text-gray-500" /> 飞书集成
        </h2>
        <div className="flex items-center gap-2">
          {configured && (
            <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="w-3 h-3" /> 已连接
            </span>
          )}
          <button onClick={() => setShowSetup(!showSetup)} className="text-xs text-brand-600 hover:underline">
            {showSetup ? '收起教程' : '配置教程'}
          </button>
        </div>
      </div>

      {showSetup && (
        <div className="bg-blue-50 rounded-xl p-4 mb-4 text-sm text-blue-800 space-y-2">
          <p className="font-medium">📖 飞书机器人配置步骤：</p>
          <p><strong>1.</strong> 打开飞书 → 进入群聊 → 群设置 → 群机器人</p>
          <p><strong>2.</strong> 添加<strong>自定义机器人</strong>，设置名称</p>
          <p><strong>3.</strong> 复制 Webhook 地址（<code className="bg-blue-100 px-1 rounded text-xs">https://open.feishu.cn/open-apis/bot/v2/hook/...</code>）</p>
          <p><strong>4.</strong> 粘贴到下方，点击保存并测试</p>
          <p className="text-xs text-blue-500 mt-2">💡 Webhook 地址相当于密码。保存后会自动隐藏，不会明文展示。</p>
        </div>
      )}

      {!configured || editing ? (
        /* Editing / First setup */
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="password"
              value={webhookUrl}
              onChange={e => setWebhookUrl(e.target.value)}
              placeholder="粘贴飞书机器人 Webhook 地址..."
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
              autoComplete="off"
            />
            <button onClick={save} disabled={!webhookUrl.trim()}
              className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 disabled:opacity-50 transition-colors">
              保存
            </button>
            {configured && (
              <button onClick={() => setEditing(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-gray-50">
                取消
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Connected state - URL hidden */
        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 mb-1">已保存的 Webhook</p>
              <p className="text-sm font-mono text-gray-600 truncate select-none">
                {showUrl ? webhookUrl : maskedUrl}
              </p>
            </div>
            <button onClick={() => setShowUrl(!showUrl)}
              className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              title={showUrl ? '隐藏' : '查看'}>
              {showUrl ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={testSend} disabled={testing}
              className="flex items-center gap-1.5 px-4 py-2 border border-brand-200 text-brand-600 rounded-lg text-sm hover:bg-brand-50 disabled:opacity-50 transition-colors">
              <Send className="w-4 h-4"/> {testing ? '测试中...' : '发送测试'}
            </button>
            <button onClick={() => { setEditing(true); setTestResult(null); }}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-gray-50">
              重新配置
            </button>
            <button onClick={remove}
              className="flex items-center gap-1 px-4 py-2 border border-red-100 text-red-500 rounded-lg text-sm hover:bg-red-50 transition-colors">
              <Trash2 className="w-4 h-4"/> 移除
            </button>
          </div>

          {testResult === 'success' && (
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 rounded-lg px-3 py-2">
              <CheckCircle2 className="w-4 h-4"/> 测试成功！飞书群已收到消息。打卡后将自动同步。
            </div>
          )}
          {testResult === 'fail' && (
            <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">
              <AlertCircle className="w-4 h-4"/> 发送失败。请重新配置 Webhook 地址。
            </div>
          )}
        </div>
      )}
    </div>
  );
}
