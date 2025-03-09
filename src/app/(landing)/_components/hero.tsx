"use client";

import { ChevronDown } from "lucide-react";

import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const [viewportCenter, setViewportCenter] = useState({ x: 0, y: 0 });
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [emoticonsPosition, setEmoticonsPosition] = useState({ x: 0, y: 0 });

    // Update viewport center and add event listeners
    useEffect(() => {
        // Check if it's a touch device
        setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);

        const updateViewportCenter = () => {
            setViewportCenter({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
            });
        };

        // Initial update
        updateViewportCenter();

        // Handle mouse movement
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        // Handle touch movement
        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                setMousePosition({
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY,
                });
            }
        };

        // Update on resize
        window.addEventListener("resize", updateViewportCenter);

        if (!isTouchDevice) {
            window.addEventListener("mousemove", handleMouseMove);
        } else {
            window.addEventListener("touchmove", handleTouchMove);
        }

        return () => {
            window.removeEventListener("resize", updateViewportCenter);
            if (!isTouchDevice) {
                window.removeEventListener("mousemove", handleMouseMove);
            } else {
                window.removeEventListener("touchmove", handleTouchMove);
            }
        };
    }, [isTouchDevice]);

    // Calculate emoticons position based on cursor-to-center vector
    useEffect(() => {
        if (viewportCenter.x === 0 || isTouchDevice) return;

        // Calculate vector from cursor to center
        const vectorToCenterX = viewportCenter.x - mousePosition.x;
        const vectorToCenterY = viewportCenter.y - mousePosition.y;

        // Calculate distance from cursor to center
        const distance = Math.sqrt(vectorToCenterX * vectorToCenterX + vectorToCenterY * vectorToCenterY);

        // Only move if cursor is active
        if (distance === 0) {
            setEmoticonsPosition({ x: 0, y: 0 });
            return;
        }

        // Sensitivity and maximum movement parameters
        const sensitivity = 25;

        // Make maxDistance responsive to viewport size
        const maxDistance = Math.min(window.innerWidth, window.innerHeight) * 0.03;

        // Calculate normalized vector (opposite direction from cursor-to-center)
        const normalizedX = vectorToCenterX / distance;
        const normalizedY = vectorToCenterY / distance;

        // Calculate movement with distance-based intensity
        // Movement is more intense when cursor is closer to center
        const proximityFactor = Math.min(1, 300 / distance);
        const moveX = normalizedX * sensitivity * proximityFactor;
        const moveY = normalizedY * sensitivity * proximityFactor;

        // Limit maximum movement
        const limitedX = Math.max(Math.min(moveX, maxDistance), -maxDistance);
        const limitedY = Math.max(Math.min(moveY, maxDistance), -maxDistance);

        setEmoticonsPosition({ x: limitedX, y: limitedY });
    }, [mousePosition, viewportCenter, isTouchDevice]);

    const scrollToNextSection = () => {
        window.scrollTo({
            top: window.innerHeight * 0.9,
            behavior: "smooth",
        });
    };

    return (
        <section className="flex flex-col w-full h-screen justify-center">
            <div className="flex flex-col items-center gap-10 mb-12">
                <div className="relative" ref={containerRef}>
                    {/* Top-left emoticon */}
                    <div
                        className="absolute text-2xl sm:text-3xl md:text-4xl transition-transform duration-300 ease-out"
                        style={{
                            top: "-10%",
                            left: "0%",
                            transform: `translate(${emoticonsPosition.x}px, ${emoticonsPosition.y}px)`,
                        }}
                    >
                        ✨
                    </div>

                    {/* Top-right emoticon */}
                    <div
                        className="absolute text-2xl sm:text-3xl md:text-4xl transition-transform duration-300 ease-out"
                        style={{
                            top: "-10%",
                            right: "-6%",
                            transform: `translate(${emoticonsPosition.x}px, ${emoticonsPosition.y}px)`,
                        }}
                    >
                        🚀
                    </div>

                    {/* Bottom-left emoticon */}
                    <div
                        className="absolute text-2xl sm:text-3xl md:text-4xl transition-transform duration-300 ease-out"
                        style={{
                            bottom: "-10%",
                            left: "0%",
                            transform: `translate(${emoticonsPosition.x}px, ${emoticonsPosition.y}px)`,
                        }}
                    >
                        🔍
                    </div>

                    {/* Bottom-right emoticon */}
                    <div
                        className="absolute text-2xl sm:text-3xl md:text-4xl transition-transform duration-300 ease-out"
                        style={{
                            bottom: "-10%",
                            right: "-6%",
                            transform: `translate(${emoticonsPosition.x}px, ${emoticonsPosition.y}px)`,
                        }}
                    >
                        💡
                    </div>

                    <div className="flex -mb-12">
                        <Logo width={800} className="w-100 sm:w-130 md:w-170" />
                        <i className="text-muted-foreground -ml-10 sm:-ml-12 md:-ml-16 mt-2.5 sm:mt-4 md:mt-5.5 text-2xl sm:text-3xl md:text-4xl">
                            AI
                        </i>
                    </div>
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
