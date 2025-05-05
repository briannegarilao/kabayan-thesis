import React from "react";

interface StatsOverviewProps {
  users: Array<{ requests: any[] }>;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ users }) => {
  // total count of all requests
  const totalRequests = users.reduce(
    (sum, user) => sum + user.requests.length,
    0
  );
  // count of pending requests
  const pending = users.reduce(
    (sum, user) =>
      sum + user.requests.filter((req) => req.status === "pending").length,
    0
  );
  // count of dispatched (non-pending) requests
  const dispatched = users.reduce(
    (sum, user) =>
      sum + user.requests.filter((req) => req.status !== "pending").length,
    0
  );
  // unique responders across all requests
  const uniqueResponders = new Set<string>();
  users.forEach((user) =>
    user.requests.forEach((req) => {
      if (req.responder) uniqueResponders.add(req.responder);
    })
  );
  const respondersAvailable = uniqueResponders.size;

  return (
    <div className="w-full h-1/4 flex flex-col items-start justify-start p-[16px] gap-[18px] border-b-2 border-gray">
      <h4 className="text-white">OVERVIEW</h4>
      <div className="w-full flex flex-col items-start justify-start gap-[16px]">
        <div className="w-full flex flex-row items-start justify-start gap-[16px]">
          <h4 className=" font-semibold text-white">{totalRequests}</h4>
          <h4 className=" text-gray">Total Requests</h4>
        </div>
        <div className="w-full flex flex-row items-start justify-start gap-[16px]">
          <h4 className="font-semibold text-white">{pending}</h4>
          <h4 className=" text-gray">Pending</h4>
        </div>
        <div className="w-full flex flex-row items-start justify-start gap-[16px]">
          <h4 className="font-semibold text-white">{dispatched}</h4>
          <h4 className=" text-gray">Dispatched</h4>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
