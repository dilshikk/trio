import { motion } from "motion/react";

const principles = [
  { word: "INTEGRATED", desc: "Three disciplines \u2014 one seamless system that eliminates gaps." },
  { word: "PRECISE", desc: "Every decision backed by rigorous data and methodology." },
  { word: "RELIABLE", desc: "Consistent delivery across every engagement, every time." },
  { word: "STRATEGIC", desc: "We think long-term so your business moves forward today." },
  { word: "GLOBAL", desc: "Built for businesses that operate without borders." },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-36 px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-24">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-[10px] tracking-[0.35em] text-white/30 uppercase mb-8">ABOUT TRIO GROUPS</motion.p>
          <div className="overflow-hidden"><motion.h2 initial={{ y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] as const }} className="text-[clamp(36px,6vw,96px)] font-bold leading-[0.92] tracking-[-0.03em] text-white max-w-3xl">THREE EXPERTISES.</motion.h2></div>
          <div className="overflow-hidden"><motion.h2 initial={{ y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }} className="text-[clamp(36px,6vw,96px)] font-bold leading-[0.92] tracking-[-0.03em] text-white/25 max-w-3xl">ONE BUSINESS ECOSYSTEM.</motion.h2></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-28">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as const }}>
            <p className="text-[17px] leading-[1.75] text-white/55 font-light max-w-lg">TRIO GROUPS is not three separate companies operating in parallel. It is one integrated business ecosystem where Logistics, Accounting, and Consulting are designed to work in concert \u2014 each discipline informing and strengthening the others.</p>
            <p className="text-[17px] leading-[1.75] text-white/40 font-light max-w-lg mt-6">This integration is our fundamental advantage. When your supply chain, financial management, and strategic planning speak the same language, your business moves faster with less friction and greater precision.</p>
          </motion.div>
          <div className="space-y-6">
            {[{ label: "LOGISTICS", desc: "Movement, precision, scale", color: "#6395ff", delay: 0 }, { label: "ACCOUNTING", desc: "Clarity, accuracy, control", color: "#dcb25a", delay: 0.1 }, { label: "CONSULTING", desc: "Strategy, structure, growth", color: "#c4c4c4", delay: 0.2 }].map((item) => (
              <motion.div key={item.label} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: item.delay, ease: [0.25, 0.1, 0.25, 1] as const }} className="flex items-center gap-5 py-4 border-b border-white/8">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                <div className="flex-1"><div className="text-[12px] font-semibold tracking-[0.2em] text-white uppercase">{item.label}</div><div className="text-[12px] text-white/35 mt-0.5">{item.desc}</div></div>
                <div className="w-16 h-[1px]" style={{ background: `linear-gradient(to right, ${item.color}50, transparent)` }} />
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-[10px] tracking-[0.35em] text-white/30 uppercase mb-12">WHY TRIO</motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0">
            {principles.map((p, i) => (
              <motion.div key={p.word} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] as const }} className="group border-l border-white/8 pl-5 py-4 hover:border-white/25 transition-colors duration-500">
                <div className="text-[11px] font-bold tracking-[0.22em] text-white uppercase mb-2">{p.word}</div>
                <div className="text-[12px] text-white/35 leading-relaxed font-light">{p.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
