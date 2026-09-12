import { HiSparkles, HiUsers, HiClock, HiShieldCheck, HiHeart, HiChip } from "react-icons/hi";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

const reasons = [
  { Icon: HiSparkles, title: "Specialist-Led Care", desc: "Every case is planned and reviewed directly by Dr. B. Selvakumar — no juniors, no shortcuts." },
  { Icon: HiUsers, title: "One-on-One Sessions", desc: "We never double-book. Your session belongs to you completely, ensuring focused, clinical care." },
  { Icon: HiChip, title: "Evidence-Based Methods", desc: "We combine the latest sports science research with clinical experience for measurable outcomes." },
  { Icon: HiClock, title: "Faster Recovery", desc: "Structured, milestone-driven programs get you moving weeks sooner than standard therapy." },
  { Icon: HiShieldCheck, title: "Clinical Standards", desc: "Medical-grade sanitation protocols, private treatment suites, and single-use consumables." },
  { Icon: HiHeart, title: "Recovery That Lasts", desc: "We don't discharge you until you have the strength, stability, and habits to stay healthy." },
];

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-muted pt-10 pb-14 sm:pt-12 sm:pb-16 border-y border-black/5">
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-blue-brand/10 blur-3xl" />
      <div className="container-lux relative">
        <Reveal>
          <SectionHeading
            eyebrow="Why ProActive"
            title="The details that change everything."
            description="Six clinical commitments that separate a standard physio session from a life-changing recovery journey."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.05}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-blue-brand/5 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-brand/35 hover:shadow-blue">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-brand/5 blur-2xl transition-opacity duration-500 group-hover:bg-blue-brand/15" />
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-blue-brand/5 text-blue-brand border border-blue-brand/10 transition-colors duration-500 group-hover:bg-blue-brand group-hover:text-white shadow-sm">
                  <r.Icon className="h-6 w-6" />
                </span>
                <h3 className="relative mt-6 font-display text-xl font-semibold text-ink">{r.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
