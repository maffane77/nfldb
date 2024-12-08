import React, { useState } from "react";
import axios from "axios";

const RushingStats = () => {
  const [stats, setStats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [predStats, setPredStats] = useState("")
  const [playerID, setPlayerID] = useState("");


  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError("Please enter a player name.");
      return;
    }

    setError("");
    setLoading(true);

    await axios
      .get(`http://localhost:8080/api/stats/player/${searchTerm}/rushing`)
      .then((response) => {
        setStats(response.data);
        setLoading(false);
        setPlayerID(response.data[0].playerId)

      })
      .catch((error) => {
        console.error("Error fetching rushing stats:", error);
        setError("Player not found or no data available.");
        setLoading(false);
      });

    await axios
      .get(`http://localhost:8080/api/stats/player/${searchTerm}/predict/rushing`)
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
      <h2 className="text-2xl font-bold mb-4">Rushing Statistics</h2>
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
              <th className="border px-4 py-2">Attempts</th>
              <th className="border px-4 py-2">Yards</th>
              <th className="border px-4 py-2">Touchdowns</th>
              <th className="border px-4 py-2">1st Downs</th>
              <th className="border px-4 py-2">Success %</th>
              <th className="border px-4 py-2">Longest Run</th>
              <th className="border px-4 py-2">Yards/Attempt</th>
              <th className="border px-4 py-2">Yards/Game</th>
              <th className="border px-4 py-2">Attempts/Game</th>

            </tr>
          </thead>
          <tbody>
            {stats.map((stat, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{stat.playerId || "N/A"}</td>
                <td className="border px-4 py-2">{stat.season || "N/A"}</td>
                <td className="border px-4 py-2">{stat.att || "N/A"}</td>
                <td className="border px-4 py-2">{stat.yds || "N/A"}</td>
                <td className="border px-4 py-2">{stat.td || "N/A"}</td>
                <td className="border px-4 py-2">{stat.firstDowns || "N/A"}</td>
                <td className="border px-4 py-2">{stat.successPercent || "N/A"}</td>
                <td className="border px-4 py-2">{stat.longestRun || "N/A"}</td>
                <td className="border px-4 py-2">{stat.yardsPerAttempt || "N/A"}</td>
                <td className="border px-4 py-2">{stat.yardsPerGame || "N/A"}</td>
                <td className="border px-4 py-2">{stat.attemptsPerGame || "N/A"}</td>
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
              <th className="border px-4 py-2">Attempts</th>
              <th className="border px-4 py-2">Touchdowns</th>
              <th className="border px-4 py-2">First Downs</th>
            </tr>
          </thead>
          <tbody>
              <tr key="pred">
                <td className="border px-4 py-2">{playerID || "N/A"}</td>
                <td className="border px-4 py-2">2025</td>
                <td className="border px-4 py-2">{predStats.PredictedYards || "N/A"}</td>
                <td className="border px-4 py-2">{predStats.PredictedAttempts || "N/A"}</td>
                <td className="border px-4 py-2">{predStats.PredictedTouchdowns || "N/A"}</td>
                <td className="border px-4 py-2">{predStats.PredictedFirstDowns || "N/A"}</td>
              </tr>
            </tbody>
        </table>
    </div>
  );
};

export default RushingStats;