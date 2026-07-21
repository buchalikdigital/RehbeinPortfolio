import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Fiktives Demo-/Portfolio-Projekt — keine echte Domain, kein echtes Unternehmen.
const SITE = "https://www.rehbein-bochum.de";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Rehbein Sanitär & Heizung GmbH — Bad, Heizung & Solar in Bochum seit 1934",
    template: "%s | Rehbein Sanitär & Heizung GmbH",
  },
  description:
    "Meisterbetrieb für Komplettbadsanierung, Heizungs-, Sanitär- und Solartechnik in Bochum. Familientradition seit 1934. Jetzt kostenloses Angebot anfordern.",
  keywords: [
    "Sanitär Bochum",
    "Heizung Bochum",
    "Badsanierung Bochum",
    "Solartechnik Bochum",
    "Klempner Bochum",
    "Rehbein Sanitär",
  ],
  authors: [{ name: "Rehbein Sanitär & Heizung GmbH" }],
  alternates: { canonical: SITE },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE,
    siteName: "Rehbein Sanitär & Heizung GmbH",
    title: "Bad, Heizung & Solar in Bochum — seit 1934",
    description:
      "Meisterbetrieb für Komplettbadsanierung, Heizungs-, Sanitär- und Solartechnik in Bochum. Familientradition seit 1934.",
  },
  // Fiktives Demo-Projekt — bewusst von der Indexierung ausgeschlossen.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0E2A5E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${manrope.variable} ${inter.variable} antialiased`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
