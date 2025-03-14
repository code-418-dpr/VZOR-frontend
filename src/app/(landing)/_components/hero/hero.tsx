"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Emoticons } from "@/app/(landing)/_components/hero/emoticons";
import { HeroText } from "@/app/(landing)/_components/hero/hero-text";
import LogoWithAi from "@/app/(landing)/_components/hero/logo-with-ai";
import ReadMoreButton from "@/app/(landing)/_components/hero/read-more-button";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [emoticonsPosition, setEmoticonsPosition] = useState({ x: 0, y: 0 });
    const rafRef = useRef<number>(0);
    const handleMove = useCallback((e: MouseEvent) => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);

        rafRef.current = requestAnimationFrame(() => {
            const viewportCenter = {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
            };

            const vectorToCenter = {
                x: viewportCenter.x - e.clientX,
                y: viewportCenter.y - e.clientY,
            };

            const distance = Math.hypot(vectorToCenter.x, vectorToCenter.y);
            if (distance === 0) return;

            const sensitivity = 25;
            const maxDistance = Math.min(window.innerWidth, window.innerHeight) * 0.03;
            const proximityFactor = Math.min(1, 300 / distance);

            setEmoticonsPosition({
                x: Math.max(
                    -maxDistance,
                    Math.min((vectorToCenter.x / distance) * sensitivity * proximityFactor, maxDistance),
                ),
                y: Math.max(
                    -maxDistance,
                    Math.min((vectorToCenter.y / distance) * sensitivity * proximityFactor, maxDistance),
                ),
            });
        });
    }, []);

    useEffect(() => {
        window.addEventListener("mousemove", handleMove);
        return () => {
            window.removeEventListener("mousemove", handleMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [handleMove]);

    return (
        <section className="flex h-screen w-full flex-col justify-center">
            <div className="mb-12 flex flex-col items-center gap-10">
                <div className="relative select-none" ref={containerRef}>
                    <Emoticons position={emoticonsPosition} />
                    <LogoWithAi />
                </div>
                <HeroText />
            </div>
            <ReadMoreButton />
        </section>
    );
}
