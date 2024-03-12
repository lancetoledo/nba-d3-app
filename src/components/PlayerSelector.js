// src/PlayerSelector.js
import React from 'react';
// import Select from 'react-select';

const PlayerSelector = ({ players, onChange, label }) => (
    <div>
        <label>{label}</label>
        {/* <Select
            options={players}
            onChange={onChange}
            getOptionLabel={(player) => player.name} // Determines what is displayed in the dropdown list
            getOptionValue={(player) => player.id} // Determines the value associated with each dropdown item
        /> */}
    </div>
);

export default PlayerSelector;
