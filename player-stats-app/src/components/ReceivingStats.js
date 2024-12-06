import React, { useEffect, useState } from "react";
import axios from "axios";

const ReceivingStats = () => {
  const [stats, setStats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/stats/receiving")
      .then((response) => setStats(response.data))
      .catch((error) => console.error("Error fetching receiving stats:", error));
  }, []);

  const filteredStats = stats.filter(
    (stat) =>
      stat.playerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (stat.playerName && stat.playerName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Receiving Statistics</h2>

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
            <th className="border px-4 py-2">Targets</th>
            <th className="border px-4 py-2">Receptions</th>
            <th className="border px-4 py-2">Yards</th>
            <th className="border px-4 py-2">Yards/Reception</th>
            <th className="border px-4 py-2">Touchdowns</th>
            <th className="border px-4 py-2">1st Downs</th>
            <th className="border px-4 py-2">Success %</th>
            <th className="border px-4 py-2">Receptions/Game</th>
            <th className="border px-4 py-2">Yards/Game</th>
            <th className="border px-4 py-2">Catch %</th>
            <th className="border px-4 py-2">Yards/Target</th>
            <th className="border px-4 py-2">Yards Before Catch</th>
            <th className="border px-4 py-2">Yards Before Catch/Reception</th>
            <th className="border px-4 py-2">Yards After Catch</th>
            <th className="border px-4 py-2">Yards After Catch/Reception</th>
            <th className="border px-4 py-2">Avg Depth of Target</th>
            <th className="border px-4 py-2">Broken Tackles</th>
            <th className="border px-4 py-2">Receptions/Broken Tackle</th>
            <th className="border px-4 py-2">Drops</th>
            <th className="border px-4 py-2">Drop %</th>
            <th className="border px-4 py-2">Interceptions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStats.map((stat) => (
            <tr key={`${stat.playerId}-${stat.season}`}>
              <td className="border px-4 py-2">{stat.playerId}</td>
              <td className="border px-4 py-2">{stat.season}</td>
              <td className="border px-4 py-2">{stat.tgt}</td>
              <td className="border px-4 py-2">{stat.rec}</td>
              <td className="border px-4 py-2">{stat.yds}</td>
              <td className="border px-4 py-2">{stat.yardsPerReception}</td>
              <td className="border px-4 py-2">{stat.td}</td>
              <td className="border px-4 py-2">{stat.firstDowns}</td>
              <td className="border px-4 py-2">{stat.successPercent}</td>
              <td className="border px-4 py-2">{stat.receptionsPerGame}</td>
              <td className="border px-4 py-2">{stat.yardsPerGame}</td>
              <td className="border px-4 py-2">{stat.catchPercent}</td>
              <td className="border px-4 py-2">{stat.yardsPerTarget}</td>
              <td className="border px-4 py-2">{stat.yardsBeforeCatch}</td>
              <td className="border px-4 py-2">{stat.yardsBeforeCatchPerReception}</td>
              <td className="border px-4 py-2">{stat.yardsAfterCatch}</td>
              <td className="border px-4 py-2">{stat.yardsAfterCatchPerReception}</td>
              <td className="border px-4 py-2">{stat.averageDepthOfTarget}</td>
              <td className="border px-4 py-2">{stat.brokenTackles}</td>
              <td className="border px-4 py-2">{stat.receptionsPerBrokenTackle}</td>
              <td className="border px-4 py-2">{stat.drops}</td>
              <td className="border px-4 py-2">{stat.dropPercent}</td>
              <td className="border px-4 py-2">{stat.interceptions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReceivingStats;