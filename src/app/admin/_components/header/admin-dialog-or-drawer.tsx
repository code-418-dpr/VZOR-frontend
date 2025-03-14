"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMediaQuery } from "@/hooks/use-media-query";

interface Inputs {
    field: string;
}

interface Props extends Inputs {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AdminDialogOrDrawer({ field, open, setOpen }: Props) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return isDesktop ? AdminDialog({ field, open, setOpen }) : AdminDrawer({ field, open, setOpen });
}

function AdminDialog({ field, open, setOpen }: Props) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl">Изменить</DialogTitle>
                </DialogHeader>
                <AdminChangeForm field={field} />
            </DialogContent>
        </Dialog>
    );
}

function AdminDrawer({ field, open, setOpen }: Props) {
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent className="p-4 text-center">
                <DrawerHeader>
                    <DrawerTitle className="text-2xl">Изменить</DrawerTitle>
                </DrawerHeader>
                <AdminChangeForm field={field} />
            </DrawerContent>
        </Drawer>
    );
}

function AdminChangeForm({ field }: Inputs) {
    return (
        <form className="grid items-start gap-4">
            <div className="grid gap-2">
                <Label htmlFor="field">{field}</Label>
                <Input type={field === "Почта" ? "email" : "text"} id="field" />
            </div>
            <Button type="submit">Изменить</Button>
        </form>
    );
}
