"use client";

import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import AlertMarker from "../../components/marker/AlertMarker"; // adjust path if needed

interface MapSectionProps {
  users: Array<{ requests: any[]; [key: string]: any }>;
  setSelectedRequest: (req: any) => void;
  selectedRequest: any | null; // ← added
}

const MapSection: React.FC<MapSectionProps> = ({
  users,
  setSelectedRequest,
  selectedRequest, // ← receive it here
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // bounds for Dasmariñas
  const restrictionBounds = {
    north: 14.5,
    south: 14.1,
    east: 121.1,
    west: 120.7,
  };

  // 1) load & init map once
  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;
      const { Map } = (await google.maps.importLibrary(
        "maps"
      )) as google.maps.MapsLibrary;

      const map = new Map(mapRef.current, {
        center: { lat: 14.31, lng: 120.96 },
        zoom: 13,
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

      // draw the inverted mask
      fetch("/data/dasma.geojson")
        .then((r) => r.json())
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

      mapInstance.current = map;
    };

    if (!window.google?.maps) {
      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = [
        `https://maps.googleapis.com/maps/api/js`,
        `?key=${apiKey}`,
        `&v=beta`,
        `&libraries=maps,marker,core`,
      ].join("");
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      initMap();
    }
  }, [apiKey]);

  // 2) whenever “users” updates, render an AlertMarker for each request
  useEffect(() => {
    if (!mapInstance.current) return;
    google.maps.importLibrary("marker").then((lib) => {
      const { AdvancedMarkerElement } = lib as google.maps.MarkerLibrary;
      users.forEach((user) =>
        user.requests.forEach((req: any) => {
          // pull lat/lng from your request
          let pos: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
          if (Array.isArray(req.location) && req.location.length === 2) {
            pos = { lat: req.location[0], lng: req.location[1] };
          } else if (req.location?.latitude !== undefined) {
            pos = {
              lat: req.location.latitude,
              lng: req.location.longitude,
            };
          }

          // mount React marker
          const container = document.createElement("div");
          createRoot(container).render(<AlertMarker />);
          container.style.cursor = "pointer";
          container.onclick = () =>
            setSelectedRequest({ ...req, user, userId: user.id });

          new AdvancedMarkerElement({
            map: mapInstance.current!,
            position: pos,
            content: container,
          });
        })
      );
    });
  }, [users, setSelectedRequest]);

  // ▶️ NEW: pan & zoom when selectedRequest changes, with quick zoom‐out if target is off‐screen
  useEffect(() => {
    if (!mapInstance.current || !selectedRequest) return;

    // derive lat/lng from the selectedRequest just like with markers
    let pos: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
    const loc = selectedRequest.location;
    if (Array.isArray(loc) && loc.length === 2) {
      pos = { lat: loc[0], lng: loc[1] };
    } else if (loc?.latitude !== undefined) {
      pos = { lat: loc.latitude, lng: loc.longitude };
    } else if (selectedRequest.lat && selectedRequest.lng) {
      pos = { lat: selectedRequest.lat, lng: selectedRequest.lng };
    }

    const map = mapInstance.current;
    const targetLatLng = new google.maps.LatLng(pos.lat, pos.lng);
    const bounds = map.getBounds();

    // if the target is outside the current view, do a quick zoom‐out first
    if (bounds && !bounds.contains(targetLatLng)) {
      const quickZoom = 11;
      // console.log("🌍 Target offscreen – quick zooming out", quickZoom);
      map.setZoom(quickZoom);
      // once that resize settles, pan and zoom back in
      google.maps.event.addListenerOnce(map, "idle", () => {
        // console.log("🚀 Panning to target after zoom‐out", pos);
        map.panTo(pos);
        const targetZoom = 16;
        // console.log("🔍 Zooming in to", targetZoom);
        map.setZoom(targetZoom);
      });
    } else {
      // target already in view: just pan & zoom normally
      // console.log("📍 Target onscreen – panning directly to", pos);
      map.panTo(pos);
      const targetZoom = 16;
      if (map.getZoom() !== targetZoom) {
        // console.log("🔍 Zooming in to", targetZoom);
        map.setZoom(targetZoom);
      }
    }
  }, [selectedRequest]);

  return <div ref={mapRef} className="w-full h-full" />;
};

export default MapSection;
