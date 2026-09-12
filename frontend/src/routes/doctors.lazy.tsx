import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { getDoctors } from "@/lib/api";
import { HiCheckCircle, HiAcademicCap, HiBriefcase, HiStar } from "react-icons/hi";
import { Reveal } from "@/components/Reveal";

export const Route = createLazyFileRoute("/doctors")({
  component: DoctorsPage,
});

function DoctorsPage() {
  const { data: doctorsData = [] } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  const doctor = doctorsData[0];
  if (!doctor) return null;

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Chief Specialist"
        title={
          <>
            Dr. B.{" "}
            <span className="gold-gradient-text font-serif italic font-normal">
              Selvakumar
            </span>
          </>
        }
        description="Master of Physiotherapy (Sports) with over 12 years of hands-on expertise in sports medicine, orthopedic rehabilitation, and elite athletic conditioning."
        bgKey="doctors"
      />
      
      <section className="py-20 sm:py-28 bg-white">
        <div className="container-lux">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
            
            {/* Left Sidebar Card (4 cols) */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <Reveal>
                <div className="rounded-[2rem] bg-[#0C1524] p-8 text-white shadow-2xl border border-white/5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-brand/10 border border-blue-brand/20 text-blue-brand text-2xl font-bold font-display shadow-inner mb-6">
                    {doctor.initials}
                  </div>
                  <h2 className="font-display text-2xl font-bold">{doctor.name}</h2>
                  <p className="mt-1 text-sm font-bold uppercase tracking-wider text-blue-brand">{doctor.qualification}</p>
                  
                  <div className="mt-6 space-y-4 border-t border-white/10 pt-6 text-sm">
                    <div className="flex items-center gap-3">
                      <HiBriefcase className="h-5 w-5 text-blue-brand shrink-0" />
                      <div>
                        <p className="text-xs text-white/40 uppercase tracking-widest font-semibold">Experience</p>
                        <p className="font-semibold text-white/90">{doctor.experience}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <HiStar className="h-5 w-5 text-blue-brand shrink-0" />
                      <div>
                        <p className="text-xs text-white/40 uppercase tracking-widest font-semibold">Specialization</p>
                        <p className="font-semibold text-white/90">Sports & Musculoskeletal</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Link to="/book-appointment" className="btn-blue btn-blue-hover w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider justify-center shadow-lg">
                      Request Consultation
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
            
            {/* Right Biography & Details (8 cols) */}
            <div className="lg:col-span-8 lg:pl-6">
              <Reveal delay={0.1}>
                <div className="prose prose-slate max-w-none">
                  <h3 className="font-display text-3xl font-bold text-ink tracking-tight">Biography</h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {doctor.bio} He is recognized for his precise biomechanical approach to injury treatment, analyzing motion irregularities to resolve chronic pain patterns at their root source.
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    Over his distinguished career of 3+ years, Dr. Selvakumar has worked with competitive athletes, orthopedic surgeons, and post-operative patients to draft personalized milestones for recovery. His treatment style combines hands-on manual adjustment techniques, advanced dry needling, and clinical electrotherapy modalities.
                  </p>
                  
                  {/* Education & Qualifications */}
                  <h3 className="mt-12 font-display text-2xl font-bold text-ink tracking-tight flex items-center gap-2 border-t border-blue-brand/5 pt-8">
                    <HiAcademicCap className="h-6 w-6 text-blue-brand" /> Education &amp; Certifications
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {doctor.education?.map((edu: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-ink/80 font-medium">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-brand shrink-0" />
                        <span>{edu}</span>
                      </li>
                    )) || (
                      <>
                        <li className="flex items-start gap-3 text-sm text-ink/80 font-medium">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-brand shrink-0" />
                          <span>Master of Physiotherapy (MPT) in Sports Medicine</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-ink/80 font-medium">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-brand shrink-0" />
                          <span>Bachelor of Physiotherapy (BPT)</span>
                        </li>
                      </>
                    )}
                  </ul>
                  
                  {/* Scope of Practice */}
                  <h3 className="mt-12 font-display text-2xl font-bold text-ink tracking-tight flex items-center gap-2 border-t border-blue-brand/5 pt-8">
                    <HiCheckCircle className="h-6 w-6 text-blue-brand" /> Area of Clinical Expertise
                  </h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {doctor.expertise?.map((exp: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2.5 rounded-2xl border border-blue-brand/5 bg-[#FAFBFD] p-4 shadow-sm">
                        <HiCheckCircle className="h-5 w-5 text-blue-brand shrink-0" />
                        <span className="text-sm font-semibold text-ink/95 leading-tight">{exp}</span>
                      </div>
                    )) || (
                      <>
                        <div className="flex items-center gap-2.5 rounded-2xl border border-blue-brand/5 bg-[#FAFBFD] p-4 shadow-sm">
                          <HiCheckCircle className="h-5 w-5 text-blue-brand shrink-0" />
                          <span className="text-sm font-semibold text-ink/95 leading-tight">Sports Injury Rehab</span>
                        </div>
                        <div className="flex items-center gap-2.5 rounded-2xl border border-blue-brand/5 bg-[#FAFBFD] p-4 shadow-sm">
                          <HiCheckCircle className="h-5 w-5 text-blue-brand shrink-0" />
                          <span className="text-sm font-semibold text-ink/95 leading-tight">Manual Therapy Joint Mobilization</span>
                        </div>
                      </>
                    )}
                  </div>
                  
                </div>
              </Reveal>
            </div>
            
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
