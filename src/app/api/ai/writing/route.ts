import { NextRequest, NextResponse } from 'next/server';
import { isLocalRequest } from '@/lib/api-auth';

export async function POST(request: NextRequest) {
  try {
    const { essay, taskType } = await request.json();
    if (!essay || essay.trim().length < 30) {
      return NextResponse.json({ error: '作文内容太短' }, { status: 400 });
    }

    const apiEndpoint = process.env.AI_API_ENDPOINT;
    const serverKey = process.env.AI_API_KEY;
    const clientKey = request.headers.get('x-api-key');
    const isLocal = isLocalRequest(request);

    // Use server key for local network, client key for public
    const apiKey = isLocal ? serverKey : clientKey;

    if (!apiKey || !apiEndpoint) {
      if (isLocal && !serverKey) {
        return NextResponse.json({ error: '服务器未配置 AI。请在 .env.local 中设置 AI_API_KEY。' }, { status: 500 });
      }
      return NextResponse.json({
        error: '需要配置 API Key',
        message: '公网用户需要配置自己的 DeepSeek API Key。请在网站设置中填入你的 API Key。',
        needKey: true,
      }, { status: 401 });
    }

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: process.env.AI_MODEL || 'deepseek-chat',
        messages: [
          { role: 'system', content: `你是一位经验丰富的雅思写作考官。请评估这篇 IELTS Writing ${taskType === 'task1' ? 'Task 1' : 'Task 2'} 作文。返回 JSON：{bandScore(0-9), subScores:{taskResponse,coherenceAndCohesion,lexicalResource,grammaticalRangeAndAccuracy}, overallComment(中文), suggestions:[{type,originalText,correctedText,explanation}]}` },
          { role: 'user', content: essay },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.3,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(JSON.parse(data.choices?.[0]?.message?.content || '{}'));
    }

    return NextResponse.json({
      bandScore: 5.5,
      subScores: { taskResponse: 5.5, coherenceAndCohesion: 5.5, lexicalResource: 5.5, grammaticalRangeAndAccuracy: 5.5 },
      overallComment: 'AI 批改服务暂时不可用，请稍后重试。',
      suggestions: [],
    });
  } catch {
    return NextResponse.json({ error: '批改服务异常' }, { status: 500 });
  }
}
