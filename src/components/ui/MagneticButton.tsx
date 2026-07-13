"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { useSound } from "@/components/sound/SoundProvider";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  sound?: "click" | "drop" | "whoosh" | false;
  ariaLabel?: string;
};

export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  strength = 0.4,
  sound = false,
  ariaLabel,
}: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { play } = useSound();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  function handleMove(e: MouseEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const commonProps = {
    ref: ref as never,
    className,
    style: { x: sx, y: sy },
    onMouseMove: handleMove,
    onMouseLeave: reset,
    onMouseEnter: () => sound && play("whoosh"),
    onClick: () => {
      if (sound) play(sound);
      onClick?.();
    },
    "aria-label": ariaLabel,
  };

  if (href) {
    return (
      <motion.a href={href} {...commonProps}>
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button type="button" {...commonProps}>
      {children}
    </motion.button>
  );
}
