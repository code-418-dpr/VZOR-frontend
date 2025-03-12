"use client";

import { Ban, Send } from "lucide-react";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useMediaQuery } from "@/hooks/use-media-query";

interface InputProps {
    user: string;
}

interface Props extends InputProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BanDialogOrDrawer({ user }: InputProps) {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [open, setOpen] = useState(false);

    return isDesktop ? BanDialog({ user, open, setOpen }) : BanDrawer({ user, open, setOpen });
}

function BanDialog({ user, open, setOpen }: Props) {
    return (
        <TooltipProvider>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Ban />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Заблокировать</p>
                        </TooltipContent>
                    </Tooltip>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center text-2xl">Блокировка</DialogTitle>
                    </DialogHeader>
                    <BanForm user={user} />
                </DialogContent>
            </Dialog>
        </TooltipProvider>
    );
}

function BanDrawer({ user, open, setOpen }: Props) {
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Ban />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Заблокировать</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </DrawerTrigger>
            <DrawerContent className="p-4 text-center">
                <DrawerHeader>
                    <DrawerTitle className="text-2xl">Блокировка</DrawerTitle>
                </DrawerHeader>
                <BanForm user={user} />
            </DrawerContent>
        </Drawer>
    );
}

function BanForm({ user }: InputProps) {
    const [message, setMessage] = useState("");

    return (
        <form className="grid items-start gap-4">
            <div className="grid gap-2">
                <Label htmlFor="field">Причина блокировки пользователя: {user}</Label>
                <Textarea
                    className="h-48 max-h-280 min-h-24 w-full"
                    placeholder="Причина блокировки"
                    rows={4}
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                />
            </div>
            <Button className="w-min">
                <Send />
                Отправить
            </Button>
        </form>
    );
}
