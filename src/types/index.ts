// Тип для ответа проверки сессии
import React from "react";

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

export type Session = {
    userId: string;
    email: string; // Добавляем email
    isLoggedIn: boolean;
    success: boolean; // Добавляем статус success
} | null;

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

export interface SessionCached {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    role?: string;
    username?: string;
}
export interface AccountUpdateResponse {
    result: {
        errors: {
            errorCode: string;
            errorMessage: string;
            type: number;
            invalidField: string | null;
        }[];
        isSuccess: boolean;
        isFailure: boolean;
    };
    errors: unknown[] | null;
    timeGenerated: string;
}
export interface DecodedJwt {
    Role: string[];
    Email: string;
    Username: string;
    [key: string]: unknown;
}
export interface RegistrationCredentials {
    name: string;
    email: string;
    password: string;
}
export interface ApiImage {
    id: string;
    userId: string;
    uploadDate: string;
    uploadLink: string;
    processingResult: {
        description: string;
        objects: unknown[];
        text: string;
    };
    presignedDownloadUrl: string;
}

export interface ApiResponse {
    result: {
        value: {
            items: ApiImage[];
            pageSize: number;
            page: number;
            totalCount: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
        errors: {
            errorCode: string;
            errorMessage: string;
            type: number;
            invalidField: string | null;
        }[];
        isSuuccess: boolean;
        isFailure: boolean;
    };
    errors: unknown;
    timeGenerated: string;
}
export interface ApiSearchResponse {
    result: {
        value: ApiImage[];
        errors: {
            errorCode: string;
            errorMessage: string;
            type: number;
            invalidField: string | null;
        }[];
        isSuuccess: boolean;
        isFailure: boolean;
    };
    errors: unknown;
    timeGenerated: string;
}
export interface PictureTest {
    id: string;
    date: string;
    url: string;
    processingResult?: {
        description: string;
        objects: string[];
        text: string;
    };
}

export interface ApiImage {
    id: string;
    uploadDate: string;
    presignedDownloadUrl: string;
    processingResult: {
        description: string;
        objects: unknown[];
        text: string;
    };
}
