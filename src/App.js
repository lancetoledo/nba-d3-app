// App.js
import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import PlayerSelector from './components/PlayerSelector';
import BarChart from './components/BarChart';

function App() {
  const [playersData, setPlayersData] = useState([]);
  const [selectedPlayer1, setSelectedPlayer1] = useState({});
  const [selectedPlayer2, setSelectedPlayer2] = useState({});

  // useEffect(() => {
  //   const apiKey = "3";
  //   const playerNames = ["Stephen Curry", "LeBron James"];
  //   const fetchPlayers = async () => {
  //     const playersFetched = await Promise.all(playerNames.map(async (name) => {
  //       const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${apiKey}/searchplayers.php?p=${encodeURIComponent(name)}`);
  //       const data = await response.json();
  //       if (data.player && data.player.length > 0) {
  //         return {
  //           ...data.player[0],
  //           // Normalize the id to ensure it's selectable
  //           id: data.player[0].idPlayer,
  //           name: data.player[0].strPlayer,
  //           // Include other data as needed
  //         };
  //       }
  //       return null;
  //     }));

  //     setPlayersData(playersFetched.filter(Boolean));
  //   };

  //   fetchPlayers();
  // }, []);

  useEffect(() => {
    const fetchPlayers = async () => {
      const apiKey = "07bcd3e7-2f7c-4f6c-904b-4b835d67ccba"; // Replace YOUR_API_KEY with your actual API key
      try {
        const response = await fetch('https://api.balldontlie.io/v1/players', {
          headers: {
            'Authorization': apiKey
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        // Process and set the players data as needed
        const players = data.data.map(player => ({
          id: player.id.toString(), // Ensure ID is a string for react-select compatibility
          name: `${player.first_name} ${player.last_name}`,
          // Add any additional player info you need
        }));
        setPlayersData(players);
      } catch (error) {
        console.error("Failed to fetch players:", error);
      }
    };

    fetchPlayers();
  }, []);

  // useMemo to only update on changes
  const filteredData = useMemo(() => [selectedPlayer1, selectedPlayer2].filter(Boolean), [selectedPlayer1, selectedPlayer2]);

  return (
    <div className="App">
      <h1>NBA Player Stats Comparator</h1>
      <div className="selectors">
        <PlayerSelector players={playersData} onChange={(selected) => setSelectedPlayer1(selected)} label="Select Player 1" />
        <PlayerSelector players={playersData} onChange={(selected) => setSelectedPlayer2(selected)} label="Select Player 2" />
      </div>
      <div className="comparison-container">
        {[selectedPlayer1, selectedPlayer2].filter(Boolean).map((player, index) => (
          <div key={index}>
            <h2>{player.name}</h2>
            <p>Team: {player.strTeam}</p>
            <p>Position: {player.strPosition}</p>
            {player.strCutout && <img src={player.strCutout} alt={`Image of ${player.name}`} style={{ maxWidth: '100px' }} />}
            {/* Render additional player details as desired */}
          </div>
        ))}
      </div>
      <BarChart data={filteredData} />
    </div>
  );
}

export default App;
