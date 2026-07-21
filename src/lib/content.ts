// Fiktives Demo-Unternehmen (Portfolio-Projekt) — Rehbein Sanitär & Heizung GmbH.
// Kein echtes Unternehmen; Struktur/Design basiert auf einem früheren Kundenprojekt,
// alle Firmen-/Personen-/Kontaktdaten sind frei erfunden.

export const company = {
  name: "Rehbein Sanitär & Heizung GmbH",
  short: "Rehbein",
  foundedYear: 1934,
  city: "Bochum",
  street: "Alleestraße 27",
  zip: "44793",
  phoneDisplay: "0234 68 12 550",
  phoneHref: "+492346812550",
  faxDisplay: "0234 68 12 55-9",
  email: "info@rehbein-bochum.de",
  hours: [
    { day: "Mo – Do", time: "8:00 – 12:30 & 14:00 – 16:00 Uhr" },
    { day: "Freitag", time: "8:00 – 13:00 Uhr" },
    { day: "Sa – So", time: "geschlossen" },
  ],
};

export function yearsInBusiness() {
  return new Date().getFullYear() - company.foundedYear;
}

export const navLinks = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Warum wir", href: "#warum" },
  { label: "Partner", href: "#partner" },
  { label: "Kontakt", href: "#kontakt" },
];

export type Service = {
  key: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  accent: string; // css color
  icon: "bath" | "heat" | "pipe" | "solar" | "gas";
};

export const services: Service[] = [
  {
    key: "bad",
    title: "Komplettbad­sanierung",
    tagline: "Ihr Traumbad aus einer Hand",
    description:
      "Von der Planung über Fliesen und Sanitärobjekte bis zur barrierefreien Dusche – wir sanieren Ihr Bad komplett, termintreu und aus einer Hand.",
    image: "/images/leistungen/bad.jpg",
    accent: "#1b6fd0",
    icon: "bath",
  },
  {
    key: "heizung",
    title: "Heizungstechnik",
    tagline: "Effizient & zukunftssicher",
    description:
      "Moderne Brennwert- und Wärmepumpentechnik, Heizungswartung und -modernisierung – für spürbar niedrigere Kosten und mehr Behaglichkeit.",
    image: "/images/leistungen/heizung.jpg",
    accent: "#f1650f",
    icon: "heat",
  },
  {
    key: "sanitaer",
    title: "Sanitärtechnik",
    tagline: "Wasser in besten Händen",
    description:
      "Installation, Wartung und Reparatur Ihrer gesamten Sanitärtechnik – von der tropfenden Leitung bis zur kompletten Neuinstallation.",
    image: "/images/leistungen/sanitaer.jpg",
    accent: "#0e2a5e",
    icon: "pipe",
  },
  {
    key: "solar",
    title: "Solar- & Energietechnik",
    tagline: "Die Kraft der Sonne nutzen",
    description:
      "Solarthermie und regenerative Energietechnik – wir machen Ihr Zuhause unabhängiger und senken dauerhaft Ihren Energieverbrauch.",
    image: "/images/leistungen/solar.jpg",
    accent: "#ffa200",
    icon: "solar",
  },
  {
    key: "gas",
    title: "Gastechnik",
    tagline: "Sicher & geprüft",
    description:
      "Fachgerechte Gasinstallation, Prüfung und Wartung nach aktuellen Sicherheits­standards – zuverlässig durch geprüfte Meister.",
    image: "/images/leistungen/gas.jpg",
    accent: "#f5822e",
    icon: "gas",
  },
];

export const stats = [
  { value: yearsInBusiness(), suffix: "", label: "Jahre Erfahrung", accent: "#1b6fd0" },
  { value: 3, suffix: "", label: "Generationen Familienbetrieb", accent: "#f1650f" },
  { value: 3, suffix: "", label: "Sparten unter einem Dach", accent: "#ffa200" },
  { value: 100, suffix: "%", label: "Meisterbetrieb", accent: "#0e2a5e" },
];

// Fiktive Beispiel-Bewertungen (Demo-Projekt, keine echten Kunden).
export const testimonials = [
  {
    quote:
      "Vom ersten Anruf bis zur Abnahme alles bestens organisiert. Unser neues Bad ist ein Traum – pünktlich und sauber gearbeitet.",
    name: "Familie K.",
    place: "Bochum",
    service: "Komplettbadsanierung",
  },
  {
    quote:
      "Die neue Heizung läuft top und die Kosten sind spürbar gesunken. Kompetente Beratung, faire Preise.",
    name: "T. Herrmann",
    place: "Bochum",
    service: "Heizungstechnik",
  },
  {
    quote: "Zuverlässig, freundlich und immer erreichbar. Kann ich uneingeschränkt weiterempfehlen.",
    name: "S. Nowak",
    place: "Bochum",
    service: "Sanitär- & Heizungstechnik",
  },
];

// Fiktive Marken-Partner (kein reales Unternehmen, Demo-Projekt).
export const partners = [
  { name: "Aquora", src: "/logos/aquora.svg" },
  { name: "Klarwell", src: "/logos/klarwell.svg" },
  { name: "Purolux", src: "/logos/purolux.svg" },
  { name: "Badero", src: "/logos/badero.svg" },
  { name: "Wärmtec", src: "/logos/waermtec.svg" },
  { name: "Solvexa", src: "/logos/solvexa.svg" },
  { name: "Nordarmatur", src: "/logos/nordarmatur.svg" },
  { name: "Vitalbad", src: "/logos/vitalbad.svg" },
];
