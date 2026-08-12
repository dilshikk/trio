import { useState, useEffect, useCallback, useRef } from "react";

const TOKEN_KEY = "admin_token";
const API_BASE = import.meta.env.VITE_ADMIN_API_URL ?? "";

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
      // Network error — keep existing state, don't log out
      return;
    }
    // Token invalid — clear
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setIsVerified(false);
    setAdminEmail(null);
  }, []);

  // Only verify on mount (when token exists from localStorage)
  useEffect(() => {
    if (justLoggedIn.current) {
      justLoggedIn.current = false;
      return;
    }
    if (token) {
      verify(token);
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
      throw new Error(data.error ?? "\u041e\u0448\u0438\u0431\u043a\u0430 \u0432\u0445\u043e\u0434\u0430");
    }

    const data = (await res.json()) as { token: string };
    localStorage.setItem(TOKEN_KEY, data.token);
    // Mark as just logged in so the effect doesn't re-verify and potentially flicker
    justLoggedIn.current = true;
    setToken(data.token);
    setIsVerified(true);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setIsVerified(false);
    setAdminEmail(null);
  };

  return { isVerified, adminEmail, login, logout, token };
}
