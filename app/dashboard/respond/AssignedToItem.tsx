"use client";
import React from "react";
import { Icon } from "@iconify/react";

export interface Assignment {
  id: string;
  type: string;
  address: string;
  userName: string;
  timestamp: { toDate: () => Date };
}

interface Props {
  assignment: Assignment;
}

const AssignedToItem: React.FC<Props> = ({ assignment }) => (
  <div className="w-full flex flex-col p-[18px] border-b border-gray">
    <div className="flex items-center gap-[9px] mb-2">
      <Icon
        icon="line-md:hazard-lights-loop"
        height={24}
        className="text-critical-danger"
      />
      <h4>{assignment.type}</h4>
    </div>
    <p>
      <strong>By:</strong> {assignment.userName}
    </p>
    <p>
      <strong>Where:</strong> {assignment.address}
    </p>
  </div>
);

export default AssignedToItem;
