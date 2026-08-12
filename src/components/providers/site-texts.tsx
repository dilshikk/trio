import { useEffect, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { isSupportedLocale, SAVED_OR_DEFAULT_LOCALE } from "@/i18n";

const API_BASE = import.meta.env.VITE_ADMIN_API_URL ?? "";

/**
 * Loads admin-edited copy for the active language and layers it on top of the
 * bundled translations, so edits show up on the public site immediately.
 */
export default function SiteTextsProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const locale = isSupportedLocale(i18n.language) ? i18n.language : SAVED_OR_DEFAULT_LOCALE;

  useEffect(() => {
    fetch(`${API_BASE}/api/site-texts/${locale}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: Record<string, string> | null) => {
        if (!data || Object.keys(data).length === 0) return;
        i18n.addResourceBundle(locale, "common", data, true, true);
        i18n.emit("languageChanged", locale);
      })
      .catch(() => {/* ignore network errors */});
  }, [locale, i18n]);

  return <>{children}</>;
}
