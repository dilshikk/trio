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
  onSaved: (key: string, value: string) => void;
};

export default function TextField({
  locale,
  textKey,
  defaultValue,
  savedValue,
  token,
  onSaved,
}: TextFieldProps) {
  const currentValue = savedValue ?? defaultValue;
  const [draft, setDraft] = useState(currentValue);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setDraft(currentValue);
  }, [currentValue, locale]);

  const isDirty = draft !== currentValue;
  const isOverridden = savedValue !== undefined && savedValue !== "";
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
        throw new Error(data.error ?? "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0441\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c");
      }
      toast.success("\u0421\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u043e");
      onSaved(textKey, value);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u044f");
      setDraft(currentValue);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-2 rounded-md border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <Label htmlFor={`${locale}-${textKey}`} className="text-xs font-medium tracking-wide">
          {fieldLabel(textKey)}
          {isOverridden && (
            <span className="ml-2 rounded bg-primary/15 px-1.5 py-0.5 text-[10px] text-primary">
              \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u043e
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
          \u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c
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
            \u0412\u0435\u0440\u043d\u0443\u0442\u044c \u0438\u0441\u0445\u043e\u0434\u043d\u044b\u0439
          </Button>
        )}
      </div>
    </div>
  );
}
