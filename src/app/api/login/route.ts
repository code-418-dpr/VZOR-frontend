import { NextResponse } from "next/server";

import { createSession } from "@/lib/session";
import type { BackendResponse, JwtPayload, LoginCredentials } from "@/types";

function isLoginCredentials(data: unknown): data is LoginCredentials {
    return (
        typeof data === "object" &&
        data !== null &&
        "email" in data &&
        "password" in data &&
        typeof data.email === "string" &&
        typeof data.password === "string"
    );
}

function parseJwt(token: string) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = Buffer.from(base64, "base64").toString("utf-8");
    return JSON.parse(jsonPayload) as JwtPayload;
}

export async function POST(request: Request) {
    try {
        const rawData: unknown = await request.json();
        if (!isLoginCredentials(rawData)) {
            return NextResponse.json({ success: false, message: "Неверный формат данных" }, { status: 400 });
        }

        const credentials = rawData;
        if (!credentials.email || !credentials.password) {
            return NextResponse.json({ success: false, message: "Необходимо заполнить все поля" }, { status: 400 });
        }

        // Отправляем запрос к бэкенду
        const backendResponse = await fetch(`${process.env.FRONTEND_BACKEND_URL}/Account/authentication`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            }),
        });

        if (!backendResponse.ok) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Неверные учетные данные",
                },
                { status: backendResponse.status },
            );
        }

        const responseData: BackendResponse = (await backendResponse.json()) as BackendResponse;
        const { accessToken, refreshToken } = responseData.result;

        // Извлекаем данные пользователя из токена
        const payload = parseJwt(accessToken);
        const userId: string = payload.Id;
        const email: string = payload.Email;
        // Создаем ответ
        const response = new NextResponse(
            JSON.stringify({
                success: true,
                accessToken: accessToken,
                refreshToken: refreshToken,
            }),
            { status: 200 },
        );

        // Создаем сессию с ID пользователя
        await createSession(userId, email, response);

        // Устанавливаем токены в куки
        response.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Ошибка аутентификации:", error);
        return NextResponse.json({ success: false, message: "Ошибка сервера" }, { status: 500 });
    }
}
