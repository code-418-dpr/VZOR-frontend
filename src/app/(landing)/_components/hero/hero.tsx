"use client";

import { useEffect, useRef, useState } from "react";

import { Emoticons } from "@/app/(landing)/_components/hero/emoticons";
import { HeroText } from "@/app/(landing)/_components/hero/hero-text";
import LogoWithAi from "@/app/(landing)/_components/hero/logo-with-ai";
import ReadMoreButton from "@/app/(landing)/_components/hero/read-more-button";

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const [viewportCenter, setViewportCenter] = useState({ x: 0, y: 0 });
    const [emoticonsPosition, setEmoticonsPosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const updateViewportCenter = () => {
            setViewportCenter({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
            });
        };

        updateViewportCenter();
        window.addEventListener("resize", updateViewportCenter);

        const handleMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener("mousemove", handleMove);

        return () => {
            window.removeEventListener("resize", updateViewportCenter);
            window.removeEventListener("mousemove", handleMove);
        };
    }, []);

    useEffect(() => {
        if (viewportCenter.x === 0) return;
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
    }, [mousePosition, viewportCenter]);

    return (
        <section className="flex h-screen w-full flex-col justify-center">
            <div className="mb-12 flex flex-col items-center gap-10">
                <div className="relative" ref={containerRef}>
                    <Emoticons position={emoticonsPosition} />
                    <LogoWithAi />
                </div>
                <HeroText />
            </div>
            <ReadMoreButton />
        </section>
    );
}
