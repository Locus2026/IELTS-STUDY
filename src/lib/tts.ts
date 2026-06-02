let voiceCache: SpeechSynthesisVoice[] | null = null;

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const voices = speechSynthesis.getVoices();
    if (voices.length) { voiceCache = voices; resolve(voices); return; }
    speechSynthesis.onvoiceschanged = () => {
      voiceCache = speechSynthesis.getVoices();
      resolve(voiceCache);
    };
    // Timeout fallback
    setTimeout(() => { if (!voiceCache) { voiceCache = speechSynthesis.getVoices(); resolve(voiceCache); } }, 500);
  });
}

function getFemaleVoice(): SpeechSynthesisVoice | null {
  const voices = voiceCache || speechSynthesis.getVoices();
  const prefs = ['Samantha', 'Karen', 'Microsoft Zira', 'Google US English Female'];
  for (const n of prefs) {
    const v = voices.find(v => v.name.includes(n) && v.lang.startsWith('en'));
    if (v) return v;
  }
  return voices.find(v => v.lang.startsWith('en')) || null;
}

function getMaleVoice(): SpeechSynthesisVoice | null {
  const voices = voiceCache || speechSynthesis.getVoices();
  const prefs = ['Daniel', 'Alex', 'Microsoft David', 'Google UK English Male'];
  for (const n of prefs) {
    const v = voices.find(v => v.name.includes(n) && v.lang.startsWith('en'));
    if (v) return v;
  }
  return getFemaleVoice();
}

export function createUtterance(text: string, rate = 0.85): SpeechSynthesisUtterance {
  const u = new SpeechSynthesisUtterance(text);
  const voice = getFemaleVoice();
  if (voice) { u.voice = voice; u.lang = voice.lang; }
  u.rate = rate;
  return u;
}

type DialogueLine = { speaker: 'male' | 'female'; text: string };

export async function speakDialogue(lines: DialogueLine[], rate = 0.85): Promise<void> {
  speechSynthesis.cancel();
  await loadVoices(); // Ensure voices are loaded
  const maleVoice = getMaleVoice();
  const femaleVoice = getFemaleVoice();

  lines.forEach((line, i) => {
    const utterance = new SpeechSynthesisUtterance(line.text);
    utterance.voice = line.speaker === 'male' ? maleVoice : femaleVoice;
    if (utterance.voice) utterance.lang = utterance.voice.lang;
    utterance.rate = rate;
    setTimeout(() => speechSynthesis.speak(utterance), i * 500);
  });
}

export function parseDialogue(script: string): DialogueLine[] {
  const lines: DialogueLine[] = [];
  // Detect speaker turns by matching "Name: text" patterns
  const regex = /([A-Za-z ]{2,30}?):\s*([^:]+?)(?=\n\n[A-Za-z ]{2,30}:|\n[A-Za-z ]{2,30}:|$)/g;
  let match;
  while ((match = regex.exec(script)) !== null) {
    const speaker = match[1].trim();
    const text = match[2].trim().replace(/\n/g, ' ');
    const isFemale = /Receptionist|Sarah|Mary|Linda|Sue|Anna|Jessica|Emma|Woman|Female|Girl|Mrs|Ms|Mother|Sister|Aunt/i.test(speaker);
    lines.push({ speaker: isFemale ? 'female' : 'male', text });
  }
  // Fallback: split by double newlines
  if (!lines.length) {
    const paragraphs = script.split(/\n\n+/);
    for (const para of paragraphs) {
      const colonIdx = para.indexOf(':');
      if (colonIdx > 1 && colonIdx < 30) {
        const speaker = para.substring(0, colonIdx).trim();
        const text = para.substring(colonIdx + 1).trim().replace(/\n/g, ' ');
        const isFemale = /Receptionist|Sarah|Mary|Linda|Sue|Anna|Jessica|Emma|Woman|Female|Girl|Mrs|Ms|Mother|Sister|Aunt/i.test(speaker);
        lines.push({ speaker: isFemale ? 'female' : 'male', text });
      } else if (para.trim()) {
        lines.push({ speaker: 'female', text: para.trim().replace(/\n/g, ' ') });
      }
    }
  }
  return lines.length ? lines : [{ speaker: 'female', text: script.replace(/\n/g, ' ') }];
}
