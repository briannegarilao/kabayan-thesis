import React from "react";
import { Icon } from "@iconify/react";

const IncidentItem = () => {
  return (
    <div className="w-full flex flex-col items-start p-[18px] border-b border-gray">
      <div className="w-full flex justify-between items-center ">
        {/* Left side: icon + label */}
        <div className="flex items-center gap-[9px]">
          <Icon
            icon="line-md:hazard-lights-loop"
            height={24}
            className="text-critical-danger"
          />
          <h4>FLOOD</h4>
        </div>

        {/* Right side: timestamp */}
        <h5 className="text-gray">2 min ago</h5>
      </div>

      {/* Details */}
      <div className="w-full flex flex-col divide-y divide-white/50">
        <div className="py-2">
          <p>Mark Brian Garilao</p>
        </div>
        <div className="py-2">
          <p>Ville De Palme, Brgy. Santiago</p>
        </div>
        <div className="py-3">
          <p>| RESCUE, CANT GO OUT</p>
        </div>
      </div>
      <button className="w-full bg-unassigned text-white py-2">
        <h4>UNASSIGNED</h4>
      </button>
    </div>
  );
};

export default IncidentItem;
