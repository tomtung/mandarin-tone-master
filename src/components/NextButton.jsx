import React from 'react';
import ShuffleIcon from './ShuffleIcon';

const NextButton = ({ onNext }) => {
  return (
    <button onClick={onNext} className="shuffle-button">
      <ShuffleIcon />
    </button>
  );
};

export default NextButton;
