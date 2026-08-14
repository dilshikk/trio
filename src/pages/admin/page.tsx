import { useState, useEffect, useCallback } from "react";
import { useAdminAuth } from "@/hooks/use-admin-auth.ts";
import AdminLogin from "./_components/AdminLogin.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Button } from "@/components/ui/button.tsx";
import { LogOut, ExternalLink, Inbox, BarChart2, Trash2, Mail, MailOpen, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const API_BASE = import.meta.env.VITE_ADMIN_API_URL ?? "";

type Tab = "submissions" | "info";
type Submission = { id: string; name: string; company: string; email: string; message: string; service: string; read: boolean; createdAt: string };
type Stats = { totalSubmissions: number; unreadSubmissions: number; totalTextOverrides: number; localesEdited: string[] };

const SERVICE_COLORS: Record<string, string> = { LOGISTICS: "#6395ff", ACCOUNTING: "#dcb25a", CONSULTING: "#c4c4c4", "ALL THREE": "#ffffff" };

function SubmissionsTab({ token }: { token: string }) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { const res = await fetch(`${API_BASE}/api/submissions`, { headers: { Authorization: `Bearer ${token}` } }); const data = (await res.json()) as Submission[]; setSubmissions(data); }
    catch { toast.error("Ошибка загрузки заявок"); }
    finally { setLoading(false); }
  }, [token]);

  useEffect(() => { void load(); }, [load]);

  const markRead = async (id: string) => { await fetch(`${API_BASE}/api/submissions/${id}/read`, { method: "PATCH", headers: { Authorization: `Bearer ${token}` } }); setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, read: true } : s)); };
  const deleteItem = async (id: string) => { if (!confirm("Удалить заявку?")) return; await fetch(`${API_BASE}/api/submissions/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }); setSubmissions((prev) => prev.filter((s) => s.id !== id)); toast.success("Заявка удалена"); };
  const unread = submissions.filter((s) => !s.read).length;

  if (loading) return <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3"><h2 className="text-lg font-semibold">Заявки</h2>{unread > 0 && <span className="bg-blue-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">{unread} новых</span>}</div>
        <Button variant="ghost" size="sm" onClick={() => void load()} className="gap-1.5"><RefreshCw className="w-3.5 h-3.5" /> Обновить</Button>
      </div>
      {submissions.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground"><Inbox className="w-10 h-10 mx-auto mb-3 opacity-30" /><p className="text-sm">Заявок пока нет</p><p className="text-xs mt-1 opacity-60">Они появятся, когда кто-то заполнит контактную форму</p></div>
      ) : (
        <div className="divide-y divide-border rounded-lg border overflow-hidden">
          {submissions.map((s) => (
            <div key={s.id} className={`transition-colors ${s.read ? "bg-background" : "bg-blue-500/5"}`}>
              <div className="flex items-start gap-3 p-4 cursor-pointer hover:bg-muted/40" onClick={() => { setExpanded(expanded === s.id ? null : s.id); if (!s.read) void markRead(s.id); }}>
                <div className="mt-0.5 shrink-0">{s.read ? <MailOpen className="w-4 h-4 text-muted-foreground" /> : <Mail className="w-4 h-4 text-blue-500" />}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap"><span className="font-medium text-sm">{s.name}</span>{s.company && <span className="text-xs text-muted-foreground">· {s.company}</span>}{s.service && <span className="text-[10px] px-2 py-0.5 rounded border font-semibold tracking-wide" style={{ color: SERVICE_COLORS[s.service] ?? "#fff", borderColor: (SERVICE_COLORS[s.service] ?? "#fff") + "40" }}>{s.service}</span>}{!s.read && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />}</div>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.email}</p>
                  <p className="text-xs text-muted-foreground/60 mt-0.5 truncate">{s.message}</p>
                </div>
                <div className="shrink-0 text-[11px] text-muted-foreground whitespace-nowrap">{new Date(s.createdAt).toLocaleString("ru", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}</div>
              </div>
              {expanded === s.id && (
                <div className="px-4 pb-4 border-t border-border/50 pt-3 space-y-3 bg-muted/20">
                  <div><p className="text-[10px] tracking-widest text-muted-foreground uppercase mb-1">Сообщение</p><p className="text-sm whitespace-pre-wrap leading-relaxed">{s.message}</p></div>
                  <div className="flex items-center gap-3"><a href={`mailto:${s.email}`} className="text-xs text-blue-500 hover:underline flex items-center gap-1"><Mail className="w-3 h-3" /> Ответить на {s.email}</a><button onClick={() => void deleteItem(s.id)} className="ml-auto text-xs text-destructive hover:text-destructive/80 flex items-center gap-1 cursor-pointer"><Trash2 className="w-3 h-3" /> Удалить</button></div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function InfoTab({ token }: { token: string }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetch(`${API_BASE}/api/stats`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()).then((d: Stats) => setStats(d)).catch(() => {}).finally(() => setLoading(false)); }, [token]);
  const infoCards = [
    { label: "Всего заявок", value: loading ? "—" : String(stats?.totalSubmissions ?? 0), sub: loading ? "" : `${stats?.unreadSubmissions ?? 0} непрочитанных`, color: "text-blue-400" },
    { label: "Правок текстов", value: loading ? "—" : String(stats?.totalTextOverrides ?? 0), sub: loading ? "" : `Языки: ${(stats?.localesEdited ?? []).join(", ") || "нет"}`, color: "text-amber-400" },
  ];
  return (
    <div className="space-y-8">
      <div><h2 className="text-lg font-semibold mb-4">Статистика сайта</h2><div className="grid grid-cols-2 gap-4">{infoCards.map((card) => (<div key={card.label} className="rounded-xl border bg-card p-5 space-y-1"><p className="text-xs text-muted-foreground">{card.label}</p><p className={`text-3xl font-bold ${card.color}`}>{card.value}</p><p className="text-xs text-muted-foreground">{card.sub}</p></div>))}</div></div>
      <div><h2 className="text-lg font-semibold mb-4">О сайте</h2><div className="rounded-xl border bg-card divide-y divide-border overflow-hidden">{[["Домен", "triogroups.uz"], ["Языки", "EN · RU · OZ"], ["Технологии", "React · Vite · Node.js"], ["Компания", "TRIO GROUPS"]].map(([k, v]) => (<div key={k} className="flex items-center justify-between px-5 py-3"><span className="text-sm text-muted-foreground">{k}</span><span className="text-sm font-medium">{v}</span></div>))}</div></div>
      <div><h2 className="text-lg font-semibold mb-4">Быстрые ссылки</h2><div className="flex flex-wrap gap-3"><a href="https://triogroups.uz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm border rounded-lg px-4 py-2 hover:bg-muted transition-colors"><ExternalLink className="w-4 h-4" /> Открыть сайт</a><a href="mailto:info@triogroups.uz" className="inline-flex items-center gap-2 text-sm border rounded-lg px-4 py-2 hover:bg-muted transition-colors"><Mail className="w-4 h-4" /> Email</a></div></div>
    </div>
  );
}

export default function AdminPage() {
  const { isVerified, adminEmail, login, logout, token } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<Tab>("submissions");
  if (isVerified === null) return (<div className="min-h-screen flex items-center justify-center" style={{ background: "oklch(0.06 0 0)" }}><div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" /></div>);
  if (!isVerified) return <AdminLogin onLogin={login} />;
  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "submissions", label: "Заявки", icon: <Inbox className="w-4 h-4" /> },
    { id: "info", label: "О сайте", icon: <BarChart2 className="w-4 h-4" /> },
  ];
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="logo" className="h-6 w-6" />
            <span className="font-semibold text-sm tracking-wider uppercase">TRIO GROUPS — Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <a href="https://triogroups.uz" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"><ExternalLink className="w-3.5 h-3.5" /> Открыть сайт</a>
            <span className="hidden sm:block text-xs text-muted-foreground border-l pl-3 ml-1">{adminEmail}</span>
            <Button variant="ghost" size="sm" onClick={logout} className="gap-1.5 text-xs"><LogOut className="w-3.5 h-3.5" /> Выйти</Button>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex gap-1">{tabs.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-1.5 text-sm px-4 py-2.5 border-b-2 transition-colors cursor-pointer ${ activeTab === tab.id ? "border-primary text-foreground font-medium" : "border-transparent text-muted-foreground hover:text-foreground" }`}>{tab.icon}{tab.label}</button>))}</div>
      </header>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === "submissions" && <SubmissionsTab token={token ?? ""} />}
        {activeTab === "info" && <InfoTab token={token ?? ""} />}
      </main>
    </div>
  );
}
