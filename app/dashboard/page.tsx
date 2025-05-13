"use client";

import React, { useEffect, useState } from "react";
import MapSection from "./map-section/MapSection";
import UnitSection from "./left-section/LeftSection";
import QueueSection from "./right-section/RightSection";
import RespondSection from "./respond/RespondSection";
import {
  collection,
  collectionGroup,
  onSnapshot,
  updateDoc,
  doc,
  arrayRemove,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebaseconfig";

export default function Dashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [showRespond, setShowRespond] = useState(false);

  // Real‐time subscription to users + all requests
  useEffect(() => {
    const userMap: Record<string, any> = {};
    const unsubUsers = onSnapshot(collection(db, "users"), (snap) => {
      snap.docs.forEach((u) => {
        userMap[u.id] = { id: u.id, ...(u.data() as any), requests: [] };
      });
    });
    const unsubReqs = onSnapshot(collectionGroup(db, "requests"), (snap) => {
      // clear previous
      Object.values(userMap).forEach((u: any) => (u.requests = []));
      // regroup
      snap.docs.forEach((r) => {
        const uId = r.ref.parent.parent?.id;
        if (uId && userMap[uId]) {
          userMap[uId].requests.push({ id: r.id, ...(r.data() as any) });
        }
      });
      setUsers(Object.values(userMap));
    });
    return () => {
      unsubUsers();
      unsubReqs();
    };
  }, []);

  // Slide‐in respond panel
  const openRespond = () => selectedRequest && setShowRespond(true);
  const closeRespond = () => setShowRespond(false);

  // ← NEW: mark the selected request as Resolved
  const handleResolve = async () => {
    if (!selectedRequest) return;
    const {
      id: reqId,
      userId,
      assignedUnitIds = [],
      responders = [],
    } = selectedRequest;

    try {
      // 1) update the request document
      await updateDoc(doc(db, "users", userId, "requests", reqId), {
        status: "Resolved",
        resolvedAt: serverTimestamp(),
        // take the current responders array and store it under responderHistory
        responderHistory: responders,
      });

      // 2) clean up each unit that had this request
      await Promise.all(
        assignedUnitIds.map(async (unitId: string) => {
          const unitRef = doc(db, "units", unitId);
          // remove this request from multipleRequestId
          await updateDoc(unitRef, {
            multipleRequestId: arrayRemove(reqId),
            status: "Standby", // assume Standby once removed
          });
        })
      );

      // 3) clear selection & close panel
      alert("Request marked as resolved");
      setSelectedRequest(null);
      setShowRespond(false);
    } catch (err) {
      console.error(err);
      alert("Failed to resolve request");
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden text-white bg-[#0d0d0d]">
      <div className="absolute inset-0 z-0">
        <MapSection
          users={users}
          selectedRequest={selectedRequest}
          setSelectedRequest={setSelectedRequest}
        />
      </div>
      <div className="absolute inset-0 z-10 flex justify-between pointer-events-none">
        <div className="w-[20%] h-full pointer-events-auto">
          <UnitSection
            selectedRequest={selectedRequest}
            users={users}
            onRespondClick={openRespond}
            onResolveClick={handleResolve}
          />
        </div>
        <div className="w-[20%] h-full pointer-events-auto">
          <QueueSection
            users={users}
            selectedRequest={selectedRequest}
            setSelectedRequest={setSelectedRequest}
          />
        </div>
      </div>
      <RespondSection
        show={showRespond}
        selectedRequest={selectedRequest}
        onClose={closeRespond}
        users={users}
      />
    </div>
  );
}
