import Link from "next/link";
import { Home, MapPin, MessageCircle, CalendarDays, CircleUser } from "lucide-react";

export const ICON_STROKE = 1.75;

const ITEMS = [
  { id: "home", Icon: Home, alt: "홈", href: "/home" },
  { id: "explore", Icon: MapPin, alt: "위치", href: "/explore" },
  { id: "chat", Icon: MessageCircle, alt: "채팅", href: "/chat" },
  { id: "schedule", Icon: CalendarDays, alt: "일정", href: "/schedule" },
  { id: "mypage", Icon: CircleUser, alt: "프로필", href: "/mypage" },
];

export default function BottomNav({ active }: { active: string }) {
  return (
    <>
      <div
        className="absolute"
        style={{ left: 0, top: 762, width: 390, height: 62, background: "var(--navio-surface)", borderTop: "1px solid var(--navio-border)", zIndex: 20 }}
      >
        <div className="flex items-center justify-between h-full px-[20px]">
          {ITEMS.map(({ id, Icon, alt, href }) => {
            const isActive = id === active;
            return (
              <Link key={id} href={href} className="relative flex items-center justify-center" style={{ width: 44, height: 44 }}>
                {isActive && (
                  <div className="absolute rounded-full" style={{ inset: 0, background: "var(--navio-accent-soft)" }} />
                )}
                <Icon
                  size={22}
                  strokeWidth={ICON_STROKE}
                  color={isActive ? "var(--navio-accent-strong)" : "var(--navio-text)"}
                  style={{ position: "relative" }}
                  aria-label={alt}
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="absolute bg-white" style={{ left: 0, top: 824, width: 390, height: 20, zIndex: 20 }} />
    </>
  );
}
