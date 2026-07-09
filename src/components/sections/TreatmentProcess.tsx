import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { treatments } from "@/data/treatments";

export function TreatmentProcess() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute inset-0 grain-bg opacity-70" />
      <div className="pointer-events-none absolute -right-32 top-32 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="container-lux relative">
        <Reveal>
          <SectionHeading
            light
            eyebrow="Our Process"
            title="A recovery journey, engineered."
            description="Five clear phases, one dedicated senior therapist and a plan that never leaves outcomes to chance."
          />
        </Reveal>

        <div className="mt-16 grid gap-4 lg:grid-cols-5">
          {treatments.map((t, i) => (
            <Reveal key={t.step} delay={i * 0.08}>
              <div className="group relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:bg-white/[0.06]">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-4xl font-semibold text-gold">{t.step}</span>
                  <span className="h-px w-10 bg-white/20 transition-all group-hover:w-14 group-hover:bg-gold" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold">{t.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{t.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
