import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/navigation.tsx";
import Footer from "@/pages/home/_components/footer.tsx";
import GlobalSection from "@/pages/home/_components/global-section.tsx";
import ContactForm from "@/pages/home/_components/contact-form.tsx";
import { EditModeProvider } from "@/components/edit-mode-provider.tsx";
import AdminBar from "@/components/admin-bar.tsx";
import EditableText from "@/components/editable-text.tsx";
import { changeLocale, isSupportedLocale } from "@/i18n.ts";

const ACCENT = "#6395ff";

const SERVICES = [
  {
    title: "Перевозки по Узбекистану",
    desc: "Ташкент и все регионы страны. Подбираем транспорт под объём, тип груза и требования к доставке.",
  },
  {
    title: "Международные автоперевозки",
    desc: "Организация перевозок между Узбекистаном, Китаем, странами СНГ и Европы по подтверждённым маршрутам.",
  },
  {
    title: "Перевозки из Китая",
    desc: "Организация поставок из Китая с подбором логистической схемы и сопровождением перевозки.",
  },
  {
    title: "Импорт автомобилей",
    desc: "Организация доставки автомобилей и сопровождение связанных логистических процессов.",
  },
  {
    title: "Таможенное сопровождение",
    desc: "Координация документов и взаимодействия со специалистами при импортных и экспортных операциях.",
  },
  {
    title: "Подбор транспорта",
    desc: "Машина под задачу: тип кузова, тоннаж, маршрут, сроки и особенности груза.",
  },
];

const ADVANTAGES = [
  "Один ответственный менеджер по перевозке.",
  "Подбор транспорта и маршрута под конкретную задачу.",
  "Работа по Ташкенту и всем регионам Узбекистана.",
  "Возможность организации международных перевозок.",
  "Понятная коммуникация по этапам перевозки.",
  "Взаимодействие с Accounting при импортно-экспортных операциях.",
];

export default function LogisticsPage() {
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
            style={{ background: `radial-gradient(ellipse 60% 60% at 60% 50%, ${ACCENT}14 0%, transparent 70%)` }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
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
              01 — LOGISTICS
            </motion.p>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                className="text-[clamp(48px,8vw,130px)] font-bold leading-[0.92] tracking-[-0.03em] text-white mb-8 whitespace-pre-line"
              >
                <EditableText tKey="hero.slide1.subheadline" multiline />
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.55, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[16px] leading-relaxed font-light text-white max-w-lg mb-10"
            >
              Организуем грузоперевозки по Узбекистану и международным направлениям. Подбираем оптимальный транспорт и маршрут, координируем перевозку и помогаем бизнесу получать груз предсказуемо и без лишней операционной нагрузки.
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
                  РАССЧИТАТЬ ПЕРЕВОЗКУ
                </span>
                <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </button>
              <button
                onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
                className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/40 hover:text-white/70 transition-colors duration-300 flex items-center gap-2 py-4 cursor-pointer"
              >
                ПОСМОТРЕТЬ УСЛУГИ ↗
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
                УСЛУГИ LOGISTICS
              </p>
              <h2 className="text-[clamp(32px,4.5vw,64px)] font-bold tracking-[-0.03em] text-white leading-[0.95]">
                ПЕРЕВОЗКИ,<br /><span className="text-white/25">КОТОРЫЕ РАБОТАЮТ.</span>
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

        {/* Advantages */}
        <section className="py-20 px-6 md:px-16 lg:px-24 border-t border-white/6">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="mb-12"
            >
              <p className="text-[10px] tracking-[0.35em] uppercase mb-4" style={{ color: ACCENT + "80" }}>
                ПРЕИМУЩЕСТВА
              </p>
              <h2 className="text-[clamp(28px,4vw,52px)] font-bold tracking-[-0.03em] text-white leading-[0.95]">
                ПОЧЕМУ TRIO<br /><span className="text-white/25">LOGISTICS.</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {ADVANTAGES.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.07 }}
                  className="flex items-start gap-4 py-5 border-b border-white/6 hover:border-white/15 transition-colors duration-300"
                >
                  <div className="w-1.5 h-1.5 rounded-full mt-[5px] flex-shrink-0" style={{ background: ACCENT }} />
                  <p className="text-[14px] text-white/55 font-light leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <GlobalSection />

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
                ЗАЯВКА НА ПЕРЕВОЗКУ
              </p>
              <h2 className="text-[clamp(32px,4.5vw,64px)] font-bold tracking-[-0.03em] text-white leading-[0.95]">
                РАССЧИТАТЬ<br /><span className="text-white/25">ПЕРЕВОЗКУ.</span>
              </h2>
              <p className="text-[15px] text-white/40 font-light mt-4 max-w-lg leading-relaxed">
                Оставьте параметры груза — команда TRIO Logistics свяжется с вами для уточнения деталей и подготовки решения.
              </p>
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
