export default function IPhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="relative" style={{ width: 418, height: 872 }}>
        {/* 외부 케이스 */}
        <div className="absolute inset-0 rounded-[55px] bg-[#1a1a1a] shadow-2xl" />
        {/* 측면 버튼 */}
        <div className="absolute bg-[#3a3a3a] rounded-l-sm" style={{ left: -3, top: 160, width: 3, height: 36 }} />
        <div className="absolute bg-[#3a3a3a] rounded-l-sm" style={{ left: -3, top: 210, width: 3, height: 64 }} />
        <div className="absolute bg-[#3a3a3a] rounded-l-sm" style={{ left: -3, top: 284, width: 3, height: 64 }} />
        <div className="absolute bg-[#3a3a3a] rounded-r-sm" style={{ right: -3, top: 210, width: 3, height: 80 }} />
        {/* 내부 베젤 */}
        <div className="absolute rounded-[52px] bg-black overflow-hidden" style={{ inset: 4 }}>
          {/* 유리 + 화면 */}
          <div className="absolute rounded-[44px] overflow-hidden bg-white" style={{ inset: 10 }}>
            {/* 다이나믹 아일랜드 */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[120px] h-[34px] bg-black rounded-full z-10" />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
