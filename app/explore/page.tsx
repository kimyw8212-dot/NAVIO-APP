"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import IPhoneFrame from "../components/IPhoneFrame";
import BottomNav, { ICON_STROKE } from "../components/BottomNav";

const c = (pct: number, px: number) => pct / 100 * 390 + px;

/* ── 내 주변 데이터 ── */
const HOTPLACES = [
  { blobLeft: 17,  blobImg: "/Union3.png", badgeLeft: 30,  badgeImg: "/Union.png",   textLeft: 48,  tag: "#데이트 하기 좋은" },
  { blobLeft: 168, blobImg: "/Union1.png", badgeLeft: 181, badgeImg: "/Union.png",   textLeft: 207, tag: "#최근 이용 많은" },
  { blobLeft: 319, blobImg: "/Union2.png", badgeLeft: 332, badgeImg: "/Union-2.png", textLeft: 352, tag: "#함께 즐기기 좋은" },
];

const TOP_CARDS = [
  { num: 1, tag: "#팝업 스토어",  title: "스타필드 수원", img: "/card1.png", left: 17,         top: 506 },
  { num: 2, tag: "#런치",         title: "스타필드 수원", img: "/card2.png", left: c(40,44.8),  top: 506 },
  { num: 3, tag: "#다양한 디저트",title: "스타필드 수원", img: "/card3.png", left: 17,         top: 744 },
  { num: 4, tag: "#kt 야구장",    title: "스타필드 수원", img: "/card4.png", left: c(40,44.8),  top: 744 },
];

const BUSAN_CARDS = [
  { img: "/img12.png",   chip: "부산 이재모 피자 본점", profile: "/전시 img 1.png", user: "kim****",        title: "부산 맛집 모음",   sub: "이재모 피자 본점 외 19개" },
  { img: "/img12-1.png", chip: "일등가 대게만찬",       profile: "/전시 img 2.png", user: "네이버 플레이스", title: "부산 로컬 맛집",   sub: "이재모 피자 본점 외 19개" },
];

/* ── 주변 리뷰 데이터 ── */
type ReviewData = {
  avatarImg: string; user: string; location: string; time: string;
  photoImg: string; title: string; review: string;
  tags: string[]; aiText: string;
};

const REVIEWS: ReviewData[] = [
  {
    avatarImg: "/전시 img 1.png", user: "김영웅", location: "성수동", time: "2시간 전",
    photoImg: "/img1221.png",
    title: "성수에서 노을이 가장 예쁜 카페",
    review: "통유리 너머로 보이는 노을이 진짜 미쳤어요...\n조용해서 책 읽기에도 너무 좋았던 공간이에요.",
    tags: ["성수동", "카페", "노을 맛집", "감성 공간"],
    aiText: "오후 5~7시 사이 방문하면 노을을 가장 예쁘게 볼 수 있어요",
  },
  {
    avatarImg: "/전시 img 2.png", user: "김영웅", location: "성수동", time: "2시간 전",
    photoImg: "/img122112121.png",
    title: "조화를 이루는 감성 전시 공간",
    review: "공간 전체가 하나의 예술 작품처럼 느껴졌어요. 조용한 분위기에서 여유롭게 관람하기 좋았습니다.",
    tags: ["문화생활", "전시", "예술공간", "사진스팟"],
    aiText: "오전 시간대에 방문하면 더욱 여유롭게 작품을 감상할 수 있어요.",
  },
  {
    avatarImg: "/전시 img 1.png", user: "김영웅", location: "성수동", time: "2시간 전",
    photoImg: "/img122112212.png",
    title: "시원한 물소리를 즐길 수 있는 계곡",
    review: "시원한 물소리를 들으며 천천히 산책하기 좋은 힐링 코스예요.",
    tags: ["자연", "계곡", "힐링", "산책"],
    aiText: "이른 오전에 방문하면 한적하게 즐길 수 있어요.",
  },
  {
    avatarImg: "/전시 img 2.png", user: "김영웅", location: "성수동", time: "2시간 전",
    photoImg: "/img122112.png",
    title: "특별한 경험을 만날 수 있는 성수 팝업 스토어",
    review: "공간 연출이 인상적이었어요. 한정 굿즈와 포토존까지 즐길 거리가 가득했습니다.",
    tags: ["팝업스토어", "성수", "포토존", "트렌드"],
    aiText: "한정 굿즈와 체험 프로그램은 조기 마감될 수 있으니 미리 확인해보세요.",
  },
];

const REVIEW_TOPS = [206, 820, 1427, 2035];

/* ── 리뷰 카드 컴포넌트 ── */
function ReviewCard({ avatarImg, user, location, time, photoImg, title, review, tags, aiText, top }: ReviewData & { top: number }) {
  return (
    <div style={{
      position: "absolute", left: 14, top, width: 362,
      borderRadius: "var(--navio-radius-lg)", background: "var(--navio-surface)",
      boxShadow: "var(--navio-shadow-md)",
      overflow: "hidden",
    }}>
      {/* 프로필 */}
      <div style={{ display: "flex", alignItems: "center", padding: "18px 22px 14px" }}>
        <div style={{ width: 46, height: 46, borderRadius: "50%", overflow: "hidden", flexShrink: 0, position: "relative" }}>
          <Image src={avatarImg} alt={user} fill className="object-cover" />
        </div>
        <div style={{ marginLeft: 14, flex: 1 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "var(--navio-text)", margin: 0 }}>{user}</p>
          <p style={{ fontSize: 10, color: "var(--navio-text-muted)", margin: "3px 0 0" }}>{location}</p>
        </div>
        <p style={{ fontSize: 10, color: "var(--navio-text-faint)", margin: 0 }}>{time}</p>
      </div>

      {/* 사진 */}
      <div style={{ width: "100%", height: 207, position: "relative" }}>
        <Image src={photoImg} alt={title} fill className="object-cover" />
      </div>

      {/* 하단 섹션 */}
      <div style={{ background: "var(--navio-surface)" }}>
        {/* 페이지네이션 점 */}
        <div style={{ paddingTop: 12, paddingBottom: 6, display: "flex", justifyContent: "center", gap: 5 }}>
          {[0,1,2,3,4].map(j => (
            <div key={j} style={{
              width: 6, height: 6, borderRadius: "50%",
              background: j === 0 ? "var(--navio-accent)" : "var(--navio-border)",
            }} />
          ))}
        </div>

        <div style={{ padding: "10px 22px 18px" }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: "var(--navio-text)", margin: "0 0 8px" }}>{title}</p>
          <p style={{ fontSize: 12, color: "var(--navio-text-muted)", margin: "0 0 12px", whiteSpace: "pre-line", lineHeight: 1.55 }}>{review}</p>

          {/* 태그 */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
            {tags.map(tag => (
              <div key={tag} style={{ background: "var(--navio-divider)", borderRadius: 999, padding: "4px 11px" }}>
                <span style={{ fontSize: 9, color: "var(--navio-text-muted)" }}>{tag}</span>
              </div>
            ))}
          </div>

          {/* NAVIO AI 한마디 */}
          <div style={{ background: "var(--navio-accent-soft)", borderRadius: "var(--navio-radius-sm)", padding: "12px 18px", marginBottom: 12 }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: "var(--navio-accent-strong)", margin: "0 0 5px" }}>NAVIO AI 한마디</p>
            <p style={{ fontSize: 11, color: "var(--navio-text)", margin: 0, lineHeight: 1.55 }}>{aiText}</p>
          </div>

          {/* 버튼 */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ background: "var(--navio-accent)", borderRadius: 999, padding: "10px 20px", boxShadow: "var(--navio-shadow-sm)" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "white" }}>일정 따라가기</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 메인 화면 ── */
function ExploreScreen() {
  const [tab, setTab] = useState<"nearby" | "review">("nearby");
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const toggleSave = (key: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const pillLeft  = tab === "nearby" ? 10 : 193;
  const nearbyClr = tab === "nearby" ? "var(--navio-accent-strong)" : "var(--navio-text-faint)";
  const reviewClr = tab === "review"  ? "var(--navio-accent-strong)" : "var(--navio-text-faint)";
  const scrollH   = tab === "nearby" ? 1530 : 2600;

  return (
    <div style={{ width: 390, height: 844, position: "relative", overflow: "hidden", background: "var(--navio-bg)" }}>

      {/* ── 스크롤 영역 ── */}
      <div className="scrollbar-hide" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 82, overflowY: "auto", overflowX: "hidden" }}>
        <div style={{ position: "relative", width: 390, height: scrollH }}>

          {/* 제목 */}
          <p style={{ position: "absolute", left: 20, top: 58, fontSize: 22, fontWeight: 700, color: "var(--navio-text)", margin: 0 }}>탐험 피드</p>
          <p style={{ position: "absolute", left: 20, top: 91, fontSize: 12, color: "var(--navio-text-muted)", margin: 0 }}>다른 사람들의 순간을 만나보세요.</p>

          {/* ── 탭 바 ── */}
          <div style={{ position: "absolute", left: 20, top: 129, width: 350, height: 47, background: "var(--navio-divider)", borderRadius: 999 }}>
            <div style={{
              position: "absolute", left: pillLeft - 4, top: 4, width: 164, height: 39,
              background: "white", borderRadius: 999, boxShadow: "var(--navio-shadow-sm)",
              transition: "left 0.25s cubic-bezier(0.4,0,0.2,1)",
            }} />
            <span
              onClick={() => setTab("nearby")}
              style={{ position: "absolute", left: 67, top: 16, fontSize: 12, fontWeight: 700, color: nearbyClr, lineHeight: "15px", cursor: "pointer", userSelect: "none" }}
            >내 주변</span>
            <span
              onClick={() => setTab("review")}
              style={{ position: "absolute", left: 247, top: 16, fontSize: 12, fontWeight: 700, color: reviewClr, lineHeight: "15px", cursor: "pointer", userSelect: "none" }}
            >주변 리뷰</span>
          </div>

          {/* ────────────────────────────────
              내 주변 콘텐츠
          ──────────────────────────────── */}
          {tab === "nearby" && (
            <>
              <p style={{ position: "absolute", left: 20, top: 205, fontSize: 20, fontWeight: 700, color: "var(--navio-text)", margin: 0 }}>근처 핫플레이스 알아보기</p>
              <p style={{ position: "absolute", left: 20, top: 234, fontSize: 13, color: "var(--navio-text-muted)", margin: 0 }}>나와 가까운 핫플이 어디진지 알려드려요.</p>

              {/* 핫플레이스 3개 */}
              {HOTPLACES.map(({ blobLeft, blobImg, badgeLeft, badgeImg, textLeft, tag }, i) => (
                <React.Fragment key={i}>
                  <div style={{ position: "absolute", left: blobLeft, top: 284, width: 139, height: 139 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={blobImg} alt={tag} style={{ width: "100%", height: "100%", display: "block" }} />
                  </div>
                  <div style={{ position: "absolute", left: badgeLeft, top: 268, width: 113, height: 35 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={badgeImg} alt="" style={{ width: "100%", height: "100%", display: "block" }} />
                  </div>
                  <p style={{ position: "absolute", left: textLeft, top: 277, fontSize: 9, fontWeight: 700, color: "white", margin: 0, zIndex: 1, whiteSpace: "nowrap" }}>{tag}</p>
                </React.Fragment>
              ))}

              {/* TOP 10 */}
              <p style={{ position: "absolute", left: 22, top: 465, fontSize: 20, fontWeight: 700, color: "var(--navio-text)", margin: 0 }}>지금 주변 인기 장보 TOP 10</p>
              {TOP_CARDS.map(({ num, tag, title, img, left, top }) => (
                <div key={num} style={{ position: "absolute", left, top, width: 174, height: 226, borderRadius: "var(--navio-radius-md)", overflow: "hidden", boxShadow: "var(--navio-shadow-md)" }}>
                  <Image src={img} alt={title} fill className="object-cover" />
                  <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 90, background: "linear-gradient(to top, rgba(20,18,30,0.72), rgba(20,18,30,0))" }} />
                  <p style={{ position: "absolute", left: 12, top: 10, fontSize: 32, fontWeight: 700, color: "white", margin: 0, lineHeight: 1, textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>{num}</p>
                  <p style={{ position: "absolute", left: 12, top: 60, fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.85)", margin: 0 }}>{tag}</p>
                  <p style={{ position: "absolute", left: 12, bottom: 30, fontSize: 14, fontWeight: 700, color: "white", margin: 0 }}>{title}</p>
                  <p style={{ position: "absolute", left: 12, bottom: 12, fontSize: 8, color: "rgba(255,255,255,0.75)", margin: 0 }}>여기에서 3km</p>
                </div>
              ))}

              {/* 5~10위 더보기 */}
              <div style={{ position: "absolute", left: 20, top: 983, width: 350, height: 52, background: "var(--navio-accent)", borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--navio-shadow-md)" }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "white" }}>5~10위 더보기</span>
              </div>

              {/* 부산 여행 섹션 */}
              <div style={{ position: "absolute", left: 0, top: 1062, width: 393, height: 467, background: "var(--navio-accent-soft)" }} />
              <p style={{ position: "absolute", left: 20, top: 1079, fontSize: 15, fontWeight: 700, color: "var(--navio-text)", margin: 0 }}>부산 여행을 계획 중이라면</p>
              <p style={{ position: "absolute", left: 20, top: 1106, fontSize: 11, color: "var(--navio-text-muted)", margin: 0 }}>kim****님을 위한 AI 추천 장소</p>

              {/* 부산 카드 (가로 스크롤, 스크롤바 숨김) */}
              <div
                className="scrollbar-hide"
                style={{ position: "absolute", left: 0, top: 1136, width: 390, height: 363, overflowX: "auto", overflowY: "hidden", scrollbarWidth: "none" } as React.CSSProperties}
              >
                <div style={{ display: "flex", gap: 12, paddingLeft: 17, paddingRight: 17, width: "max-content", height: "100%" }}>
                  {BUSAN_CARDS.map(({ img, chip, profile, user, title, sub }, i) => (
                    <div key={i} style={{ width: 301, height: 363, background: "var(--navio-surface)", borderRadius: "var(--navio-radius-lg)", flexShrink: 0, position: "relative", overflow: "hidden", boxShadow: "var(--navio-shadow-md)" }}>
                      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 239, overflow: "hidden" }}>
                        <Image src={img} alt={title} fill className="object-cover" />
                        <div className="navio-glass" style={{ position: "absolute", left: 17, top: 13, borderRadius: 999, height: 26, display: "flex", alignItems: "center", paddingLeft: 14, paddingRight: 14 }}>
                          <span style={{ fontSize: 9, fontWeight: 700, color: "var(--navio-text)" }}>{chip}</span>
                        </div>
                      </div>
                      <div style={{ position: "absolute", left: 14, top: 251, width: 27, height: 27, borderRadius: "50%", overflow: "hidden" }}>
                        <Image src={profile} alt={user} fill className="object-cover" />
                      </div>
                      <p style={{ position: "absolute", left: 51, top: 259, fontSize: 10, fontWeight: 700, color: "var(--navio-text)", margin: 0 }}>{user}</p>
                      <p style={{ position: "absolute", left: 14, top: 290, fontSize: 16, fontWeight: 700, color: "var(--navio-text)", margin: 0 }}>{title}</p>
                      <p style={{ position: "absolute", left: 14, top: 335, fontSize: 10, color: "var(--navio-text-muted)", margin: 0 }}>{sub}</p>
                      <button
                        onClick={() => toggleSave(title + i)}
                        style={{
                          position: "absolute", right: 14, bottom: 14, height: 26, padding: "0 12px", border: "none",
                          background: saved.has(title + i) ? "var(--navio-text)" : "var(--navio-accent)",
                          borderRadius: 999, display: "flex", alignItems: "center", gap: 4,
                          boxShadow: "var(--navio-shadow-sm)", cursor: "pointer",
                        }}
                      >
                        <Heart size={11} strokeWidth={ICON_STROKE} color="white" fill={saved.has(title + i) ? "white" : "none"} />
                        <span style={{ fontSize: 10, fontWeight: 700, color: "white" }}>{saved.has(title + i) ? "저장됨" : "저장"}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ────────────────────────────────
              주변 리뷰 콘텐츠
          ──────────────────────────────── */}
          {tab === "review" && (
            <>
              {REVIEWS.map((review, i) => (
                <ReviewCard key={i} {...review} top={REVIEW_TOPS[i]} />
              ))}
            </>
          )}

        </div>
      </div>

      <BottomNav active="explore" />

    </div>
  );
}

export default function ExplorePage() {
  return (
    <IPhoneFrame>
      <ExploreScreen />
    </IPhoneFrame>
  );
}
