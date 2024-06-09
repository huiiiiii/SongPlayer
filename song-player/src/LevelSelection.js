import React from 'react';

const LevelSelection = ({ selectedSong: selectedLevel, loadSong: loadLevel }) => {
    return (
        <div>
            <label htmlFor="songSelect">Level auswählen: </label>
            <select
                id="songSelect"
                className="selectField"
                value={selectedLevel}
                onChange={(e) => loadLevel(e.target.value)}
            >
                <option value="">Auswählen</option>
                <option value="song1.mp3">Level 1</option>
                <option value="song2.mp3">Level 2</option>
                <option value="song3.mp3">Level 3</option>
            </select>
        </div>
    );
};

export default LevelSelection;
