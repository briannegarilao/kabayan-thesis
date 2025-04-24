import React from "react";
import ReportFullInfo from "./ReportFullInfo";

const UnitSection = ({ selectedRequest }: { selectedRequest: any }) => {
  return (
    <div className="dashboard-panel dashboard-panel-left flex flex-col">
      {/* header stays fixed height */}
      <div className="w-full flex items-center border-b-2 border-gray p-[18px]">
        <h3>FULL REPORT DETAILS</h3>
      </div>

      <ReportFullInfo selectedRequest={selectedRequest} />
    </div>
  );
};

export default UnitSection;
