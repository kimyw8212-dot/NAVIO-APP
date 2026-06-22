import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Receipt, MessageSquareText, Percent, Utensils, Palette, Coffee } from "lucide-react";
import IPhoneFrame from "../components/IPhoneFrame";
import BottomNav, { ICON_STROKE } from "../components/BottomNav";

const QUICK_MENU = [
  { Icon: CalendarDays, label: "일정", href: "/schedule" },
  { Icon: Receipt, label: "주문", href: "/orders" },
  { Icon: MessageSquareText, label: "내 리뷰", href: "/reviews" },
  { Icon: Percent, label: "할인쿠폰", href: "/coupons" },
];

const TIMELINE_ITEMS = [
  { Icon: Utensils, title: "이제모 피자 부산점", date: "4.3.금" },
  { Icon: Palette, title: "빛의 흐름 전시", date: "4.3.금" },
  { Icon: Coffee, title: "심플픽 카페", date: "4.3.금" },
];

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

const CALENDAR_ROWS = [
  [1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28],
  [29, 30, 31, null, null, null, null],
];

const TODAY = 14;

function dayColor(i: number, isToday: boolean) {
  if (isToday) return "white";
  if (i === 0) return "#d96a6a";
  if (i === 6) return "var(--navio-accent-strong)";
  return "var(--navio-text)";
}

function MyPageScreen() {
  return (
    <div className="relative overflow-hidden" style={{ width: 390, height: 844, background: "var(--navio-bg)" }}>
      <div className="absolute" style={{ left: 0, top: 0, width: 390, height: 762, overflowY: "auto" }}>

        {/* 프로필 */}
        <div className="absolute rounded-full overflow-hidden" style={{ left: 20, top: 84, width: 56, height: 56, boxShadow: "var(--navio-shadow-sm)" }}>
          <Image src="/Ellipse 18.png" alt="프로필" fill className="object-cover" />
        </div>
        <p className="absolute text-[17px] font-bold" style={{ left: 88, top: 90, margin: 0, color: "var(--navio-text)" }}>
          kim****
        </p>
        <p className="absolute text-[12px]" style={{ left: 88, top: 113, margin: 0, color: "var(--navio-text-muted)" }}>
          kimyw2492
        </p>
        <div
          className="absolute rounded-full flex items-center justify-center text-white text-[10px]"
          style={{ left: 64, top: 116, width: 18, height: 18, background: "var(--navio-accent)", boxShadow: "var(--navio-shadow-sm)" }}
        >
          ✓
        </div>

        {/* 퀵메뉴 */}
        <div className="absolute flex items-start" style={{ left: 20, top: 172, width: 350, justifyContent: "space-between" }}>
          {QUICK_MENU.map((item) => (
            <Link key={item.label} href={item.href} className="flex flex-col items-center">
              <div
                className="flex items-center justify-center rounded-full"
                style={{ width: 56, height: 56, background: "var(--navio-accent-soft)", boxShadow: "var(--navio-shadow-sm)" }}
              >
                <item.Icon size={26} strokeWidth={ICON_STROKE} color="var(--navio-accent-strong)" />
              </div>
              <p className="text-[12px] font-semibold mt-[10px] mb-0 whitespace-nowrap" style={{ color: "var(--navio-text)" }}>
                {item.label}
              </p>
            </Link>
          ))}
        </div>

        {/* 내 타임라인 */}
        <p className="absolute text-[19px] font-bold" style={{ left: 20, top: 290, margin: 0, color: "var(--navio-text)" }}>
          내 타임라인
        </p>
        <div
          className="absolute overflow-hidden flex flex-col items-center justify-center"
          style={{ left: 20, top: 328, width: 350, height: 176, borderRadius: "var(--navio-radius-lg)", background: "linear-gradient(160deg, var(--navio-accent-soft), #eef0fb)", boxShadow: "var(--navio-shadow-sm)" }}
        >
          <div className="relative" style={{ width: 64, height: 64, opacity: 0.9 }}>
            <Image src="/캐릭터.png" alt="NAVIO" fill className="object-contain" />
          </div>
          <p className="text-[12px] mt-[8px] mb-0" style={{ color: "var(--navio-text-muted)" }}>
            NAVIO와 함께한 순간들이 곧 채워질 거예요
          </p>
        </div>

        {/* 최근 활동 리스트 */}
        <div className="absolute" style={{ left: 20, top: 528, width: 350 }}>
          <div className="flex flex-col gap-[12px]">
            {TIMELINE_ITEMS.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-[14px]"
                style={{ background: "var(--navio-surface)", borderRadius: "var(--navio-radius-md)", boxShadow: "var(--navio-shadow-sm)", padding: "14px 18px" }}
              >
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{ width: 36, height: 36, background: "var(--navio-accent-soft)" }}
                >
                  <item.Icon size={17} strokeWidth={ICON_STROKE} color="var(--navio-accent-strong)" />
                </div>
                <div>
                  <p className="text-[14px] font-bold m-0" style={{ color: "var(--navio-text)" }}>{item.title}</p>
                  <p className="text-[11px] mt-[3px] mb-0" style={{ color: "var(--navio-text-faint)" }}>{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 캘린더 */}
        <p className="absolute text-[19px] font-bold leading-[1.4]" style={{ left: 20, top: 776, margin: 0, width: 300, color: "var(--navio-text)" }}>
          6월 일정을 확인해 보세요!
        </p>

        <div
          className="absolute"
          style={{ left: 20, top: 832, width: 350, padding: "20px 0 16px", borderRadius: "var(--navio-radius-lg)", background: "var(--navio-surface)", boxShadow: "var(--navio-shadow-md)" }}
        >
          <p className="text-center text-[15px] font-bold m-0" style={{ color: "var(--navio-text)" }}>2026년 6월</p>

          <div className="grid grid-cols-7 text-center text-[11px] font-semibold mt-[18px] px-[14px]" style={{ color: "var(--navio-text-faint)" }}>
            {WEEKDAYS.map((d, i) => (
              <span key={d} style={{ color: i === 0 ? "#d96a6a" : i === 6 ? "var(--navio-accent-strong)" : "var(--navio-text-faint)" }}>
                {d}
              </span>
            ))}
          </div>

          {CALENDAR_ROWS.map((row, ri) => (
            <div className="grid grid-cols-7 text-center text-[13px] font-semibold mt-[10px] px-[14px]" key={ri}>
              {row.map((date, ci) => {
                const isToday = date === TODAY;
                return (
                  <div key={ci} className="flex items-center justify-center">
                    <span
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: 28, height: 28,
                        background: isToday ? "var(--navio-accent)" : "transparent",
                        color: date === null ? "transparent" : dayColor(ci, isToday),
                        boxShadow: isToday ? "var(--navio-shadow-sm)" : "none",
                      }}
                    >
                      {date ?? "0"}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div style={{ height: 94 }} />
      </div>

      <BottomNav active="mypage" />
    </div>
  );
}

export default function MyPage() {
  return (
    <IPhoneFrame>
      <MyPageScreen />
    </IPhoneFrame>
  );
}
