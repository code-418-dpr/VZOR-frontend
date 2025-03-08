"use client";

import { ChevronDown } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function Hero() {
    const scrollToNextSection = () => {
        window.scrollTo({
            top: window.innerHeight * 0.9,
            behavior: "smooth",
        });
    };

    return (
        <section className="flex flex-col w-full h-screen justify-center">
            <div className="flex flex-col items-center gap-10 mb-12">
                <div className="flex -mb-12">
                    <Logo width={800} className="w-100 sm:w-130 md:w-170" />
                    <i className="text-muted-foreground -ml-10 sm:-ml-12 md:-ml-16 mt-2.5 sm:mt-4 md:mt-5.5 text-2xl sm:text-3xl md:text-4xl">
                        AI
                    </i>
                </div>
                <p className="text-foreground text-center text-xl sm:text-2xl font-medium">
                    Облачное решение для <span className="gradient-text">интеллектуального</span>
                    <br />
                    анализа изображений
                </p>
            </div>

            <Button
                size="lg"
                variant="secondary"
                className="flex flex-col absolute rounded-3xl py-9 bottom-10 left-1/2 transform -translate-x-1/2 text-md sm:text-lg"
                onClick={scrollToNextSection}
            >
                Подробнее
                <ChevronDown className="animate-bounce" />
            </Button>
        </section>
    );
}
