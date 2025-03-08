"use client";

import { Search } from "lucide-react";

import * as React from "react";
import { useState } from "react";

import { SearchForm } from "@/app/main/_components/search/search-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SearchSidebar() {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return isDesktop ? Sidebar() : SearchDrawer({ open, setOpen });
}

function Sidebar() {
    return (
        <Card className="mx-3">
            <CardHeader>
                <CardTitle>Поиск фото</CardTitle>
                <CardDescription>Поиск по фотографиям, которые ранее были обработаны</CardDescription>
            </CardHeader>
            <CardContent>
                <SearchForm />
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button>Поиск</Button>
            </CardFooter>
        </Card>
    );
}

function SearchDrawer({ open, setOpen }: Props) {
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" size="icon" className="m-2">
                    <Search />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="text-center text-2xl">Поиск фото</DrawerTitle>
                </DrawerHeader>
                <div className="mx-5">
                    <SearchForm />
                </div>
                <DrawerFooter className="pt-2">
                    <Button>Поиск</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Закрыть</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
