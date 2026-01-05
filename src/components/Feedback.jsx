import React from 'react';

const Feedback = ({ sentence, userTones, correctTones, showFeedback }) => {
  if (!showFeedback) {
    return null;
  }

  const isPunctuation = (char) => /[\p{P}\p{Z}]/u.test(char);
  const characters = sentence.split('');

  const isCorrect = characters.every((char, index) => {
    if (isPunctuation(char)) {
      return true; // Ignore punctuation
    }
    return userTones[index] === correctTones[index];
  });

  return (
    <div className="feedback">
      {isCorrect ? (
        <p style={{ color: 'green' }}>Correct! Well done!</p>
      ) : (
        <p style={{ color: 'red' }}>Incorrect. Try again!</p>
      )}
    </div>
  );
};

export default Feedback;
