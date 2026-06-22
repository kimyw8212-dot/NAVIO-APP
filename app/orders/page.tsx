import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import IPhoneFrame from "../components/IPhoneFrame";
import { ICON_STROKE } from "../components/BottomNav";

const ORDERS = [
  { img: "/card1.png", store: "이재모 피자 부산점", item: "고르곤졸라 피자 외 1개", date: "2026.06.20", price: "32,000원", status: "수령 완료" },
  { img: "/card2.png", store: "심플픽 카페", item: "아이스 아메리카노 2", date: "2026.06.18", price: "9,000원", status: "수령 완료" },
  { img: "/card3.png", store: "스타필드 수원 푸드코트", item: "돈카츠 정식", date: "2026.06.11", price: "13,500원", status: "수령 완료" },
];

export default function OrdersPage() {
  return (
    <IPhoneFrame>
      <div className="relative overflow-hidden" style={{ width: 390, height: 844, background: "var(--navio-bg)" }}>
        {/* 헤더 */}
        <div className="absolute flex items-center" style={{ left: 0, top: 47, width: 390, height: 36 }}>
          <Link href="/mypage" className="flex items-center justify-center" style={{ left: 20, position: "absolute", width: 36, height: 36, borderRadius: "50%", background: "var(--navio-surface)", boxShadow: "var(--navio-shadow-sm)" }}>
            <ChevronLeft size={20} strokeWidth={ICON_STROKE} color="var(--navio-text)" />
          </Link>
          <p className="text-center w-full text-[16px] font-bold m-0" style={{ color: "var(--navio-text)" }}>주문내역</p>
        </div>

        {/* 리스트 */}
        <div className="absolute" style={{ left: 20, top: 110, width: 350 }}>
          <div className="flex flex-col gap-[14px]">
            {ORDERS.map((order) => (
              <div
                key={order.store + order.date}
                style={{ background: "var(--navio-surface)", borderRadius: "var(--navio-radius-md)", boxShadow: "var(--navio-shadow-sm)", padding: 16 }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
                  <span className="text-[11px]" style={{ color: "var(--navio-text-faint)" }}>{order.date}</span>
                  <span
                    className="text-[11px] font-semibold"
                    style={{ color: "var(--navio-accent-strong)", background: "var(--navio-accent-soft)", padding: "3px 10px", borderRadius: 999 }}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center gap-[14px]">
                  <div className="relative flex-shrink-0 overflow-hidden" style={{ width: 56, height: 56, borderRadius: "var(--navio-radius-sm)" }}>
                    <Image src={order.img} alt={order.store} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-bold m-0" style={{ color: "var(--navio-text)" }}>{order.store}</p>
                    <p className="text-[12px] mt-[3px] mb-0" style={{ color: "var(--navio-text-muted)" }}>{order.item}</p>
                  </div>
                  <p className="text-[14px] font-bold m-0" style={{ color: "var(--navio-text)" }}>{order.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </IPhoneFrame>
  );
}
