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
      <div className="flex-1 flex items-center justify-center text-gray">
        Select a responder from the list
      </div>
    );
  }

  const iconName = iconMap[responder.type] || iconMap.Default;

  return (
    <div className="w-full p-6 space-y-4 overflow-auto">
      <div className="flex items-center gap-4">
        <Icon
          icon={iconName}
          width={48}
          height={48}
          className="text-unassigned"
        />
        <h2 className="text-2xl font-heading text-white">{responder.name}</h2>
      </div>

      <div className="space-y-2 text-white">
        <p>
          <strong>Type:</strong> {responder.type}
        </p>
        <p>
          <strong>Capacity:</strong> {responder.capacity}
        </p>
        <p>
          <strong>Plate No.:</strong> {responder.plate}
        </p>
        <p>
          <strong>Color:</strong> {responder.color}
        </p>
        <p>
          <strong>Assigned To:</strong> {responder.assignedTo ?? "None"}
        </p>
      </div>

      <div className="pt-4 border-t border-gray flex justify-end">
        <button
          className="px-4 py-2 bg-unassigned text-white rounded disabled:opacity-50"
          disabled={!responder}
        >
          Assign
        </button>
      </div>
    </div>
  );
};

export default ResponderFullInfo;
