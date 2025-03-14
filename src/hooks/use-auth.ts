import React, { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import type { DecodedJwt, ErrorResponse, LoginResponse, SessionCached, SessionResponse } from "@/types";

type AuthError = string | null;

const parseJwt = (token: string) => {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join(""),
        );
        return JSON.parse(jsonPayload) as DecodedJwt;
    } catch (error) {
        console.error("Failed to parse JWT:", error);
        return null;
    }
};

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

                // Декодируем JWT и извлекаем данные
                const { accessToken } = data as SessionCached;
                const decoded = parseJwt(accessToken);
                if (!decoded) throw new Error("Failed to decode token");

                // Сохраняем данные в localStorage
                const sessionData: SessionCached = {
                    ...(data as SessionCached),
                    role: decoded.Role[0],
                    email: decoded.Email,
                };
                localStorage.setItem("session", JSON.stringify(sessionData));

                setIsAuthenticated(true);
                router.push("/main");
                return true;
            } catch (err) {
                const message = err instanceof Error ? err.message : "Unknown error";
                setError(message);
                return false;
            } finally {
                setLoading(false);
            }
        },
        [email, password, router],
    );

    const logout = useCallback(async () => {
        try {
            await fetch("/api/logout", { method: "POST" });
            localStorage.removeItem("session");
            setIsAuthenticated(false);
            router.push("/");
        } catch (err) {
            console.error("Logout error:", err);
        }
    }, [router]);
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
