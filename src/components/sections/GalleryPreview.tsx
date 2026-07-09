import { Link } from "@tanstack/react-router";
import { HiArrowRight } from "react-icons/hi";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { gallery } from "@/data/gallery";

const gradients = [
  "from-[#F0D689] to-[#7a5a18]",
  "from-[#111111] to-[#3a3a3a]",
  "from-[#E7C766] to-[#B08A24]",
  "from-[#2a2a2a] to-[#111111]",
  "from-[#F4E7B8] to-[#a8842b]",
  "from-[#D4AF37] to-[#6b5015]",
  "from-[#1a1a1a] to-[#4a4a4a]",
  "from-[#E7C766] to-[#8b6b1a]",
  "from-[#F0D689] to-[#B08A24]",
];

const spans: Record<string, string> = {
  tall: "row-span-2",
  medium: "row-span-1",
  short: "row-span-1",
};

export function GalleryPreview() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-lux">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Our Space"
              title="Designed for calm, engineered for recovery."
              description="Take a walk through our private suites, movement labs and recovery lounges."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/gallery" className="btn-ghost-dark text-ink hover:bg-ink hover:text-white">
              View gallery <HiArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-4 md:grid-cols-4">
          {gallery.slice(0, 6).map((g, i) => (
            <Reveal key={g.id} delay={i * 0.04} className={spans[g.h]}>
              <div className={`group relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br ${gradients[i % gradients.length]} shadow-[0_20px_60px_-30px_rgba(17,17,17,0.4)]`}>
                <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.35)_1px,transparent_0)] [background-size:14px_14px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gold">{g.tag}</p>
                  <p className="mt-1 font-display text-lg font-semibold text-white">{g.title}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
