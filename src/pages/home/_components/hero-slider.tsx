import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { Canvas } from "@react-three/fiber";
import { useTranslation } from "react-i18next";
import LogisticsScene from "./scenes/logistics-scene.tsx";
import AccountingScene from "./scenes/accounting-scene.tsx";
import ConsultingScene from "./scenes/consulting-scene.tsx";

type SlideIndex = 0 | 1 | 2;

const SLIDE_ACCENTS = [
  { accent: "oklch(0.65 0.2 240)", accentRgb: "99, 149, 255", href: "#logistics" },
  { accent: "oklch(0.78 0.15 75)", accentRgb: "220, 178, 90", href: "#accounting" },
  { accent: "oklch(0.78 0 0)", accentRgb: "196, 196, 196", href: "#consulting" },
] as const;

export default function HeroSlider() {
  const { t } = useTranslation("common");
  const [activeSlide, setActiveSlide] = useState<SlideIndex>(0);
  const [prevSlide, setPrevSlide] = useState<SlideIndex | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 30 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mouseX.set((e.clientX - cx) / cx);
    mouseY.set((e.clientY - cy) / cy);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const goToSlide = useCallback((index: SlideIndex) => {
    if (transitioning || index === activeSlide) return;
    setTransitioning(true);
    setPrevSlide(activeSlide);
    setActiveSlide(index);
    setTimeout(() => { setTransitioning(false); setPrevSlide(null); }, 1400);
  }, [activeSlide, transitioning]);

  useEffect(() => {
    const timer = setInterval(() => { goToSlide(((activeSlide + 1) % 3) as SlideIndex); }, 7000);
    return () => clearInterval(timer);
  }, [activeSlide, goToSlide]);

  void prevSlide;
  const current = SLIDE_ACCENTS[activeSlide];
  const slideNum = activeSlide + 1;

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[oklch(0.06_0_0)]" style={{ minHeight: "100svh" }}>
      <div className="absolute inset-0 z-[1]">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]} style={{ background: "transparent" }}>
          <AnimatePresence mode="wait">
            {activeSlide === 0 && <LogisticsScene key="logistics" mouseX={smoothX} mouseY={smoothY} />}
            {activeSlide === 1 && <AccountingScene key="accounting" mouseX={smoothX} mouseY={smoothY} />}
            {activeSlide === 2 && <ConsultingScene key="consulting" mouseX={smoothX} mouseY={smoothY} />}
          </AnimatePresence>
        </Canvas>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={`atmo-${activeSlide}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.8, ease: "easeInOut" as const }} className="absolute inset-0 z-[2] pointer-events-none" style={{ background: `radial-gradient(ellipse 70% 70% at 60% 50%, rgba(${current.accentRgb}, 0.06) 0%, transparent 70%)` }} />
      </AnimatePresence>
      <div className="absolute inset-0 z-[2] pointer-events-none opacity-[0.04]" style={{ backgroundImage: "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      <div className="absolute bottom-0 left-0 right-0 h-48 z-[3] pointer-events-none" style={{ background: "linear-gradient(to top, oklch(0.08 0 0), transparent)" }} />
      <div className="relative z-[10] h-full flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-16 lg:px-24">
        <AnimatePresence mode="wait">
          <motion.div key={`content-${activeSlide}`} className="max-w-[1400px] w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] as const }} className="flex items-center gap-3 mb-6">
              <span className="text-[11px] font-semibold tracking-[0.3em] uppercase" style={{ color: current.accent }}>{t(`hero.slide${slideNum}.label`)}</span>
              <div className="h-[1px] w-12 bg-white/20" />
              <span className="text-[11px] tracking-[0.2em] text-white/30 uppercase">{t(`hero.slide${slideNum}.headline`)}</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h1 initial={{ y: 120, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -80, opacity: 0 }} transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }} className="text-[clamp(48px,8vw,130px)] font-bold leading-[0.92] tracking-[-0.03em] text-white mb-6 whitespace-pre-line">{t(`hero.slide${slideNum}.subheadline`)}</motion.h1>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 sm:gap-16 mt-8">
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 0.55, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.8, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] as const }} className="text-[14px] leading-relaxed max-w-xs font-light text-white">{t(`hero.slide${slideNum}.description`)}</motion.p>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.8, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] as const }}>
                <a href={current.href} onClick={(e) => { e.preventDefault(); document.querySelector(current.href)?.scrollIntoView({ behavior: "smooth" }); }} className="group flex items-center gap-3 text-[11px] font-semibold tracking-[0.25em] uppercase text-white/80 hover:text-white transition-colors duration-300" data-cursor="EXPLORE">
                  <span className="w-8 h-[1px] group-hover:w-14 transition-all duration-500 ease-out" style={{ background: current.accent }} />
                  {t(`hero.slide${slideNum}.cta`)}
                  <svg width="10" height="10" viewBox="0 0 10 10" className="group-hover:translate-x-1 transition-transform duration-300"><path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" fill="none" /></svg>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-[20] flex flex-col items-center gap-5">
        {SLIDE_ACCENTS.map((slide, i) => (
          <button key={i} onClick={() => goToSlide(i as SlideIndex)} className="flex flex-col items-center gap-1.5 group" aria-label={`Slide ${i + 1}`}>
            <motion.div animate={{ height: activeSlide === i ? 32 : 16, opacity: activeSlide === i ? 1 : 0.3 }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }} className="w-[1.5px] rounded-full" style={{ background: activeSlide === i ? slide.accent : "white" }} />
            <span className="text-[9px] font-semibold tracking-[0.15em] transition-opacity duration-300" style={{ color: activeSlide === i ? slide.accent : "white", opacity: activeSlide === i ? 1 : 0.3 }}>{`0${i + 1}`}</span>
          </button>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] z-[20] bg-white/5">
        <motion.div key={`progress-${activeSlide}`} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 7, ease: "linear" as const }} className="h-full origin-left" style={{ background: current.accent }} />
      </div>
      <div className="absolute bottom-8 md:bottom-10 right-6 md:right-10 z-[20] flex items-center gap-2 text-[11px] tracking-[0.2em] text-white/30 font-light">
        <AnimatePresence mode="wait"><motion.span key={activeSlide} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }} style={{ color: current.accent }}>{`0${slideNum}`}</motion.span></AnimatePresence>
        <span>/</span><span>03</span>
      </div>
    </section>
  );
}
