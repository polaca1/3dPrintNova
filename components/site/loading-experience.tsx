"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function LoadingExperience() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 2200);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          aria-label="Cargando 3DPrintNova"
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#070707]"
          exit={{ opacity: 0, y: "-8%" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 glass-line"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.25, ease: "easeOut" }}
          />
          <motion.div
            className="relative grid size-36 place-items-center rounded-[2rem] border border-white/[0.12] bg-white/[0.08] shadow-glow backdrop-blur-2xl"
            initial={{ scale: 0.84, rotateX: 38, opacity: 0 }}
            animate={{ scale: 1, rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute inset-4 rounded-[1.5rem] border border-cyan-nova/35"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: [0, 1, 0.78], rotate: 90 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute h-24 w-8 rounded-full bg-cyan-nova/20 blur-xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, ease: "linear", repeat: Infinity }}
            />
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              <span className="text-3xl font-black text-white">3D</span>
              <span className="text-xs font-semibold text-cyan-nova">
                PRINTNOVA
              </span>
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute bottom-10 h-1 w-52 overflow-hidden rounded-full bg-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-nova via-violet-nova to-rose-400"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
