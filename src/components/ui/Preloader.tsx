"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const SESSION_KEY = "rehbein-preloaded";

export default function Preloader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let already = false;
    try {
      already = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (already || reduce) return;

    setVisible(true);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
    }, 2100);
    return () => clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-navy-deep"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* rising water */}
          <motion.div
            className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,#1b6fd0,#0e2a5e)]"
            initial={{ height: "0%" }}
            animate={{ height: ["0%", "100%"] }}
            transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
          />
          <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_30%_20%,rgba(255,162,0,0.25),transparent_45%),radial-gradient(circle_at_75%_75%,rgba(241,101,15,0.22),transparent_45%)]" />

          <div className="relative flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              {[
                { fill: "#1b6fd0", d: 0 },
                { fill: "#ffa200", d: 0.12 },
                { fill: "#f1650f", d: 0.24 },
              ].map((c, i) => (
                <motion.span
                  key={i}
                  className="block h-4 w-4 rounded-full sm:h-5 sm:w-5"
                  style={{ background: c.fill }}
                  initial={{ scale: 0, y: 20 }}
                  animate={{
                    scale: [0, 1.25, 1],
                    y: [20, 0, 0],
                  }}
                  transition={{
                    duration: 0.9,
                    delay: c.d,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                />
              ))}
            </div>
            <motion.span
              className="font-serif text-3xl font-bold text-white sm:text-4xl"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Rehbein
            </motion.span>
            <motion.span
              className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-cream"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              Seit 1934
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
