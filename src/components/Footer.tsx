import Logo from "@/components/Logo";
import { company, navLinks, services } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-navy text-cream/80">
      <div className="h-[3px] w-full bg-orange" />
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Logo theme="dark" size={28} />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
            Ihr Meisterbetrieb für Bad, Heizung, Sanitär und Solar in Dortmund —
            in vierter Generation, seit 1907.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold text-gold">
            <span className="h-2 w-2 rounded-full bg-gold" />
            Meisterbetrieb seit {company.foundedYear}
          </div>
        </div>

        {/* Nav */}
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Navigation</h3>
          <ul className="space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-orange">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Leistungen</h3>
          <ul className="space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.key}>
                <a href="#leistungen" className="transition-colors hover:text-orange">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Kontakt</h3>
          <address className="space-y-2.5 text-sm not-italic">
            <p>{company.street}<br />{company.zip} {company.city}</p>
            <p>
              <a href={`tel:${company.phoneHref}`} className="font-semibold text-white transition-colors hover:text-orange">
                {company.phoneDisplay}
              </a>
            </p>
            <p className="text-cream/60">Fax: {company.faxDisplay}</p>
            <p>
              <a href={`mailto:${company.email}`} className="transition-colors hover:text-orange">
                {company.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/60 sm:flex-row">
          <p>© {year} {company.name}. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-5">
            {/* TODO: eigene Seiten anlegen — aktuell Platzhalter-Anker */}
            <a href="#" className="transition-colors hover:text-orange">Impressum</a>
            <a href="#" className="transition-colors hover:text-orange">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
