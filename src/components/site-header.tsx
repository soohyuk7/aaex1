import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/listings", label: "전체 매물" },
  { to: "/map", label: "지도" },
  { to: "/contact", label: "상담 문의" },
  { to: "/about", label: "회사 소개" },
  { to: "/history", label: "연혁" },
] as const;

export function SiteHeader({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !transparent || scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-background/95 backdrop-blur border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span
            className={`font-display text-2xl tracking-tight ${
              solid ? "text-foreground" : "text-white"
            }`}
          >
            로커
          </span>
          <span
            className={`eyebrow hidden sm:block border-l pl-3 ${
              solid ? "text-muted-foreground border-border" : "text-white/80 border-white/20"
            }`}
          >
            강남 빌딩 매매
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`text-sm tracking-wide transition-colors hover:text-accent ${
                solid ? "text-foreground" : "text-white"
              }`}
              activeProps={{ className: "text-accent" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden lg:inline-flex items-center justify-center bg-accent text-accent-foreground px-5 py-2.5 text-xs tracking-[0.2em] uppercase hover:bg-foreground transition-colors"
        >
          상담 신청
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className={`lg:hidden ${solid ? "text-foreground" : "text-white"}`}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-t border-border">
          <div className="px-6 py-6 flex flex-col gap-4">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-foreground text-base"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}