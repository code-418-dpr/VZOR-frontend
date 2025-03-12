import { LogOut, Mail, Menu, User } from "lucide-react";

import * as React from "react";

import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/theming/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function AdminHeader() {
    const [open, setOpen] = React.useState(false);

    return (
        <header>
            <div
                className={cn(
                    "bg-background/70 fixed top-0 right-0 left-0 z-50 border-b opacity-100 backdrop-blur-md transition-opacity duration-500 ease-in-out",
                )}
            >
                <div className="mx-4 flex h-16 max-w-7xl items-center space-x-2 sm:mx-12 md:mx-24 lg:mx-48">
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger asChild>
                            <Button variant="outline" size="icon" className="md:hidden">
                                <Menu />
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent className="p-4 text-center">
                            <DrawerHeader>
                                <DrawerTitle className="text-2xl">Навигация</DrawerTitle>
                            </DrawerHeader>
                        </DrawerContent>
                    </Drawer>
                    <div>
                        <Logo width={120} />
                    </div>
                </div>
            </div>

            <div className="fixed right-0 z-50 mx-4 flex h-16 items-center space-x-2 sm:mx-12 md:mx-24 lg:mx-48">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    {AdminDropdownMenu()}
                </DropdownMenu>

                <ModeToggle />
            </div>
        </header>
    );
}

function AdminDropdownMenu() {
    return (
        <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Логин аккаунта</DropdownMenuLabel>
            <DropdownMenuLabel>Почта аккаунта</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <User />
                    <span>Изменить имя</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Mail />
                    <span>Изменить почту</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <LogOut />
                    <span>Выход</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    );
}
