// App.js
import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import PlayerSelector from './components/PlayerSelector';
import BarChart from './components/BarChart';
import RadarChart from './components/RadarChart';
import staticPlayersData from './playersData.json';


function App() {
  const [playersData, setPlayersData] = useState([]);
  const [selectedPlayer1, setSelectedPlayer1] = useState({});
  const [selectedPlayer2, setSelectedPlayer2] = useState({});



  // useEffect(() => {
  //   const fetchPlayerData = async () => {
  //     const theSportsDBApiKey = "3";
  //     const ballDontLieApiKey = "07bcd3e7-2f7c-4f6c-904b-4b835d67ccba";
  //     const season = 2023;
  //     const playerNames = ["Nikola Jokic", "Joel Embiid", "Luka Doncic", "Jayson Tatum"];
  //     // const topPlayerNames = [
  //     //   "LeBron James",
  //     //   "Kevin Durant",
  //     //   "Giannis Antetokounmpo",
  //     //   "Stephen Curry",
  //     //   "Nikola Jokic",
  //     //   "Joel Embiid",
  //     //   "Luka Doncic",
  //     //   "Kawhi Leonard",
  //     //   "Anthony Davis",
  //     //   "James Harden",
  //     //   "Damian Lillard",
  //     //   "Jayson Tatum",
  //     //   "Jimmy Butler",
  //     //   "Devin Booker",
  //     //   "Chris Paul",
  //     //   "Kyrie Irving",
  //     //   "Russell Westbrook",
  //     //   "Paul George",
  //     //   "Karl-Anthony Towns",
  //     //   "Bradley Beal",
  //     //   "Donovan Mitchell",
  //     //   "Zion Williamson",
  //     //   "Trae Young",
  //     //   "Ja Morant",
  //     //   "Bam Adebayo"
  //     // ]



  //     // First, fetch detailed player information including images from TheSportsDB
  //     const playersWithImages = await Promise.all(playerNames.map(async (name) => {
  //       const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${theSportsDBApiKey}/searchplayers.php?p=${encodeURIComponent(name)}`);
  //       const data = await response.json();
  //       if (data.player && data.player.length > 0) {
  //         return {
  //           ...data.player[0],
  //           name: data.player[0].strPlayer,
  //           image: data.player[0].strCutout, // Assuming strCutout is the desired image property
  //         };
  //       }
  //       return null;
  //     }));

  //     // Filter out null values (if any player wasn't found)
  //     const validPlayersWithImages = playersWithImages.filter(Boolean);

  //     // Fetch player IDs and season averages from BallDontLlie API
  //     const playerStats = await Promise.all(validPlayersWithImages.map(async (player) => {
  //       // Fetch player ID
  //       const playerResponse = await fetch(`https://api.balldontlie.io/v1/players?search=${player.strPlayer.split(" ")[1]}`, {
  //         headers: { 'Authorization': ballDontLieApiKey }
  //       });
  //       const playerData = await playerResponse.json();
  //       const playerDetails = playerData.data.find(p => `${p.first_name} ${p.last_name}` === player.strPlayer);

  //       console.log(playerDetails, "PLAYER IDS!!")

  //       if (playerDetails) {
  //         // Fetch season averages using player ID
  //         const averagesResponse = await fetch(`https://api.balldontlie.io/v1/season_averages?season=${season}&player_ids[]=${playerDetails.id}`, {
  //           headers: { 'Authorization': ballDontLieApiKey }
  //         });
  //         const averagesData = await averagesResponse.json();
  //         console.log(averagesData, "AVERAGES", player.name)
  //         return {
  //           ...player,
  //           id: playerDetails.id,
  //           seasonAverages: averagesData.data[0] // Assumes there's only one set of averages per player
  //         };
  //       }
  //       return player; // Return player details without stats if not found
  //     }));
  //     console.log(playerStats, "PLAYER STATS")
  //     setPlayersData(playerStats);
  //   };

  //   fetchPlayerData();
  // }, []);

  // useMemo to only update on changes

  const filteredData = useMemo(() => [selectedPlayer1, selectedPlayer2].filter(Boolean), [selectedPlayer1, selectedPlayer2]);

  return (
    <div className="App">
      <div className='header'><h1>🏀 Compare NBA Player Stats</h1></div>
      <div className='main'>
        <div className="player-selection-container">
          {[selectedPlayer1, selectedPlayer2].filter(Boolean).map((player, index) => (
            <div className='player-img-box' key={index}>
              {player && player.strCutout ? (
                <img src={player.strCutout} alt={`Image of ${player.name}`} style={{ maxWidth: '200px' }} />
              ) : (
                // Render a default player cutout here
                <img src={"https://icons.veryicon.com/png/o/miscellaneous/generic-icon-3/avatar-empty.png"} alt="Default player image" style={{ maxWidth: '200px' }} />
              )}
            </div>
          ))}
        </div>
        <div className="selectors">
          <PlayerSelector players={staticPlayersData} onChange={(selected) => setSelectedPlayer1(selected)} />
          <PlayerSelector players={staticPlayersData} onChange={(selected) => setSelectedPlayer2(selected)} />
        </div>

        <div className="comparison-container">
          <div className='comparison-label'><h2>Info</h2></div>
          <div className='compare-row'>
            <div className='compare-stats'>
              <span className="player-position">{selectedPlayer1.strPosition || ""}</span>
            </div>
            <div className='comparison-category'>Position</div>
            <div className='compare-stats'>
              <span className="player-position">{selectedPlayer2.strPosition}</span>
            </div>
          </div>
          <div className='compare-row'>
            <div className='compare-stats'>
              <span className="player-position">{selectedPlayer1.strTeam}</span>
            </div>
            <div className='comparison-category'>Team</div>
            <div className='compare-stats'>
              <span className="player-position">{selectedPlayer2.strTeam}</span>
            </div>
          </div>
          <div className='compare-row'>
            <div className='compare-stats'>
              <span className="player-position">#{selectedPlayer1.strNumber}</span>
            </div>
            <div className='comparison-category'>Jersey Number</div>
            <div className='compare-stats'>
              <span className="player-position">#{selectedPlayer2.strNumber}</span>
            </div>
          </div>
          {/* Stats Column */}
          {/* Points */}
          <div className='compare-row'>
            <div className={`compare-stats ${selectedPlayer1?.seasonAverages?.pts > selectedPlayer2?.seasonAverages?.pts ? 'highlight' : ''}`}>
              <span className="player-position">{selectedPlayer1?.seasonAverages?.pts ? parseFloat(selectedPlayer1.seasonAverages.pts).toFixed(1) : ""}</span>
            </div>
            <div className='comparison-category'>Points</div>
            <div className={`compare-stats ${selectedPlayer2?.seasonAverages?.pts > selectedPlayer1?.seasonAverages?.pts ? 'highlight-opponent' : ''}`}>
              <span className="player-position">{selectedPlayer2?.seasonAverages?.pts ? parseFloat(selectedPlayer2.seasonAverages.pts).toFixed(1) : ""}</span>
            </div>
          </div>
          {/* Rebounds */}
          <div className='compare-row'>
            <div className={`compare-stats ${selectedPlayer1?.seasonAverages?.reb > selectedPlayer2?.seasonAverages?.reb ? 'highlight' : ''}`}>
              <span className="player-position">{selectedPlayer1?.seasonAverages?.reb ? parseFloat(selectedPlayer1.seasonAverages.reb).toFixed(1) : ""}</span>
            </div>
            <div className='comparison-category'>Rebounds</div>
            <div className={`compare-stats ${selectedPlayer2?.seasonAverages?.reb > selectedPlayer1?.seasonAverages?.reb ? 'highlight' : ''}`}>
              <span className="player-position">{selectedPlayer2?.seasonAverages?.reb ? parseFloat(selectedPlayer2.seasonAverages.reb).toFixed(1) : ""}</span>
            </div>
          </div>
          {/*Assists */}
          <div className='compare-row'>
            <div className={`compare-stats ${selectedPlayer1.seasonAverages?.ast > selectedPlayer2.seasonAverages?.ast ? 'highlight' : ''}`}>
              <span className="player-position">{selectedPlayer1?.seasonAverages?.ast ? parseFloat(selectedPlayer1.seasonAverages.ast).toFixed(1) : ""}</span>
            </div>
            <div className='comparison-category'>Assists</div>
            <div className={`compare-stats ${selectedPlayer2.seasonAverages?.ast > selectedPlayer1.seasonAverages?.ast ? 'highlight' : ''}`}>
              <span className="player-position">{selectedPlayer2?.seasonAverages?.ast ? parseFloat(selectedPlayer2.seasonAverages.ast).toFixed(1) : ""}</span>
            </div>
          </div>
          {/* Steals */}
          <div className='compare-row'>
            <div className={`compare-stats ${selectedPlayer1.seasonAverages?.stl > selectedPlayer2.seasonAverages?.stl ? 'highlight' : ''}`}>
              <span className="player-position">{selectedPlayer1?.seasonAverages?.stl ? parseFloat(selectedPlayer1.seasonAverages.stl).toFixed(1) : ""}</span>
            </div>
            <div className='comparison-category'>Steals</div>
            <div className={`compare-stats ${selectedPlayer2.seasonAverages?.stl > selectedPlayer1.seasonAverages?.stl ? 'highlight' : ''}`}>
              <span className="player-position">{selectedPlayer2?.seasonAverages?.stl ? parseFloat(selectedPlayer2.seasonAverages.stl).toFixed(1) : ""}</span>
            </div>
          </div>

          {/* Blocks */}
          <div className='compare-row'>
            <div className={`compare-stats ${selectedPlayer1.seasonAverages?.blk > selectedPlayer2.seasonAverages?.blk ? 'highlight' : ''}`}>
              <span className="player-position">{selectedPlayer1?.seasonAverages?.blk ? parseFloat(selectedPlayer1.seasonAverages.blk).toFixed(1) : ""}</span>
            </div>
            <div className='comparison-category'>Blocks</div>
            <div className={`compare-stats ${selectedPlayer2.seasonAverages?.blk > selectedPlayer1.seasonAverages?.blk ? 'highlight' : ''}`}>
              <span className="player-position">{selectedPlayer2?.seasonAverages?.blk ? parseFloat(selectedPlayer2.seasonAverages.blk).toFixed(1) : ""}</span>
            </div>
          </div>
          {/* Field Goal % */}
          <div className='compare-row'>
            <div className={`compare-stats ${selectedPlayer1.seasonAverages?.fg_pct > selectedPlayer2.seasonAverages?.fg_pct ? 'highlight' : ''}`}>
              <span className="player-position">{selectedPlayer1?.seasonAverages?.fg_pct ? (selectedPlayer1.seasonAverages?.fg_pct * 100).toFixed(0) + "%" : ""}</span>
            </div>
            <div className='comparison-category'>Field Goal %</div>
            <div className={`compare-stats ${selectedPlayer2.seasonAverages?.fg_pct > selectedPlayer1.seasonAverages?.fg_pct ? 'highlight' : ''}`}>
              <span className="player-position">{selectedPlayer2?.seasonAverages?.fg_pct ? (selectedPlayer2.seasonAverages?.fg_pct * 100).toFixed(0) + "%" : ""}</span>
            </div>
          </div>

          {/* 3pt % */}
          <div className='compare-row'>
            <div className={`compare-stats ${selectedPlayer1.seasonAverages?.fg3_pct > selectedPlayer2.seasonAverages?.fg3_pct ? 'highlight' : ''}`}>
              <span className="player-position">{selectedPlayer1?.seasonAverages?.fg3_pct ? (selectedPlayer1.seasonAverages?.fg3_pct * 100).toFixed(0) + "%" : ""}</span>
            </div>
            <div className='comparison-category'>3pt %</div>
            <div className={`compare-stats ${selectedPlayer2.seasonAverages?.fg3_pct > selectedPlayer1.seasonAverages?.fg3_pct ? 'highlight' : ''}`}>
              <span className="player-position">{selectedPlayer2?.seasonAverages?.fg3_pct ? (selectedPlayer2.seasonAverages?.fg3_pct * 100).toFixed(0) + "%" : ""}</span>
            </div>
          </div>

          {/* FT % */}
          <div className='compare-row'>
            <div className={`compare-stats ${selectedPlayer1.seasonAverages?.ft_pct > selectedPlayer2.seasonAverages?.ft_pct ? 'highlight' : ''}`}>
              <span className="player-position">{selectedPlayer1?.seasonAverages?.ft_pct ? (selectedPlayer1.seasonAverages?.ft_pct * 100).toFixed(0) + "%" : ""}</span>
            </div>
            <div className='comparison-category'>FT %</div>
            <div className={`compare-stats ${selectedPlayer2.seasonAverages?.ft_pct > selectedPlayer1.seasonAverages?.ft_pct ? 'highlight' : ''}`}>
              <span className="player-position">{selectedPlayer2?.seasonAverages?.ft_pct ? (selectedPlayer1.seasonAverages?.ft_pct * 100).toFixed(0) + "%" : ""}</span>
            </div>
          </div>



          {/* Repeat for other stats */}
        </div>
        <BarChart data={filteredData} />
        <RadarChart data={filteredData} />
      </div>
    </div>
  );
}

export default App;
