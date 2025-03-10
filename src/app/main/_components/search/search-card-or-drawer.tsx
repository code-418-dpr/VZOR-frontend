"use client";

import { Search } from "lucide-react";

import * as React from "react";
import { useState } from "react";

import { SearchForm } from "@/app/main/_components/search/search-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@/hooks/use-media-query";

export function SearchCardOrDrawer() {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return isDesktop ? SearchCard() : SearchDrawer({ open, setOpen });
}

function SearchCard() {
    return (
        <Card className="m-4 max-h-[calc(100vh-2.5rem)]">
            <CardHeader>
                <CardTitle className="text-xl">Поиск</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea>
                    <SearchForm />
                </ScrollArea>
            </CardContent>
        </Card>
    );
}

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchDrawer({ open, setOpen }: Props) {
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" className="w-12 h-12 m-4">
                    <div className="transform scale-150">
                        <Search />
                    </div>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="p-4">
                <DrawerHeader>
                    <DrawerTitle className="text-center text-2xl">Поиск</DrawerTitle>
                </DrawerHeader>
                <SearchForm />
            </DrawerContent>
        </Drawer>
    );
}
