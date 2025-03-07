"use client";

import { ArrowDown } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function Hero() {
    const scrollToNextSection = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
        });
    };

    return (
        <section className="flex flex-col w-full h-screen justify-center">
            <div className="flex flex-col items-center gap-10">
                <div className="flex -ml-12 -mb-8">
                    <Logo width={800} />
                    <i className="-ml-20 mt-5.5 text-4xl">AI</i>
                </div>
                <p className="text-muted-foreground text-2xl">Система интеллектуального анализа изображений</p>
            </div>

            <Button
                size="lg"
                className="absolute bottom-13 left-1/2 transform -translate-x-1/2"
                onClick={scrollToNextSection}
            >
                Подробнее
                <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
        </section>
    );
}
