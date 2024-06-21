import React from 'react';
import {initialGrid1, initialGrid2, initialGrid3, initialGrid4, initialGrid5, initialGrid6, initialGrid7, initialGrid8, initialGrid9, initialGrid10} from "./InitialGrids";

// Map the selected level to the corresponding level data
//ToDo weitere songs und grids hinzufügen
const levelData = {
    'default': { id: 'default', song: '', grid: [] },
    'level1': { id: 'level1', song: 'Alexander Rybak - Fairytale - LIVE Norway 🇳🇴 Grand Final Eurovision 2009.mp3', grid: initialGrid1 },
    'level2': { id: 'level2', song: 'Daði og Gagnamagnið - Think About Things - Iceland 🇮🇸 - Official Video - Eurovision 2020.mp3', grid: initialGrid2 },
    'level3': { id: 'level3', song: 'Frans - If I Were Sorry - 🇸🇪 Sweden - Grand Final - Eurovision 2016.mp3', grid: initialGrid3 },
    'level4': { id: 'level4', song: 'Kalush Orchestra - Stefania - LIVE - Ukraine 🇺🇦 - Grand Final - Eurovision 2022.mp4', grid: initialGrid4 },
    'level5': { id: 'level5', song: 'KEiiNO - Spirit In The Sky - Norway 🇳🇴 - Grand Final - Eurovision 2019.mp3', grid: initialGrid5 },
    'level6': { id: 'level6', song: 'Käärijä - Cha Cha Cha -LIVE- Finland 🇫🇮 Grand Final Eurovision 2023.mp3', grid: initialGrid6 },
    'level7': { id: 'level7', song: 'Lordi - Hard Rock Hallelujah - 🇫🇮 Finland - Grand Final - Eurovision 2006 Winner.mp4', grid: initialGrid7 },
    'level8': { id: 'level8', song: 'Måns Zelmerlöw - Heroes -Sweden- - LIVE at Eurovision 2015 Grand Final.mp3', grid: initialGrid8 },
    'level9': { id: 'level9', song: 'Nemo - The Code -LIVE- Switzerland🇨🇭 Grand Final Eurovision 2024.mp3', grid: initialGrid9 },
    'level10': { id: 'level10', song: 'Netta - Toy - Israel - LIVE - Grand Final - Eurovision 2018.mp3', grid: initialGrid10 },
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
                <option value='level4'>Level 4</option>
                <option value='level5'>Level 5</option>
                <option value='level6'>Level 6</option>
                <option value='level7'>Level 7</option>
                <option value='level8'>Level 8</option>
                <option value='level9'>Level 9</option>
                <option value='level10'>Level 10</option>
            </select>
        </div>
    );
};

export default LevelSelection;
