import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import about from "@/assets/about.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "회사 소개 — 로커부동산중개법인" },
      { name: "description", content: "로커부동산중개법인은 서울 강남 빌딩 매매 전문 중개법인입니다." },
      { property: "og:title", content: "회사 소개 — 로커부동산중개법인" },
      { property: "og:image", content: about },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { n: "01", t: "신뢰", d: "20년 이상 강남 빌딩 시장을 다뤄온 전담 컨설턴트가 거래의 처음부터 끝까지 책임집니다." },
  { n: "02", t: "안목", d: "임대 수익률, 입지, 개발 잠재력을 입체적으로 평가해 진정한 가치를 가진 빌딩만을 선별합니다." },
  { n: "03", t: "프라이버시", d: "비공개 매물 네트워크와 정중한 응대로 매도·매수인의 정보를 철저히 보호합니다." },
];

function AboutPage() {
  return (
    <PageShell
      eyebrow="About Us"
      title={<>강남의 <span className="italic">입지</span>를<br />자산의 <span className="italic">가치</span>로</>}
      intro="로커부동산중개법인은 서울 강남구를 중심으로 프라임 오피스와 수익형 빌딩의 매매를 전담하는 중개법인입니다."
    >
      <div className="grid lg:grid-cols-12 gap-12 items-center mb-32">
        <div className="lg:col-span-7">
          <img src={about} alt="Luxury interior" width={1600} height={1000} loading="lazy" className="w-full h-auto object-cover" />
        </div>
        <div className="lg:col-span-5">
          <div className="eyebrow text-muted-foreground">Philosophy</div>
          <h2 className="font-display text-3xl md:text-4xl mt-4 leading-snug">
            빌딩은 결국 <span className="italic">자산의 이야기</span>가 됩니다
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            로커는 빌딩을 단순한 거래 대상이 아닌 장기 자산으로 바라봅니다.
            임대 구조, 입지, 향후 개발 잠재력을 종합 분석해 매도·매수 양측에 최적의 거래를 설계합니다.
            테헤란로 프라임 오피스부터 신사·논현의 코너 빌딩까지 —
            각 자산에 담긴 가치를 가장 정확히 전합니다.
          </p>
        </div>
      </div>

      <div className="border-t border-border pt-16">
        <div className="eyebrow text-muted-foreground mb-12">Values</div>
        <div className="grid md:grid-cols-3 gap-10">
          {VALUES.map((v) => (
            <div key={v.n} className="border-t border-foreground pt-6">
              <div className="font-display text-muted-foreground">{v.n}</div>
              <div className="font-display text-3xl mt-3">{v.t}</div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-8 mt-32 border-y border-border py-16">
        {[
          ["320+", "강남 빌딩 거래"],
          ["20년", "강남 시장 경험"],
          ["3구 전문", "강남 · 서초 · 송파"],
          ["1:1", "전담 컨설팅"],
        ].map(([k, v]) => (
          <div key={k}>
            <div className="font-display text-4xl md:text-5xl">{k}</div>
            <div className="eyebrow text-muted-foreground mt-3">{v}</div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}