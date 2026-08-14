import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export default function PreloaderDemo() {
  const [phase, setPhase] = useState<"intro" | "done">("intro");
  const restart = () => setPhase("intro");
  return (
    <div className="relative w-full h-screen bg-[oklch(0.06_0_0)] overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="wait">
        {phase === "intro" && <DemoPreloader key="preloader" onComplete={() => setPhase("done")} />}
        {phase === "done" && (
          <motion.div key="site" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="flex flex-col items-center gap-6 text-center">
            <p className="text-[11px] tracking-[0.3em] text-white/40 uppercase">Сайт открылся</p>
            <h1 className="text-[clamp(32px,5vw,72px)] font-bold tracking-[-0.03em] text-white leading-[0.9]">TRIO GROUPS</h1>
            <p className="text-[13px] text-white/30 max-w-xs">Preloader завершён. Логотип вошёл из глубины и сайт раскрылся.</p>
            <button onClick={restart} className="mt-4 text-[10px] tracking-[0.25em] uppercase border border-white/20 text-white/60 hover:text-white hover:border-white/50 transition-all duration-300 px-6 py-3">ПОВТОРИТЬ ДЕМО</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DemoPreloader({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div className="absolute inset-0 flex items-center justify-center bg-[oklch(0.04_0_0)] z-50" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}>
      <motion.div className="absolute rounded-full pointer-events-none" style={{ width: 600, height: 600, background: "radial-gradient(circle, rgba(99,149,255,0.06) 0%, transparent 70%)" }} initial={{ opacity: 0, scale: 0.2 }} animate={{ opacity: [0, 1, 0.4], scale: [0.2, 1.5, 1] }} transition={{ duration: 2.2, times: [0, 0.5, 1], ease: "easeOut" as const }} />
      {[0, 1, 2].map((i) => (<motion.div key={i} className="absolute left-0 right-0 h-[1px] bg-white pointer-events-none" style={{ top: `${30 + i * 20}%` }} initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: [0, 1, 0], opacity: [0, 0.06, 0] }} transition={{ duration: 1.8, delay: 0.3 + i * 0.1, ease: "easeInOut" as const }} />))}
      <motion.div className="relative flex items-center justify-center" initial={{ scale: 0.04, opacity: 0, filter: "blur(20px)" }} animate={{ scale: [0.04, 0.12, 0.38, 0.32], opacity: [0, 0.7, 1, 1], filter: ["blur(20px)", "blur(8px)", "blur(0px)", "blur(0px)"] }} transition={{ duration: 2.4, times: [0, 0.25, 0.7, 1], ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }} onAnimationComplete={() => { setTimeout(onComplete, 600); }}>
        <img src="https://hercules-cdn.com/file_w4ZtbBGahZ97utUXzF4gFXcB" alt="TRIO GROUPS emblem" className="w-[500px] h-[500px] object-contain select-none" style={{ filter: "drop-shadow(0 0 60px rgba(99,149,255,0.25)) drop-shadow(0 0 120px rgba(220,178,90,0.15))" }} draggable={false} />
      </motion.div>
      <motion.div className="absolute flex flex-col items-center gap-2" style={{ top: "62%" }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.6, ease: [0.25, 0.1, 0.25, 1] as const }}>
        <div className="flex gap-[4px] justify-center mb-2"><div className="w-[5px] h-[5px] rounded-full bg-[#6395ff]/80" /><div className="w-[5px] h-[5px] rounded-full bg-[#dcb25a]/80" /><div className="w-[5px] h-[5px] rounded-full bg-[#c4c4c4]/80" /></div>
        <span className="text-[12px] font-semibold tracking-[0.35em] text-white/80 uppercase">TRIO GROUPS</span>
        <span className="text-[9px] tracking-[0.25em] text-white/30 uppercase">Logistics · Accounting · Consulting</span>
      </motion.div>
    </motion.div>
  );
}
