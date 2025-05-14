"use client";

import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebaseconfig";

interface AprioriRule {
  id: string;
  if: string[];
  then: string[];
  confidence: string;
  lift: number;
  timestamp: { toDate: () => Date } | null;
}

export default function AprioriTable() {
  const [rules, setRules] = useState<AprioriRule[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "apriori_rules"), (snap) => {
      const data: AprioriRule[] = snap.docs.map((doc) => {
        const d = doc.data() as any;
        return {
          id: doc.id,
          if: Array.isArray(d.if) ? d.if : [],
          then: Array.isArray(d.then) ? d.then : [],
          confidence: d.confidence || "",
          lift: d.lift || 0,
          timestamp: d.timestamp ?? null,
        };
      });
      setRules(data);
    });
    return () => unsub();
  }, []);

  return (
    <div className="w-full h-full px-[16px] flex flex-col overflow-y-auto custom-scrollable">
      <table className="w-full table-fixed border-collapse divide-gray-600">
        <thead className="sticky top-0 z-10 bg-gray text-white  ">
          <tr>
            <th className="w-1/5 py-[12px] text-center whitespace-nowrap  ">
              <h5>IF</h5>
            </th>
            <th className="w-1/5 py-[12px] text-center whitespace-nowrap  ">
              <h5>THEN</h5>
            </th>
            <th className="w-1/5 py-[12px] text-center whitespace-nowrap  ">
              <h5>CONFIDENCE</h5>
            </th>
            <th className="w-1/5 py-[12px] text-center whitespace-nowrap  ">
              <h5>Lift</h5>
            </th>
          </tr>
        </thead>

        <tbody className="bg-black text-white divide-y divide-gray text-start">
          {rules.map((rule) => (
            <tr key={rule.id} className="divide-x divide-gray">
              <td className="py-[12px] px-[6px] ">{rule.if.join(", ")}</td>
              <td className="py-[12px] px-[6px] ">{rule.then.join(", ")}</td>
              <td className="py-[12px] px-[6px] ">{rule.confidence}</td>
              <td className="py-[12px] px-[6px] ">{rule.lift}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
