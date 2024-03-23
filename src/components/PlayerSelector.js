// src/components/PlayerSelector.js
import React from 'react';
import Select from 'react-select';

const PlayerSelector = ({ players, onChange, label }) => (
    <div className="PlayerSelector">
        <Select
            className="dropdown"
            options={players}
            // Adjust onChange to pass the selected option (player object) directly
            onChange={(selectedOption) => onChange(selectedOption)}
            getOptionLabel={(player) => player.name}
            getOptionValue={(player) => player.id}
            placeholder={"Select Player"}
        // isClearable
        />
    </div>
);

export default PlayerSelector;
