"use client";

import React, { useEffect, useState } from "react";
import MapSection from "./map-section/MapSection";
import UnitSection from "./left-section/LeftSection";
import QueueSection from "./right-section/RightSection";
import RespondSection from "./respond/RespondSection";
import ClusterSection from "./cluster-section/ClusterSection";

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

import { DBSCAN } from "density-clustering";
import { getDistance } from "geolib";

type FlatReq = {
  id: string;
  userId: string;
  type: string;
  lat: number;
  lon: number;
  raw: any; // keep the full request for rendering
};

// Cluster-by-type on the fly
function clusterRequests(reqs: FlatReq[]) {
  const byType: Record<string, FlatReq[]> = {};
  reqs.forEach((r) => {
    (byType[r.type] ||= []).push(r);
  });
  const clusters: Record<string, FlatReq[]> = {};
  for (const [dtype, group] of Object.entries(byType)) {
    if (!group.length) continue;
    const pts = group.map((r) => [r.lat, r.lon] as [number, number]);
    const dbscan = new DBSCAN();
    const labels = dbscan.run(
      pts,
      500, // eps = 500m
      1,
      (a, b) =>
        getDistance(
          { latitude: a[0], longitude: a[1] },
          { latitude: b[0], longitude: b[1] }
        )
    );
    labels.forEach((clusterPts, label) => {
      const key = `${dtype}_${label}`;
      clusters[key] = clusterPts.map((idx) => group[idx]);
    });
  }
  return clusters;
}

export default function Dashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [clusters, setClusters] = useState<Record<string, FlatReq[]>>({});
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [showRespond, setShowRespond] = useState(false);
  const [showClusters, setShowClusters] = useState(false);

  useEffect(() => {
    const userMap: Record<string, any> = {};

    const unsubUsers = onSnapshot(collection(db, "users"), (snap) => {
      snap.docs.forEach((u) => {
        userMap[u.id] = { id: u.id, ...(u.data() as any), requests: [] };
      });
    });

    const unsubReqs = onSnapshot(collectionGroup(db, "requests"), (snap) => {
      Object.values(userMap).forEach((u: any) => (u.requests = []));
      const flat: FlatReq[] = [];

      snap.docs.forEach((r) => {
        const data = r.data() as any;
        const uId = r.ref.parent.parent?.id;
        if (uId && userMap[uId]) {
          userMap[uId].requests.push({ id: r.id, ...data, userId: uId });
          if (data.latitude && data.longitude) {
            flat.push({
              id: r.id,
              userId: uId,
              type: data.type,
              lat: data.latitude,
              lon: data.longitude,
              raw: { id: r.id, ...data, userId: uId },
            });
          }
        }
      });

      const c = clusterRequests(flat);
      console.log("🔍 DBSCAN clusters:", c);
      setClusters(c);
      setUsers(Object.values(userMap));
    });

    return () => {
      unsubUsers();
      unsubReqs();
    };
  }, []);

  const openRespond = () => selectedRequest && setShowRespond(true);
  const closeRespond = () => setShowRespond(false);
  const toggleClusters = () => setShowClusters((v) => !v);

  const handleResolve = async () => {
    if (!selectedRequest) return;
    const {
      id: reqId,
      userId,
      assignedUnitIds = [],
      responders = [],
    } = selectedRequest;

    try {
      await updateDoc(doc(db, "users", userId, "requests", reqId), {
        status: "Resolved",
        resolvedAt: serverTimestamp(),
        responderHistory: responders,
      });

      await Promise.all(
        assignedUnitIds.map(async (unitId: string) => {
          const unitRef = doc(db, "units", unitId);
          await updateDoc(unitRef, {
            multipleRequestId: arrayRemove(reqId),
            status: "Standby",
          });
        })
      );

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
      {/* Map */}
      <div className="absolute inset-0 z-0">
        <MapSection
          users={users}
          selectedRequest={selectedRequest}
          setSelectedRequest={setSelectedRequest}
        />
      </div>

      {/* Cluster drawer */}
      <div
        className={`
          absolute inset-y-0 right-[20%] w-[20%]
          transform ${showClusters ? "translate-x-0" : "translate-x-full"}
          transition-transform duration-300 ease-in-out
          z-10 pointer-events-auto
        `}
      >
        <ClusterSection
          show={showClusters}
          toggleShow={toggleClusters}
          clusters={clusters}
          setSelectedRequest={setSelectedRequest}
        />
      </div>

      {/* Left/Right panels */}
      <div className="absolute inset-0 z-20 flex justify-between pointer-events-none">
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
