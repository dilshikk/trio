import { useState, useEffect } from "react";
import { useAdminAuth } from "@/hooks/use-admin-auth.ts";
import AdminLogin from "./_components/AdminLogin.tsx";
import TextField from "./_components/text-field.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Button } from "@/components/ui/button.tsx";
import { LogOut, ExternalLink, Globe } from "lucide-react";
import { TEXT_GROUPS, DEFAULT_TEXTS } from "./_lib/text-groups.ts";
import { SUPPORTED_LOCALES, type SupportedLocale } from "@/i18n";

const API_BASE = import.meta.env.VITE_ADMIN_API_URL ?? "";

export default function AdminPage() {
  const { isVerified, adminEmail, logout, token } = useAdminAuth();
  const [activeLocale, setActiveLocale] = useState<SupportedLocale>("en");
  const [savedTexts, setSavedTexts] = useState<Record<string, string>>({});
  const [loadingTexts, setLoadingTexts] = useState(false);

  // Load saved overrides for the selected locale
  useEffect(() => {
    if (!isVerified) return;
    setLoadingTexts(true);
    fetch(`${API_BASE}/api/site-texts/${activeLocale}`)
      .then((r) => r.json())
      .then((data: Record<string, string>) => setSavedTexts(data ?? {}))
      .catch(() => setSavedTexts({}))
      .finally(() => setLoadingTexts(false));
  }, [activeLocale, isVerified]);

  if (isVerified === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Skeleton className="h-12 w-64" />
      </div>
    );
  }

  if (!isVerified) return <AdminLogin />;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur px-6 py-3 flex items-center justify-between gap-4">
        <h1 className="text-lg font-semibold">TRIO GROUPS — Admin</h1>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Открыть сайт
          </a>
          <span className="text-sm text-muted-foreground hidden sm:block">{adminEmail}</span>
          <Button variant="ghost" size="sm" onClick={logout} className="cursor-pointer gap-1.5">
            <LogOut className="h-4 w-4" />
            Выйти
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Locale switcher */}
        <div className="flex items-center gap-3">
          <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className="text-sm font-medium">Язык редактирования:</span>
          <div className="flex gap-2 flex-wrap">
            {Object.values(SUPPORTED_LOCALES).map((loc) => (
              <button
                key={loc.code}
                onClick={() => setActiveLocale(loc.code as SupportedLocale)}
                className={`px-3 py-1 rounded-md text-sm font-medium cursor-pointer transition-colors ${
                  activeLocale === loc.code
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {loc.emoji} {loc.nativeName}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Редактируете тексты для языка: <strong>{SUPPORTED_LOCALES[activeLocale].nativeName}</strong>.
          Изменения сохраняются мгновенно и отображаются на сайте сразу.
        </p>

        {/* Text groups */}
        {loadingTexts ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : (
          <div className="space-y-10">
            {TEXT_GROUPS.map((group) => (
              <section key={group.id}>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                  {group.title}
                </h2>
                <div className="space-y-3">
                  {group.keys.map((key) => (
                    <TextField
                      key={`${activeLocale}-${key}`}
                      locale={activeLocale}
                      textKey={key}
                      defaultValue={DEFAULT_TEXTS[key] ?? ""}
                      savedValue={savedTexts[key]}
                      token={token ?? ""}
                      onSaved={(key, value) => {
                        setSavedTexts((prev) => {
                          const next = { ...prev };
                          if (value === "") delete next[key];
                          else next[key] = value;
                          return next;
                        });
                      }}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
