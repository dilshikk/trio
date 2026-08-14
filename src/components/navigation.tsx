import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import EditableText from "@/components/editable-text.tsx";
import LocaleSwitcher from "@/components/locale-switcher.tsx";

const SUPPORTED_LOCALES = ["ru", "uz", "en", "oz"];

const NAV_LINKS = [
  { key: "nav.logistics", path: "/logistics" },
  { key: "nav.accounting", path: "/accounting" },
  { key: "nav.consulting", path: "/consulting" },
  { key: "nav.about", path: "/about" },
  { key: "nav.contact", path: "/contact" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { t } = useTranslation("common");
  void t;
  const { locale } = useParams<{ locale?: string }>();
  const prefix = locale && SUPPORTED_LOCALES.includes(locale) ? `/${locale}` : "";
  const bgOpacity = useTransform(scrollY, [0, 120], [0, 1]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10"
        style={{ paddingTop: "clamp(16px, 2.5vw, 28px)", paddingBottom: "clamp(12px, 2vw, 20px)" }}
      >
        <motion.div
          className="absolute inset-0 border-b border-white/5"
          style={{ opacity: bgOpacity, background: "oklch(0.08 0 0 / 0.85)", backdropFilter: "blur(20px)" }}
        />
        <div className="relative flex items-center justify-between max-w-[1600px] mx-auto">
          <Link
            to={`${prefix}/`}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <img
              src="/images/logo.png"
              alt="TRIO GROUPS"
              className="h-8 w-8 object-contain select-none flex-shrink-0 transition-all duration-500 group-hover:drop-shadow-[0_0_10px_rgba(99,149,255,0.5)]"
              draggable={false}
            />
            <span className="text-[13px] font-semibold tracking-[0.2em] text-white uppercase">TRIO GROUPS</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                to={`${prefix}${link.path}`}
                onClick={() => setMenuOpen(false)}
                className="text-[11px] font-medium tracking-[0.18em] text-white/50 hover:text-white/90 transition-colors duration-300 uppercase cursor-pointer"
              >
                <EditableText tKey={link.key} />
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <LocaleSwitcher />
            <Link
              to={`${prefix}/contact`}
              className="text-[11px] font-semibold tracking-[0.2em] uppercase border border-white/20 text-white/80 hover:border-white/60 hover:text-white transition-all duration-300 px-5 py-2.5 rounded-sm cursor-pointer"
            >
              <EditableText tKey="nav.cta" />
            </Link>
          </div>

          {/* Mobile burger */}
          <div className="flex lg:hidden items-center gap-3">
            <LocaleSwitcher />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-[5px] p-2 cursor-pointer"
              aria-label="Toggle menu"
            >
              <motion.div animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} className="w-5 h-[1.5px] bg-white origin-center" />
              <motion.div animate={{ opacity: menuOpen ? 0 : 1 }} className="w-5 h-[1.5px] bg-white" />
              <motion.div animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} className="w-5 h-[1.5px] bg-white origin-center" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="fixed inset-0 z-40 flex flex-col justify-center items-center gap-8 lg:hidden"
            style={{ background: "oklch(0.08 0 0 / 0.97)", backdropFilter: "blur(20px)" }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <Link
                  to={`${prefix}${link.path}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-3xl font-light tracking-[0.25em] text-white/70 hover:text-white transition-colors uppercase cursor-pointer"
                >
                  <EditableText tKey={link.key} />
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <Link
                to={`${prefix}/contact`}
                onClick={() => setMenuOpen(false)}
                className="mt-4 text-[11px] font-semibold tracking-[0.25em] uppercase border border-white/20 text-white/80 px-8 py-3 cursor-pointer block"
              >
                <EditableText tKey="nav.cta" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
