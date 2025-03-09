"use client";

import { Menu, X } from "lucide-react";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";

interface MobileMenuProps {
    links: {
        label: string;
        sectionId: string;
    }[];
    onNavigate: (sectionId: string) => void;
}

export function MobileMenu({ links, onNavigate }: MobileMenuProps) {
    const [open, setOpen] = React.useState(false);

    const handleNavigation = (sectionId: string) => {
        onNavigate(sectionId);
        setOpen(false);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col pl-4">
                {" "}
                <DialogTitle className="sr-only">Menu</DialogTitle>
                <div className="flex items-center justify-between border-b pb-4 pl-4 pt-4">
                    {" "}
                    <div className="text-lg font-semibold">Links</div>
                </div>
                <nav className="flex flex-col gap-4 mt-8 pl-4">
                    {" "}
                    {links.map((link) => (
                        <Button
                            key={link.sectionId}
                            variant="ghost"
                            className="justify-start px-2"
                            onClick={() => {
                                handleNavigation(link.sectionId);
                            }}
                        >
                            {link.label}
                        </Button>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
}
