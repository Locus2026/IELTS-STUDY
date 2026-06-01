import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { webhookUrl, nickname, streak, vocabCount, totalXP, targetScore, pendingTasks } = await request.json();

    if (!webhookUrl) {
      return NextResponse.json({ error: '缺少 webhookUrl' }, { status: 400 });
    }

    const timeOfDay = new Date().getHours();
    const greeting = timeOfDay < 12 ? '早上好' : timeOfDay < 18 ? '下午好' : '晚上好';

    const taskList = (pendingTasks || []).map((t: string, i: number) => `${i + 1}. ${t}`).join('\n');

    const card = {
      msg_type: 'interactive',
      card: {
        header: {
          title: { content: `🌅 ${greeting}，${nickname || '学习者'}！`, tag: 'plain_text' },
          template: 'blue',
        },
        elements: [
          {
            tag: 'markdown',
            content: `**今日学习提醒**\n\n${greeting}！新的一天开始了，别忘了今天的学习任务哦～\n\n🔥 连续打卡：**${streak || 0}** 天\n📚 已掌握词汇：**${vocabCount || 0}** 个\n⭐ 总 XP：**${totalXP || 0}**\n🎯 目标分数：**${targetScore || 6.5}** 分`,
          },
          ...(taskList ? [{
            tag: 'markdown' as const,
            content: `📋 **今日推荐任务**\n${taskList}`,
          }] : []),
          { tag: 'hr' as const },
          {
            tag: 'action' as const,
            actions: [
              { tag: 'button', text: { tag: 'plain_text' as const, content: '开始学习' }, type: 'primary', url: 'http://localhost:3457/dashboard' },
            ],
          },
          {
            tag: 'note' as const,
            elements: [{ tag: 'plain_text' as const, content: '⏰ 每日自动推送 · IELTS Bridge' }],
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
