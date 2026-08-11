import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Authenticated, AuthLoading, Unauthenticated, useQuery } from "convex/react";
import { ArrowLeft, Lock, Search } from "lucide-react";
import { api } from "@/convex/_generated/api.js";
import { Input } from "@/components/ui/input.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { SignInButton } from "@/components/ui/signin.tsx";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty.tsx";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { SUPPORTED_LOCALES, SUPPORTED_LOCALES_ARRAY, type SupportedLocale } from "@/i18n";
import TextField from "./_components/text-field.tsx";
import { DEFAULT_TEXTS, TEXT_GROUPS } from "./_lib/text-groups.ts";

function AdminEditor() {
  const currentUser = useQuery(api.users.getCurrentUser, {});
  const [locale, setLocale] = useState<SupportedLocale>("en");
  const [search, setSearch] = useState("");
  const overrides = useQuery(api.siteTexts.listByLocale, { locale });

  const groups = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (term === "") return TEXT_GROUPS;
    return TEXT_GROUPS.map((group) => ({
      ...group,
      keys: group.keys.filter(
        (key) =>
          key.toLowerCase().includes(term) ||
          (DEFAULT_TEXTS[key] ?? "").toLowerCase().includes(term) ||
          (overrides?.[key] ?? "").toLowerCase().includes(term),
      ),
    })).filter((group) => group.keys.length > 0);
  }, [search, overrides]);

  if (currentUser === undefined || overrides === undefined) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full bg-muted" />
        ))}
      </div>
    );
  }

  if (currentUser?.role !== "admin") {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Lock />
          </EmptyMedia>
          <EmptyTitle>Нет доступа</EmptyTitle>
          <EmptyDescription>
            Эта страница доступна только администратору сайта.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <SignInButton size="sm" signOutText="Выйти" signInText="Войти" />
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs value={locale} onValueChange={(value) => setLocale(value as SupportedLocale)}>
        <TabsList className="flex-wrap">
          {SUPPORTED_LOCALES_ARRAY.map((code) => (
            <TabsTrigger key={code} value={code} className="cursor-pointer">
              {SUPPORTED_LOCALES[code].emoji} {SUPPORTED_LOCALES[code].nativeName}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="relative">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по тексту или названию поля"
          className="pl-9"
        />
      </div>

      {groups.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Search />
            </EmptyMedia>
            <EmptyTitle>Ничего не найдено</EmptyTitle>
            <EmptyDescription>Попробуйте изменить запрос.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        groups.map((group) => (
          <section key={group.id} className="space-y-3">
            <h2 className="text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              {group.title}
            </h2>
            <div className="grid gap-3">
              {group.keys.map((key) => (
                <TextField
                  key={`${locale}-${key}`}
                  locale={locale}
                  textKey={key}
                  defaultValue={DEFAULT_TEXTS[key] ?? ""}
                  savedValue={overrides[key]}
                />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}

export default function AdminPage() {
  const { lng } = useParams<{ lng: string }>();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-4 py-10 md:px-8">
        <header className="mb-8 space-y-3">
          <Link
            to={`/${lng ?? "en"}`}
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground uppercase hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            На сайт
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Редактор текстов</h1>
          <p className="text-sm text-muted-foreground">
            Измените любой текст на сайте. Изменения появляются сразу.
          </p>
        </header>

        <AuthLoading>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full bg-muted" />
            ))}
          </div>
        </AuthLoading>

        <Unauthenticated>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Lock />
              </EmptyMedia>
              <EmptyTitle>Нужен вход</EmptyTitle>
              <EmptyDescription>
                Войдите, чтобы редактировать тексты сайта.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <SignInButton size="sm" signInText="Войти" signOutText="Выйти" />
            </EmptyContent>
          </Empty>
        </Unauthenticated>

        <Authenticated>
          <AdminEditor />
        </Authenticated>
      </div>
    </main>
  );
}
