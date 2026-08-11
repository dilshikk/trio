import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const rendered = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      rendered.current.x = lerp(rendered.current.x, pos.current.x, 0.12);
      rendered.current.y = lerp(rendered.current.y, pos.current.y, 0.12);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${rendered.current.x}px, ${rendered.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor]");
      if (interactive) {
        setIsHovering(true);
        setLabel(interactive.getAttribute("data-cursor"));
      } else {
        setIsHovering(false);
        setLabel(null);
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      style={{ willChange: "transform" }}
    >
      <motion.div
        animate={{
          width: isHovering ? (label ? 72 : 40) : 8,
          height: isHovering ? (label ? 72 : 40) : 8,
          opacity: 1,
        }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const }}
        className="rounded-full border border-white/60 flex items-center justify-center"
        style={{
          background: isHovering ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.9)",
          backdropFilter: isHovering ? "blur(4px)" : "none",
        }}
      >
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-semibold tracking-[0.15em] text-white uppercase"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
