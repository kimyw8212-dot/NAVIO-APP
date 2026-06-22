"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronLeft, Palette, Coffee, Utensils, Plane, Trees,
  Camera, Footprints, PartyPopper, ShoppingBag, Moon, Drama, MoreHorizontal,
} from "lucide-react";
import IPhoneFrame from "../components/IPhoneFrame";
import { ICON_STROKE } from "../components/BottomNav";

const CATEGORIES = [
  { id: "전시/미술",    Icon: Palette },
  { id: "카페",         Icon: Coffee },
  { id: "맛집",         Icon: Utensils },
  { id: "여행",         Icon: Plane },
  { id: "자연",         Icon: Trees },
  { id: "사진스팟",     Icon: Camera },
  { id: "산책",         Icon: Footprints },
  { id: "팝업/이벤트",  Icon: PartyPopper },
  { id: "쇼핑",         Icon: ShoppingBag },
  { id: "야경",         Icon: Moon },
  { id: "문화/공연",    Icon: Drama },
  { id: "기타",         Icon: MoreHorizontal },
];

function InterestsScreen() {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(["전시/미술", "자연", "사진스팟"])
  );

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="relative overflow-hidden" style={{ width: 390, height: 844, background: "var(--navio-bg)" }}>

      {/* 뒤로 가기 */}
      <Link href="/location" className="absolute flex items-center justify-center" style={{ left: 20, top: 63, width: 24, height: 24 }}>
        <ChevronLeft size={22} strokeWidth={ICON_STROKE} color="var(--navio-text)" />
      </Link>

      {/* 페이지 인디케이터 */}
      <div className="absolute flex gap-[6px]" style={{ top: 70, left: "50%", transform: "translateX(-50%)" }}>
        <div className="rounded-full" style={{ width: 8, height: 8, background: "var(--navio-border)" }} />
        <div className="rounded-full" style={{ width: 8, height: 8, background: "var(--navio-border)" }} />
        <div className="rounded-full" style={{ width: 8, height: 8, background: "var(--navio-accent)" }} />
      </div>

      {/* 제목 */}
      <p className="absolute text-[25px] font-semibold" style={{ left: 20, top: 153, color: "var(--navio-text)" }}>
        관심사를 선택해주세요
      </p>

      {/* 부제목 */}
      <div className="absolute" style={{ left: 20, top: 197 }}>
        <p className="text-[13px] font-normal leading-snug mb-0" style={{ color: "var(--navio-text-muted)" }}>관심사에 맞는 장소와 콘텐츠를</p>
        <p className="text-[13px] font-normal leading-snug" style={{ color: "var(--navio-text-muted)" }}>추천해드릴게요.</p>
      </div>

      {/* 카테고리 그리드 */}
      <div
        className="absolute grid grid-cols-2 gap-[12px]"
        style={{ left: 20, top: 258, width: 350 }}
      >
        {CATEGORIES.map(({ id, Icon }) => {
          const active = selected.has(id);
          return (
            <button
              key={id}
              onClick={() => toggle(id)}
              className="flex items-center justify-center gap-[10px] transition-colors"
              style={{
                height: 58,
                borderRadius: "var(--navio-radius-md)",
                background: active ? "var(--navio-accent)" : "var(--navio-surface)",
                boxShadow: active ? "var(--navio-shadow-md)" : "var(--navio-shadow-sm)",
              }}
            >
              <Icon size={22} strokeWidth={ICON_STROKE} color={active ? "#ffffff" : "var(--navio-text)"} />
              <span
                className="text-[14px] font-medium"
                style={{ color: active ? "#ffffff" : "var(--navio-text)" }}
              >
                {id}
              </span>
            </button>
          );
        })}
      </div>

      {/* 다음 버튼 */}
      <Link
        href="/nickname"
        className="absolute flex items-center justify-center"
        style={{ left: 20, top: 768, width: 350, height: 54, borderRadius: 999, background: "var(--navio-accent)", boxShadow: "var(--navio-shadow-md)" }}
      >
        <span className="text-[14px] font-semibold text-white">다음</span>
      </Link>

    </div>
  );
}

export default function InterestsPage() {
  return (
    <IPhoneFrame>
      <InterestsScreen />
    </IPhoneFrame>
  );
}
