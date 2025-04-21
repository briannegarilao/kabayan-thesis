"use client";

import React from "react";
import MapSection from "./map-section/MapSection";
import UnitSection from "./left-section/LeftSection";
import QueueSection from "./right-section/RightSection";

const Dashboard = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden text-white bg-[#0d0d0d]">
      {/* Background Map (clickable) */}
      <div className="absolute inset-0 z-0">
        <MapSection />
      </div>

      {/* Floating UI Panels */}
      <div className="absolute inset-0 z-10 flex justify-between pointer-events-none">
        {/* Unit Panel (left) */}
        <div className="w-[20%] h-full pointer-events-auto">
          <UnitSection />
        </div>
        {/* Queue Panel (right) */}
        <div className="w-[20%] h-full pointer-events-auto ">
          <QueueSection />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
