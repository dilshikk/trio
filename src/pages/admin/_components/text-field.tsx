import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";
import { fieldLabel } from "../_lib/text-groups.ts";

const API_BASE = import.meta.env.VITE_ADMIN_API_URL ?? "";

type TextFieldProps = {
  locale: string;
  textKey: string;
  defaultValue: string;
  savedValue: string | undefined;
  token: string;
};

export default function TextField({
  locale,
  textKey,
  defaultValue,
  savedValue,
  token,
}: TextFieldProps) {
  const currentValue = savedValue ?? defaultValue;
  const [draft, setDraft] = useState(currentValue);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setDraft(currentValue);
  }, [currentValue, locale]);

  const isDirty = draft !== currentValue;
  const isOverridden = savedValue !== undefined;
  const isLong = defaultValue.length > 70 || defaultValue.includes("\n");

  const save = async (value: string) => {
    setIsSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/site-texts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ locale, key: textKey, value }),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Не удалось сохранить текст");
      }
      toast.success("Сохранено");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Не удалось сохранить текст");
      setDraft(currentValue);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-2 rounded-md border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <Label htmlFor={`${locale}-${textKey}`} className="text-xs tracking-wide">
          {fieldLabel(textKey)}
          {isOverridden && (
            <span className="ml-2 rounded bg-primary/15 px-1.5 py-0.5 text-[10px] text-primary">
              изменено
            </span>
          )}
        </Label>
        <span className="shrink-0 font-mono text-[10px] text-muted-foreground">{textKey}</span>
      </div>

      {isLong ? (
        <Textarea
          id={`${locale}-${textKey}`}
          value={draft}
          rows={3}
          onChange={(e) => setDraft(e.target.value)}
          className="resize-y"
        />
      ) : (
        <Input
          id={`${locale}-${textKey}`}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
      )}

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          disabled={!isDirty || isSaving}
          onClick={() => void save(draft)}
          className="cursor-pointer"
        >
          {isSaving ? <Spinner className="size-3.5" /> : <Check className="size-3.5" />}
          Сохранить
        </Button>
        {isOverridden && (
          <Button
            size="sm"
            variant="ghost"
            disabled={isSaving}
            onClick={() => void save("")}
            className="cursor-pointer"
          >
            <RotateCcw className="size-3.5" />
            Вернуть исходный
          </Button>
        )}
      </div>
    </div>
  );
}
