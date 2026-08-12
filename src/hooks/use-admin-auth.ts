import { useState, useEffect, useCallback, useRef } from "react";

const TOKEN_KEY = "admin_token";
const API_BASE = import.meta.env.VITE_ADMIN_API_URL ?? "";

// Custom event dispatched when admin auth state changes (same tab)
const AUTH_CHANGE_EVENT = "admin-auth-change";

export function dispatchAdminAuthChange() {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export { AUTH_CHANGE_EVENT };

export function useAdminAuth() {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY)
  );
  const [isVerified, setIsVerified] = useState<boolean | null>(
    // If no token on mount — immediately false, no need to verify
    () => (localStorage.getItem(TOKEN_KEY) ? null : false)
  );
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  // Prevent verify() from running after a fresh login
  const justLoggedIn = useRef(false);

  const verify = useCallback(async (t: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/verify`, {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (res.ok) {
        const data = (await res.json()) as { valid: boolean; email?: string };
        if (data.valid) {
          setIsVerified(true);
          setAdminEmail(data.email ?? null);
          return;
        }
      }
    } catch {
      // Network error — token exists, assume still valid to avoid infinite loading
      setIsVerified(true);
      return;
    }
    // Token invalid — clear
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setIsVerified(false);
    setAdminEmail(null);
    dispatchAdminAuthChange();
  }, []);

  // Only verify on mount (when token exists from localStorage)
  useEffect(() => {
    if (justLoggedIn.current) {
      justLoggedIn.current = false;
      return;
    }
    if (token) {
      void verify(token);
    }
  }, [token, verify]);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      throw new Error(data.error ?? "Ошибка входа");
    }

    const data = (await res.json()) as { token: string };
    localStorage.setItem(TOKEN_KEY, data.token);
    // Mark as just logged in so the effect doesn't re-verify and potentially flicker
    justLoggedIn.current = true;
    setToken(data.token);
    setIsVerified(true);
    dispatchAdminAuthChange();
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setIsVerified(false);
    setAdminEmail(null);
    dispatchAdminAuthChange();
  };

  return { isVerified, adminEmail, login, logout, token };
}
