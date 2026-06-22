"use client";

import { useEffect, useRef } from "react";

export interface RouteStop {
  lat: number;
  lng: number;
  name: string;
}

interface RouteMapProps {
  stops: RouteStop[];
  width?: number;
  height?: number;
  borderRadius?: string;
}

export default function RouteMap({ stops, width = 390, height = 420, borderRadius = "0" }: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !mapRef.current) return;
    initialized.current = true;

    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    if (!document.getElementById("navio-route-style")) {
      const style = document.createElement("style");
      style.id = "navio-route-style";
      style.textContent = `
        .leaflet-tooltip.navio-route-label {
          background: white;
          border: none;
          border-radius: 999px;
          padding: 5px 11px 5px 9px;
          font-size: 11px;
          font-weight: 600;
          font-family: inherit;
          color: #1c1c1e;
          box-shadow: 0 2px 10px rgba(109,40,217,0.22);
          white-space: nowrap;
        }
        .leaflet-tooltip.navio-route-label:before {
          border-top-color: white;
        }
      `;
      document.head.appendChild(style);
    }

    import("leaflet").then((L) => {
      if (!mapRef.current) return;

      const map = L.default.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
      });

      const tileLayer = L.default.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 20,
        subdomains: "abcd",
      }).addTo(map);
      tileLayer.getContainer()?.style.setProperty("filter", "grayscale(1) brightness(0.76) contrast(1.3)");

      const latlngs = stops.map((s) => [s.lat, s.lng] as [number, number]);

      // 경로 선 — 진한 브랜드 보라색
      L.default.polyline(latlngs, {
        color: "#6d28d9",
        weight: 5,
        opacity: 0.95,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);
      // 부드러운 외곽 글로우
      L.default.polyline(latlngs, {
        color: "#a191f8",
        weight: 11,
        opacity: 0.25,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);

      // 구간(스탑)마다 번호 마커 + 이름 라벨
      stops.forEach((stop, i) => {
        const icon = L.default.divIcon({
          html: `<div style="width:28px;height:28px;border-radius:50%;background:#6d28d9;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:13px;font-family:inherit;">${i + 1}</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
          className: "",
        });
        const marker = L.default.marker([stop.lat, stop.lng], { icon }).addTo(map);
        marker.bindTooltip(stop.name, {
          permanent: true,
          direction: "top",
          offset: [0, -16],
          className: "navio-route-label",
        });
      });

      map.fitBounds(latlngs, { paddingTopLeft: [30, 60], paddingBottomRight: [30, 30] });
    });
  }, [stops]);

  return (
    <div
      ref={mapRef}
      style={{ width, height, borderRadius, overflow: "hidden", background: "#c1c2c8" }}
    />
  );
}
