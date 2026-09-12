import { useState } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { HiX } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { getGallery } from "@/lib/api";

export const Route = createLazyFileRoute("/gallery")({
  component: GalleryPage,
});

const gradients = [
  "from-[#0F1E36] to-[#1E293B]",
  "from-[#0A1322] to-[#111E2E]",
  "from-[#0B1528] to-[#1E3A8A]",
];

const spans: Record<string, string> = { tall: "row-span-2", medium: "row-span-1", short: "row-span-1" };

function GalleryPage() {
  const [active, setActive] = useState<number | null>(null);

  const { data: galleryData = [] } = useQuery({
    queryKey: ["gallery"],
    queryFn: getGallery,
  });

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Gallery"
        title={
          <>
            A walk through{" "}
            <span className="gold-gradient-text font-serif italic font-normal">
              ProActive
            </span>
            .
          </>
        }
        description="Private treatment bays, state-of-the-art electrotherapy carts, and dedicated movement labs — every space is built for your healing journey."
        bgKey="gallery"
      />
      <section className="py-20 sm:py-28 bg-[#FAFBFD]">
        <div className="container-lux">
          <div className="grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {galleryData.map((g, i) => (
              <Reveal key={g.id || i} delay={(i % 4) * 0.05} className={spans[g.h] || "row-span-1"}>
                <button
                  onClick={() => setActive(i)}
                  className={`group relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br ${gradients[i % gradients.length]} shadow-[0_15px_40px_rgba(15,23,42,0.1)] transition-transform duration-500 hover:scale-[1.02]`}
                >
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
                  <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-brand">{g.tag}</p>
                    <p className="mt-1 font-display text-base font-semibold text-white leading-tight">{g.title}</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active !== null && galleryData[active] && (
          <motion.div
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[80] grid place-items-center bg-navy-deep/95 p-6 backdrop-blur-md"
          >
            <button className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition" aria-label="Close">
              <HiX className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-[2rem] bg-gradient-to-br ${gradients[active % gradients.length]}`}
            >
              {galleryData[active].image_url ? (
                <img 
                  src={galleryData[active].image_url} 
                  alt={galleryData[active].title} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.35)_1px,transparent_0)] [background-size:14px_14px]" />
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep to-transparent p-8">
                <p className="text-[11px] font-bold uppercase tracking-widest text-blue-brand">{galleryData[active].tag}</p>
                <p className="mt-2 font-display text-xl font-semibold text-white leading-snug">{galleryData[active].title}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SiteLayout>
  );
}
