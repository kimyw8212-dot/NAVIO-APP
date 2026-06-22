import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Star } from "lucide-react";
import IPhoneFrame from "../components/IPhoneFrame";
import { ICON_STROKE } from "../components/BottomNav";

const REVIEWS = [
  {
    img: "/img1221.png", place: "성수에서 노을이 가장 예쁜 카페", rating: 5, date: "2026.06.15",
    text: "통유리 너머로 보이는 노을이 진짜 미쳤어요. 조용해서 책 읽기에도 너무 좋았던 공간이에요.",
  },
  {
    img: "/img122112121.png", place: "빛의 흐름 전시", rating: 4, date: "2026.06.03",
    text: "공간 전체가 하나의 예술 작품처럼 느껴졌어요. 조용한 분위기에서 여유롭게 관람하기 좋았습니다.",
  },
];

export default function ReviewsPage() {
  return (
    <IPhoneFrame>
      <div className="relative overflow-hidden" style={{ width: 390, height: 844, background: "var(--navio-bg)" }}>
        {/* 헤더 */}
        <div className="absolute flex items-center" style={{ left: 0, top: 47, width: 390, height: 36 }}>
          <Link href="/mypage" className="flex items-center justify-center" style={{ left: 20, position: "absolute", width: 36, height: 36, borderRadius: "50%", background: "var(--navio-surface)", boxShadow: "var(--navio-shadow-sm)" }}>
            <ChevronLeft size={20} strokeWidth={ICON_STROKE} color="var(--navio-text)" />
          </Link>
          <p className="text-center w-full text-[16px] font-bold m-0" style={{ color: "var(--navio-text)" }}>내 리뷰</p>
        </div>

        <p className="absolute text-[12px]" style={{ left: 20, top: 96, color: "var(--navio-text-muted)" }}>
          내가 남긴 리뷰 {REVIEWS.length}개
        </p>

        {/* 리스트 */}
        <div className="absolute" style={{ left: 20, top: 130, width: 350 }}>
          <div className="flex flex-col gap-[14px]">
            {REVIEWS.map((r) => (
              <div
                key={r.place}
                style={{ background: "var(--navio-surface)", borderRadius: "var(--navio-radius-md)", boxShadow: "var(--navio-shadow-sm)", overflow: "hidden" }}
              >
                <div className="relative" style={{ width: "100%", height: 140 }}>
                  <Image src={r.img} alt={r.place} fill className="object-cover" />
                </div>
                <div style={{ padding: 16 }}>
                  <div className="flex items-center justify-between">
                    <p className="text-[14px] font-bold m-0" style={{ color: "var(--navio-text)" }}>{r.place}</p>
                    <span className="text-[11px]" style={{ color: "var(--navio-text-faint)" }}>{r.date}</span>
                  </div>
                  <div className="flex items-center gap-[2px]" style={{ margin: "6px 0 8px" }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        strokeWidth={ICON_STROKE}
                        color="var(--navio-accent)"
                        fill={i < r.rating ? "var(--navio-accent)" : "none"}
                      />
                    ))}
                  </div>
                  <p className="text-[12px] m-0" style={{ color: "var(--navio-text-muted)", lineHeight: 1.55 }}>{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </IPhoneFrame>
  );
}
