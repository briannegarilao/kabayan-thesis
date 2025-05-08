// app/dashboard/right-section/RightSection.tsx

import React from "react";
import IncidentItem from "./IncidentItem";

const QueueSection = ({
  users,
  selectedRequest,
  setSelectedRequest,
}: {
  users: any[];
  selectedRequest: any | null;
  setSelectedRequest: Function;
}) => {
  // flatten all requests into a single array
  const incidents = users.flatMap((user) =>
    user.requests.map((req: any) => ({ ...req, user }))
  );

  return (
    <div className="dashboard-panel dashboard-panel-right flex flex-col">
      {/* Header stays fixed height */}
      <div className="w-full flex items-center border-b-2 border-gray px-[18px] py-[16px]">
        <h4>INCIDENT REPORTS</h4>
      </div>

      {/* Scrollable report list */}
      <div
        style={{ overflowY: "auto", scrollBehavior: "smooth" }}
        className="flex-1 w-full flex flex-col overflow-y-auto custom-scrollable"
      >
        {incidents.length > 0 ? (
          incidents.map((inc, index) => (
            <IncidentItem
              key={`${inc.user.id}-${inc.id}`}
              req={inc}
              user={inc.user}
              selectedRequest={selectedRequest}
              setSelectedRequest={setSelectedRequest}
            />
          ))
        ) : (
          <p className="text-gray-400 p-[18px]">No incident reports found.</p>
        )}
      </div>
    </div>
  );
};

export default QueueSection;
