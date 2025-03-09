"use client";

import { ChevronDown } from "lucide-react";

import { useEffect, useRef, useState } from "react";

import { Emoticons } from "@/app/(landing)/_components/_hero/emoticons";
import { HeroText } from "@/app/(landing)/_components/_hero/hero-text";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const [viewportCenter, setViewportCenter] = useState({ x: 0, y: 0 });
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [emoticonsPosition, setEmoticonsPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
        const updateViewportCenter = () => {
            setViewportCenter({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
        };
        updateViewportCenter();
        window.addEventListener("resize", updateViewportCenter);

        const handleMove = (e: MouseEvent | TouchEvent) => {
            const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
            const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
            setMousePosition({ x: clientX, y: clientY });
        };

        if (!isTouchDevice) {
            window.addEventListener("mousemove", handleMove);
        } else {
            window.addEventListener("touchmove", handleMove);
        }

        return () => {
            window.removeEventListener("resize", updateViewportCenter);
            window.removeEventListener(isTouchDevice ? "touchmove" : "mousemove", handleMove);
        };
    }, [isTouchDevice]);

    useEffect(() => {
        if (viewportCenter.x === 0 || isTouchDevice) return;
        const vectorToCenter = { x: viewportCenter.x - mousePosition.x, y: viewportCenter.y - mousePosition.y };
        const distance = Math.hypot(vectorToCenter.x, vectorToCenter.y);
        if (distance === 0) return;

        const sensitivity = 25;
        const maxDistance = Math.min(window.innerWidth, window.innerHeight) * 0.03;
        const proximityFactor = Math.min(1, 300 / distance);
        const move = {
            x: (vectorToCenter.x / distance) * sensitivity * proximityFactor,
            y: (vectorToCenter.y / distance) * sensitivity * proximityFactor,
        };
        setEmoticonsPosition({
            x: Math.max(-maxDistance, Math.min(move.x, maxDistance)),
            y: Math.max(-maxDistance, Math.min(move.y, maxDistance)),
        });
    }, [mousePosition, viewportCenter, isTouchDevice]);

    const scrollToNextSection = () => {
        window.scrollTo({ top: window.innerHeight * 0.9, behavior: "smooth" });
    };

    return (
        <section className="flex flex-col w-full h-screen justify-center">
            <div className="flex flex-col items-center gap-10 mb-12">
                <div className="relative" ref={containerRef}>
                    <Emoticons position={emoticonsPosition} />
                    <div className="flex -mb-12">
                        <Logo width={800} className="w-100 sm:w-130 md:w-170" />
                        <i className="text-muted-foreground -ml-10 sm:-ml-12 md:-ml-16 mt-2.5 sm:mt-4 md:mt-5.5 text-2xl sm:text-3xl md:text-4xl">
                            AI
                        </i>
                    </div>
                </div>
                <HeroText />
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
