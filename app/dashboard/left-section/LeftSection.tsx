import React from "react";
import StatsOverview from "./StatsOverview";
import ReportFullInfo from "./ReportFullInfo";

interface LeftSectionProps {
  selectedRequest: any;
  users: any[];
  onRespondClick: () => void;
  onResolveClick: () => void;
}

const LeftSection: React.FC<LeftSectionProps> = ({
  selectedRequest,
  users,
  onRespondClick,
  onResolveClick,
}) => (
  <div className="dashboard-panel dashboard-panel-left flex flex-col">
    <div className="w-full flex items-center border-b-2 border-gray px-[18px] py-[16px]">
      <h4>FULL REPORT DETAILS</h4>
    </div>
    <ReportFullInfo
      selectedRequest={selectedRequest}
      onRespondClick={onRespondClick}
      onResolveClick={onResolveClick}
    />
    <StatsOverview users={users} />
  </div>
);

export default LeftSection;
