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
    // Prioritize non-local (remote) Chinese voice for quality (starts with 'zh')
    let chineseVoice = voices.find(voice => voice.lang.startsWith('zh') && !voice.localService);
    if (!chineseVoice) {
      // Fallback to any available Chinese voice (local or remote)
      chineseVoice = voices.find(voice => voice.lang.startsWith('zh'));
    }

    if (chineseVoice) {
      utterance.voice = chineseVoice;
    } else {
      console.warn("No Chinese voice found. Falling back to system default.");
      // For now, let's just log a warning and let the browser use its default behavior.
    }
    window.speechSynthesis.speak(utterance);
  }
}; // Corrected closing brace