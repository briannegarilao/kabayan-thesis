import React from "react";
import IncidentItem from "./IncidentItem";

const QueueSection = () => {
  return (
    <div className="dashboard-panel dashboard-panel-right flex flex-col">
      {/* header stays fixed height */}
      <div className="w-full flex items-center border-b-2 border-gray p-[18px]">
        <h3>INCIDENT REPORTS</h3>
      </div>

      {/* this takes all the remaining space and scrolls */}
      <div className="flex-1 w-full flex flex-col overflow-y-auto custom-scrollable">
        <IncidentItem />
        <IncidentItem />
        <IncidentItem />
        <IncidentItem />
        <IncidentItem />
      </div>
    </div>
  );
};

export default QueueSection;
