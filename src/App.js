import React, { useState, useMemo } from 'react'; // useMemo imported to create memoized data
import './App.css';
import PlayerSelector from './components/PlayerSelector';
import BarChart from './components/BarChart';

function App() {
  const [playersData] = useState([
    { id: '1', name: "Player 1", pointsPerGame: 25 },
    { id: '2', name: "Player 2", pointsPerGame: 30 },
    // Additional players can be added here
  ]);
  const [selectedPlayer1, setSelectedPlayer1] = useState(null);
  const [selectedPlayer2, setSelectedPlayer2] = useState(null);

  // useMemo to filter selected players for the chart
  const filteredData = useMemo(() => {
    // Filter out any unselected (null) players
    return [selectedPlayer1, selectedPlayer2].filter(Boolean);
  }, [selectedPlayer1, selectedPlayer2]);

  return (
    <div className="App">
      <h1>NBA Player Stats Comparator</h1>
      <div className="selectors">
        <PlayerSelector players={playersData} onChange={setSelectedPlayer1} label="Select Player 1" />
        <PlayerSelector players={playersData} onChange={setSelectedPlayer2} label="Select Player 2" />
      </div>
      <div className="comparison-container">
        {selectedPlayer1 && selectedPlayer2 && (
          <p>Comparing: {selectedPlayer1.name} vs. {selectedPlayer2.name}</p>
        )}
      </div>
      <BarChart data={filteredData} /> {/* Pass filteredData based on selections */}
    </div>
  );
}

export default App;
