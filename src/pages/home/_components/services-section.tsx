import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslation } from "react-i18next";
import EditableText from "@/components/editable-text.tsx";

const services = [
  { number: "01", tKey: "1", accent: "oklch(0.65 0.2 240)", accentHex: "#6395ff", id: "logistics" },
  { number: "02", tKey: "2", accent: "oklch(0.78 0.15 75)", accentHex: "#dcb25a", id: "accounting" },
  { number: "03", tKey: "3", accent: "oklch(0.78 0 0)", accentHex: "#c4c4c4", id: "consulting" },
];

function ServiceItem({ service, index }: { service: typeof services[0]; index: number }) {
  const { t } = useTranslation("common");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const pillars = t(`services.${service.tKey}.pillars`).split(",");

  return (
    <motion.div ref={ref} id={service.id} style={{ opacity }} className={`relative flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 lg:gap-20 items-center min-h-[70vh] py-24 border-t border-white/6`}>
      <motion.div style={{ y }} className="flex-1 relative">
        <div className="relative aspect-square max-w-[480px] mx-auto rounded-sm overflow-hidden" style={{ background: `radial-gradient(ellipse at center, ${service.accentHex}18 0%, oklch(0.1 0 0) 70%)` }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border opacity-20" style={{ borderColor: service.accentHex }} />
            <div className="absolute w-32 h-32 rounded-full border opacity-30" style={{ borderColor: service.accentHex }} />
            <div className="absolute w-16 h-16 rounded-full" style={{ background: `${service.accentHex}25`, border: `1px solid ${service.accentHex}60` }} />
          </div>
          <div className="absolute top-8 left-8"><span className="text-[120px] font-bold leading-none opacity-5" style={{ color: service.accentHex }}>{service.number}</span></div>
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(${service.accentHex} 1px, transparent 1px), linear-gradient(90deg, ${service.accentHex} 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
        </div>
      </motion.div>
      <div className="flex-1 space-y-8 max-w-lg">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase" style={{ color: service.accent }}>{service.number}</span>
          <div className="h-[1px] w-8 bg-white/20" />
          <span className="text-[10px] tracking-[0.2em] text-white/30 uppercase"><EditableText tKey={`services.${service.tKey}.label`} /></span>
        </div>
        <h2 className="text-[clamp(40px,5.5vw,80px)] font-bold leading-[0.9] tracking-[-0.03em] text-white whitespace-pre-line">
          <EditableText tKey={`services.${service.tKey}.headline`} multiline />
        </h2>
        <p className="text-[15px] leading-relaxed text-white/50 font-light max-w-sm">
          <EditableText tKey={`services.${service.tKey}.description`} />
        </p>
        <div className="flex flex-wrap gap-2">
          {pillars.map((p) => (<span key={p} className="text-[9px] tracking-[0.18em] uppercase px-3 py-1.5 border" style={{ color: `${service.accentHex}90`, borderColor: `${service.accentHex}25` }}>{p.trim()}</span>))}
        </div>
        <a href={`#${service.id}-detail`} onClick={(e) => { e.preventDefault(); document.querySelector(`#${service.id}-detail`)?.scrollIntoView({ behavior: "smooth" }); }} data-cursor="EXPLORE" className="group inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.25em] uppercase text-white/60 hover:text-white transition-colors duration-300">
          <span className="w-6 h-[1px] group-hover:w-12 transition-all duration-500" style={{ background: service.accentHex }} />
          <EditableText tKey="services.learnMore" />
        </a>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const { t } = useTranslation("common");
  void t;
  return (
    <section className="relative px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as const }} className="pt-28 pb-4">
        <p className="text-[10px] tracking-[0.35em] text-white/30 uppercase mb-4"><EditableText tKey="services.eyebrow" /></p>
        <h2 className="text-[clamp(36px,5vw,68px)] font-bold tracking-[-0.03em] text-white leading-[0.95]">
          <EditableText tKey="services.title" /><br />
          <span className="text-white/30"><EditableText tKey="services.titleFaded" /></span>
        </h2>
      </motion.div>
      {services.map((service, i) => (<ServiceItem key={service.id} service={service} index={i} />))}
    </section>
  );
}
