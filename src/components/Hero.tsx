"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { company, yearsInBusiness } from "@/lib/content";

const stats = [
  { value: `${yearsInBusiness()}`, label: "Jahre Erfahrung" },
  { value: "3", label: "Generationen" },
  { value: "24/7", label: "Notdienst" },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#0e2a5e_0%,#0e2a5e_78%,#eaf2fe_92%,#ffffff_100%)] pb-14 pt-[105px] sm:pt-[121px]"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="container-x relative flex flex-col items-center text-center"
      >
        <motion.h1
          variants={item}
          className="display max-w-2xl text-[clamp(1.9rem,4vw,2.9rem)] !text-white"
        >
          Ihr Zuhause in besten Händen — <em className="!text-orange-mid">seit {company.foundedYear}</em>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-cream/80"
        >
          Familienbetrieb aus {company.city} für Komplettbadsanierung,
          Heizungs-, Sanitär- und Solartechnik — termintreu und ohne
          versteckte Kosten.
        </motion.p>

        <motion.div variants={item} className="mt-6 flex flex-wrap justify-center gap-3">
          <MagneticButton href="#kontakt" className="btn btn-primary">
            Kostenloses Angebot
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticButton>
          <MagneticButton href={`tel:${company.phoneHref}`} className="btn btn-ghost-dark">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11 11 0 0 0 3.5.56 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.3a1 1 0 0 1 1 1 11 11 0 0 0 .56 3.5 1 1 0 0 1-.24 1L6.6 10.8Z" fill="currentColor" />
            </svg>
            {company.phoneDisplay}
          </MagneticButton>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-2"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-1.5">
              <span className="font-serif text-base font-extrabold text-white">{s.value}</span>
              <span className="text-xs text-cream/65">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="container-x relative mt-9"
      >
        <div className="mx-auto max-w-2xl overflow-hidden rounded-xl border-4 border-white/10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]">
          <img
            src="/images/founder/rehbein-hero.jpg"
            alt="Sanitärinstallateur bei der Arbeit"
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      </motion.div>
    </section>
  );
}
