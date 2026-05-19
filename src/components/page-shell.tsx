import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="pt-40 pb-16 px-6 lg:px-10 max-w-[1400px] mx-auto border-b border-border">
        <div className="eyebrow text-muted-foreground">{eyebrow}</div>
        <h1 className="font-display text-5xl md:text-7xl mt-5 leading-[1.05] max-w-4xl">{title}</h1>
        {intro && (
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">{intro}</p>
        )}
      </section>
      <main className="px-6 lg:px-10 max-w-[1400px] mx-auto py-20">{children}</main>
      <SiteFooter />
    </div>
  );
}