import { useTranslation } from "react-i18next";
import EditableText from "@/components/editable-text.tsx";

export default function Footer() {
  const { t } = useTranslation("common");
  const year = new Date().getFullYear();

  const links = {
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
    social: [
      { labelKey: "footer.linkedin", href: "#" },
      { labelKey: "footer.twitter", href: "#" },
    ],
  };

  return (
    <footer className="border-t border-white/6 px-6 md:px-16 lg:px-24 py-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 justify-between mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="https://hercules-cdn.com/file_exMhy8nexpXEXJmG0mlYSQKH" alt="TRIO GROUP" className="h-6 w-6 object-contain" />
              <span className="text-[13px] font-semibold tracking-[0.2em] text-white/70 uppercase">TRIO GROUP</span>
            </div>
            <p className="text-[12px] text-white/30 font-light max-w-[220px] leading-relaxed"><EditableText tKey="footer.tagline" /></p>
          </div>
          <div className="flex gap-16 md:gap-24">
            <div>
              <p className="text-[9px] tracking-[0.3em] text-white/25 uppercase mb-5"><EditableText tKey="footer.services" /></p>
              <ul className="space-y-3">
                {links.services.map((l) => (<li key={l.labelKey}><a href={l.href} onClick={(e) => { e.preventDefault(); document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" }); }} className="text-[12px] text-white/45 hover:text-white/80 transition-colors duration-300 tracking-[0.05em]"><EditableText tKey={l.labelKey} /></a></li>))}
              </ul>
            </div>
            <div>
              <p className="text-[9px] tracking-[0.3em] text-white/25 uppercase mb-5"><EditableText tKey="footer.company" /></p>
              <ul className="space-y-3">
                {links.company.map((l) => (<li key={l.labelKey}><a href={l.href} className="text-[12px] text-white/45 hover:text-white/80 transition-colors duration-300 tracking-[0.05em]"><EditableText tKey={l.labelKey} /></a></li>))}
              </ul>
            </div>
            <div>
              <p className="text-[9px] tracking-[0.3em] text-white/25 uppercase mb-5"><EditableText tKey="footer.social" /></p>
              <ul className="space-y-3">
                {links.social.map((l) => (<li key={l.labelKey}><a href={l.href} className="text-[12px] text-white/45 hover:text-white/80 transition-colors duration-300 tracking-[0.05em]"><EditableText tKey={l.labelKey} /></a></li>))}
              </ul>
            </div>
          </div>
        </div>
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
