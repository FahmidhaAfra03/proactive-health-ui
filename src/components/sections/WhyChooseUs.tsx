import { HiSparkles, HiUsers, HiClock, HiShieldCheck, HiHeart, HiChip } from "react-icons/hi";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

const reasons = [
  { Icon: HiSparkles, title: "Senior-led care", desc: "Every case is planned and reviewed by a senior therapist — no juniors, no shortcuts." },
  { Icon: HiUsers, title: "One-on-one sessions", desc: "Our therapists never double-book. Your session belongs to you, completely." },
  { Icon: HiChip, title: "Evidence-based methods", desc: "We combine the latest research with real-world experience for measurable outcomes." },
  { Icon: HiClock, title: "Faster recovery", desc: "Structured, milestone-driven programs get you moving weeks sooner than average." },
  { Icon: HiShieldCheck, title: "Safe & sterile", desc: "NABH-aligned protocols, private suites and single-use consumables — always." },
  { Icon: HiHeart, title: "Care that lasts", desc: "We don't discharge you until you have the strength and habits to stay well." },
];

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-muted py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
      <div className="container-lux relative">
        <Reveal>
          <SectionHeading
            eyebrow="Why Proactive"
            title="The details that change everything."
            description="Six commitments that separate a good physio visit from a life-changing recovery journey."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.05}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-black/5 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-luxe">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold/10 blur-2xl transition-opacity duration-500 group-hover:bg-gold/25" />
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-ink text-gold transition-transform duration-500 group-hover:rotate-6">
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
