"use client";

import { useEffect, useRef } from "react";

interface MapProps {
  width?: number;
  height?: number;
  lat?: number;
  lng?: number;
  zoom?: number;
  borderRadius?: string;
  opacity?: number;
}

export default function LeafletMap({
  width = 361,
  height = 361,
  lat = 37.5665,
  lng = 126.9780,
  zoom = 14,
  borderRadius = "50%",
  opacity = 1,
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !mapRef.current) return;
    initialized.current = true;

    // Leaflet CSS 동적 로드
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    import("leaflet").then((L) => {
      if (!mapRef.current) return;

      const map = L.default.map(mapRef.current, {
        center: [lat, lng],
        zoom,
        zoomControl: false,
        attributionControl: false,
      });

      // 밝은 회색 베이스 — 색은 빼고(완전 무채색) 대비만 올려서 도로/구역이 또렷하게 보이도록.
      // 보라색은 지도 자체가 아니라 마커(포인트)에만 사용.
      const tileLayer = L.default.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 20,
        subdomains: "abcd",
      }).addTo(map);

      tileLayer.getContainer()?.style.setProperty(
        "filter",
        "grayscale(1) brightness(0.76) contrast(1.3)"
      );


      // 커스텀 마커 (보라색 핀 + 부드러운 펄스 링)
      const icon = L.default.divIcon({
        html: `
          <style>
            @keyframes navio-pulse {
              0% { transform: scale(0.6); opacity: 0.55; }
              70% { transform: scale(2.2); opacity: 0; }
              100% { transform: scale(2.2); opacity: 0; }
            }
          </style>
          <div style="position:relative;width:16px;height:16px;">
            <span style="position:absolute;inset:0;border-radius:50%;background:#a191f8;animation:navio-pulse 2.2s ease-out infinite;"></span>
            <div style="position:relative;width:16px;height:16px;background:#a191f8;border-radius:50%;border:2.5px solid white;box-shadow:0 2px 8px rgba(140,130,200,0.45)"></div>
          </div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        className: "",
      });

      L.default.marker([lat, lng], { icon }).addTo(map);
    });
  }, [lat, lng, zoom]);

  return (
    <div
      ref={mapRef}
      style={{ width, height, borderRadius, overflow: "hidden", opacity, background: "#c1c2c8" }}
    />
  );
}
