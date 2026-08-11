import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    lenisInstance = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });
    const raf = (time: number) => {
      lenisInstance?.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => {
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, []);
  return <>{children}</>;
}
