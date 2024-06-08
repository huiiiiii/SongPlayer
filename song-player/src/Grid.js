// src/components/Grid.js
import React, {useState, useEffect} from 'react';
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

const pipeConnections = {
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
const directionOffsets = {
    'U': [-1, 0],
    'R': [0, 1],
    'D': [1, 0],
    'L': [0, -1]
};

// Reverse direction mapping to check back connections
const reverseDirection = {
    'U': 'D',
    'R': 'L',
    'D': 'U',
    'L': 'R'
};

const Grid = () => {
    const [grid, setGrid] = useState(initialGrid);

    const getConnectedTiles = (grid, startX, startY) => {
        const numRows = grid.length;
        const numCols = grid[0].length;
        const connected = Array.from({length: numRows}, () => Array(numCols).fill(false));

        // Helper function to perform DFS
        const dfs = (x, y) => {
            if (x < 0 || x >= numRows || y < 0 || y >= numCols || connected[x][y]) {
                return;
            }

            connected[x][y] = true; // Mark this tile as connected
            const {type, rotation} = grid[x][y];

            // Get the possible connections for this pipe type and rotation
            const possibleConnections = pipeConnections[type][rotation];

            for (const direction of possibleConnections) {
                const [dx, dy] = directionOffsets[direction];
                const newX = x + dx;
                const newY = y + dy;

                // Check if the new coordinates are valid
                if (newX >= 0 && newX < numRows && newY >= 0 && newY < numCols) {
                    const neighborPipe = grid[newX][newY];
                    const reverseDir = reverseDirection[direction];

                    // Check if the neighbor pipe has a matching connection
                    if (!connected[newX][newY] && pipeConnections[neighborPipe.type][neighborPipe.rotation].includes(reverseDir)) {
                        dfs(newX, newY); // Continue the DFS with the neighboring tile
                    }
                }
            }
        };

        dfs(startX, startY); // Start the DFS from the initial pipe
        return connected; // Return the grid marking connected tiles
    };

    function markConnectedTiles(newGrid) {
        const connectedTiles = getConnectedTiles(newGrid, 3, 3);

        const coloredGrid = newGrid.map((row, rowIndex) =>
            row.map((tile, colIndex) => {
                return {type: tile.type, rotation: tile.rotation, isFilled: connectedTiles[rowIndex][colIndex]};
            })
        );
        setGrid(coloredGrid);
    }

    // Call markConnectedTiles on component mount
    useEffect(() => {
        markConnectedTiles(grid);
    }, []);

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
        markConnectedTiles(newGrid);
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
                        isFilled={tile.isFilled}
                    />
                ))
            )}
        </div>
    );
};

export default Grid;
