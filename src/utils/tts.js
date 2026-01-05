let cachedVoices = null;

const getVoices = () => {
  return new Promise((resolve) => {
    if (cachedVoices) {
      resolve(cachedVoices);
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    if (voices.length) {
      cachedVoices = voices;
      resolve(voices);
      return;
    }

    window.speechSynthesis.onvoiceschanged = () => {
      const voices = window.speechSynthesis.getVoices();
      cachedVoices = voices;
      resolve(voices);
    };
  });
};

export const speak = async (text) => {
  if ('speechSynthesis' in window) {
    const voices = await getVoices();
    const utterance = new SpeechSynthesisUtterance(text);
    const chineseVoice = voices.find(voice => voice.lang === 'zh-CN' && voice.localService);
    if (chineseVoice) {
      utterance.voice = chineseVoice;
    } else {
      const fallbackVoice = voices.find(voice => voice.lang === 'zh-CN');
      if (fallbackVoice) {
        utterance.voice = fallbackVoice;
      }
    }
    window.speechSynthesis.speak(utterance);
  }
};