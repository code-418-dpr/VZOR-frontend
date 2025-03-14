import { useCallback, useState } from "react";

import { useRouter } from "next/navigation";

import { DecodedJwt, ErrorResponse, LoginResponse, SessionCached } from "@/types";

type RegistrationError = string | null;

// Добавляем функцию декодирования JWT
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

export const useRegistration = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [error, setError] = useState<RegistrationError>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            if (password !== repeatedPassword) {
                throw new Error("Пароли не совпадают");
            }

            const response = await fetch("/api/registration", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = (await response.json()) as LoginResponse | ErrorResponse;

            if (!response.ok || "message" in data) {
                throw new Error("message" in data ? data.message : "Ошибка регистрации");
            }

            // Декодируем токен и извлекаем данные
            const { accessToken } = data as SessionCached;
            const decoded = parseJwt(accessToken);

            if (!decoded) {
                throw new Error("Ошибка обработки токена");
            }

            // Формируем объект сессии
            const sessionData: SessionCached = {
                ...(data as SessionCached),
                role: decoded.Role[0] || "User",
                username: decoded.Username || name,
            };

            localStorage.setItem("session", JSON.stringify(sessionData));
            router.refresh();
            router.push("/main");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Неизвестная ошибка");
            return false;
        } finally {
            setLoading(false);
        }
        return true;
    }, [name, email, password, repeatedPassword, router]);

    return {
        name,
        email,
        password,
        repeatedPassword,
        error,
        loading,
        setName,
        setEmail,
        setPassword,
        setRepeatedPassword,
        handleSubmit,
    };
};
