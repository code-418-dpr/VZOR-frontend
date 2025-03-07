"use client";

import { ChevronDown } from "lucide-react";

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
            <div className="flex flex-col items-center gap-10 mb-12">
                <div className="flex -mb-12">
                    <Logo width={800} />
                    <i className="-ml-20 mt-5.5 text-muted-foreground text-4xl">AI</i>
                </div>
                <p className="text-foreground text-center text-2xl font-medium">
                    Облачное решение для <span className="gradient-text">интеллектуального</span>
                    <br />
                    анализа изображений
                </p>
            </div>

            <Button
                size="lg"
                variant="secondary"
                className="flex flex-col absolute rounded-3xl py-9 bottom-10 left-1/2 text-lg transform -translate-x-1/2"
                onClick={scrollToNextSection}
            >
                Подробнее
                <ChevronDown className="animate-bounce" />
            </Button>
        </section>
    );
}
