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

interface Props {
  responder: Responder | null;
  onAssign?: () => void;
}

const ResponderFullInfo: React.FC<Props> = ({ responder, onAssign }) => {
  if (!responder) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray">
        Select a responder
      </div>
    );
  }

  const iconName = iconMap[responder.type] || iconMap.Default;

  return (
    <div className="flex flex-col p-[16px] gap-[16px] overflow-auto custom-scrollable">
      <h5>VEHICLE INFO</h5>
      <div className="flex items-center gap-4">
        <div className="rounded-lg border-2 border-white p-2 flex items-center justify-center">
          <Icon icon={iconName} width={64} height={64} className="text-white" />
        </div>
        <h2 className="text-2xl font-heading">{responder.name}</h2>
      </div>
      <div className="flex gap-8">
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <h5 className="text-gray">TYPE</h5>
            <p>{responder.type}</p>
          </div>
          <div>
            <h5 className="text-gray">CAPACITY</h5>
            <p>{responder.capacity}</p>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <h5 className="text-gray">PLATE NO.</h5>
            <p>{responder.plate}</p>
          </div>
          <div>
            <h5 className="text-gray">COLOR</h5>
            <p>{responder.color}</p>
          </div>
        </div>
      </div>
      {onAssign && (
        <div
          className="p-[10px] bg-blue-600 text-white text-center rounded cursor-pointer"
          onClick={onAssign}
        >
          <h3>ASSIGN</h3>
        </div>
      )}
    </div>
  );
};

export default ResponderFullInfo;
