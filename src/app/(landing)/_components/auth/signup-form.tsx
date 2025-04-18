"use client";

import type React from "react";

import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegistration } from "@/hooks/use-registration";
import { cn } from "@/lib/utils";

export default function SignUpForm({ className }: React.ComponentProps<"form">) {
    const {
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
    } = useRegistration();
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        void handleSubmit();
    };

    return (
        <form className={cn("grid items-start gap-4", className)} onSubmit={handleFormSubmit}>
            <div className="grid gap-2">
                <Label htmlFor="name">Имя</Label>
                <Input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Пароль</Label>
                <PasswordInput
                    id="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="repeated_password">Повторить пароль</Label>
                <PasswordInput
                    id="repeated_password"
                    value={repeatedPassword}
                    onChange={(e) => {
                        setRepeatedPassword(e.target.value);
                    }}
                    required
                />
            </div>
            {error && <p className="text-center text-sm text-red-500">{error}</p>}
            <Button type="submit" disabled={loading}>
                {loading ? "Загрузка..." : "Зарегистрироваться"}
            </Button>
        </form>
    );
}
