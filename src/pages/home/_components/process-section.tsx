import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const STEPS = ["1", "2", "3", "4", "5"] as const;

export default function ProcessSection() {
  const { t } = useTranslation("common");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative py-32 px-6 md:px-16 lg:px-24 border-t border-white/6">
      <div className="max-w-[1400px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="mb-20">
          <p className="text-[10px] tracking-[0.35em] text-white/30 uppercase mb-4">{t("process.eyebrow")}</p>
          <h2 className="text-[clamp(32px,4.5vw,64px)] font-bold tracking-[-0.03em] text-white leading-[0.95]">{t("process.title")}<br /><span className="text-white/25">{t("process.titleFaded")}</span></h2>
        </motion.div>
        <div className="relative flex flex-col lg:flex-row gap-0">
          <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[1px] bg-white/8">
            <motion.div className="w-full bg-white/40 origin-top" style={{ height: lineHeight }} />
          </div>
          <div className="lg:pl-16 flex flex-col gap-0 w-full">
            {STEPS.map((num, i) => (
              <motion.div key={num} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] as const }} className="group flex items-start gap-8 py-8 border-b border-white/6 hover:border-white/15 transition-colors duration-500">
                <div className="flex-shrink-0 w-12"><span className="text-[11px] font-semibold tracking-[0.2em] text-white/25 group-hover:text-white/60 transition-colors duration-500">{`0${num}`}</span></div>
                <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-12">
                  <h3 className="text-[clamp(20px,2.5vw,36px)] font-bold tracking-[-0.02em] text-white w-48 flex-shrink-0">{t(`process.${num}.label`)}</h3>
                  <p className="text-[14px] text-white/40 leading-relaxed font-light max-w-md group-hover:text-white/60 transition-colors duration-500">{t(`process.${num}.desc`)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
