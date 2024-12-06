import React, { useEffect, useState } from "react";
import axios from "axios";

const RushingStats = () => {
  const [stats, setStats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/stats/rushing")
      .then((response) => setStats(response.data))
      .catch((error) => console.error("Error fetching rushing stats:", error));
  }, []);

  const filteredStats = stats.filter(
    (stat) =>
      stat.playerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (stat.playerName && stat.playerName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Rushing Statistics</h2>

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
            <th className="border px-4 py-2">Attempts</th>
            <th className="border px-4 py-2">Yards</th>
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
            <th className="border px-4 py-2">Average Depth Of Target</th>
            <th className="border px-4 py-2">Broken Tackles</th>
          </tr>
        </thead>
        <tbody>
          {filteredStats.map((stat) => (
            <tr key={`${stat.playerId}-${stat.season}`}>
              <td className="border px-4 py-2">{stat.playerId}</td>
              <td className="border px-4 py-2">{stat.season}</td>
              <td className="border px-4 py-2">{stat.yardsBeforeCatch}</td>
              <td className="border px-4 py-2"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RushingStats;