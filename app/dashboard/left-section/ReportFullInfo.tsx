import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseconfig";

// icon and color maps
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
}

const ReportFullInfo: React.FC<ReportFullInfoProps> = ({
  selectedRequest,
  onRespondClick,
}) => {
  const [vehicleName, setVehicleName] = useState<string | null>(null);

  // Fetch vehicleName from unit doc
  useEffect(() => {
    const fetchVehicleName = async () => {
      if (!selectedRequest?.responder) {
        setVehicleName(null);
        return;
      }

      try {
        const snap = await getDoc(doc(db, "units", selectedRequest.responder));
        if (snap.exists()) {
          setVehicleName(snap.data().vehicleName || selectedRequest.responder);
        } else {
          setVehicleName(selectedRequest.responder);
        }
      } catch (err) {
        console.error("Error loading unit:", err);
        setVehicleName(selectedRequest.responder);
      }
    };

    fetchVehicleName();
  }, [selectedRequest?.responder]);

  if (!selectedRequest) {
    return (
      <div className="w-full h-full flex flex-col items-start justify-start flex-1 overflow-auto p-[16px] gap-[16px] border-b-2 border-gray">
        <p className="text-gray-400">Select a request to view details.</p>
      </div>
    );
  }

  const { type, timestamp, user, address, message, responders } =
    selectedRequest;

  const iconName = iconMap[type] || iconMap.Flood;
  const color = colorMap[type] || "#FFFFFF";

  const defaultSize = 64;
  const iconSize = type === "Health" ? 58 : defaultSize;
  const containerTotal = defaultSize + 8;
  const padding = Math.round((containerTotal - iconSize) / 2);

  return (
    <div
      style={{ overflowY: "auto", scrollBehavior: "smooth" }}
      className="w-full h-full flex flex-col items-start justify-start flex-1 overflow-auto p-[16px] gap-[16px] border-b-2 border-gray custom-scrollable"
    >
      {/* ALERT TYPE */}
      <div className="w-full flex flex-row items-center justify-between">
        <h5>ALERT TYPE</h5>
        <h5>{timestamp.toDate().toLocaleTimeString()}</h5>
      </div>

      {/* ICON + TYPE */}
      <div className="w-full flex flex-row items-center justify-start gap-[16px]">
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
        <div className="w-full flex flex-col items-start justify-start gap-[8px]">
          <h2>{type}</h2>
        </div>
      </div>

      {/* DETAILS */}
      <div className="w-full flex flex-col items-start justify-start gap-[16px]">
        <div className="w-full flex flex-col gap-[8px]">
          <h5 className="text-gray">SENDER NAME</h5>
          <p>{user?.name || "N/A"}</p>
        </div>

        <div className="w-full flex flex-col gap-[8px]">
          <h5 className="text-gray">CONTACT NUMBER</h5>
          <p>{user?.contact || "N/A"}</p>
        </div>

        <div className="w-full flex flex-col gap-[8px]">
          <h5 className="text-gray">EXACT LOCATION</h5>
          <p>{address || "N/A"}</p>
        </div>

        <div className="w-full flex flex-col gap-[8px]">
          <h5 className="text-gray">MESSAGE</h5>
          <p>{message || "No message provided."}</p>
        </div>

        {/* Current Responders */}
        <div className="w-full flex flex-col items-start justify-start gap-[8px]">
          <h5 className="text-gray">CURRENT RESPONDERS</h5>
          {Array.isArray(selectedRequest.responders) &&
          selectedRequest.responders.length > 0 ? (
            selectedRequest.responders.map((name: string, index: number) => (
              <p key={index}>{name}</p>
            ))
          ) : (
            <p>NONE</p>
          )}
        </div>
      </div>

      {/* RESPOND BUTTON */}
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
