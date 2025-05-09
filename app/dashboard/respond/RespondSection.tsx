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

// shape of our unit/responder
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
  /** whether panel is visible (slid in) */
  show: boolean;
  /** the request we're dispatching to */
  selectedRequest: {
    id: string;
    userId: string;
    [key: string]: any;
  } | null;
  /** override list of responders (optional) */
  responders?: Responder[];
  /** close panel callback */
  onClose: () => void;
}

const RespondSection: React.FC<RespondSectionProps> = ({
  show,
  selectedRequest,
  responders = [],
  onClose,
}) => {
  // local state: all units fetched from Firestore
  const [units, setUnits] = useState<Responder[]>([]);
  // which unit is currently highlighted
  const [selectedRes, setSelectedRes] = useState<Responder | null>(null);

  // ─── Fetch all units from Firestore once ───────────────────────────────
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
          // multipleRequestId field holds an array of assigned request IDs
          assignedTo: d.multipleRequestId || [],
        } as Responder;
      });
      setUnits(loaded);
    })();
  }, []);

  // choose passed‐in list or our Firestore load
  const list = responders.length > 0 ? responders : units;
  // currently assigned request IDs for the selected unit
  const assignments = selectedRes?.assignedTo ?? [];

  // ─── handle clicking "ASSIGN" ─────────────────────────────────────────
  const handleAssign = async () => {
    if (!selectedRequest || !selectedRes) return;
    const { id: requestId, userId } = selectedRequest;
    const unitId = selectedRes.id;

    try {
      // 1) update the specific request under users/{userId}/requests/{requestId}
      await updateDoc(doc(db, "users", userId, "requests", requestId), {
        assignedUnitId: unitId,
        status: "Ongoing",
      });

      // 2) update the unit to append this request
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
        ${
          show ? "translate-x-0" : "translate-x-full"
        }          /* slide logic */
        transition-transform duration-300 ease-in-out
        bg-black/75 backdrop-blur-sm flex pointer-events-auto
      `}
    >
      <div className="dashboard-panel flex flex-col border-l-2 border-gray w-full h-full">
        {/* ─── Header ─────────────────────────────────────────── */}
        <div
          className="flex-none w-full flex items-center border-b-2 border-gray
                     px-[18px] py-[16px] relative"
        >
          <h4>RESPOND DETAILS</h4>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* ─── Main columns ──────────────────────────────────── */}
        <div className="flex flex-row w-full h-full overflow-hidden">
          {/* LEFT: full info + current assignments */}
          <div className="w-1/2 flex flex-col border-r-2 border-gray min-h-0">
            {/* vehicle detail panel */}
            <div className="flex-none h-[40%] border-b border-gray overflow-auto">
              <ResponderFullInfo
                responder={selectedRes}
                onAssign={handleAssign}
              />
            </div>

            {/* list of assignments */}
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

          {/* RIGHT: available responders */}
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
