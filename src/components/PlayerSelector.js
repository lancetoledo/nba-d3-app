// src./components/PlayerSelector.js
import React from 'react';
import Select from 'react-select';

const PlayerSelector = ({ players, onChange, label }) => (
    <div className="PlayerSelector">
        <label>{label}</label>
        <Select
            className="dropdown"
            options={players}
            onChange={onChange}
            getOptionLabel={(player) => player.name}
            getOptionValue={(player) => player.id}
        />
    </div>
);

export default PlayerSelector;
