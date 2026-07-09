import { Reveal } from "../Reveal";
import { CountUp } from "../CountUp";

const stats = [
  { end: 30000, suffix: "+", label: "Successful recoveries" },
  { end: 15, suffix: " yrs", label: "Of clinical excellence" },
  { end: 24, suffix: "", label: "Certified therapists" },
  { end: 98, suffix: "%", label: "Patient success rate" },
];

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F4E7B8] via-[#E7C766] to-[#B08A24] py-20">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,rgba(17,17,17,0.4)_1px,transparent_0)] [background-size:22px_22px]" />
      <div className="container-lux relative">
        <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div>
                <p className="font-display text-5xl font-semibold text-ink sm:text-6xl">
                  <CountUp end={s.end} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-ink/70">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
