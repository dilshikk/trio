import {
  changeLocale,
  setLocaleInPath,
  SUPPORTED_LOCALES,
  SUPPORTED_LOCALES_ARRAY,
  type SupportedLocale,
} from "@/i18n";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function LocaleSwitcher() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentMeta = SUPPORTED_LOCALES[i18n.language as keyof typeof SUPPORTED_LOCALES]
    ?? SUPPORTED_LOCALES.en;

  const handleChangeLocale = async (newLng: SupportedLocale) => {
    await changeLocale(newLng);
    const newPath = setLocaleInPath(newLng, location.pathname, location.search, location.hash);
    navigate(newPath);
    setOpen(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-[11px] font-medium tracking-[0.15em] text-white/50 hover:text-white/90 transition-colors duration-300 uppercase border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-sm"
      >
        <span>{currentMeta.emoji}</span>
        <span className="hidden sm:inline">{currentMeta.nativeName}</span>
        <svg
          width="8"
          height="5"
          viewBox="0 0 8 5"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="absolute right-0 top-full mt-2 w-48 border border-white/10 z-[100] overflow-hidden"
            style={{ background: "oklch(0.08 0 0 / 0.97)", backdropFilter: "blur(20px)" }}
          >
            {SUPPORTED_LOCALES_ARRAY.map((lng) => {
              const meta = SUPPORTED_LOCALES[lng];
              const isActive = i18n.language === lng;
              return (
                <button
                  key={lng}
                  onClick={() => { void handleChangeLocale(lng); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-200 ${
                    isActive
                      ? "text-white bg-white/5"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="text-base">{meta.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-semibold tracking-[0.1em] uppercase truncate">
                      {meta.nativeName}
                    </div>
                    <div className="text-[10px] text-white/30 truncate">{meta.name}</div>
                  </div>
                  {isActive && (
                    <svg width="10" height="8" viewBox="0 0 10 8" className="flex-shrink-0">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
