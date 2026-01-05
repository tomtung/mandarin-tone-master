import React from 'react';

const ToneInput = ({ onToneSelect, incorrectShake }) => {
  const tones = [1, 2, 3, 4, 0]; // 0 for neutral tone
  const toneSymbols = {
    1: '¯',
    2: '´',
    3: 'ˇ',
    4: 'ˋ',
    0: '•',
  };

  return (
    <div className={`tone-input ${incorrectShake ? 'incorrect-shake' : ''}`}>
      <div className="tone-buttons">
        {tones.map((tone) => (
          <button
            key={tone}
            onClick={() => onToneSelect(tone)}
          >
            <span className="tone-symbol">{toneSymbols[tone]}</span>
            <span className="tone-number">{tone}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToneInput;
