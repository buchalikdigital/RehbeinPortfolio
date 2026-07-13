// Zentrale, echte Inhalte der Heinrich Freitag GmbH.
// Quelle: freitag-dortmund.de + dokumentierte Marken-/Kontaktdaten.

export const company = {
  name: "Heinrich Freitag GmbH",
  short: "Freitag",
  foundedYear: 1907,
  city: "Dortmund",
  street: "Am Geenseel 12",
  zip: "44263",
  // Bestätigt über die Auto-Antwort in public/mail.php ("0231 - 94 11 310").
  phoneDisplay: "0231 94 11 310",
  phoneHref: "+492319411310",
  faxDisplay: "0231 94 11 31-9",
  email: "info@freitag-dortmund.de",
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
  { label: "Ablauf", href: "#ablauf" },
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
  { value: 4, suffix: "", label: "Generationen Familienbetrieb", accent: "#f1650f" },
  { value: 3, suffix: "", label: "Sparten unter einem Dach", accent: "#ffa200" },
  { value: 100, suffix: "%", label: "Meisterbetrieb", accent: "#0e2a5e" },
];

export const processSteps = [
  {
    n: "01",
    title: "Anfrage & Kennenlernen",
    text: "Sie schildern uns Ihr Vorhaben – telefonisch oder über das Formular. Wir melden uns schnell zurück.",
  },
  {
    n: "02",
    title: "Beratung vor Ort",
    text: "Ein Meister kommt zu Ihnen, nimmt auf und berät Sie ehrlich zu Technik, Ablauf und Kosten.",
  },
  {
    n: "03",
    title: "Festes Angebot",
    text: "Sie erhalten ein transparentes, verbindliches Angebot – ohne versteckte Posten.",
  },
  {
    n: "04",
    title: "Umsetzung & Service",
    text: "Wir setzen sauber und termintreu um – und sind auch nach der Abnahme für Sie da.",
  },
];

// PLATZHALTER — vor Livegang durch echte Kundenbewertungen ersetzen.
export const testimonials = [
  {
    quote:
      "Vom ersten Termin bis zur Abnahme alles perfekt organisiert. Unser neues Bad ist ein Traum – pünktlich und sauber gearbeitet.",
    name: "Familie K.",
    place: "Dortmund-Hörde",
    service: "Komplettbadsanierung",
  },
  {
    quote:
      "Die neue Heizung läuft top und unsere Kosten sind spürbar gesunken. Kompetente Beratung, faire Preise, echter Meisterbetrieb.",
    name: "M. Schneider",
    place: "Dortmund",
    service: "Heizungstechnik",
  },
  {
    quote:
      "Seit Jahren unser verlässlicher Partner für Sanitär und Wartung. Man merkt die Erfahrung von über 100 Jahren.",
    name: "H. Wagner",
    place: "Dortmund-Aplerbeck",
    service: "Sanitärtechnik",
  },
];

export const partners = [
  { name: "Geberit", src: "/logos/geberit.svg" },
  { name: "Duravit", src: "/logos/duravit.svg" },
  { name: "Hansgrohe", src: "/logos/hansgrohe.svg" },
  { name: "Dornbracht", src: "/logos/dornbracht.svg" },
  { name: "Ideal Standard", src: "/logos/ideal-standard.svg" },
  { name: "Keuco", src: "/logos/keuco.jpg" },
  { name: "Viega", src: "/logos/viega.svg" },
  { name: "Keramag", src: "/logos/keramag.png" },
  { name: "HSK", src: "/logos/hsk.svg" },
  { name: "Pressalit", src: "/logos/pressalit-new.svg" },
];
