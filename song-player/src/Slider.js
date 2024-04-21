import React from 'react';

const Slider = ({ label, value, onChange, min, max, step }) => {
    return (
        <div className="inputFieldWrapper">
            <label htmlFor={`${label}Slider`} className="inputFieldLabel">
                {label}:
            </label>
            <input
                id={`${label}Slider`}
                className="inputField"
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={onChange}
                title=""
            />
        </div>
    );
};

export default Slider;
