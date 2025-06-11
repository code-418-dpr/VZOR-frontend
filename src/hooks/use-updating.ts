import { AccountUpdateResponse, SessionCached } from "@/types";

export const useUpdating = () => {
    const updateAccount = async (name?: string, currentPassword?: string, newPassword?: string) => {
        const sessionData = localStorage.getItem("session");
        if (!sessionData) throw new Error("Сессия не найдена");

        const session = JSON.parse(sessionData) as SessionCached;
        const formData = new FormData();

        if (name) formData.append("Name", name);
        if (currentPassword) formData.append("CurrentPassword", currentPassword);
        if (newPassword) formData.append("NewPassword", newPassword);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_BACKEND_URL}/Account/updating`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
                body: formData,
            });

            const data = (await response.json()) as AccountUpdateResponse;

            // Обновляем сессию при любом успешном запросе
            if (data.result.isSuccess) {
                const updatedSession = { ...session };
                if (name) updatedSession.username = name;
                localStorage.setItem("session", JSON.stringify(updatedSession));
            }

            return {
                success: data.result.isSuccess,
                updatedUsername: name,
                errors: data.result.errors,
            };
        } catch (error) {
            console.error("Update error:", error);
            return { success: false, errors: [{ message: "Network error" }] };
        }
    };

    return { updateAccount };
};
