import React from "react";
import IncidentItem from "./IncidentItem";

const QueueSection = ({
  users,
  setSelectedRequest,
}: {
  users: any[];
  setSelectedRequest: Function;
}) => {
  return (
    <div className="dashboard-panel dashboard-panel-right flex flex-col">
      {/* Header stays fixed height */}
      <div className="w-full flex items-center border-b-2 border-gray p-[18px]">
        <h3>INCIDENT REPORTS</h3>
      </div>

      {/* Scrollable report list */}
      <div className="flex-1 w-full flex flex-col overflow-y-auto custom-scrollable">
        {users.flatMap((user) =>
          user.requests.map((req: any, index: number) => (
            <IncidentItem
              key={index}
              req={req}
              user={user}
              setSelectedRequest={setSelectedRequest}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default QueueSection;
