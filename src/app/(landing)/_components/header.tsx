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
    { label: "Связь", sectionId: "contact" },
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
                    "fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b transition-opacity duration-500 ease-in-out",
                    visible ? "opacity-100" : "opacity-0",
                )}
            >
                <div className="flex items-center h-16 max-w-7xl mx-4 sm:mx-6 lg:mx-8">
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger asChild>
                            <Button variant="outline" size="icon" className="md:hidden">
                                <Menu />
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent className="text-center p-4">
                            <DrawerHeader>
                                <DrawerTitle className="text-2xl ">Навигация</DrawerTitle>
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
                    <nav className="hidden md:flex items-center gap-4">{navLinkElements}</nav>
                </div>
            </div>

            <div className="fixed flex items-center h-16 right-0 z-50 space-x-2 px-4 sm:px-6 lg:px-8">
                <AuthDialogOrDrawer />
                <ModeToggle />
            </div>
        </header>
    );
}
