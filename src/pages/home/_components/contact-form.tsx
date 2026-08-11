import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";

type ServiceOption = "LOGISTICS" | "ACCOUNTING" | "CONSULTING" | "ALL THREE";
const SERVICE_OPTIONS: ServiceOption[] = ["LOGISTICS", "ACCOUNTING", "CONSULTING", "ALL THREE"];
type FormState = { name: string; company: string; email: string; message: string; service: ServiceOption | ""; };
const ACCENT: Record<ServiceOption, string> = { LOGISTICS: "#6395ff", ACCOUNTING: "#dcb25a", CONSULTING: "#c4c4c4", "ALL THREE": "#ffffff" };

export default function ContactForm() {
  const { t } = useTranslation("common");
  const [form, setForm] = useState<FormState>({ name: "", company: "", email: "", message: "", service: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) errs.name = t("contact.errorRequired");
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = t("contact.errorEmail");
    if (!form.message.trim()) errs.message = t("contact.errorRequired");
    if (!form.service) errs.service = t("contact.errorService");
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1200);
  };

  const accentColor = form.service ? ACCENT[form.service as ServiceOption] : "#ffffff";

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div key="success" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }} className="text-center py-16 space-y-6">
            <div className="relative w-20 h-20 mx-auto mb-8">
              <svg viewBox="0 0 80 80" className="w-20 h-20">
                <motion.circle cx="40" cy="40" r="36" fill="none" stroke={accentColor} strokeWidth="1" strokeDasharray="226" initial={{ strokeDashoffset: 226 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 1, ease: "easeOut" as const, delay: 0.2 }} />
                <motion.path d="M25 40 L36 51 L56 30" fill="none" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="50" initial={{ strokeDashoffset: 50 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.5, delay: 0.9 }} />
              </svg>
            </div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-white/30">{t("contact.successEyebrow")}</p>
            <h3 className="text-[clamp(28px,4vw,52px)] font-bold tracking-[-0.03em] text-white leading-[0.95]">{t("contact.successTitle")}<br /><span style={{ color: accentColor }}>{t("contact.successTitleAccent")}</span></h3>
            <p className="text-[14px] text-white/40 font-light max-w-sm mx-auto leading-relaxed">{t("contact.successDesc")}</p>
            <button onClick={() => { setSubmitted(false); setForm({ name: "", company: "", email: "", message: "", service: "" }); }} className="mt-6 text-[10px] tracking-[0.25em] uppercase text-white/30 hover:text-white/60 transition-colors duration-300 border-b border-white/10 hover:border-white/30 pb-0.5">{t("contact.sendAnother")}</button>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="text-[9px] tracking-[0.3em] uppercase text-white/30">{t("contact.service")}</label>
              <div className="flex flex-wrap gap-2">
                {SERVICE_OPTIONS.map((s) => (<button key={s} type="button" onClick={() => { setForm((f) => ({ ...f, service: s })); setErrors((e) => ({ ...e, service: "" })); }} className="relative text-[9px] tracking-[0.2em] uppercase px-4 py-2 border transition-all duration-300" style={{ borderColor: form.service === s ? ACCENT[s] : "rgba(255,255,255,0.12)", color: form.service === s ? ACCENT[s] : "rgba(255,255,255,0.35)", background: form.service === s ? `${ACCENT[s]}10` : "transparent" }}>{s}</button>))}
              </div>
              {errors.service && <p className="text-[10px] text-red-400/80">{errors.service}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={t("contact.name")} placeholder="John Smith" value={form.name} error={errors.name} onChange={(v) => { setForm((f) => ({ ...f, name: v })); setErrors((e) => ({ ...e, name: "" })); }} accentColor={accentColor} />
              <Field label={t("contact.company")} placeholder="Your Company" value={form.company} onChange={(v) => setForm((f) => ({ ...f, company: v }))} accentColor={accentColor} />
            </div>
            <Field label={t("contact.email")} placeholder="example@company.com" type="email" value={form.email} error={errors.email} onChange={(v) => { setForm((f) => ({ ...f, email: v })); setErrors((e) => ({ ...e, email: "" })); }} accentColor={accentColor} />
            <div className="space-y-2">
              <label className="text-[9px] tracking-[0.3em] uppercase text-white/30">{t("contact.message")}</label>
              <textarea rows={4} placeholder={t("contact.messagePlaceholder")} value={form.message} onChange={(e) => { setForm((f) => ({ ...f, message: e.target.value })); setErrors((er) => ({ ...er, message: "" })); }} className="w-full bg-transparent border text-white text-[13px] font-light px-4 py-3 outline-none resize-none transition-all duration-300 placeholder:text-white/20" style={{ borderColor: errors.message ? "rgba(248,113,113,0.5)" : "rgba(255,255,255,0.12)" }} onFocus={(e) => { e.currentTarget.style.borderColor = accentColor + "60"; }} onBlur={(e) => { e.currentTarget.style.borderColor = errors.message ? "rgba(248,113,113,0.5)" : "rgba(255,255,255,0.12)"; }} />
              {errors.message && <p className="text-[10px] text-red-400/80">{errors.message}</p>}
            </div>
            <motion.button type="submit" disabled={submitting} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="group relative w-full overflow-hidden border text-white text-[11px] font-semibold tracking-[0.25em] uppercase px-10 py-4 transition-colors duration-500 disabled:opacity-60" style={{ borderColor: accentColor + "80" }}>
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">{submitting ? t("contact.sending") : t("contact.send")}</span>
              <span className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" style={{ background: accentColor }} />
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, placeholder, value, error, onChange, type = "text", accentColor }: { label: string; placeholder: string; value: string; error?: string; onChange: (v: string) => void; type?: string; accentColor: string; }) {
  return (
    <div className="space-y-2">
      <label className="text-[9px] tracking-[0.3em] uppercase text-white/30">{label}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-transparent border text-white text-[13px] font-light px-4 py-3 outline-none transition-all duration-300 placeholder:text-white/20" style={{ borderColor: error ? "rgba(248,113,113,0.5)" : "rgba(255,255,255,0.12)" }} onFocus={(e) => { e.currentTarget.style.borderColor = accentColor + "60"; }} onBlur={(e) => { e.currentTarget.style.borderColor = error ? "rgba(248,113,113,0.5)" : "rgba(255,255,255,0.12)"; }} />
      {error && <p className="text-[10px] text-red-400/80">{error}</p>}
    </div>
  );
}
