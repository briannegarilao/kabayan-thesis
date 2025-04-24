import React from "react";
import { Icon } from "@iconify/react";

const ReportFullInfo = ({ selectedRequest }: { selectedRequest: any }) => {
  if (!selectedRequest) {
    return <p className="text-gray-400 p-[18px]">Select a request to view details.</p>;
  }

  return (
    <div className="w-full flex flex-col items-start justify-start p-[18px] gap-[18px] border-b-2 border-gray">
      {/* ALERT TOP HEADING */}
      <div className="w-full flex flex-row items-center justify-between">
        <h5>ALERT TYPE</h5>
        <h5>{selectedRequest.timestamp.toDate().toLocaleTimeString()}</h5>
      </div>

      {/* ALERT HEADING */}
      <div className="w-full flex flex-row items-start justify-start gap-[16px]">
        {/* Alert Icon */}
        <div className="p-[4px] border-2 border-white rounded-lg">
          <Icon icon="material-symbols:flood" width={64} height={64} />
        </div>
        {/* Disaster Head Info */}
        <div className="w-full flex flex-col items-start justify-start gap-[8px]">
          <h2>{selectedRequest.type}</h2>
          {/* Status & Level */}
          <div className="w-full flex flex-row flex-wrap items-center justify-start gap-[8px]">
            <div className="p-[8px] bg-white text-black">
              <h5>{selectedRequest.status?.toUpperCase() || "UNKNOWN"}</h5>
            </div>
            <div className="p-[8px] bg-critical-danger text-white">
              <h5>{selectedRequest.urgency?.toUpperCase() || "N/A"}</h5>
            </div>
          </div>
        </div>
      </div>

      {/* ALERT DETAILS */}
      <div className="w-full flex flex-col items-start justify-start gap-[16px]">
        {/* Name */}
        <div className="w-full flex flex-col items-start justify-start gap-[8px]">
          <h5 className="text-gray">SENDER NAME</h5>
          <p>{selectedRequest.user?.name || "N/A"}</p>
        </div>
        {/* Number */}
        <div className="w-full flex flex-col items-start justify-start gap-[8px]">
          <h5 className="text-gray">CONTACT NUMBER</h5>
          <p>{selectedRequest.user?.contact || "N/A"}</p>
        </div>
        {/* Exact Location */}
        <div className="w-full flex flex-col items-start justify-start gap-[8px]">
          <h5 className="text-gray">EXACT LOCATION</h5>
          <p>{selectedRequest.address || "N/A"}</p>
        </div>
        {/* Message */}
        <div className="w-full flex flex-col items-start justify-start gap-[8px]">
          <h5 className="text-gray">MESSAGE</h5>
          <p>{selectedRequest.message || "No message provided."}</p>
        </div>
        {/* Current Response */}
        <div className="w-full flex flex-col items-start justify-start gap-[8px]">
          <h5 className="text-gray">CURRENT RESPONDER</h5>
          <p>{selectedRequest.responder || "NONE"}</p>
        </div>
      </div>

      {/* BUTTON */}
      <div className="p-[10px] border-2 border-white">
        <h3>RESPOND</h3>
      </div>
    </div>
  );
};

export default ReportFullInfo;