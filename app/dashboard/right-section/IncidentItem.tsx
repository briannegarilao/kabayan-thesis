import React from "react";
import { Icon } from "@iconify/react";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

const IncidentItem = ({
  req,
  user,
  selectedRequest,
  setSelectedRequest,
}: {
  req: any;
  user: any;
  selectedRequest: any | null;
  setSelectedRequest: Function;
}) => {
  const isSelected = selectedRequest?.id === req.id;

  // compute a human-friendly "x minutes ago" string
  const timeAgo = formatDistanceToNow(req.timestamp.toDate(), {
    addSuffix: true,
  });

  return (
    <div
      onClick={() => setSelectedRequest({ ...req, user })}
      className={`
        w-full flex flex-col items-start p-[18px]
        border-b border-gray cursor-pointer
        ${isSelected ? "bg-gray-500" : "hover:bg-gray-800"}
      `}
    >
      <div className="w-full flex justify-between items-center ">
        <div className="flex items-center gap-[9px]">
          <Icon
            icon="line-md:hazard-lights-loop"
            height={24}
            className="text-critical-danger"
          />
          <h4>{req.type}</h4>
        </div>
        <h6 className="text-white text-upper">{timeAgo}</h6>
      </div>

      <div className="w-full flex flex-col divide-y divide-white/50">
        <div className="py-2">
          <p>{user.name}</p>
        </div>
        <div className="py-2">
          <p>{req.address || "No address"}</p>
        </div>
      </div>

      <button className="w-full bg-unassigned text-white py-2">
        <h4>{req.status?.toUpperCase() || "UNASSIGNED"}</h4>
      </button>
    </div>
  );
};

export default IncidentItem;
