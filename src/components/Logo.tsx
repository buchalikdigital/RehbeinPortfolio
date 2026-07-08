import { colors } from "@/lib/theme";

type LogoProps = {
  variant?: "full" | "mark";
  theme?: "light" | "dark";
  size?: number;
};

export default function Logo({ variant = "full", theme = "light", size = 30 }: LogoProps) {
  const wordColor = theme === "dark" ? "#fff" : colors.navy;
  const tagColor = theme === "dark" ? colors.gold : colors.orange;

  const icons = (
    <div style={{ display: "flex", alignItems: "center", gap: "0.3em" }}>
      {/* Sanitär — Welle */}
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
        <circle cx="16" cy="16" r="16" fill={colors.navy} />
        <path
          d="M6 14c2 -3 4 -3 6 0s4 3 6 0 4 -3 6 0"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M6 20c2 -3 4 -3 6 0s4 3 6 0 4 -3 6 0"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>

      {/* Solar — Sonnenstrahlen */}
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
        <circle cx="16" cy="16" r="16" fill={colors.gold} />
        <circle cx="16" cy="22" r="4" fill="#fff" />
        {[-60, -35, -10, 15, 40].map((angle) => (
          <line
            key={angle}
            x1="16"
            y1="22"
            x2={16 + 13 * Math.cos((angle * Math.PI) / 180)}
            y2={22 - 13 * Math.sin((angle * Math.PI) / 180) - 8}
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
      </svg>

      {/* Heizung — Flamme */}
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
        <circle cx="16" cy="16" r="16" fill={colors.orange} />
        <path
          d="M16 7c-1 3 -5 5 -5 10a5 5 0 0010 0c0-2-1-3-1.5-4 0 2-1 3-2 3 .8-2-.5-4-1.5-9z"
          fill="#fff"
        />
      </svg>
    </div>
  );

  if (variant === "mark") return icons;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
      {icons}
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span
          style={{
            fontFamily: "var(--font-fredoka), ui-rounded, system-ui, sans-serif",
            fontSize: `${size * 1.15}px`,
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
            fontSize: `${size * 0.32}px`,
            fontWeight: 600,
            color: tagColor,
            letterSpacing: "0.06em",
            marginTop: "0.2em",
          }}
        >
          Sanitär <span style={{ color: colors.gold }}>·</span> Solar{" "}
          <span style={{ color: colors.gold }}>·</span> Heizung
        </span>
      </div>
    </div>
  );
}
