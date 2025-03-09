import AuthDialogOrDrawer from "@/app/(landing)/_components/auth/auth-dialog-or-drawer";
import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/theming/mode-toggle";
import { cn } from "@/lib/utils";

interface Props {
    visible: boolean;
}

export default function Header({ visible }: Props) {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <header>
            <div
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b transition-opacity duration-500 ease-in-out",
                    visible ? "opacity-100" : "opacity-0",
                )}
            >
                <div className="flex items-center justify-between h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div onClick={scrollToTop} className="cursor-pointer">
                        <Logo width={120} />
                    </div>
                    <div className="flex items-center space-x-3">
                        <AuthDialogOrDrawer />
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}
