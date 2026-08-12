import { useEffect, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { isSupportedLocale, SAVED_OR_DEFAULT_LOCALE } from "@/i18n";

const API_BASE = import.meta.env.VITE_ADMIN_API_URL ?? "";

/**
 * The admin API stores overrides with flat, dotted keys ("hero.title").
 * i18next resolves keys as nested paths, so expand them before merging.
 */
function unflatten(flat: Record<string, string>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(flat)) {
    const parts = key.split(".");
    let node = result;
    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        node[part] = value;
        return;
      }
      const existing = node[part];
      const next =
        typeof existing === "object" && existing !== null
          ? (existing as Record<string, unknown>)
          : {};
      node[part] = next;
      node = next;
    });
  }
  return result;
}

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
        i18n.addResourceBundle(locale, "common", unflatten(data), true, true);
        i18n.emit("languageChanged", locale);
      })
      .catch(() => {
        /* ignore network errors */
      });
  }, [locale, i18n]);

  return <>{children}</>;
}
