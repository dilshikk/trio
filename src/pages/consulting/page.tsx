import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/navigation.tsx";
import Footer from "@/pages/home/_components/footer.tsx";
import ContactForm from "@/pages/home/_components/contact-form.tsx";
import { EditModeProvider } from "@/components/edit-mode-provider.tsx";
import AdminBar from "@/components/admin-bar.tsx";
import EditableText from "@/components/editable-text.tsx";
import { changeLocale, isSupportedLocale } from "@/i18n.ts";

const ACCENT = "#c4c4c4";

const SERVICES = [
  {
    title: "Диагностика бизнеса",
    desc: "Анализ текущей модели, процессов, ключевых ограничений и зон, требующих внимания.",
  },
  {
    title: "Оптимизация бизнес-процессов",
    desc: "Разбор операционных процессов, распределения ответственности и последовательности действий.",
  },
  {
    title: "Финансовое моделирование",
    desc: "Модели доходов, расходов, денежных потоков и сценариев для принятия управленческих решений.",
  },
  {
    title: "Планирование роста",
    desc: "Постановка целей, приоритетов, показателей и этапов реализации.",
  },
  {
    title: "Выход на рынок Узбекистана",
    desc: "Организационное сопровождение и координация локальных задач для компаний, планирующих работу в Узбекистане — только в объёме реально предоставляемых компетенций.",
  },
  {
    title: "Интеграция функций",
    desc: "Связываем логистические, финансовые и управленческие процессы, когда задача требует работы нескольких направлений TRIO.",
  },
];

export default function ConsultingPage() {
  const { locale } = useParams<{ locale?: string }>();
  const { t } = useTranslation("common");
  void t;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (locale && isSupportedLocale(locale)) void changeLocale(locale);
  }, [locale]);

  return (
    <EditModeProvider>
      <div className="bg-[oklch(0.06_0_0)] text-foreground min-h-screen">
        <Navigation />

        {/* Hero */}
        <section className="relative w-full min-h-screen flex flex-col justify-end pb-24 px-6 md:px-16 lg:px-24 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${ACCENT}0a 0%, transparent 70%)` }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(${ACCENT} 1px, transparent 1px), linear-gradient(90deg, ${ACCENT} 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />
          <div className="relative max-w-[1400px] w-full">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-6"
              style={{ color: ACCENT }}
            >
              03 — CONSULTING
            </motion.p>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                className="text-[clamp(48px,8vw,130px)] font-bold leading-[0.92] tracking-[-0.03em] text-white mb-8 whitespace-pre-line"
              >
                <EditableText tKey="hero.slide3.subheadline" multiline />
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.55, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[16px] leading-relaxed font-light text-white max-w-lg mb-10"
            >
              Помогаем собственникам и руководителям разобраться в процессах, финансах и операционной модели компании, определить точки роста и сформировать практический план изменений.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="group relative overflow-hidden border text-white text-[11px] font-semibold tracking-[0.25em] uppercase px-10 py-4 transition-colors duration-500 cursor-pointer"
                style={{ borderColor: ACCENT + "80" }}
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                  ОБСУДИТЬ БИЗНЕС-ЗАДАЧУ
                </span>
                <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </button>
              <button
                onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
                className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/40 hover:text-white/70 transition-colors duration-300 flex items-center gap-2 py-4 cursor-pointer"
              >
                НАШИ УСЛУГИ ↗
              </button>
            </motion.div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-28 px-6 md:px-16 lg:px-24 border-t border-white/6">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="mb-16"
            >
              <p className="text-[10px] tracking-[0.35em] uppercase mb-4" style={{ color: ACCENT + "80" }}>
                УСЛУГИ CONSULTING
              </p>
              <h2 className="text-[clamp(32px,4.5vw,64px)] font-bold tracking-[-0.03em] text-white leading-[0.95]">
                РЕШЕНИЯ,<br /><span className="text-white/25">КОТОРЫЕ РАБОТАЮТ.</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/6">
              {SERVICES.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.06 }}
                  className="bg-[oklch(0.06_0_0)] p-8 space-y-3 hover:bg-[oklch(0.09_0_0)] transition-colors duration-300"
                >
                  <div className="w-6 h-[1px]" style={{ background: ACCENT }} />
                  <h3 className="text-[12px] font-semibold tracking-[0.15em] uppercase text-white">{s.title}</h3>
                  <p className="text-[13px] text-white/40 font-light leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration block */}
        <section className="py-20 px-6 md:px-16 lg:px-24 border-t border-white/6">
          <div className="max-w-[1400px] mx-auto">
            <div className="border border-white/8 p-10 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `linear-gradient(${ACCENT} 1px, transparent 1px), linear-gradient(90deg, ${ACCENT} 1px, transparent 1px)`,
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-20 items-start">
                <div className="flex-shrink-0">
                  <p className="text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: ACCENT }}>
                    TRIO INTEGRATION
                  </p>
                </div>
                <p className="text-[14px] text-white/45 font-light leading-relaxed max-w-2xl">
                  Консалтинговые проекты используют данные TRIO Logistics для бенчмаркинга и финансовые показатели TRIO Accounting для моделирования. При необходимости подключаем нужные направления в единый контур работы.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact form */}
        <section id="contact" className="py-28 px-6 md:px-16 lg:px-24 border-t border-white/6">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="mb-12"
            >
              <p className="text-[10px] tracking-[0.35em] uppercase mb-4" style={{ color: ACCENT + "80" }}>
                ЗАЯВКА
              </p>
              <h2 className="text-[clamp(32px,4.5vw,64px)] font-bold tracking-[-0.03em] text-white leading-[0.95]">
                ОБСУДИТЬ<br /><span className="text-white/25">БИЗНЕС-ЗАДАЧУ.</span>
              </h2>
            </motion.div>
            <ContactForm />
          </div>
        </section>

        <Footer />
      </div>
      <AdminBar />
    </EditModeProvider>
  );
}
