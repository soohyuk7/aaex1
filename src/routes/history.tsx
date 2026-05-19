import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "연혁 — 로커부동산중개법인" },
      { name: "description", content: "로커부동산중개법인이 걸어온 길. 2005년 설립부터 현재까지의 주요 발자취." },
    ],
  }),
  component: HistoryPage,
});

const EVENTS = [
  { year: "2025", items: ["강남 빌딩 매매 누적 320건 돌파", "송파 거점 신설"] },
  { year: "2019", items: ["연간 거래 누적 1조 2,000억 원 달성", "프라임 오피스 전담팀 출범"] },
  { year: "2019", items: ["서초 사옥 매매 전담 본부 신설", "비공개 매물 네트워크 100건 돌파"] },
  { year: "2016", items: ["강남 빌딩 시세 리포트 발간", "기관 투자 자문 서비스 시작"] },
  { year: "2012", items: ["강남 본사 확장 (테헤란로)", "전담 컨설턴트 팀 18명 확장"] },
  { year: "2005", items: ["로커부동산중개법인 설립", "강남구 역삼동 첫 빌딩 매매 성사"] },
];

function HistoryPage() {
  return (
    <PageShell
      eyebrow="History"
      title={<>로커가 <span className="italic">걸어온 길</span></>}
      intro="2005년 강남의 작은 사무실에서 시작된 로커는, 오늘날 강남 빌딩 매매를 대표하는 중개법인으로 성장했습니다."
    >
      <div className="relative">
        <div className="absolute left-[120px] md:left-[180px] top-0 bottom-0 w-px bg-border" />
        <div className="space-y-20">
          {EVENTS.map((e) => (
            <div key={e.year} className="grid grid-cols-[120px_1fr] md:grid-cols-[180px_1fr] gap-8 relative">
              <div className="font-display text-4xl md:text-5xl italic text-foreground">{e.year}</div>
              <div className="relative pl-10">
                <div className="absolute left-0 top-3 w-3 h-3 -translate-x-[7px] rounded-full bg-accent" />
                <ul className="space-y-3">
                  {e.items.map((it) => (
                    <li key={it} className="text-lg text-foreground leading-relaxed">{it}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}