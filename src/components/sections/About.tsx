import { Link } from "@tanstack/react-router";
import { HiArrowRight, HiCheck } from "react-icons/hi";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

const highlights = [
  "One-on-one, appointment-only care",
  "Evidence-based, outcome-tracked plans",
  "Private treatment suites",
  "Senior therapist on every case",
];

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container-lux grid gap-14 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="relative">
            <div className="grid grid-cols-6 grid-rows-6 gap-3">
              <div className="col-span-4 row-span-4 rounded-3xl bg-gradient-to-br from-[#F4E7B8] via-[#E7C766] to-[#B08A24] p-8 shadow-luxe">
                <p className="font-display text-6xl font-semibold text-ink">15+</p>
                <p className="mt-2 text-sm font-medium uppercase tracking-widest text-ink/70">Years of care</p>
                <div className="mt-8 h-px w-full bg-ink/20" />
                <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink/80">
                  A decade and a half of restoring movement, dignity and confidence — one recovery at a time.
                </p>
              </div>
              <div className="col-span-2 row-span-2 rounded-3xl bg-ink p-5 text-white">
                <p className="font-display text-3xl font-semibold text-gold">98%</p>
                <p className="mt-1 text-[11px] uppercase tracking-widest text-white/60">Success</p>
              </div>
              <div className="col-span-2 row-span-2 rounded-3xl border border-black/5 bg-muted p-5">
                <p className="font-display text-3xl font-semibold text-ink">24</p>
                <p className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">Experts</p>
              </div>
              <div className="col-span-6 row-span-2 rounded-3xl border border-black/5 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(17,17,17,0.25)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-gold-deep">Accreditations</p>
                    <p className="mt-1 font-display text-lg font-semibold text-ink">NABH · ISO 9001 · WCPT</p>
                  </div>
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-gold">
                    <span className="font-display text-lg font-bold">P+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <SectionHeading
            align="left"
            eyebrow="About Proactive"
            title="A clinic built on precision, dignity and results."
            description="We founded Proactive on a simple idea: physiotherapy deserves the standard of care usually reserved for concierge medicine. Every plan is built by a senior therapist, every session is one-on-one, and every outcome is measured."
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 rounded-2xl border border-black/5 bg-muted/60 p-4">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-ink">
                  <HiCheck className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-medium text-ink">{h}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/about" className="btn-gold btn-gold-hover">Our Story <HiArrowRight /></Link>
            <Link to="/doctors" className="btn-ghost-dark text-ink hover:bg-ink hover:text-white">Meet the Team</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
