"use client";

import { SoundProvider } from "@/components/sound/SoundProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SoundProvider>{children}</SoundProvider>;
}
