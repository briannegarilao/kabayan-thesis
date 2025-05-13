"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "@/firebaseconfig";

import ResponderItem from "./ResponderItem";
import ResponderFullInfo from "./ResponderFullInfo";
import AssignedToItem, { Assignment } from "./AssignedToItem";

export interface Responder {
  id: string;
  name: string;
  type: string;
  capacity: string;
  plate: string;
  color: string;
  status: string; // "Dispatched" | "Standby"
  assignedTo?: string[]; // request IDs
}

interface RespondSectionProps {
  show: boolean;
  selectedRequest: { id: string; userId: string; [key: string]: any } | null;
  users: Array<{ id: string; name: string; requests: any[] }>;
  onClose: () => void;
}

const RespondSection: React.FC<RespondSectionProps> = ({
  show,
  selectedRequest,
  users,
  onClose,
}) => {
  const [units, setUnits] = useState<Responder[]>([]);
  const [selectedRes, setSelectedRes] = useState<Responder | null>(null);

  // 1) Load all units once; derive status from how many assignments remain
  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, "units"));
      const loaded = snap.docs.map((d) => {
        const data = d.data() as any;
        const assigned: string[] = data.multipleRequestId ?? [];
        return {
          id: d.id,
          name: data.vehicleName,
          type: data.type,
          capacity: data.capacity,
          plate: data.plateNumber,
          color: data.color,
          assignedTo: assigned,
          status: assigned.length > 0 ? "Dispatched" : "Standby",
        } as Responder;
      });
      setUnits(loaded);
    })();
  }, []);

  const list = units;

  // 2) Summaries of whatever requests this unit has
  const assignmentSummaries: Assignment[] = (selectedRes?.assignedTo ?? []).map(
    (reqId) => {
      for (const u of users) {
        const r = u.requests.find((rq: any) => rq.id === reqId);
        if (r) {
          return {
            id: r.id,
            type: r.type,
            address: r.address || "No address",
            userName: u.name,
            timestamp: r.timestamp,
          };
        }
      }
      return {
        id: reqId,
        type: "Unknown",
        address: "",
        userName: "Unknown",
        timestamp: { toDate: () => new Date() },
      };
    }
  );

  // 3) Assign this request to the selected responder
  const handleAssign = async () => {
    if (!selectedRequest || !selectedRes) return;
    const { id: reqId, userId } = selectedRequest;
    const unitId = selectedRes.id;

    try {
      // a) update the request
      await updateDoc(doc(db, "users", userId, "requests", reqId), {
        assignedUnitIds: arrayUnion(unitId),
        responders: arrayUnion(selectedRes.name),
        status: "Ongoing",
      });
      // b) update that unit
      await updateDoc(doc(db, "units", unitId), {
        multipleRequestId: arrayUnion(reqId),
        status: "Dispatched",
      });
      // c) ripple into React state
      setUnits((prev) =>
        prev.map((u) =>
          u.id === unitId
            ? {
                ...u,
                assignedTo: [...(u.assignedTo ?? []), reqId],
                status: "Dispatched",
              }
            : u
        )
      );
      setSelectedRes((u) =>
        u && u.id === unitId
          ? {
              ...u,
              assignedTo: [...(u.assignedTo ?? []), reqId],
              status: "Dispatched",
            }
          : u
      );

      alert("Unit assigned!");
    } catch (err) {
      console.error(err);
      alert("Failed to assign");
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
        {/* HEADER */}
        <div className="flex-none w-full flex items-center border-b-2 border-gray px-[18px] py-[16px] relative">
          <h4>RESPOND DETAILS</h4>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* TWO‐COLUMN LAYOUT */}
        <div className="flex flex-row w-full h-full overflow-hidden">
          {/* LEFT: ResponderFullInfo + AssignedToItem */}
          <div className="w-1/2 flex flex-col border-r-2 border-gray min-h-0">
            <div className="flex-none h-[40%] border-b border-gray overflow-auto">
              <ResponderFullInfo
                responder={selectedRes}
                onAssign={handleAssign}
              />
            </div>
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-none w-full flex items-center border-b-2 border-gray px-[18px] py-[16px]">
                <h4>CURRENTLY ASSIGNED TO</h4>
              </div>
              <div className="flex-1 overflow-auto custom-scrollable min-h-0">
                {assignmentSummaries.length > 0 ? (
                  <ul className="flex flex-col">
                    {assignmentSummaries.map((a) => (
                      <AssignedToItem key={a.id} assignment={a} />
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 p-[18px]">No assignments</p>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: AVAILABLE RESPONDERS */}
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
