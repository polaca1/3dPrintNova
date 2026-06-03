"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressRail() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.25,
  });

  return (
    <div
      className="fixed right-4 top-1/2 z-40 hidden h-48 w-px -translate-y-1/2 overflow-hidden rounded-full bg-white/10 md:block"
      aria-hidden="true"
    >
      <motion.div
        className="h-full w-full origin-top rounded-full bg-gradient-to-b from-cyan-nova via-violet-nova to-rose-400"
        style={{ scaleY }}
      />
    </div>
  );
}
