import React from "react";
import { Icon } from "@iconify/react";

// map of icon names
const iconMap: Record<string, string> = {
  Flood: "material-symbols:flood",
  Earthquake: "ri:earthquake-fill",
  Fire: "mdi:fire",
  Health: "map:health",
};

// map of border/icon colors (from your React Native theme)
const colorMap: Record<string, string> = {
  Flood: "#00BFFF", // floodAquaBlue
  Earthquake: "#FFA500", // earthquakeOrange
  Fire: "#FF0000", // fireRed
  Health: "#0000FF", // healthBlue
};

interface ReportFullInfoProps {
  selectedRequest: any;
  onRespondClick: () => void;
}

const ReportFullInfo: React.FC<ReportFullInfoProps> = ({
  selectedRequest,
  onRespondClick,
}) => {
  if (!selectedRequest) {
    return (
      <div className="w-full h-full flex flex-col items-start justify-start flex-1 overflow-auto p-[16px] gap-[16px] border-b-2 border-gray">
        <p className="text-gray-400">Select a request to view details.</p>
      </div>
    );
  }

  const {
    type,
    timestamp,
    status,
    urgency,
    user,
    address,
    message,
    responder,
  } = selectedRequest;

  const iconName = iconMap[type] || iconMap.Flood;
  const color = colorMap[type] || "#FFFFFF";

  // sizing logic you already have
  const defaultSize = 64;
  const iconSize = type === "Health" ? 58 : defaultSize;
  const containerTotal = defaultSize + 8; // 72px
  const padding = Math.round((containerTotal - iconSize) / 2);

  return (
    <div
      style={{ overflowY: "auto", scrollBehavior: "smooth" }}
      className="w-full h-full flex flex-col items-start justify-start flex-1 overflow-auto p-[16px] gap-[16px] border-b-2 border-gray custom-scrollable"
    >
      {/* ALERT TOP HEADING */}
      <div className="w-full flex flex-row items-center justify-between">
        <h5>ALERT TYPE</h5>
        <h5>{timestamp.toDate().toLocaleTimeString()}</h5>
      </div>

      {/* ALERT HEADING */}
      <div className="w-full flex flex-row items-start justify-start gap-[16px]">
        {/* Alert Icon */}
        <div
          className="rounded-lg flex items-center justify-center"
          style={{
            width: containerTotal,
            height: containerTotal,
            padding: `${padding}px`,
            border: `2px solid ${color}`,
          }}
        >
          <Icon
            icon={iconName}
            width={iconSize}
            height={iconSize}
            color={color}
          />
        </div>

        {/* Disaster Head Info */}
        <div className="w-full flex flex-col items-start justify-start gap-[8px]">
          <h2>{type}</h2>
          <div className="w-full flex flex-row flex-wrap items-center justify-start gap-[8px]">
            {/* status & urgency badges can go here if needed */}
          </div>
        </div>
      </div>

      {/* ALERT DETAILS */}
      <div className="w-full flex flex-col items-start justify-start gap-[16px]">
        {/* Name */}
        <div className="w-full flex flex-col items-start justify-start gap-[8px]">
          <h5 className="text-gray">SENDER NAME</h5>
          <p>{user?.name || "N/A"}</p>
        </div>
        {/* Number */}
        <div className="w-full flex flex-col items-start justify-start gap-[8px]">
          <h5 className="text-gray">CONTACT NUMBER</h5>
          <p>{user?.contact || "N/A"}</p>
        </div>
        {/* Exact Location */}
        <div className="w-full flex flex-col items-start justify-start gap-[8px]">
          <h5 className="text-gray">EXACT LOCATION</h5>
          <p>{address || "N/A"}</p>
        </div>
        {/* Message */}
        <div className="w-full flex flex-col items-start justify-start gap-[8px]">
          <h5 className="text-gray">MESSAGE</h5>
          <p>{message || "No message provided."}</p>
        </div>
        {/* Current Responder */}
        <div className="w-full flex flex-col items-start justify-start gap-[8px]">
          <h5 className="text-gray">CURRENT RESPONDER</h5>
          <p>{responder || "NONE"}</p>
        </div>
      </div>

      {/* BUTTON */}
      <div
        className="p-[10px] border-2 border-white cursor-pointer"
        onClick={onRespondClick}
      >
        <h3>RESPOND</h3>
      </div>
    </div>
  );
};

export default ReportFullInfo;
