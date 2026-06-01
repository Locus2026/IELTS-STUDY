import { NextRequest, NextResponse } from 'next/server';
import { isLocalRequest } from '@/lib/api-auth';

const cache: Record<string, { chinese: string; phonetic: string; pos: string; example: string; audioUrl: string }> = {};

export async function GET(request: NextRequest) {
  const word = request.nextUrl.searchParams.get('word');
  if (!word) return NextResponse.json({ error: '缺少word参数' }, { status: 400 });

  const key = word.toLowerCase().trim();
  if (cache[key]) return NextResponse.json(cache[key]);

  let englishDef = '', phonetic = '', pos = '', example = '', audioUrl = '';

  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(key)}`);
    if (res.ok) {
      const data = await res.json();
      const entry = data[0];
      phonetic = entry.phonetic || entry.phonetics?.find((p: any) => p.text)?.text || '';
      audioUrl = entry.phonetics?.find((p: any) => p.audio)?.audio || '';
      const meaning = entry.meanings?.[0];
      pos = meaning?.partOfSpeech || '';
      englishDef = meaning?.definitions?.[0]?.definition || '';
      example = meaning?.definitions?.[0]?.example || '';
    }
  } catch {}

  let chinese = englishDef;
  const apiEndpoint = process.env.AI_API_ENDPOINT;
  const serverKey = process.env.AI_API_KEY;
  const clientKey = request.headers.get('x-api-key');
  const apiKey = isLocalRequest(request) ? serverKey : clientKey;

  if (englishDef && apiKey && apiEndpoint) {
    try {
      const aiRes = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: process.env.AI_MODEL || 'deepseek-chat',
          messages: [
            { role: 'system', content: '将英文释义翻译成简洁中文。只返回翻译。' },
            { role: 'user', content: englishDef },
          ],
          temperature: 0.1, max_tokens: 80,
        }),
      });
      if (aiRes.ok) {
        const d = await aiRes.json();
        chinese = d.choices?.[0]?.message?.content?.trim() || englishDef;
      }
    } catch {}
  }

  if (!chinese || chinese === englishDef) {
    chinese = FALLBACK[key] || englishDef || '(释义暂缺)';
  }

  const result = { chinese, phonetic, pos, example, audioUrl };
  cache[key] = result;
  return NextResponse.json(result);
}

const FALLBACK: Record<string, string> = {
  'declined': '下降；减少', 'dramatically': '急剧地', 'transition': '转变', 'accelerated': '加速的',
  'digital': '数字的', 'convenient': '方便的', 'privacy': '隐私', 'vulnerable': '脆弱的',
  'unprecedented': '前所未有的', 'cognitive': '认知的', 'mandatory': '强制性的',
  'robust': '稳健的', 'significant': '显著的', 'environment': '环境', 'education': '教育',
};
