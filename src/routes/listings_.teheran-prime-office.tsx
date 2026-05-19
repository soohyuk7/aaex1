import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Check,
  Phone,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Building2,
  Maximize2,
  Calendar,
  Car,
  Snowflake,
  Box,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MatterportEmbed } from "@/components/matterport-embed";
import { cn } from "@/lib/utils";
import agentImg from "@/assets/agent.jpg";

const MATTERPORT_MODEL_ID = "nUTg54PrCCf";

type MediaTab = "photos" | "tour";

const photoModules = import.meta.glob<string>("@/assets/matterport/property-*.jpg", {
  eager: true,
  import: "default",
});

const PHOTOS = Object.entries(photoModules)
  .sort(([a], [b]) => {
    const num = (path: string) => Number(path.match(/property-(\d+)\.jpg$/)?.[1] ?? 0);
    return num(a) - num(b);
  })
  .map(([, url]) => url);

export const Route = createFileRoute("/listings_/teheran-prime-office")({
  head: () => ({
    meta: [
      { title: "테헤란로 프라임 오피스 — 로커부동산중개법인" },
      {
        name: "description",
        content:
          "강남구 테헤란로 프라임 오피스 빌딩. 680억원, 지상17층/지하4층, 연면적 3,616㎡.",
      },
    ],
  }),
  component: DetailPage,
});

const SUMMARY_POINTS = [
  "강남 최고의 입지, 테헤란로 메인 도로변 프라임 오피스",
  "지상 17층 / 지하 4층, 연면적 3,616㎡의 대형 빌딩",
  "2017년 9월 준공, 철근콘크리트 신축급 컨디션",
  "역삼역 도보 7분, 인접 도로너비 60m 코너 입지",
];

const DETAIL_ROWS: { label: string; value: string; icon: React.ReactNode }[] = [
  { label: "매매가", value: "680억원", icon: <Building2 className="h-4 w-4" /> },
  { label: "대지면적", value: "334.1㎡ (101.07평)", icon: <Maximize2 className="h-4 w-4" /> },
  { label: "연면적", value: "3,616.59㎡ (1,093.95평)", icon: <Maximize2 className="h-4 w-4" /> },
  { label: "건축면적 / 건폐율", value: "192.36㎡ / 57.58%", icon: <Building2 className="h-4 w-4" /> },
  { label: "용적률", value: "799.87%", icon: <Building2 className="h-4 w-4" /> },
  { label: "건물규모", value: "지상 17층 / 지하 4층", icon: <Building2 className="h-4 w-4" /> },
  { label: "준공일자", value: "2017년 09월", icon: <Calendar className="h-4 w-4" /> },
  { label: "구조", value: "철근콘크리트조", icon: <Building2 className="h-4 w-4" /> },
  { label: "냉·난방", value: "개별냉방 / 개별난방", icon: <Snowflake className="h-4 w-4" /> },
  { label: "엘리베이터", value: "1대", icon: <Building2 className="h-4 w-4" /> },
  { label: "주차", value: "18대 (기계식)", icon: <Car className="h-4 w-4" /> },
  { label: "도로명", value: "테헤란로, 언주로89길", icon: <MapPin className="h-4 w-4" /> },
  { label: "역과의 거리", value: "역삼역 470m", icon: <MapPin className="h-4 w-4" /> },
  { label: "공시지가 (총)", value: "175.8억원", icon: <Building2 className="h-4 w-4" /> },
];

function DetailPage() {
  const [idx, setIdx] = useState(0);
  const [mediaTab, setMediaTab] = useState<MediaTab>("photos");
  const photoCount = PHOTOS.length;

  useEffect(() => {
    if (mediaTab !== "photos" || photoCount === 0) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % photoCount), 4000);
    return () => clearInterval(t);
  }, [mediaTab, photoCount]);

  const prev = () => setIdx((i) => (i - 1 + photoCount) % photoCount);
  const next = () => setIdx((i) => (i + 1) % photoCount);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="pt-20 pb-16">
        <div className="px-6 lg:px-10 text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
          <Link to="/listings" className="hover:text-foreground">
            전체 매물
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">강남구 · 테헤란로</span>
        </div>

        <div className="relative overflow-hidden bg-muted" style={{ height: "62vh" }}>
          <div
            className="absolute top-4 left-4 z-20 flex rounded-full border border-border/60 bg-background/95 p-1 shadow-md backdrop-blur-sm"
            role="tablist"
            aria-label="매물 미디어"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mediaTab === "photos"}
              onClick={() => setMediaTab("photos")}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-colors",
                mediaTab === "photos"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              사진
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mediaTab === "tour"}
              onClick={() => setMediaTab("tour")}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-colors",
                mediaTab === "tour"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Box className="h-3.5 w-3.5" aria-hidden />
              3D Tour
            </button>
          </div>

          {mediaTab === "tour" ? (
            <MatterportEmbed
              modelId={MATTERPORT_MODEL_ID}
              title="테헤란로 프라임 오피스 3D Tour"
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : photoCount > 0 ? (
            <>
              {PHOTOS.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`테헤란로 프라임 오피스 사진 ${i + 1}`}
                  loading={i === 0 ? "eager" : "lazy"}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                    i === idx ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <button
                onClick={prev}
                aria-label="이전 사진"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground rounded-full h-10 w-10 flex items-center justify-center backdrop-blur transition"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                aria-label="다음 사진"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground rounded-full h-10 w-10 flex items-center justify-center backdrop-blur transition"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 right-4 bg-background/85 px-3 py-1 text-xs tracking-widest backdrop-blur rounded-sm">
                {idx + 1} / {photoCount}
              </div>
              <div className="absolute bottom-4 left-4 flex gap-1.5 max-w-[min(100%,12rem)] overflow-x-auto">
                {PHOTOS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    aria-label={`사진 ${i + 1}`}
                    className={`h-1.5 shrink-0 transition-all ${
                      i === idx ? "w-8 bg-white" : "w-4 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>

        <section className="px-6 lg:px-10 max-w-[1400px] mx-auto mt-10 grid lg:grid-cols-[1fr_360px] gap-10">
          <div>
            <h2 className="font-display text-2xl mb-5">매물 요약</h2>
            <ul className="space-y-3">
              {SUMMARY_POINTS.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed">
                  <span className="flex-shrink-0 mt-1 h-5 w-5 rounded-full bg-foreground text-background flex items-center justify-center">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-foreground">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside>
            <div className="border border-border bg-card p-6 rounded-sm">
              <div className="eyebrow text-muted-foreground mb-4">담당 컨설턴트</div>

              <div className="flex items-center gap-4">
                <img
                  src={agentImg}
                  alt="담당 에이전트 김관준"
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-full object-cover border border-border"
                />
                <div>
                  <div className="font-display text-xl leading-tight">김관준 팀장</div>
                  <div className="text-xs text-muted-foreground mt-1">공인중개사</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">누적거래액 4,000억원+</div>
                </div>
              </div>

              <a
                href="tel:01000000000"
                className="mt-6 flex items-center justify-center gap-2 w-full bg-foreground text-background py-3.5 text-sm tracking-[0.2em] uppercase hover:opacity-90 transition"
              >
                <Phone className="h-4 w-4" />
                010-0000-0000
              </a>

              <div className="mt-6 pt-6 border-t border-border flex justify-between text-xs text-muted-foreground">
                <span>매물번호</span>
                <span className="text-foreground">RK-16852</span>
              </div>
            </div>
          </aside>
        </section>

        <section className="px-6 lg:px-10 max-w-[1400px] mx-auto mt-16">
          <h2 className="font-display text-2xl mb-5">매물 정보</h2>
          <div className="border-t border-border">
            {DETAIL_ROWS.map((r) => (
              <div
                key={r.label}
                className="grid grid-cols-[140px_1fr] gap-4 py-4 border-b border-border text-sm"
              >
                <div className="flex items-center gap-2 text-muted-foreground">
                  {r.icon}
                  <span>{r.label}</span>
                </div>
                <div className="text-foreground">{r.value}</div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-[15px] leading-relaxed text-muted-foreground max-w-3xl">
            테헤란로 메인 도로변에 위치한 프라임 오피스 빌딩으로, 역삼역까지 도보 7분 거리의 우수한
            접근성을 자랑합니다. 지상 17층 / 지하 4층, 연면적 3,616㎡ 규모의 신축급 빌딩으로
            업무시설(사무소)과 1·2종 근린생활시설이 혼재되어 안정적인 임대 수익이 가능합니다.
            기계식 주차 18대, 개별 냉난방, 엘리베이터 1대를 갖춘 사옥 및 임대 투자용으로 적합한
            매물입니다. 상단{" "}
            <strong className="text-foreground font-medium">3D Tour</strong>에서 Matterport 공간을
            직접 둘러볼 수 있습니다.
          </p>

          <Link
            to="/listings"
            className="mt-10 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> 목록으로
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
