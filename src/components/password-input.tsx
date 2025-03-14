"use client";

import { Eye, EyeOff } from "lucide-react";

import type React from "react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export function PasswordInput({ className, ...props }: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative">
            <Input type={showPassword ? "text" : "password"} className={cn("pr-10", className)} {...props} />
            <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
        </div>
    );
}
