"use client";

import React, { useEffect, useState } from "react";
import MapSection from "./map-section/MapSection";
import UnitSection from "./left-section/LeftSection";
import QueueSection from "./right-section/RightSection";
import { db } from "@/firebaseconfig";
import { collection, getDocs } from "firebase/firestore";

export default function Dashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);

  useEffect(() => {
    async function fetchData() {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const userList = await Promise.all(
        usersSnapshot.docs.map(async (docSnap) => {
          const user = docSnap.data();
          const requestsSnapshot = await getDocs(
            collection(db, "users", docSnap.id, "requests")
          );
          const requests = requestsSnapshot.docs.map((r) => ({
            id: r.id,
            ...(r.data() as any),
          }));
          return { id: docSnap.id, ...user, requests };
        })
      );
      setUsers(userList);
    }
    fetchData();
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden text-white bg-[#0d0d0d]">
      {/* Background Map */}
      <div className="absolute inset-0 z-0">
        <MapSection users={users} setSelectedRequest={setSelectedRequest} />
      </div>

      {/* Floating UI Panels */}
      <div className="absolute inset-0 z-10 flex justify-between pointer-events-none">
        <div className="w-[20%] h-full pointer-events-auto">
          <UnitSection selectedRequest={selectedRequest} />
        </div>
        <div className="w-[20%] h-full pointer-events-auto">
          <QueueSection users={users} setSelectedRequest={setSelectedRequest} />
        </div>
      </div>
    </div>
  );
}
