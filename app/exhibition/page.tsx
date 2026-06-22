import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin, Clock, Phone } from "lucide-react";
import IPhoneFrame from "../components/IPhoneFrame";
import { ICON_STROKE } from "../components/BottomNav";

// 피그마 calc() 헬퍼 (390px 기준)
const c = (pct: number, px: number) => pct / 100 * 390 + px;

const REVIEWS = [
  { label: '"관리가 잘 되있었어요"', count: "3704", fillW: 314, top: 857 },
  { label: '"전시장이 넓어요"',       count: "2556", fillW: 222, top: 905 },
  { label: '"가성비가 좋아요"',        count: "1827", fillW: 183, top: 953 },
  { label: '"가볍게 즐기기 좋아요"',   count: "1798", fillW: 177, top: 1001 },
  { label: '"주차가 편해요"',          count: "987",  fillW:  97, top: 1049 },
];

const BARS = [
  { left: c(60, -2.6),  top: 704, h: 11, color: "#baadff" },
  { left: c(60, 25.4),  top: 699, h: 16, color: "#baadff" },
  { left: c(60, 53.4),  top: 689, h: 26, color: "#a191f8" },
  { left: c(80,  3.2),  top: 694, h: 21, color: "#baadff" },
  { left: c(80, 31.2),  top: 708, h:  7, color: "#baadff" },
];

function ExhibitionScreen() {
  return (
    <div
      className="scrollbar-hide"
      style={{ width: 390, height: 844, overflowY: "auto", overflowX: "hidden", position: "relative", background: "var(--navio-bg)" }}
    >
      {/* 전체 콘텐츠 절대좌표 컨테이너 */}
      <div style={{ position: "relative", width: 390, height: 1620 }}>

        {/* 히어로 이미지: top=-88, h=394 → 실제 보이는 부분 0~306 */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 390, height: 306, overflow: "hidden" }}>
          <Image src="/전시img11.png" alt="전시" fill className="object-cover" priority />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.2), transparent 50%)" }} />
        </div>

        {/* 뒤로가기 버튼: top=47, left=15, size=34 */}
        <Link href="/home" style={{ position: "absolute", left: 15, top: 47, width: 34, height: 34, background: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", zIndex: 10 }}>
          <ChevronLeft size={18} strokeWidth={ICON_STROKE} color="var(--navio-text)" />
        </Link>

        {/* 흰 카드 배경: top=242, h=611 */}
        <div style={{ position: "absolute", left: 0, top: 242, width: 390, height: 1338, background: "var(--navio-surface)", borderRadius: "var(--navio-radius-xl) var(--navio-radius-xl) 0 0", boxShadow: "0 -8px 32px rgba(140,130,200,0.18)" }} />

        {/* 드래그 핸들: top=259, left=calc(40%+14.6px)=170.6, w=49, h=4 */}
        <div style={{ position: "absolute", left: c(40, 14.6), top: 259, width: 49, height: 4, background: "var(--navio-border)", borderRadius: 4 }} />

        {/* 제목: top=288, left=16 */}
        <p style={{ position: "absolute", left: 20, top: 288, fontSize: 21, fontWeight: 700, color: "var(--navio-text)", margin: 0 }}>빛의 흐름 전시</p>

        {/* 부제목: top=323, left=16 */}
        <p style={{ position: "absolute", left: 20, top: 323, fontSize: 13, fontWeight: 400, color: "var(--navio-text-muted)", margin: 0 }}>전시 · 리뷰 4.456</p>

        {/* 구분선: top=356 */}
        <div style={{ position: "absolute", left: 20, top: 356, width: 352, height: 1, background: "var(--navio-divider)" }} />

        {/* 위치 아이콘: top=381, right=calc(80%+48.2px) */}
        <div style={{ position: "absolute", left: 20, top: 382 }}>
          <MapPin size={15} strokeWidth={ICON_STROKE} color="var(--navio-accent)" />
        </div>
        {/* 주소: top=382, left=41 */}
        <p style={{ position: "absolute", left: 44, top: 382, fontSize: 13, color: "var(--navio-text-muted)", margin: 0 }}>경기 수원시 장안구 1110-40번길 2층</p>

        {/* 시계 아이콘: top=419 */}
        <div style={{ position: "absolute", left: 20, top: 420 }}>
          <Clock size={15} strokeWidth={ICON_STROKE} color="var(--navio-accent)" />
        </div>
        {/* 이용시간: top=422, left=41 */}
        <p style={{ position: "absolute", left: 44, top: 422, fontSize: 13, color: "var(--navio-text-muted)", margin: 0 }}>이용시간 - 10 : 00 ~ 20 : 00</p>

        {/* 전화 아이콘: top=457 */}
        <div style={{ position: "absolute", left: 20, top: 457 }}>
          <Phone size={15} strokeWidth={ICON_STROKE} color="var(--navio-accent)" />
        </div>
        {/* 문의전화: top=458, left=41 */}
        <p style={{ position: "absolute", left: 44, top: 458, fontSize: 13, color: "var(--navio-text-muted)", margin: 0 }}>문의전화 - 02 - 1234 - 5678</p>

        {/* 구분선: top=512 — 버튼 아래 레이어 */}
        <div style={{ position: "absolute", left: 20, top: 512, width: 352, height: 1, background: "var(--navio-divider)", zIndex: 0 }} />

        {/* 정보 더보기 버튼 배경: right=calc(20%+63.8px), top=495 */}
        <div style={{ position: "absolute", right: c(20, 63.8), top: 495, width: 129, height: 36, background: "var(--navio-accent)", borderRadius: 999, zIndex: 1, boxShadow: "var(--navio-shadow-sm)" }} />
        {/* 정보 더보기 텍스트: left=calc(20%+67.8px), top=505 */}
        <p style={{ position: "absolute", left: c(20, 67.8), top: 507, fontSize: 14, color: "white", margin: 0, lineHeight: "14px", zIndex: 1 }}>정보 더보기</p>
        {/* 화살표: right=calc(40%+2.6px), top=506 */}
        <div style={{ position: "absolute", right: c(40, 2.6), top: 506, width: 5, height: 11, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
          <ChevronRight size={14} strokeWidth={ICON_STROKE} color="white" />
        </div>

        {/* 매장 데이터 제목: top=560, left=16 */}
        <p style={{ position: "absolute", left: 20, top: 560, fontSize: 14, fontWeight: 600, color: "var(--navio-text)", margin: 0 }}>매장에서 결제된 데이터로 알아봤어요!</p>

        {/* 왼쪽 데이터 카드: top=590, left=16, w=169, h=162 */}
        <div style={{ position: "absolute", left: 20, top: 590, width: 165, height: 162, background: "var(--navio-accent-soft)", borderRadius: "var(--navio-radius-md)", boxShadow: "var(--navio-shadow-sm)" }} />
        {/* 왼쪽 카드 텍스트 */}
        <div style={{ position: "absolute", left: 33, top: 607 }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "var(--navio-text)", lineHeight: 1.3 }}>주간 기준</p>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "var(--navio-accent-strong)", lineHeight: 1.3 }}>방문객</p>
        </div>
        {[["1","연인",656],["2","현장체험",685],["3","가족",715]].map(([num, label, top]) => (
          <div key={num} style={{ position: "absolute", left: 33, top: Number(top), display: "flex", gap: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--navio-text)" }}>{num}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--navio-text)" }}>-</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--navio-text)" }}>{label}</span>
          </div>
        ))}

        {/* 오른쪽 데이터 카드: top=590, left=calc(40%+50.6px), w=169, h=162 */}
        <div style={{ position: "absolute", left: c(40, 50.6), top: 590, width: 165, height: 162, background: "var(--navio-accent-soft)", borderRadius: "var(--navio-radius-md)", boxShadow: "var(--navio-shadow-sm)" }} />
        {/* 오른쪽 카드 텍스트 */}
        <div style={{ position: "absolute", left: c(40, 63.6), top: 607 }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "var(--navio-text)", lineHeight: 1.3 }}>월요일 오후 6시</p>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "var(--navio-text)", lineHeight: 1.3 }}>가장 인기에요!</p>
        </div>
        {/* 막대그래프 baseline: top=716 */}
        <div style={{ position: "absolute", left: c(40, 62.6), top: 716, width: 145, height: 1, background: "var(--navio-border)" }} />
        {BARS.map((b, i) => (
          <div key={i} style={{ position: "absolute", left: b.left, top: b.top, width: 12, height: b.h, background: b.color, borderRadius: "6px 6px 0 0" }} />
        ))}
        {[["12", c(60,-3.6)], ["18", c(60,52.4)], ["8", c(80,33.2)]].map(([label, left]) => (
          <p key={label} style={{ position: "absolute", left: Number(left), top: 720, fontSize: 12, fontWeight: 600, color: "var(--navio-text)", margin: 0 }}>{label}</p>
        ))}

        {/* 구분선: top=782 */}
        <div style={{ position: "absolute", left: 20, top: 782, width: 352, height: 1, background: "var(--navio-divider)" }} />

        {/* 방문자 리뷰: top=816, left=16 */}
        <p style={{ position: "absolute", left: 20, top: 816, fontSize: 20, fontWeight: 700, color: "var(--navio-text)", margin: 0 }}>방문자 리뷰 4,456</p>

        {/* 리뷰 바 5개 */}
        {REVIEWS.map(({ label, count, fillW, top }) => (
          <div key={top} style={{ position: "absolute", left: 20, top, width: 352, height: 43 }}>
            <div style={{ position: "absolute", inset: 0, background: "var(--navio-divider)", borderRadius: 999 }} />
            <div style={{ position: "absolute", left: 0, top: 0, width: fillW, height: 43, background: "var(--navio-accent-soft)", borderRadius: 999 }} />
            <p style={{ position: "absolute", left: 18, top: 0, height: 43, display: "flex", alignItems: "center", fontSize: 13, fontWeight: 700, color: "var(--navio-text)", margin: 0 }}>{label}</p>
            <p style={{ position: "absolute", right: 14, top: 0, height: 43, display: "flex", alignItems: "center", fontSize: 13, fontWeight: 700, color: "var(--navio-accent-strong)", margin: 0 }}>{count}</p>
          </div>
        ))}

        {/* 그라디언트 배경: top=1119, h=441 */}
        <div style={{ position: "absolute", left: 0, top: 1119, width: 390, height: 441, background: "linear-gradient(to bottom, var(--navio-accent-soft) 0%, var(--navio-accent-soft) 36%, var(--navio-surface) 100%)" }} />

        {/* AI 리뷰 브리핑 */}
        <div style={{ position: "absolute", left: 20, top: 1148, display: "flex", alignItems: "center", gap: 8 }}>
          <div className="relative" style={{ width: 28, height: 28 }}>
            <Image src="/캐릭터.png" alt="NAVIO" fill className="object-contain" />
          </div>
          <p style={{ fontSize: 19, fontWeight: 700, color: "var(--navio-text)", margin: 0 }}>AI 리뷰 브리핑</p>
        </div>
        <p style={{ position: "absolute", left: 20, top: 1192, fontSize: 14, color: "var(--navio-text-muted)", margin: 0 }}>리뷰를 기반으로 주요 특징을 정리하면 다음과 같습니다.</p>

        {/* 불릿 1: top=1236, dot=1250 */}
        <div style={{ position: "absolute", left: 21, top: 1250, width: 5, height: 5, background: "var(--navio-accent)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", left: 36, top: 1236 }}>
          <p style={{ margin: 0, fontSize: 14, color: "var(--navio-text-muted)", lineHeight: 1.5 }}>빛의 흐름 전시는 성수역 근처에 위치한 무료 전시장</p>
          <p style={{ margin: 0, fontSize: 14, color: "var(--navio-text-muted)", lineHeight: 1.5 }}>입니다.</p>
        </div>

        {/* 불릿 2: top=1290, dot=1308 */}
        <div style={{ position: "absolute", left: 21, top: 1308, width: 5, height: 5, background: "var(--navio-accent)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", left: 36, top: 1290 }}>
          <p style={{ margin: 0, fontSize: 14, color: "var(--navio-text-muted)", lineHeight: 1.5 }}>주차장이 넓어 차량 이용이 편리하며, 매장 내부는 넓고</p>
          <p style={{ margin: 0, fontSize: 14, color: "var(--navio-text-muted)", lineHeight: 1.5 }}>깔끔하게 관리되어 있습니다.</p>
        </div>

        {/* 불릿 3: top=1344, dot=1360 */}
        <div style={{ position: "absolute", left: 21, top: 1360, width: 5, height: 5, background: "var(--navio-accent)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", left: 36, top: 1344 }}>
          <p style={{ margin: 0, fontSize: 14, color: "var(--navio-text-muted)", lineHeight: 1.5 }}>평일 오후나 주말 오전에 연인과 가족단위 방문객에게</p>
          <p style={{ margin: 0, fontSize: 14, color: "var(--navio-text-muted)", lineHeight: 1.5 }}>인기가 많습니다.</p>
        </div>

        {/* 리뷰 카드 가로 스크롤: top=1406 */}
        <div className="scrollbar-hide" style={{ position: "absolute", left: 15, top: 1406, width: 362, height: 110, overflowX: "auto", overflowY: "hidden", scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          <div style={{ display: "flex", gap: 12, width: "max-content" }}>
            {/* 카드 1 */}
            <div style={{ width: 242, height: 102, background: "var(--navio-surface)", borderRadius: "var(--navio-radius-lg)", boxShadow: "var(--navio-shadow-sm)", flexShrink: 0, position: "relative", padding: "23px 22px 0 22px" }}>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "#3a3a3a", lineHeight: "14px" }}>" 성수동에 새로 오픈한 전시장이라</p>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "#3a3a3a", lineHeight: "14px" }}>방문 했는데 깔끔하고 너무 좋았어요 !!"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden", position: "relative", flexShrink: 0 }}>
                  <Image src="/전시 img 1.png" alt="kim" fill className="object-cover" />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "#000" }}>kim****</p>
                  <p style={{ margin: 0, fontSize: 10, color: "#000" }}>6.3일 방문</p>
                </div>
              </div>
            </div>
            {/* 카드 2 */}
            <div style={{ width: 242, height: 102, background: "var(--navio-surface)", borderRadius: "var(--navio-radius-lg)", boxShadow: "var(--navio-shadow-sm)", flexShrink: 0, position: "relative", padding: "23px 22px 0 22px" }}>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "#3a3a3a", lineHeight: "14px" }}>" 처음 방문 했는데 주차 자리도</p>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "#3a3a3a", lineHeight: "14px" }}>널널하고 감성, 분위기 다 좋아요 !!"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden", position: "relative", flexShrink: 0 }}>
                  <Image src="/전시 img 2.png" alt="js" fill className="object-cover" />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "#000" }}>js***</p>
                  <p style={{ margin: 0, fontSize: 10, color: "#000" }}>6.1일 방문</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 정보 더보기 버튼 배경: right=calc(20%+53.8px), top=1526 */}
        <div style={{ position: "absolute", right: c(20, 53.8), top: 1526, width: 129, height: 36, background: "var(--navio-accent)", borderRadius: 999, zIndex: 1, boxShadow: "var(--navio-shadow-sm)" }} />
        {/* 하단 텍스트: left=calc(40%-0.4px), top=1536 */}
        <p style={{ position: "absolute", left: c(40, -0.4), top: 1538, fontSize: 14, color: "white", margin: 0, lineHeight: "14px", zIndex: 1 }}>정보 더보기</p>
        {/* 하단 화살표: right=calc(40%-7.4px), top=1537 */}
        <div style={{ position: "absolute", right: c(40, -7.4), top: 1537, width: 5, height: 11, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
          <ChevronRight size={14} strokeWidth={ICON_STROKE} color="white" />
        </div>

      </div>
    </div>
  );
}

export default function ExhibitionPage() {
  return (
    <IPhoneFrame>
      <ExhibitionScreen />
    </IPhoneFrame>
  );
}
