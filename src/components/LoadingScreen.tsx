import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-ink"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gold text-ink"
            >
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="font-display text-2xl font-bold"
              >P</motion.span>
              <span className="absolute inset-0 rounded-2xl animate-pulse-ring" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="text-xs font-medium uppercase tracking-[0.4em] text-gold"
            >Proactive</motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
