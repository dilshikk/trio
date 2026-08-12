import { createContext, useContext, useState, type ReactNode } from "react";

const TOKEN_KEY = "admin_token";

type EditModeContextType = {
  isEditMode: boolean;
  toggleEditMode: () => void;
  token: string | null;
  isAdmin: boolean;
};

const EditModeContext = createContext<EditModeContextType>({
  isEditMode: false,
  toggleEditMode: () => {},
  token: null,
  isAdmin: false,
});

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [token] = useState<string | null>(() => {
    try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
  });
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <EditModeContext.Provider value={{
      isAdmin: !!token,
      token,
      isEditMode,
      toggleEditMode: () => setIsEditMode(v => !v),
    }}>
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  return useContext(EditModeContext);
}
