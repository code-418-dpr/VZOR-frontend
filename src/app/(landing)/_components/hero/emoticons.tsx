import { Icon } from "@iconify/react";

interface EmoticonsProps {
    position: { x: number; y: number };
}

const emoticons = [
    { icon: "fluent-emoji:framed-picture", style: { top: "-18vh", left: "0vw" } },
    { icon: "fluent-emoji:magnifying-glass-tilted-left", style: { top: "-28vh", right: "20vw" } },
    { icon: "fluent-emoji:brain", style: { bottom: "-30vh", left: "10vw" } },
    { icon: "fluent-emoji:light-bulb", style: { bottom: "-45vh", right: "10vw" } },
    { icon: "fluent-emoji:cloud", style: { top: "-10vh", right: "5vw" } },
];

export function Emoticons({ position }: EmoticonsProps) {
    return (
        <>
            {emoticons.map((emoticon, index) => (
                <div
                    key={index}
                    className="absolute -z-10 transition-transform duration-300 ease-out"
                    style={{
                        ...emoticon.style,
                        transform: `translate(${position.x}px, ${position.y}px)`,
                    }}
                >
                    <Icon icon={emoticon.icon} width={100} height={100} />
                </div>
            ))}
        </>
    );
}
