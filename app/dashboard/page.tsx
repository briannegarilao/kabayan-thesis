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
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const userList = await Promise.all(
        usersSnapshot.docs.map(async (docSnap) => {
          const user = docSnap.data();
          const requestsSnapshot = await getDocs(collection(db, "users", docSnap.id, "requests"));
          const requests = requestsSnapshot.docs.map(r => ({ ...r.data(), id: r.id }));
          return { ...user, id: docSnap.id, requests };
        })
      );
      setUsers(userList);
    }

    fetchData();
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden text-white bg-[#0d0d0d]">
      {/* Background Map (clickable) */}
      <div className="absolute inset-0 z-0">
        <MapSection />
      </div>

      {/* Floating UI Panels */}
      <div className="absolute inset-0 z-10 flex justify-between pointer-events-none">
        {/* Unit Panel (left) */}
        <div className="w-[20%] h-full pointer-events-auto">
          <UnitSection selectedRequest={selectedRequest} />
        </div>
        {/* Queue Panel (right) */}
        <div className="w-[20%] h-full pointer-events-auto ">
          <QueueSection users={users} setSelectedRequest={setSelectedRequest} />
        </div>
      </div>
    </div>
  );
}
