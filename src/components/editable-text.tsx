import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useEditMode } from "@/hooks/use-edit-mode.ts";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

const API_BASE = import.meta.env.VITE_ADMIN_API_URL ?? "";

type Props = {
  tKey: string;
  multiline?: boolean;
};

export default function EditableText({ tKey, multiline }: Props) {
  const { t, i18n } = useTranslation("common");
  const { isEditMode, token } = useEditMode();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);

  const text = t(tKey);
  const locale = i18n.language;
  const isLong = multiline ?? (text.includes("\n") || text.length > 100);

  if (!isEditMode) return <>{text}</>;

  if (editing) {
    const save = async () => {
      setSaving(true);
      try {
        const res = await fetch(`${API_BASE}/api/site-texts`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token ?? ""}` },
          body: JSON.stringify({ locale, key: tKey, value: draft }),
        });
        if (!res.ok) throw new Error("error");
        i18n.addResourceBundle(locale, "common", { [tKey]: draft }, true, true);
        i18n.emit("languageChanged", locale);
        toast.success("\u0421\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u043e");
        setEditing(false);
      } catch {
        toast.error("\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u044f");
      } finally {
        setSaving(false);
      }
    };

    return (
      <span className="inline-flex items-start gap-1" style={{ fontFamily: "Geist, sans-serif" }}>
        {isLong ? (
          <textarea
            autoFocus
            value={draft}
            rows={3}
            onChange={e => setDraft(e.target.value)}
            className="bg-black/90 text-white text-sm border border-blue-500 rounded px-2 py-1 resize-y min-w-[200px]"
          />
        ) : (
          <input
            autoFocus
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") void save(); if (e.key === "Escape") setEditing(false); }}
            className="bg-black/90 text-white text-sm border border-blue-500 rounded px-2 py-0.5 min-w-[140px]"
          />
        )}
        <button onClick={() => void save()} disabled={saving} className="mt-0.5 p-1 bg-blue-500 text-white rounded cursor-pointer shrink-0 hover:bg-blue-600">
          <Check className="w-3 h-3" />
        </button>
        <button onClick={() => setEditing(false)} className="mt-0.5 p-1 bg-white/20 text-white rounded cursor-pointer shrink-0 hover:bg-white/40">
          <X className="w-3 h-3" />
        </button>
      </span>
    );
  }

  return (
    <span
      className="relative group/et cursor-pointer ring-1 ring-inset ring-transparent hover:ring-blue-500/70 rounded-sm transition-all duration-150"
      onClick={() => { setDraft(text); setEditing(true); }}
      title={`\u2712 ${tKey}`}
    >
      {text}
      <span className="pointer-events-none absolute -top-5 left-0 hidden group-hover/et:flex bg-blue-600 text-white text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap z-[200]">
        \u2712 {tKey.split(".").slice(-2).join(".")}
      </span>
    </span>
  );
}
