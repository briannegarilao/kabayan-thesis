"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Responder } from "./RespondSection";

// map vehicle type to icon
const iconMap: Record<string, string> = {
  Firetruck: "mdi:fire-truck",
  Boat: "mdi:boat",
  Ambulance: "mdi:ambulance",
  Default: "mdi:truck",
};

interface ResponderItemProps {
  responder: Responder;
  selected: boolean;
  onSelect: (r: Responder) => void;
}

const ResponderItem: React.FC<ResponderItemProps> = ({
  responder,
  selected,
  onSelect,
}) => {
  const iconName = iconMap[responder.type] || iconMap.Default;

  return (
    <div
      onClick={() => onSelect(responder)}
      className={`
        w-full flex flex-col items-start p-[18px]
        border-b border-gray cursor-pointer
        hover:bg-gray-800
        ${selected ? "bg-gray-500" : ""}
      `}
    >
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-[9px]">
          <Icon icon={iconName} height={24} className="text-unassigned" />
          <h4>{responder.name}</h4>
        </div>
        {/* <h6 className="text-white uppercase">{responder.capacity}</h6> */}
      </div>

      <div className="w-full flex flex-col divide-y divide-white/50">
        <div className="py-2">
          <p>{responder.type}</p>
        </div>
        <div className="py-2">
          <p>{responder.plate}</p>
        </div>
        <div className="py-2">
          <p>{responder.capacity}</p>
        </div>
      </div>

      <button className="w-full bg-unassigned text-white py-2">
        <h4>{responder.status?.toUpperCase() || "UNKNOWN"}</h4>
      </button>
    </div>
  );
};

export default ResponderItem;
