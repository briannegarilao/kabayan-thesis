"use client";

import React from "react";

interface AssignedToItemProps {
  /** the ID or label of a request already assigned */
  assignment: string;
}

const AssignedToItem: React.FC<AssignedToItemProps> = ({ assignment }) => {
  return (
    <div
      className={`
        w-full flex flex-col items-start p-[18px]
        border-b border-gray
        bg-gray-800 hover:bg-gray-700 text-white
      `}
    >
      {/* just showing the assignment ID for now */}
      <h4>{assignment}</h4>
    </div>
  );
};

export default AssignedToItem;
