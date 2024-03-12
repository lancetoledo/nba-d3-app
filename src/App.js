// src/App.js
import React, { useState } from 'react';
import './App.css';
import PlayerSelector from './components/PlayerSelector';

function App() {
  const [players] = useState([
    { id: '1', name: 'Player 1' }, // Placeholder data
    { id: '2', name: 'Player 2' }, // You should fetch real data
  ]);
  const [selectedPlayer1, setSelectedPlayer1] = useState(null);
  const [selectedPlayer2, setSelectedPlayer2] = useState(null);

  return (
    <div className="App">
      <h1>NBA Player Stats Comparator</h1>
      <div className="selectors">
        <PlayerSelector players={players} onChange={setSelectedPlayer1} label="Select Player 1" />
        <PlayerSelector players={players} onChange={setSelectedPlayer2} label="Select Player 2" />
      </div>
      <div className="comparison-container">
        {selectedPlayer1 && selectedPlayer2 && (
          <p>Comparing: {selectedPlayer1.name} vs. {selectedPlayer2.name}</p>
        )}
      </div>
    </div>
  );
}

export default App;
