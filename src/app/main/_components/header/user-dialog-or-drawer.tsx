"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useUpdating } from "@/hooks/use-updating";
import { SessionCached } from "@/types";

interface Inputs {
    field: string;
}

interface Props extends Inputs {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onUpdateSuccess?: (newUsername?: string) => void;
}

export default function UserDialogOrDrawer({ field, open, setOpen }: Props) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return isDesktop ? UserDialog({ field, open, setOpen }) : UserDrawer({ field, open, setOpen });
}

function UserDialog({ field, open, setOpen }: Props) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl">Изменить</DialogTitle>
                </DialogHeader>
                <UserChangesForm field={field} />
            </DialogContent>
        </Dialog>
    );
}

function UserDrawer({ field, open, setOpen }: Props) {
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent className="p-4 text-center">
                <DrawerHeader>
                    <DrawerTitle className="text-2xl">Изменить</DrawerTitle>
                </DrawerHeader>
                <UserChangesForm field={field} />
            </DrawerContent>
        </Drawer>
    );
}

function UserChangesForm({ field, onUpdateSuccess }: Inputs & { onUpdateSuccess?: (newUsername?: string) => void }) {
    const { updateAccount } = useUpdating();
    const [session, setSession] = useState<SessionCached | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        currentPassword: "",
        newPassword: "",
    });
    const [errors, setErrors] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const sessionData = localStorage.getItem("session");
        if (sessionData) {
            try {
                const parsedSession = JSON.parse(sessionData) as SessionCached;
                setSession(parsedSession);
                if (field === "Имя") {
                    setFormData((prev) => ({ ...prev, name: parsedSession.username ?? "" }));
                }
            } catch (error) {
                console.error("Session parse error:", error);
            }
        }
    }, [field]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors([]);

        try {
            const result = await updateAccount(
                field === "Имя" ? formData.name : undefined,
                field === "Пароль" ? formData.currentPassword : undefined,
                field === "Пароль" ? formData.newPassword : undefined,
            );

            if (result.success) {
                onUpdateSuccess?.(formData.name);
                if (field === "Имя" && session) {
                    const newSession = { ...session, username: formData.name };
                    localStorage.setItem("session", JSON.stringify(newSession));
                }
                window.location.reload(); // Для обновления UI
            } else {
                const errorMessages = result.errors.map((e) => {
                    if ("errorMessage" in e) {
                        return e.errorMessage || "Неизвестная ошибка";
                    }
                    return "message" in e ? e.message : "Неизвестная ошибка";
                });

                setErrors(errorMessages.length > 0 ? errorMessages : ["Неизвестная ошибка"]);
            }
        } catch (error) {
            console.error("Update failed:", error);
            setErrors(["Ошибка соединения с сервером"]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            className="grid items-start gap-4"
            onSubmit={(e) => {
                void handleSubmit(e);
            }}
        >
            {field === "Пароль" ? (
                <div className="grid gap-2">
                    <Label className="text-base" htmlFor="old-password">
                        Старый пароль
                    </Label>
                    <Input
                        type="password"
                        id="old-password"
                        value={formData.currentPassword}
                        onChange={(e) => {
                            setFormData({ ...formData, currentPassword: e.target.value });
                        }}
                        required
                    />
                    <Separator className="mt-3" />
                    <Label className="text-base" htmlFor="new-password">
                        Новый пароль
                    </Label>
                    <Input
                        type="password"
                        id="new-password"
                        value={formData.newPassword}
                        onChange={(e) => {
                            setFormData({ ...formData, newPassword: e.target.value });
                        }}
                        required
                    />
                </div>
            ) : (
                <div className="grid gap-2">
                    <Label className="text-base" htmlFor="name">
                        Имя
                    </Label>
                    <Input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                        }}
                        required
                    />
                </div>
            )}

            {errors.length > 0 && (
                <div className="text-sm text-red-500">
                    {errors.map((error, index) => (
                        <div key={index}>{error}</div>
                    ))}
                </div>
            )}

            <Button type="submit" disabled={isLoading}>
                {isLoading ? "Сохранение..." : "Изменить"}
            </Button>
        </form>
    );
}
