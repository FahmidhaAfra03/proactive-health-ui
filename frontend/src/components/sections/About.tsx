import { Link } from "@tanstack/react-router";
import { HiArrowRight, HiCheck } from "react-icons/hi";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import premiumClinicStudioImg from "@/assets/premium_clinic_studio.webp";

const highlights = [
  "One-on-one, senior-led care",
  "Evidence-based sports rehab protocols",
  "Private advanced treatment bays",
  "Tailored milestone-based recovery plans",
];

export function About() {
  return (
    <section id="about" className="relative pt-20 pb-8 sm:pt-24 sm:pb-10 bg-gradient-to-b from-[#FAFBFD] to-[#F3F6FA] overflow-hidden">
      {/* Decorative subtle background glows */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-blue-brand/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-lux">
        {/* Main Split: Narrative & Visual */}
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left Side: Premium Studio Photo */}
          <Reveal>
            <div className="relative max-w-md mx-auto lg:max-w-none w-full">
              {/* Background blur aura */}
              <div className="absolute inset-4 bg-gradient-to-tr from-blue-brand/5 to-gold/10 rounded-[2.5rem] blur-3xl opacity-80 -z-10" />
              
              {/* Main Image Frame with sleek shadows */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-white/50 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.12)] bg-white group">
                <img
                  src={premiumClinicStudioImg}
                  alt="ProActive Physiotherapy & Sports Rehab Clinic"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102 select-none pointer-events-none"
                />
                {/* Subtle vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/15 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
            </div>
          </Reveal>

          {/* Right Side: Editorial Heading & Features */}
          <Reveal delay={0.15}>
            <div className="flex flex-col items-start">
              <SectionHeading
                align="left"
                eyebrow="About ProActive"
                title={
                  <>
                    Clinical excellence built on{" "}
                    <span className="gold-gradient-text font-serif italic font-normal">precision</span> and{" "}
                    <span className="gold-gradient-text font-serif italic font-normal">results</span>.
                  </>
                }
                description="We founded ProActive on a simple idea: physiotherapy and sports rehab deserve the highest standard of evidence-based care. Every recovery program is designed and monitored directly by a senior specialist, combining state-of-the-art modalities with hands-on expertise."
              />

              {/* Highlights Grid */}
              <ul className="mt-8 grid gap-3.5 w-full sm:grid-cols-2">
                {highlights.map((h) => (
                  <li 
                    key={h} 
                    className="flex items-center gap-3 rounded-xl border border-black/[0.03] bg-white/60 backdrop-blur-sm p-4 transition-all duration-300 hover:border-blue-brand/20 hover:bg-white hover:shadow-[0_12px_24px_rgba(37,99,235,0.04)]"
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue-brand/10 text-blue-brand">
                      <HiCheck className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm font-semibold text-ink-soft leading-tight">{h}</span>
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-4 w-full sm:w-auto">
                <Link 
                  to="/about" 
                  className="group btn-blue btn-blue-hover text-sm font-semibold py-3.5 px-7 rounded-full shadow-lg hover:shadow-blue-brand/25 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  Our Story <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link 
                  to="/doctors" 
                  className="btn-ghost-dark text-ink border-ink/15 hover:bg-navy-deep hover:text-white hover:border-transparent text-sm font-semibold py-3.5 px-7 rounded-full transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
                >
                  Meet the Doctor
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Premium Dark Stats Banner */}
        <Reveal delay={0.25}>
          <div className="mt-16 sm:mt-20 rounded-[2.5rem] bg-navy-deep p-8 sm:p-12 shadow-luxe border border-blue-brand/10 relative overflow-hidden">
            {/* Ambient background glows inside the card */}
            <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-blue-brand/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
            
            <div className="grid gap-10 sm:grid-cols-3 relative z-10">
              {/* Stat 1 */}
              <div className="relative sm:pr-8 sm:border-r border-white/10 last:border-0 group flex flex-col justify-between">
                <div>
                  <div className="font-display text-4xl sm:text-5xl font-extrabold text-white flex items-baseline justify-center sm:justify-start leading-none transition-colors duration-300 group-hover:text-blue-brand">
                    3<span className="text-blue-brand text-2xl font-sans font-bold ml-0.5">+</span>
                  </div>
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-white/50">Years of Excellence</p>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-white/70 max-w-[260px] mx-auto sm:mx-0">
                  Over 3 years of specialist clinical care restoring mobility and athletic performance.
                </p>
              </div>

              {/* Stat 2 */}
              <div className="relative sm:px-8 sm:border-r border-white/10 last:border-0 group flex flex-col justify-between">
                <div>
                  <div className="font-display text-4xl sm:text-5xl font-extrabold text-white flex items-baseline justify-center sm:justify-start leading-none transition-colors duration-300 group-hover:text-gold">
                    100<span className="text-gold text-2xl font-sans font-bold ml-0.5">%</span>
                  </div>
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-white/50">Success Rate</p>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-white/70 max-w-[260px] mx-auto sm:mx-0">
                  Proven clinical outcomes and high patient satisfaction across all treatments.
                </p>
              </div>

              {/* Stat 3 */}
              <div className="relative sm:pl-8 group flex flex-col justify-between">
                <div>
                  <div className="font-display text-4xl sm:text-5xl font-extrabold text-white flex items-baseline justify-center sm:justify-start leading-none transition-colors duration-300 group-hover:text-blue-brand">
                    MPT<span className="text-gold text-xl font-sans font-bold ml-1.5">(Sports)</span>
                  </div>
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-white/50">Specialist Guidance</p>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-white/70 max-w-[260px] mx-auto sm:mx-0">
                  Under the direct clinical expertise of Dr. B. Selvakumar and senior therapists.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
