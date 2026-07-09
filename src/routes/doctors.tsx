import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { DoctorCard } from "@/components/sections/DoctorsFeatured";
import { CTA } from "@/components/sections/CTA";
import { doctors } from "@/data/doctors";

export const Route = createFileRoute("/doctors")({
  head: () => ({
    meta: [
      { title: "Our Doctors — Proactive Physio & Rehab" },
      { name: "description", content: "Meet our team of internationally trained, board-certified physiotherapists." },
    ],
  }),
  component: DoctorsPage,
});

function DoctorsPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Our Experts"
        title="The team behind every recovery."
        description="Each Proactive therapist brings advanced certifications, deep specialisation and a genuine commitment to your outcome."
      />
      <section className="py-20 sm:py-28">
        <div className="container-lux grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((d, i) => <DoctorCard key={d.id} doctor={d} index={i} />)}
        </div>
      </section>
      <CTA />
    </SiteLayout>
  );
}
