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

export const pipeConnections = {
  'straight': {
    0: ['U', 'D'], // Vertical
    90: ['L', 'R'], // Horizontal
    180: ['U', 'D'],
    270: ['L', 'R']
  },
  'elbow': {
    0: ['R', 'D'],
    90: ['D', 'L'],
    180: ['L', 'U'],
    270: ['U', 'R']
  },
  't': {
    0: ['U', 'R', 'D'],
    90: ['R', 'D', 'L'],
    180: ['D', 'L', 'U'],
    270: ['L', 'U', 'R']
  },
  'start': {
    0: ['U', 'R', 'D'],
    90: ['R', 'D', 'L'],
    180: ['D', 'L', 'U'],
    270: ['L', 'U', 'R']
  },
  'end': {
    0: ['L'],
    90: ['U'],
    180: ['R'],
    270: ['D']
  }
};

// Direction to grid coordinates mapping
export const directionOffsets = {
  'U': [-1, 0],
  'R': [0, 1],
  'D': [1, 0],
  'L': [0, -1]
};

// Reverse direction mapping to check back connections
export const reverseDirection = {
  'U': 'D',
  'R': 'L',
  'D': 'U',
  'L': 'R'
};
