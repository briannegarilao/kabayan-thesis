"use client";

import React, { useEffect, useRef } from "react";

const MapSection: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Set restriction box manually (outer bounds from your original mask)
  const restrictionBounds = {
    north: 14.5,
    south: 14.1,
    east: 121.1,
    west: 120.7,
  };

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;

      const { Map } = (await google.maps.importLibrary(
        "maps"
      )) as google.maps.MapsLibrary;

      const map = new Map(mapRef.current, {
        center: { lat: 14.31, lng: 120.96 }, // near center of Dasma
        zoom: 13, // ✅ fixed initial zoom
        mapId: "79220fd507742984",
        disableDefaultUI: true,
        gestureHandling: "greedy",
        mapTypeControl: false,
        colorScheme: "DARK",
        restriction: {
          latLngBounds: restrictionBounds,
          strictBounds: true,
        },
      });

      // Load dasma.geojson and style it
      fetch("/data/dasma.geojson")
        .then((res) => res.json())
        .then((data) => {
          map.data.addGeoJson(data);
          map.data.setStyle({
            fillColor: "#000000",
            fillOpacity: 0.5,
            strokeColor: "#FFFFFF",
            strokeOpacity: 0.5,
            strokeWeight: 1,
          });
        });
    };

    const scriptExists = document.querySelector("#google-maps-script");
    if (!window.google?.maps && !scriptExists) {
      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=beta&libraries=maps,core`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      initMap();
    }
  }, [apiKey]);

  return <div ref={mapRef} className="w-full h-full" />;
};

export default MapSection;
