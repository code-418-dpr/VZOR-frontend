// Тип для ответа проверки сессии
export interface SessionResponse {
    isLoggedIn: boolean;
    userId?: string;
    error?: string;
}

// Тип для успешного ответа авторизации
export interface LoginResponse {
    success: boolean;
    message?: string;
}

// Базовый тип для ошибок API
export interface ErrorResponse {
    message: string;
    [key: string]: unknown; // Позволяет расширять объект ошибки
}

// Тип для данных сессии
export interface SessionData {
    userId: string;
    isLoggedIn: boolean;
}

// Тип для формы авторизации
export interface AuthFormValues {
    email: string;
    password: string;
}

// Тип для хука useAuth
export interface UseAuthReturn {
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    error: string | null;
    loading: boolean;
    isAuthenticated: boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    logout: () => Promise<void>;
}

export interface LoginCredentials {
    email: string;
    password: string;
}
export interface JwtPayload {
    Id: string;
    Email: string;
    Role: string;
    Permission: string[];
    exp: number;
    iss: string;
    aud: string;
}
export interface BackendResponse {
    result: {
        accessToken: string;
        refreshToken: string;
    };
    errors: string[] | null;
    timeGenerated: string;
}

export interface BackendErrorResponse {
    errors: string[];
}
