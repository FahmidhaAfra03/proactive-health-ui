import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { HiArrowRight } from "react-icons/hi";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useQuery } from "@tanstack/react-query";
import { getSettings } from "@/lib/api";
import { TextReveal } from "../ui/TextReveal";

import heroImg from "@/assets/home_hero_hd.jpg";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
};

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);

  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  const heroImageSrc = heroImg;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const bgImg = bgImgRef.current;

    if (!section || !bgImg) return;

    // Smooth Scroll Parallax
    gsap.to(bgImg, {
      yPercent: 12,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="hero-section"
      className="relative w-full h-screen overflow-hidden rounded-b-[2.5rem] bg-[#060D1A] text-white flex items-center select-none"
    >
      {/* Cinematic Background Image Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img 
          ref={bgImgRef}
          src={heroImageSrc} 
          alt="ProActive Rehabilitation Clinic" 
          initial={{ scale: 1.06 }}
          animate={{ scale: 1.01 }}
          transition={{ duration: 8, ease: "easeOut" }}
          className="hero-bg-image w-full h-full object-cover origin-center opacity-65 select-none pointer-events-none"
        />
        {/* Dark Editorial Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060D1A] via-[#060D1A]/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060D1A] via-transparent to-transparent z-10" />
      </div>

      <div className="container-lux relative z-20 w-full pt-16">
        <div className="max-w-3xl flex flex-col items-start">
          {/* Eyebrow Specialization Badge */}
          <TextReveal delay={0.15}>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-brand/25 bg-blue-brand/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-blue-brand mb-6 shadow-inner w-fit select-none">
              <span>⚕️</span> Sports Rehabilitation Clinic
            </div>
          </TextReveal>

          {/* Heading */}
          <TextReveal delay={0.3} duration={1.3} as="h1" className="font-display text-[2.75rem] sm:text-[4rem] lg:text-[4.75rem] xl:text-[5.25rem] font-extrabold leading-[1.02] tracking-tight text-white select-none">
            <>
              Restore Movement.<br />
              Rebuild Strength.<br />
              <span className="gold-gradient-text font-serif italic font-normal">Live Without Limits.</span>
            </>
          </TextReveal>

          {/* Description */}
          <TextReveal delay={0.6} duration={1.2} as="p" className="mt-6 text-sm sm:text-base leading-relaxed text-white/70 max-w-xl">
            At ProActive Physiotherapy & Sports Rehab, we combine advanced rehabilitation techniques, personalized care and evidence-based treatment plans to help you recover faster, reduce pain and regain confidence in every movement.
          </TextReveal>

          {/* Supporting line */}
          <TextReveal delay={0.75} duration={1.2} as="div" className="mt-6 text-xs font-semibold tracking-wider text-blue-brand/80 uppercase border-t border-white/5 pt-6 w-full max-w-xl">
            Expert Physiotherapy &bull; Sports Rehabilitation &bull; Personalized Recovery Plans
          </TextReveal>

          {/* Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link 
              to="/book-appointment" 
              className="group relative overflow-hidden btn-blue text-xs py-3.5 px-8 rounded-xl shadow-lg hover:shadow-blue-brand/20 transition-all duration-300 flex items-center gap-2 border border-blue-brand/20 bg-blue-brand font-bold uppercase tracking-wider"
            >
              <span className="relative z-10 flex items-center gap-2">
                Book Appointment <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-blue-brand via-blue-400 to-[#10B981] transition-transform duration-500 ease-out" />
            </Link>

            <Link 
              to="/treatments" 
              className="group text-xs font-bold uppercase tracking-wider text-white/80 hover:text-white flex items-center gap-1.5 py-3.5 px-6 transition-colors duration-300 border border-white/10 hover:border-white/30 rounded-xl hover:bg-white/5"
            >
              Explore Our Treatments
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1.5 bg-[#060D1A]/20 backdrop-blur-sm">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-blue-brand rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
