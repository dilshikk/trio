import enCommon from "@/locales/en/common.json";

export type TextGroup = {
  id: string;
  title: string;
  keys: string[];
};

/** Human-friendly section names, keyed by the prefix used in translation keys. */
const GROUP_TITLES: Record<string, string> = {
  nav: "Навигация",
  hero: "Главный слайдер",
  services: "Услуги",
  details: "Детали услуг",
  about: "О компании",
  process: "Процесс работы",
  global: "География",
  cta: "Призыв к действию",
  contact: "Форма обратной связи",
  footer: "Футер",
};

export const ALL_TEXT_KEYS: string[] = Object.keys(enCommon as Record<string, string>);

export const DEFAULT_TEXTS = enCommon as Record<string, string>;

export const TEXT_GROUPS: TextGroup[] = Object.entries(GROUP_TITLES).map(([id, title]) => ({
  id,
  title,
  keys: ALL_TEXT_KEYS.filter((key) => key.split(".")[0] === id),
})).filter((group) => group.keys.length > 0);

/** A short label for a single field, derived from its key. */
export function fieldLabel(key: string): string {
  const parts = key.split(".").slice(1);
  return parts.length > 0 ? parts.join(" › ") : key;
}
