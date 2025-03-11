import React, { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import type { ErrorResponse, LoginResponse, SessionCached, SessionResponse } from "@/types";

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
            const cachedSession = localStorage.getItem("session");
            if (cachedSession) {
                const session = JSON.parse(cachedSession) as SessionCached;
                setIsAuthenticated(session.success || false);
                return;
            }

            try {
                const response = await fetch("/api/session");
                if (!response.ok) throw new Error("Session check failed");

                const data = (await response.json()) as SessionResponse;
                setIsAuthenticated(data.isLoggedIn || false);
            } catch (err) {
                console.error("Auth check error:", err);
                setIsAuthenticated(false);
            }
        };

        void checkAuthStatus();
    }, [router]);

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
                const data = (await response.json()) as LoginResponse | ErrorResponse;

                if (!response.ok || "message" in data) {
                    throw new Error("message" in data ? data.message : "Authorization failed");
                }

                setIsAuthenticated(true);
                localStorage.setItem("session", JSON.stringify(data));
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
        [email, password],
    );

    const logout = useCallback(async () => {
        try {
            // Отправляем запрос на выход
            await fetch("/api/logout", { method: "POST" });
            // Сбрасываем состояние аутентификации
            localStorage.removeItem("session");
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
