import React, { useState } from "react";
import axios from "axios";

const PassingStats = () => {
  const [stats, setStats] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState("");
  const [predStats, setPredStats] = useState([]);
  const [playerID, setPlayerID] = useState("");

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError("Please enter a player name."); 
      return;
    }

    setError(""); 
    setLoading(true);

    await axios
      .get(`http://localhost:8080/api/stats/player/${searchTerm}/passing`)
      .then((response) => {
        setStats(response.data);
        setPlayerID(response.data[0].playerId)
        console.log(stats)
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching player stats:", error);
        setError("Player not found or no data available.");
        setLoading(false);
      });

    await axios
      .get(`http://localhost:8080/api/stats/player/${searchTerm}/predict/passing`)
      .then((response) => {
        setPredStats(response.data);
        console.log(predStats)
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching player stats:", error);
        setError("Player not found or no data available.");
        setLoading(false);
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Passing Statistics</h2>
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Enter Player Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-1/3 px-2 py-1 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-1 bg-blue-500 text-white rounded-md"
        >
          Search
        </button>
      </div>


      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <p className="text-center">Loading...</p>}
      {!loading && stats.length > 0 && (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Player ID</th>
              <th className="border px-4 py-2">Season</th>
              <th className="border px-4 py-2">Completions</th>
              <th className="border px-4 py-2">Attempts</th>
              <th className="border px-4 py-2">Completion %</th>
              <th className="border px-4 py-2">Yards</th>
              <th className="border px-4 py-2">Touchdowns</th>
              <th className="border px-4 py-2">TD %</th>
              <th className="border px-4 py-2">Interceptions</th>
              <th className="border px-4 py-2">INT %</th>
              <th className="border px-4 py-2">1st Downs</th>
              <th className="border px-4 py-2">Success %</th>
              <th className="border px-4 py-2">Longest Pass</th>
              <th className="border px-4 py-2">Yards/Attempt</th>
              <th className="border px-4 py-2">Adjusted Yards/Attempt</th>
              <th className="border px-4 py-2">Yards/Completion</th>
              <th className="border px-4 py-2">Yards/Game</th>
              <th className="border px-4 py-2">Passer Rating</th>
              <th className="border px-4 py-2">QBR</th>
              <th className="border px-4 py-2">Sacks</th>
              <th className="border px-4 py-2">Net Yards/Attempt</th>
              <th className="border px-4 py-2">Adjusted Net Yards/Attempt</th>
              <th className="border px-4 py-2">4th Quarter Comebacks</th>
              <th className="border px-4 py-2">Game-Winning Drives</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{stat.playerId || "N/A"}</td>
                <td className="border px-4 py-2">{stat.season || "N/A"}</td>
                <td className="border px-4 py-2">{stat.cmp || "N/A"}</td>
                <td className="border px-4 py-2">{stat.att || "N/A"}</td>
                <td className="border px-4 py-2">{stat.cmpPercent || "N/A"}</td>
                <td className="border px-4 py-2">{stat.yds || "N/A"}</td>
                <td className="border px-4 py-2">{stat.td || "N/A"}</td>
                <td className="border px-4 py-2">{stat.tdPercent || "N/A"}</td>
                <td className="border px-4 py-2">{stat.int || "N/A"}</td>
                <td className="border px-4 py-2">{stat.intPercent || "N/A"}</td>
                <td className="border px-4 py-2">{stat.firstDowns || "N/A"}</td>
                <td className="border px-4 py-2">{stat.successPercent || "N/A"}</td>
                <td className="border px-4 py-2">{stat.longestPass || "N/A"}</td>
                <td className="border px-4 py-2">{stat.yardsPerAttempt || "N/A"}</td>
                <td className="border px-4 py-2">{stat.adjustedYardsPerAttempt || "N/A"}</td>
                <td className="border px-4 py-2">{stat.yardsPerCompletion || "N/A"}</td>
                <td className="border px-4 py-2">{stat.yardsPerGame || "N/A"}</td>
                <td className="border px-4 py-2">{stat.passerRating || "N/A"}</td>
                <td className="border px-4 py-2">{stat.qbr || "N/A"}</td>
                <td className="border px-4 py-2">{stat.sacks || "N/A"}</td>
                <td className="border px-4 py-2">{stat.netYardsPerAttempt || "N/A"}</td>
                <td className="border px-4 py-2">{stat.adjustedNetYardsPerAttempt || "N/A"}</td>
                <td className="border px-4 py-2">{stat.fourthQuarterComebacks || "N/A"}</td>
                <td className="border px-4 py-2">{stat.gameWinningDrives || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
      )}

      {!loading && stats.length === 0 && !error && (
        <p className="text-center">No data available. Try another player.</p>
      )}
      <h2 className="text-2xl font-bold mb-4">Predicted Statistics</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Player ID</th>
              <th className="border px-4 py-2">Season</th>
              <th className="border px-4 py-2">Yards</th>
              <th className="border px-4 py-2">Interceptions</th>
              <th className="border px-4 py-2">Touchdowns</th>
              <th className="border px-4 py-2">Completions</th>
            </tr>
          </thead>
          <tbody>
              <tr key="pred">
                <td className="border px-4 py-2">{playerID || "N/A"}</td>
                <td className="border px-4 py-2">2025</td>
                <td className="border px-4 py-2">{predStats.PredictedYards || "N/A"}</td>
                <td className="border px-4 py-2">{predStats.PredictedInterceptions || "N/A"}</td>
                <td className="border px-4 py-2">{predStats.PredictedTouchdowns || "N/A"}</td>
                <td className="border px-4 py-2">{predStats.PredictedCompletions || "N/A"}</td>
              </tr>
          </tbody>
        </table>

    </div>
  );
};

export default PassingStats;