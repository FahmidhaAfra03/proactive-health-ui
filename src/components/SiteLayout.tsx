import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { BackToTop } from "./BackToTop";
import { LoadingScreen } from "./LoadingScreen";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <LoadingScreen />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export function PageHeader({
  eyebrow, title, description,
}: { eyebrow?: string; title: string; description?: string }) {
  return (
    <section className="relative overflow-hidden bg-ink pt-40 pb-24 text-white">
      <div className="pointer-events-none absolute inset-0 grain-bg opacity-80" />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-gold/15 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="container-lux relative text-center">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {eyebrow}
          </span>
        )}
        <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] text-balance sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg text-balance">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
