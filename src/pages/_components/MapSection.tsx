import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const ADDRESS = "просп. Мустакиллик, 24, Ташкент";
const MAP_URL =
  "https://yandex.ru/maps?text=41.315843,69.292294&si=981f5g03pp162cvrkw79eq8kdw";
// pt= параметр убран — встроенная метка двигалась вместе с картой.
// Вместо неё используется статичный HTML-бейдж поверх iframe.
const EMBED_URL =
  "https://yandex.ru/map-widget/v1/?ll=69.292294%2C41.315843&z=15&lang=ru_RU&theme=dark&scroll=false";

export default function MapSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const { t } = useTranslation();

  return (
    <section ref={ref} className="relative px-6 md:px-16 lg:px-24 py-24">
      {/* Top label */}
      <div className="max-w-[1400px] mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[10px] tracking-[0.4em] text-white/25 uppercase mb-3"
          >
            {t("map.eyebrow")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.07 }}
            className="text-[clamp(28px,4vw,52px)] font-light tracking-[-0.02em] leading-tight"
          >
            {t("map.title")}
            <br />
            <span className="text-white/25">{t("map.titleFaded")}</span>
          </motion.h2>
        </div>
        <motion.a
          href={MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-2 text-[12px] tracking-[0.15em] text-white/40 hover:text-white/80 transition-colors uppercase group"
        >
          <svg className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
          </svg>
          {ADDRESS}
          <svg className="w-3 h-3 opacity-50 group-hover:opacity-100" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
          </svg>
        </motion.a>
      </div>

      {/* Map container */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] as const }}
        className="max-w-[1400px] mx-auto relative overflow-hidden rounded-2xl"
        style={{ height: "clamp(320px, 45vw, 580px)" }}
      >
        {/* Yandex iframe */}
        <iframe
          src={EMBED_URL}
          title="TRIO GROUPS на карте"
          className="absolute inset-0 w-full h-full border-0"
          style={{ filter: "saturate(0.4) brightness(0.55) contrast(1.1)" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Decorative vignette overlay — поверх карты, ниже пина */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, oklch(0.08 0 0) 100%)",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-16 z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, oklch(0.08 0 0), transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to top, oklch(0.08 0 0), transparent)" }} />

        {/*
          Статичный пин — позиционирован через CSS относительно контейнера,
          не связан с координатами карты, не двигается при панорамировании.
        */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+18px)] z-20 pointer-events-none flex flex-col items-center gap-1">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.4, type: "spring", stiffness: 260, damping: 20 }}
            className="bg-[oklch(0.08_0_0)]/90 border border-white/15 backdrop-blur-md px-4 py-2.5 rounded-xl text-center"
          >
            <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase mb-0.5">TRIO GROUPS</p>
            <p className="text-[12px] text-white/80 font-light">{ADDRESS}</p>
          </motion.div>
          <div className="w-[1.5px] h-4 bg-gradient-to-b from-white/30 to-transparent" />
          <div className="w-2 h-2 rounded-full bg-white/60 shadow-[0_0_12px_4px_rgba(255,255,255,0.25)]" />
        </div>
      </motion.div>
    </section>
  );
}
