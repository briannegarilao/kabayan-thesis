"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseconfig"; // Adjust if your firebase file is elsewhere
import ResponderItem from "./ResponderItem";
import ResponderFullInfo from "./ResponderFullInfo";
<<<<<<< HEAD
import AssignedToItem from "./AssignedToItem";
import sampleResponders from "./sampleData";
=======
>>>>>>> b5a939ad45bb437abde34cc9b8756ce740647683

export interface Responder {
  id: string;
  name: string;
  type: string;
  capacity: string;
  plate: string;
  color: string;
  status: string;
  // we’ll ignore any assignedTo from data; use our mock below
  assignedTo?: string[];
}

interface RespondSectionProps {
  show: boolean;
  selectedRequest: any | null;
  responders?: Responder[];
  onClose: () => void;
}

const RespondSection: React.FC<RespondSectionProps> = ({
  show,
  selectedRequest,
  onClose,
}) => {
<<<<<<< HEAD
  const list = responders.length > 0 ? responders : sampleResponders;
  const [selectedRes, setSelectedRes] = useState<Responder | null>(null);

  // ── MOCK ASSIGNMENTS ──────────────────────────────
  const mockAssignments: Record<string, string[]> = {
    r1: ["Report-42", "Report-17"],
    r2: [],
    r3: ["Report-88"],
  };

  // lookup assignments for the selected responder
  const assignments =
    selectedRes && mockAssignments[selectedRes.id]
      ? mockAssignments[selectedRes.id]
      : [];
=======
  const [responders, setResponders] = useState<Responder[]>([]);
  const [selectedRes, setSelectedRes] = useState<Responder | null>(null);

  useEffect(() => {
    const fetchResponders = async () => {
      const querySnapshot = await getDocs(collection(db, "units"));
      const data: Responder[] = [];

      querySnapshot.forEach((doc) => {
        const d = doc.data();
        data.push({
          id: doc.id,
          name: d.vehicleName || "Unknown Unit",
          type: d.type || "Unknown",
          capacity: d.capacity || "0",
          plate: d.plateNumber || "N/A",
          color: d.color || "N/A",
          status: d.status || "idle",
          assignedTo: d.assignedRequestId || "",
        });
      });

      setResponders(data);
    };

    fetchResponders();
  }, []);
>>>>>>> b5a939ad45bb437abde34cc9b8756ce740647683

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

<<<<<<< HEAD
        {/* MAIN */}
        <div className="w-full flex flex-1 flex-row">
          {/* left column: full info + assignments */}
          <div className="w-[50%] flex-1 h-full border-r-2 border-gray flex flex-col">
            {/* details */}
            <div className="w-full h-[40%] border-b border-gray overflow-y-auto">
              <ResponderFullInfo responder={selectedRes} />
            </div>

            {/* assignments list */}
            <div className="w-full flex-1 flex flex-col">
              <div className="w-full flex items-center border-b-2 border-gray px-[18px] py-[16px]">
                <h4>CURRENTLY ASSIGNED TO</h4>
              </div>
              <div className="w-full h-full overflow-auto custom-scrollable">
                {assignments.length > 0 ? (
                  assignments.map((a) => (
                    <AssignedToItem key={a} assignment={a} />
                  ))
                ) : (
                  <p className="text-gray-400 p-[18px]">
                    No current assignments
                  </p>
                )}
              </div>
            </div>
=======
        {/* MAIN SECTION */}
        <div className="w-full flex flex-1 flex-row overflow-auto">
          {/* 2nd column */}
          <div className="w-[50%] flex-1 h-full border-r border-gray">
            <div className="w-full h-[40%] flex flex-col items-start border-b border-gray overflow-y-auto">
              <ResponderFullInfo responder={selectedRes} />
            </div>
            <div></div>
>>>>>>> b5a939ad45bb437abde34cc9b8756ce740647683
          </div>

          {/* right column: all responders */}
          <div className="w-[50%] flex-1 h-full">
            <div className="w-full flex items-center border-b-2 border-gray px-[18px] py-[16px]">
              <h4>AVAILABLE RESPONDERS</h4>
            </div>
<<<<<<< HEAD
            <div className="w-full h-full overflow-auto custom-scrollable">
              {list.map((r) => (
                <ResponderItem
                  key={r.id}
                  responder={r}
                  selected={selectedRes?.id === r.id}
                  onSelect={setSelectedRes}
                />
              ))}
=======
            <div className="w-full h-full flex flex-col items-start justify-start overflow-auto custom-scrollable">
              <ul className="w-full h-full flex flex-col items-start justify-start">
                {responders.map((r) => (
                  <ResponderItem
                    key={r.id}
                    responder={r}
                    selected={selectedRes?.id === r.id}
                    onSelect={setSelectedRes}
                  />
                ))}
              </ul>
>>>>>>> b5a939ad45bb437abde34cc9b8756ce740647683
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RespondSection;
