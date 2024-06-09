import React from 'react';
import {initialGrid1, initialGrid2, initialGrid3} from "./InitialGrids";

// Map the selected level to the corresponding level data
//ToDo weitere songs und grids hinzufügen
const levelData = {
    'default': { id: 'default', song: '', grid: [] },
    'level1': { id: 'level1', song: 'song1.mp3', grid: initialGrid1 },
    'level2': { id: 'level2', song: 'song2.mp3', grid: initialGrid2 },
    'level3': { id: 'level3', song: 'song3.mp3', grid: initialGrid3 },
};

const LevelSelection = ({selectedLevel: selectedLevel, loadLevel: loadLevel}) => {
    return (
        <div>
            <label htmlFor="songSelect">Level auswählen: </label>
            <select
                id="songSelect"
                className="selectField"
                value={selectedLevel.id}
                onChange={(e) => loadLevel(levelData[e.target.value])}
            >
                <option value='default'>Auswählen</option>
                <option value='level1'>Level 1</option>
                <option value='level2'>Level 2</option>
                <option value='level3'>Level 3</option>
            </select>
        </div>
    );
};

export default LevelSelection;
