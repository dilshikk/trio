import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import ContactForm from "./contact-form.tsx";

export default function FinalCta() {
  const { t } = useTranslation("common");
  const [showForm, setShowForm] = useState(false);

  return (
    <section id="contact" className="relative py-32 px-6 md:px-16 lg:px-24 overflow-hidden border-t border-white/6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, #6395ff 0%, transparent 60%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, #dcb25a 0%, transparent 60%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, #c4c4c4 0%, transparent 60%)" }} />
      </div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {(["#6395ff", "#dcb25a", "#c4c4c4"] as const).map((color, i) => (
          <motion.div key={i} className="absolute top-1/2 left-1/2 h-[1px] origin-left" style={{ width: "40%", background: `linear-gradient(to right, transparent, ${color}40)`, rotate: `${-30 + i * 30}deg`, translateY: "-50%" }} animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" as const, delay: i * 0.8 }} />
        ))}
      </div>
      <div className="relative max-w-[1400px] mx-auto">
        <AnimatePresence mode="wait">
          {!showForm ? (
            <motion.div key="cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="text-center">
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-[10px] tracking-[0.35em] text-white/30 uppercase mb-10">{t("cta.eyebrow")}</motion.p>
              <div className="overflow-hidden"><motion.h2 initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] as const }} className="text-[clamp(44px,8vw,120px)] font-bold leading-[0.9] tracking-[-0.04em] text-white mb-3">{t("cta.title")}</motion.h2></div>
              <div className="overflow-hidden"><motion.h2 initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.08, ease: [0.16, 1, 0.3, 1] as const }} className="text-[clamp(44px,8vw,120px)] font-bold leading-[0.9] tracking-[-0.04em] text-white/25 mb-16">{t("cta.titleFaded")}</motion.h2></div>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.3 }} className="text-[16px] text-white/45 font-light max-w-lg mx-auto mb-14 leading-relaxed">{t("cta.desc")}</motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.45 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button onClick={() => setShowForm(true)} className="group relative overflow-hidden border border-white/80 text-white text-[11px] font-semibold tracking-[0.25em] uppercase px-10 py-4 hover:border-white transition-colors duration-500" data-cursor="WRITE">
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300">{t("cta.button")}</span>
                  <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                </button>
                <a href="#about" onClick={(e) => { e.preventDefault(); document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" }); }} className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/40 hover:text-white/70 transition-colors duration-300">{t("cta.learnMore")} ↗</a>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}>
              <div className="flex items-center justify-between mb-12">
                <div>
                  <p className="text-[10px] tracking-[0.35em] text-white/30 uppercase mb-3">{t("cta.formEyebrow")}</p>
                  <h2 className="text-[clamp(28px,4vw,52px)] font-bold tracking-[-0.03em] text-white leading-[0.95]">{t("cta.formTitle")}<br /><span className="text-white/30">{t("cta.formTitleFaded")}</span></h2>
                </div>
                <button onClick={() => setShowForm(false)} className="text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-white/60 transition-colors duration-300 border border-white/10 hover:border-white/30 px-4 py-2">{t("cta.back")}</button>
              </div>
              <ContactForm />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
