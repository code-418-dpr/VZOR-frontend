import React, { createContext, useEffect, useLayoutEffect, useState } from "react";

import { AccountsService } from "@/api/accounts";
import { api } from "@/api/api";
import { User } from "@/models/user";

type AuthContextType = {
    accessToken: string | undefined;
    user: User | undefined;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    setAccessToken: (token: string | undefined) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type Props = {
    children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
    const [accessToken, setAccessToken] = useState<string | undefined>();
    // const [refreshToken, setRefreshToken] = useState<string | undefined>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [user, setUser] = useState<User | undefined>();

    useEffect(() => {
        const accessTokenInterceptor = api.interceptors.request.use((config) => {
            config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : config.headers.Authorization;

            return config;
        });

        return () => {
            api.interceptors.response.eject(accessTokenInterceptor);
        };
    }, [accessToken]);

    useLayoutEffect(() => {
        const refreshInterceptor = api.interceptors.response.use(
            (config) => config,
            async (error) => {
                if (error.response.status === 401) {
                    const originalRequest = error.config;

                    try {
                        const response = await AccountsService.refresh();

                        setAccessToken(response.data.result!.accessToken);

                        originalRequest.headers.Authorization = `Bearer ${response.data.result!.accessToken}`;

                        return api(originalRequest);
                    } catch (error) {
                        console.log(error);
                        setAccessToken(undefined);
                    }
                }

                return Promise.reject(error);
            },
        );

        return () => {
            api.interceptors.response.eject(refreshInterceptor);
        };
    }, []);

    const login = async (email: string, password: string): Promise<void> => {
        try {
            const response = await AccountsService.login(email, password);
            setAccessToken(response.data.result!.accessToken);
        } catch {
            console.log("error");
        }
    };

    const logout = async () => {
        try {
            await AccountsService.logout();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthContext.Provider value={{ accessToken, user, login, logout, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};
