import { partners } from "@/lib/content";

export default function BrandLogos() {
  const row = [...partners, ...partners];
  return (
    <section aria-label="Marken & Partner" className="relative border-y border-navy/8 bg-white py-4">
      <div className="container-x mb-3 flex items-center justify-center gap-3 text-center">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-orange/60" />
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-ink-light">
          Wir arbeiten mit Marken, denen Sie vertrauen
        </p>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-orange/60" />
      </div>

      <div className="marquee-track relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee items-center gap-14 pr-14">
          {row.map((p, i) => (
            <img
              key={`${p.name}-${i}`}
              src={p.src}
              alt={p.name}
              loading="eager"
              decoding="async"
              className="h-6 w-auto shrink-0 opacity-90 transition-opacity duration-300 hover:opacity-100 md:h-7"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
