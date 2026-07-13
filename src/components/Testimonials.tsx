"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { testimonials } from "@/lib/content";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const t = testimonials[i];

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setI((p) => (p + 1) % testimonials.length),
      6000
    );
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <section className="section bg-white">
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Kundenstimmen</p>
          <h2 className="display mt-3 text-[clamp(1.5rem,3.2vw,2.3rem)]">
            Das sagen unsere Kunden
          </h2>
        </Reveal>

        <div className="relative mx-auto mt-8 min-h-[14rem] max-w-2xl">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 font-serif text-[6rem] leading-none text-navy/5"
          >
            &ldquo;
          </span>
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative text-center"
            >
              <blockquote className="font-serif text-[clamp(1.1rem,2.2vw,1.4rem)] font-medium leading-snug text-navy">
                „{t.quote}"
              </blockquote>
              <figcaption className="mt-5">
                <span className="text-sm font-semibold text-ink">{t.name}</span>
                <span className="mx-2 text-orange">·</span>
                <span className="text-sm text-ink-mid">{t.place}</span>
                <span className="mt-1 block text-xs text-ink-light">{t.service}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-2.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Kundenstimme ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === i ? "w-8 bg-orange" : "w-2.5 bg-navy/15 hover:bg-navy/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
