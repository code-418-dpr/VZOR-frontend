import AuthDialogOrDrawer from "@/app/(landing)/_components/auth/auth-dialog-or-drawer";
import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/theming/mode-toggle";
import { cn } from "@/lib/utils";

interface Props {
    visible: boolean;
}

export default function Header({ visible }: Props) {
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
                    {/* Контейнер для Logo и якорных кнопок */}
                    <div className="flex items-center space-x-6">
                        <div
                            onClick={() => scrollToSection("hero")}
                            className={cn("cursor-pointer", visible ? "" : "pointer-events-none")}
                        >
                            <Logo width={120} />
                        </div>
                        <div className="flex space-x-6">
                            <button onClick={() => scrollToSection("demo")} className="cursor-pointer">
                                Демо
                            </button>
                            <button onClick={() => scrollToSection("faq")} className="cursor-pointer">
                                FAQ
                            </button>
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
