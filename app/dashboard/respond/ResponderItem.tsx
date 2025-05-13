"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { Responder } from "./RespondSection";

// map status → badge color
const statusClasses: Record<string, string> = {
  Standby: "bg-gray-600",
  Dispatched: "bg-red-600",
};

const iconMap: Record<string, string> = {
  Firetruck: "mdi:fire-truck",
  Boat: "mdi:boat",
  Ambulance: "mdi:ambulance",
  Default: "mdi:truck",
};

interface Props {
  responder: Responder;
  selected: boolean;
  onSelect: (r: Responder) => void;
}

const ResponderItem: React.FC<Props> = ({ responder, selected, onSelect }) => {
  const badge = statusClasses[responder.status] ?? statusClasses.Standby;
  const iconName = iconMap[responder.type] || iconMap.Default;

  return (
    <div
      onClick={() => onSelect(responder)}
      className={`w-full flex flex-col p-[18px] border-b border-gray
                  cursor-pointer hover:bg-gray-800
                  ${selected ? "bg-gray-500" : ""}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[9px]">
          <Icon icon={iconName} height={24} className="text-unassigned" />
          <h4>{responder.name}</h4>
        </div>
      </div>

      <div className="flex flex-col divide-y divide-white/50 mt-2">
        <p className="py-2">{responder.type}</p>
        <p className="py-2">{responder.plate}</p>
        <p className="py-2">{responder.capacity}</p>
      </div>

      <button className={`w-full text-white py-2 ${badge}`}>
        <h4>{responder.status.toUpperCase()}</h4>
      </button>
    </div>
  );
};

export default ResponderItem;
