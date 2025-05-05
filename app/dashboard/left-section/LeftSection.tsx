// app/dashboard/left-section/LeftSection.tsx

import React from "react";
import StatsOverview from "./StatsOverview";
import ReportFullInfo from "./ReportFullInfo";

interface UnitSectionProps {
  selectedRequest: any;
  users: any[];
}

const UnitSection: React.FC<UnitSectionProps> = ({
  selectedRequest,
  users,
}) => {
  return (
    <div className="dashboard-panel dashboard-panel-left flex flex-col">
      {/* header stays fixed height */}
      <div className="w-full flex items-center border-b-2 border-gray px-[18px] py-[16px]">
        <h4>FULL REPORT DETAILS</h4>
      </div>

      <ReportFullInfo selectedRequest={selectedRequest} />
      {/* stats overview at top */}
      <StatsOverview users={users} />
    </div>
  );
};

export default UnitSection;
