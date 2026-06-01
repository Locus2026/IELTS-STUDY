import { NextRequest, NextResponse } from 'next/server';
import { isLocalRequest } from '@/lib/api-auth';

export async function POST(request: NextRequest) {
  try {
    const { transcript, partNumber } = await request.json();
    if (!transcript || transcript.trim().length < 10) {
      return NextResponse.json({ error: '内容太短' }, { status: 400 });
    }

    const apiEndpoint = process.env.AI_API_ENDPOINT;
    const serverKey = process.env.AI_API_KEY;
    const clientKey = request.headers.get('x-api-key');
    const isLocal = isLocalRequest(request);
    const apiKey = isLocal ? serverKey : clientKey;

    if (!apiKey || !apiEndpoint) {
      return NextResponse.json({
        error: '需要配置 API Key',
        message: '公网用户请在网站设置中填入你的 API Key。同一 WiFi 下的设备自动使用服务器 Key。',
        needKey: true,
      }, { status: 401 });
    }

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: process.env.AI_MODEL || 'deepseek-chat',
        messages: [
          { role: 'system', content: `你是雅思口语考官。评估 Part ${partNumber} 回答。返回 JSON：{overallBand(0-9), subScores:{fluencyAndCoherence,pronunciation,lexicalResource,grammaticalRangeAndAccuracy}, overallComment(中文), tips:[{category,advice(中文),example}]}` },
          { role: 'user', content: transcript },
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
      overallBand: 5.5,
      subScores: { fluencyAndCoherence: 5.5, pronunciation: 5.5, lexicalResource: 5.5, grammaticalRangeAndAccuracy: 5.5 },
      overallComment: 'AI 评估暂不可用',
      tips: [],
      transcript,
    });
  } catch {
    return NextResponse.json({ error: '评估服务异常' }, { status: 500 });
  }
}
