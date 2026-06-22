"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import IPhoneFrame from "../components/IPhoneFrame";
import { ICON_STROKE } from "../components/BottomNav";

const MAX_LENGTH = 18;

function NicknameScreen() {
  const [nickname, setNickname] = useState("여행하는 나비");

  return (
    <div className="relative overflow-hidden" style={{ width: 390, height: 844, background: "var(--navio-bg)" }}>

      {/* 뒤로 가기 */}
      <Link href="/interests" className="absolute flex items-center justify-center" style={{ left: 20, top: 63, width: 24, height: 24 }}>
        <ChevronLeft size={22} strokeWidth={ICON_STROKE} color="var(--navio-text)" />
      </Link>

      {/* 페이지 인디케이터 — 3번째 활성 */}
      <div className="absolute flex gap-[6px]" style={{ top: 70, left: "50%", transform: "translateX(-50%)" }}>
        <div className="rounded-full" style={{ width: 8, height: 8, background: "var(--navio-border)" }} />
        <div className="rounded-full" style={{ width: 8, height: 8, background: "var(--navio-border)" }} />
        <div className="rounded-full" style={{ width: 8, height: 8, background: "var(--navio-accent)" }} />
      </div>

      {/* 제목 */}
      <p className="absolute text-[25px] font-semibold" style={{ left: 20, top: 153, color: "var(--navio-text)" }}>
        나를 알려주세요
      </p>

      {/* 부제목 */}
      <div className="absolute" style={{ left: 20, top: 194 }}>
        <p className="text-[13px] font-normal leading-snug mb-0" style={{ color: "var(--navio-text-muted)" }}>닉네임을 설정하면</p>
        <p className="text-[13px] font-normal leading-snug" style={{ color: "var(--navio-text-muted)" }}>더 개인화된 추천을 받을 수 있어요.</p>
      </div>

      {/* 닉네임 라벨 */}
      <p className="absolute text-[12px] font-medium" style={{ left: 20, top: 256, color: "var(--navio-text-muted)" }}>
        닉네임
      </p>

      {/* 입력 박스 */}
      <div
        className="absolute flex items-center"
        style={{ left: 20, top: 286, width: 350, height: 52, background: "var(--navio-surface)", borderRadius: "var(--navio-radius-md)", boxShadow: "var(--navio-shadow-sm)" }}
      >
        <input
          type="text"
          value={nickname}
          onChange={(e) => {
            if (e.target.value.length <= MAX_LENGTH) setNickname(e.target.value);
          }}
          maxLength={MAX_LENGTH}
          className="w-full h-full bg-transparent outline-none text-[14px]"
          style={{
            color: "var(--navio-text)",
            paddingLeft: 18,
            paddingRight: 52,
          }}
          placeholder="닉네임을 입력하세요"
        />
        <span
          className="absolute text-[11px] pointer-events-none"
          style={{ right: 16, color: "var(--navio-text-faint)" }}
        >
          {nickname.length}/{MAX_LENGTH}
        </span>
      </div>

      {/* 다음 버튼 */}
      <Link href="/home" className="absolute flex items-center justify-center" style={{ left: 20, top: 768, width: 350, height: 54, borderRadius: 999, background: "var(--navio-accent)", boxShadow: "var(--navio-shadow-md)" }}>
        <span className="text-[14px] font-semibold text-white">다음</span>
      </Link>

    </div>
  );
}

export default function NicknamePage() {
  return (
    <IPhoneFrame>
      <NicknameScreen />
    </IPhoneFrame>
  );
}
