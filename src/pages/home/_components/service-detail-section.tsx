import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslation } from "react-i18next";

const details = [
  { id: "logistics-detail", number: "01", tKey: "1", accentHex: "#6395ff" },
  { id: "accounting-detail", number: "02", tKey: "2", accentHex: "#dcb25a" },
  { id: "consulting-detail", number: "03", tKey: "3", accentHex: "#c4c4c4" },
];

function DetailItem({ detail }: { detail: typeof details[0] }) {
  const { t } = useTranslation("common");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const benefits = [
    { title: t(`details.${detail.tKey}.b1.title`), body: t(`details.${detail.tKey}.b1.body`) },
    { title: t(`details.${detail.tKey}.b2.title`), body: t(`details.${detail.tKey}.b2.body`) },
    { title: t(`details.${detail.tKey}.b3.title`), body: t(`details.${detail.tKey}.b3.body`) },
    { title: t(`details.${detail.tKey}.b4.title`), body: t(`details.${detail.tKey}.b4.body`) },
  ];

  return (
    <motion.div ref={ref} id={detail.id} className="relative py-24 border-t border-white/6">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.04]" style={{ background: `radial-gradient(circle, ${detail.accentHex} 0%, transparent 70%)`, transform: "translate(-20%, -20%)" }} />
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }} className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase" style={{ color: detail.accentHex }}>{detail.number}</span>
          <div className="h-[1px] w-8 bg-white/20" />
          <span className="text-[10px] tracking-[0.2em] text-white/30 uppercase">{t(`services.${detail.tKey}.label`)} — {t("details.inDepth")}</span>
        </div>
        <h3 className="text-[clamp(32px,4.5vw,64px)] font-bold leading-[0.92] tracking-[-0.03em] text-white whitespace-pre-line mb-6">{t(`details.${detail.tKey}.headline`)}</h3>
        <p className="text-[15px] leading-relaxed text-white/50 font-light max-w-xl">{t(`details.${detail.tKey}.overview`)}</p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/6 mb-16">
        {benefits.map((b, i) => (
          <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] as const }} className="bg-[oklch(0.09_0_0)] p-8 space-y-3">
            <div className="w-6 h-[1px]" style={{ background: detail.accentHex }} />
            <h4 className="text-[12px] font-semibold tracking-[0.18em] uppercase text-white">{b.title}</h4>
            <p className="text-[13px] text-white/40 font-light leading-relaxed">{b.body}</p>
          </motion.div>
        ))}
      </div>
      <motion.div style={{ y }} className="relative border border-white/8 p-8 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(${detail.accentHex} 1px, transparent 1px), linear-gradient(90deg, ${detail.accentHex} 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
        <div className="relative flex flex-col sm:flex-row gap-6 sm:gap-12 items-start">
          <div className="flex-shrink-0"><span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: detail.accentHex }}>{t("details.integration")}</span></div>
          <p className="text-[13px] text-white/45 font-light leading-relaxed">{t(`details.${detail.tKey}.integration`)}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ServiceDetailSection() {
  const { t } = useTranslation("common");
  return (
    <section className="relative px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as const }} className="pt-4 pb-4 border-t border-white/6">
        <p className="text-[10px] tracking-[0.35em] text-white/30 uppercase mb-4">{t("details.eyebrow")}</p>
        <h2 className="text-[clamp(32px,4.5vw,60px)] font-bold tracking-[-0.03em] text-white leading-[0.95]">{t("details.title")}<br /><span className="text-white/30">{t("details.titleFaded")}</span></h2>
      </motion.div>
      {details.map((d) => (<DetailItem key={d.id} detail={d} />))}
    </section>
  );
}
