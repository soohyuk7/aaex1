import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "상담 문의 — 로커부동산중개법인" },
      { name: "description", content: "로커의 전담 빌딩 컨설턴트와 1:1 상담을 신청하세요." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <PageShell
      eyebrow="Consultation"
      title={<>맞춤 <span className="italic">상담을 신청</span>하세요</>}
      intro="매도/매수, 희망 입지, 예산 — 무엇이든 편히 알려주세요. 전담 컨설턴트가 24시간 이내에 답변드립니다."
    >
      <div className="grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5 space-y-10">
          <div>
            <div className="eyebrow text-muted-foreground mb-3">본사</div>
            <div className="font-display text-2xl leading-snug">
              서울특별시 강남구 1557
            </div>
          </div>
          <div>
            <div className="eyebrow text-muted-foreground mb-3">연락처</div>
            <div className="space-y-1 text-foreground">
              <div>+82 2 0000 0000</div>
              <div>contact@rocker.co.kr</div>
            </div>
          </div>
          <div>
            <div className="eyebrow text-muted-foreground mb-3">상담 시간</div>
            <div className="space-y-1 text-muted-foreground">
              <div>월–금  10:00 — 19:00</div>
              <div>토  11:00 — 17:00</div>
              <div>일  예약제</div>
            </div>
          </div>
        </div>

        <form
          className="lg:col-span-7 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          {sent ? (
            <div className="border border-foreground p-10 text-center">
              <div className="font-display text-3xl">감사합니다</div>
              <p className="mt-3 text-muted-foreground">상담 요청이 접수되었습니다. 곧 연락드리겠습니다.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                <Field label="이름" name="name" required />
                <Field label="연락처" name="phone" required />
              </div>
              <Field label="이메일" name="email" type="email" required />
              <div>
                <label className="eyebrow text-muted-foreground block mb-2">관심 지역 / 유형</label>
                <select className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-foreground">
                  <option>강남구 — 테헤란로 / 도산대로 / 역삼</option>
                  <option>서초구 — 강남대로 / 서초대로</option>
                  <option>송파구 — 잠실 / 문정</option>
                  <option>기타</option>
                </select>
              </div>
              <div>
                <label className="eyebrow text-muted-foreground block mb-2">문의 내용</label>
                <textarea rows={5} className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-foreground resize-none" />
              </div>
              <button
                type="submit"
                className="bg-foreground text-background px-8 py-4 text-xs tracking-[0.25em] uppercase hover:bg-accent transition-colors"
              >
                상담 신청 보내기
              </button>
            </>
          )}
        </form>
      </div>
    </PageShell>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="eyebrow text-muted-foreground block mb-2">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-foreground"
      />
    </div>
  );
}