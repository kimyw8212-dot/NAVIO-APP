import Image from "next/image";
import Link from "next/link";
import { Menu, MapPin, Palette, UtensilsCrossed, Camera, Footprints } from "lucide-react";
import IPhoneFrame from "../components/IPhoneFrame";
import LeafletMap from "../components/NaverMap";
import BottomNav, { ICON_STROKE } from "../components/BottomNav";

const TIMELINE = [
  { time: "10:00", label: "전시 관람", Icon: Palette },
  { time: "12:00", label: "브런치",   Icon: UtensilsCrossed },
  { time: "14:00", label: "사진 스팟", Icon: Camera },
  { time: "16:00", label: "산책 코스", Icon: Footprints },
];

function HomeScreen() {
  return (
    <div className="relative overflow-hidden" style={{ width: 390, height: 844, background: "var(--navio-bg)" }}>
      <div className="absolute" style={{ left: 0, top: 0, width: 390, height: 762, overflowY: "auto" }}>

        {/* 햄버거 메뉴 */}
        <div className="absolute" style={{ left: 20, top: 58 }}>
          <Menu size={22} strokeWidth={ICON_STROKE} color="var(--navio-text)" />
        </div>

        {/* NAVIO 로고 */}
        <div className="absolute" style={{ left: 133, top: 54, width: 124, height: 28 }}>
          <Image src="/logo2.png" alt="NAVIO" fill className="object-contain" priority />
        </div>

        {/* 위치 + 날씨 글래스 칩 */}
        <div
          className="navio-glass absolute flex items-center"
          style={{ left: 20, top: 104, height: 36, padding: "0 16px", borderRadius: 999, boxShadow: "var(--navio-shadow-sm)" }}
        >
          <MapPin size={15} strokeWidth={ICON_STROKE} color="var(--navio-accent-strong)" />
          <span className="ml-[8px] text-[13px] font-medium" style={{ color: "var(--navio-text)" }}>성수동</span>
          <span className="mx-[8px]" style={{ color: "var(--navio-border)" }}>|</span>
          <span className="text-[12px]" style={{ color: "var(--navio-text-muted)" }}>18° 맑음</span>
        </div>

        {/* 추천 카드 */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: 20, top: 156, width: 350, height: 232,
            background: "var(--navio-surface)",
            borderRadius: "var(--navio-radius-lg)",
            boxShadow: "var(--navio-shadow-md)",
          }}
        >
          <div className="absolute" style={{ left: 24, top: 26, right: 24 }}>
            <span
              className="inline-block text-[11px] font-medium"
              style={{ color: "var(--navio-accent-strong)", background: "var(--navio-accent-soft)", padding: "5px 12px", borderRadius: 999 }}
            >
              오늘, 이 순간을 위한 추천
            </span>
          </div>

          <div className="absolute" style={{ left: 24, top: 68 }}>
            <p className="text-[21px] leading-[1.3] font-semibold m-0" style={{ color: "var(--navio-text)" }}>성수 감성 전시</p>
            <p className="text-[21px] leading-[1.3] font-semibold m-0" style={{ color: "var(--navio-text)" }}>{`<빛의 흐름>`}</p>
          </div>

          <div className="absolute flex items-center gap-[6px]" style={{ left: 24, top: 138 }}>
            <span className="text-[11px]" style={{ color: "var(--navio-text-muted)", background: "var(--navio-divider)", padding: "4px 10px", borderRadius: 999 }}>
              도보 7분
            </span>
            <span className="text-[11px]" style={{ color: "#5fa97c", background: "#eaf7ee", padding: "4px 10px", borderRadius: 999 }}>
              혼잡도 낮음
            </span>
          </div>

          <Link
            href="/exhibition"
            className="absolute flex items-center gap-[4px] text-[12px] font-semibold text-white"
            style={{ left: 24, top: 180, background: "var(--navio-accent)", padding: "9px 16px", borderRadius: 999, boxShadow: "var(--navio-shadow-sm)" }}
          >
            자세히 보기 →
          </Link>

          {/* 전시 이미지 */}
          <div className="absolute overflow-hidden" style={{ left: 197, top: 24, width: 129, height: 184, borderRadius: "var(--navio-radius-md)" }}>
            <Image src="/전시img11.png" alt="전시" fill className="object-cover" />
          </div>

          {/* NAVIO 캐릭터가 카드 모서리에 자연스럽게 등장 */}
          <div className="absolute" style={{ left: 280, top: 168, width: 64, height: 64 }}>
            <Image src="/캐릭터.png" alt="NAVIO" fill className="object-contain" />
          </div>
        </div>

        {/* 오늘의 루트 헤더 */}
        <p className="absolute text-[14px] font-semibold m-0" style={{ left: 20, top: 416, color: "var(--navio-text)" }}>
          오늘의 루트 미리보기
        </p>
        <Link href="/schedule" className="absolute text-[11px] font-medium" style={{ right: 20, top: 418, color: "var(--navio-accent-strong)" }}>
          전체 보기 →
        </Link>

        {/* 타임라인 */}
        <div className="absolute flex items-start" style={{ left: 20, top: 452, width: 350, justifyContent: "space-between" }}>
          {TIMELINE.map(({ time, label, Icon }, i) => (
            <div key={time} className="relative flex flex-col items-center" style={{ width: 70 }}>
              {i < TIMELINE.length - 1 && (
                <div className="absolute" style={{ top: 26, left: "calc(50% + 26px)", width: 44, height: 1, borderTop: "1.5px dashed var(--navio-accent-line)" }} />
              )}
              <div
                className="flex items-center justify-center rounded-full"
                style={{ width: 52, height: 52, background: "var(--navio-accent-soft)", boxShadow: "var(--navio-shadow-sm)" }}
              >
                <Icon size={24} strokeWidth={ICON_STROKE} color="var(--navio-accent-strong)" />
              </div>
              <p className="text-[11px] font-semibold mt-[10px] mb-0 whitespace-nowrap" style={{ color: "var(--navio-text)" }}>{time}</p>
              <p className="text-[11px] mt-[2px] mb-0 whitespace-nowrap" style={{ color: "var(--navio-text-muted)" }}>{label}</p>
            </div>
          ))}
        </div>

        {/* 하단 지도 */}
        <div
          className="absolute overflow-hidden"
          style={{ left: 20, top: 568, width: 350, height: 196, borderRadius: "var(--navio-radius-lg)", boxShadow: "var(--navio-shadow-md)" }}
        >
          <LeafletMap width={350} height={196} lat={37.5443} lng={127.0557} zoom={15} borderRadius="0" />

          {/* 현 위치 버튼 (네이버맵 스타일 플로팅 원형 버튼) */}
          <div
            className="absolute flex items-center justify-center rounded-full"
            style={{ left: 12, bottom: 12, width: 36, height: 36, background: "white", boxShadow: "var(--navio-shadow-sm)" }}
          >
            <div className="rounded-full" style={{ width: 10, height: 10, background: "var(--navio-accent)" }} />
          </div>

          <Link
            href="/explore"
            className="navio-glass absolute text-[11px] font-medium"
            style={{ right: 12, bottom: 12, color: "var(--navio-text)", padding: "8px 14px", borderRadius: 999, boxShadow: "var(--navio-shadow-sm)" }}
          >
            지도로 보기
          </Link>
        </div>

        <div style={{ height: 40 }} />
      </div>

      <BottomNav active="home" />
    </div>
  );
}

export default function HomePage() {
  return (
    <IPhoneFrame>
      <HomeScreen />
    </IPhoneFrame>
  );
}
