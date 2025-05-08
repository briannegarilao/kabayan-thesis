// app/dashboard/respond/RespondSection.tsx
"use client";

import React, { useState } from "react";
import ResponderItem from "./ResponderItem";
import ResponderFullInfo from "./ResponderFullInfo";
import sampleResponders from "./sampleData";

export interface Responder {
  id: string;
  name: string;
  type: string;
  capacity: string;
  plate: string;
  color: string;
  status: string;
  assignedTo?: string;
}

interface RespondSectionProps {
  show: boolean;
  selectedRequest: any | null;
  responders?: Responder[];
  onClose: () => void;
}

const RespondSection: React.FC<RespondSectionProps> = ({
  show,
  selectedRequest,
  responders = [],
  onClose,
}) => {
  // use passed responders if any, otherwise mock
  const list = responders.length > 0 ? responders : sampleResponders;
  const [selectedRes, setSelectedRes] = useState<Responder | null>(null);

  return (
    <div
      className={`
        fixed inset-y-0 right-0 z-20 w-[60%] transform
        ${show ? "translate-x-0" : "translate-x-full"}
        transition-transform duration-300 ease-in-out
        bg-black/75 backdrop-blur-sm flex pointer-events-auto
      `}
    >
      <div className="dashboard-panel flex flex-col border-l-2 border-gray w-full">
        {/* header */}
        <div className="w-full flex items-center border-b-2 border-gray px-[18px] py-[16px] relative">
          <h4>RESPOND DETAILS</h4>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* MAIN SECTION */}
        <div className="w-full flex flex-1 flex-row overflow-auto">
          {/* 2nd column  */}
          <div className="w-[50%] flex-1 h-full border-r border-gray">
            <div className="w-full h-[40%] flex flex-col items-start border-b border-gray overflow-y-auto">
              <ResponderFullInfo responder={selectedRes} />
            </div>

            <div></div>
          </div>

          {/* 3rd column */}
          <div className="w-[50%] flex-1 h-full">
            <div className="w-full flex items-center border-b-2 border-gray px-[18px] py-[16px]">
              <h4>FULL REPORT DETAILS</h4>
            </div>
            <div className="w-full h-full flex flex-col items-start justify-start overflow-auto custom-scrollable">
              <ul className="w-full h-full flex flex-col items-start justify-start">
                {list.map((r) => (
                  <ResponderItem
                    key={r.id}
                    responder={r}
                    selected={selectedRes?.id === r.id}
                    onSelect={setSelectedRes}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RespondSection;
