import { motion } from "motion/react";
import MapSection from "./_components/MapSection.tsx";
import Footer from "./_components/DemoFooter.tsx";

export default function Index() {
  return (
    <div className="min-h-screen bg-[oklch(0.08_0_0)] text-white overflow-x-hidden">
      {/* ─── NAV ─────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between border-b border-white/5 bg-[oklch(0.08_0_0)]/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <img
            src="https://hercules-cdn.com/file_GFvPTJks4UL7mjCYDOlE3qFm"
            alt="TRIO GROUPS"
            className="h-7 w-7 object-contain"
          />
          <span className="text-[13px] font-semibold tracking-[0.22em] text-white/80 uppercase">TRIO GROUPS</span>
        </div>
        <div className="flex items-center gap-6">
          {["Логистика", "Бухгалтерия", "Консалтинг", "Контакты"].map((item) => (
            <span key={item} className="hidden md:block text-[11px] tracking-[0.15em] text-white/40 uppercase">{item}</span>
          ))}
          <button className="text-[11px] font-semibold tracking-[0.2em] uppercase border border-white/20 text-white/70 hover:border-white/50 hover:text-white transition-all px-5 py-2.5 rounded-sm cursor-pointer">
            ОБСУДИТЬ ЗАДАЧУ
          </button>
        </div>
      </nav>

      {/* ─── HERO ────────────────────────────────────────── */}
      <section className="pt-40 pb-32 px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[10px] tracking-[0.4em] text-white/25 uppercase mb-6"
        >
          ТРИ НАПРАВЛЕНИЯ · ОДИН ПАРТНЁР
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="text-[clamp(48px,8vw,110px)] font-light leading-[0.92] tracking-[-0.03em] mb-8"
        >
          ЛОГИСТИКА.<br />
          <span className="text-white/20">БУХГАЛТЕРИЯ.</span><br />
          <span className="text-white/10">КОНСАЛТИНГ.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[15px] text-white/40 max-w-[520px] leading-relaxed font-light"
        >
          Практичные B2B-решения для компаний, которым важны скорость,
          прозрачность и ответственность.
        </motion.p>
      </section>

      {/* ─── SERVICES STRIP ──────────────────────────────── */}
      <section className="border-t border-white/6 py-16 px-6 md:px-16 lg:px-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/6">
          {[
            { num: "01", title: "ЛОГИСТИКА", desc: "Перевозки по Узбекистану и международным направлениям. Один менеджер — от заявки до доставки.", color: "#6395ff" },
            { num: "02", title: "БУХГАЛТЕРИЯ", desc: "Аутсорсинг учёта, налогов и кадров для ИП и ООО. Отчётность, ВЭД, восстановление учёта.", color: "#dcb25a" },
            { num: "03", title: "КОНСАЛТИНГ", desc: "Диагностика бизнеса, оптимизация процессов и финансовое моделирование для роста.", color: "#c4c4c4" },
          ].map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="px-0 md:px-10 py-10 first:pl-0 last:pr-0 group"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[10px] tracking-[0.3em] text-white/20">{s.num}</span>
                <span className="text-[10px] tracking-[0.3em] font-semibold uppercase" style={{ color: s.color }}>{s.title}</span>
              </div>
              <p className="text-[14px] text-white/45 leading-relaxed font-light">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── MAP SECTION ─────────────────────────────────── */}
      <MapSection />

      {/* ─── FOOTER ──────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
