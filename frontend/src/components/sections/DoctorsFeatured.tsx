import { Link } from "@tanstack/react-router";
import { HiArrowRight, HiCheckCircle } from "react-icons/hi";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { doctors } from "@/data/doctors";

export function DoctorsFeatured() {
  const doctor = doctors[0]; // Dr. B. Selvakumar
  if (!doctor) return null;

  return (
    <section id="doctor" className="relative py-14 sm:py-16 bg-[#FAFBFD] overflow-hidden">
      {/* Background accents */}
      <div className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-blue-brand/5 blur-3xl" />
      <div className="absolute -left-32 bottom-10 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />

      <div className="container-lux relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column - Stylized Card (4 cols) */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-deep to-[#0C1524] p-1 shadow-2xl">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.9rem] bg-gradient-to-tr from-blue-brand/20 to-navy-deep p-8 flex flex-col justify-between">
                  {/* Experience Badge */}
                  <div className="self-end">
                    <span className="rounded-full bg-blue-brand px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg">
                      {doctor.experience} Experience
                    </span>
                  </div>

                  {/* Initials Accent */}
                  <div className="absolute inset-0 grid place-items-center pointer-events-none opacity-10">
                    <span className="font-display text-[15rem] font-bold text-white select-none">{doctor.initials}</span>
                  </div>

                  {/* Quick Credentials Overlay */}
                  <div className="relative z-10 bg-navy-deep/80 backdrop-blur-md rounded-2xl p-5 border border-white/5 shadow-lg">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-brand">Chief Specialist</p>
                    <h3 className="mt-1 font-display text-2xl font-bold text-white">{doctor.name}</h3>
                    <p className="mt-0.5 text-xs text-white/60">{doctor.qualification}</p>
                    <div className="mt-3 flex gap-2">
                      <span className="rounded-md bg-white/5 border border-white/10 px-2.5 py-1 text-[10px] font-medium text-white/80">Manual Therapy</span>
                      <span className="rounded-md bg-white/5 border border-white/10 px-2.5 py-1 text-[10px] font-medium text-white/80">Sports Rehab</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column - Premium Biography (7 cols) */}
          <div className="lg:col-span-7 lg:pl-6">
            <Reveal delay={0.1}>
              <SectionHeading
                align="left"
                eyebrow="Specialist Doctor Profile"
                title="The clinical expertise guiding your recovery."
                description=""
              />
              
              <div className="mt-6">
                <h3 className="font-display text-2xl font-bold text-ink tracking-tight">
                  {doctor.name} <span className="text-base font-semibold text-blue-brand">({doctor.qualification})</span>
                </h3>
                <p className="mt-1.5 text-sm font-bold uppercase tracking-wider text-blue-brand">
                  {doctor.specialty}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {doctor.bio} He combines advanced sports science protocols with customized rehabilitation algorithms to optimize healing cycles and maximize structural recovery.
                </p>
              </div>

              {/* Core Expertise Checklist */}
              <div className="mt-8 border-t border-blue-brand/5 pt-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-ink mb-4">Rehabilitation & Clinical Expertise</h4>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {doctor.expertise?.map((exp) => (
                    <li key={exp} className="flex items-start gap-2.5 text-sm text-ink/80 font-medium">
                      <HiCheckCircle className="h-5 w-5 text-blue-brand shrink-0 mt-0.5" />
                      <span>{exp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link to="/book-appointment" className="btn-blue btn-blue-hover text-sm px-7 py-3.5 shadow-lg">
                  Schedule Consultation <HiArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/doctors" className="btn-ghost-dark border-ink/10 hover:bg-navy-deep hover:text-white text-ink text-sm px-6 py-3">
                  View Full Profile
                </Link>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
