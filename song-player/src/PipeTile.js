// src/components/PipeTile.js
import React from 'react';
import './PipeTile.css';

const PipeTile = ({ type, rotation, onClick, isFilled = false }) => {
  const getPipeClass = () => {
    // Determine the CSS class based on type and rotation
    const filled = isFilled ? '-filled' : '';
    return `${type}${filled} rotate-${rotation}`;
  };

  return (
    <div className={`pipe-tile ${getPipeClass()}`} onClick={onClick}></div>
  );
};

export default PipeTile;
