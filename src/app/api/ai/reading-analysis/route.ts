import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { title, passage, questions } = await request.json() as { title: string; passage: string; questions: any[] };
    if (!passage) return NextResponse.json({ error: 'Missing passage' }, { status: 400 });

    const sentences = passage.split(/(?<=[.!?])\s+/);
    const commonWords = new Set(['about','after','also','another','around','because','become','before','being','between','bring','cannot','change','children','coming','could','country','course','during','early','economic','education','english','enough','especially','every','example','family','following','general','getting','giving','government','great','group','having','health','higher','himself','important','including','increase','industry','information','interest','issues','itself','language','large','later','leading','living','looking','making','management','market','members','million','months','national','natural','needed','number','others','outside','particular','people','period','person','planning','policy','political','population','possible','practice','private','problem','process','provide','public','question','rather','really','recent','report','research','result','running','school','second','section','service','several','should','similar','simple','social','society','special','states','still','studies','support','system','taking','themselves','these','things','think','though','through','together','towards','training','university','various','whether','within','without','working','world','would']);
    const words: string[] = (passage.toLowerCase().match(/\b[a-z]{5,}\b/g) || []) as string[];
    const freq: Record<string, number> = {};
    words.forEach((w: string) => { if (!commonWords.has(w)) freq[w] = (freq[w] || 0) + 1; });
    const vocab: { word: string; count: number }[] = Object.entries(freq)
      .filter(([, c]) => c >= 2)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([w, c]) => ({ word: w, count: c }));

    const points = (questions || []).map((q: any, i: number) => {
      let locSentence = '';
      let locPos = '';
      for (let j = 0; j < sentences.length; j++) {
        if (sentences[j].toLowerCase().includes(q.answer.toLowerCase())) {
          locSentence = sentences[j].trim();
          locPos = `Paragraph ${Math.floor(j / 3) + 1}`;
          break;
        }
      }
      const skill = q.type === 't-f-ng' ? 'True=article supports, False=article contradicts, NG=not mentioned' :
        q.type === 'multiple-choice' ? 'Find keywords, locate in text, compare with options' :
          'Predict word type first, then scan text for the exact word';
      return {
        questionIndex: i + 1, stem: q.stem, type: q.type, answer: q.answer,
        point: `Answer "${q.answer}" found in: ${locSentence || '(manual check needed)'} (${locPos || 'manual'})`,
        skill, location: { sentence: locSentence, position: locPos },
      };
    });

    return NextResponse.json({ vocab, points, title });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
