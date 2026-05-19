import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import l1 from "@/assets/matterport/property-3.jpg";
import l2 from "@/assets/listing-2.jpg";
import l3 from "@/assets/listing-3.jpg";

export const Route = createFileRoute("/listings")({
  head: () => ({
    meta: [
      { title: "전체 매물 — 로커부동산중개법인" },
      { name: "description", content: "강남·서초·송파의 프라임 빌딩 매물을 한자리에서 확인하세요." },
    ],
  }),
  component: ListingsPage,
});

const LISTINGS = [
  { img: l1, area: "강남구 · 테헤란로", title: "테헤란로 프라임 오피스", price: "₩ 480억", spec: "B4 / 15F · 연 6,200㎡ · 대지 760㎡", type: "프라임 오피스" },
  { img: l2, area: "강남구 · 도산대로", title: "도산대로 코너 빌딩", price: "₩ 320억", spec: "B2 / 8F · 연 3,400㎡ · 대지 420㎡", type: "코너 빌딩" },
  { img: l3, area: "강남구 · 역삼동", title: "역삼 수익형 빌딩", price: "₩ 215억", spec: "B2 / 7F · 연 2,800㎡ · 대지 360㎡", type: "수익형" },
  { img: l1, area: "강남구 · 삼성동", title: "삼성동 사옥형 빌딩", price: "₩ 540억", spec: "B4 / 12F · 연 5,400㎡ · 대지 680㎡", type: "사옥형" },
  { img: l2, area: "서초구 · 서초동", title: "서초 강남대로 빌딩", price: "₩ 260억", spec: "B3 / 9F · 연 3,100㎡ · 대지 410㎡", type: "수익형" },
  { img: l3, area: "송파구 · 잠실동", title: "잠실 메인 빌딩", price: "₩ 410억", spec: "B3 / 11F · 연 4,800㎡ · 대지 590㎡", type: "프라임 오피스" },
];

const FILTERS = ["전체", "프라임 오피스", "사옥형", "수익형", "코너 빌딩"];

function ListingsPage() {
  return (
    <PageShell
      eyebrow="All Listings"
      title={<>엄선된 <span className="italic">전체 매물</span></>}
      intro="로커부동산중개법인이 직접 선별한 강남·서초·송파의 빌딩 매물. 입지, 유형, 가격대별로 자유롭게 탐색해 보세요."
    >
      <div className="flex flex-wrap gap-2 mb-12">
        {FILTERS.map((f, i) => (
          <button
            key={f}
            className={`px-5 py-2 text-xs tracking-[0.2em] uppercase border transition-colors ${
              i === 0
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {LISTINGS.map((l, i) => (
          <Link
            key={i}
            to={i === 0 ? "/listings/teheran-prime-office" : "/listings"}
            className="group block"
          >
            <div className="aspect-[4/5] overflow-hidden bg-muted relative">
              <img src={l.img} alt={l.title} width={1200} height={900} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              <div className="absolute top-4 left-4 bg-background/95 px-3 py-1 text-[10px] tracking-[0.2em] uppercase">
                {l.type}
              </div>
            </div>
            <div className="pt-5">
              <div className="eyebrow text-muted-foreground">{l.area}</div>
              <div className="mt-2 flex items-baseline justify-between gap-4">
                <h3 className="font-display text-2xl">{l.title}</h3>
                <span className="font-bold text-2xl md:text-3xl tracking-tight whitespace-nowrap" style={{ color: "#446fe7" }}>
                  {l.price}
                </span>
              </div>
              <div className="mt-3 border-t border-border pt-3 text-sm text-muted-foreground">{l.spec}</div>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
