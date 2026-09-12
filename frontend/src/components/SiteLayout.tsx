import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { BackToTop } from "./BackToTop";
import { LoadingScreen } from "./LoadingScreen";
import { motion } from "motion/react";
import { TextReveal } from "./ui/TextReveal";

// Import premium background images for subpages
import electrotherapyImg from "@/assets/electrotherapy.webp";
import exerciseTherapyImg from "@/assets/exercise_therapy.webp";
import heroImg from "@/assets/hero_v3.webp";
import manualTherapyImg from "@/assets/manual_therapy.webp";
import movementStudioImg from "@/assets/movement_studio_3.webp";
import neurologicalRehabImg from "@/assets/neurological_rehabilitation.webp";
import orthopedicRehabImg from "@/assets/orthopedic_rehabilitation.webp";
import painManagementImg from "@/assets/pain_management.webp";
import physioStudioImg from "@/assets/physio_studio_1.webp";
import physioTherapyImg from "@/assets/physio_therapy_2.webp";
import postOperativeRehabImg from "@/assets/post_operative_rehabilitation.webp";
import sportsRehabImg from "@/assets/sports_rehabilitation.webp";
import aboutHeroImg from "@/assets/about_hero.webp";
import servicesHeroImg from "@/assets/services_hero.webp";

const headerImages: Record<string, string> = {
  "pain-management": painManagementImg,
  "sports-rehabilitation": sportsRehabImg,
  "orthopedic-rehabilitation": orthopedicRehabImg,
  "neurological-rehabilitation": neurologicalRehabImg,
  "manual-therapy": manualTherapyImg,
  "exercise-therapy": exerciseTherapyImg,
  "electrotherapy": electrotherapyImg,
  "post-surgical-rehabilitation": postOperativeRehabImg,
  "about": aboutHeroImg,
  "services": servicesHeroImg,
  "doctors": physioTherapyImg,
  "contact": movementStudioImg,
  "book-appointment": physioStudioImg,
  "testimonials": physioTherapyImg,
  "gallery": movementStudioImg,
  "faq": physioStudioImg,
  "privacy": heroImg,
  "terms": heroImg,
  "treatments": manualTherapyImg,
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
};

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <LoadingScreen />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export function PageHeader({
  eyebrow, title, description, bgImage, bgKey,
}: { eyebrow?: string; title: ReactNode; description?: string; bgImage?: string; bgKey?: string }) {
  const imgSrc = bgImage || (bgKey ? headerImages[bgKey] : undefined) || heroImg;
  const altText = typeof title === "string" ? title : eyebrow || "ProActive Rehabilitation";

  return (
    <section className="relative overflow-hidden rounded-b-[2.5rem] bg-[#060D1A] w-full h-[60vh] min-h-[460px] text-white flex items-center">
      {/* Background image container with smooth zoom-in scale */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img 
          src={imgSrc} 
          alt={altText} 
          initial={{ scale: 1.08 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 7, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover origin-center opacity-60 select-none pointer-events-none"
        />
        {/* Subtle grid lines pattern for premium diagnostic/clinical structure */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none z-10" />

        {/* Premium editorial dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060D1A] via-[#060D1A]/85 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060D1A] via-transparent to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060D1A]/40 to-transparent z-10 pointer-events-none" />

        {/* Ambient colored glowing lights for visual interest */}
        <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-blue-brand/10 blur-3xl animate-float-slow z-10" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-blue-brand/5 blur-3xl z-10" />
      </div>

      <div className="container-lux relative z-20 w-full pt-16">
        <div className="max-w-4xl flex flex-col items-start text-left">
          {eyebrow && (
            <TextReveal delay={0.1} duration={1.0}>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-brand/25 bg-blue-brand/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-blue-brand mb-5 shadow-inner select-none">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-brand" /> {eyebrow}
              </div>
            </TextReveal>
          )}

          <TextReveal delay={0.2} duration={1.2} as="h1" className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-extrabold leading-[1.05] tracking-tight text-white select-none">
            {title}
          </TextReveal>

          {description && (
            <TextReveal delay={0.4} duration={1.2} as="p" className="mt-6 text-base sm:text-lg leading-relaxed text-white/85 max-w-2xl select-none">
              {description}
            </TextReveal>
          )}
        </div>
      </div>
    </section>
  );
}

