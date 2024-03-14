// App.js
import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import PlayerSelector from './components/PlayerSelector';
import BarChart from './components/BarChart';

function App() {
  const [playersData, setPlayersData] = useState([]);
  const [selectedPlayer1, setSelectedPlayer1] = useState({});
  const [selectedPlayer2, setSelectedPlayer2] = useState({});

  useEffect(() => {
    const fetchPlayerData = async () => {
      const theSportsDBApiKey = "3";
      const ballDontLieApiKey = "07bcd3e7-2f7c-4f6c-904b-4b835d67ccba";
      const season = 2023;
      const playerNames = ["Stephen Curry", "LeBron James"];

      // First, fetch detailed player information including images from TheSportsDB
      const playersWithImages = await Promise.all(playerNames.map(async (name) => {
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${theSportsDBApiKey}/searchplayers.php?p=${encodeURIComponent(name)}`);
        const data = await response.json();
        if (data.player && data.player.length > 0) {
          return {
            ...data.player[0],
            name: data.player[0].strPlayer,
            image: data.player[0].strCutout, // Assuming strCutout is the desired image property
          };
        }
        return null;
      }));

      // Filter out null values (if any player wasn't found)
      const validPlayersWithImages = playersWithImages.filter(Boolean);

      // Fetch player IDs and season averages from BallDontLlie API
      const playerStats = await Promise.all(validPlayersWithImages.map(async (player) => {
        // Fetch player ID
        const playerResponse = await fetch(`https://api.balldontlie.io/v1/players?search=${player.strPlayer.split(" ")[1]}`, {
          headers: { 'Authorization': ballDontLieApiKey }
        });
        const playerData = await playerResponse.json();
        const playerDetails = playerData.data.find(p => `${p.first_name} ${p.last_name}` === player.strPlayer);

        if (playerDetails) {
          // Fetch season averages using player ID
          const averagesResponse = await fetch(`https://api.balldontlie.io/v1/season_averages?season=${season}&player_ids[]=${playerDetails.id}`, {
            headers: { 'Authorization': ballDontLieApiKey }
          });
          const averagesData = await averagesResponse.json();
          return {
            ...player,
            id: playerDetails.id,
            seasonAverages: averagesData.data[0] // Assumes there's only one set of averages per player
          };
        }
        return player; // Return player details without stats if not found
      }));

      setPlayersData(playerStats);
    };

    fetchPlayerData();
  }, []);

  // console.log(playersData)


  // useMemo to only update on changes
  const filteredData = useMemo(() => [selectedPlayer1, selectedPlayer2].filter(Boolean), [selectedPlayer1, selectedPlayer2]);

  return (
    <div className="App">
      <h1>Compare NBA Player Stats</h1>
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
