"use client";

import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "@/firebaseconfig";

import ResponderItem from "./ResponderItem";
import ResponderFullInfo from "./ResponderFullInfo";
import AssignedToItem from "./AssignedToItem";

export interface Responder {
  id: string;
  name: string;
  type: string;
  capacity: string;
  plate: string;
  color: string;
  status: string;
  assignedTo?: string[];
}

interface RespondSectionProps {
  show: boolean;
  selectedRequest: {
    id: string;
    userId: string;
    [key: string]: any;
  } | null;
  responders?: Responder[];
  onClose: () => void;
}

const RespondSection: React.FC<RespondSectionProps> = ({
  show,
  selectedRequest,
  responders = [],
  onClose,
}) => {
  const [units, setUnits] = useState<Responder[]>([]);
  const [selectedRes, setSelectedRes] = useState<Responder | null>(null);

  // Load responders from "units" collection
  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, "units"));
      const loaded = snap.docs.map((doc) => {
        const d = doc.data() as any;
        return {
          id: doc.id,
          name: d.vehicleName,
          type: d.type,
          capacity: d.capacity,
          plate: d.plateNumber,
          color: d.color,
          status: d.status,
          assignedTo: d.multipleRequestId || [],
        } as Responder;
      });
      setUnits(loaded);
    })();
  }, []);

  const list = responders.length > 0 ? responders : units;
  const assignments = selectedRes?.assignedTo ?? [];

  // Assignment logic
  const handleAssign = async () => {
    if (!selectedRequest || !selectedRes || !selectedRequest.userId) return;
    const { id: requestId, userId } = selectedRequest;
    const unitId = selectedRes.id;

    try {
      // Update nested request
      await updateDoc(doc(db, "users", userId, "requests", requestId), {
        assignedUnitId: unitId,
        status: "Ongoing",
      });

      // Update unit
      await updateDoc(doc(db, "units", unitId), {
        multipleRequestId: arrayUnion(requestId),
        status: "Dispatched",
      });

      alert("Unit assigned successfully!");
    } catch (error) {
      console.error("Assignment failed:", error);
      alert("Failed to assign unit.");
    }
  };

  return (
    <div
      className={`
        fixed inset-y-0 right-0 z-20 w-[60%] transform
        ${show ? "translate-x-0" : "translate-x-full"}
        transition-transform duration-300 ease-in-out
        bg-black/75 backdrop-blur-sm flex pointer-events-auto
      `}
    >
      <div className="dashboard-panel flex flex-col border-l-2 border-gray w-full h-full">
        {/* header */}
        <div className="flex-none w-full flex items-center border-b-2 border-gray px-[18px] py-[16px] relative">
          <h4>RESPOND DETAILS</h4>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* main content splits into two columns */}
        <div className="flex flex-row w-full h-full overflow-hidden">
          {/* left: full info + assignments */}
          <div className="w-1/2 flex flex-col border-r-2 border-gray min-h-0">
            {/* full details */}
            <div className="flex-none h-[40%] border-b border-gray overflow-auto">
              <ResponderFullInfo
                responder={selectedRes}
                onAssign={handleAssign}
              />
            </div>

            {/* assignments list */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-none w-full flex items-center border-b-2 border-gray px-[18px] py-[16px]">
                <h4>CURRENTLY ASSIGNED TO</h4>
              </div>
              <div className="flex-1 overflow-auto custom-scrollable min-h-0">
                {assignments.length > 0 ? (
                  <ul className="flex flex-col">
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

          {/* right: available responders */}
          <div className="w-1/2 flex flex-col min-h-0">
            <div className="flex-none w-full flex items-center border-b-2 border-gray px-[18px] py-[16px]">
              <h4>AVAILABLE RESPONDERS</h4>
            </div>
            <div className="flex-1 overflow-auto custom-scrollable">
              <ul className="flex flex-col">
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
