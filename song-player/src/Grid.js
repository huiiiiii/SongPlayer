// src/components/Grid.js
import React, {useEffect, useState} from 'react';
import PipeTile, {directionOffsets, pipeConnections, reverseDirection} from './PipeTile';
import './Grid.css';

const Grid = ({selectedGrid: selectedGrid, changeSolvedTilesInRow: changeSolvedTilesInRow}) => {
    const [grid, setGrid] = useState(selectedGrid);

    // Call markConnectedTiles on component mount and on every change of selectedGrid from App.js
    useEffect(() => {
        if (selectedGrid.length > 0) {
            console.log("set grid to", selectedGrid)
            markConnectedTiles(selectedGrid);
        } else {
            setGrid([]);
        }
    }, [selectedGrid]);

    const getConnectedTiles = (newGrid, startX, startY) => {
        const numRows = newGrid.length;
        const numCols = newGrid[0].length;
        const connected = Array.from({length: numRows}, () => Array(numCols).fill(false));

        // Helper function to perform DFS
        const dfs = (x, y) => {
            if (x < 0 || x >= numRows || y < 0 || y >= numCols || connected[x][y]) {
                return;
            }

            connected[x][y] = true; // Mark this tile as connected
            const {type, rotation} = newGrid[x][y];

            // Get the possible connections for this pipe type and rotation
            const possibleConnections = pipeConnections[type][rotation];

            for (const direction of possibleConnections) {
                const [dx, dy] = directionOffsets[direction];
                const newX = x + dx;
                const newY = y + dy;

                // Check if the new coordinates are valid
                if (newX >= 0 && newX < numRows && newY >= 0 && newY < numCols) {
                    const neighborPipe = newGrid[newX][newY];
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
        const amountSolvedTiles = Array(newGrid.length).fill(0)

        const coloredGrid = newGrid.map((row, rowIndex) =>
            row.map((tile, colIndex) => {
                amountSolvedTiles[rowIndex] = connectedTiles[rowIndex][colIndex] ? amountSolvedTiles[rowIndex] + 1 : amountSolvedTiles[rowIndex];
                return {type: tile.type, rotation: tile.rotation, isFilled: connectedTiles[rowIndex][colIndex]};
            })
        );

        const numCols = newGrid[0].length;
        const percentPerRow = amountSolvedTiles.map((row, _) => {
                return (row / (numCols)) * 100;
            }
        );
        setGrid(coloredGrid);
        changeSolvedTilesInRow(percentPerRow);
    }

    const rotatePipe = (x, y) => {
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
