import { NextRequest, NextResponse } from 'next/server';

const EDGE_TTS_URL = 'https://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=6A5AA1D4EAFF4E9FB37E23D68491D6F4';

async function textToSpeech(text: string, voice: string): Promise<Buffer> {
  const ssml = `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'>
  <voice name='${voice}'>${text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</voice>
</speak>`;

  const res = await fetch(EDGE_TTS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-24khz-160kbitrate-mono-mp3',
      'User-Agent': 'Mozilla/5.0',
    },
    body: ssml,
  });

  if (!res.ok) throw new Error(`Edge TTS failed: ${res.status}`);
  const buf = await res.arrayBuffer();
  return Buffer.from(buf);
}

export async function POST(request: NextRequest) {
  try {
    const { text, lines } = await request.json();
    const chunks: Buffer[] = [];

    if (lines && Array.isArray(lines)) {
      for (const line of lines) {
        const voice = line.speaker === 'male' ? 'en-US-GuyNeural' : 'en-US-AriaNeural';
        chunks.push(await textToSpeech(line.text, voice));
      }
    } else if (text) {
      chunks.push(await textToSpeech(text, 'en-US-AriaNeural'));
    } else {
      return NextResponse.json({ error: 'Missing text or lines' }, { status: 400 });
    }

    const combined = Buffer.concat(chunks);
    return new NextResponse(combined, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': String(combined.length),
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
