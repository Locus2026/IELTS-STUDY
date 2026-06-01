import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { webhookUrl, title, content, color } = await request.json();

    if (!webhookUrl) {
      return NextResponse.json({ error: '缺少 webhookUrl' }, { status: 400 });
    }

    const card = {
      msg_type: 'interactive',
      card: {
        header: {
          title: { content: title || 'IELTS Bridge', tag: 'plain_text' },
          template: color || 'blue',
        },
        elements: [
          { tag: 'markdown', content: content || '无内容' },
          { tag: 'hr' },
          {
            tag: 'note',
            elements: [{ tag: 'plain_text', content: '⏰ ' + new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }) + ' · IELTS Bridge 学习助手' }],
          },
        ],
      },
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(card),
    });

    const result = await response.json();
    return NextResponse.json({ success: true, feishuResponse: result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
