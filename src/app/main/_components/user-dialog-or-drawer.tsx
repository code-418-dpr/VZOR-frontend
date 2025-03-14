"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "@/hooks/use-media-query";

interface Inputs {
    field: string;
}

interface Props extends Inputs {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
                <form className="grid items-start gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="field">{field}</Label>
                        <Input type={field === "Почта" ? "email" : "text"} id="field" />
                    </div>
                    <Button type="submit">Изменить</Button>
                </form>
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

function UserChangesForm({ field }: Inputs) {
    return (
        <form className="grid items-start gap-4">
            {field === "Пароль" ? (
                <div className="grid gap-2">
                    <Label className="text-base" htmlFor="old-password">
                        Старый пароль
                    </Label>
                    <Input type="password" id="old-password" />
                    <Separator className="mt-3" />
                    <Label className="text-base" htmlFor="new-password">
                        Новый пароль
                    </Label>
                    <Input type="password" id="new-password" />
                </div>
            ) : (
                <div className="grid gap-2">
                    <Label className="text-base" htmlFor="name">
                        Имя
                    </Label>
                    <Input type="text" id="name" />
                </div>
            )}

            <Button type="submit">Изменить</Button>
        </form>
    );
}
