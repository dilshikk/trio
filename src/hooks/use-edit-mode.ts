import { createContext, useContext, useState, useEffect } from "react";
import { AUTH_CHANGE_EVENT } from "@/hooks/use-admin-auth.ts";

const TOKEN_KEY = "admin_token";

type EditModeContextType = {
  isEditMode: boolean;
  toggleEditMode: () => void;
  token: string | null;
  isAdmin: boolean;
  logout: () => void;
};

export const EditModeContext = createContext<EditModeContextType>({
  isEditMode: false,
  toggleEditMode: () => {},
  token: null,
  isAdmin: false,
  logout: () => {},
});

export function useEditMode() {
  return useContext(EditModeContext);
}

function readToken(): string | null {
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
}

export function useEditModeState() {
  const [token, setToken] = useState<string | null>(readToken);
  const [isEditMode, setIsEditMode] = useState(false);

  // Re-read token when login/logout happens in the same tab
  useEffect(() => {
    const handleAuthChange = () => {
      setToken(readToken());
    };
    window.addEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
    return () => window.removeEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
  }, []);

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setIsEditMode(false);
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  };

  return {
    token,
    isAdmin: !!token,
    isEditMode,
    toggleEditMode: () => setIsEditMode(v => !v),
    logout,
  };
}
