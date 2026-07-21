"use client";

import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { useCountUp } from "@/hooks/useCountUp";
import { stats, company } from "@/lib/content";

function Stat({
  value,
  suffix,
  label,
  accent,
}: {
  value: number;
  suffix: string;
  label: string;
  accent: string;
}) {
  const { ref, value: current } = useCountUp(value);
  return (
    <div className="rounded-2xl border border-navy/8 bg-white p-4 shadow-[0_6px_20px_-16px_rgba(14,42,94,0.3)]">
      <div className="flex items-baseline gap-0.5">
        <span ref={ref} className="font-serif text-3xl font-extrabold" style={{ color: accent }}>
          {current}
        </span>
        <span className="font-serif text-lg font-bold" style={{ color: accent }}>
          {suffix}
        </span>
      </div>
      <p className="mt-1 text-xs font-medium leading-tight text-ink-mid">{label}</p>
    </div>
  );
}

const reasons = [
  "Meistergeführter Familienbetrieb in dritter Generation",
  "Fünf Gewerke aus einer Hand — ein Ansprechpartner",
  "Termintreu, sauber und mit ehrlicher Beratung",
  "Über 90 Jahre Erfahrung in und um Bochum",
];

export default function WhyUs() {
  return (
    <section id="warum" className="section bg-navy-mid">
      <div className="container-x grid items-start gap-12 lg:grid-cols-2">
        {/* Photo */}
        <Reveal direction="right">
          <div className="mx-auto max-w-md lg:max-w-none">
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_50px_-24px_rgba(0,0,0,0.4)]">
                <img
                  src="/images/founder/rehbein-inhaber.jpg"
                  alt="Manfred Rehbein, Inhaber"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-navy/85 px-4 py-2.5">
                  <p className="font-serif text-sm font-bold text-white">Manfred Rehbein</p>
                  <p className="text-xs text-cream">Inhaber &amp; Meister</p>
                </div>
              </div>

              <div className="absolute -right-3 -top-3 flex flex-col items-center rounded-xl bg-orange px-4 py-2 shadow-[0_10px_28px_-14px_rgba(241,101,15,0.5)] sm:-right-5">
                <span className="font-serif text-lg font-extrabold text-white">{company.foundedYear}</span>
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-white/85">
                  gegründet
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Content */}
        <div>
          <p className="eyebrow">Warum Rehbein</p>
          <h2 className="display mt-3 text-[clamp(1.5rem,3.2vw,2.3rem)] !text-white">
            Handwerk mit <em>Handschlag-Qualität</em>
          </h2>
          <div className="orange-line" />
          <p className="mt-4 text-base leading-relaxed text-cream/80">
            Seit {company.foundedYear} steht der Name Rehbein in {company.city} für
            ehrliches Handwerk. Was als kleiner Betrieb begann, führen wir heute
            in dritter Generation mit demselben Anspruch: Ihre Zufriedenheit ist
            unser Maßstab.
          </p>

          <RevealGroup className="mt-6 space-y-3" stagger={0.09}>
            {reasons.map((r) => (
              <RevealItem key={r} direction="left">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-orange text-white">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-white">{r}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
