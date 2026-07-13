"use client";

import { useId } from "react";
import { colors } from "@/lib/theme";

type LogoProps = {
  variant?: "full" | "mark";
  theme?: "light" | "dark";
  size?: number;
};

const RAY_COLORS = ["#F1650F", "#F5822E", "#FF9A1F", "#FFA200", "#FFB733"];
const RAY_ANGLES = [11, 28, 45, 62, 79]; // degrees, fanning up-right

function solarRays() {
  const O = { x: 6.6, y: 22.5 }; // origin: lower-left
  const inner = 3.4;
  const outer = 20;
  return RAY_ANGLES.map((deg) => {
    const a = (deg * Math.PI) / 180;
    const dx = Math.cos(a);
    const dy = -Math.sin(a); // up = negative y
    const px = -dy;
    const py = dx; // perpendicular
    const ihw = 0.55; // inner half-width
    const ohw = 1.75; // outer half-width (tapered wider)
    const ix = O.x + dx * inner;
    const iy = O.y + dy * inner;
    const ox = O.x + dx * outer;
    const oy = O.y + dy * outer;
    const pts = [
      [ix + px * ihw, iy + py * ihw],
      [ox + px * ohw, oy + py * ohw],
      [ox - px * ohw, oy - py * ohw],
      [ix - px * ihw, iy - py * ihw],
    ];
    return pts.map((p) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ");
  });
}

export default function Logo({
  variant = "full",
  theme = "light",
  size = 26,
}: LogoProps) {
  const uid = useId().replace(/:/g, "");
  const waterClip = `wc-${uid}`;
  const sunClip = `sc-${uid}`;
  const flameGrad = `fg-${uid}`;

  const wordColor = theme === "dark" ? "#ffffff" : colors.navy;
  const tagColor = theme === "dark" ? "#DCE6F7" : colors.navy;
  const rays = solarRays();

  const circle = size; // each emblem circle diameter
  const gap = size * 0.2;

  const icons = (
    <div style={{ display: "flex", alignItems: "center", gap: `${gap}px` }}>
      {/* 1 — Sanitär / Wasser */}
      <svg width={circle} height={circle} viewBox="0 0 32 32" aria-hidden>
        <defs>
          <clipPath id={waterClip}>
            <circle cx="16" cy="16" r="16" />
          </clipPath>
        </defs>
        <circle cx="16" cy="16" r="16" fill={colors.navy} />
        <g clipPath={`url(#${waterClip})`}>
          {/* bold filled water wave */}
          <path
            d="M-3 13 Q 3 8.5 8 12.5 T 18 12.5 T 28 12.5 T 38 12.5 L 38 20.5 Q 32 25.5 27 21.5 T 17 21.5 T 7 21.5 T -3 21.5 Z"
            fill="#ffffff"
          />
          {/* small crest line above */}
          <path
            d="M2 8.5 Q 7 5 12 8 T 22 8"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.7"
            strokeLinecap="round"
            opacity="0.55"
          />
        </g>
      </svg>

      {/* 2 — Solar / Sonnenstrahlen */}
      <svg width={circle} height={circle} viewBox="0 0 32 32" aria-hidden>
        <defs>
          <clipPath id={sunClip}>
            <circle cx="16" cy="16" r="16" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${sunClip})`}>
          {rays.map((pts, i) => (
            <polygon key={i} points={pts} fill={RAY_COLORS[i]} />
          ))}
        </g>
      </svg>

      {/* 3 — Heizung / Flamme */}
      <svg width={circle} height={circle} viewBox="0 0 32 32" aria-hidden>
        <defs>
          <linearGradient id={flameGrad} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFA328" />
            <stop offset="55%" stopColor="#F1650F" />
            <stop offset="100%" stopColor="#DA350B" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="16" fill={`url(#${flameGrad})`} />
        <path
          d="M16.5 5.5c.6 3.4 4.2 5 4.2 9.4a4.7 4.7 0 0 1-9.4 0c0-1.8.8-2.9 1.6-3.9.2 1.7 1 2.5 1.9 2.5-1-1.9.1-4.9 1.7-8z"
          fill="#ffffff"
        />
      </svg>
    </div>
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
          Freitag
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
