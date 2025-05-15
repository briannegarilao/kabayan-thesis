"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import IncidentItem from "../right-section/IncidentItem";

export interface FlatReq {
  id: string;
  userId: string;
  type: string;
  lat: number;
  lon: number;
  raw: any;
}

interface ClusterSectionProps {
  show: boolean;
  toggleShow: () => void;
  clusters: Record<string, FlatReq[]>;
  setSelectedRequest: (r: any) => void;
}

const ClusterSection: React.FC<ClusterSectionProps> = ({
  show,
  toggleShow,
  clusters,
  setSelectedRequest,
}) => {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className="dashboard-panel dashboard-panel-right flex flex-col h-full border-l-2 border-gray bg-black/75 backdrop-blur-sm relative">
      {/* toggle badge */}
      <div
        className="absolute top-0 left-0 -translate-x-full p-2 bg-black/75 backdrop-blur-sm border border-gray rounded-r cursor-pointer z-20"
        onClick={toggleShow}
      >
        <Icon
          icon={show ? "mdi:close" : "mdi:map-marker-multiple"}
          width={24}
          height={24}
          className="text-white"
        />
      </div>

      {/* clusters list */}
      <div className="h-full w-full overflow-y-auto custom-scrollable">
        {Object.entries(clusters).length === 0 && (
          <p className="text-gray-400 p-4">No clusters found.</p>
        )}

        {Object.entries(clusters).map(([key, members]) => (
          <div key={key} className="border-b border-gray">
            {/* header */}
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-800"
              onClick={() => setOpenKey((prev) => (prev === key ? null : key))}
            >
              <h5 className="text-white">{key}</h5>
              <Icon
                icon={openKey === key ? "mdi:chevron-up" : "mdi:chevron-down"}
                width={20}
                height={20}
                className="text-gray-300"
              />
            </div>

            {/* expanded list */}
            {openKey === key && (
              <div className="pl-[6px] bg-gray">
                {members.map((m) => (
                  <IncidentItem
                    key={`${m.userId}-${m.id}`}
                    req={m.raw}
                    user={{ id: m.userId }}
                    selectedRequest={null}
                    setSelectedRequest={setSelectedRequest}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClusterSection;
