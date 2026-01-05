import React from 'react';
import { speak } from '../utils/tts';
import SpeakerIcon from './SpeakerIcon';

const AudioPlayer = ({ textToSpeak }) => {
  const playAudio = () => {
    speak(textToSpeak);
  };

  return (
    <button onClick={playAudio} className="speaker-button">
      <SpeakerIcon />
    </button>
  );
};

export default AudioPlayer;
