import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background mt-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-3xl">
            로커
          </div>
          <div className="mt-2 text-sm text-background/80">로커부동산중개법인</div>
          <p className="mt-6 text-sm text-background/70 leading-relaxed max-w-md">
            서울 강남구 빌딩 매매 전문 중개법인. 강남·서초·송파의 프라임 오피스와
            수익형 빌딩을 신뢰의 기준으로 안내합니다.
          </p>
        </div>
        <div>
          <div className="eyebrow text-background/60 mb-4">탐색</div>
          <ul className="space-y-3 text-sm">
            <li><Link to="/listings" className="hover:text-accent">전체 매물</Link></li>
            <li><Link to="/map" className="hover:text-accent">지도</Link></li>
            <li><Link to="/about" className="hover:text-accent">회사 소개</Link></li>
            <li><Link to="/history" className="hover:text-accent">연혁</Link></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow text-background/60 mb-4">문의</div>
          <ul className="space-y-3 text-sm text-background/80">
            <li>서울특별시 강남구  1557</li>
            <li>+82 2 0000 0000</li>
            <li>contact@rocker.co.kr</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-background/50">
          <div>© {new Date().getFullYear()} ROCKER Real Estate. All rights reserved.</div>
          <div className="tracking-[0.2em] uppercase">Gangnam · Seocho · Songpa</div>
        </div>
      </div>
    </footer>
  );
}