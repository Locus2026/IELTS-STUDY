// Get best English voice for natural sound (macOS = Samantha, Windows = Zira)
export function getBestVoice(): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return null;
  const prefs = ['Samantha','Alex','Karen','Microsoft Zira','Microsoft David','Google US English'];
  for (const n of prefs) {
    const v = voices.find(v => v.name.includes(n) && v.lang.startsWith('en'));
    if (v) return v;
  }
  return voices.find(v => v.lang.startsWith('en')) || voices[0];
}

// Create utterance with best voice
export function createUtterance(text: string, rate = 0.85): SpeechSynthesisUtterance {
  const u = new SpeechSynthesisUtterance(text);
  const voice = getBestVoice();
  if (voice) { u.voice = voice; u.lang = voice.lang; }
  u.rate = rate;
  return u;
}
