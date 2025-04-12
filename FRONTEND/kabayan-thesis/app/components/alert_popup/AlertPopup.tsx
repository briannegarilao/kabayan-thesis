import React from "react";

const AlertPopUp = () => {
  return (
    <div className="w-[420px] bg-black/90 text-white font-sans shadow-lg border border-white z-20">
      {/* HEADER */}
      <div className="flex justify-between items-start px-4 pt-4 text-xs">
        <div>
          <p className="text-gray-400">ALERT TYPE</p>
          <h2 className="text-2xl font-heading text-white">LANDSLIDE</h2>
        </div>
        <span className="text-white text-sm">16:36:23</span>
      </div>

      {/* BODY */}
      <div className="p-4 space-y-4 text-sm">
        {/* Sender Info */}
        <div>
          <p className="text-gray-400">SENDER INFO</p>
          <p>Mark Brian Garilao, 22</p>
          <p>+63 968 299 8790</p>
        </div>

        {/* Location */}
        <div>
          <p className="text-gray-400">EXACT LOCATION</p>
          <p>Blk 34 Lt 35, Queen Street, Ville De Palme</p>
          <p>Long: 12.123456</p>
          <p>Lat: 09.7654231</p>
        </div>

        {/* Message */}
        <div>
          <p className="text-gray-400">MESSAGE</p>
          <p>
            Please rescue us, we can't go out and our lower ground floor is
            flooded too.
          </p>
        </div>

        {/* Severity */}
        <div>
          <p className="text-gray-400">SEVERITY LEVEL</p>
          <p className="text-red-500 font-semibold">HIGH</p>
        </div>

        {/* Responder */}
        <div>
          <p className="text-gray-400">CURRENT RESPONDER</p>
          <p>NONE</p>
        </div>

        {/* Button */}
        <button className="w-full border border-white py-2 text-white hover:bg-white hover:text-black transition">
          ASSIGN RESPONDER
        </button>
      </div>
    </div>
  );
};

export default AlertPopUp;
