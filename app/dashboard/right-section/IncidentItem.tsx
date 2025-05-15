import React from "react";
import { Icon } from "@iconify/react";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

const statusClasses: Record<string, string> = {
  pending: "bg-yellow-500 ",
  dispatched: "bg-red-600  ",
  rescued: "bg-blue-600  ",
  resolved: "bg-green-600",
  unassigned: "bg-gray-500 ", // for anything else / default
};

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

  // pick the appropriate class for this status
  const statusKey = (req.status || "unassigned").toString().toLowerCase();
  const btnClasses = statusClasses[statusKey] || statusClasses.unassigned;

  return (
    <div
      onClick={() => setSelectedRequest({ ...req, user, userId: user.id })}
      className={`
        w-full flex flex-col items-start p-[18px]
        border-b border-gray cursor-pointer bg-black
        ${isSelected ? "bg-gray-500" : "hover:bg-gray-800"}
      `}
    >
      <div className="w-full flex justify-between items-center gap-[8px]">
        <div className="flex items-center gap-[9px]">
          <Icon
            icon="line-md:hazard-lights-loop"
            height={24}
            className="text-critical-danger"
          />
          <h4>{req.type}</h4>
        </div>
        <h6 className="text-white uppercase">{timeAgo}</h6>
      </div>

      <div className="w-full flex flex-col divide-y divide-white/50">
        <div className="py-2">
          <p>{user.name}</p>
        </div>
        <div className="py-2">
          <p>{req.address || "No address"}</p>
        </div>
      </div>

      <button
        className={`
          w-full text-white py-2 ${btnClasses}
        `}
      >
        <h4>{(req.status || "UNASSIGNED").toString().toUpperCase()}</h4>
      </button>
    </div>
  );
};

export default IncidentItem;
