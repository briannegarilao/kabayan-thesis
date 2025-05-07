"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Responder } from "./RespondSection";

// simple map of vehicle‐type → icon name
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
    <li
      onClick={() => onSelect(responder)}
      className={`
        flex items-center gap-3 p-3 rounded cursor-pointer
        bg-gray-800 hover:bg-gray-700 text-white
        ${selected ? "ring-2 ring-unassigned" : ""}
      `}
    >
      <Icon icon={iconName} width={24} height={24} />
      <div className="flex-1">
        <p className="font-semibold">{responder.name}</p>
        <p className="text-xs text-gray">{responder.capacity}</p>
      </div>
    </li>
  );
};

export default ResponderItem;
