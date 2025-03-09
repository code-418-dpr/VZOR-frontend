"use client";

import React, { useState } from "react";

import SignInForm from "@/app/(landing)/_components/auth/signin-form";
import SignUpForm from "@/app/(landing)/_components/auth/signup-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/hooks/use-media-query";

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AuthDialogOrDrawer() {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return isDesktop ? AuthDialog({ open, setOpen }) : AuthDrawer({ open, setOpen });
}

function AuthDialog({ open, setOpen }: Props) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">Авторизация</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl">Авторизация</DialogTitle>
                </DialogHeader>
                <AuthTabs />
            </DialogContent>
        </Dialog>
    );
}

function AuthDrawer({ open, setOpen }: Props) {
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button>Авторизация</Button>
            </DrawerTrigger>
            <DrawerContent className="p-4">
                <DrawerHeader>
                    <DrawerTitle className="text-center text-2xl">Авторизация</DrawerTitle>
                </DrawerHeader>
                <AuthTabs />
            </DrawerContent>
        </Drawer>
    );
}

function AuthTabs() {
    return (
        <Tabs defaultValue="signin">
            <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Вход</TabsTrigger>
                <TabsTrigger value="signup">Регистрация</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
                <SignInForm />
            </TabsContent>
            <TabsContent value="signup">
                <SignUpForm />
            </TabsContent>
        </Tabs>
    );
}
