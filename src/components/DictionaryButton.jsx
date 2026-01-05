import React from 'react';
import MagnifyingGlassIcon from './MagnifyingGlassIcon';

const DictionaryButton = ({ sentence }) => {
  const handleDictionaryLookup = () => {
    const url = `https://www.mdbg.net/chinese/dictionary?wdqb=${encodeURIComponent(sentence)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button onClick={handleDictionaryLookup} className="dictionary-button">
      <MagnifyingGlassIcon />
    </button>
  );
};

export default DictionaryButton;