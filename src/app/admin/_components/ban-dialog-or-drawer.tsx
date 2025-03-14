"use client";

import { Ban } from "lucide-react";

import React, { useState } from "react";

import BanReportForm from "@/app/admin/_components/ban-report-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
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
                            <Button variant="outline" size="icon" className="cursor-pointer">
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
                    <BanReportForm user={user} />
                </DialogContent>
            </Dialog>
        </TooltipProvider>
    );
}

function BanDrawer({ user, open, setOpen }: Props) {
    return (
        <TooltipProvider>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="cursor-pointer">
                                <Ban />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Заблокировать</p>
                        </TooltipContent>
                    </Tooltip>
                </DrawerTrigger>
                <DrawerContent className="p-4 text-center">
                    <DrawerHeader>
                        <DrawerTitle className="text-2xl">Блокировка</DrawerTitle>
                    </DrawerHeader>
                    <BanReportForm user={user} />
                </DrawerContent>
            </Drawer>
        </TooltipProvider>
    );
}
