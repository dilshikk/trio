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

const ACCENT = "#dcb25a";

const SERVICES = [
  {
    title: "Полное бухгалтерское сопровождение",
    desc: "Ведение учёта на регулярной основе: первичные документы, операции, контроль обязательных процессов и подготовка отчётности.",
  },
  {
    title: "Налоговый учёт и отчётность",
    desc: "Расчёт налогов, подготовка и сдача обязательной отчётности в установленные сроки.",
  },
  {
    title: "Кадровый учёт и заработная плата",
    desc: "Кадровые документы, начисления, выплаты и связанные обязательные процессы.",
  },
  {
    title: "Восстановление бухгалтерского учёта",
    desc: "Анализ текущего состояния, выявление пробелов и приведение учёта в рабочее состояние.",
  },
  {
    title: "Импорт / экспорт и ВЭД",
    desc: "Бухгалтерское сопровождение внешнеэкономических операций и отражение связанных операций в учёте.",
  },
  {
    title: "Подготовка к проверкам",
    desc: "Проверка состояния документов и учёта, устранение выявленных несоответствий и подготовка необходимой информации.",
  },
  {
    title: "Управленческая отчётность",
    desc: "Формирование понятных финансовых показателей для собственника и руководителя.",
  },
  {
    title: "Финансовый анализ",
    desc: "Анализ доходов, расходов, маржинальности, динамики и ключевых показателей для принятия решений.",
  },
];

const SEGMENTS = [
  "ИП",
  "ООО",
  "Розничные магазины и минимаркеты",
  "Рестораны и HoReCa",
  "Торговые компании",
  "Сервисный бизнес",
  "Импортёры и экспортёры",
  "Компании с сотрудниками и регулярной отчётностью",
];

export default function AccountingPage() {
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
            style={{ background: `radial-gradient(ellipse 60% 60% at 40% 50%, ${ACCENT}14 0%, transparent 70%)` }}
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
              02 — ACCOUNTING
            </motion.p>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                className="text-[clamp(48px,8vw,130px)] font-bold leading-[0.92] tracking-[-0.03em] text-white mb-8 whitespace-pre-line"
              >
                <EditableText tKey="hero.slide2.subheadline" multiline />
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.55, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[16px] leading-relaxed font-light text-white max-w-lg mb-10"
            >
              Бухгалтерский аутсорсинг для ИП и ООО. Берём на себя регулярный учёт, налоги, отчётность, кадры и сопровождение финансовых процессов, чтобы руководитель видел реальную картину бизнеса.
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
                  ПОЛУЧИТЬ РАСЧЁТ ОБСЛУЖИВАНИЯ
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
                УСЛУГИ ACCOUNTING
              </p>
              <h2 className="text-[clamp(32px,4.5vw,64px)] font-bold tracking-[-0.03em] text-white leading-[0.95]">
                ЯСНОСТЬ ЗА<br /><span className="text-white/25">КАЖДОЙ ЦИФРОЙ.</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/6">
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

        {/* Who it fits */}
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
                КОМУ ПОДХОДИТ
              </p>
              <h2 className="text-[clamp(28px,4vw,52px)] font-bold tracking-[-0.03em] text-white leading-[0.95]">
                БУХГАЛТЕРИЯ, КОТОРАЯ<br /><span className="text-white/25">ПОДСТРАИВАЕТСЯ ПОД БИЗНЕС.</span>
              </h2>
            </motion.div>
            <div className="flex flex-wrap gap-3">
              {SEGMENTS.map((s, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="text-[11px] tracking-[0.15em] uppercase px-4 py-2 border"
                  style={{ color: ACCENT + "90", borderColor: ACCENT + "30" }}
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing note */}
        <section className="py-20 px-6 md:px-16 lg:px-24 border-t border-white/6">
          <div className="max-w-[1400px] mx-auto">
            <div className="border border-white/8 p-10 max-w-2xl relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `linear-gradient(${ACCENT} 1px, transparent 1px), linear-gradient(90deg, ${ACCENT} 1px, transparent 1px)`,
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="relative">
                <p className="text-[10px] tracking-[0.35em] uppercase mb-4" style={{ color: ACCENT + "80" }}>
                  СТОИМОСТЬ
                </p>
                <h3 className="text-[clamp(20px,3vw,36px)] font-bold tracking-[-0.02em] text-white leading-[0.95] mb-4">
                  СТОИМОСТЬ ЗАВИСИТ ОТ ОБЪЁМА<br /><span className="text-white/30">И СЛОЖНОСТИ УЧЁТА.</span>
                </h3>
                <p className="text-[14px] text-white/45 font-light leading-relaxed mb-6">
                  Цена рассчитывается после короткого брифа: форма бизнеса, налоговый режим, количество операций, сотрудников, касс, банковских счетов, импорт/экспорт и текущая ситуация с учётом.
                </p>
                <button
                  onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="group relative overflow-hidden border text-white text-[10px] font-semibold tracking-[0.25em] uppercase px-8 py-3 transition-colors duration-500 cursor-pointer"
                  style={{ borderColor: ACCENT + "80" }}
                >
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300">ПОЛУЧИТЬ РАСЧЁТ</span>
                  <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                </button>
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
                ПОЛУЧИТЬ РАСЧЁТ<br /><span className="text-white/25">ОБСЛУЖИВАНИЯ.</span>
              </h2>
              <p className="text-[15px] text-white/40 font-light mt-4 max-w-lg leading-relaxed">
                Ответьте на несколько вопросов — мы оценим объём работы и предложим подходящий формат сопровождения.
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
