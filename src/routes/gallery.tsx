import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { HiX } from "react-icons/hi";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { gallery } from "@/data/gallery";
import { CTA } from "@/components/sections/CTA";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Proactive Clinic Spaces" },
      { name: "description", content: "A visual tour of our private suites, movement labs and recovery lounges." },
    ],
  }),
  component: GalleryPage,
});

const gradients = [
  "from-[#F0D689] to-[#7a5a18]", "from-[#111111] to-[#3a3a3a]",
  "from-[#E7C766] to-[#B08A24]", "from-[#2a2a2a] to-[#111111]",
  "from-[#F4E7B8] to-[#a8842b]", "from-[#D4AF37] to-[#6b5015]",
  "from-[#1a1a1a] to-[#4a4a4a]", "from-[#E7C766] to-[#8b6b1a]",
  "from-[#F0D689] to-[#B08A24]",
];

const spans: Record<string, string> = { tall: "row-span-2", medium: "row-span-1", short: "row-span-1" };

function GalleryPage() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Gallery"
        title="A walk through Proactive."
        description="Warm light, quiet corners and precision equipment — every space in our clinic is designed to feel calm and focused."
      />
      <section className="py-20 sm:py-28">
        <div className="container-lux">
          <div className="grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {gallery.map((g, i) => (
              <Reveal key={g.id} delay={(i % 4) * 0.05} className={spans[g.h]}>
                <button
                  onClick={() => setActive(i)}
                  className={`group relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br ${gradients[i % gradients.length]} shadow-[0_20px_60px_-30px_rgba(17,17,17,0.4)] transition-transform duration-500 hover:scale-[1.02]`}
                >
                  <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.35)_1px,transparent_0)] [background-size:14px_14px]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gold">{g.tag}</p>
                    <p className="mt-1 font-display text-lg font-semibold text-white">{g.title}</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[80] grid place-items-center bg-ink/90 p-6 backdrop-blur"
          >
            <button className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Close">
              <HiX className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br ${gradients[active % gradients.length]}`}
            >
              <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.35)_1px,transparent_0)] [background-size:14px_14px]" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-8">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">{gallery[active].tag}</p>
                <p className="mt-2 font-display text-2xl font-semibold text-white">{gallery[active].title}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTA />
    </SiteLayout>
  );
}
