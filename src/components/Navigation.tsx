"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Logo from "@/components/Logo";
import { navLinks, company } from "@/lib/content";
import { useSound } from "@/components/sound/SoundProvider";

const GAUGE_TICKS = [-120, -80, -40, 0, 40, 80, 120];
const VALVE_SPOKES = [0, 72, 144, 216, 288];

function ValveWheel() {
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" aria-hidden className="valve-wheel shrink-0">
      <defs>
        <linearGradient id="valveSteel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="12" fill="none" stroke="url(#valveSteel)" strokeWidth="2.5" />
      {VALVE_SPOKES.map((deg) => {
        const a = (deg * Math.PI) / 180;
        const x1 = 16 + Math.cos(a) * 5;
        const y1 = 16 + Math.sin(a) * 5;
        const x2 = 16 + Math.cos(a) * 12;
        const y2 = 16 + Math.sin(a) * 12;
        return (
          <line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="url(#valveSteel)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        );
      })}
      <circle cx="16" cy="16" r="4.5" fill="url(#valveSteel)" />
    </svg>
  );
}

function PressureGauge() {
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" aria-hidden className="shrink-0">
      <defs>
        <linearGradient id="gaugeSteel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="12" fill="none" stroke="url(#gaugeSteel)" strokeWidth="2" />
      {GAUGE_TICKS.map((deg) => {
        const a = (deg * Math.PI) / 180;
        const x1 = 16 + Math.sin(a) * 9;
        const y1 = 16 - Math.cos(a) * 9;
        const x2 = 16 + Math.sin(a) * 11;
        const y2 = 16 - Math.cos(a) * 11;
        return (
          <line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="url(#gaugeSteel)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        );
      })}
      <g className="gauge-needle" style={{ transformOrigin: "16px 16px" }}>
        <line x1="16" y1="16" x2="16" y2="7" stroke="#F1650F" strokeWidth="2" strokeLinecap="round" />
      </g>
      <circle cx="16" cy="16" r="2.2" fill="#F1650F" />
    </svg>
  );
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const { play } = useSound();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Logo — eigenständig oben links, unabhängig von der Nav-Pille */}
      <motion.a
        href="#top"
        aria-label="Zur Startseite"
        initial={reduce ? false : { y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-4 top-3 z-50 grid place-items-center rounded-2xl bg-white px-3 py-2 shadow-[0_10px_28px_-12px_rgba(14,42,94,0.45)] sm:left-6 sm:top-4"
      >
        <Logo variant="full" size={17} />
      </motion.a>

      <motion.div
        initial={reduce ? false : { y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-3 z-50 flex justify-end px-4 sm:top-4 lg:justify-center"
      >
        <nav className="flex max-w-full items-center gap-1 rounded-full bg-[linear-gradient(180deg,#1b3e7c_0%,#0e2a5e_55%,#071b40_100%)] py-1.5 pl-2 pr-2 shadow-[0_16px_40px_-14px_rgba(7,27,64,0.55)] sm:gap-2 sm:pl-3 sm:pr-3">
          <div className="hidden lg:block">
            <ValveWheel />
          </div>

          <div className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onMouseEnter={() => play("whoosh")}
                className="rounded-full px-3 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </div>

          <a
            href={`tel:${company.phoneHref}`}
            className="hidden whitespace-nowrap px-2 text-sm font-semibold text-white/90 hover:text-white lg:inline-block"
          >
            {company.phoneDisplay}
          </a>

          <a
            href="#kontakt"
            onClick={() => play("click")}
            className="btn btn-primary hidden !px-4 !py-2 !text-sm lg:inline-flex"
          >
            Angebot
          </a>

          <div className="hidden lg:block">
            <PressureGauge />
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            onClick={() => {
              setOpen((v) => !v);
              play("click");
            }}
            className="relative grid h-9 w-9 place-items-center rounded-full bg-white/10 lg:hidden"
          >
            <span className="sr-only">Menü</span>
            <div className="flex flex-col gap-[4px]">
              <motion.span
                animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block h-[2px] w-4 rounded-full bg-white"
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                className="block h-[2px] w-4 rounded-full bg-white"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block h-[2px] w-4 rounded-full bg-white"
              />
            </div>
          </button>
        </nav>
      </motion.div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-[4.5rem] z-40 rounded-3xl bg-white/98 p-4 shadow-[0_24px_60px_-20px_rgba(14,42,94,0.4)] backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="border-b border-navy/5 py-3 text-lg font-medium text-navy"
                >
                  {l.label}
                </motion.a>
              ))}
              <a href="#kontakt" onClick={() => setOpen(false)} className="btn btn-primary mt-3">
                Angebot anfordern
              </a>
              <a
                href={`tel:${company.phoneHref}`}
                className="mt-1 py-2 text-center text-sm font-semibold text-ink-mid"
              >
                {company.phoneDisplay}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
