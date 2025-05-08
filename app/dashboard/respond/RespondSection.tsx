// app/dashboard/respond/RespondSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import ResponderItem from "./ResponderItem";
import ResponderFullInfo from "./ResponderFullInfo";
import AssignedToItem from "./AssignedToItem";
// remove: import sampleResponders from "./sampleData";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseconfig";

export interface Responder {
  id: string;
  name: string;
  type: string;
  capacity: string;
  plate: string;
  color: string;
  status: string;
  assignedTo?: string[]; // array of request IDs
}

interface RespondSectionProps {
  show: boolean;
  selectedRequest: any | null;
  responders?: Responder[]; // optional override
  onClose: () => void;
}

const RespondSection: React.FC<RespondSectionProps> = ({
  show,
  selectedRequest,
  responders = [],
  onClose,
}) => {
  // state to hold our Firestore‐loaded units
  const [units, setUnits] = useState<Responder[]>([]);
  const [selectedRes, setSelectedRes] = useState<Responder | null>(null);

  // Fetch all "units" docs once on mount
  useEffect(() => {
    const fetchUnits = async () => {
      const q = collection(db, "units");
      const snap = await getDocs(q);
      const loaded = snap.docs.map((doc) => {
        const data = doc.data() as any;
        return {
          id: doc.id,
          name: data.vehicleName || "Unknown",
          type: data.type || "Default",
          capacity: data.capacity || "N/A",
          plate: data.plateNumber || "N/A",
          color: data.color || "N/A",
          status: data.status || "unknown",
          // normalize into array
          assignedTo: data.assignedRequestId ? [data.assignedRequestId] : [],
        } as Responder;
      });
      setUnits(loaded);
    };
    fetchUnits();
  }, []);

  // If parent passed a `responders` prop, use that; else use our Firestore load
  const list = responders.length > 0 ? responders : units;

  // pull currently assigned request IDs for the selected unit
  const assignments = selectedRes?.assignedTo ?? [];

  return (
    <div
      className={`
        fixed inset-y-0 right-0 z-20 w-[60%] transform
        ${show ? "translate-x-0" : "translate-x-full"}
        transition-transform duration-300 ease-in-out
        bg-black/75 backdrop-blur-sm flex pointer-events-auto
      `}
    >
      <div className="dashboard-panel flex flex-col border-l-2 border-gray w-full">
        {/* header */}
        <div className="w-full flex items-center border-b-2 border-gray px-[18px] py-[16px] relative">
          <h4>RESPOND DETAILS</h4>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* MAIN */}
        <div className="w-full flex flex-1 flex-row">
          {/* Left column: full info + current assignments */}
          <div className="w-[50%] flex-1 h-full border-r-2 border-gray flex flex-col">
            {/* Responder full info */}
            <div className="w-full h-[40%] border-b border-gray overflow-y-auto">
              <ResponderFullInfo responder={selectedRes} />
            </div>
            {/* Currently assigned to */}
            <div className="w-full flex-1 flex flex-col">
              <div className="w-full flex items-center border-b-2 border-gray px-[18px] py-[16px]">
                <h4>CURRENTLY ASSIGNED TO</h4>
              </div>
              <div className="w-full h-full overflow-auto custom-scrollable">
                {assignments.length > 0 ? (
                  <ul className="w-full flex flex-col">
                    {assignments.map((a) => (
                      <AssignedToItem key={a} assignment={a} />
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 p-[18px]">
                    No current assignments
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right column: available responders */}
          <div className="w-[50%] flex-1 h-full">
            <div className="w-full flex items-center border-b-2 border-gray px-[18px] py-[16px]">
              <h4>AVAILABLE RESPONDERS</h4>
            </div>
            <div className="w-full h-full overflow-auto custom-scrollable">
              <ul className="w-full flex flex-col">
                {list.map((r) => (
                  <ResponderItem
                    key={r.id}
                    responder={r}
                    selected={selectedRes?.id === r.id}
                    onSelect={setSelectedRes}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RespondSection;
