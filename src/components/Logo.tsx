"use client";

import { useId } from "react";
import { colors } from "@/lib/theme";

type LogoProps = {
  variant?: "full" | "mark";
  theme?: "light" | "dark";
  size?: number;
};

export default function Logo({
  variant = "full",
  theme = "light",
  size = 26,
}: LogoProps) {
  const uid = useId().replace(/:/g, "");
  const dropGrad = `dg-${uid}`;
  const badgeGrad = `bg-${uid}`;

  const wordColor = theme === "dark" ? "#ffffff" : colors.navy;
  const tagColor = theme === "dark" ? "#DCE6F7" : colors.navy;

  // Ein einziges, durchgängiges Emblem statt drei getrennter Kreise:
  // eine Flamme/Tropfen-Silhouette mit Verlauf von Gold (Sonne/Wärme oben)
  // über Orange zu Navy-Blau (Wasser unten) — Sanitär, Solar und Heizung
  // als ein gemeinsames Zeichen statt drei einzelner Icons.
  const badge = size * 1.9;

  const icons = (
    <svg width={badge} height={badge} viewBox="0 0 40 40" aria-hidden>
      <defs>
        <linearGradient id={badgeGrad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={colors.navyMid} />
          <stop offset="100%" stopColor={colors.navyDeep} />
        </linearGradient>
        <linearGradient id={dropGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFB733" />
          <stop offset="42%" stopColor="#F1650F" />
          <stop offset="100%" stopColor="#5FA0E8" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="40" height="40" rx="11" fill={`url(#${badgeGrad})`} />
      <path
        d="M20 7c4.2 6 8.5 10.4 8.5 16.2a8.5 8.5 0 0 1-17 0C11.5 17.4 15.8 13 20 7z"
        fill={`url(#${dropGrad})`}
      />
      <path
        d="M20 13.5c1.6 2.4 3.3 4.3 3.3 7a3.3 3.3 0 0 1-6.6 0c0-1 .3-1.8.7-2.6.15 1 .7 1.6 1.3 1.6-.7-1.3.1-3.3 1.3-6z"
        fill="#ffffff"
        opacity="0.9"
      />
    </svg>
  );

  if (variant === "mark") return icons;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: `${size * 0.12}px` }}>
      {icons}
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: `${size * 1.55}px`,
            fontWeight: 700,
            color: wordColor,
            letterSpacing: "-0.01em",
          }}
        >
          Rehbein
        </span>
        <span
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: `${size * 0.42}px`,
            fontWeight: 700,
            color: tagColor,
            letterSpacing: "0.01em",
            marginTop: `${size * 0.14}px`,
            display: "flex",
            alignItems: "center",
            gap: `${size * 0.12}px`,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ color: colors.navy === wordColor ? colors.navy : "#7FA8E6" }}>•</span> Sanitär
          <span style={{ color: colors.gold }}>•</span> Solar
          <span style={{ color: colors.orange }}>•</span> Heizung
        </span>
      </div>
    </div>
  );
}
