import { Link } from "@tanstack/react-router";
import { HiArrowRight } from "react-icons/hi";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { gallery } from "@/data/gallery";

const gradients = [
  "from-[#0F1E36] to-[#1E293B]",
  "from-[#0A1322] to-[#111E2E]",
  "from-[#0B1528] to-[#1E3A8A]",
];

const spans: Record<string, string> = {
  tall: "row-span-2",
  medium: "row-span-1",
  short: "row-span-1",
};

export function GalleryPreview() {
  return (
    <section className="relative py-14 sm:py-16 bg-white">
      <div className="container-lux">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Clinic Tour"
              title="Designed for calm, engineered for recovery."
              description="Explore our advanced private treatment suites, rehabilitation studio, and state-of-the-art clinical spaces."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/gallery" className="btn-ghost-dark text-ink border-ink/20 hover:bg-navy-deep hover:text-white text-sm font-semibold">
              View Full Gallery <HiArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4">
          {gallery.slice(0, 4).map((g, i) => (
            <Reveal key={g.id} delay={i * 0.04} className={spans[g.h] || "row-span-1"}>
              <Link to="/gallery" className="group relative block h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A1322] to-navy-deep shadow-[0_15px_40px_rgba(15,23,42,0.1)]">
                {g.image_url ? (
                  <img
                    src={g.image_url}
                    alt={g.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.35)_1px,transparent_0)] [background-size:14px_14px]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-blue-brand">{g.tag}</p>
                  <p className="mt-1 font-display text-base font-semibold text-white leading-tight">{g.title}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
