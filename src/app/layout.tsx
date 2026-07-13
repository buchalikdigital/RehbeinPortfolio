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

const SITE = "https://www.freitag-dortmund.de";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Heinrich Freitag GmbH — Bad, Heizung & Solar in Dortmund seit 1907",
    template: "%s | Heinrich Freitag GmbH",
  },
  description:
    "Meisterbetrieb für Komplettbadsanierung, Heizungs-, Sanitär- und Solartechnik in Dortmund. Familientradition seit 1907. Jetzt kostenloses Angebot anfordern.",
  keywords: [
    "Sanitär Dortmund",
    "Heizung Dortmund",
    "Badsanierung Dortmund",
    "Solartechnik Dortmund",
    "Klempner Dortmund",
    "Heinrich Freitag",
  ],
  authors: [{ name: "Heinrich Freitag GmbH" }],
  alternates: { canonical: SITE },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE,
    siteName: "Heinrich Freitag GmbH",
    title: "Bad, Heizung & Solar in Dortmund — seit 1907",
    description:
      "Meisterbetrieb für Komplettbadsanierung, Heizungs-, Sanitär- und Solartechnik in Dortmund. Familientradition seit 1907.",
  },
  robots: { index: true, follow: true },
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
