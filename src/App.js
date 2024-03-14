import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import PlayerSelector from './components/PlayerSelector';
import BarChart from './components/BarChart';

function App() {
  const [playersData, setPlayersData] = useState([]);
  const [selectedPlayer1, setSelectedPlayer1] = useState(null);
  const [selectedPlayer2, setSelectedPlayer2] = useState(null);

  // Fetch players from TheSportsDB on component mount
  useEffect(() => {
    const fetchPlayers = async () => {
      // Assuming you're looking for specific players, adjust as necessary
      const playerNames = ["LeBron James", "Stephen Curry"]; // Example names
      const players = [];

      for (const name of playerNames) {
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${encodeURIComponent(name)}`);
        const data = await response.json();
        if (data.player && data.player.length > 0) {
          // Assuming the first result is the desired player
          const player = data.player[0];
          players.push({
            id: player.idPlayer,
            name: player.strPlayer,
            pointsPerGame: 'N/A', // TheSportsDB might not provide specific stats like points per game
            image: player.strThumb // Player image URL
          });
        }
      }

      setPlayersData(players);
    };

    fetchPlayers().catch(console.error);
  }, []);

  // useMemo to filter selected players for the chart
  const filteredData = useMemo(() => {
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
        {selectedPlayer1 && selectedPlayer1.image && <img src={selectedPlayer1.image} alt={selectedPlayer1.name} />}
        {selectedPlayer2 && selectedPlayer2.image && <img src={selectedPlayer2.image} alt={selectedPlayer2.name} />}
      </div>
      <BarChart data={filteredData} /> {/* Pass filteredData based on selections */}
    </div>
  );
}

export default App;
