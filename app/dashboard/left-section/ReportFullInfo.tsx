import React from "react";
import { Icon } from "@iconify/react";

const ReportFullInfo = () => {
  return (
    <div className="w-full flex flex-col items-start justify-start p-[18px] gap-[18px] border-b-2 border-gray">
      {/* ALERT TOP HEADING */}
      <div className="w-full flex flex-row items-center justify-between">
        <h5>ALERT TYPE</h5>
        <h5>16:09:99</h5>
      </div>

      {/* ALERT HEADING */}
      <div className="w-full flex flex-row items-start justify-start gap-[16px]">
        {/* Alert Icon */}
        <div className="p-[4px] border-2 border-white rounded-lg">
          <Icon icon="material-symbols:flood" width={64} height={64} />
        </div>
        {/* Disaster Head Info */}
        <div className="w-full flex flex-col items-start justify-start gap-[8px]">
          <h2>FLOOD</h2>
          {/* Status & Level */}
          <div className="w-full flex flex-row flex-wrap items-center justify-start gap-[8px]">
            <div className="p-[8px] bg-white text-black">
              <h5>UNASSIGNED</h5>
            </div>
            <div className="p-[8px] bg-critical-danger text-white">
              <h5>HIGH</h5>
            </div>
          </div>
        </div>
      </div>

      {/* ALERT DETAILS */}
      <div className="w-full flex flex-col items-start justify-start gap-[16px]">
        {/* Name */}
        <div className="w-full flex flex-col items-start justify-start gap-[8px]">
          <h5 className="text-gray">SENDER NAME</h5>
          <p>Mark Brian Garilao</p>
        </div>
        {/* Number */}
        <div className="w-full flex flex-col items-start justify-start gap-[8px]">
          <h5 className="text-gray">CONTACT NUMBER</h5>
          <p>+53 968 299 8790</p>
        </div>
        {/* Exact Location */}
        <div className="w-full flex flex-col items-start justify-start gap-[8px]">
          <h5 className="text-gray">EXACT LOCATION</h5>
          <p>Blk14 Lt 40, Ville De Palme, Brgy. Santiago</p>
        </div>
        {/* Message */}
        <div className="w-full flex flex-col items-start justify-start gap-[8px]">
          <h5 className="text-gray">MESSAGE</h5>
          <p>
            Please rescue us, we can’t go out and our lower ground floor is
            flooded too.
          </p>
        </div>
        {/* Current Response */}
        <div className="w-full flex flex-col items-start justify-start gap-[8px]">
          <h5 className="text-gray">CURRENT RESPONDER</h5>
          <p>NONE</p>
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
