import { useState, useEffect, useCallback } from "react";

const TOKEN_KEY = "admin_token";
// На VPS API_BASE будет пустым — фронт и сервер на одном домене через nginx proxy
const API_BASE = import.meta.env.VITE_ADMIN_API_URL ?? "";

export function useAdminAuth() {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY)
  );
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

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
      // network error — treat as invalid
    }
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setIsVerified(false);
    setAdminEmail(null);
  }, []);

  useEffect(() => {
    if (token) {
      verify(token);
    } else {
      setIsVerified(false);
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
