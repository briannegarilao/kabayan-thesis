import React from "react";
import { Icon } from "@iconify/react";

const IncidentItem = ({
  req,
  user,
  setSelectedRequest,
}: {
  req: any;
  user: any;
  setSelectedRequest: Function;
}) => {
  return (
    <div
      className="w-full flex flex-col items-start p-[18px] border-b border-gray cursor-pointer hover:bg-gray-800"
      onClick={() => setSelectedRequest({ ...req, user })}
    >
      <div className="w-full flex justify-between items-center ">
        {/* Left side: icon + label */}
        <div className="flex items-center gap-[9px]">
          <Icon
            icon="line-md:hazard-lights-loop"
            height={24}
            className="text-critical-danger"
          />
          <h4>{req.type}</h4>
        </div>

        {/* Right side: timestamp */}
        <h5 className="text-gray">
          {new Date(req.timestamp).toLocaleTimeString()}
        </h5>
      </div>

      {/* Details */}
      <div className="w-full flex flex-col divide-y divide-white/50">
        <div className="py-2">
          <p>{user.name}</p>
        </div>
        <div className="py-2">
          <p>{req.address || "No address"}</p>
        </div>
        <div className="py-3">
          <p>| {req.message || "No message"}</p>
        </div>
      </div>

      <button className="w-full bg-unassigned text-white py-2">
        <h4>{req.status?.toUpperCase() || "UNASSIGNED"}</h4>
      </button>
    </div>
  );
};

export default IncidentItem;
