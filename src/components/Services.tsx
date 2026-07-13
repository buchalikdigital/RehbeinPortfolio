"use client";

import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { services, type Service } from "@/lib/content";

// Echte Seitenverhältnisse der Originalfotos (alte Web-Banner, unterschiedlich groß) —
// Container werden daran ausgerichtet statt die Bilder zu verzerren/hochzuskalieren.
const imageAspect: Record<string, string> = {
  bad: "542 / 128",
  heizung: "542 / 128",
  sanitaer: "542 / 225",
  solar: "542 / 225",
  gas: "262 / 75",
};

function ServiceIcon({ icon, color }: { icon: Service["icon"]; color: string }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (icon) {
    case "bath":
      return (
        <svg {...common} aria-hidden>
          <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" />
          <path d="M6 12V6a2 2 0 0 1 2-2 2 2 0 0 1 2 2" />
          <path d="M5 19l-1 2M20 19l1 2" />
        </svg>
      );
    case "heat":
      return (
        <svg {...common} aria-hidden>
          <path d="M12 3c1 3-2 4-2 7a2 2 0 0 0 4 0c0-1-.5-2-1-2.5" />
          <path d="M8 21c-1-2 0-4 1-5M16 21c1-2 0-4-1-5M12 21c0-2 0-3 0-4" />
        </svg>
      );
    case "pipe":
      return (
        <svg {...common} aria-hidden>
          <path d="M4 8h6v4a4 4 0 0 0 4 4h6" />
          <path d="M4 6v4M20 14v4" />
          <circle cx="4" cy="8" r="1.4" fill={color} stroke="none" />
        </svg>
      );
    case "solar":
      return (
        <svg {...common} aria-hidden>
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
        </svg>
      );
    case "gas":
      return (
        <svg {...common} aria-hidden>
          <path d="M14 3c0 3-4 4-4 8a4 4 0 0 0 8 0c0-2-1.5-3-2-4" />
          <path d="M6 14a3 3 0 1 0 3 3" />
        </svg>
      );
  }
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <RevealItem>
      <div className="flex h-full flex-col overflow-hidden border border-navy/8 bg-white shadow-[0_8px_28px_-20px_rgba(14,42,94,0.35)]">
        <div className="relative overflow-hidden" style={{ aspectRatio: imageAspect[service.key] }}>
          <img
            src={service.image}
            alt={service.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute left-3 top-3 grid h-10 w-10 place-items-center bg-white shadow-md">
            <ServiceIcon icon={service.icon} color={service.accent} />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <span
            className="text-xs font-bold uppercase tracking-[0.16em]"
            style={{ color: service.accent }}
          >
            {service.tagline}
          </span>
          <h3 className="display mt-2 text-lg">{service.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-mid">{service.description}</p>
          <a
            href="#kontakt"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy"
          >
            Jetzt anfragen
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </RevealItem>
  );
}

export default function Services() {
  return (
    <section id="leistungen" className="section bg-mist">
      <div className="container-x">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow">Unsere Leistungen</p>
          <h2 className="display mt-3 text-[clamp(1.5rem,3.2vw,2.3rem)]">
            Alles fürs Haus — aus einer Hand
          </h2>
          <div className="orange-line" />
          <p className="mt-4 text-base text-ink-mid">
            Ob neues Traumbad, moderne Heizung oder eigene Solarenergie: Bei
            Freitag bekommen Sie fünf Gewerke von einem einzigen Meisterbetrieb.
          </p>
        </div>

        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {services.map((s) => (
            <ServiceCard key={s.key} service={s} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
