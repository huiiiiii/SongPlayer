// src/components/PipeTile.js
import React from 'react';
import './PipeTile.css';

const PipeTile = ({ type, rotation, onClick }) => {
  const getPipeClass = () => {
    // Determine the CSS class based on type and rotation
    return `${type} rotate-${rotation}`;
  };

  return (
    <div className={`pipe-tile ${getPipeClass()}`} onClick={onClick}></div>
  );
};

export default PipeTile;
