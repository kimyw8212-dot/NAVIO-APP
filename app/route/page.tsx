"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Palette, Utensils, Coffee, Camera, TreePine, MapPin, Check } from "lucide-react";
import IPhoneFrame from "../components/IPhoneFrame";
import RouteMap, { type RouteStop } from "../components/RouteMap";
import { ICON_STROKE } from "../components/BottomNav";
import { saveRoute } from "../lib/routeStore";

const STOPS: (RouteStop & { time: string; Icon: typeof Palette })[] = [
  { lat: 37.5447, lng: 127.0557, name: "성수역", time: "13:00", Icon: MapPin },
  { lat: 37.5465, lng: 127.0545, name: "빛의 흐름 전시", time: "13:20", Icon: Palette },
  { lat: 37.5472, lng: 127.0575, name: "이재모 피자 부산점", time: "14:30", Icon: Utensils },
  { lat: 37.5455, lng: 127.0595, name: "심플픽 카페", time: "15:40", Icon: Coffee },
  { lat: 37.543, lng: 127.058, name: "성수 포토 스팟", time: "16:30", Icon: Camera },
  { lat: 37.542, lng: 127.0535, name: "서울숲 산책", time: "17:00", Icon: TreePine },
];

export default function RoutePage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (saved) return;
    saveRoute({
      title: "오늘의 데이트 코스",
      savedAt: Date.now(),
      stops: STOPS.map((s) => ({ name: s.name, time: s.time })),
    });
    setSaved(true);
    setTimeout(() => router.push("/schedule"), 700);
  };

  return (
    <IPhoneFrame>
      <div className="relative overflow-hidden" style={{ width: 390, height: 844, background: "var(--navio-bg)" }}>
        {/* 지도 — 경로(보라색 굵은 선) + 구간별 번호 마커 */}
        <div className="absolute" style={{ left: 0, top: 0, width: 390, height: 420, zIndex: 0, overflow: "hidden" }}>
          <RouteMap stops={STOPS} width={390} height={420} />
        </div>

        {/* 뒤로가기 */}
        <Link
          href="/chat"
          className="absolute flex items-center justify-center rounded-full"
          style={{ left: 16, top: 47, width: 36, height: 36, background: "white", boxShadow: "var(--navio-shadow-md)", zIndex: 10 }}
        >
          <ChevronLeft size={20} strokeWidth={ICON_STROKE} color="var(--navio-text)" />
        </Link>

        {/* 상단 타이틀 칩 */}
        <div
          className="navio-glass absolute flex items-center"
          style={{ left: 64, top: 47, height: 36, padding: "0 16px", borderRadius: 999, boxShadow: "var(--navio-shadow-sm)", zIndex: 10 }}
        >
          <span className="text-[13px] font-semibold" style={{ color: "var(--navio-accent-strong)" }}>
            AI 추천 경로 · 성수동
          </span>
        </div>

        {/* 하단 시트 */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: 0, top: 396, width: 390, height: 448, zIndex: 5,
            background: "var(--navio-surface)",
            borderRadius: "var(--navio-radius-xl) var(--navio-radius-xl) 0 0",
            boxShadow: "0 -8px 32px rgba(140,130,200,0.18)",
          }}
        >
          <div style={{ width: 48, height: 4, borderRadius: 4, background: "var(--navio-border)", margin: "12px auto 0" }} />

          <div style={{ padding: "16px 20px 0" }}>
            <p className="text-[18px] font-bold m-0" style={{ color: "var(--navio-text)" }}>오늘의 데이트 코스</p>
            <p className="text-[12px] mt-[4px] mb-0" style={{ color: "var(--navio-text-muted)" }}>
              성수동 · 도보 약 25분 · 6개 구간
            </p>
          </div>

          <div className="overflow-y-auto" style={{ height: 448 - 96 - 70, padding: "14px 20px 0" }}>
            {STOPS.map((stop, i) => (
              <div key={stop.name} className="relative flex items-start gap-[12px]" style={{ paddingBottom: i < STOPS.length - 1 ? 22 : 0 }}>
                {i < STOPS.length - 1 && (
                  <div className="absolute" style={{ left: 15, top: 32, width: 1.5, height: "calc(100% - 14px)", borderLeft: "1.5px dashed var(--navio-accent-line)" }} />
                )}
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{ width: 31, height: 31, background: "var(--navio-accent)", color: "white", fontSize: 13, fontWeight: 700, boxShadow: "var(--navio-shadow-sm)" }}
                >
                  {i + 1}
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <div className="flex items-center gap-[10px]">
                    <stop.Icon size={16} strokeWidth={ICON_STROKE} color="var(--navio-accent-strong)" />
                    <p className="text-[14px] font-bold m-0" style={{ color: "var(--navio-text)" }}>{stop.name}</p>
                  </div>
                  <span className="text-[12px]" style={{ color: "var(--navio-text-faint)" }}>{stop.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: "12px 20px 20px" }}>
            <button
              onClick={handleSave}
              className="flex items-center justify-center gap-[6px]"
              style={{
                width: "100%", height: 50, border: "none", cursor: "pointer",
                borderRadius: 999, background: saved ? "#16a34a" : "var(--navio-accent)",
                boxShadow: "var(--navio-shadow-md)", transition: "background 0.2s",
              }}
            >
              {saved ? (
                <>
                  <Check size={17} strokeWidth={ICON_STROKE} color="white" />
                  <span className="text-[14px] font-semibold text-white">여행일정에 추가됐어요!</span>
                </>
              ) : (
                <span className="text-[14px] font-semibold text-white">내 일정에 저장하기</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </IPhoneFrame>
  );
}
