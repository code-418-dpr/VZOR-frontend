import { Menu } from "lucide-react";

import * as React from "react";

import AuthDialogOrDrawer from "@/app/(landing)/_components/auth/auth-dialog-or-drawer";
import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/theming/mode-toggle";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { cn, scrollToElement } from "@/lib/utils";

const navLinks = [
    { label: "Демо", sectionId: "demo" },
    { label: "FAQ", sectionId: "faq" },
];

interface HeaderProps {
    visible: boolean;
}

export default function Header({ visible }: HeaderProps) {
    const [open, setOpen] = React.useState(false);
    const navLinkElements = navLinks.map((link) => (
        <div
            className="text-muted-foreground hover:text-foreground"
            key={link.sectionId}
            onClick={() => {
                scrollToElement(link.sectionId);
                setOpen(false);
            }}
        >
            {link.label}
        </div>
    ));

    return (
        <header>
            <div
                className={cn(
                    "bg-background/70 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md transition-opacity duration-500 ease-in-out",
                    visible ? "opacity-100" : "opacity-0",
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
                            <nav className="flex flex-col gap-4">{navLinkElements}</nav>
                        </DrawerContent>
                    </Drawer>
                    <div
                        onClick={() => {
                            scrollToElement("hero");
                        }}
                    >
                        <Logo width={120} />
                    </div>
                    <nav
                        className={cn(
                            "hidden items-center gap-4 md:flex",
                            visible ? "pointer-events-auto" : "pointer-events-none",
                        )}
                    >
                        {navLinkElements}
                    </nav>
                </div>
            </div>

            <div className="fixed right-0 z-50 mx-4 flex h-16 items-center space-x-2 sm:mx-12 md:mx-24 lg:mx-48">
                <AuthDialogOrDrawer />
                <ModeToggle />
            </div>
        </header>
    );
}
