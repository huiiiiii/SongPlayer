// src/components/Grid.js
import React, { useState } from 'react';
import PipeTile from './PipeTile';
import './Grid.css';

const initialGrid = [
  // Example 7x7 grid with initial pipe orientations
  [{ type: 'straight', rotation: 0 }, { type: 'elbow', rotation: 0 }, ...],
  ...
];

const Grid = () => {
  const [grid, setGrid] = useState(initialGrid);

  const rotatePipe = (x, y) => {
    const newGrid = grid.map((row, rowIndex) =>
      row.map((tile, colIndex) => {
        if (rowIndex === x && colIndex === y) {
          // Rotate the tile
          return { ...tile, rotation: (tile.rotation + 90) % 360 };
        }
        return tile;
      })
    );
    setGrid(newGrid);
  };

  return (
    <div className="grid">
      {grid.map((row, rowIndex) =>
        row.map((tile, colIndex) => (
          <PipeTile
            key={`${rowIndex}-${colIndex}`}
            type={tile.type}
            rotation={tile.rotation}
            onClick={() => rotatePipe(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};

export default Grid;
