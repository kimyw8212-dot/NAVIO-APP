"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Search, ArrowUpRight, ChevronLeft, ChevronRight, Plus, X, Sparkles } from "lucide-react";
import IPhoneFrame from "../components/IPhoneFrame";
import LeafletMap from "../components/NaverMap";
import BottomNav, { ICON_STROKE } from "../components/BottomNav";
import { getSavedRoute, removeStopFromRoute, type SavedRoute } from "../lib/routeStore";

const c = (pct: number, px: number) => pct / 100 * 390 + px;

const COLLAPSED = 437;
const EXPANDED   = 71;

// 6번 프레임 기준 — 카드 top=71 기준 상대좌표 (절대값 - 71)
const DAY_LABELS  = ["월","화","수","목","금","토","일"];
const LABEL_CLR   = ["#1c1c1e","#1c1c1e","#1c1c1e","#1c1c1e","#1c1c1e","#007cff","#ff303f"];
const LABEL_LEFT  = [28, c(20,3.8), c(20,57.8), c(40,33.6), c(60,9.4), c(60,63.4), c(80,39.2)];
const CIRCLE_LEFT = [21, c(20,-3.2), c(20,50.8), c(40,26.6), c(60,2.4), c(60,56.4), c(80,32.2)];
const DATE_LEFT   = [31, c(20,5.8), c(20,59.8), c(40,35.6), c(60,11.4), c(80,-12.8), c(80,42.2)];
const DATE_CLR    = ["white","#1c1c1e","#1c1c1e","#1c1c1e","#1c1c1e","#007cff","#ff303f"];
const CIRCLE_BG   = ["#a191f8","#f3f0ff","#f3f0ff","#f3f0ff","#f3f0ff","#f3f0ff","#f3f0ff"];

const SLOT_TOPS = [
  { bgTop: 236, txtTop: 248 },
  { bgTop: 288, txtTop: 300 },
  { bgTop: 340, txtTop: 352 },
];

const PLACEHOLDER_SCHEDULES = ["일정 추가 1", "일정 추가 2", "일정 추가 3"].map((label, i) => ({
  label,
  name: undefined as string | undefined,
  time: undefined as string | undefined,
  ...SLOT_TOPS[i],
}));

const ITEMS = [
  { time: "10:00", top: 450, img: "/전시img11.png" },
  { time: "12:00", top: 578, img: "/전시 img 1.png" },
];

function ScheduleScreen() {
  const [cardTop, setCardTopState] = useState(COLLAPSED);
  const [snap, setSnap] = useState(false);
  const [addedSchedules, setAddedSchedules] = useState<Set<string>>(new Set());
  const [savedRoute, setSavedRoute] = useState<SavedRoute | null>(null);
  const cardTopRef = useRef(COLLAPSED);
  const dragging   = useRef(false);
  const startY     = useRef(0);
  const startTop   = useRef(COLLAPSED);

  const setCardTop = (v: number) => { cardTopRef.current = v; setCardTopState(v); };

  const toggleSchedule = (label: string) => {
    setAddedSchedules((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  };

  const removeFromTrip = (name: string, time: string) => {
    const updated = removeStopFromRoute(name, time);
    setSavedRoute(updated);
  };

  useEffect(() => {
    // localStorage is only available client-side, so the saved AI route has to be
    // hydrated post-mount rather than read during render.
    const route = getSavedRoute();
    if (!route) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSavedRoute(route);
  }, []);

  const SCHEDULES = savedRoute
    ? savedRoute.stops.slice(0, 3).map((s, i) => ({ label: `${s.time} ${s.name}`, name: s.name, time: s.time, ...SLOT_TOPS[i] }))
    : PLACEHOLDER_SCHEDULES;
  const extraStopCount = savedRoute ? Math.max(0, savedRoute.stops.length - 3) : 0;

  useEffect(() => {
    const onMove = (y: number) => {
      if (!dragging.current) return;
      const next = Math.max(EXPANDED, Math.min(COLLAPSED, startTop.current + (y - startY.current)));
      setCardTop(next);
    };
    const onEnd = (y: number) => {
      if (!dragging.current) return;
      dragging.current = false;
      const delta = y - startY.current;
      let target: number;
      if      (delta < -40) target = EXPANDED;
      else if (delta >  40) target = COLLAPSED;
      else target = cardTopRef.current < (COLLAPSED + EXPANDED) / 2 ? EXPANDED : COLLAPSED;
      setSnap(true);
      setCardTop(target);
    };
    const mm = (e: MouseEvent) => onMove(e.clientY);
    const mu = (e: MouseEvent) => onEnd(e.clientY);
    const tm = (e: TouchEvent) => { e.preventDefault(); onMove(e.touches[0].clientY); };
    const te = (e: TouchEvent) => onEnd(e.changedTouches[0].clientY);
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseup",   mu);
    window.addEventListener("touchmove", tm, { passive: false });
    window.addEventListener("touchend",  te);
    return () => {
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("mouseup",   mu);
      window.removeEventListener("touchmove", tm);
      window.removeEventListener("touchend",  te);
    };
  }, []);

  const onDragStart = (y: number) => {
    dragging.current = true;
    startY.current   = y;
    startTop.current = cardTopRef.current;
    setSnap(false);
  };

  return (
    <div className="relative overflow-hidden" style={{ width: 390, height: 844, background: "#fafbfd" }}>

      {/* ── 상단 영역 (카드 아래 레이어) z=1 ── */}
      <div style={{ position: "absolute", left: -32, top: -50, width: 455, height: 679, zIndex: 1 }}>
        <LeafletMap width={455} height={679} lat={37.4979} lng={127.0276} zoom={13} borderRadius="0" />
      </div>

      {/* 검색바 — 글래스 */}
      <div className="navio-glass" style={{ position: "absolute", left: 15, top: 70, width: 304, height: 52, borderRadius: 999, zIndex: 1, boxShadow: "var(--navio-shadow-md)" }}>
        <p style={{ position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: "var(--navio-text-muted)", margin: 0, whiteSpace: "nowrap" }}>어디로 떠나볼까요?</p>
        <div style={{ position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)", display: "flex" }}>
          <Search size={17} strokeWidth={ICON_STROKE} color="var(--navio-text-muted)" />
        </div>
      </div>

      {/* 보라 화살표 버튼 */}
      <div style={{ position: "absolute", left: c(80,13.2), top: 70, width: 54, height: 54, background: "var(--navio-accent)", borderRadius: "50%", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--navio-shadow-md)" }}>
        <ArrowUpRight size={24} strokeWidth={ICON_STROKE} color="white" />
      </div>

      {/* 필터 칩 — 글래스 캡슐 */}
      {([
        { label: "성수동 인기 팝업", left: 24,  width: 132, active: true },
        { label: "전시/미술",        left: 166, width: 80,  active: false },
        { label: "카페",             left: 256, width: 48,  active: false },
        { label: "맛집",             left: 314, width: 48,  active: false },
      ] as { label: string; left: number; width: number; active: boolean }[]).map(({ label, left, width, active }) => (
        <div
          key={label}
          className="navio-glass"
          style={{
            position: "absolute", left, top: 131, width, height: 33,
            border: active ? "1.5px solid var(--navio-accent)" : "1px solid transparent",
            borderRadius: 999, zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "var(--navio-shadow-sm)",
          }}
        >
          <span style={{ fontSize: 12, fontWeight: active ? 700 : 500, color: active ? "var(--navio-accent-strong)" : "var(--navio-text)" }}>{label}</span>
        </div>
      ))}

      {/* ── 드래그 카드 z=10 (항상 상단 위에) ── */}
      <div
        style={{
          position: "absolute", left: 0, top: cardTop,
          width: 390, height: 844,
          background: "var(--navio-surface)", borderRadius: "var(--navio-radius-xl) var(--navio-radius-xl) 0 0",
          boxShadow: "0 -8px 32px rgba(140,130,200,0.22)",
          zIndex: 10,
          transition: snap ? "top 0.4s cubic-bezier(0.4,0,0.2,1)" : "none",
          touchAction: "none",
          userSelect: "none",
        }}
        onMouseDown={(e) => onDragStart(e.clientY)}
        onTouchStart={(e) => { e.preventDefault(); onDragStart(e.touches[0].clientY); }}
        onTransitionEnd={() => setSnap(false)}
      >
        {/* 드래그 핸들 */}
        <div style={{ position: "absolute", left: c(40,14.6), top: 21, width: 49, height: 4, background: "var(--navio-border)", borderRadius: 4 }} />

        {/* 여행일정 */}
        <p style={{ position: "absolute", left: 20, top: 56, fontSize: 20, fontWeight: 700, color: "var(--navio-text)", margin: 0 }}>여행일정</p>
        {savedRoute && (
          <div
            className="absolute flex items-center gap-[4px]"
            style={{ left: 92, top: 59, padding: "4px 10px", borderRadius: 999, background: "var(--navio-accent-soft)" }}
          >
            <Sparkles size={11} strokeWidth={ICON_STROKE} color="var(--navio-accent-strong)" />
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--navio-accent-strong)" }}>AI 추천 코스 추가됨</span>
          </div>
        )}

        {/* 2026년 6월 1주차 */}
        <p style={{ position: "absolute", left: 20, top: 101, fontSize: 18, fontWeight: 500, color: "var(--navio-text-muted)", margin: 0 }}>2026년 6월 1주차</p>

        {/* 월 버튼 */}
        <div style={{ position: "absolute", left: c(40,44.6), top: 96, width: 45, height: 33, background: "var(--navio-accent-soft)", borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--navio-accent-strong)" }}>월</span>
        </div>

        {/* 오늘 버튼 */}
        <div style={{ position: "absolute", left: c(60,15.4), top: 96, width: 50, height: 33, background: "var(--navio-divider)", borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--navio-text-faint)" }}>오늘</span>
        </div>

        {/* 이전 < */}
        <div style={{ position: "absolute", left: c(80,-8.8), top: 96, width: 34, height: 34, background: "var(--navio-divider)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ChevronLeft size={16} strokeWidth={ICON_STROKE} color="var(--navio-text)" />
        </div>

        {/* 다음 > */}
        <div style={{ position: "absolute", left: c(80,29.2), top: 96, width: 34, height: 34, background: "var(--navio-divider)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ChevronRight size={16} strokeWidth={ICON_STROKE} color="var(--navio-text)" />
        </div>

        {/* 요일 */}
        {DAY_LABELS.map((d, i) => (
          <p key={d} style={{ position: "absolute", left: LABEL_LEFT[i], top: 159, fontSize: 12, color: LABEL_CLR[i], margin: 0 }}>{d}</p>
        ))}

        {/* 날짜 원 */}
        {[0,1,2,3,4,5,6].map((i) => (
          <div key={i} style={{ position: "absolute", left: CIRCLE_LEFT[i], top: 179, width: 26, height: 26, background: CIRCLE_BG[i], borderRadius: "50%" }} />
        ))}

        {/* 날짜 숫자 */}
        {[1,2,3,4,5,6,7].map((n, i) => (
          <p key={n} style={{ position: "absolute", left: DATE_LEFT[i], top: 184, fontSize: 12, color: DATE_CLR[i], margin: 0, zIndex: 1 }}>{n}</p>
        ))}

        {/* 일정 추가 행 */}
        {SCHEDULES.map(({ label, name, time, bgTop, txtTop }) => {
          const fromRoute = name !== undefined && time !== undefined;
          const added = fromRoute ? true : addedSchedules.has(label);
          return (
            <React.Fragment key={label}>
              <div
                style={{
                  position: "absolute", left: 21, top: bgTop, width: 324, height: 42, borderRadius: 21,
                  background: added ? "var(--navio-accent)" : "var(--navio-accent-soft)",
                  boxShadow: "var(--navio-shadow-sm)",
                  transition: "background 0.2s",
                }}
              />
              <p
                style={{
                  position: "absolute", left: 41, top: txtTop, right: 95, fontSize: 12, fontWeight: 700, margin: 0,
                  color: added ? "white" : "var(--navio-accent-strong)",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}
              >
                {added ? (fromRoute ? label : `${label} 완료`) : label}
              </p>
              <button
                onClick={() => {
                  if (fromRoute) removeFromTrip(name, time);
                  else toggleSchedule(label);
                }}
                title={added && fromRoute ? "일정에서 빼기" : undefined}
                style={{
                  position: "absolute", left: 309, top: bgTop + 8, width: 26, height: 26, border: "none",
                  background: added ? "white" : "var(--navio-accent)",
                  borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "var(--navio-shadow-sm)", cursor: "pointer", transition: "background 0.2s",
                }}
              >
                {added ? (
                  <X size={13} strokeWidth={ICON_STROKE} color="var(--navio-accent)" />
                ) : (
                  <Plus size={13} strokeWidth={ICON_STROKE} color="white" />
                )}
              </button>
            </React.Fragment>
          );
        })}

        {extraStopCount > 0 && (
          <p
            className="absolute"
            style={{ left: 21, top: 383, fontSize: 11, color: "var(--navio-text-faint)", margin: 0 }}
          >
            +{extraStopCount}개 코스가 더 추가됐어요
          </p>
        )}

        {/* 구분선 (점선) */}
        <div style={{ position: "absolute", left: 21, top: 401, width: 350, height: 0, borderTop: "1.5px dashed var(--navio-accent-line)" }} />

        {/* 날짜 헤더 */}
        <p style={{ position: "absolute", left: 20, top: 414, fontSize: 14, fontWeight: 700, color: "var(--navio-text)", margin: 0 }}>6.20 (화)</p>
        <p style={{ position: "absolute", left: c(20,4.8), top: 416, fontSize: 12, color: "var(--navio-text-faint)", margin: 0 }}>18도 맑음</p>

        {/* 일정 아이템 */}
        {ITEMS.map(({ time, top, img }) => (
          <React.Fragment key={time}>
            <div style={{ position: "absolute", left: 16, top: top - 10, width: 358, height: 118, background: "var(--navio-surface)", borderRadius: "var(--navio-radius-md)", boxShadow: "var(--navio-shadow-sm)" }} />
            <p style={{ position: "absolute", left: 32, top: top + 1, fontSize: 12, fontWeight: 600, color: "var(--navio-accent-strong)", margin: 0 }}>{time}</p>
            <p style={{ position: "absolute", left: 32, top: top + 19, fontSize: 15, fontWeight: 700, color: "var(--navio-text)", margin: 0 }}>빛의 흐름 전시</p>
            <p style={{ position: "absolute", left: 32, top: top + 44, fontSize: 12, color: "var(--navio-text-muted)", margin: 0 }}>성동구 성수이로 97</p>
            <p style={{ position: "absolute", left: 32, top: top + 63, fontSize: 12, color: "var(--navio-text-muted)", margin: 0 }}>도보 7분</p>
            <div style={{ position: "absolute", left: c(60,21.4), top, width: 105, height: 105, borderRadius: "var(--navio-radius-sm)", overflow: "hidden", boxShadow: "var(--navio-shadow-sm)" }}>
              <Image src={img} alt="전시" fill className="object-cover" />
            </div>
          </React.Fragment>
        ))}

      </div>

      <BottomNav active="schedule" />
    </div>
  );
}

export default function SchedulePage() {
  return (
    <IPhoneFrame>
      <ScheduleScreen />
    </IPhoneFrame>
  );
}
