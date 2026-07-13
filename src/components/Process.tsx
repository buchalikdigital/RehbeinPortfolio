"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { processSteps } from "@/lib/content";

export default function Process() {
  const reduce = useReducedMotion();
  return (
    <section id="ablauf" className="section relative overflow-hidden bg-navy-deep">
      <div className="container-x relative">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow">So einfach geht&apos;s</p>
          <h2 className="display mt-3 text-[clamp(1.5rem,3.2vw,2.3rem)] !text-white">
            Ihr Weg zum Ergebnis
          </h2>
          <div className="orange-line" />
          <p className="mt-4 text-base text-cream/80">
            Von der ersten Anfrage bis zum fertigen Projekt begleiten wir Sie in
            vier klaren Schritten — verlässlich und transparent.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-9 hidden h-[2px] bg-white/15 lg:block">
            <motion.div
              className="h-full origin-left bg-orange"
              initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <RevealGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.15}>
            {processSteps.map((s) => (
              <RevealItem key={s.n}>
                <div className="relative">
                  <div className="relative z-10 mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-[0_10px_28px_-16px_rgba(0,0,0,0.3)]">
                    <span className="font-serif text-xl font-extrabold text-orange">{s.n}</span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/75">{s.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
