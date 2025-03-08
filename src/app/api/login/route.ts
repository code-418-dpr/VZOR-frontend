import { NextResponse } from "next/server";
import { updateSession } from "@/lib/session";
import type { LoginCredentials } from "@/types"; 

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

export async function POST(request: Request) {
  try {
    const rawData : unknown = await request.json();
    if (!isLoginCredentials(rawData)) {
      return NextResponse.json(
        { success: false, message: "Неверный формат данных" },
        { status: 400 }
      );
    }

    const credentials: LoginCredentials = rawData;
    // Валидация полей
    if (!credentials.email || !credentials.password) {
      return NextResponse.json(
        { success: false, message: "Необходимо заполнить все поля" },
        { status: 400 }
      );
    }

    // Проверка учетных данных
    if (credentials.email === "admin@gmail.com" && credentials.password === "12345678") {
      const sessionData = {
        userId: "admin",
        isLoggedIn: true,
      };

      const response = await updateSession(sessionData);
      return new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          ...Object.fromEntries(response.headers.entries()),
          "Content-Type": "application/json",
        },
      });
    }

    return NextResponse.json(
      { success: false, message: "Неверные учетные данные" },
      { status: 401 }
    );

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Ошибка сервера" },
      { status: 500 }
    );
  }
}