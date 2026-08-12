import { createContext, useContext, useState } from "react";

const TOKEN_KEY = "admin_token";

type EditModeContextType = {
  isEditMode: boolean;
  toggleEditMode: () => void;
  token: string | null;
  isAdmin: boolean;
};

export const EditModeContext = createContext<EditModeContextType>({
  isEditMode: false,
  toggleEditMode: () => {},
  token: null,
  isAdmin: false,
});

export function useEditMode() {
  return useContext(EditModeContext);
}

export function useEditModeState() {
  const [token] = useState<string | null>(() => {
    try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
  });
  const [isEditMode, setIsEditMode] = useState(false);
  return { token, isAdmin: !!token, isEditMode, toggleEditMode: () => setIsEditMode(v => !v) };
}
