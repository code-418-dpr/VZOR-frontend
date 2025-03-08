import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { SessionResponse, LoginResponse, ErrorResponse } from "@/types";

type AuthError = string | null;

export const useAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<AuthError>(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

    useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("/api/session");
        if (!response.ok) throw new Error("Session check failed");
        const data = await response.json() as SessionResponse;
        setIsAuthenticated(data.isLoggedIn);
      } catch (err) {
        console.error("Auth check error:", err);
        setIsAuthenticated(false);
      }
    };

    void checkAuthStatus();
  }, [router]); // Добавляем router в зависимости при необходимости

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json() as LoginResponse | ErrorResponse;

        if (!response.ok || "message" in data) {
          throw new Error("message" in data ? data.message : "Authorization failed");
        }

        setIsAuthenticated(true);
        window.location.reload();
        return true; // Возвращаем успешный статус
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [email, password]
  );

  const logout = useCallback(async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      setIsAuthenticated(false);
      window.location.reload();
    } catch (err) {
      console.error("Logout error:", err);
    }
  }, []);

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    isAuthenticated,
    handleSubmit,
    logout,
  };
};