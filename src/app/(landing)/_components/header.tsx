"use client";

import AuthDialogOrDrawer from "@/app/(landing)/_components/auth/auth-dialog-or-drawer";
import { Logo } from "@/components/logo";
import { MobileMenu } from "@/components/mobile-menu";
import { ModeToggle } from "@/components/theming/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
    visible: boolean;
}

export default function Header({ visible }: HeaderProps) {
    const navigationLinks = [
        { label: "Demo", sectionId: "demo" },
        { label: "FAQ", sectionId: "faq" },
    ];

    const scrollToSection = (section: string) => {
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header>
            <div
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b transition-opacity duration-500 ease-in-out",
                    visible ? "opacity-100" : "opacity-0",
                    visible ? "" : "pointer-events-none",
                )}
            >
                <div className={cn("flex items-center justify-between h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8")}>
                    <div className="flex items-center space-x-4">
                        {/* Mobile menu hamburger */}
                        <div className="md:hidden">
                            <MobileMenu links={navigationLinks} onNavigate={scrollToSection} />
                        </div>

                        {/* Logo */}
                        <div
                            onClick={() => {
                                scrollToSection("hero");
                            }}
                            className={cn("cursor-pointer", visible ? "" : "pointer-events-none")}
                        >
                            <Logo width={120} />
                        </div>

                        {/* Desktop navigation */}
                        <div className="hidden md:flex space-x-6">
                            {navigationLinks.map((link) => (
                                <Button
                                    key={link.sectionId}
                                    variant="ghost"
                                    onClick={() => {
                                        scrollToSection(link.sectionId);
                                    }}
                                    className="cursor-pointer"
                                >
                                    {link.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed top-4 right-0 z-50 flex items-center space-x-3 bg-transparent backdrop-blur-none px-4 sm:px-6 lg:px-8">
                <AuthDialogOrDrawer />
                <ModeToggle />
            </div>
        </header>
    );
}
