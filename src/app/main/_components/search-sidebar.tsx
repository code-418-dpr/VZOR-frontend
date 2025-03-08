"use client";

import { Search } from "lucide-react";

import * as React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

function SearchForm() {
    const [objectFind, setObjectFind] = useState(false);
    const [textFind, setTextFind] = useState(false);

    return (
        <form>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="general-search">Общий поиск по изображениям</Label>
                    <Input id="general-search" placeholder="Текст" />
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="meta-object">Поиск по объектам на изображении</Label>
                    <Input disabled={objectFind} id="meta-object" placeholder="Объект" />
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="is-object-find"
                        checked={objectFind}
                        onCheckedChange={() => {
                            setObjectFind(!objectFind);
                        }}
                    />
                    <label
                        htmlFor="is-object-find"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Объектов не найдено
                    </label>
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="meta-text">Поиск по тексту на изображении</Label>
                    <Input disabled={textFind} id="meta-text" placeholder="Текст" />
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="is-text-find"
                        checked={textFind}
                        onCheckedChange={() => {
                            setTextFind(!textFind);
                        }}
                    />
                    <label
                        htmlFor="is-text-find"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Текст не найден
                    </label>
                </div>
            </div>
        </form>
    );
}
