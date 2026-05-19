import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import hero from "@/assets/hero.jpg";
import l1 from "@/assets/matterport/property-3.jpg";
import l2 from "@/assets/listing-2.jpg";
import l3 from "@/assets/listing-3.jpg";
import about from "@/assets/about.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "로커부동산중개법인 — 서울 강남 빌딩 매매 전문" },
      { name: "description", content: "강남·서초·송파 프라임 오피스 및 수익형 빌딩 매매 전문 중개법인." },
      { property: "og:title", content: "로커부동산중개법인" },
      { property: "og:description", content: "서울 강남구 빌딩 매매 전문." },
    ],
  }),
  component: Index,
});

const FEATURED = [
  { img: l1, area: "강남구 · 테헤란로", title: "테헤란로 프라임 오피스", price: "480억", spec: "지하 4 / 지상 15층 · 연면적 6,200㎡" },
  { img: l2, area: "강남구 · 도산대로", title: "도산대로 코너 빌딩", price: "210억", spec: "지하 2 / 지상 8층 · 연면적 3,400㎡" },
  { img: l3, area: "강남구 · 역삼동", title: "역삼 수익형 빌딩", price: "150억", spec: "지하 2 / 지상 7층 · 연면적 2,800㎡" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader transparent />

      {/* HERO */}
      <section className="relative h-screen min-h-[680px] w-full overflow-hidden">
        <img
          src={hero}
          alt="Luxury Korean villa overlooking ocean"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
        <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-6 lg:px-10 max-w-[1400px] mx-auto text-white">
          <div className="eyebrow text-white/80 mb-6">서울 강남구 빌딩 매매 전문</div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] max-w-4xl">
            강남의 <span className="italic font-normal">가치 있는 빌딩</span>,<br />
            로커가 함께합니다
          </h1>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/listings"
              className="group inline-flex items-center gap-3 bg-white text-foreground px-7 py-4 text-xs tracking-[0.25em] uppercase hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              빌딩 매물 보기
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 border border-white/60 text-white px-7 py-4 text-xs tracking-[0.25em] uppercase hover:bg-white hover:text-foreground transition-colors"
            >
              상담 신청
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-28 px-6 lg:px-10 max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4">
            <div className="eyebrow text-muted-foreground">About</div>
            <h2 className="font-display text-4xl md:text-5xl mt-4 leading-tight">
              빌딩이 아닌,<br />
              <span className="italic">자산의 미래</span>를 설계합니다
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 text-lg leading-relaxed text-muted-foreground">
            로커부동산중개법인은 서울 강남구를 중심으로 프라임 오피스와 수익형 빌딩의
            매매·매입을 전담하는 중개법인입니다. 강남·서초·송파의 입지, 임대 수익률,
            개발 잠재력을 입체적으로 분석해 자산의 가치를 정확히 평가합니다.
            <Link to="/about" className="block mt-8 text-foreground text-sm tracking-[0.2em] uppercase border-b border-foreground pb-1 w-fit hover:text-accent hover:border-accent transition-colors">
              회사 소개 보기 →
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="px-6 lg:px-10 max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between border-b border-border pb-6 mb-12">
          <div>
            <div className="eyebrow text-muted-foreground">Featured</div>
            <h2 className="font-display text-4xl md:text-5xl mt-3">엄선된 매물</h2>
          </div>
          <Link to="/listings" className="hidden sm:inline-flex items-center gap-2 text-sm text-foreground hover:text-accent">
            전체 보기 <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {FEATURED.map((f) => (
            <Link key={f.title} to="/listings" className="group block">
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={f.img}
                  alt={f.title}
                  width={1200}
                  height={900}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
              </div>
              <div className="pt-5">
                <div className="eyebrow text-muted-foreground">{f.area}</div>
                <div className="mt-2 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl">{f.title}</h3>
                  <span className="font-bold text-2xl md:text-3xl tracking-tight whitespace-nowrap" style={{ color: "#446fe7" }}>
                    @@@억
                  </span>
                </div>
                <div className="mt-3 text-sm text-muted-foreground">{f.spec}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA SPLIT */}
      <section className="mt-32 grid md:grid-cols-2">
        <div className="relative aspect-[4/3] md:aspect-auto">
          <img src={about} alt="Luxury interior" loading="lazy" width={1600} height={1000} className="h-full w-full object-cover" />
        </div>
        <div className="bg-foreground text-background flex items-center px-10 lg:px-20 py-20">
          <div>
            <div className="eyebrow text-background/60">Private Consultation</div>
            <h2 className="font-display text-4xl md:text-5xl mt-4 leading-tight">
              비공개 빌딩 매물<br /><span className="italic">전담 상담</span>
            </h2>
            <p className="mt-6 text-background/70 leading-relaxed max-w-md">
              매물·임차 분석·세무·금융 자문까지. 로커의 전담 컨설턴트가
              매도·매수 양측 입장을 깊이 이해하며 1:1로 응대합니다.
            </p>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-3 bg-accent text-accent-foreground px-7 py-4 text-xs tracking-[0.25em] uppercase hover:bg-background hover:text-foreground transition-colors"
            >
              상담 예약하기 <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
