import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import Navigation from "@/components/navigation.tsx";
import Preloader from "@/components/preloader.tsx";
import HeroSlider from "./home/_components/hero-slider.tsx";
import Footer from "./home/_components/footer.tsx";
import { EditModeProvider } from "@/components/edit-mode-provider.tsx";
import AdminBar from "@/components/admin-bar.tsx";
import { changeLocale, isSupportedLocale } from "@/i18n.ts";
import { useTranslation } from "react-i18next";
import EditableText from "@/components/editable-text.tsx";

const SUPPORTED_LOCALES = ["ru", "uz", "en", "oz"];

const DIRECTIONS = [
  {
    number: "01",
    path: "/logistics",
    accent: "#6395ff",
    tKeyTitle: "services.1.title",
    tKeyDesc: "services.1.desc",
    pillarsKey: "services.1.pillars",
  },
  {
    number: "02",
    path: "/accounting",
    accent: "#dcb25a",
    tKeyTitle: "services.2.title",
    tKeyDesc: "services.2.desc",
    pillarsKey: "services.2.pillars",
  },
  {
    number: "03",
    path: "/consulting",
    accent: "#c4c4c4",
    tKeyTitle: "services.3.title",
    tKeyDesc: "services.3.desc",
    pillarsKey: "services.3.pillars",
  },
];

function DirectionCard({
  dir,
  prefix,
  index,
}: {
  dir: (typeof DIRECTIONS)[0];
  prefix: string;
  index: number;
}) {
  const { t } = useTranslation("common");
  const pillars = t(dir.pillarsKey).split(",");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
      className="group border-t border-white/8 pt-10 pb-10 flex flex-col lg:flex-row gap-8 lg:gap-20 hover:border-white/20 transition-colors duration-500"
    >
      {/* Left: number + title */}
      <div className="flex-shrink-0 w-full lg:w-72">
        <div className="flex items-baseline gap-4 mb-5">
          <span
            className="text-[11px] font-semibold tracking-[0.25em] tabular-nums"
            style={{ color: dir.accent }}
          >
            {dir.number}
          </span>
          <h2 className="text-[clamp(22px,3vw,36px)] font-bold tracking-[-0.02em] text-white leading-[1]">
            <EditableText tKey={dir.tKeyTitle} />
          </h2>
        </div>
        <p className="text-[13px] text-white/40 font-light leading-relaxed max-w-xs">
          <EditableText tKey={dir.tKeyDesc} />
        </p>
      </div>

      {/* Right: pillars + CTA */}
      <div className="flex-1 flex flex-col justify-between gap-8">
        <div className="flex flex-wrap gap-2">
          {pillars.map((p) => (
            <span
              key={p}
              className="text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 border"
              style={{ color: dir.accent + "90", borderColor: dir.accent + "30" }}
            >
              {p.trim()}
            </span>
          ))}
        </div>

        <Link
          to={`${prefix}${dir.path}`}
          className="group/cta inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.25em] uppercase text-white/40 hover:text-white transition-colors duration-300 self-start"
        >
          <span
            className="w-8 h-[1px] transition-all duration-500 group-hover/cta:w-12"
            style={{ background: dir.accent }}
          />
          ПОДРОБНЕЕ
        </Link>
      </div>
    </motion.div>
  );
}

export default function Index() {
  const { locale } = useParams<{ locale?: string }>();
  const [preloaderDone, setPreloaderDone] = useState(false);
  const prefix = locale && SUPPORTED_LOCALES.includes(locale) ? `/${locale}` : "";
  const { t } = useTranslation("common");
  void t;

  useEffect(() => {
    if (locale && isSupportedLocale(locale)) void changeLocale(locale);
  }, [locale]);

  return (
    <EditModeProvider>
      <AnimatePresence>
        {!preloaderDone && (
          <Preloader key="preloader" onComplete={() => setPreloaderDone(true)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {preloaderDone && (
          <motion.main
            key="site"
            className="bg-background text-foreground min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as const }}
          >
            <Navigation />

            {/* Hero — full-screen 3D slider */}
            <HeroSlider />

            {/* Directions overview */}
            <section className="px-6 md:px-16 lg:px-24 py-20 max-w-[1600px] mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
                className="mb-16"
              >
                <p className="text-[10px] tracking-[0.4em] uppercase text-white/25 mb-3">
                  <EditableText tKey="services.eyebrow" />
                </p>
                <h2 className="text-[clamp(28px,4vw,52px)] font-bold tracking-[-0.03em] text-white leading-[0.95]">
                  <EditableText tKey="services.headline" />
                </h2>
              </motion.div>

              <div className="flex flex-col gap-0">
                {DIRECTIONS.map((dir, i) => (
                  <DirectionCard key={dir.number} dir={dir} prefix={prefix} index={i} />
                ))}
              </div>
            </section>

            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
      <AdminBar />
    </EditModeProvider>
  );
}
