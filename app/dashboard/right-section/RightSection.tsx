import React from "react";
import IncidentItem from "./IncidentItem";

const QueueSection = ({
  users,
  selectedRequest,
  setSelectedRequest,
}: {
  users: any[];
  selectedRequest: any | null; // ← added
  setSelectedRequest: Function;
}) => {
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
        {users.flatMap((user) =>
          user.requests.map((req: any, index: number) => (
            <IncidentItem
              key={`${user.id}-${req.id}`}
              req={req}
              user={user}
              selectedRequest={selectedRequest} // ← added
              setSelectedRequest={setSelectedRequest}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default QueueSection;
