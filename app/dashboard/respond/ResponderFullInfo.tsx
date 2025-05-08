// app/dashboard/respond/ResponderFullInfo.tsx
"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Responder } from "./RespondSection";

const iconMap: Record<string, string> = {
  Firetruck: "mdi:fire-truck",
  Boat: "mdi:boat",
  Ambulance: "mdi:ambulance",
  Default: "mdi:truck",
};

interface ResponderFullInfoProps {
  responder: Responder | null;
}

const ResponderFullInfo: React.FC<ResponderFullInfoProps> = ({ responder }) => {
  if (!responder) {
    return (
      <div className="flex-1 flex items-start justify-center text-gray">
        Select a responder from the list
      </div>
    );
  }

  const iconName = iconMap[responder.type] || iconMap.Default;

  return (
    <div
      style={{ overflowY: "auto", scrollBehavior: "smooth" }}
      className="w-full h-full flex flex-col items-start justify-start flex-1 overflow-auto p-[16px] gap-[16px]  custom-scrollable"
    >
      {/* ALERT TOP HEADING */}
      <div className="w-full flex flex-row items-center justify-between">
        <h5>VEHICLE INFO</h5>
      </div>

      <div className="flex items-center gap-4">
        <div className="rounded-lg flex items-center justify-center border-2 border-white p-2">
          <Icon icon={iconName} width={64} height={64} className="text-white" />
        </div>
        <h2 className="text-2xl font-heading text-white">{responder.name}</h2>
      </div>

      {/* ALERT DETAILS */}
      <div className="w-full flex flex-row items-start justify-start ">
        {/* Name */}
        <div className="w-full flex flex-col items-start justify-start gap-[16px]">
          <div className="w-full flex flex-col items-start justify-start gap-[8px]">
            <h5 className="text-gray">TYPE</h5>
            <p>{responder.type}</p>
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-[8px]">
            <h5 className="text-gray">CAPACITY</h5>
            <p>{responder.capacity}</p>
          </div>
        </div>
        <div className="w-full flex flex-col items-start justify-start gap-[16px]">
          <div className="w-full flex flex-col items-start justify-start gap-[8px]">
            <h5 className="text-gray">PLATE NO.</h5>
            <p>{responder.plate}</p>
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-[8px]">
            <h5 className="text-gray">COLOR</h5>
            <p> {responder.color}</p>
          </div>
        </div>
      </div>

      {/* BUTTON */}
      <div className="p-[10px] bg-critical-danger text-white cursor-pointer">
        <h3>ASSIGN</h3>
      </div>
    </div>
  );
};

export default ResponderFullInfo;
