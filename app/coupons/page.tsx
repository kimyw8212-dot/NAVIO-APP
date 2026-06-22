import Link from "next/link";
import { ChevronLeft, Sparkles, Percent } from "lucide-react";
import IPhoneFrame from "../components/IPhoneFrame";
import { ICON_STROKE } from "../components/BottomNav";

const COUPONS = [
  { title: "성수동 카페 10% 할인", desc: "심플픽 카페 외 12곳에서 사용 가능", expire: "2026.06.30까지" },
  { title: "전시 관람 2,000원 할인", desc: "빛의 흐름 전시 단독 쿠폰", expire: "2026.07.05까지" },
  { title: "첫 주문 15% 할인", desc: "전체 가맹점 · 최대 5,000원", expire: "2026.07.31까지" },
];

export default function CouponsPage() {
  return (
    <IPhoneFrame>
      <div className="relative overflow-hidden" style={{ width: 390, height: 844, background: "var(--navio-bg)" }}>
        {/* 헤더 */}
        <div className="absolute flex items-center" style={{ left: 0, top: 47, width: 390, height: 36 }}>
          <Link href="/mypage" className="flex items-center justify-center" style={{ left: 20, position: "absolute", width: 36, height: 36, borderRadius: "50%", background: "var(--navio-surface)", boxShadow: "var(--navio-shadow-sm)" }}>
            <ChevronLeft size={20} strokeWidth={ICON_STROKE} color="var(--navio-text)" />
          </Link>
          <p className="text-center w-full text-[16px] font-bold m-0" style={{ color: "var(--navio-text)" }}>할인쿠폰 · 멤버십</p>
        </div>

        {/* 멤버십 카드 */}
        <div
          className="absolute"
          style={{
            left: 20, top: 96, width: 350, boxSizing: "border-box",
            borderRadius: "var(--navio-radius-lg)",
            background: "linear-gradient(135deg, var(--navio-accent), var(--navio-accent-strong))",
            boxShadow: "var(--navio-shadow-md)",
            padding: "20px 22px 22px",
          }}
        >
          <div className="flex items-center gap-[6px]">
            <Sparkles size={15} strokeWidth={ICON_STROKE} color="white" />
            <span className="text-[12px] font-semibold text-white">NAVIO 멤버십</span>
          </div>
          <p className="text-[20px] font-bold text-white m-0" style={{ marginTop: 8, lineHeight: 1.3 }}>Lv.2 익스플로러</p>
          <div style={{ marginTop: 14, width: "100%", height: 6, borderRadius: 999, background: "rgba(255,255,255,0.35)" }}>
            <div style={{ width: "62%", height: "100%", borderRadius: 999, background: "white" }} />
          </div>
          <p className="text-[11px] m-0" style={{ marginTop: 8, color: "rgba(255,255,255,0.85)" }}>다음 등급까지 380P</p>
        </div>

        {/* 쿠폰 리스트 */}
        <p className="absolute text-[14px] font-bold" style={{ left: 20, top: 248, color: "var(--navio-text)" }}>
          사용 가능한 쿠폰 {COUPONS.length}장
        </p>

        <div className="absolute" style={{ left: 20, top: 280, width: 350 }}>
          <div className="flex flex-col gap-[12px]">
            {COUPONS.map((c) => (
              <div
                key={c.title}
                className="flex items-center gap-[14px]"
                style={{ background: "var(--navio-surface)", borderRadius: "var(--navio-radius-md)", boxShadow: "var(--navio-shadow-sm)", padding: 16 }}
              >
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{ width: 44, height: 44, background: "var(--navio-accent-soft)" }}
                >
                  <Percent size={20} strokeWidth={ICON_STROKE} color="var(--navio-accent-strong)" />
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-bold m-0" style={{ color: "var(--navio-text)" }}>{c.title}</p>
                  <p className="text-[12px] mt-[3px] mb-0" style={{ color: "var(--navio-text-muted)" }}>{c.desc}</p>
                  <p className="text-[11px] mt-[4px] mb-0" style={{ color: "var(--navio-text-faint)" }}>{c.expire}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </IPhoneFrame>
  );
}
