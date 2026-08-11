import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [exitPhase, setExitPhase] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setExitPhase(true), 2800);
    const t2 = setTimeout(() => onComplete(), 3900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exitPhase ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-[oklch(0.04_0_0)] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 700,
              height: 700,
              background:
                "radial-gradient(circle, rgba(99,149,255,0.07) 0%, rgba(220,178,90,0.04) 40%, transparent 70%)",
            }}
            initial={{ opacity: 0, scale: 0.15 }}
            animate={{ opacity: [0, 1, 0.5], scale: [0.15, 1.6, 1.1] }}
            transition={{ duration: 2.6, times: [0, 0.5, 1], ease: "easeOut" as const }}
          />
          {[28, 50, 72].map((top, i) => (
            <motion.div
              key={i}
              className="absolute left-0 right-0 h-[1px] bg-white pointer-events-none"
              style={{ top: `${top}%` }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1, 0], opacity: [0, 0.07, 0] }}
              transition={{ duration: 2.0, delay: 0.2 + i * 0.12, ease: "easeInOut" as const }}
            />
          ))}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ scale: 0.03, opacity: 0, filter: "blur(24px)" }}
            animate={{
              scale: [0.03, 0.1, 0.42, 0.36],
              opacity: [0, 0.6, 1, 1],
              filter: ["blur(24px)", "blur(10px)", "blur(0px)", "blur(0px)"],
            }}
            transition={{ duration: 2.6, times: [0, 0.22, 0.72, 1], ease: [0.16, 1, 0.3, 1] as const, delay: 0.15 }}
          >
            <img
              src="https://hercules-cdn.com/file_exMhy8nexpXEXJmG0mlYSQKH"
              alt="TRIO GROUPS"
              className="w-[560px] h-[560px] object-contain select-none"
              style={{
                filter: "drop-shadow(0 0 80px rgba(99,149,255,0.28)) drop-shadow(0 0 160px rgba(220,178,90,0.14))",
              }}
              draggable={false}
            />
          </motion.div>
          <motion.div
            className="absolute flex flex-col items-center gap-2"
            style={{ top: "calc(50% + 115px)" }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.8, ease: [0.25, 0.1, 0.25, 1] as const }}
          >
            <div className="flex gap-[4px] justify-center mb-2">
              <motion.div
                className="w-[5px] h-[5px] rounded-full bg-[#6395ff]"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="w-[5px] h-[5px] rounded-full bg-[#dcb25a]"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              />
              <motion.div
                className="w-[5px] h-[5px] rounded-full bg-[#c4c4c4]"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              />
            </div>
            <span className="text-[13px] font-semibold tracking-[0.38em] text-white/85 uppercase">TRIO GROUPS</span>
            <span className="text-[9px] tracking-[0.28em] text-white/30 uppercase">
              Logistics · Accounting · Consulting
            </span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
