import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function SignUpForm({ className }: React.ComponentProps<"form">) {
    return (
        <form className={cn("grid items-start gap-4", className)}>
            <div className="grid gap-2">
                <Label htmlFor="name">Имя</Label>
                <Input type="text" id="name" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Пароль</Label>
                <Input type="password" id="password" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Повторить пароль</Label>
                <Input type="password" id="repeated_password" />
            </div>
            <Button type="submit">Зарегистрироваться</Button>
        </form>
    );
}
