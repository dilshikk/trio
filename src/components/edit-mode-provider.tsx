import type { ReactNode } from "react";
import { EditModeContext, useEditModeState } from "@/hooks/use-edit-mode.ts";

export function EditModeProvider({ children }: { children: ReactNode }) {
  const state = useEditModeState();
  return (
    <EditModeContext.Provider value={state}>
      {children}
    </EditModeContext.Provider>
  );
}
