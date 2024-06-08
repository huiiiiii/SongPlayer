// src/components/Grid.js
import React, {useState} from 'react';
import PipeTile from './PipeTile';
import './Grid.css';

const initialGrid = [
    [
        {type: 't', rotation: 0}, {type: 'straight', rotation: 0}, {type: 't', rotation: 180}, {
        type: 'straight',
        rotation: 90
    }, {type: 'elbow', rotation: 270}, {type: 't', rotation: 0}, {type: 'straight', rotation: 90}
    ],
    [
        {type: 'elbow', rotation: 90}, {type: 'elbow', rotation: 180}, {type: 'elbow', rotation: 90}, {
        type: 't',
        rotation: 180
    }, {type: 'elbow', rotation: 0}, {type: 'elbow', rotation: 0}, {type: 'straight', rotation: 0}
    ],
    [
        {type: 't', rotation: 270}, {type: 'straight', rotation: 0}, {type: 'start', rotation: 0}, {
        type: 'elbow',
        rotation: 90
    }, {type: 't', rotation: 0}, {type: 't', rotation: 0}, {type: 'straight', rotation: 0}
    ],
    [
        {type: 'straight', rotation: 0}, {type: 'elbow', rotation: 180}, {type: 't', rotation: 90}, {
        type: 'start',
        rotation: 0
    }, {type: 'elbow', rotation: 180}, {type: 'straight', rotation: 0}, {type: 't', rotation: 270}
    ],
    [
        {type: 'elbow', rotation: 90}, {type: 't', rotation: 180}, {type: 't', rotation: 90}, {
        type: 'elbow',
        rotation: 0
    }, {type: 'elbow', rotation: 180}, {type: 'elbow', rotation: 90}, {type: 't', rotation: 180}
    ],
    [
        {type: 'straight', rotation: 90}, {type: 'straight', rotation: 0}, {type: 't', rotation: 270}, {
        type: 'elbow',
        rotation: 180
    }, {type: 'straight', rotation: 90}, {type: 'straight', rotation: 0}, {type: 'elbow', rotation: 180}
    ],
    [
        {type: 'elbow', rotation: 270}, {type: 'elbow', rotation: 90}, {type: 'straight', rotation: 0}, {
        type: 't',
        rotation: 270
    }, {type: 'straight', rotation: 0}, {type: 'straight', rotation: 90}, {type: 'elbow', rotation: 90}
    ],
];


const Grid = () => {
    const [grid, setGrid] = useState(initialGrid);

    const rotatePipe = (x, y) => {
        console.log(`click ${x}, ${y}`)
        const newGrid = grid.map((row, rowIndex) =>
            row.map((tile, colIndex) => {
                if (rowIndex === x && colIndex === y) {
                    // Rotate the tile
                    return {type: tile.type, rotation: (tile.rotation + 90) % 360};
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
