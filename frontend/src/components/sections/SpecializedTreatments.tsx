import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { HiArrowRight, HiCheck, HiChevronRight } from "react-icons/hi";
import { getServices } from "@/lib/api";
import { services as fallbackServices } from "@/data/services";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import painImg from "@/assets/pain_management.jpg";
import sportsImg from "@/assets/sports_rehabilitation.jpg";
import orthoImg from "@/assets/orthopedic_rehabilitation.jpg";
import neuroImg from "@/assets/neurological_rehabilitation.jpg";
import manualImg from "@/assets/manual_therapy.jpg";
import exerciseImg from "@/assets/exercise_therapy.jpg";
import electroImg from "@/assets/electrotherapy.jpg";
import postSurgImg from "@/assets/post_operative_rehabilitation.jpg";

const treatmentImages: Record<string, string> = {
  "pain-management": painImg,
  "sports-rehabilitation": sportsImg,
  "orthopedic-rehabilitation": orthoImg,
  "neurological-rehabilitation": neuroImg,
  "manual-therapy": manualImg,
  "exercise-therapy": exerciseImg,
  "electrotherapy": electroImg,
  "post-surgical-rehabilitation": postSurgImg
};

export function SpecializedTreatments() {
  const { data: servicesData = [] } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  const displayServices = servicesData.length > 0 ? servicesData : fallbackServices;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(media.matches);

    const listener = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      const container = containerRef.current;
      const cards = cardsRef.current?.children;
      const progressBar = progressRef.current;
      const activeNum = numRef.current;

      if (!container || !cards || cards.length === 0) return;

      // Set initial card states
      gsap.set(cards, { opacity: 0, y: 80, scale: 0.95, pointerEvents: "none", zIndex: 1 });
      gsap.set(cards[0], { opacity: 1, y: 0, scale: 1, pointerEvents: "auto", zIndex: 10 });

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "treatments-scroll",
          trigger: container,
          start: "top top",
          end: "+=500%", // Dynamic scrubbing range based on cards
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const index = Math.min(Math.floor(progress * displayServices.length), displayServices.length - 1);
            setActiveIndex(index);
            
            if (activeNum) {
              activeNum.textContent = `0${index + 1} / 0${displayServices.length}`;
            }
            if (progressBar) {
              gsap.to(progressBar, { scaleY: progress, duration: 0.1, overwrite: "auto" });
            }
          }
        }
      });

      // Build timeline transitions
      for (let i = 0; i < cards.length - 1; i++) {
        const currentCard = cards[i];
        const nextCard = cards[i + 1];

        tl.addLabel(`step-${i}`)
          .to(currentCard, {
            opacity: 0,
            y: -60,
            scale: 0.94,
            duration: 1,
            ease: "power2.inOut",
            pointerEvents: "none"
          }, `step-${i}`)
          .to(nextCard, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.inOut",
            pointerEvents: "auto"
          }, `step-${i}`);
      }
    });

    return () => {
      ctx.revert();
    };
  }, [displayServices, isDesktop]);

  const scrollToSection = (idx: number) => {
    const trigger = ScrollTrigger.getById("treatments-scroll");
    if (trigger) {
      const start = trigger.start;
      const end = trigger.end;
      const targetScroll = start + (idx / (displayServices.length - 1)) * (end - start);
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth"
      });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full bg-[#060D1A] text-white">
      {/* Desktop Sticky Split Layout */}
      <div className="hidden lg:grid grid-cols-[45%_55%] h-screen w-full overflow-hidden container-lux">
        
        {/* LEFT PANEL (Sticky Column) */}
        <div className="flex flex-col justify-between py-16 pr-12 h-full z-10 select-none">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-brand/20 bg-blue-brand/5 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-brand mb-6 shadow-inner">
              <span>⚕️</span> CLINICAL PATHWAYS
            </div>
            
            <h2 className="font-display text-4xl xl:text-5xl font-bold leading-tight tracking-tight text-white">
              Our Specialized<br />Treatments
            </h2>
            <p className="mt-4 text-sm text-white/60 max-w-sm leading-relaxed">
              Personalized Physiotherapy Solutions Designed for Faster Recovery and Better Mobility.
            </p>

            {/* Vertical Progress Bar with Text Labels */}
            <div className="flex items-center gap-8 my-10">
              <div className="relative h-56 w-0.5 bg-white/10 rounded-full">
                <div 
                  ref={progressRef}
                  className="absolute top-0 left-0 w-full bg-blue-brand origin-top h-full scale-y-0"
                />
              </div>
              <div className="flex flex-col gap-2.5">
                {displayServices.map((s, idx) => (
                  <button
                    key={s.slug}
                    onClick={() => scrollToSection(idx)}
                    className={`text-[10px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-3.5 ${
                      idx === activeIndex ? "text-blue-brand font-extrabold translate-x-1" : "text-white/30 hover:text-white/60"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                      idx === activeIndex ? "bg-blue-brand scale-125 shadow-md shadow-blue-brand/50" : "bg-white/20"
                    }`} />
                    <span>{s.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom stats number & CTAs */}
          <div>
            <div ref={numRef} className="font-display text-lg font-bold text-blue-brand tracking-widest mb-6">
              01 / 0{displayServices.length}
            </div>
            <div className="flex gap-4">
              <Link 
                to="/book-appointment" 
                search={{ service: displayServices[activeIndex]?.title || displayServices[activeIndex]?.name }}
                className="btn-blue btn-blue-hover text-xs py-3 px-6 shadow-lg shadow-blue-brand/20"
              >
                Book Appointment <HiArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link to="/services" className="btn-ghost-dark text-white text-xs py-3 px-6 border-white/15 hover:border-white/40 hover:bg-white/5">
                Explore Services
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL (Cards Stack Column) */}
        <div className="relative flex items-center justify-center h-full pl-6 select-none">
          <div ref={cardsRef} className="relative w-full max-w-[480px] h-[580px]">
            {displayServices.map((s, idx) => {
              const Icon = s.icon;
              const imgSource = treatmentImages[s.slug] || painImg;
              
              return (
                <div 
                  key={s.slug}
                  className="absolute inset-0 w-full h-full bg-[#0C1524] border border-white/5 rounded-[2rem] p-6 shadow-2xl flex flex-col justify-between"
                >
                  <div>
                    {/* Professional image */}
                    <div className="relative overflow-hidden rounded-2xl aspect-[1.4] mb-5 bg-[#060D1A]">
                      <img 
                        src={imgSource} 
                        alt={s.title} 
                        className="h-full w-full object-cover" 
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0C1524]/40 to-transparent pointer-events-none" />
                      
                      {/* Floating Icon badge */}
                      <span className="absolute top-4 left-4 h-10 w-10 bg-navy-deep/80 backdrop-blur-md rounded-xl flex items-center justify-center text-blue-brand shadow-md">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-white tracking-tight">{s.title}</h3>
                    <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm">{s.short}</p>

                    {/* Key benefits list */}
                    <ul className="mt-4 space-y-2 border-t border-white/5 pt-4">
                      {s.benefits?.slice(0, 3).map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-xs text-white/60 font-medium">
                          <HiCheck className="h-4 w-4 text-blue-brand shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA learn more */}
                  <div className="mt-5 pt-4 border-t border-white/5">
                    <Link
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-brand hover:text-white transition-colors"
                    >
                      Learn More
                      <HiChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Swipeable Layout */}
      <div className="lg:hidden py-14 px-6 bg-[#060D1A]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-brand/20 bg-blue-brand/5 px-3 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-blue-brand mb-4 shadow-inner">
            <span>⚕️</span> CLINICAL PATHWAYS
          </div>
          
          <h2 className="font-display text-3xl font-bold leading-tight text-white">
            Our Specialized Treatments
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-white/60 leading-relaxed max-w-md">
            Personalized Physiotherapy Solutions Designed for Faster Recovery and Better Mobility.
          </p>
        </div>

        {/* Swipeable Carousel */}
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory py-8 scrollbar-none -mx-6 px-6">
          {displayServices.map((s, idx) => {
            const Icon = s.icon;
            const imgSource = treatmentImages[s.slug] || painImg;
            
            return (
              <div 
                key={s.slug}
                className="snap-center shrink-0 w-[82vw] max-w-[340px] bg-[#0C1524] border border-white/5 rounded-3xl p-5 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="relative overflow-hidden rounded-xl aspect-[1.5] mb-4 bg-[#060D1A]">
                    <img 
                      src={imgSource} 
                      alt={s.title} 
                      className="h-full w-full object-cover" 
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 h-8 w-8 bg-navy-deep/80 backdrop-blur-md rounded-lg flex items-center justify-center text-blue-brand">
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-white tracking-tight">{s.title}</h3>
                  <p className="mt-1 text-xs text-white/70 leading-relaxed">{s.short}</p>

                  <ul className="mt-3.5 space-y-1.5 border-t border-white/5 pt-3.5">
                    {s.benefits?.slice(0, 3).map((b) => (
                      <li key={b} className="flex items-start gap-2 text-[11px] text-white/60">
                        <HiCheck className="h-3.5 w-3.5 text-blue-brand shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="inline-flex items-center gap-0.5 text-xs font-bold text-blue-brand"
                  >
                    Learn More
                    <HiChevronRight className="h-3.5 w-3.5" />
                  </Link>
                  <span className="text-[10px] font-bold text-white/30">
                    0{idx + 1} / 0{displayServices.length}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Action buttons */}
        <div className="flex flex-col gap-3 mt-4">
          <Link to="/book-appointment" className="btn-blue btn-blue-hover text-xs py-3.5 text-center shadow-lg shadow-blue-brand/20 w-full justify-center">
            Book Appointment <HiArrowRight className="h-3.5 w-3.5 ml-1.5 inline" />
          </Link>
          <Link to="/services" className="btn-ghost-dark text-white text-xs py-3.5 text-center border-white/15 hover:border-white/40 w-full justify-center">
            Explore Services
          </Link>
        </div>
      </div>
    </div>
  );
}
