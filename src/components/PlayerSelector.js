// src/components/PlayerSelector.js
import React from 'react';
import Select from 'react-select';

const PlayerSelector = ({ players, onChange, label }) => (
    <div className="PlayerSelector">
        <label>{label}</label>
        <Select
            className="dropdown"
            options={players}
            // Adjust onChange to pass the selected option (player object) directly
            onChange={(selectedOption) => onChange(selectedOption)}
            getOptionLabel={(player) => player.name}
            getOptionValue={(player) => player.id}
        // isClearable
        />
    </div>
);

export default PlayerSelector;
