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

// register chart.js components once
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ArimaChart() {
  const [train, setTrain] = useState<number[]>([]);
  const [actual, setActual] = useState<number[]>([]);
  const [forecast, setForecast] = useState<number[]>([]);

  useEffect(() => {
    // subscribe to the one-document ARIMA forecasts collection
    const unsub = onSnapshot(collection(db, "arima_forecasts"), (snap) => {
      if (snap.docs.length === 0) return;
      const d = snap.docs[0].data() as any;
      setTrain(Array.isArray(d.train) ? d.train : []);
      setActual(Array.isArray(d.actual) ? d.actual : []);
      setForecast(Array.isArray(d.forecast) ? d.forecast : []);
    });
    return () => unsub();
  }, []);

  // build a common x-axis of indices up to the longest series
  const maxLen = Math.max(actual.length, forecast.length);
  const labels = Array.from({ length: maxLen }, (_, i) => `${i}`);

  const data = {
    labels,
    datasets: [
      {
        label: "Actual",
        data: actual,
        borderColor: "#ffffff",
        backgroundColor: "#ffffff",
      },
      {
        label: "Forecast",
        data: forecast,
        borderColor: "#aaaaaa",
        backgroundColor: "#aaaaaa",
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
      legend: {
        labels: { color: "white" },
      },
      title: {
        display: true,
        text: "ARIMA: Actual · Forecast",
        color: "white",
      },
    },
  };

  return (
    <div className="w-full h-full px-4 py-2">
      <Line data={data} options={options} />
    </div>
  );
}
