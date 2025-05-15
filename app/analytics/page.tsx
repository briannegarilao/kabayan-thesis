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
        <div className="w-[50%] h-full flex flex-col border-r border-white">
          {/* ─── Chart Pane ─────────────────────────── */}
          <div className="w-full h-[70%] flex-col items-center justify-center border-b border-red">
            {/* ─── Tab Bar ─────────────────────────────── */}
            <div className="w-full flex flex-row items-center justify-start  gap-[16px] bg-black border-b">
              <div className="h-full flex items-center justify-center px-[6px] py-[12px] border-r border-gray">
                <h5>CHARTS DETAILS</h5>
              </div>
              <div className="h-full py-[6px] flex flex-row items-center justify-start gap-[16px]">
                <button
                  className={` text-sm font-medium  ${
                    view === "forecast"
                      ? "border-b-2 border-white text-white"
                      : "text-gray-400"
                  }`}
                  onClick={() => setView("forecast")}
                >
                  Forecast / Actual
                </button>
                <button
                  className={`text-sm font-medium  ${
                    view === "train"
                      ? "border-b-2 border-white text-white"
                      : "text-gray-400"
                  }`}
                  onClick={() => setView("train")}
                >
                  Train Series
                </button>
              </div>
            </div>
            <div className="w-full h-full px-[16px] flex flex-col overflow-y-auto custom-scrollable">
              {view === "forecast" ? <ArimaChart /> : <TrainChart />}
            </div>
          </div>

          {/* ─── About Charts ───────────────────────── */}
          <div className="w-full h-[30%] flex-1 bg-green flex items-center justify-center">
            <h1>SUGGESTIONS</h1>
          </div>
        </div>

        {/* RIGHT column */}
        <div className="w-1/2 h-full flex flex-col">
          {/* top half */}
          <div className="w-full h-[70%] flex-1 flex items-center justify-center border-b">
            <AprioriTable />
          </div>
          {/* bottom half */}
          <div className="w-full h-[30%] flex-1 bg-green flex items-center justify-center">
            <h1>SUGGESTIONS</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
