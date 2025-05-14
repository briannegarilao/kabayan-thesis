"use client";

import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebaseconfig";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function TrainChart() {
  const [train, setTrain] = useState<number[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "arima_forecasts"), (snap) => {
      if (!snap.empty) {
        const d = snap.docs[0].data() as any;
        setTrain(Array.isArray(d.train) ? d.train : []);
      }
    });
    return () => unsub();
  }, []);

  const labels = train.map((_, i) => `${i}`);
  const data = {
    labels,
    datasets: [
      {
        label: "Train",
        data: train,
        borderColor: "#888888",
        backgroundColor: "#888888",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        ticks: { color: "white" },
        title: { display: true, text: "Index", color: "white" },
      },
      y: {
        ticks: { color: "white" },
        title: { display: true, text: "Value", color: "white" },
      },
    },
    plugins: {
      legend: { labels: { color: "white" } },
      title: { display: true, text: "ARIMA Train Series", color: "white" },
    },
  };

  return (
    <div className="w-full h-full p-4">
      <Line data={data} options={options} />
    </div>
  );
}
