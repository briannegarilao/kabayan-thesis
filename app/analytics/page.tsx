"use client";

import { useState } from "react";
import AprioriTable from "./apriori-table/AprioriTable";
import ArimaChart from "./arima-chart/ArimaChart";
import TrainChart from "./arima-chart/TrainChart";

export default function Analytics() {
  const [view, setView] = useState<"forecast" | "train">("forecast");

  return (
    <div className="w-screen h-screen text-white bg-[#0d0d0d]">
      {/* create a 2-column flex container */}
      <div className="flex w-full h-full ">
        {/* LEFT column */}
        <div className="w-1/2 h-full flex flex-col border-r border-gray-700">
          {/* ─── Tab Bar ─────────────────────────────── */}
          <div className="flex space-x-4 px-6 py-3 bg-gray-800">
            <button
              className={`pb-2 text-sm font-medium ${
                view === "forecast"
                  ? "border-b-2 border-white text-white"
                  : "text-gray-400"
              }`}
              onClick={() => setView("forecast")}
            >
              Forecast / Actual
            </button>
            <button
              className={`pb-2 text-sm font-medium ${
                view === "train"
                  ? "border-b-2 border-white text-white"
                  : "text-gray-400"
              }`}
              onClick={() => setView("train")}
            >
              Train Series
            </button>
          </div>

          {/* ─── Chart Pane ─────────────────────────── */}
          <div className="flex-1 overflow-hidden">
            {view === "forecast" ? <ArimaChart /> : <TrainChart />}
          </div>

          {/* ─── About Charts ───────────────────────── */}
          <div className="flex-1 bg-gray-900 flex items-center justify-center">
            <h1 className="text-2xl">ABOUT CHARTS</h1>
          </div>
        </div>

        {/* RIGHT column */}
        <div className="w-1/2 h-full flex flex-col">
          {/* top half */}
          <div className="w-full h-[50%] flex-1 flex items-center justify-center border-b">
            <AprioriTable />
          </div>
          {/* bottom half */}
          <div className="w-full h-[50%] flex-1 bg-green flex items-center justify-center">
            <h1>SUGGESTIONS</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
