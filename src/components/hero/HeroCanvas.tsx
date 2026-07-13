"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const GlassScene = dynamic(() => import("./GlassScene"), { ssr: false });

type Mode = "pending" | "high" | "low" | "fallback";

function detectMode(): Mode {
  if (typeof window === "undefined") return "pending";

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return "fallback";

  // WebGL support check
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return "fallback";
  } catch {
    return "fallback";
  }

  const w = window.innerWidth;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const weak =
    (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;

  if (w < 820) return "fallback"; // transmission is too heavy on phones
  if (w < 1200 || weak) return "low";
  return "high";
}

/** Static, GPU-free atmosphere for phones & reduced-motion users. */
function Fallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="blob animate-float"
        style={{
          width: 340,
          height: 340,
          left: "-6%",
          top: "12%",
          background: "radial-gradient(circle, #4a9bff, transparent 70%)",
        }}
      />
      <div
        className="blob animate-pulse-glow"
        style={{
          width: 300,
          height: 300,
          right: "-4%",
          top: "8%",
          background: "radial-gradient(circle, #ffa200, transparent 70%)",
        }}
      />
      <div
        className="blob animate-float"
        style={{
          width: 260,
          height: 260,
          right: "18%",
          bottom: "6%",
          background: "radial-gradient(circle, #f1650f, transparent 70%)",
          animationDelay: "1.2s",
        }}
      />
      <div
        className="blob"
        style={{
          width: 220,
          height: 220,
          left: "22%",
          bottom: "10%",
          background: "radial-gradient(circle, #1b6fd0, transparent 70%)",
          opacity: 0.35,
        }}
      />
    </div>
  );
}

export default function HeroCanvas() {
  const [mode, setMode] = useState<Mode>("pending");
  const [paused, setPaused] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMode(detectMode());
  }, []);

  // Pause the render loop once the hero scrolls out of view.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setPaused(!entry.isIntersecting),
      { threshold: 0.02 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      <div className="absolute -inset-16 blur-[70px]">
        {(mode === "pending" || mode === "fallback") && <Fallback />}
        {(mode === "high" || mode === "low") && (
          <GlassScene quality={mode} paused={paused} />
        )}
      </div>
    </div>
  );
}
