"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Send, Map } from "lucide-react";
import IPhoneFrame from "../components/IPhoneFrame";
import BottomNav, { ICON_STROKE } from "../components/BottomNav";

type Role = "user" | "model";
type Message = { role: Role; text: string };

const SUGGESTIONS = ["성수동 데이트 코스 짜줘", "부산 2박3일 여행 계획 짜줘", "제주도 숨은 명소 알려줘"];
const ROUTE_KEYWORDS = ["코스", "일정", "계획", "루트", "경로"];

function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", text: text.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const history = next.slice(0, -1).map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim(), history }),
      });

      const data = await res.json();
      if (data.text) {
        setMessages((prev) => [...prev, { role: "model", text: data.text }]);
      } else {
        setMessages((prev) => [...prev, { role: "model", text: `오류: ${data.error ?? "알 수 없는 오류"}` }]);
      }
    } catch (e) {
      setMessages((prev) => [...prev, { role: "model", text: `네트워크 오류: ${e instanceof Error ? e.message : String(e)}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: 390, height: 844, position: "relative", background: "var(--navio-bg)", overflow: "hidden" }}>

      {/* ── 헤더 ── */}
      <div className="navio-glass" style={{ position: "absolute", left: 0, top: 0, width: 390, height: 110, borderBottom: "1px solid var(--navio-border)", zIndex: 10 }}>
        <div style={{ position: "absolute", left: 20, top: 58, width: 124, height: 28 }}>
          <Image src="/logo2.png" alt="NAVIO" fill className="object-contain" />
        </div>
        <div style={{
          position: "absolute", right: 20, top: 56,
          background: "var(--navio-accent-soft)",
          borderRadius: 999, padding: "5px 13px",
          display: "flex", alignItems: "center", gap: 6,
          boxShadow: "var(--navio-shadow-sm)",
        }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--navio-accent)" }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--navio-accent-strong)" }}>AI 채팅</span>
        </div>
        <p style={{ position: "absolute", left: 20, top: 90, fontSize: 11, color: "var(--navio-text-muted)", margin: 0 }}>
          여행에 대해 무엇이든 물어보세요
        </p>
      </div>

      {/* ── 메시지 영역 ── */}
      <div
        className="scrollbar-hide"
        style={{ position: "absolute", top: 110, left: 0, right: 0, bottom: 150, overflowY: "auto", padding: "16px 16px 0" }}
      >
        {/* 빈 상태 */}
        {messages.length === 0 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 48 }}>
            <div className="relative" style={{ width: 84, height: 84, marginBottom: 18 }}>
              <Image src="/캐릭터.png" alt="NAVIO" fill className="object-contain" />
            </div>
            <p style={{ fontSize: 17, fontWeight: 700, color: "var(--navio-text)", margin: "0 0 6px", textAlign: "center" }}>NAVIO AI 여행 도우미</p>
            <p style={{ fontSize: 12, color: "var(--navio-text-muted)", margin: "0 0 28px", textAlign: "center", lineHeight: 1.6 }}>여행 계획, 맛집, 관광지 추천 등{"\n"}무엇이든 물어보세요!</p>

            {/* 추천 질문 */}
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  style={{
                    width: "100%", padding: "14px 18px", background: "var(--navio-surface)",
                    border: "none", borderRadius: "var(--navio-radius-md)", boxShadow: "var(--navio-shadow-sm)",
                    textAlign: "left", fontSize: 13, color: "var(--navio-text)",
                    cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
                  }}
                >
                  <span style={{ color: "var(--navio-accent)", fontSize: 15 }}>💬</span>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 메시지 목록 */}
        {messages.map((msg, i) => {
          const isRoutePlan =
            msg.role === "model" &&
            i > 0 &&
            messages[i - 1].role === "user" &&
            ROUTE_KEYWORDS.some((k) => messages[i - 1].text.includes(k));

          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start", marginBottom: 12 }}>
              {msg.role === "model" && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--navio-accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 12 }}>✨</span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "var(--navio-accent-strong)" }}>NAVIO AI</span>
                </div>
              )}
              <div style={{
                maxWidth: "80%",
                padding: "12px 16px",
                borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                background: msg.role === "user" ? "var(--navio-accent-strong)" : "var(--navio-surface)",
                boxShadow: "var(--navio-shadow-sm)",
              }}>
                <p style={{
                  fontSize: 13, margin: 0, lineHeight: 1.6,
                  color: msg.role === "user" ? "white" : "var(--navio-text)",
                  whiteSpace: "pre-wrap", wordBreak: "break-word",
                }}>{msg.text}</p>
              </div>

              {isRoutePlan && (
                <Link
                  href="/route"
                  className="flex items-center gap-[6px] mt-[8px]"
                  style={{ background: "var(--navio-accent)", padding: "9px 16px", borderRadius: 999, boxShadow: "var(--navio-shadow-sm)" }}
                >
                  <Map size={15} strokeWidth={ICON_STROKE} color="white" />
                  <span className="text-[12px] font-semibold text-white">지도에서 경로 보기</span>
                </Link>
              )}
            </div>
          );
        })}

        {/* 로딩 (타이핑 인디케이터) */}
        {loading && (
          <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--navio-accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 12 }}>✨</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--navio-accent-strong)" }}>NAVIO AI</span>
              </div>
              <div style={{ padding: "12px 18px", background: "var(--navio-surface)", borderRadius: "18px 18px 18px 4px", boxShadow: "var(--navio-shadow-sm)", display: "flex", gap: 5, alignItems: "center" }}>
                {[0, 1, 2].map((j) => (
                  <div
                    key={j}
                    style={{
                      width: 7, height: 7, borderRadius: "50%", background: "var(--navio-accent)",
                      animation: `bounce 1.2s ease-in-out ${j * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* ── 입력창 ── */}
      <div className="navio-glass" style={{
        position: "absolute", left: 0, bottom: 82, width: 390, height: 68,
        borderTop: "1px solid var(--navio-border)",
        display: "flex", alignItems: "center", padding: "0 16px", gap: 10,
      }}>
        <div style={{ flex: 1, background: "var(--navio-divider)", borderRadius: 999, height: 46, display: "flex", alignItems: "center", paddingLeft: 18, paddingRight: 8 }}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send(input))}
            placeholder="메시지를 입력하세요..."
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 13, color: "var(--navio-text)" }}
          />
        </div>
        <button
          onClick={() => send(input)}
          disabled={!input.trim() || loading}
          style={{
            width: 46, height: 46, borderRadius: "50%",
            background: input.trim() && !loading ? "var(--navio-accent)" : "var(--navio-accent-line)",
            border: "none", cursor: input.trim() && !loading ? "pointer" : "default",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s", boxShadow: "var(--navio-shadow-sm)",
            flexShrink: 0,
          }}
        >
          <Send size={18} strokeWidth={ICON_STROKE} color="white" />
        </button>
      </div>

      <BottomNav active="chat" />

      {/* 타이핑 애니메이션 */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function ChatPage() {
  return (
    <IPhoneFrame>
      <ChatScreen />
    </IPhoneFrame>
  );
}
