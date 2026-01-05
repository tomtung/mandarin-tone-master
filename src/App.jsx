import React, { useState, useEffect } from 'react';
import sentencesData from './data/sentences.json';
import SentenceDisplay from './components/SentenceDisplay';
import AudioPlayer from './components/AudioPlayer';
import ToneInput from './components/ToneInput';
import NextButton from './components/NextButton';
import DictionaryButton from './components/DictionaryButton';
import { speak } from './utils/tts';
import { playChime } from './utils/audio';
import './App.css';

function App() {
  const [shuffledIndices, setShuffledIndices] = useState([]);
  const [shuffledIndex, setShuffledIndex] = useState(0);
  const [userTones, setUserTones] = useState([]);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [incorrectShake, setIncorrectShake] = useState(false);
  const [incorrectAttempts, setIncorrectAttempts] = useState([]);
  const [isStarted, setIsStarted] = useState(false);

  // Shuffle sentences on initial load
  useEffect(() => {
    const indices = Array.from(sentencesData.keys());
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setShuffledIndices(indices);
  }, []);

  const currentSentenceData = sentencesData[shuffledIndices[shuffledIndex]];
  const sentence = currentSentenceData ? currentSentenceData[0] : '';
  const tones = currentSentenceData ? currentSentenceData[1].split('').map(t => t === ' ' ? null : Number(t)) : [];

  // Initialize and autoplay audio when currentSentence changes
  useEffect(() => {
    if (isStarted && sentence) {
      speak(sentence);
      setUserTones(new Array(tones.length).fill(null));
      setIncorrectAttempts(new Array(tones.length).fill(false));

      let firstCharIndex = 0;
      while (firstCharIndex < sentence.length && tones[firstCharIndex] === null) {
        firstCharIndex++;
      }
      setCurrentCharIndex(firstCharIndex);
    }
  }, [shuffledIndex, isStarted]);

  const handleToneSelect = (tone) => {
    if (tones[currentCharIndex] === null) return;

    if (tone === tones[currentCharIndex]) {
      playChime();
      const newTones = [...userTones];
      newTones[currentCharIndex] = tone;
      setUserTones(newTones);

      let lastCharIndex = tones.length - 1;
      while (lastCharIndex >= 0 && tones[lastCharIndex] === null) {
        lastCharIndex--;
      }

      if (currentCharIndex === lastCharIndex) {
        setCurrentCharIndex(sentence.length); // Move highlight out of bounds
        speak(sentence);
        setTimeout(() => handleNextSentence(), 1500);
      } else {
        let nextCharIndex = currentCharIndex + 1;
        while (nextCharIndex < tones.length && tones[nextCharIndex] === null) {
          nextCharIndex++;
        }
        setCurrentCharIndex(nextCharIndex);
      }
    } else {
      const newIncorrectAttempts = [...incorrectAttempts];
      newIncorrectAttempts[currentCharIndex] = true;
      setIncorrectAttempts(newIncorrectAttempts);
      speak(sentence); // Speak the whole sentence on incorrect
      setIncorrectShake(true);
      setTimeout(() => setIncorrectShake(false), 820);
    }
  };

  const handleNextSentence = () => {
    if (shuffledIndex === shuffledIndices.length - 1) {
      const indices = Array.from(sentencesData.keys());
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      setShuffledIndices(indices);
      setShuffledIndex(0);
    } else {
      setShuffledIndex((prevIndex) => prevIndex + 1);
    }
  };
  
  const handleStart = () => {
    setIsStarted(true);
  };

  if (!isStarted) {
    return (
      <div className="container">
        <button onClick={handleStart} className="start-button">Start Practice</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Mandarin Tone Master</h1>
      {sentence && (
        <>
          <div className="sentence-container">
            <SentenceDisplay
              sentence={sentence}
              highlightedCharIndex={currentCharIndex}
              userTones={userTones}
              incorrectAttempts={incorrectAttempts}
            />
            <div className="icon-buttons-container">
              <AudioPlayer textToSpeak={sentence} />
              <NextButton onNext={handleNextSentence} />
              <DictionaryButton sentence={sentence} />
            </div>
          </div>
          <ToneInput
            onToneSelect={handleToneSelect}
            incorrectShake={incorrectShake}
          />
        </>
      )}
    </div>
  );
}

export default App;