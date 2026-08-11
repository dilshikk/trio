import { useEffect, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { isSupportedLocale, SAVED_OR_DEFAULT_LOCALE } from "@/i18n";

/**
 * Loads admin-edited copy for the active language and layers it on top of the
 * bundled translations, so edits show up on the public site immediately.
 */
export default function SiteTextsProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const locale = isSupportedLocale(i18n.language) ? i18n.language : SAVED_OR_DEFAULT_LOCALE;
  const overrides = useQuery(api.siteTexts.listByLocale, { locale });

  useEffect(() => {
    if (!overrides || Object.keys(overrides).length === 0) return;
    i18n.addResourceBundle(locale, "common", overrides, true, true);
    // Force consumers to re-render with the merged bundle.
    i18n.emit("languageChanged", locale);
  }, [overrides, locale, i18n]);

  return <>{children}</>;
}
