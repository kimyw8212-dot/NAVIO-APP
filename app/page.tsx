import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import IPhoneFrame from "./components/IPhoneFrame";
import { ICON_STROKE } from "./components/BottomNav";

function AppScreen() {
  return (
    <div className="relative bg-white overflow-hidden" style={{ width: 390, height: 844 }}>

      {/* logo2 - NAVIO 텍스트: left=68, top=87, w=263, h=60 */}
      <div className="absolute" style={{ left: 68, top: 87, width: 263, height: 60 }}>
        <Image src="/logo2.png" alt="NAVIO" fill className="object-contain" priority />
      </div>

      {/* logo1 - 나비 일러스트: left=48, top=210, w=302, h=135 */}
      <div className="absolute" style={{ left: 48, top: 210, width: 302, height: 135 }}>
        <Image src="/logo1.png" alt="나비 로고" fill className="object-contain" priority />
      </div>

      {/* 슬로건: top=434, 가운데 정렬 */}
      <div
        className="absolute text-center text-[24px] leading-normal"
        style={{ top: 434, left: 0, right: 0 }}
      >
        <p className="font-medium mb-0" style={{ color: "var(--navio-text)" }}>새로운 순간을,</p>
        <p className="font-medium" style={{ color: "var(--navio-text)" }}>
          가장{" "}
          <span className="font-semibold bg-gradient-to-r from-[#a191f8] to-[#8f7bef] bg-clip-text text-transparent">
            좋은 방향
          </span>
          으로.
        </p>
      </div>

      {/* 로그인 버튼들 */}
      <div className="absolute flex flex-col gap-[14px]" style={{ left: 20, top: 580, width: 350 }}>
        <Link href="/location" className="flex items-center justify-center gap-[10px]" style={{ height: 56, borderRadius: 999, background: "var(--navio-surface)", boxShadow: "var(--navio-shadow-sm)" }}>
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="text-[15px] font-medium" style={{ color: "var(--navio-text)" }}>Google로 계속하기</span>
        </Link>

        <Link href="/location" className="flex items-center justify-center gap-[10px]" style={{ height: 56, borderRadius: 999, background: "var(--navio-surface)", boxShadow: "var(--navio-shadow-sm)" }}>
          <div className="relative" style={{ width: 18, height: 22 }}>
            <Image src="/apple.png" alt="Apple" fill className="object-contain" />
          </div>
          <span className="text-[15px] font-medium" style={{ color: "var(--navio-text)" }}>Apple로 계속하기</span>
        </Link>

        <Link href="/location" className="flex items-center justify-center gap-[10px]" style={{ height: 56, borderRadius: 999, background: "var(--navio-accent-soft)", boxShadow: "var(--navio-shadow-sm)" }}>
          <Mail size={20} strokeWidth={ICON_STROKE} color="var(--navio-accent-strong)" />
          <span className="text-[15px] font-medium" style={{ color: "var(--navio-accent-strong)" }}>이메일로 계속하기</span>
        </Link>
      </div>

      {/* 하단 텍스트 */}
      <div className="absolute flex items-center gap-1" style={{ top: 796, left: 0, right: 0, justifyContent: "center" }}>
        <span className="text-[13px]" style={{ color: "var(--navio-text-muted)" }}>이미 계정이 있으신가요?</span>
        <Link href="/location" className="text-[13px] font-semibold" style={{ color: "var(--navio-accent-strong)" }}>로그인</Link>
      </div>

    </div>
  );
}

export default function Home() {
  return (
    <IPhoneFrame>
      <AppScreen />
    </IPhoneFrame>
  );
}
