import AuthDialogOrDrawer from "@/app/(landing)/_components/auth/auth-dialog-or-drawer";
import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/theming/mode-toggle";
import { cn } from "@/lib/utils";

interface Props {
    visible: boolean;
}

export default function Header({ visible }: Props) {
    return (
        <header>
            <div
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-white/10 transition-opacity duration-500 ease-in-out",
                    visible ? "opacity-100" : "opacity-0",
                )}
            >
                <div className="flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
                    <Logo width={120} />
                </div>
            </div>

            <div className="fixed top-0 left-0 right-0 z-50">
                <div className="flex items-center justify-between h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div></div>
                    <div className="flex items-center space-x-3">
                        <AuthDialogOrDrawer />
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}
