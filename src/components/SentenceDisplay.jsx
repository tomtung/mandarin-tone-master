import React from 'react';

const SentenceDisplay = ({ sentence, highlightedCharIndex, userTones, incorrectAttempts }) => {
  return (
    <div className="sentence-display">
      {sentence.split('').map((char, index) => {
        let className = 'character';
        if (index === highlightedCharIndex) {
          className += incorrectAttempts[index] ? ' incorrect-active-character' : ' active-character';
        } else if (userTones[index] !== null && incorrectAttempts[index]) {
          className += ' corrected-character';
        }
        return (
          <span key={index} className={className}>
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default SentenceDisplay;
