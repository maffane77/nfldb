import React, { useEffect, useState } from "react";
import axios from "axios";

const PassingStats = () => {
  const [stats, setStats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!searchTerm) {
      setError("Please enter a player name.");
      return;
    }
    setError("");
    setLoading(true);

    // Fetch passing stats by player name
    axios
      .get(`http://localhost:8080/api/stats/player/${searchTerm}/passing`)
      .then((response) => {
        setStats(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching passing stats:", error);
        setError("Player not found or no data available.");
        setLoading(false);
      });
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Passing Statistics</h2>

      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by Player ID or Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3 px-2 py-1 border border-gray-300 rounded-md"
        />
      </div>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Player ID</th>
            <th className="border px-4 py-2">Season</th>
            <th className="border px-4 py-2">QB Record</th>
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
          {stats.map((stat) => (
            <tr key={`${stat.playerId}-${stat.season}`}>
              <td className="border px-4 py-2">{stat.playerId}</td>
              <td className="border px-4 py-2">{stat.season}</td>
              <td className="border px-4 py-2">{stat.QBrec}</td>
              <td className="border px-4 py-2">{stat.cmp}</td>
              <td className="border px-4 py-2">{stat.att}</td>
              <td className="border px-4 py-2">{stat.cmpPercent}</td>
              <td className="border px-4 py-2">{stat.yds}</td>
              <td className="border px-4 py-2">{stat.td}</td>
              <td className="border px-4 py-2">{stat.tdPercent}</td>
              <td className="border px-4 py-2">{stat.interceptions}</td>
              <td className="border px-4 py-2">{stat.intPercent}</td>
              <td className="border px-4 py-2">{stat.firstDowns}</td>
              <td className="border px-4 py-2">{stat.successPercent}</td>
              <td className="border px-4 py-2">{stat.longestPass}</td>
              <td className="border px-4 py-2">{stat.yardsPerAttempt}</td>
              <td className="border px-4 py-2">{stat.adjustedYardsPerAttempt}</td>
              <td className="border px-4 py-2">{stat.yardsPerCompletion}</td>
              <td className="border px-4 py-2">{stat.yardsPerGame}</td>
              <td className="border px-4 py-2">{stat.passerRating}</td>
              <td className="border px-4 py-2">{stat.QBR}</td>
              <td className="border px-4 py-2">{stat.sacks}</td>
              <td className="border px-4 py-2">{stat.netYardsPerAttempt}</td>
              <td className="border px-4 py-2">{stat.adjustedNetYardsPerAttempt}</td>
              <td className="border px-4 py-2">{stat.fourthQuarterComebacks}</td>
              <td className="border px-4 py-2">{stat.gameWinningDrives}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PassingStats;