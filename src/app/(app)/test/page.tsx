'use client';

export default function TestPage() {
  const speak = () => {
    const u = new SpeechSynthesisUtterance('Hello, this is a test');
    u.lang = 'en-US';
    speechSynthesis.speak(u);
    alert('TTS triggered!');
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">PWA 交互测试</h1>
      <button onClick={speak} className="px-6 py-4 bg-brand-600 text-white rounded-xl text-lg">
        🔊 点我测试语音
      </button>
      <p className="mt-4 text-sm text-gray-500">如果弹出 alert 说明 onClick 正常工作</p>
    </div>
  );
}
