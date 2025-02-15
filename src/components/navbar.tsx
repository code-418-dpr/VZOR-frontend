// import Link from "next/link";
import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/theming/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
    visible: boolean;
}

export default function Navbar({ visible }: Props) {
    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10  transform transition-all duration-500 ease-in-out",
                visible ? "translate-y-0" : "-translate-y-full",
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Logo width={120} />
                        {/*<div className="hidden md:block ml-10">
                            <div className="flex items-center space-x-8">
                                <Link href="#" className="text-sm text-gray-300 hover:text-white">
                                    Pricing
                                </Link>
                                <Link href="#" className="text-sm text-gray-300 hover:text-white">
                                    Resources
                                </Link>
                                <Link href="#" className="text-sm text-gray-300 hover:text-white">
                                    Community
                                </Link>
                                <Link href="#" className="text-sm text-gray-300 hover:text-white">
                                    Download
                                </Link>
                            </div>
                        </div>*/}
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button>Авторизация</Button>
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}
