import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, MapPin } from "lucide-react";
import IPhoneFrame from "../components/IPhoneFrame";
import NaverMap from "../components/NaverMap";
import { ICON_STROKE } from "../components/BottomNav";

function LocationScreen() {
  return (
    <div className="relative overflow-hidden" style={{ width: 390, height: 844, background: "var(--navio-bg)" }}>

      {/* 뒤로 가기 화살표 */}
      <Link href="/" className="absolute flex items-center justify-center" style={{ left: 20, top: 63, width: 24, height: 24 }}>
        <ChevronLeft size={22} strokeWidth={ICON_STROKE} color="var(--navio-text)" />
      </Link>

      {/* 페이지 인디케이터 점 3개 */}
      <div className="absolute flex gap-[6px]" style={{ top: 70, left: "50%", transform: "translateX(-50%)" }}>
        <div className="rounded-full" style={{ width: 8, height: 8, background: "var(--navio-border)" }} />
        <div className="rounded-full" style={{ width: 8, height: 8, background: "var(--navio-accent)" }} />
        <div className="rounded-full" style={{ width: 8, height: 8, background: "var(--navio-border)" }} />
      </div>

      {/* 제목 */}
      <div className="absolute" style={{ left: 20, top: 130 }}>
        <p className="text-[25px] font-semibold leading-tight mb-0" style={{ color: "var(--navio-text)" }}>위치 접근 권한이</p>
        <p className="text-[25px] font-semibold leading-tight" style={{ color: "var(--navio-text)" }}>필요해요</p>
      </div>

      {/* 부제목 */}
      <div className="absolute" style={{ left: 20, top: 195 }}>
        <p className="text-[13px] font-normal leading-snug mb-0" style={{ color: "var(--navio-text-muted)" }}>주변의 추천 장소와</p>
        <p className="text-[13px] font-normal leading-snug" style={{ color: "var(--navio-text-muted)" }}>실시간 정보를 제공하기 위해 필요해요.</p>
      </div>

      {/* 지도 (원형 마스크) */}
      <div className="absolute rounded-full overflow-hidden" style={{ left: 15, top: 226, width: 361, height: 361, zIndex: 1, opacity: 0.6 }}>
        <NaverMap width={361} height={361} lat={37.5665} lng={126.9780} zoom={16} />
      </div>

      {/* 위치 핀 배지 원 */}
      <div className="absolute" style={{ left: 157, top: 360, width: 78, height: 77, zIndex: 2 }}>
        <Image src="/Ellipse 18.png" alt="" fill className="object-contain" />
      </div>

      {/* 위치 아이콘 */}
      <div className="absolute" style={{ left: 184, top: 384, zIndex: 2 }}>
        <MapPin size={26} strokeWidth={ICON_STROKE} color="var(--navio-accent-strong)" fill="var(--navio-accent-soft)" />
      </div>

      {/* 캐릭터 — 지도 위로 */}
      <div className="absolute" style={{ left: 159, top: 436, width: 233, height: 233, zIndex: 3 }}>
        <Image src="/캐릭터.png" alt="캐릭터" fill className="object-contain" />
      </div>

      {/* 안내 문구 */}
      <p
        className="absolute text-[12px] font-normal text-center whitespace-nowrap"
        style={{ top: 674, left: 0, right: 0, color: "var(--navio-text-faint)" }}
      >
        위치는 언제든 설정에서 변경할 수 있어요.
      </p>

      {/* 위치 권한 허용 버튼 */}
      <Link
        href="/interests"
        className="absolute flex items-center justify-center"
        style={{ left: 20, top: 706, width: 350, height: 54, borderRadius: 999, background: "var(--navio-accent)", boxShadow: "var(--navio-shadow-md)" }}
      >
        <span className="text-[14px] font-semibold text-white">위치 권한 허용</span>
      </Link>

      {/* 나중에 하기 버튼 */}
      <Link
        href="/interests"
        className="absolute flex items-center justify-center"
        style={{ left: 20, top: 768, width: 350, height: 54, borderRadius: 999, background: "var(--navio-surface)" }}
      >
        <span className="text-[14px] font-medium" style={{ color: "var(--navio-text-faint)" }}>나중에 하기</span>
      </Link>

    </div>
  );
}

export default function LocationPage() {
  return (
    <IPhoneFrame>
      <LocationScreen />
    </IPhoneFrame>
  );
}
