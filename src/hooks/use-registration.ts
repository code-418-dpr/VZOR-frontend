import { useCallback, useState } from "react";

import { useRouter } from "next/navigation";

import { ErrorResponse, LoginResponse } from "@/types";

type RegistrationError = string | null;

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
            // Валидация паролей
            if (password !== repeatedPassword) {
                throw new Error("Пароли не совпадают");
            }

            // Отправка запроса
            const response = await fetch("/api/registration", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = (await response.json()) as LoginResponse | ErrorResponse;
            if (!response.ok || "message" in data) {
                throw new Error("message" in data ? data.message : "Ошибка в процессе регистрации");
            }

            localStorage.setItem("session", JSON.stringify(data));
            router.refresh();
            window.location.reload();
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
