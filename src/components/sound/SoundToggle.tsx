"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "./SoundProvider";

export default function SoundToggle() {
  const { enabled, toggle } = useSound();

  return (
    <motion.button
      type="button"
      onClick={toggle}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.4, type: "spring", stiffness: 200, damping: 16 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      aria-pressed={enabled}
      aria-label={enabled ? "Sound ausschalten" : "Sound einschalten"}
      title={enabled ? "Sound aus" : "Sound an"}
      className="glass fixed bottom-5 right-5 z-[60] grid h-12 w-12 place-items-center rounded-full"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 9v6h4l5 4V5L8 9H4z"
          fill={enabled ? "#f1650f" : "#5a6b8c"}
        />
        <AnimatePresence>
          {enabled ? (
            <motion.g
              key="waves"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.path
                d="M16 9c1.2 1 1.2 5 0 6"
                stroke="#ffa200"
                strokeWidth="2"
                strokeLinecap="round"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              <motion.path
                d="M18.5 6.5c2.5 2 2.5 9 0 11"
                stroke="#f1650f"
                strokeWidth="2"
                strokeLinecap="round"
                animate={{ opacity: [0.3, 0.9, 0.3] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
              />
            </motion.g>
          ) : (
            <motion.path
              key="mute"
              d="M17 10l4 4m0-4l-4 4"
              stroke="#8593ad"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </svg>
    </motion.button>
  );
}
