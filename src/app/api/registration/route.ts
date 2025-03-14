import { NextResponse } from "next/server";

import { createSession } from "@/lib/session";
import type { BackendErrorResponse, BackendResponse, JwtPayload, RegistrationCredentials } from "@/types";

function parseJwt(token: string) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = Buffer.from(base64, "base64").toString("utf-8");
    return JSON.parse(jsonPayload) as JwtPayload;
}

export async function POST(request: Request) {
    try {
        const { name, email, password } = (await request.json()) as RegistrationCredentials;

        // Регистрация пользователя
        const registrationResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/Account/registration`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        if (!registrationResponse.ok) {
            const errorData: BackendErrorResponse = (await registrationResponse.json()) as BackendErrorResponse;
            const errorMessage = typeof errorData.errors[0] === "object" ? "Ошибка регистрации" : errorData.errors[0];

            return NextResponse.json(
                { success: false, message: errorMessage || "Ошибка регистрации" },
                { status: registrationResponse.status },
            );
        }

        // Автоматическая аутентификация после регистрации
        const authResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/Account/authentication`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!authResponse.ok) {
            const errorData: BackendErrorResponse = (await authResponse.json()) as BackendErrorResponse;
            return NextResponse.json(
                { success: false, message: errorData.errors[0] || "Ошибка входа" },
                { status: authResponse.status },
            );
        }

        const { accessToken, refreshToken } = ((await authResponse.json()) as BackendResponse).result;

        // Создание сессии
        const payload = parseJwt(accessToken);
        const response = new NextResponse(
            JSON.stringify({
                success: true,
                accessToken: accessToken,
                refreshToken: refreshToken,
            }),
            { status: 200 },
        );

        await createSession(payload.Id, email, response);

        // Установка токенов в куки
        response.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ success: false, message: "Ошибка сервера" }, { status: 500 });
    }
}
