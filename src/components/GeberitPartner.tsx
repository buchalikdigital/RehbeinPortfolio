"use client";

import Reveal from "@/components/ui/Reveal";

const points = [
  "Zertifizierter Geberit-Fachpartner",
  "Dusch-WC AquaClean für spürbar mehr Hygiene & Komfort",
  "Fachgerechte Beratung, Installation und Wartung",
];

export default function GeberitPartner() {
  return (
    <section id="partner" className="section bg-orange-light">
      <div className="container-x">
        <Reveal>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <div className="mb-5 inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-sm">
                <img src="/logos/geberit.svg" alt="Geberit" className="h-4 w-auto" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink">
                  Premium-Partner
                </span>
              </div>
              <h2 className="display text-[clamp(1.5rem,3.2vw,2.2rem)]">
                Wellness fürs Bad mit <em>Geberit AquaClean</em>
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-ink-mid">
                Als zertifizierter Geberit-Fachpartner installieren wir das
                Dusch-WC AquaClean — für ein Gefühl von Frische und Sauberkeit,
                das Sie nicht mehr missen möchten.
              </p>

              <ul className="mt-6 space-y-3">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm text-ink">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-orange">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              <a href="#kontakt" className="btn btn-primary mt-8">
                AquaClean entdecken
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <Reveal direction="left" delay={0.1}>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="/images/partners/geberit-aquaclean-ad.jpg"
                  alt="Geberit AquaClean Dusch-WC"
                  loading="lazy"
                  className="w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
