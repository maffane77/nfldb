import React, { useState } from "react";
import PassingStats from "./components/PassingStats";
import ReceivingStats from "./components/ReceivingStats";
import RushingStats from "./components/RushingStats";

function App() {
  const [view, setView] = useState("passing");

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">NFL Player Statistics</h1>
      </header>

      <div className="flex justify-center gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded ${
            view === "passing" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("passing")}
        >
          Passing Stats
        </button>
        <button
          className={`px-4 py-2 rounded ${
            view === "receiving" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("receiving")}
        >
          Receiving Stats
        </button>
        <button
          className={`px-4 py-2 rounded ${
            view === "rushing" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("rushing")}
        >
          Rushing Stats
        </button>
      </div>

      <div>
        {view === "passing" && <PassingStats />}
        {view === "receiving" && <ReceivingStats />}
        {view === "rushing" && <RushingStats />}
      </div>
    </div>
  );
}

export default App;