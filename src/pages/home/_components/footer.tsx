import { useTranslation } from "react-i18next";
import EditableText from "@/components/editable-text.tsx";

const CONTACTS = {
  logistics: [
    { label: "+998 94 062 24 42", href: "tel:+998940622442" },
    { label: "+998 97 904 33 33", href: "tel:+998979043333" },
  ],
  accounting: [
    { label: "+998 94 056 66 56", href: "tel:+998940566656" },
    { label: "+998 93 538 66 79", href: "tel:+998935386679" },
  ],
  telegram: { label: "@TrioGroupsuz", href: "https://t.me/TrioGroupsuz" },
  address: {
    label: "просп. Мустакиллик, 24, Ташкент",
    href: "https://yandex.ru/maps?text=41.315843,69.292294&si=981f5g03pp162cvrkw79eq8kdw",
  },
};

export default function Footer() {
  const { t } = useTranslation("common");
  const year = new Date().getFullYear();

  const navLinks = {
    services: [
      { labelKey: "nav.logistics", href: "#logistics" },
      { labelKey: "nav.accounting", href: "#accounting" },
      { labelKey: "nav.consulting", href: "#consulting" },
    ],
    company: [
      { labelKey: "footer.about", href: "#about" },
      { labelKey: "footer.contact", href: "#contact" },
      { labelKey: "footer.privacy", href: "#" },
      { labelKey: "footer.terms", href: "#" },
    ],
  };

  return (
    <footer className="border-t border-white/6 px-6 md:px-16 lg:px-24 py-16">
      <div className="max-w-[1400px] mx-auto">
        {/* Top row */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 justify-between mb-16">

          {/* Brand + tagline */}
          <div className="shrink-0">
            <div className="flex items-center gap-3 mb-4">
              <img src="https://hercules-cdn.com/file_exMhy8nexpXEXJmG0mlYSQKH" alt="TRIO GROUP" className="h-6 w-6 object-contain" />
              <span className="text-[13px] font-semibold tracking-[0.2em] text-white/70 uppercase">TRIO GROUP</span>
            </div>
            <p className="text-[12px] text-white/30 font-light max-w-[220px] leading-relaxed mb-6">
              <EditableText tKey="footer.tagline" />
            </p>
            {/* Address */}
            <a
              href={CONTACTS.address.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 text-[12px] text-white/35 hover:text-white/65 transition-colors duration-300 max-w-[220px] leading-relaxed group"
            >
              <svg className="w-3 h-3 mt-0.5 shrink-0 opacity-50 group-hover:opacity-80 transition-opacity" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
              </svg>
              {CONTACTS.address.label}
            </a>
          </div>

          {/* Nav links */}
          <div className="flex gap-12 md:gap-20">
            <div>
              <p className="text-[9px] tracking-[0.3em] text-white/25 uppercase mb-5">
                <EditableText tKey="footer.services" />
              </p>
              <ul className="space-y-3">
                {navLinks.services.map((l) => (
                  <li key={l.labelKey}>
                    <a href={l.href} onClick={(e) => { e.preventDefault(); document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" }); }} className="text-[12px] text-white/45 hover:text-white/80 transition-colors duration-300 tracking-[0.05em]">
                      <EditableText tKey={l.labelKey} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[9px] tracking-[0.3em] text-white/25 uppercase mb-5">
                <EditableText tKey="footer.company" />
              </p>
              <ul className="space-y-3">
                {navLinks.company.map((l) => (
                  <li key={l.labelKey}>
                    <a href={l.href} className="text-[12px] text-white/45 hover:text-white/80 transition-colors duration-300 tracking-[0.05em]">
                      <EditableText tKey={l.labelKey} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contacts block */}
          <div className="flex flex-col gap-8 shrink-0">

            {/* Logistics phones */}
            <div>
              <p className="text-[9px] tracking-[0.3em] text-white/25 uppercase mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6395ff]/70 inline-block" />
                Логистика
              </p>
              <ul className="space-y-2">
                {CONTACTS.logistics.map((c) => (
                  <li key={c.href}>
                    <a href={c.href} className="text-[13px] text-white/55 hover:text-white/90 transition-colors duration-300 font-light tracking-wide">
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Accounting phones */}
            <div>
              <p className="text-[9px] tracking-[0.3em] text-white/25 uppercase mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#dcb25a]/70 inline-block" />
                Бухгалтерия
              </p>
              <ul className="space-y-2">
                {CONTACTS.accounting.map((c) => (
                  <li key={c.href}>
                    <a href={c.href} className="text-[13px] text-white/55 hover:text-white/90 transition-colors duration-300 font-light tracking-wide">
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Telegram */}
            <div>
              <p className="text-[9px] tracking-[0.3em] text-white/25 uppercase mb-4">Telegram</p>
              <a
                href={CONTACTS.telegram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-white/55 hover:text-white/90 transition-colors duration-300 font-light"
              >
                {CONTACTS.telegram.label}
              </a>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/6">
          <p className="text-[11px] text-white/20 tracking-[0.1em]">{t("footer.copyright", { year })}</p>
          <div className="flex items-center gap-2">
            <div className="flex gap-[2px]">
              <div className="w-[3px] h-[3px] rounded-full bg-[#6395ff]/50" />
              <div className="w-[3px] h-[3px] rounded-full bg-[#dcb25a]/50" />
              <div className="w-[3px] h-[3px] rounded-full bg-[#c4c4c4]/50" />
            </div>
            <span className="text-[10px] text-white/15 tracking-[0.2em] uppercase">LOGISTICS · ACCOUNTING · CONSULTING</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
