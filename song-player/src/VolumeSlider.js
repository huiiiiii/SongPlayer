import React from 'react';

const VolumeSlider = ({ volume, handleVolumeChange }) => {
    return (
        <div className="inputFieldWrapper">
            <label htmlFor="volumeSlider" className="inputFieldLabel">
                Lautstärke:
            </label>
            <input
                id="volumeSlider"
                className="inputField"
                type="range"
                min="-48"
                max="12"
                step="1"
                value={volume}
                onChange={handleVolumeChange}
            />
        </div>
    );
};

export default VolumeSlider;
