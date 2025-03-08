import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

interface SignInFormProps extends React.ComponentPropsWithoutRef<"form"> {
    className?: string;
    onSuccess?: () => void;
}

export default function SignInForm({ className, onSuccess }: SignInFormProps) {
    const {
        email,
        setEmail,
        password,
        setPassword,
        error,
        loading,
        handleSubmit
    } = useAuth();

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Важно сохранить preventDefault здесь
        const success = await handleSubmit(e);
        if (success && onSuccess) {
          onSuccess();
        }
      };
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };


    return (
        <form className={cn("grid items-start gap-4", className)} onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault(); void handleSubmit(e);
            }}>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" 
                value={email}
                onChange={handleEmailChange}/>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Пароль</Label>
                <Input type="password" id="repeated_password" 
                value={password}
                onChange={handlePasswordChange}/>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Button type="submit" disabled={loading}>
                {loading ? "Загрузка..." : "Войти"}
            </Button>
        </form>
    );
}