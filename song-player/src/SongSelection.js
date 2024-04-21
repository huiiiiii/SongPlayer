import React from 'react';

const SongSelection = ({ selectedSong, loadSong }) => {
    return (
        <div>
            <label htmlFor="songSelect">Lied auswählen: </label>
            <select
                id="songSelect"
                className="selectField"
                value={selectedSong}
                onChange={(e) => loadSong(e.target.value)}
            >
                <option value="">Auswählen</option>
                <option value="song1.mp3">Lied 1</option>
                <option value="song2.mp3">Lied 2</option>
                <option value="song3.mp3">Lied 3</option>
            </select>
        </div>
    );
};

export default SongSelection;
