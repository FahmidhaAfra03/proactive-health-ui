import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface TextRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  as?: "div" | "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function TextReveal({
  children,
  delay = 0,
  duration = 1.2,
  className = "",
  as: Component = "div",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  // If children is a pure string, we can split it into words for a staggered reveal
  if (typeof children === "string") {
    const words = children.split(" ");

    return (
      <Component ref={ref} className={`inline-flex flex-wrap ${className}`}>
        {words.map((word, i) => (
          <span
            key={i}
            className="relative inline-block overflow-hidden mr-[0.22em] pb-[0.05em]"
          >
            <motion.span
              className="inline-block origin-left"
              initial={{
                clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
                y: "8%",
              }}
              animate={
                isInView
                  ? {
                      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                      y: 0,
                    }
                  : {}
              }
              transition={{
                duration: duration * 0.85,
                delay: delay + i * 0.05,
                ease: [0.25, 1, 0.5, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Component>
    );
  }

  // Otherwise, animate the block as a single piece (useful for rich HTML / nested spans)
  return (
    <Component ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="origin-left"
        initial={{
          clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
          y: "4%",
        }}
        animate={
          isInView
            ? {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                y: 0,
              }
            : {}
        }
        transition={{
          duration,
          delay,
          ease: [0.25, 1, 0.5, 1],
        }}
      >
        {children}
      </motion.div>
    </Component>
  );
}
