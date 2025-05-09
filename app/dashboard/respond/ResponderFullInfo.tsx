"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Responder } from "./RespondSection";

// icons by vehicle type
const iconMap: Record<string, string> = {
  Firetruck: "mdi:fire-truck",
  Boat: "mdi:boat",
  Ambulance: "mdi:ambulance",
  Default: "mdi:truck",
};

interface ResponderFullInfoProps {
  /** selected unit, or null */
  responder: Responder | null;
  /** callback when assign button clicked */
  onAssign?: () => void;
}

const ResponderFullInfo: React.FC<ResponderFullInfoProps> = ({
  responder,
  onAssign,
}) => {
  // no selection message
  if (!responder) {
    return (
      <div className="flex-1 flex items-start justify-center text-gray">
        Select a responder from the list
      </div>
    );
  }

  // pick icon
  const iconName = iconMap[responder.type] || iconMap.Default;

  return (
    <div
      className="w-full h-full flex flex-col items-start justify-start
                 p-[16px] gap-[16px] overflow-auto custom-scrollable"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* heading */}
      <div className="w-full flex flex-row items-center justify-between">
        <h5>VEHICLE INFO</h5>
      </div>

      {/* icon + name */}
      <div className="flex items-center gap-4">
        <div className="rounded-lg flex items-center justify-center border-2 border-white p-2">
          <Icon icon={iconName} width={64} height={64} className="text-white" />
        </div>
        <h2 className="text-2xl font-heading text-white">{responder.name}</h2>
      </div>

      {/* details grid */}
      <div className="w-full flex flex-row items-start justify-start">
        <div className="flex-1 flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <h5 className="text-gray">TYPE</h5>
            <p>{responder.type}</p>
          </div>
          <div className="flex flex-col gap-[8px]">
            <h5 className="text-gray">CAPACITY</h5>
            <p>{responder.capacity}</p>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <h5 className="text-gray">PLATE NO.</h5>
            <p>{responder.plate}</p>
          </div>
          <div className="flex flex-col gap-[8px]">
            <h5 className="text-gray">COLOR</h5>
            <p>{responder.color}</p>
          </div>
        </div>
      </div>

      {/* only show when onAssign prop passed */}
      {onAssign && (
        <div
          className="p-[10px] bg-gray text-white cursor-pointer"
          onClick={onAssign}
        >
          <h3>ASSIGN</h3>
        </div>
      )}
    </div>
  );
};

export default ResponderFullInfo;
