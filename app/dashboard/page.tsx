"use client";

import React, { useEffect, useState } from "react";
import MapSection from "./map-section/MapSection";
import UnitSection from "./left-section/LeftSection";
import QueueSection from "./right-section/RightSection";
import RespondSection from "./respond/RespondSection";
import { db } from "@/firebaseconfig";
import { collection, collectionGroup, onSnapshot } from "firebase/firestore";

export default function Dashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [showRespond, setShowRespond] = useState(false);

  useEffect(() => {
    // We'll keep a local map of user → profile + requests array
    const userMap: Record<string, any> = {};

    // 1) Subscribe to top-level users collection (to get profile info)
    const unsubUsers = onSnapshot(collection(db, "users"), (userSn) => {
      userSn.docs.forEach((uDoc) => {
        const u = uDoc.data();
        userMap[uDoc.id] = { id: uDoc.id, ...u, requests: [] };
      });
    });

    // 2) Subscribe to *all* requests subcollections across *all* users
    const unsubReqs = onSnapshot(collectionGroup(db, "requests"), (reqSn) => {
      // Clear out prior requests
      Object.values(userMap).forEach((u: any) => (u.requests = []));

      // Re‐group every request under its parent user in userMap
      reqSn.docs.forEach((rDoc) => {
        const uId = rDoc.ref.parent.parent?.id;
        if (uId && userMap[uId]) {
          userMap[uId].requests.push({ id: rDoc.id, ...rDoc.data() });
        }
      });

      // Commit into state as an array
      setUsers(Object.values(userMap));
    });

    return () => {
      unsubUsers();
      unsubReqs();
    };
  }, []);

  const handleOpenRespond = () => {
    if (selectedRequest) setShowRespond(true);
  };
  const handleCloseRespond = () => setShowRespond(false);

  return (
    <div className="relative w-screen h-screen overflow-hidden text-white bg-[#0d0d0d]">
      {/* Background Map */}
      <div className="absolute inset-0 z-0">
        <MapSection
          users={users}
          setSelectedRequest={setSelectedRequest}
          selectedRequest={selectedRequest}
        />
      </div>

      {/* Floating UI Panels */}
      <div className="absolute inset-0 z-10 flex justify-between pointer-events-none">
        <div className="w-[20%] h-full pointer-events-auto">
          <UnitSection
            selectedRequest={selectedRequest}
            users={users}
            onRespondClick={handleOpenRespond}
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

      {/* Respond panel */}
      <RespondSection
        show={showRespond}
        selectedRequest={selectedRequest}
        onClose={handleCloseRespond}
        responders={[]}
      />
    </div>
  );
}
