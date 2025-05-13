"use client";
import React, { useState } from "react";
import { Icon, IconProps } from "@iconify/react";

const iconMap: Record<string, string> = {
  Flood: "material-symbols:flood",
  Earthquake: "ri:earthquake-fill",
  Fire: "mdi:fire",
  Health: "map:health",
};
const colorMap: Record<string, string> = {
  Flood: "#00BFFF",
  Earthquake: "#FFA500",
  Fire: "#FF0000",
  Health: "#0000FF",
};

interface ReportFullInfoProps {
  selectedRequest: any;
  onRespondClick: () => void;
  onResolveClick: () => void;
}

const ReportFullInfo: React.FC<ReportFullInfoProps> = ({
  selectedRequest,
  onRespondClick,
  onResolveClick,
}) => {
  const [iconLoaded, setIconLoaded] = useState(false);

  if (!selectedRequest) {
    return (
      <div
        className="w-full h-full flex flex-col items-start justify-start flex-1
                      overflow-auto p-[16px] gap-[16px] border-b-2 border-gray"
      >
        <p className="text-gray-400">Select a request to view details.</p>
      </div>
    );
  }

  const {
    type,
    timestamp,
    user,
    address,
    message,
    responders = [],
    status = "",
  } = selectedRequest;

  const lcStatus = status.toString().toLowerCase();
  const hasResponder = responders.length > 0;
  const isResolved = lcStatus === "resolved";

  const iconName = iconMap[type] || iconMap.Flood;
  const color = colorMap[type] || "#FFFFFF";
  const defaultSize = 64;
  const iconSize = type === "Health" ? 58 : defaultSize;
  const containerTotal = defaultSize + 8;
  const padding = Math.round((containerTotal - iconSize) / 2);

  const iconProps: IconProps = {
    icon: iconName,
    width: iconSize,
    height: iconSize,
    color,
    onLoad: () => setIconLoaded(true),
    style: { visibility: iconLoaded ? "visible" : "hidden" },
  };

  return (
    <div
      style={{ overflowY: "auto", scrollBehavior: "smooth" }}
      className="w-full h-full flex flex-col p-[16px] gap-[16px] border-b-2 border-gray custom-scrollable"
    >
      {/* ALERT TYPE */}
      <div className="w-full flex justify-between">
        <h5>ALERT TYPE</h5>
        <h5>{timestamp.toDate().toLocaleTimeString()}</h5>
      </div>

      {/* ICON + TYPE */}
      <div className="flex items-center gap-[16px]">
        <div
          className="rounded-lg flex items-center justify-center"
          style={{
            width: containerTotal,
            height: containerTotal,
            padding: `${padding}px`,
            border: `2px solid ${color}`,
          }}
        >
          {!iconLoaded && <div style={{ width: iconSize, height: iconSize }} />}
          <Icon {...iconProps} />
        </div>
        <h2>{type}</h2>
      </div>

      {/* DETAILS */}
      <div className="flex flex-col gap-[16px]">
        {[
          ["SENDER NAME", user?.name],
          ["CONTACT NUMBER", user?.contact],
          ["EXACT LOCATION", address],
          ["MESSAGE", message || "No message provided."],
        ].map(([label, val]) => (
          <div key={label} className="flex flex-col gap-[8px]">
            <h5 className="text-gray">{label}</h5>
            <p>{val || "N/A"}</p>
          </div>
        ))}

        {/* CURRENT RESPONDERS */}
        <div className="flex flex-col gap-[8px]">
          <h5 className="text-gray">CURRENT RESPONDERS</h5>
          {hasResponder ? (
            responders.map((r: string, i: number) => <p key={i}>{r}</p>)
          ) : (
            <p>NONE</p>
          )}
        </div>
      </div>

      {/* CONTROLS */}
      <div className="mt-auto flex flex-col gap-[12px] w-full">
        {isResolved ? (
          <div className="p-[10px] bg-gray-600 text-white text-center rounded">
            <h3>RESOLVED</h3>
          </div>
        ) : hasResponder ? (
          <>
            <div
              className="p-[10px] bg-green-600 text-white text-center rounded cursor-pointer"
              onClick={onResolveClick}
            >
              <h3>RESOLVE</h3>
            </div>
            <div
              className="p-[10px] border-2 border-white text-white text-center rounded cursor-pointer"
              onClick={onRespondClick}
            >
              <h3>ADD RESPONDER</h3>
            </div>
          </>
        ) : (
          <div
            className="p-[10px] bg-critical-danger text-white text-center rounded cursor-pointer"
            onClick={onRespondClick}
          >
            <h3>RESPOND</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportFullInfo;
