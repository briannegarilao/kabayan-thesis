import React from "react";
import { Icon } from "@iconify/react";
import "./AlertPopup.css";

const AlertPopUp = () => {
  return (
    <div className="w-[500px] py-[16px] px-[24px] border-1 border-white flex flex-col justify-start items-start gap-[16px] ">
      {/* TITLE & TIME */}
      <div className="w-full flex flex-row justify-between items-center">
        <h4 className="text-gray">ALERT TYPE</h4>
        <h4>16:36:23</h4>
      </div>
      {/* ALERT HEADING */}
      <div className="flex items-start justify-start gap-[16px]">
        {/* Disaster Icon */}
        <div className="inline-flex items-center justify-center p-[4px] border-2 border-white rounded-lg">
          <Icon icon="material-symbols:flood" height={64} />
        </div>
        {/* Disaster Heading Info */}
        <div className="flex flex-col justify-start items-start gap-[16px]">
          <h1 className="text-white ">FLOOD</h1>
          <div className="flex flex-col justify-start items-start gap-[8px]">
            <h4 className="text-gray">SENDER INFO</h4>
            <div className="flex flex-col gap-[4px]">
              <p>Mark Brian Garilao, 22</p>
              <p>+63 968 299 8790</p>
            </div>
          </div>
        </div>
      </div>
      {/* ALERT DETAILS */}
      <div className="flex flex-col justify-start items-start gap-[16px]">
        <div className="alert-details">
          <h4>EXACT LOCATION</h4>
          <p>
            Blk 14 Lt 40, Queen Street, Ville De Palme
            <br />
            Long: 12.433451
            <br />
            Lat: 09.123443
          </p>
        </div>
        <div className="alert-details">
          <h4>MESSAGE</h4>
          <p>
            Please rescue us, we can't go out and our lower ground floor is
            flooded.
          </p>
        </div>
        <div className="alert-details">
          <h4>SEVERITY LEVEL</h4>
          <p>HIGH</p>
        </div>
        <div className="alert-details">
          <h4>CURRENT RESPONDER</h4>
          <p>NONE</p>
        </div>
      </div>
      {/* BUTTON CTA */}
      <button className="btn-heading-style">ASSIGN RESPONDER</button>
    </div>
  );
};

export default AlertPopUp;
