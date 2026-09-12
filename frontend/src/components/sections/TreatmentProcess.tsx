import { useEffect, useRef } from "react";
import { SectionHeading } from "../SectionHeading";
import { treatments } from "@/data/treatments";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function TreatmentProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineHorizontalRef = useRef<HTMLDivElement>(null);
  const lineVerticalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const cards = document.querySelectorAll(".process-card");
    const lineH = lineHorizontalRef.current;
    const lineV = lineVerticalRef.current;

    if (!section) return;

    // 1. Initial fade-in of the cards as they reach viewport
    gsap.fromTo(cards, 
      { opacity: 0, y: 30, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // 2. Desktop: Animate horizontal connecting path on scroll
    if (lineH) {
      gsap.fromTo(lineH,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            end: "bottom 75%",
            scrub: 0.8
          }
        }
      );
    }

    // 3. Mobile: Animate vertical connecting path on scroll
    if (lineV) {
      gsap.fromTo(lineV,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 0.8
          }
        }
      );
    }

    // 4. Dynamic highlight of each card as the scroll timeline hits it
    cards.forEach((card) => {
      gsap.fromTo(card,
        { borderColor: "rgba(255, 255, 255, 0.1)", backgroundColor: "rgba(255, 255, 255, 0.02)" },
        {
          borderColor: "rgba(59, 130, 246, 0.35)",
          backgroundColor: "rgba(59, 130, 246, 0.05)",
          duration: 0.4,
          scrollTrigger: {
            trigger: card,
            start: "top 65%",
            end: "bottom 55%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="treatment-process-section" 
      className="relative overflow-hidden bg-navy-deep py-14 text-white sm:py-16 border-t border-white/5"
    >
      <div className="pointer-events-none absolute inset-0 grain-bg opacity-30" />
      <div className="pointer-events-none absolute -right-32 top-32 h-96 w-96 rounded-full bg-blue-brand/5 blur-3xl" />
      
      <div className="container-lux relative">
        <SectionHeading
          light
          eyebrow="Our Process"
          title="A recovery journey, engineered."
          description="Focused phases, one dedicated specialist, and a plan that never leaves outcomes to chance."
        />

        {/* Grid of Steps */}
        <div className="mt-16 grid gap-6 lg:grid-cols-5 relative">
          
          {/* Horizontal connecting track (Desktop) */}
          <div className="absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-white/10 hidden lg:block -z-10">
            <div 
              ref={lineHorizontalRef}
              className="h-full bg-gradient-to-r from-blue-brand via-blue-500 to-[#10B981] origin-left scale-x-0"
            />
          </div>

          {/* Vertical connecting track (Mobile/Tablet) */}
          <div className="absolute left-[45px] top-[40px] bottom-[40px] w-[2px] bg-white/10 lg:hidden -z-10">
            <div 
              ref={lineVerticalRef}
              className="w-full bg-gradient-to-b from-blue-brand via-blue-500 to-[#10B981] origin-top scale-y-0 h-full"
            />
          </div>

          {treatments.map((t, i) => (
            <ProcessCard 
              key={t.step} 
              step={t.step} 
              title={t.title} 
              description={t.description} 
              index={i} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessCard({ step, title, description, index }: { step: string; title: string; description: string; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="process-card group relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.02] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-brand/40 overflow-hidden shadow-sm cursor-default"
    >
      {/* Spotlight cursor glow overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(350px_circle_at_var(--x,0px)_var(--y,0px),rgba(59,130,246,0.08),transparent_80%)]" />
      
      <div className="flex items-baseline justify-between relative z-10">
        <span className="font-display text-4xl font-semibold text-blue-brand transition-all duration-300 group-hover:scale-105 group-hover:text-blue-400">
          {step}
        </span>
        <span className="h-px w-10 bg-white/20 transition-all duration-500 group-hover:w-14 group-hover:bg-blue-brand" />
      </div>
      
      <h3 className="mt-6 font-display text-xl font-semibold relative z-10 text-white group-hover:text-blue-300 transition-colors duration-300">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-white/60 group-hover:text-white/80 transition-colors duration-300 relative z-10">
        {description}
      </p>
    </div>
  );
}
