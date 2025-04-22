import React from "react";
import "./AlertMarker.css";

const AlertMarker: React.FC = () => {
  return (
    <div className="alert-marker">
      <div className="icon">!</div>
      <div className="diamond base" />
      <div className="diamond diamond-1" />
      <div className="diamond diamond-2" />
    </div>
  );
};

export default AlertMarker;
